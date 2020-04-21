import verify from "./auth";
import { getPaymentByBankBook, makePaymentByBankBook, deletePaymentBank, getPayments, makePlan, makeDay, scanUsersForAdmin, PayMethod, getPlan, getPlanValue } from "./dynamoDB/payment";
import factory, { supply } from "./dynamoDB/factory";
import updateNumbers, { SelectTool } from "./dynamoDB/updateNumbers";
import { getCurrentRound } from "./funtions";

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}
exports.handler = async (event: any) => {
    console.log(event);

    const method: string = event.httpMethod;
    const resource: string = event.resource;

    let currentId: string = null;
    if (event.headers['x-id-token']) {
        try {
            const userInfo = verify(event.headers['x-id-token']);
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
                    if (currentId === 'lottoend')
                        body = await scanUsersForAdmin();
                    break;
            }
        }
            break;
        case '/admin/users/{userName}': {
            const userName = event.pathParameters.userName;
            switch (method) {
                case 'POST':
                    if (currentId === 'lottoend') {
                        const { plan, month, price, method } = JSON.parse(event.body);
                        await makePlan(userName, plan, month, price, method);
                        if (method as PayMethod === 'bank') await deletePaymentBank(userName);

                        const { statsDataObj, include } = await supply();
                        const numbers = { include };
                        const option = { per: 2, repeat: 25, numbers };
                        const numbersList = factory(statsDataObj, option);
                        
                        await updateNumbers(currentId, SelectTool.charge, getCurrentRound() + 1, numbersList.slice(0, getPlanValue(plan)));
                    }
                    break;
            }
        }
            break;
        case '/users/day': {
            switch (method) {
                case 'POST':
                    if (currentId) {
                        const { day } = JSON.parse(event.body);
                        await makeDay(currentId, day as 0 | 1 | 2 | 3 | 4 | 5 | 6);
                    }
            }
        }
            break;
        case '/users/payment': {
            switch (method) {
                case 'GET':
                    if (currentId) {
                        body = await getPayments(currentId);
                    }
                    break;
                // case 'POST':
                //     if (currentId) {
                //         const { plan, month, price, method } = JSON.parse(event.body);
                //         await makePlan(currentId, plan, month, price, method);
                //     }
            }
        }
            break;
        case '/users/payment/bankbook': {
            switch (method) {
                case 'GET':
                    if (currentId) {
                        body = await getPaymentByBankBook(currentId);
                    }
                    break;
                case 'POST':
                    if (currentId) {
                        const { bank, plan, person, month, price } = JSON.parse(event.body);
                        await makePaymentByBankBook(currentId, bank, person, plan, month, price);
                    }
                    break;
                case 'DELETE':
                    if (currentId) {
                        await deletePaymentBank(currentId);
                    }
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