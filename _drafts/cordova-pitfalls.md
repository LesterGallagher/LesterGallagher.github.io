---
lang: en
title: Cordova Pitfalls
image: ''
date: 
author: ''
description: ''
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
Settings -webkit-overflow-scrolling: touch with

<preference name="DisallowOverscroll" value="true" /><preference name="webviewbounce" value="false" />

does not work. You have to do: 

    * {
    	-webkit-overflow-scrolling: auto!important;
    }

pod install in platforms/ios

<allow-navigation href="*" />

Iphone X (weird stuff)

\- <meta name=”viewport” content=”...... initial-scale=1, width=device-width, height=device-height, viewport-fit=cover”>

pod install in platforms/ios

<allow-navigation href="*" />

 <preference name="DisallowOverscroll" value="true" />

        <preference name="webviewbounce" value="false" />

\* {

  -webkit-overflow-scrolling: auto!important;

}

<preference name="StatusBarOverlaysWebView" value="true" />

    <platform name="android">

<preference name="StatusBarBackgroundColor" value="#424242" />

</platform>

    <platform name="ios">

        <preference name="StatusBarStyle" value="blacktranslucent" />

</platform>

xcrun simctl io booted recordVideo appVideo.mov

if (ons.platform.isIPhoneX() || window.location.href.includes('iphone-x')) { // Utility function

    // Add empty attribute to the <html> element

    document.documentElement.setAttribute('onsflag-iphonex-portrait', '');

}

if (window.location.protocol === 'file:') {

    ons.enableAutoStatusBarFill();

}

ons.ready(() => {

    ons.disableDeviceBackButtonHandler();

    

    // Or to change the behavior

    ons.setDefaultDeviceBackButtonListener(function (e) {

        e.preventDefault();

        console.log("back button pressed")

        const { history: { length } } = window;

        //Retrieve app's history

        //Check that there's only one screen in history (the current one):

        if (length >= 1) {

            console.log('EXIT_APP');

            alert('EXIT_APP?');

            navigator.app.exitApp();

        } else {

            console.log('BACK_HISTORY')

            navigator.app.backHistory();

        }

    });

}, false);