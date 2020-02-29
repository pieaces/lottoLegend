import configure from './amplify/configure'
import {getUnAuthAPI} from './amplify/api'
import Layout2 from "./functional/Layout/PureLayout2";

const layout = new Layout2();
configure();
getUnAuthAPI('/stats/mass/excludeInclude')
.then(value => console.log(value));
layout.init();