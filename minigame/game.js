require('./libs/wrapper/builtin/index');
window.DOMParser = require('./libs/common/xmldom/dom-parser').DOMParser;
require('./libs/common/engine3d/globalAdapter/index');
require('./libs/wrapper/unify');
require('./libs/wrapper/systemInfo');

require('src/settings');
var settings = window._CCSettings;
window.ccEnv = require('src/cc-env.js');



function setupModuleSystem(settings) {
    
    var ccGlobal = require('cocos3d-js.min');
    
    System.register('cc', [], function (_export, _context) {
        return {
            setters: [],
            execute: function () {
                _export(ccGlobal);
            }
        };
    });
    if (settings.scriptPackages) {
        settings.scriptPackages.forEach((sp) => {
            require(sp);
        });
    }
    return Promise.resolve(0);
}

window.importEngine = function() {
    return setupModuleSystem(window._CCSettings).then(function() {
        return ccEnv.imp("cc");
    });
};
require('main');

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
  require('./src/settings');
  window.importEngine().then(function () {
  require('./libs/common/engine3d/index.js');
  require('./libs/common/remote-downloader.js');

  // Adjust devicePixelRatio
  cc.view._maxPixelRatio = 2;

  // downloader polyfill
  window.wxDownloader = remoteDownloader;

  remoteDownloader.REMOTE_SERVER_ROOT = '';
  remoteDownloader.SUBCONTEXT_ROOT = '';
  var pipeBeforeDownloader = cc.loader.md5Pipe || cc.loader.assetLoader;
  cc.loader.insertPipeAfter(pipeBeforeDownloader, remoteDownloader);

  if (cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB) {
    var _WECHAT_SUBDOMAIN_DATA = require('src/subdomain.json.js');
    cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
      cc.Pipeline.Downloader.PackDownloader._doPreload('WECHAT_SUBDOMAIN', _WECHAT_SUBDOMAIN_DATA);
    });

    require('./libs/wrapper/sub-context-adapter');
  } else {
    // Release Image objects after uploaded gl texture
    cc.macro.CLEANUP_IMAGE_CACHE = true;
  }

  remoteDownloader.init();
  window.boot();
  });
});
