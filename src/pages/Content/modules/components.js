const $ = require('jquery');

const navElement = $(`
    <div style="">
        <button >export</button>
    </div>
`);
navElement.css({
  display: 'flex',
  padding: '16px',
  alignItems: 'center',
});

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
        <button class="export-button">export</button>
    </div>
`
);

export { navElement, checkboxElement, controlPanelElement };
