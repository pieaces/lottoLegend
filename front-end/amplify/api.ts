import Amplify, { API, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

export default async function getAPI(path: string) {
    let apiName = 'lotto';
    let myInit = { // OPTIONAL
        headers: {
            'X-Id-Token' : (await Auth.currentSession()).getIdToken().getJwtToken()
        }, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        // queryStringParameters: {  // OPTIONAL
        //     name: 'param'
        // }
    }

    return await API.get(apiName, path, myInit);
}