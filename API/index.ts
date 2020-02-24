import AWS from 'aws-sdk'
import sharp from 'sharp'
const s3 = new AWS.S3();
const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}

function putImage(buffer: Buffer, fileName: string): Promise<AWS.S3.PutObjectOutput> {
    var params = {
        Body: buffer,
        Bucket: "canvas-lotto",
        Key: "images/" + fileName
    };
    return new Promise((resolve, reject) => {
        s3.putObject(params, function (err) {
            if (err) reject(err);
            else {
                resolve();
            }
        });
    });
}
console.log('START');
exports.handler = async (event: any) => {
    console.log('imageProcessing');
    let body: any;

    const { imageList } = JSON.parse(event.body);

    for(let i =0; i<imageList.length; i++){
        const image = imageList[i];

        const buffer = await sharp(Buffer.from(image.src.split(",")[1], 'base64'))
            .resize(500)
            .jpeg({ quality: 70 })
            .toBuffer();
            
        await putImage(buffer, image.name);
    }

    const response = {
        statusCode:200,
        headers,
        body: "true",
    };
    return response;
};