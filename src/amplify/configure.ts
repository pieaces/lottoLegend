import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports'
import Analytics from '@aws-amplify/analytics';
import { headerSign } from './auth';

export default function configure() {
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