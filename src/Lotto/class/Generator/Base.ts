import { GeneratorOption } from "../../../interface/Generator";

export default class Base{
    option: GeneratorOption;

    constructor(option:GeneratorOption) {
        this.option = option;
    }
}