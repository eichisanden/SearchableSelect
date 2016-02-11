'use strict';

chrome.browserAction.onClicked.addListener(() => {

  const queryInfo = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  };

  chrome.tabs.query(queryInfo, (result) => {
    let currentTab = result.shift();

    let message = {'key': 'EXECUTE_SELECT2'};

    chrome.tabs.sendMessage(currentTab.id, message, () => {});
  });
});
