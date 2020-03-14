import dynamoDB from ".";
import Response from '../Response'
import { UpdateItemOutput, GetItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

export async function updateRecommendUsers(post: number, userName: string):Promise<Response> {
    const recommendUsers = await getRecommendUsers(post);
    const exist = recommendUsers.some(user => user === userName);
    if(exist){
        await removeRecommendUser(post, userName);
        return new Response(true, "이미 추천하셨습니다.");
    }
    const params = {
        TableName: 'LottoPosts',
        ExpressionAttributeNames: {
            "#Users": 'RecommendUsers',
        },
        ExpressionAttributeValues: {
            ":element": {
                SS: [userName]
            },
        },
        Key: {
            "Id": {
                N: post.toString()
            }
        },
        UpdateExpression: `ADD #Users :element`
    };

    return new Promise((resolve, reject) => {
        dynamoDB.updateItem(params, (err: AWSError) => {
            if (err) reject(err);
            resolve(new Response(false));
        });
    });
}

async function removeRecommendUser(post: number, userName:string):Promise<void> {
    const params = {
        TableName: 'LottoPosts',
        ExpressionAttributeNames: {
            "#Users": 'RecommendUsers',
        },
        ExpressionAttributeValues: {
            ":element": {
                SS: [userName]
            },
        },
        Key: {
            "Id": {
                N: post.toString()
            }
        },
        UpdateExpression: `DELETE #Users :element`
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