import { checkboxElement, controlPanelElement } from './components';
const $ = require('jquery');

const handleLinkedin = () => {
  const exportButton = controlPanelElement.find('.export-button');
  const selectAllButton = controlPanelElement.find('.select_all-button');

  const container = $('.search-results-container');

  let isAllSelected = true;
  selectAllButton.on('click', () => {
    const allProfiles = container.find('input[type="checkbox"]');
    allProfiles.each(function () {
      $(this).prop('checked', isAllSelected);
    });
    isAllSelected = !isAllSelected;
  });

  exportButton.on('click', () => {
    const selectedProfiles = container.find(
      'input[type="checkbox"]:checkbox:checked'
    );

    const profiles = [];
    selectedProfiles.each(function () {
      const selectedProfile = $(this).closest('.entity-result__item');

      if (!selectedProfile.length) return;

      const profileData = getDataFromProfile(selectedProfile);

      profiles.push(profileData);
    });
    console.log(profiles);
  });

  container.prepend(controlPanelElement);

  const searchResualts = $('.entity-result__item');
  searchResualts.each(function () {
    $(this).css({ width: '100%', display: 'flex', alignItems: 'center' });
    $(this).prepend(checkboxElement.html());
  });

  function getDataFromProfile(profile) {
    // const profileElement = profile.find('.artdeco-entity-lockup__content');
    const name = profile
      .find('.entity-result__title-text:first-child')
      .find('[aria-hidden="true"]')
      .text();
    const formatedLink = profile
      .find('.entity-result__title-text')
      .find('a')
      .attr('href');
    const title = profile
      .find('.entity-result__primary-subtitle')
      .text()
      .trim();

    const company = profile
      .find('.entity-result__summary:last-child')
      .text()
      .trim();

    // const linkRegex = RegExp('(?<=lead/).*?(?=,)');

    // const profileId = linkRegex.exec(rawLink);
    // const formatedLink = `https://www.linkedin.com/in/${profileId}`;
    return { name, title, company, formatedLink };
  }
};

export { handleLinkedin };
