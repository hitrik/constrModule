import { Template } from "./template.js";

export class Button {
    constructor(text) {
       this.text = text;
       return new Template("div", `<div class="btn_constr">${this.text}</div>`);
    }
}