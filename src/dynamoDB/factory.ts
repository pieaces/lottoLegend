import { StatsMethod } from "../interface/LottoDB";
import queryStats from "./queryStats";
import { GeneratorOption } from "../interface/Generator";
import Generator from "../Lotto/class/Generator";

const valueList:any = {
    lowCount: [0, 1, 2, 3, 4, 5, 6],
    sum: [{ from: 21, to: 31 }, { from: 31, to: 41 }, { from: 41, to: 51 }, { from: 51, to: 61 }, { from: 61, to: 71 }, { from: 71, to: 81 }, { from: 81, to: 91 }, { from: 91, to: 101 }, { from: 101, to: 111 }, { from: 111, to: 121 }, { from: 121, to: 131 }, { from: 131, to: 141 }, { from: 141, to: 151 }, { from: 151, to: 161 }, { from: 161, to: 171 }, { from: 171, to: 181 }, { from: 181, to: 191 }, { from: 191, to: 201 }, { from: 201, to: 211 }, { from: 211, to: 221 }, { from: 221, to: 231 }, { from: 231, to: 241 }, { from: 241, to: 251 }, { from: 251, to: 255 }],
    oddCount: [0, 1, 2, 3, 4, 5, 6],
    primeCount: [0, 1, 2, 3, 4, 5, 6],
    $3Count: [0, 1, 2, 3, 4, 5, 6],
    sum$10: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    diffMaxMin: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    AC: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
}

function returnOption(statsData: any, method: StatsMethod): any[] {
    const box: { index: number, x: number, pos: number }[] = [];
    for (let i = 0; i < statsData.pos.length; i++) {
        let x = statsData.ideal['all'][i] - statsData.actual['all'][i];
        if (statsData.ideal['all'][i] >= statsData.actual['all'][i]) x /= statsData.ideal['all'][i];
        else x /= statsData.actual['all'][i];
        let y = statsData.ideal['latest'][i] - statsData.actual['latest'][i];
        if (statsData.ideal['latest'][i] >= statsData.actual['latest'][i]) y /= statsData.ideal['latest'][i];
        else y /= statsData.actual['latest'][i];

        const data = { index: i, x: Math.pow(2, x) * Math.pow(2, y), pos: statsData.pos[i] };
        if(data.x !== 4) box.push(data);
    }
    const result = new Set<any>();
    const x = valueList[method][box.sort((a, b) => b.x - a.x)[0].index];
    result.add(x);

    box.sort((a, b) => b.pos - a.pos);
    for (let i = 0; i < valueList[method].length / 6; i++) {
        result.add(valueList[method][box[i].index]);
    }
    for (let i = 0; i < valueList[method].length / 6; i++) {
        const random = valueList[method][Math.floor(Math.random() * (valueList[method].length))]
        result.add(random);
    }

    return [...result];
}

export async function supply(){
    const statsDataObj: any = {};
    for (const method in StatsMethod) {
        statsDataObj[method] = await queryStats(method as StatsMethod);
    }
    const include = await queryStats('howLongNone')
    .then((data: any[]) => data.map((data, index) => {
        return {
            num: index + 1,
            round: data.round
        }
    }))
    .then(data => [...data.sort((a, b) => a.round - b.round).slice(0, 20).map(item => item.num)]);
    return {statsDataObj, include};
}
interface FactoryNumber{
    exclude?:number[],
    include?:number[]
}
export default function factory(statsDataObj:any, option:{per:number, repeat:number, numbers?:FactoryNumber}) {
    const result: number[][] = [];
    for (let i = 0; i < option.repeat; i++) {
        result.push(...generate(statsDataObj, option.per, option.numbers));
    }
    result.sort(() => 0.5 - Math.random());
    return result;
}

function generate(statsDataObj: any, per:number, numbers?:FactoryNumber){
    const option: GeneratorOption|any = {};

    for (const method in StatsMethod) {
        option[method] = returnOption(statsDataObj[method], method as StatsMethod);
    }
    
    option.lowCount = returnLowCountOption();
    if (numbers.exclude) {
        (option.excludedNumbers = numbers.exclude);
    }else option.excludedNumbers = randomNumbers();
    
    if (numbers.include) {
        const randomPickCount = Math.floor(Math.random() * 2);
        (option.includedNumbers = numbers.include.sort(() => 0.5 - Math.random()).slice(0, randomPickCount));
    }

    const generator = new Generator(option);
    generator.generate();

    return generator.getGeneratedNumbers().sort(() => 0.5 - Math.random()).slice(0, per);
}

function returnLowCountOption(){
    const random = Math.random();
    if(random < 0.05){
        return 0;
    }else if(random < 0.1028){
        return 1;
    }else if(random <0.3539){
        return 2;
    }else if(random < 0.6887){
        return 3;
    }else if(random < 0.9159){
        return 4;
    }else if(random < 0.95){
        return 5;
    }else return 6;
}

function randomNumbers() {
    const set = new Set();
    while (set.size < 10) {
        set.add(Math.floor(Math.random() * 45) + 1);
    }
    return [...set];
}
