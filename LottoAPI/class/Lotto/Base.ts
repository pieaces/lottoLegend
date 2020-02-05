import { List } from 'immutable';
import { LData, Mode, isTuple, isNumber } from '../../interface/Lotto';

export default class Base {
    protected TOTAL_SIZE: number;
    public static readonly BALL_NUM: number = 45;
    protected data: List<LData>;

    constructor(data: LData[]) {
        this.data = List<LData>(data);
        this.TOTAL_SIZE = this.data.size;
    }

    public getTotalSize(): number {
        return this.TOTAL_SIZE;
    }

    public getLData(mode: Mode = this.TOTAL_SIZE): LData[] {
        if (isNumber(mode)) {
            if (mode > 0) return this.data.toJS().slice(0, mode);
            else return this.data.toJS().slice(mode);
        } else if (isTuple(mode)) {
            if (mode[1] === -1 || mode[1] === 0) return null;
            const from = mode[0] > 0 ? mode[0] - 1 : mode[0];
            const to = mode[1] > 0 ? mode[1] : mode[1] + 1;
            const result = this.data.toJS().slice(from, to);
            return result.length > 0 ? result : null;
        }
    }
    public getLNumbers(mode: Mode = this.TOTAL_SIZE): Array<number[]> {
        if (isNumber(mode)) {
            if (mode > 0) return this.data.map<number[]>((item: { numbers: number[]; }) => item.numbers).toJS().slice(0, mode);
            else return this.data.map<number[]>((item: { numbers: number[]; }) => item.numbers).toJS().slice(mode);
        } else if (isTuple(mode)) {
            if (mode[1] === 0) return null;
            const from = mode[0] > 0 ? mode[0] - 1 : mode[0];
            const to = mode[1] > 0 ? mode[1] : mode[1] !== -1 ? mode[1] + 1 : this.TOTAL_SIZE;
            const result = this.data.map<number[]>((item: { numbers: number[]; }) => item.numbers).toJS().slice(from, to);
            return result.length > 0 ? result : null;
        }
    }
}