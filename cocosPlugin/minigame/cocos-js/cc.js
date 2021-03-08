System.register(["plugin:cocos/base.js", "plugin:cocos/gfx-webgl.js", "plugin:cocos/3d.js", "plugin:cocos/2d.js", "plugin:cocos/ui.js", "plugin:cocos/particle.js", "./physics-cannon.js", "./physics-framework.js", "./physics-2d-box2d.js", "./physics-2d-framework.js", "plugin:cocos/intersection-2d.js", "plugin:cocos/primitive.js", "plugin:cocos/profiler.js", "plugin:cocos/particle-2d.js", "plugin:cocos/audio.js", "plugin:cocos/video.js", "plugin:cocos/webview.js", "plugin:cocos/tween.js", "plugin:cocos/terrain.js", "plugin:cocos/tiled-map.js", "plugin:cocos/spine.js", "plugin:cocos/dragon-bones.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_pluginCocosBaseJs) {
      var _exportObj = {};

      for (var _key in _pluginCocosBaseJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _pluginCocosBaseJs[_key];
      }

      _export(_exportObj);
    }, function (_pluginCocosGfxWebglJs) {
      var _exportObj2 = {};

      for (var _key2 in _pluginCocosGfxWebglJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _pluginCocosGfxWebglJs[_key2];
      }

      _export(_exportObj2);
    }, function (_pluginCocos3dJs) {
      var _exportObj3 = {};

      for (var _key3 in _pluginCocos3dJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _pluginCocos3dJs[_key3];
      }

      _export(_exportObj3);
    }, function (_pluginCocos2dJs) {
      var _exportObj4 = {};

      for (var _key4 in _pluginCocos2dJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _pluginCocos2dJs[_key4];
      }

      _export(_exportObj4);
    }, function (_pluginCocosUiJs) {
      var _exportObj5 = {};

      for (var _key5 in _pluginCocosUiJs) {
        if (_key5 !== "default" && _key5 !== "__esModule") _exportObj5[_key5] = _pluginCocosUiJs[_key5];
      }

      _export(_exportObj5);
    }, function (_pluginCocosParticleJs) {
      var _exportObj6 = {};

      for (var _key6 in _pluginCocosParticleJs) {
        if (_key6 !== "default" && _key6 !== "__esModule") _exportObj6[_key6] = _pluginCocosParticleJs[_key6];
      }

      _export(_exportObj6);
    }, function (_physicsCannonJs) {
      var _exportObj7 = {};

      for (var _key7 in _physicsCannonJs) {
        if (_key7 !== "default" && _key7 !== "__esModule") _exportObj7[_key7] = _physicsCannonJs[_key7];
      }

      _export(_exportObj7);
    }, function (_physicsFrameworkJs) {
      var _exportObj8 = {};

      for (var _key8 in _physicsFrameworkJs) {
        if (_key8 !== "default" && _key8 !== "__esModule") _exportObj8[_key8] = _physicsFrameworkJs[_key8];
      }

      _export(_exportObj8);
    }, function (_physics2dBox2dJs) {
      var _exportObj9 = {};

      for (var _key9 in _physics2dBox2dJs) {
        if (_key9 !== "default" && _key9 !== "__esModule") _exportObj9[_key9] = _physics2dBox2dJs[_key9];
      }

      _export(_exportObj9);
    }, function (_physics2dFrameworkJs) {
      var _exportObj10 = {};

      for (var _key10 in _physics2dFrameworkJs) {
        if (_key10 !== "default" && _key10 !== "__esModule") _exportObj10[_key10] = _physics2dFrameworkJs[_key10];
      }

      _export(_exportObj10);
    }, function (_pluginCocosIntersection2dJs) {
      var _exportObj11 = {};

      for (var _key11 in _pluginCocosIntersection2dJs) {
        if (_key11 !== "default" && _key11 !== "__esModule") _exportObj11[_key11] = _pluginCocosIntersection2dJs[_key11];
      }

      _export(_exportObj11);
    }, function (_pluginCocosPrimitiveJs) {
      var _exportObj12 = {};

      for (var _key12 in _pluginCocosPrimitiveJs) {
        if (_key12 !== "default" && _key12 !== "__esModule") _exportObj12[_key12] = _pluginCocosPrimitiveJs[_key12];
      }

      _export(_exportObj12);
    }, function (_pluginCocosProfilerJs) {
      var _exportObj13 = {};

      for (var _key13 in _pluginCocosProfilerJs) {
        if (_key13 !== "default" && _key13 !== "__esModule") _exportObj13[_key13] = _pluginCocosProfilerJs[_key13];
      }

      _export(_exportObj13);
    }, function (_pluginCocosParticle2dJs) {
      var _exportObj14 = {};

      for (var _key14 in _pluginCocosParticle2dJs) {
        if (_key14 !== "default" && _key14 !== "__esModule") _exportObj14[_key14] = _pluginCocosParticle2dJs[_key14];
      }

      _export(_exportObj14);
    }, function (_pluginCocosAudioJs) {
      var _exportObj15 = {};

      for (var _key15 in _pluginCocosAudioJs) {
        if (_key15 !== "default" && _key15 !== "__esModule") _exportObj15[_key15] = _pluginCocosAudioJs[_key15];
      }

      _export(_exportObj15);
    }, function (_pluginCocosVideoJs) {
      var _exportObj16 = {};

      for (var _key16 in _pluginCocosVideoJs) {
        if (_key16 !== "default" && _key16 !== "__esModule") _exportObj16[_key16] = _pluginCocosVideoJs[_key16];
      }

      _export(_exportObj16);
    }, function (_pluginCocosWebviewJs) {
      var _exportObj17 = {};

      for (var _key17 in _pluginCocosWebviewJs) {
        if (_key17 !== "default" && _key17 !== "__esModule") _exportObj17[_key17] = _pluginCocosWebviewJs[_key17];
      }

      _export(_exportObj17);
    }, function (_pluginCocosTweenJs) {
      var _exportObj18 = {};

      for (var _key18 in _pluginCocosTweenJs) {
        if (_key18 !== "default" && _key18 !== "__esModule") _exportObj18[_key18] = _pluginCocosTweenJs[_key18];
      }

      _export(_exportObj18);
    }, function (_pluginCocosTerrainJs) {
      var _exportObj19 = {};

      for (var _key19 in _pluginCocosTerrainJs) {
        if (_key19 !== "default" && _key19 !== "__esModule") _exportObj19[_key19] = _pluginCocosTerrainJs[_key19];
      }

      _export(_exportObj19);
    }, function (_pluginCocosTiledMapJs) {
      var _exportObj20 = {};

      for (var _key20 in _pluginCocosTiledMapJs) {
        if (_key20 !== "default" && _key20 !== "__esModule") _exportObj20[_key20] = _pluginCocosTiledMapJs[_key20];
      }

      _export(_exportObj20);
    }, function (_pluginCocosSpineJs) {
      var _exportObj21 = {};

      for (var _key21 in _pluginCocosSpineJs) {
        if (_key21 !== "default" && _key21 !== "__esModule") _exportObj21[_key21] = _pluginCocosSpineJs[_key21];
      }

      _export(_exportObj21);
    }, function (_pluginCocosDragonBonesJs) {
      var _exportObj22 = {};

      for (var _key22 in _pluginCocosDragonBonesJs) {
        if (_key22 !== "default" && _key22 !== "__esModule") _exportObj22[_key22] = _pluginCocosDragonBonesJs[_key22];
      }

      _export(_exportObj22);
    }],
    execute: function () {}
  };
});