import configure from './amplify/configure'
import { headerSign, isLogedIn } from './amplify/auth';

configure();
headerSign();

document.querySelector<HTMLElement>('.login-btn').onclick = () => {

}