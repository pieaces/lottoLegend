import { generateAndPutNumbers, deleteAllNumbers } from "./execute";

type Method = "generate" | "distribute";
const method: Method = process.argv[2] as Method;
switch (method) {
    case 'generate':
        const per = Number(process.argv[3]);
        const repeat = Number(process.argv[4]);
        generateAndPutNumbers(per, repeat).then();
        break;
    case 'distribute':
        deleteAllNumbers().then();
        break;
}