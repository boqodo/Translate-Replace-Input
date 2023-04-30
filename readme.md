# Translate-Replace-Input
> Translate selected Chinese text to English and replace the selected text with the translation.
> 翻译选中的文本，从中文转成英文，并替换选中的文本为翻译后的英文。

## 项目说明
> 该插件个人主要想法来源于在使用 Google Bard的过程中，需要使用英文输入
> 个人英语太烂，没办法很好的组织英语句子，所以想到了使用翻译来解决这个问题
> 在输入框中输入中文，然后选中中文，通过chatgpt翻译成英文进行对话聊天

## 应用场景
> 可以针对web页面中输入中文进行翻译，然后替换成英文


## chrome插件安装步骤
1. 下载本项目到本地
2. 打开chrome浏览器，地址栏输入：chrome://extensions/
3. 勾选右上角的开发者模式
4. 点击左上角的“加载已解压的扩展程序”，选择本项目的文件夹
5. 安装成功后，右上角会出现一个小图标，点击即可使用


## 使用方法
1. 选中需要翻译的中文文本
2. 右键菜单选择“Translate-Replace-Input” 或 快捷键 ctrl+R


## 前提条件
1. 翻译使用openai，需要替换成自己的openai api key，替换background-script.js 39行，apiKey。


# 开发说明
> 该插件使用gpt4编写，只进行了少部分调整。

# 图标说明
> 图标来自[iconpark](https://iconpark.oceanengine.com/official/)