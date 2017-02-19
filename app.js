"use strict";
var phantom = require('phantom'),
    path = require('path');



runPhantomProcess();

// =====================================================================================================================
// Phantom
// =====================================================================================================================

/**
 * Spin up an instance of phantom, open a local web file, render a pdf of the page
 */
function runPhantomProcess() {
  var phInstance = null;
  var phantomProcess = phantom.create()
  // Create a page instance
    .then(function (ph) {
      // store an instance of phantom
      phInstance = ph;

      // Create a page
      return ph.createPage();
    })
    // Handle page properties and open file
    .then(function (page) {
      // Define the page properties
      definePageProperties(phInstance, page);

      // Open and render a page
      openPage(phInstance, page);
    }).catch(function (e) {
      console.log('----------------------------------------');
      console.log('Phantom Catch');
      console.error(e);
      phInstance.exit();
    })
}

/**
 * Add properties to the page instance
 *
 * @param phInstance
 * @param page
 */
function definePageProperties(phInstance, page) {

  page.property('paperSize', {
    format: 'A4',
    orientation: 'portrait',
    margin: 0
  });

  page.property('onConsoleMessage', function (msg) {
    console.log('----------------------------------------');
    console.info('console message from webapp: ' + msg);
  });

  page.property('onError', function (msg, trace) {
    console.log('----------------------------------------');
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
      msgStack.push('TRACE:');
      trace.forEach(function (t) {
        msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
      });
    }
    console.error(msgStack.join('\n'));
  });
}

/**
 * Return an absolute path to the requested template
 *
 * @returns {string}
 */
function getTemplatePath() {
  return 'file://' + path.resolve('web/index.html');
}

/**
 * Return a relative path to the requested destination
 *
 * @returns {string}
 */
function getOutputPath() {
  return path.join.apply(null, ["output","trigger-words.jpg"]);
}

/**
 * Open and render an instance of the page
 *
 * @param phInstance
 * @param page
 */
function openPage(phInstance, page) {
  page.open(getTemplatePath())
    .then(function (status) {
      console.log('----------------------------------------');
      console.info('Status: ' + status);

        setTimeout(function() {
            page.render(getOutputPath());
        }, 1000);

      if (status !== 'success') {
          phInstance.exit();
        }
      }
    );
}
