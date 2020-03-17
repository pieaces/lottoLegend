import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

const pem = jwkToPem({
    "alg": "RS256",
    "e": "AQAB",
    "kid": "iEEJai7+dBRG78TChUQF/y1MR+OHGkwiY3ang0kMSJI=",
    "kty": "RSA",
    "n": "jTx_aOudg8n-T3o86X-1nlRVKWThpGwx-af5zIp_aoeanPvMqyd1LnQAiiXTCufLvo-j2MDiUivPFnsbVS1JJoUj5OKlIRdjILgP_-FO-0OXira3bA5yaZIzbehk8UfKzNmxH1B-48_wrYOZjqebWOjJ1aBw-09EAEiQqAhdU4kSy7LCIxUpfqRnMOhvM-7DFRtEHmVnsfl_kBSj3WJg7SR7ak945wieiW4mwVoRqZUO7YlNeHpnzkWMb3yIRNvwjB_-Zh5EpsNYBgXRtEXXl3ldyhNwUaq2HC5y7BNg9fb4gwhJP8DgDMRtfun7odD3teTK2rptU5kzS5Q4jjFZoQ",
    "use": "sig"
});

export default function verify(token:string) {
    return jwt.verify(token, pem, { algorithms: ['RS256'] }) as { 'cognito:username': string, nickname: string }; //event.headers['x-id-token']
}