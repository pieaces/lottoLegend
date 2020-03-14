import dynamoDB from '.'

export default function counterLotto():Promise<number> {
    var params = {
        TableName: "LottoData"
    };

    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject("counterLotto 오류: " + err)
            }
            else {
                resolve(data.Count);
            };
        });
    })
}

export function getCurrentRound(){
    const theDate = new Date('2020-02-01:11:45');
    const today = new Date();
    const between = Number(today) - Number(theDate);
    const plusDate = Math.floor(between / 24 / 3600 / 1000 / 7);

    const total = 896 + plusDate;
    return total;
}