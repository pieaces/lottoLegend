
import API from '@aws-amplify/api'
import { getIdToken } from './auth';

const apiName = 'lotto';

export async function getAuthAPI(path: string, queryStringParameters?: any) {
    const myInit = {
        headers: {
            'X-Id-Token': await getIdToken()
        },
        queryStringParameters,
        //response: true,
    }

    return await API.get(apiName, path, myInit);
}
export async function getUnAuthAPI(path: string, queryStringParameters?: any) {
    const myInit = {
        queryStringParameters,
        //response: true,
    }

    return await API.get(apiName, path, myInit);
}

export async function postAuthAPI(path: string = '/posts', body?: any) {
    const myInit = {
        headers: {
            'X-Id-Token': await getIdToken()
        },
        body,
        //response: true,
    }

    return await API.post(apiName, path, myInit);
}

export async function postUnAuthAPI(path: string = '/posts', body: any) {
    const myInit = {
        body,
        //response: true,
    }

    return await API.post(apiName, path, myInit);
}

export async function patchAuthAPI(path: string, body?: any) {
    const myInit = {
        headers: {
            'X-Id-Token': await getIdToken()
        },
        body,
        //response: true,
    }

    return await API.patch(apiName, path, myInit);
}

export async function deleteAuthAPI(path: string, body?: any) {
    const myInit = {
        headers: {
            'X-Id-Token': await getIdToken()
        },
        body,
        //response: true,
    }
    return await API.del(apiName, path, myInit);

}