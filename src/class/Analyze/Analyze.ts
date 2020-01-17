import LottoBase, {LData} from '../Lotto/LottoBase'
import PosAnalyze from './PosAnalyze'
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
    date?: string;
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

    private static emergePoint(numsArray: Array<number[]>): Array<number[]> {
        const result:Array<number[]> = [];
        for(let i =0; i<LottoBase.BALL_NUM; i++) result[i] = [];
        numsArray.forEach((numbers, round) => {
            numbers.forEach(num => result[num-1].push(round));
        });

        return result;
    }

    public static interval(numsArray: Array<number[]>): Array<number[]>{
        return this.emergePoint(numsArray).map(points => {
            const result = [];
            if(points.length > 0){
                result[0] = points[0];
                for(let i=1; i<points.length; i++)
                result[i] = points[i] - points[i-1];
            }            
            return result;
        })
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
        for(let i=0; i<LottoBase.BALL_NUM; i++) results[i] = ({count:-1, round:0});

        for (let i = 0; i < lottoArray.length; i++) {
            for (let j = 0; j < lottoArray[i].numbers.length; j++) {
                const num = lottoArray[i].numbers[j];
                if (results[num - 1].count === -1){
                    results[num - 1].count = i;
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
                for (let j = 0; j < LottoBase.BALL_NUM - i; j++) temp.push({ count: 0, round: 0 });
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