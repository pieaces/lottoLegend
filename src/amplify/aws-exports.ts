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
            domain: 'lottoend.com',
            //domain: '127.0.0.1',
            // OPTIONAL - Cookie path
            path: '/',
            // OPTIONAL - Cookie expiration in days
            expires: 7,
            // OPTIONAL - Cookie secure flag
            // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: true
        }
    },
    API: {
        endpoints: [
            {
                name: "lotto",
                endpoint: "https://gg0v4lri81.execute-api.ap-northeast-2.amazonaws.com/prod",
                region: "ap-northeast-2",
            }
        ]
    },
    Analytics: {
        // OPTIONAL - disable Analytics if true
        disabled: false,
        // OPTIONAL - Allow recording session events. Default is true.
        autoSessionRecord: true,

        AWSPinpoint: {
            // OPTIONAL -  Amazon Pinpoint App Client ID
            appId: '7f944c1d4f6f4fe8826dd1c3412c365f',
            // OPTIONAL -  Amazon service region
            region: 'us-west-2',
            // OPTIONAL -  Customized endpoint
        },

        // Buffer settings used for reporting analytics events.
        // OPTIONAL - The buffer size for events in number of items.
        bufferSize: 1000,

        // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
        flushInterval: 5000, // 5s 

        // OPTIONAL - The number of events to be deleted from the buffer when flushed.
        flushSize: 100,

        // OPTIONAL - The limit for failed recording retries.
        resendLimit: 5
    }
}

export default awsconfig;
