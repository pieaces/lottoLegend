import configure from '../amplify/configure'
import DataAPI from "./premium/DataAPI";
import Layout, { IDataAPI } from './premium/Layout'
import { isLogedIn } from '../amplify/auth';
import { onlyUserAlert, makeLoading, removeLoading } from '../functions';
makeLoading();
configure();

isLogedIn().then(async (value) => {
    if (value) {
        await DataAPI.getInstance().init().then(() => {
            const layout = new Layout(DataAPI.getInstance() as IDataAPI);
            layout.init();
        });
        removeLoading();
    }else onlyUserAlert();
})