const { join } = require('path');
// 使用全局 Editor
// const Editor = require('electron').remote.getGlobal('Editor');
// 加载编辑器里的 node_modules
module.paths.push(join(Editor.App.path, 'node_modules'));
const { removeSync, writeJSONSync, emptyDirSync, copySync, readJsonSync } = require('fs-extra');

let copyTime = 0;

// cocos3DEngine wx0446ba2621dda60a
const appid = 'wx7095f7fa398a2f30';

function onAfterBuild(options, result) {
    const pkgOptions = options.packages.wechatgame;
    if (!pkgOptions.separateEngine || !options.packages['wechatgame-plugin'].publish) {
        return;
    }
    // 将项目内除了 cocos 文件夹复制到 mini-game 文件夹内
    const miniGameDir = join(__dirname, '../../cocosPlugin/minigame');
    emptyDirSync(miniGameDir);
    copySync(result.dest, miniGameDir);
    removeSync(join(miniGameDir, 'cocos'));

    // 修改 game.json 内的 cocos 字段
    const gameJsonPath = join(miniGameDir, 'game.json');
    const gameJson = readJsonSync(gameJsonPath);
    gameJson.plugins.cocos = {
        version: 'dev',
        provider: appid,
    };
    writeJSONSync(gameJsonPath, gameJson);

    // 修改插件项目的 appid
    const projectConfigJsonPath = join(__dirname, '../../cocosPlugin/project.config.json');
    const projectConfigJson = readJsonSync(projectConfigJsonPath);
    projectConfigJson.appid = appid;
    writeJSONSync(projectConfigJsonPath, projectConfigJson);

    if (!copyTime) {
        const pluginDest = join(__dirname, '../../cocosPlugin/plugin');
        emptyDirSync(pluginDest);
        const dir = join(Editor.App.path, '../resources/3d/engine/bin/.cache/editor-cache/wechat-game/plugin');
        // 将编辑器内置的引擎拷贝到 plugin 内部
        copySync(dir, pluginDest);
        copyTime = 1;
    }
}

module.exports = {
    onAfterBuild,
    throwError: true,
}