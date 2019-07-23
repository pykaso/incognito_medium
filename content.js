
/**
 * @fileoverview Gmail inbox extension. Open all medium.com links in new incognito window.
 * @author pykasonet@gmail.com (Lukas Gergel)
 */
 

function onInboxLoaded(callback) {
	var pollInterval = setInterval(function() {
 		var elem = document.getElementById('loading');
    	if (elem && elem.style.display === 'none') {
      		clearInterval(pollInterval);
      		callback();
    	}
  	}, 100);
}


function requestIncognitoWindow(url) {
	chrome.runtime.sendMessage({
    	action: 'createIncognitoWindow',
    	url: url,
  	}, function(createdWindow) {});
}


onInboxLoaded(function(){
	var links = document.getElementsByTagName("a");
	for (i in links) {
		var link = links[i];
		if (link == undefined || link.href == undefined ) { continue; }
		var isMediumLink = link.href.startsWith("https://medium.com");
		if (isMediumLink) {
			// remove default href value
			link.setAttribute("data-url", link.href.toString());
			link.removeAttribute("target")
			link.href = "#";
			// remove all existing observers
			var new_link = link.cloneNode(true);
			link.parentNode.replaceChild(new_link, link);

			new_link.addEventListener("click", function(evt) {
				requestIncognitoWindow(this.getAttribute("data-url"));
				evt.stopImmediatePropagation();
				evt.stopPropagation();
			});
		}
	}
})