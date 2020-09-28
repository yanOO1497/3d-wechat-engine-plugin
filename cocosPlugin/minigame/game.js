require('./libs/wrapper/builtin/index');
window.DOMParser = require('./libs/common/xmldom/dom-parser').DOMParser;
require('./libs/common/engine3d/globalAdapter/index');
require('./libs/wrapper/unify');
require('./libs/wrapper/systemInfo');


// Polyfills bundle.
require("src/polyfills.bundle.js");

// SystemJS support.
require("src/system.bundle.js");


const { createApplication } = require('./application.js');

// Adapt for IOS, swap if opposite
if (canvas){
    var _w = canvas.width;
    var _h = canvas.height;
    if (screen.width < screen.height) {
        if (canvas.width > canvas.height) {
            _w = canvas.height;
            _h = canvas.width;
        }
    } else {
        if (canvas.width < canvas.height) {
            _w = canvas.height;
            _h = canvas.width;
        }
    }
    canvas.width = _w;
    canvas.height = _h;
}
// Adjust initial canvas size
if (canvas && window.devicePixelRatio >= 2) {canvas.width *= 2; canvas.height *= 2;}

window.__globalAdapter.init(function() {
    createApplication({
        moduleLoader: {
            importMap: require("src/import-map.js").default,
            execNoSchema: (urlNoSchema) => require(`.${urlNoSchema}`),
            execMap: {
                'plugin:': (urlNoSchema) => requirePlugin(urlNoSchema),
            },
        },
        loadJsListFile: (url) => require(url),
    }).then((application) => {
        return onApplicationCreated(application);
    }).catch((err) => {
        console.error(err);
    });
});

function onApplicationCreated(application) {
    return application.import('cc').then((cc) => {
        require('./libs/common/engine3d/index.js');
        require('./libs/common/remote-downloader.js');
        // Adjust devicePixelRatio
        cc.view._maxPixelRatio = 4;
        // downloader polyfill
        remoteDownloader.REMOTE_SERVER_ROOT = '';
        remoteDownloader.SUBCONTEXT_ROOT = '';
        var pipeBeforeDownloader = cc.loader.md5Pipe || cc.loader.subPackPipe || cc.loader.assetLoader;
        cc.loader.insertPipeAfter(pipeBeforeDownloader, remoteDownloader);
        window.wxDownloader = remoteDownloader;

        require('./libs/wrapper/engine/index');
        // Release Image objects after uploaded gl texture
        cc.macro.CLEANUP_IMAGE_CACHE = true;
        remoteDownloader.init();
        return application.start({
            findCanvas: () => {
                var container = document.createElement('div');
                return { frame: container, canvas: window.canvas, container };
            },
        });
    });
}
