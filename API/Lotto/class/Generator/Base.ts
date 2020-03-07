import { GeneratorOption } from "../../interface";

export default class Base{
    option: GeneratorOption;

    constructor(option:GeneratorOption) {
        this.option = option;
    }
}