import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports'

function init() {
    Amplify.configure(awsconfig);
}
export default init;