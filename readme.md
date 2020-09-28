# 微信引擎插件发布流程

自 1.2 起，实际需要上传的引擎插件放置在编辑器打包路径的 resources 文件夹下的 3d/engine/bin/.cache/editor-cache/wechatgame 目录下。

## 环境配置

手动拷贝方式：

1. 将 `3d/engine/bin/.cache/editor-cache/wechatgame/cocos` 路径下的文件夹，直接复制到 `cocosPlugin/plugin` 目录下。
2. 在编辑器内打开当前项目，勾选引擎分离选项，构建微信包。
3. 将构建成功的微信包除了 `cocos` 文件夹，复制到 `cocosPlugin/minigame` 文件夹内，并将项目内的 `game.json` 里的 `cocos` 的 version 改为 **dev**。

自动拷贝方式：

当前项目内放置了一个微信构建插件，在构建配置面板点击启用后直接构建就会生成对应的插件包。

![](./images/publish.png)

## 测试阶段

使用微信开发者工具，用带有引擎插件开发权限的微信号登录后，打开 `cocosPlugin` 目录，并且确认是在**小游戏插件模式**下的即可。
![](./images/wechat_dev_tools.png)

**需要保证在编辑器内打开项目，以及预览都可以正常显示**

## 上传发布阶段

在微信开发工具内直接点击 **上传** 按钮即可。

![](./images/upload.png)

上传后，可以登录微信后台的小程序插件模块，开发版本看到最新的插件

![](./images/step1.png)

![](./images/step2.png)

最后点击提交审核，再发布即可。
