"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var Stats = /** @class */ (function () {
    function Stats() {
    }
    Stats.prototype.getData = function (method, params) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, url, fetchResult, data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        headers = {
                            'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k' //API KEY
                        };
                        url = "https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/stats/" + method;
                        console.log(url);
                        if (params) {
                            if (params.from & params.to)
                                url += "?from=" + params.from + "&to=" + params.to;
                            else if (params.list)
                                url += "?list=" + encodeURI(JSON.stringify(params.list));
                        }
                        return [4 /*yield*/, node_fetch_1["default"](url, { method: 'GET', headers: headers })];
                    case 1:
                        fetchResult = _c.sent();
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fetchResult.text()];
                    case 2:
                        data = _b.apply(_a, [_c.sent()]);
                        this[method] = data.data;
                        if (!this.total)
                            this.total = data.total;
                        return [2 /*return*/];
                }
            });
        });
    };
    return Stats;
}());
var Generator = /** @class */ (function () {
    function Generator() {
        this.option = {};
    }
    Generator.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, clone, url, fetchResult, data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        headers = {
                            'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k',
                            'Content-Type': 'application/json'
                        };
                        clone = JSON.parse(JSON.stringify(this.option));
                        delete clone.excludedLineCount;
                        delete clone.carryCount;
                        url = 'https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/numbers/generator';
                        console.log(url);
                        return [4 /*yield*/, node_fetch_1["default"](url, //API 주소
                            {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify(clone)
                            })];
                    case 1:
                        fetchResult = _c.sent();
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fetchResult.text()];
                    case 2:
                        data = _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return Generator;
}());
var constraintLowCount = require('../../json/lowCount_compressed.json');
var constraintSum = require('../../json/sum_compressed.json');
var constraintSumNotExcluded = require('../../json/sum_notExcluded.json');
function numbersToParams(numbers) {
    var flag = true;
    for (var i = 1; i < numbers.length; i++) {
        if (numbers[i] - 1 !== numbers[i - 1]) {
            flag = false;
            break;
        }
    }
    if (flag) {
        return { from: numbers[0], to: numbers[numbers.length - 1] };
    }
    else {
        return { list: numbers };
    }
}
function numbersToPack(numbers, PACK) {
    return numbers.reduce(function (acc, cur, index) {
        if (index % PACK === 0) {
            acc.push(cur);
        }
        else {
            acc[acc.length - 1] += cur;
        }
        return acc;
    }, []);
}
function paramToNumbers(params) {
    if (params.from && params.to) {
        var temp = [];
        for (var i = params.from; i <= params.to; i++)
            temp.push(i);
        return temp;
    }
    else if (params.list) {
        return params.list;
    }
}
var Filter = /** @class */ (function () {
    function Filter() {
        this.numberList = ["1-1", "1-2", "2", "3-1", "3-2", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        this.statsList = ['excludedLineCount', 'lineCount', 'carryCount', 'excludeInclude', 'excludeInclude', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist'];
        this.optionList = [null, 'excludedLines', null, 'excludedNumbers', 'includedNumbers', 'lowCount', 'sum', 'oddCount', 'primeCount', '$3Count', 'sum$10', 'diffMaxMin', 'AC', 'consecutiveExist'];
        this.rangeList = [[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5, 6], null, null];
        this.current = 0;
        this.stats = new Stats();
        this.generator = new Generator();
    }
    Filter.prototype.getLabel = function () {
        return this.rangeList[this.current];
    };
    Filter.prototype.getFilterName = function () {
        return this.numberList[this.current];
    };
    Filter.prototype.setStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, range, range, range;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.current);
                        if (this.current <= 4)
                            params = {};
                        else if (this.current === 5) {
                            range = void 0;
                            if (this.generator.option.excludedLines) {
                                range = constraintLowCount[this.generator.option.excludedLines.join('')];
                            }
                            else {
                                range = [0, 6];
                            }
                            params = { from: range[0], to: range[1] };
                            this.rangeList[this.current] = paramToNumbers({ from: range[0], to: range[1] });
                        }
                        else if (this.current === 6) {
                            if (this.generator.option.excludedLines) {
                                range = constraintSum[this.generator.option.lowCount.toString() + this.generator.option.excludedLines.join('')];
                                params = { from: range[0], to: range[1] };
                                this.rangeList[this.current] = numbersToPack(paramToNumbers(params), 10);
                            }
                            else {
                                range = constraintSumNotExcluded[this.generator.option.lowCount.toString()];
                                params = { from: range[0], to: range[1] };
                            }
                        }
                        else {
                            params = numbersToParams(this.rangeList[this.current]);
                        }
                        return [4 /*yield*/, this.stats.getData(this.statsList[this.current], params)];
                    case 1:
                        _a.sent();
                        console.log(params);
                        return [2 /*return*/];
                }
            });
        });
    };
    Filter.prototype.getGen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, count, range, numbers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.generator.generate()];
                    case 1:
                        _a = _b.sent(), count = _a.count, range = _a.range, numbers = _a.numbers;
                        this.rangeList[this.current + 1] = range;
                        this.count = count;
                        if (numbers)
                            console.log(numbers);
                        return [2 /*return*/];
                }
            });
        });
    };
    Filter.prototype.leap = function (page) {
        var count = this.current - page;
        if (count > 0 && page >= 0) {
            for (var i = 0; i < count; i++) {
                console.log('i', i);
                this.backward();
            }
        }
    };
    Filter.prototype.backward = function () {
        if (this.current > 0) {
            console.log(this.optionList[this.current]);
            delete this.generator.option[this.optionList[this.current--]];
        }
    };
    Filter.prototype.forward = function (optionData) {
        if (optionData === void 0) { optionData = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var option;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('forward', this.current);
                        if (!(0 <= this.current && this.current < this.statsList.length)) return [3 /*break*/, 4];
                        option = this.optionList[this.current];
                        if (option) {
                            this.generator.option[option] = optionData;
                        }
                        if (!(this.current >= 6)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getGen()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(this.current < this.statsList.length - 1)) return [3 /*break*/, 4];
                        this.current++;
                        if (!!this.stats[this.statsList[this.current]]) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.setStats()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Filter.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.current = 0;
                        return [4 /*yield*/, this.setStats()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Filter.prototype.getStats = function () {
        return this.stats[this.statsList[this.current]];
    };
    return Filter;
}());
/*
async function initf() {
  const filter = new Filter();
  await filter.init();
  await filter.forward();
  await filter.forward([2]);
  await filter.forward();
  await filter.forward([2, 10, 42, 44, 45]);
  await filter.forward();
  await filter.forward(2);
  await filter.forward({ from: 150, to: 180 });
  await filter.forward({ from: 2, to: 3 });
  //filter.backward();  filter.backward();
  filter.leap(3);
  await filter.forward();
  await filter.forward();
  await filter.forward(3);
  await filter.forward({ from: 150, to: 180 });

  // await filter.forward({ from: 2, to: 3 });
  // await filter.forward({ from: 1, to: 3 });
  // await filter.forward({ from: 10, to: 14 });
  // await filter.forward({ from: 30, to: 38 });
  // await filter.forward({ from: 6, to: 8 });
  // await filter.forward(true);
  // console.log(filter.numbers);
}
*/ 
