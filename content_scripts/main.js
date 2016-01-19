import { Inject } from "./content_script.js";
import { Button } from "./view/button.js";
import { Toolbar } from "./view/toolbar.js";

const btn = new Button("Constructor");
const toolbar = new Toolbar();
const inject = new Inject();

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