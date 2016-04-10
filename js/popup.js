$(function(){
	chrome.tabs.getAllInWindow(function(tabs){
		$("#boxA i").text(tabs.length);
	});
});

$(function(){
	$("#saveBtn").click(function(){
		chrome.tabs.getAllInWindow(function(tabs){
			var tabArray = new Array();
			for (var i=0; i<tabs.length; i++) {
				var tab = new Object();
				tab["url"] = tabs[i].url;
				tab["pinned"] = tabs[i].pinned;
				tabArray.push(tab);
			}
			var localStorage = {
				tabs: tabArray
			};
			chrome.storage.sync.set(localStorage,function(){
				alert("保存しました");
			});
		});
	});
});

$(function(){
	$("#restoreBtn").click(function(){
		chrome.storage.sync.get(function(localStorage){
			var tabs = localStorage.tabs;
			for (var i=0; i<tabs.length; i++) {
				var properties = {
					url: tabs[i].url,
					pinned: tabs[i].pinned
				};
				chrome.tabs.create(properties);
			}
		});
	});
});
