import { generateAndPutNumbers, deleteAllNumbers, distribute } from "./execute";

type Method = "generate" | "distribute" | "delete";
const method: Method = process.argv[2] as Method;
//per:10, repeat:50 | per:20, repeat:100
console.log(new Date());
switch (method) {
    case 'generate':
        const per = Number(process.argv[3]);
        const repeat = Number(process.argv[4]);
        console.log(`per: ${per}, repeat:${repeat}`);
        if(isNumber(per) && isNumber(repeat)) generateAndPutNumbers(per, repeat).then(() => console.log('generate complete'));
        else console.log('generate failure wrong type');
        break;
    case 'distribute':
        distribute().then(() => console.log('distribute complete'));
        break;
    case 'delete':
        deleteAllNumbers().then(() => console.log('delete complete'));
        break;
    default:
        console.log('wrong parameters');
}

function isNumber(a: any): a is number {
    return (typeof a === 'number' && !isNaN(a));
}