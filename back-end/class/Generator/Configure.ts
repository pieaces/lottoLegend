import GeneratorBase from "./Base"

export default class GeneratorConfigure extends GeneratorBase{
    protected stautsConsecutive: boolean = false;
    protected statusSum:boolean = false;
    protected statusSum$10:boolean = false;
    protected statusDiffMaxMin:boolean = false;
    protected statusAC:boolean = false;

    onConsecutiveExclude(check: boolean): void {
        this.stautsConsecutive = check;
    }
}