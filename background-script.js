// background-script.js

// 创建右键菜单项
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translateChineseText",
    title: "Translate Replace Input",
    contexts: ["editable"],
  });
});
// 处理右键菜单项点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translateChineseText") {
    chrome.tabs.sendMessage(tab.id, { action: "translateSelectedText" });
  }
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "translateSelectedText") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tab.id, {
        action: "translateSelectedText",
      });
    });
  }
});
// 监听content-script发来的翻译请求
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "translate") {
    const chineseText = request.text;
    translateTextUsingOpenAI(chineseText, sendResponse);
    return true; // 表示异步回调
  }
});


// 调用OpenAI API进行翻译
async function translateTextUsingOpenAI(chineseText, sendResponse) {
  const apiKey = "sk-xxx"; // 替换为您的OpenAI API密钥

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "你是一个翻译引擎，请翻译给到的句子，只需要翻译不需要解释。将句子翻译成英文。",
        },
        { role: "user", content: chineseText },
      ],
    }),
  });

  const jsonResponse = await response.json();
  const translatedText = jsonResponse.choices[0].message.content;

  sendResponse({ translatedText });
}
