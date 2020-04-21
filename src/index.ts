import { generateAndPutNumbers, deleteAllNumbers } from "./execute";

type Method = "generate" | "delete" | "distribute";
const method: Method = process.argv[2] as Method;
switch (method) {
    case 'generate':
        const per = Number(process.argv[3]);
        const repeat = Number(process.argv[4]);
        console.log(per, repeat);
        generateAndPutNumbers(per, repeat).then(() => console.log('generate complete'));
        break;
    case 'delete':
        deleteAllNumbers().then(() => console.log('distribute complete'));
        break;
    default:
        console.log('wrong parameters');
}
