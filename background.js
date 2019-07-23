
/**
 * @fileoverview Gmail inbox extension. Open all medium.com links in new incognito window.
 * @author pykasonet@gmail.com (Lukas Gergel)
 */
 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   if (request && request.action === 'createIncognitoWindow' && request.url) {
      chrome.windows.create({url: request.url, incognito: true}, function (win) {
         sendResponse(win);
      });
   }
});