import { Template } from "./template.js";
import { Utils } from "../utils.js";

const utils = new Utils();

export class Button {
    constructor(text) {
        this.text = text;
        let btn = new Template("div", `<div class="btn_constr">${this.text}</div>`);
        utils.insertToDOM(btn).addEvent("click", btn, () => {
            console.log("click");
        })
    }
}