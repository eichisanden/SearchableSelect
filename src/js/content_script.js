'use strict';

const jQuery = require('jquery');
require('select2');

chrome.runtime.onMessage.addListener(
  message => {
    if (message.key === 'EXECUTE_SELECT2') {
      jQuery('select').select2({'language': 'ja'});
    }
  }
);
