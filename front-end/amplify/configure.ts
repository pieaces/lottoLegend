import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports'

export default function configure() {
    Amplify.configure(awsconfig);
}