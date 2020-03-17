// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.
const awsconfig = {
    Auth: {
        identityPoolId: 'ap-northeast-2:c1b4463a-0ac7-4fa3-badd-070953da6e4a',
        region: 'ap-northeast-2',
        identityPoolRegion: 'ap-northeast-2',
        userPoolId: 'ap-northeast-2_WbpNzuNyH',
        userPoolWebClientId: 'booh6pcsrkvt9c6b3iel2o09o',

        cookieStorage: {
            // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: '127.0.0.1',
            // OPTIONAL - Cookie path
            path: '/',
            // OPTIONAL - Cookie expiration in days
            expires: 7,
            // OPTIONAL - Cookie secure flag
            // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: false
        }
    },
    API: {
        endpoints: [
            {
                name: "lotto",
                endpoint: "https://gg0v4lri81.execute-api.ap-northeast-2.amazonaws.com/dev",
                region: "ap-northeast-2",
            }
        ]
    }
}

export default awsconfig;
