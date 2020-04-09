import configure from '../amplify/configure'
import { mqInit, menuInfoToggle } from '../base/headerHover';
import { loginAddEvent } from '../functions';

configure();
mqInit();
menuInfoToggle();
loginAddEvent();