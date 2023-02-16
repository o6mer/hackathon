import { fetchToken, fetchUsers } from "./modules/api";
import { handleLinkedin } from "./modules/linkedinScript";
import { handleSalesNavigator } from "./modules/salesNavigatorScript";
const $ = require("jquery");

window.addEventListener("load", myMain, false);
window.addEventListener("popstate", myMain);

chrome.storage.sync.clear();
chrome.storage.sync.get(["token"], async function ({ token }) {
  await fetchToken(token);
  // if (!token) return;
  // await fetchUsers(token);
});

function myMain(evt) {
  var jsInitChecktimer = setInterval(checkForJS_Finish, 111);

  function checkForJS_Finish() {
    //linkedin sales navigator leads page
    if (document.querySelector('[data-x-search-result="LEAD"]')) {
      clearInterval(jsInitChecktimer);
      handleSalesNavigator();
    }

    //normal linkedin search page
    if (
      !document.querySelector(".search-results-loader__block") &&
      document.querySelector(".reusable-search__result-container")
    ) {
      clearInterval(jsInitChecktimer);
      handleLinkedin();
    }
  }
}

// idScript.remove();
//then cleanup
