import Inter from "./Inter";

class J extends Inter {
    j() {
        const a = this.gatherOddCount({ mode: -12 });
        const e = this.expectedOddCount({ mode: -12 });
        const p = this.expectedOddCount({ mode: 1 });

        const result = new Array<number>(a.length);

        for (let i = 0; i < a.length; i++) {
            if (e[i] >= a[i]) result[i] = (e[i] - a[i]) / e[i] * p[i];
            else result[i] = (e[i] - a[i]) / a[i] * p[i];
        }
        return result;
    }
}