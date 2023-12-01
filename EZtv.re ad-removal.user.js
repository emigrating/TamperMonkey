// ==UserScript==
// @name         EZtv ad removal
// @namespace    http://senseitweb.com/
// @version      1.0.2
// @description  Tries to stop the on-top ads taking over EZtv. Now includes 1337x support.
// @author       Arne Helseth
// @match        http*://eztvx.to/*
// @match        http*://eztv.ag/*
// @match        http*://eztv.it/*
// @match        http*://eztv.ch/*
// @match        http*://eztv.li/*
// @match        http*://1337x.to/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=eztv.re
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to disable interaction for the on-top ad elements
    function disableOnTopAdInteraction() {
        // Disable the iframe
        var iframe = document.querySelector('iframe[style*="position: absolute; top: -1000px; left: -1000px; visibility: hidden;"]');
        if (iframe) {
            iframe.remove();
            console.log('Disabled on-top ad iframe.');
        }

        // Disable interaction for the div with id "dontfoid"
        var dontfoidDiv = document.getElementById('dontfoid');
        if (dontfoidDiv) {
            dontfoidDiv.style.pointerEvents = 'none';
            console.log('Disabled interaction for on-top ad div.');
        }

        // Disable interaction for the anchor with id "dontfoid"
        var dontfoidAnchor = document.getElementById('dontfoid');
        if (dontfoidAnchor) {
            dontfoidAnchor.onclick = function(event) {
                event.preventDefault(); // Prevent the default action of the anchor (e.g., opening a new tab)
                console.log('Disabled interaction for on-top ad anchor.');
            };
        }
    }

    // Create a MutationObserver to watch for changes in the DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Check if the added nodes include the on-top ad elements
            var addedNodes = mutation.addedNodes;
            for (var i = 0; i < addedNodes.length; i++) {
                var addedNode = addedNodes[i];
                if (addedNode.tagName === 'IFRAME' || addedNode.tagName === 'A' || addedNode.tagName === 'DIV' || addedNode.tagName === 'SCRIPT'){
                    disableOnTopAdInteraction();
                    break; // No need to continue checking if one of the elements is found
                }
            }
        });
    });

    // Configure and start the MutationObserver
    var observerConfig = {
        childList: true, // Watch for changes to the child nodes (added or removed nodes)
        subtree: true // Watch for changes in the entire subtree of the target node
    };

    // Target the body element, but you can change it to a more specific target if needed
    var targetNode = document.body;

    // Start observing the target node
    observer.observe(targetNode, observerConfig);

})();