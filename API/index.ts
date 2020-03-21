import factory from "./dynamoDB/factory";

exports.handler = async (event: any) => {
    console.log(event);
    
    const data = await factory();

};

const start = new Date();
factory()
.then(data => {
    const end = new Date();
    console.log(data.length);
    console.log(Number(end) - Number(start));
})