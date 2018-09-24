chrome.contextMenus.create({
    title: "Convert to Markdown",
    contexts: ['selection'],
    onclick: function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    status: "select"
                },
                function (response) {
                    if (response.status == 'select_success') {
                        chrome.storage.local.set({ 'content2md': response.content }, function () {
                            chrome.windows.create({
                                type: 'popup',
                                url: 'http://linchangyi.coding.me/turndown/',
                                // url: 'file:///D:/Workspace/2md/turndown/index.html'
                            });
                        });
                    }
                });
        });
    }
});

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.status == '2md_loaded') {
            chrome.storage.local.get(['content2md'], function (result) {
                sendResponse({ status: 'content_ready', content: result.content2md });
            });
            //必须返回true，才能保持连接，否则sendResponse无效
            return true;
        }
    }
);