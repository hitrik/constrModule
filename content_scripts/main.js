import { Inject } from "./content_script.js";
import { Button } from "./view/button.js";

const btn = new Button("Constr");
const inject = new Inject();

let cssFile = chrome.extension.getURL("./css/constr_style.css");

let mockData = {
    type: "js",
    file: cssFile
};

inject.insertResource(mockData);