import { Inject } from "./content_script.js";
import { Controller } from "./event_controller.js";

const inject = new Inject();
const ctrl = new Controller();

let cssFile = inject.getFromExtension("./css/constr_style.css");
let jsFile = inject.getFromExtension("./content_scripts/js/test.js");

let mockDataCSS = {
    type: "css",
    file: cssFile
};
let mockDataJS = {
    type: "js",
    file: jsFile
};

inject.insertResource(mockDataCSS).insertResource(mockDataJS, () => {
    console.log("js loaded.");
});