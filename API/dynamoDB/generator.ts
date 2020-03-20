
queryStats(StatsMethod.oddCount)
.then(statsData => {
    const box = [];
    for (let i = 0; i < statsData.pos.length; i++) {
        let x = statsData.ideal['all'][i] - statsData.actual['all'][i];
        if (statsData.ideal['all'][i] >= statsData.actual['all'][i]) x /= statsData.ideal['all'][i];
        else x /= statsData.actual['all'][i];
        x *= statsData.pos[i];
        let y = statsData.ideal['latest'][i] - statsData.actual['latest'][i];
        if (statsData.ideal['latest'][i] >= statsData.actual['latest'][i]) y /= statsData.ideal['latest'][i];
        else y /= statsData.actual['latest'][i];
        y *= statsData.pos[i];

        const data = [i, x, y, x*y];
        box.push(data);
    }
    console.log(box);
});
