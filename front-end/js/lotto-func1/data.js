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
                        if (params) {
                            if (params.from & params.to)
                                url += "?from=" + params.from + "&to=" + params.to;
                            else if (params.list)
                                url += "?list=" + encodeURI(JSON.stringify(params.list));
                        }
                        console.log(url);
                        return [4 /*yield*/, fetch(url, { method: 'GET', headers: headers })];
                    case 1:
                        fetchResult = _c.sent();
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fetchResult.text()];
                    case 2:
                        data = _b.apply(_a, [_c.sent()]);
                        this[method] = data.data;
                        return [2 /*return*/];
                }
            });
        });
    };
    return Stats;
}());
var Generator = /** @class */ (function () {
    function Generator() {
        this.methodMap = {
            "1-1": 'excludedLineCount',
            "1-2": 'lineCount',
            "2": 'carryCount',
            "3-1": 'excludedNumbers',
            "3-2": 'includedNumbers',
            "4": 'lowCount',
            "5": 'sum',
            "6": 'oddCount',
            "7": 'primeCount',
            "8": '$3Count',
            "9": 'sum$10',
            "10": 'diffMaxMin',
            "11": 'AC',
            "12": 'consecutiveExist'
        };
        this.option = {
            current: "excludedLineCount"
        };
        this.currentFilter = "1-1";
    }
    Generator.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, clone, fetchResult, data, _a, _b;
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
                        return [4 /*yield*/, fetch('https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/numbers/generator', //API 주소
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
var stats = new Stats();
var generator = new Generator();
