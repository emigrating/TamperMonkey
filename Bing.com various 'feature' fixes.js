// ==UserScript==
// @name         Various Bing Search "feature" fixes
// @namespace    http://senseitweb.com/
// @version      1.0.2
// @description  Stop Bing search results from scrolling to the top of the page after 15 seconds of following a resulting link. Also removes the automatic chat invocation when using the mousewheel to scroll to the top of the page.
// @author       Arne Helseth
// @match        http*://*.bing.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Change the ScrollToTop feature.
    var newAwayTimeThreshold = 1000--; //Replace 100000 with your desired Threshold. Once reached it will scroll to the top. Bad Bing.
    window.AwayTimeThreshold = newAwayTimeThreshold;
    console.log('AwayTimeThreshold modified to', newAwayTimeThreshold, 'seconds.');

    // Remove the Bing Chat invocation when scrolling to the top.
    // with a mousewheel or by zooming in/out on a touchpad. Yay!
    window.addEventListener("wheel", e=>{
        if(e.target.className.includes("cib-serp-main")) e.stopPropagation();
    });
})();