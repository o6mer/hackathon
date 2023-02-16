window.onload = () => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.command === 'get-url') {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let url = tabs[0].url;
        console.log(url);
        sendResponse({ url });
        // use `url` here inside the callback because it's asynchronous!
      });
    }
    return sendResponse(true);
  });
};
