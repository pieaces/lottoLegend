import configure from '../amplify/configure'
import DataAPI from "./experience/index";
import Layout, { IDataAPI } from './premium/Layout'
import { headerSign } from '../amplify/auth';

configure();
headerSign();

const loading = document.querySelector<HTMLElement>('.loading-box');
loading.classList.remove('none');
const layout = new Layout(DataAPI.getInstance() as IDataAPI);
layout.init();
loading.classList.add('none');