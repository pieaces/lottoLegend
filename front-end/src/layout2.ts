import configure from './amplify/configure'
import {getUnAuthAPI} from './amplify/api'
import Layout2 from "./functional/Layout/PureLayout2";

const layout = new Layout2();
configure();
getUnAuthAPI('/stats/mass/excludeInclude')
.then(data => {
    console.log(data);
    layout.setLayout2Data(data.data);
    layout.setTotal(data.total);
    layout.setWinNumbers(data.winNums);
    layout.init();
});