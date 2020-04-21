import verify from "./auth";
import { getPaymentByBankBook, makePaymentByBankBook, deletePaymentBank, getPayments, makePlan, makeDay, scanUsersForAdmin, PayMethod } from "./dynamoDB/payment";

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}
exports.handler = async (event: any) => {
    if (event['detail-type'] === 'Scheduled Event') {
        return console.log('Scheduled Event');
    }
    console.log(event);

    const method: string = event.httpMethod;
    const resource: string = event.resource;
    let logedIn: boolean = false;

    let currentId: string;
    if (event.headers['x-id-token']) {
        try {
            const userInfo = verify(event.headers['x-id-token']);
            logedIn = true;
            currentId = userInfo["cognito:username"];
        } catch (err) {
            console.log('Intruder Alert! - Expired Token', err);
            const response = {
                statusCode: 400,
                headers,
            };
            return response;
        }
    }

    let statusCode: number = 200;
    let body: any;
    switch (resource) {
        case '/admin/users': {
            switch (method) {
                case 'GET':
                    if(currentId === 'lottoend')
                        body = await scanUsersForAdmin();
                    break;
            }
        }
            break;
            case '/admin/users/{userName}': {
                const userName = event.pathParameters.userName;
                switch (method) {
                    case 'POST':
                        if(currentId === 'lottoend'){
                            const { plan, month, price, method } = JSON.parse(event.body);
                            await makePlan(userName, plan, month, price, method);
                            if(method as PayMethod === 'bank') await deletePaymentBank(userName);
                        }
                        break;
                }
            }
                break;
        case '/users/day': {
            switch(method){
                case 'POST':
                    const {day} = JSON.parse(event.body);
                    await makeDay(currentId, day as 0|1|2|3|4|5|6);
            }
        }
        break;
        case '/users/payment': {
            switch (method) {
                case 'GET':
                    body = await getPayments(currentId);
                    break;
                case 'POST':
                    const {plan, month, price, method} = JSON.parse(event.body);
                    await makePlan(currentId, plan, month, price, method);
            }
        }
        break;
        case '/users/payment/bankbook': {
            switch (method) {
                case 'GET':
                    body = await getPaymentByBankBook(currentId);
                    break;
                case 'POST':
                    const { bank, plan, person, month, price } = JSON.parse(event.body);
                    await makePaymentByBankBook(currentId, bank, person, plan, month, price);
                    break;
                case 'DELETE':
                    await deletePaymentBank(currentId);
                    break;
            }
        }
            break;
    }
    const response = {
        statusCode,
        headers,
        body: JSON.stringify(body),
    };
    return response;
};