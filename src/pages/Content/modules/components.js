const $ = require('jquery');

const exportButtonElement = `
        <button class="export-button">export</button>

`;

const navElement = $(`
    <div class="nav-element">
    </div>
`);

navElement.append(exportButtonElement);

const checkboxElement = $(
  ` <div>
        <div class="best-checkbox" style="display: flex; align-items: center; padding: 0 8px;">
            <input type="checkbox" style="opacity: 1 !important; pointer-events: auto !important; margin: 0; cursor: pointer;" />
        </div
    </div>
    `
);

const controlPanelElement = $(
  `
    <div class="control-panel">
        <div class="select_all-button">
            <input type="checkbox" />
            <p>Select All</p>
        </div>
    </div>
`
);

controlPanelElement.append(exportButtonElement);

export { navElement, checkboxElement, controlPanelElement };
