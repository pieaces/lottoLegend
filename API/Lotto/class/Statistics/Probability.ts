export default class Probability {
    protected constructor() { }

    private static factorial(to: number, from?: number): number {
        if (!from) {
            if (to < 0) throw new SyntaxError("factorial of minus number doesn't exist.");
            else if (to <= 1) return 1;
            else {
                let result = to;
                for (let i = to - 1; i >= 2; i--) result *= i;
                return result;
            }
        }else{
            if(to < from) throw new SyntaxError("'from' has to be less than 'to'");
            else{
                let result = to;
                for (let i = to - 1; i >= from; i--) result *= i;
                return result;
            }
        }
    }

    static C(total: number, target: number): number {
        if(total <= 0 || target < 0) throw SyntaxError("'total' has to be natural number.");
        if(target === 0) return 1;
        const numerator = Probability.factorial(total, total-target+1);
        const denominator = Probability.factorial(target);

        return numerator / denominator;
    }

    static pqc(cases: number, prob: number): number[] { //p^(k)q^(n-k)C(n,k)
        const discreteProb = (n: number, prob:number, k:number):number => Math.pow(prob, k) * Math.pow(1 - prob, n-k) * Probability.C(n, k);
        
        const result:number[] = [];
        for(let num=0; num<=cases; num++) result.push(discreteProb(cases, prob, num));

        return result;
    }
}