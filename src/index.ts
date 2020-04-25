import verify from "./auth";
import { getPaymentByBankBook, makePaymentByBankBook, deletePaymentBank, getPayments, makePlan, makeDay, scanUsersForAdmin, PayMethod, getPlanValue } from "./dynamoDB/payment";
import updateNumbers, { SelectTool } from "./dynamoDB/updateNumbers";
import { getCurrentRound } from "./funtions";
import { putNumberMessage, getPhoneNumber } from "./sns/publish";
import { getPaymentBankForComputer } from "./dynamoDB/userInfo";
import { scanNumbers, deleteNumbers } from "./dynamoDB/Numbers";

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Max-Age":3600,
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Cache-Control": "max-age=3"
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
                        const { plan, month, price } = await getPaymentBankForComputer(userName);
                        const method = 'bank';
                        await makePlan(userName, plan, month, price, method);
                        if (method as PayMethod === 'bank') await deletePaymentBank(userName);

                        const planValue = getPlanValue(plan);

                        const { numbersList, count } = await scanNumbers();//index 내림차순으로 가져옴
                        const sum = planValue;
                        for (let index = count - 1; index >= count - sum; index--) {
                            await deleteNumbers(index);
                        }

                        const willPutNumbers = numbersList.slice(0, planValue);
                        await updateNumbers(userName, SelectTool.charge, getCurrentRound() + 1, willPutNumbers);
                        const phone = await getPhoneNumber(userName);
                        if(phone) await putNumberMessage('', planValue, willPutNumbers, phone);
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
                        console.log(`[무통장입금] // 아이디:${currentId}, 은행: ${bank}, 요금제: ${plan}, 입금자명: ${person}, 개월수: ${month}, 금액: ${price}`);
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