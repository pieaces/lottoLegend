import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports'
import Analytics from '@aws-amplify/analytics';
import { headerSign } from './auth';
import { mqInit, menuInfoToggle } from '../base/headerHover'

import 'whatwg-fetch'
import 'core-js/stable/object/assign'
import 'core-js/stable/array/includes'
import 'regenerator-runtime/runtime'
import 'core-js/stable/promise'
export default function configure() {
    if ('NodeList' in window && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }
    if (!('remove' in Element.prototype)) {
        (<any>Element.prototype)['remove'] = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }
    mqInit();
    menuInfoToggle();
    Amplify.configure(awsconfig);
    headerSign();

    Analytics.autoTrack('pageView', {
        enable: true,
        eventName: 'pageView',
        attributes: () => {
            const url = window.location.pathname.slice(1);
            const attr = url.slice(0, url.indexOf('/'));
            return {
                attr: attr
            }
        },
        // OPTIONAL, by default is 'multiPageApp'
        // you need to change it to 'SPA' if your app is a single-page app like React
        type: 'multiPageApp',
        getUrl: () => {
            return window.location.pathname;
        }
    });
}