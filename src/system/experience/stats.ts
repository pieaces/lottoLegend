export interface Params {
    from?: number;
    to?: number;
    list?: number[];
}
import excludedLineCount from './data/excludedLineCount';
import carryCount from './data/carryCount';
import excludeInclude from './data/excludeInclude';
import lowCount from './data/lowCount';
import sum from './data/sum';
import oddCount from './data/oddCount';
import primeCount from './data/primeCount';
import $3Count from './data/$3Count';
import sum$10 from './data/sum$10';
import diffMaxMin from './data/diffMaxMin';
import AC from './data/AC';
import consecutiveExist from './data/consecutive'

const stats = {
    excludedLineCount,
    carryCount,
    excludeInclude,
    lowCount,
    sum,
    oddCount,
    primeCount,
    $3Count,
    sum$10,
    diffMaxMin,
    AC,
    consecutiveExist,
}

export default stats;