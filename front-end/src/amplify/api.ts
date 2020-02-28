
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'

const apiName = 'lotto';

export async function getAuthAPI(path: string) {
    const myInit = {
        headers: {
            'X-Id-Token': (await Auth.currentSession()).getIdToken().getJwtToken()
        },
        //response: true,
    }

    return await API.get(apiName, path, myInit);
}
export async function getUnAuthAPI(path: string, queryStringParameters: any = {}) {
    const myInit = {
        queryStringParameters,
        //response: true,
    }

    return await API.get(apiName, path, myInit);
}

export async function postAuthAPI(path: string = '/posts', body: any) {
    const myInit = {
        headers: {
            'X-Id-Token': (await Auth.currentSession()).getIdToken().getJwtToken()
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

export async function patchAuthAPI(path: string, body: any) {
    const myInit = {
        headers: {
            'X-Id-Token': (await Auth.currentSession()).getIdToken().getJwtToken()
        },
        body,
        //response: true,
    }

    return await API.patch(apiName, path, myInit);
}

export async function deleteAuthAPI(path: string) {
    const myInit = {
        headers: {
            'X-Id-Token': (await Auth.currentSession()).getIdToken().getJwtToken()
        }
        //response: true,
    }
    return await API.del(apiName, path, myInit);

}