import { handleLinkedin } from './modules/linkedinScript';
import { handleSalesNavigator } from './modules/salesNavigatorScript';
const $ = require('jquery');

window.addEventListener('load', myMain, false);
window.addEventListener('popstate', myMain);

function myMain(evt) {
  var jsInitChecktimer = setInterval(checkForJS_Finish, 111);

  function checkForJS_Finish() {
    //linkedin sales navigator leads page
    if (
      document.querySelector(
        '#content-main > div.flex > div.full-width > div.container-plain-no-border-radius.p0.flex-column._sticky-nav_1igybl._remove-left-box-shadow_1igybl'
      )
    ) {
      clearInterval(jsInitChecktimer);
      handleSalesNavigator();
    }

    //normal linkedin search page
    if (
      !document.querySelector('.search-results-loader__block') &&
      document.querySelector('.reusable-search__result-container')
    ) {
      clearInterval(jsInitChecktimer);
      handleLinkedin();
    }
  }
  //   window.removeEventListener('load', myMain);
  //   window.removeEventListener('popstate', myMain);
}
