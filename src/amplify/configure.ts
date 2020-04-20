import 'regenerator-runtime/runtime'
import 'core-js/stable/promise'
import 'core-js/stable/object/assign'
import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports'
import Analytics from '@aws-amplify/analytics';
import { headerSign } from './auth';
import { mqInit, menuInfoToggle } from '../base/headerHover'
export default function configure() {
    if (!('remove' in Element.prototype)) {
        HTMLElement.prototype['remove'] = function () {
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