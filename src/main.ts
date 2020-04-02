import configure from './amplify/configure'
import { headerSign, isLogedIn } from './amplify/auth';

configure();
headerSign();

const imgBtn = document.querySelectorAll('.img-btn > i');
document.querySelector<HTMLElement>('.login-btn').onclick = () => {

}