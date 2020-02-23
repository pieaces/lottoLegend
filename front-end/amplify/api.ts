import Amplify, { API, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const apiName = 'lotto';

export async function getAuthAPI(path: string) {
    const myInit = {
        headers: {
            'X-Id-Token' : (await Auth.currentSession()).getIdToken().getJwtToken()
        },
        response: true,
    }

    return await API.get(apiName, path, myInit);
}
export async function getUnAuthAPI(path: string) {
    const myInit = {
        response: true,
    }

    return await API.get(apiName, path, myInit);
}

export async function postAuthAPI(path: string = '/posts', body:any) {
    const myInit = {
        headers: {
            'X-Id-Token' : (await Auth.currentSession()).getIdToken().getJwtToken()
        },
        body,
        response: true,
    }

    return await API.post(apiName, path, myInit);
}

export async function postUnAuthAPI(path: string = '/posts', body:any) {
    const myInit = {
        body,
        response: true,
    }

    return await API.post(apiName, path, myInit);
}