import LottoBase, { LData } from './LottoBase'

type Constructor<T = {}> = new (...args: any[]) => T;

const factMixedIn = <TBase extends Constructor>(Base: TBase) =>
    class extends Base {
        factLineCount(mode: number): number[] {
            const pos = [9/45, 10/45, 10/45, 10/45, 6/45];
            
            return pos.map(value => value*(6*mode));
        }
        factSum$10(mode: number): number[] {
            throw new Error("Method not implemented.");
        }
        factOddCount(mode: number): number[] {
            throw new Error("Method not implemented.");
        }
        fact$3Count(mode: number): number[] {
            throw new Error("Method not implemented.");
        }
        factAC(mode: number): number[] {
            throw new Error("Method not implemented.");
        }
        factDiffMaxMinData(mode: number): number[] {
            throw new Error("Method not implemented.");
        }
        factCarry(mode: number): number[] {
            throw new Error("Method not implemented.");
        }

    };

export default factMixedIn;