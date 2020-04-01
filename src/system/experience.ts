import configure from '../amplify/configure'
import DataAPI from "./experience/index";
import Layout, { IDataAPI } from './premium/Layout'
import { headerSign } from '../amplify/auth';

configure();
headerSign();

import Analytics from '@aws-amplify/analytics';
//Record a custom event
Analytics.record({
    name: 'Album',
    attributes: { genre: 'Rock', year: '1989' }
}).then(value => console.log(value));

Analytics.autoTrack('pageView', {
    // REQUIRED, turn on/off the auto tracking
    enable: true,
    // OPTIONAL, the event name, by default is 'pageView'
    eventName: 'pageView',
    // OPTIONAL, the attributes of the event, you can either pass an object or a function 
    // which allows you to define dynamic attributes
    attributes: {
        attr: 'attr'
    },
    // when using function
    // attributes: () => {
    //    const attr = somewhere();
    //    return {
    //        myAttr: attr
    //    }
    // },
    // OPTIONAL, by default is 'multiPageApp'
    // you need to change it to 'SPA' if your app is a single-page app like React
    type: 'multiPageApp',
    // OPTIONAL, the service provider, by default is the AWS Pinpoint
    provider: 'AWSPinpoint',
    // OPTIONAL, to get the current page url
    getUrl: () => {
        // the default function
        return window.location.origin + window.location.pathname;
    }
});

const loading = document.querySelector<HTMLElement>('.loading-box');
loading.classList.remove('none');
const layout = new Layout(DataAPI.getInstance() as IDataAPI);
layout.init();
loading.classList.add('none');