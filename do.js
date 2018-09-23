chrome.runtime.onMessage.addListener(
	function (message, sender, sendResponse) {
		if (message.status == 'select') {

			var selectionObj = window.getSelection();
			var rangeObj = selectionObj.getRangeAt(0);
			var docFragment = rangeObj.cloneContents();
			sendResponse({
				status: 'select_success',
				content: serialize(docFragment)
			});
			return true;
		}
	}
);

if (window.location.href == 'https://phodal.github.io/2md/') {
	addLoadEvent(function () {
		chrome.runtime.sendMessage({ status: '2md_loaded' }, function (response) {
			if(response.status == 'content_ready'){
				convertMd(response.content);
			}
		});
	});
}

function convertMd(content) {
	var ele = document.getElementById('input_ifr').contentWindow.document.getElementsByTagName('body')[0];

	ele.innerHTML = content;

	ele.focus();
	document.getElementById('output').focus();
}

function serialize(fragment) {
	const serializer = new XMLSerializer();
	const document_fragment_string = serializer.serializeToString(fragment);
	return document_fragment_string;
}

function addLoadEvent(func) {
	var oldonload = window.onload;   //把现有的事件处理函数的值存起来
	if (typeof window.onload != 'function') {  //如果没有绑定任何函数
		window.onload = func;  //添加新的函数
	} else {
		window.onload = function () {
			oldonload();
			func();   //把新函数追加到现有指令的末尾
		}
	}
}


