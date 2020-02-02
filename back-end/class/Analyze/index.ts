import LottoBase, {LData} from '../Lotto/Base'
import PosAnalyze from './PosAnalyze'
import {LottoNumber} from '../Generator/Base'

interface HarmonyData {
    one: number;
    another: number;
    count: number;
    round: number;
    date: string;
}
interface HData {
    count: number;
    round: number;
    date: string;
}
//분석: 이차원 데이터 => 일차원 데이터
export default class Analyze extends PosAnalyze {
    private constructor() { super(); }

    static frequencyCount(numsArray: Array<number[]>): number[] {
        const result = new Array<number>(LottoBase.BALL_NUM).fill(0);

        for (let i = 0; i < numsArray.length; i++) {
            for (let j = 0; j < numsArray[i].length; j++)
                result[numsArray[i][j] - 1]++;
        }

        return result;
    }

    static carryCount(numsArray: Array<number[]>): number[] {
        const result = new Array<number>(numsArray.length-1).fill(0);

        numsArray.forEach((numbers, index, array) => {
            let count = 0;
            numbers.forEach(num => {
                if(!!array[index+1] && array[index+1].indexOf(num) !== -1) count++;
            });
            result[index] = count;
        });
        result.pop();
        return result;
    }
    
    private static emergedPoint(numsArray: Array<number[]>): Array<number[]> {
        const result:Array<number[]> = [];
        for(let i =0; i<LottoBase.BALL_NUM; i++) result[i] = [];
        numsArray.forEach((numbers, round) => {
            numbers.forEach(num => result[num-1].push(round));
        });

        return result;
    }

    private static emergedPointForOne(numsArray: Array<number[]>, one:LottoNumber): number[] {//가장최근회차 기준
        const result:number[] = [];
        numsArray.forEach((numbers, round)=>{
            numbers.forEach(num => {
                if(num === one) result.push(round);
            });
        });

        return result;
    }

    public static emergedRoundForOne(lData:LData[], one:LottoNumber): number[] {
        const result:number[] = [];
        lData.forEach((lotto)=>{
            lotto.numbers.forEach(num => {
                if(num === one) result.push(lotto.round);
            });
        });

        return result;
    }
    public static emergedBooleanForOne(numsArray:Array<number[]>, one:LottoNumber): boolean[] {
        const result = new Array<boolean>(numsArray.length).fill(false);
        numsArray.forEach((numbers, index) => {
            let flag = false;
            for(let i =0; i<numbers.length; i++){
                if(one === numbers[i]){
                    flag = true;
                    break;
                }
            }
            if(flag){
                result[index] = true;
            }
        })

        return result;
    }
    public static interval(numsArray: Array<number[]>): Array<number[]>{
        return Analyze.emergedPoint(numsArray).map(points => {
            const result = [];
            if(points.length > 0){
                result[0] = points[0];
                for(let i=1; i<points.length; i++)
                result[i] = points[i] - points[i-1];
            }            
            return result;
        })
    }

    public static intervalForOne(numsArray: Array<number[]>, one:LottoNumber): number[]{//가장최근회차 기준
        const points = Analyze.emergedPointForOne(numsArray, one);
        const result = [];
        if(points.length < 1) return null;
        result[0] = points[0];
        for(let i=1; i<points.length; i++){
            result[i] = points[i] - points[i-1];
        }
        return result;
    }

    static howLongNone(lottoArray: LData[]): HData[] {
        const isChecked = (hData: HData[]): boolean => {
            let check: boolean = true;
            for (let i = 0; i < hData.length; i++) {
                if (hData[i].count === -1) {
                    check = false;
                    break;
                }
            }
            return check;
        }
        const results:HData[] = new Array<HData>(LottoBase.BALL_NUM);
        for(let i=0; i<LottoBase.BALL_NUM; i++) results[i] = ({count:-1, round:0, date:''});

        for (let i = lottoArray.length-1; i >= 0; i--) {
            for (let j = 0; j < lottoArray[i].numbers.length; j++) {
                const num = lottoArray[i].numbers[j];
                if (results[num - 1].count === -1){
                    results[num - 1].count = num;
                    results[num - 1].round = lottoArray[i].round;
                    results[num - 1].date = lottoArray[i].date;
                }
            }
            if (isChecked(results)) break;
        }
        return results;
    }

    static harmony(lottoArray: LData[]): HarmonyData[] {
        const harmonyHash = (lottoArray: LData[]): Array<HData[]> => {
            const result: Array<HData[]> = [];
            for (let i = 1; i < LottoBase.BALL_NUM; i++) {
                const temp: HData[] = [];
                for (let j = 0; j < LottoBase.BALL_NUM - i; j++) temp.push({ count: 0, round: 0, date:'' });
                result.push(temp);
            }
            lottoArray.forEach((lotto) => {
                const numbers = lotto.numbers;
                for (let i = 0; i < numbers.length; i++) {
                    for (let j = i + 1; j < numbers.length; j++) {
                        const [row, col] = [numbers[i] - 1, numbers[j] - numbers[i] - 1];
                        result[row][col].count++;
                        if (result[row][col].round === 0) {
                            result[row][col].round = lotto.round;
                            result[row][col].date = lotto.date;
                        }
                    }
                }
            });
            return result;
        };

        const hash: Array<HData[]> = harmonyHash(lottoArray);
        const result: HarmonyData[] = [];
        for (let i = 0; i < hash.length; i++) {
            for (let j = 0; j < hash[i].length; j++) {
                result.push({
                    count: hash[i][j].count,
                    one: i + 1,
                    another: i + j + 2,
                    round: hash[i][j].round,
                    date: hash[i][j].date
                });
            }
        }

        return result.sort((a, b) => {
            return b.count - a.count !== 0 ? b.count - a.count : b.round - a.round;
        });
    }
}