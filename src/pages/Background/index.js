let selectableProfiles = [];

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.event === "get-selectable-profiles-list") {
    selectableProfiles = request.data.profiles;
    console.log(selectableProfiles);
    chrome.runtime.sendMessage(
      { event: "send-selectable-profiles-list", data: { selectableProfiles } },
      (response) => {
        console.log(response);
      }
    );

    sendResponse({ message: "success" });
  }
  sendResponse({ sup: "supp" });
});
