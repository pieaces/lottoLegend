import dynamoDB from ".";
import Response from '../Response'
import { UpdateItemOutput, GetItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

export async function updateRecommendUsers(post: number, userName: string):Promise<Response> {
    const recommendUsers = await getRecommendUsers(post);
    const index = recommendUsers.indexOf(userName);
    if(index !== -1){
        await removeRecommendUser(post, index);
        return new Response(true, "이미 추천하셨습니다.");
    }
    const params = {
        TableName: 'LottoPosts',
        ExpressionAttributeNames: {
            "#Users": 'RecommendUsers',
        },
        ExpressionAttributeValues: {
            ":empty_list": {
                L: new Array()
            },
            ":element": {
                L: [{ S: userName }]
            },
        },
        Key: {
            "Id": {
                N: post.toString()
            }
        },
        UpdateExpression: `SET #Users = list_append(if_not_exists(#Users, :empty_list), :element)`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError, data: UpdateItemOutput) => {
            if (err) reject(err);
            resolve(new Response(false));
        });
    });
}

async function removeRecommendUser(post: number, index:number):Promise<void> {
    const params = {
        TableName: 'LottoPosts',
        ExpressionAttributeNames: {
            "#Users": 'RecommendUsers',
        },
        Key: {
            "Id": {
                N: post.toString()
            }
        },
        UpdateExpression: `Remove #Users[${index}]`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export function getRecommendUsers(post: number): Promise<string[]> {
    const params = {
        TableName: 'LottoPosts',
        ProjectionExpression: 'RecommendUsers',
        Key: {
            "Id": {
                N: post.toString()
            }
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.getItem(params, (err: AWSError, data: GetItemOutput) => {
            if (err) {
                reject(err);
            }
            if (data.Item) {
                resolve(data.Item.RecommendUsers.L.map(item => item.S));
            }else resolve([]);
        });
    });
}