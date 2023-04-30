// content-script.js

// 获取选中的中文文本
function getSelectedChineseText() {
  const selectedText = window.getSelection().toString();
  const chineseText = selectedText.replace(/[^\u4e00-\u9fa5]/g, "");
  if (chineseText) {
    return selectedText;
  }
  return chineseText;
}

// 向background-script发送翻译请求
function sendTranslateRequest(chineseText) {
  chrome.runtime.sendMessage(
    { action: "translate", text: chineseText },
    (response) => {
      if (response && response.translatedText) {
        replaceSelectedText(response.translatedText);
      }
    }
  );
}

// 替换选中文本
function replaceSelectedText(translatedText) {
  const selectedInput = document.activeElement;

  if (
    (selectedInput && selectedInput.tagName.toLowerCase() === "textarea") ||
    selectedInput.tagName.toLowerCase() === "input"
  ) {
    const startPos = selectedInput.selectionStart;
    const endPos = selectedInput.selectionEnd;

    // 替换选中的文本
    selectedInput.value =
      selectedInput.value.slice(0, startPos) +
      translatedText +
      selectedInput.value.slice(endPos);

    // 更新光标位置
    selectedInput.selectionStart = startPos + translatedText.length;
    selectedInput.selectionEnd = startPos + translatedText.length;

    // 触发 input 事件，通知浏览器输入框的值已更改
    const inputEvent = new Event("input", { bubbles: true, cancelable: true });
    selectedInput.dispatchEvent(inputEvent);
  }
}

// 监听右键菜单项点击事件
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "translateSelectedText") {
    const chineseText = getSelectedChineseText();
    if (chineseText) {
      sendTranslateRequest(chineseText);
    }
  }
});


