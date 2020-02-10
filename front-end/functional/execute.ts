import DataAPI from "./DataAPI";
import Layout from './Layout'

const layout = new Layout();
async function execute() {
    await DataAPI.getInstance().init();
    layout.init();
}
execute();