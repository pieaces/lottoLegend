import barInstance from "./chartInstance/barInstance"
import lineInstance from "./chartInstance/lineInstance"

function execute() {

    lineInstance.create();
    barInstance.update();
    lineInstance.update();
}

execute();

