import barInstance from "./chartInstance/barInstance"
import lineInstance from "./chartInstance/lineInstance"

function execute() {
    barInstance.create();
    lineInstance.create();
    barInstance.update();
    lineInstance.update();
}

execute();