import { createProspectFromArray } from "./api";
import { checkboxElement, controlPanelElement } from "./components";
const $ = require("jquery");

const handleLinkedin = () => {
  const exportButton = controlPanelElement.find(".export-button");
  const selectAllButton = controlPanelElement.find(".select_all-button");

  const container = $(".search-results-container");

  let isAllSelected = true;
  selectAllButton.on("click", onSelectAllCicked);

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

  exportButton.on("click", onExportClicked);

  container.prepend(controlPanelElement);

  createCheckbox();

  getPopupData();

  $(document).on("scroll", () => {
    getPopupData();
  });

  function getPopupData() {
    const profiles = [];
    const searchResualts = $(".entity-result__item");
    searchResualts.each(function () {
      profiles.push(getDataFromProfile($(this)));
    });
    console.log(profiles);
    chrome.runtime.sendMessage(
      { event: "get-selectable-profiles-list", data: { profiles } },
      (response) => {
        console.log(response);
      }
    );
  }

  function createCheckbox() {
    const searchResualts = $(".entity-result__item");
    searchResualts.each(function () {
      $(this).css({ width: "100%", display: "flex", alignItems: "center" });
      $(this).prepend(checkboxElement.html());
    });
  }

  async function onExportClicked() {
    const profiles = [];
    selectedProfiles.each(async function () {
      const selectedProfile = $(this).closest(".entity-result__item");

      if (!selectedProfile.length) return;

      const profileData = getDataFromProfile(selectedProfile);

      profiles.push(profileData);
    });
    await createProspectFromArray(profiles);
  }

  function onSelectAllCicked() {
    const allProfiles = container.find('input[type="checkbox"]');

    allProfiles.each(function () {
      $(this).prop("checked", isAllSelected);
    });
    isAllSelected = !isAllSelected;
  }

  function getDataFromProfile(profile) {
    // const profileElement = profile.find('.artdeco-entity-lockup__content');
    const name = profile
      .find(".entity-result__title-text:first-child")
      .find('[aria-hidden="true"]')
      .text();
    const link = profile
      .find(".entity-result__title-text")
      .find("a")
      .attr("href");
    const title = profile
      .find(".entity-result__primary-subtitle")
      .text()
      .trim();

    const company = profile
      .find(".entity-result__summary:last-child")
      .text()
      .trim();

    return { name, title, company, link };
  }
};

export { handleLinkedin };
