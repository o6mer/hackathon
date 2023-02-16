import { createProspectFromArray } from "./api";
import { navElement } from "./components";
const $ = require("jquery");

const handleSalesNavigator = () => {
  chrome.runtime.sendMessage({ greeting: "hello" }, (response) => {
    console.log(response.sup);
  });

  const navBar = $("._sticky-nav_1igybl");
  const container = $("#content-main > div.flex > div.full-width");
  navBar.append(navElement);

  const exportButton = navElement.find("button");

  exportButton.on("click", onExportClicked);

  let selectedProfiles = container.find(
    'input[type="checkbox"]:checkbox:checked'
  );
  container.on("click", () => {
    selectedProfiles = container.find(
      'input[type="checkbox"]:checkbox:checked'
    );
    exportButton.prop("disabled", selectedProfiles.length === 0);
  });
  exportButton.prop("disabled", selectedProfiles.length === 0);

  async function onExportClicked() {
    const selectedProfiles = container.find(
      'input[type="checkbox"]:checkbox:checked'
    );
    const profiles = [];

    selectedProfiles.each((_, selection) => {
      selection = $(selection);

      const selectedProfile = selection.closest(".artdeco-list__item");
      const profileData = getDataFromProfile(selectedProfile);
      profiles.push(profileData);
    });

    await createProspectFromArray(profiles);
    return profiles;
  }
  function getDataFromProfile(profile) {
    const profileElement = profile.find(".artdeco-entity-lockup__content");
    const name = profileElement.find('[data-anonymize="person-name"]').text();
    const rawLink = profileElement
      .find('[data-control-name="view_lead_panel_via_search_lead_name"]')
      .attr("href");
    const title = profileElement.find('[data-anonymize="title"]').text();

    const company = profileElement
      .find('[data-control-name="view_company_via_profile_lockup"]')
      .text()
      .trim();

    const linkRegex = RegExp("(?<=lead/).*?(?=,)");

    const profileId = linkRegex.exec(rawLink);
    const formatedLink = `https://www.linkedin.com/in/${profileId}`;
    return { name, title, company, link: formatedLink };
  }
  return;
};

export { handleSalesNavigator };
