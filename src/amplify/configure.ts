import 'regenerator-runtime/runtime'
import 'core-js/stable/promise'
import 'core-js/stable/object/assign'
import 'core-js/stable/string/includes'
import 'core-js/stable/object/values'
import 'core-js/stable/object/entries'
import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports'
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
}