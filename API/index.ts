import AWS from 'aws-sdk'
import dataUriToBuffer from 'data-uri-to-buffer';
import Jimp from 'jimp';
const s3 = new AWS.S3();
const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}

function attachTimestamp(fileName: string): string {
    const date = new Date();
    return `${date.toISOString()}-${fileName}`;
}
function putImage(buffer: Buffer, fileName: string): Promise<AWS.S3.PutObjectOutput> {
    var params = {
        Body: buffer,
        Bucket: "canvas-lotto",
        Key: "images/" + fileName
    };
    return new Promise((resolve, reject) => {
        s3.putObject(params, function (err, data) {
            if (err) reject(err);
            else {
                resolve(data);
            }
        });
    });
}

exports.handler = async (event: any) => {
    console.log(event);
    let body: any;

    const imagePathList: AWS.S3.PutObjectOutput[] = [];
    const { imageList } = JSON.parse(event.body);
    imageList.forEach(async (image: { name: string; src: string; }) => {
        const fileName = attachTimestamp(image.name);
        const decoded = dataUriToBuffer(image.src);

        const buffer = await Jimp.read(decoded)
            .then(image => image.resize(Jimp.AUTO, 300))
            .then(image => image.quality(70))
            .then(image => image.getBufferAsync(Jimp.AUTO.toString()));

        imagePathList.push(await putImage(buffer, fileName));
    });

    const response = {
        statusCode:200,
        headers,
        body: JSON.stringify(imagePathList),
    };
    return response;
};