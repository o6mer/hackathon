import { printLine } from './modules/print';
const $ = require('jquery');

const navElement = $(`
    <div>
        <button>export</button>
    </div>
`);

window.addEventListener('load', myMain, false);

function myMain(evt) {
  var jsInitChecktimer = setInterval(checkForJS_Finish, 111);

  function checkForJS_Finish() {
    if (document.querySelector('[data-x-search-result="LEAD"]')) {
      clearInterval(jsInitChecktimer);

      const navBar = $('._sticky-nav_1igybl');
      navBar.append(navElement);

      const exportButton = navElement.find('button');
      exportButton.click(() => {});

      const profiles = $('.artdeco-list__item');

      const profilesData = [];
      profiles.each((_, profile) => {
        profile = $(profile);

        profile.click((e) => {
          console.log('clicked ', e);
        });
        profilesData.push(getDataFromProfile(profile));
      });
      console.log(profilesData);
    }

    function getDataFromProfile(profile) {
      const profileElement = profile.find(
        '[data-control-name="view_lead_panel_via_search_lead_name"]'
      );
      const name = profileElement.find('span').text();
      const rawLink = profileElement.attr('href');

      const linkRegex = RegExp('(?<=lead/).*?(?=,)');

      const profileId = linkRegex.exec(rawLink);
      const formatedLink = `https://www.linkedin.com/in/${profileId}`;
      return { name, formatedLink };
    }
  }
}

printLine("Using the 'printLine' function from the Print Module");
