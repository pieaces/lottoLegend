import configure from "../amplify/configure";
import { getAuthAPI } from "../amplify/api";

configure();

getAuthAPI('/stats/mass', {method:'excludeInclude'}).then(data => console.log(data));