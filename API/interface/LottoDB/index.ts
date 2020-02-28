import { Stats } from "../Statistics";
import { Params } from "../Lotto";

export interface LottoDate{
    round: number;
    date: string;
}
export enum AssemblyVersion {
    $12 = "$12",
    $24 = "$24",
    $48 = "$48",
    $192 = "$192",
    all = "all",
    latest = "latest"
}
export interface Assembly {
    $12: number[];
    $24: number[];
    $48: number[];
    $192: number[];
    all: number[];
    latest: number[];
}
export interface DBData {
    ideal: Assembly;
    actual: Assembly;
    pos: number[];
    stats?: Stats;
}

export interface DataMap {
    ideal: number[];
    actual: number[];
    stats?: Stats;
}

export enum StatsMethod {
    excludedLineCount = "excludedLineCount",
    lineCount = "lineCount",
    carryCount = "carryCount",
    lowCount = "lowCount",
    sum = "sum",
    oddCount = "oddCount",
    primeCount = "primeCount",
    $3Count = "$3Count",
    sum$10 = "sum$10",
    diffMaxMin = "diffMaxMin",
    AC = "AC",
    consecutiveExist = "consecutiveExist",
//
    emergence = "emergence",
    interval = "interval",
    howLongNone = "howLongNone",
    frequency = "frequency"
}

export interface QueryStatsParams extends Params {
    list?: number[];
}