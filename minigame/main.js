
function loadPrerequisiteModules(settings) {
    const promises = [];

    // jsList
    var jsList = settings.jsList;
    if (jsList) {
        jsList.forEach(function (x) {
            promises.push(prepare.loadIIFE('src/' + x));
        });
    }

    settings.scripts.forEach(function(script) {
        if (!script.defer) {
            promises.push(System.import(script.moduleId));
        }
    });

    return Promise.all(promises);
}

function boot () {
    var settings = window._CCSettings;

    

        var uuids = settings.uuids;

        var rawAssets = settings.rawAssets;
        var assetTypes = settings.assetTypes;
        var realRawAssets = settings.rawAssets = {};
        for (var mount in rawAssets) {
            var entries = rawAssets[mount];
            var realEntries = realRawAssets[mount] = {};
            for (var id in entries) {
                var entry = entries[id];
                var type = entry[1];
                // retrieve minified raw asset
                if (typeof type === 'number') {
                    entry[1] = assetTypes[type];
                }
                // retrieve uuid
                realEntries[uuids[id] || id] = entry;
            }
        }

        var scenes = settings.scenes;
        for (var i = 0; i < scenes.length; ++i) {
            var scene = scenes[i];
            if (typeof scene.uuid === 'number') {
                scene.uuid = uuids[scene.uuid];
            }
        }

        var packedAssets = settings.packedAssets;
        for (var packId in packedAssets) {
            var packedIds = packedAssets[packId];
            for (var j = 0; j < packedIds.length; ++j) {
                if (typeof packedIds[j] === 'number') {
                    packedIds[j] = uuids[packedIds[j]];
                }
            }
        }

        var subpackages = settings.subpackages;
        for (var subId in subpackages) {
            var uuidArray = subpackages[subId].uuids;
            if (uuidArray) {
                for (var k = 0, l = uuidArray.length; k < l; k++) {
                    if (typeof uuidArray[k] === 'number') {
                        uuidArray[k] = uuids[uuidArray[k]];
                    }
                }
            }
        }
    

    function setLoadingDisplay () {
        // Loading splash scene
        var progressBar = document.querySelector('.progress-bar');
        var progressSpan = document.querySelector('.progress-bar span');
        cc.loader.onProgress = function (completedCount, totalCount, item) {
            var percent = 100 * completedCount / totalCount;
            if (progressSpan) {
                progressSpan.style.width = percent.toFixed(2) + '%';
            }
        };
        progressSpan.style.width = '0%';
        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            progressBar.style.display = 'none';
        });
    }

    var onStart = function () {
        window._CCSettings = undefined;
        cc.loader.downloader._subpackages = settings.subpackages;

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);
		


        var launchScene = settings.launchScene;
        // load scene
        cc.director.loadScene(launchScene, null,
            function () {
                if (cc.sys.isBrowser) {
                    // show canvas
                    var canvas = document.getElementById('GameCanvas');
                    canvas.style.visibility = '';
                    var div = document.getElementById('GameDiv');
                    if (div) {
                        div.style.backgroundImage = '';
                    }
                }

                cc.view.setDesignResolutionSize(480, 960, 4);

                cc.loader.onProgress = null;
                console.log('Success to load scene: ' + launchScene);
            }
        );
    };

    // init assets
    cc.AssetLibrary.init({
        libraryPath: 'res/import',
        rawAssetsBase: 'res/raw-',
        rawAssets: settings.rawAssets,
        packedAssets: settings.packedAssets,
        md5AssetsMap: settings.md5AssetsMap,
        subpackages: settings.subpackages
    });

    var option = {
        id: 'GameCanvas',
        scenes: settings.scenes,
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: !false && settings.debug,
        frameRate: 60,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
        renderPipeline: settings.renderPipeline,
    }

    // init assets
    cc.AssetLibrary.init({
        libraryPath: 'res/import',
        rawAssetsBase: 'res/raw-',
        rawAssets: settings.rawAssets,
        packedAssets: settings.packedAssets,
        md5AssetsMap: settings.md5AssetsMap,
        subpackages: settings.subpackages
    });
    if (cc.sys.isBrowser) {
        setLoadingDisplay();
    }

    option.adapter = prepare.findCanvas(option.id);

    if (cc.internal.SplashScreenWebgl) {
        cc.internal.SplashScreenWebgl.instance.main(option.adapter.canvas);
    }

    loadPrerequisiteModules(settings).then(function () {
        cc.game.run(option, onStart);
    });
};
window.boot =  boot;

var prepare = function() {
    var settings = window._CCSettings;
    return Promise.resolve(prepare.engine ? prepare.engine() : void 0).
        then(function() {
            return loadScriptPackages(settings);
        }).
        then(function() {
            return System.import('cc');
        });
};
boot.prepare = prepare;

/**
 * Define how to prepare engine so that 'cc' is valid to import.
 */
prepare.engine = void 0;

/**
 * Define how to prepare IIFE modules.
 */
prepare.loadIIFE = void 0;

/**
 * Load all bundles. Every bundle may contain one or more named registered SystemJS modules, with no module.
 */
function loadScriptPackages(settings) {
    var loadBundlePromises = [];
    if (settings.scriptPackages) {
        for (var iScriptPackage = 0; iScriptPackage < settings.scriptPackages.length; ++iScriptPackage) {
            loadBundlePromises.push(prepare.loadIIFE(settings.scriptPackages[iScriptPackage]));
        }
    }
    return Promise.all(loadBundlePromises);
}

/**
 * Adapter: find canvas
 */
prepare.findCanvas = void 0;


