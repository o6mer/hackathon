import { createProspectFromArray } from "./api";
import { navElement } from "./components";
const $ = require("jquery");

const handleSalesNavigator = async () => {
  const scrollable = $("._vertical-scroll-results_1igybl");

  const navBar = $("._sticky-nav_1igybl");
  const container = $("#content-main > div.flex > div.full-width");

  navBar.append(navElement);

  getPopupData();

  const exportButton = navElement.find("button");

  scrollable.on("scroll", async () => {
    await getPopupData();
  });

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

  async function getProfileList(profileList) {
    const profiles = [];

    profileList.each(async (_, selection) => {
      selection = $(selection);

      const profileData = await getDataFromProfile(selection);
      profiles.push(profileData);
    });
    return profiles;
  }

  async function getPopupData() {
    const selectableProfiles = $(".artdeco-list__item");
    const profiles = await getProfileList(selectableProfiles);
    console.log({ profiles, selectableProfiles });
    chrome.runtime.sendMessage(
      { event: "get-selectable-profiles-list", data: { profiles } },
      (response) => {
        console.log(response);
      }
    );
  }

  async function onExportClicked() {
    const selectedProfiles = container
      .find('input[type="checkbox"]:checkbox:checked')
      .closest(".artdeco-list__item");

    const profiles = await getProfileList(selectedProfiles);
    console.log(profiles);
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
