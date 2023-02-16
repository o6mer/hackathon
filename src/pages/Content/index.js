import axios from "axios";
import { handleLinkedin } from "./modules/linkedinScript";
import { handleSalesNavigator } from "./modules/salesNavigatorScript";
const $ = require("jquery");

window.addEventListener("load", myMain, false);
window.addEventListener("popstate", myMain);

//
// chrome.storage.sync.clear();

chrome.storage.sync.get(["token"], async function ({ token }) {
  const linkRegex = RegExp("(?<=code=).*$");
  const code = linkRegex.exec(window.location.search)?.at(0);
  try {
    if (token) return;

    if (!code) {
      const client_id = "plgTJ1AIqNjv0IockolxdjhWx70vil~Gd1aTql9S49L_";
      const redirect_uri = "https://www.linkedin.com/search/";
      const url = `https://api.outreach.io/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=prospects.write`;

      return window.location.replace(url);
    } else {
      const { data } = await axios.post("http://localhost:4000/api/get-token", {
        code,
      });
      console.log(data);
      chrome.storage.sync.set({ token: data.data }).then(() => {
        console.log("Value is set to " + token);
      });
    }
  } catch (err) {
    console.log(err);
  }
});

function myMain(evt) {
  // const code = new URLSearchParams(window.location.search);

  var jsInitChecktimer = setInterval(checkForJS_Finish, 111);

  function checkForJS_Finish() {
    //linkedin sales navigator leads page
    if (
      document.querySelector(
        "#content-main > div.flex > div.full-width > div.container-plain-no-border-radius.p0.flex-column._sticky-nav_1igybl._remove-left-box-shadow_1igybl"
      )
    ) {
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

// window.removeEventListener('load', myMain);
// window.removeEventListener('popstate', myMain);
