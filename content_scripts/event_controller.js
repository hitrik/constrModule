const Vent = require("microevent");
import { utils } from "./utils.js";
import LoadImage from "./view/load_image.js";
import { Button } from "./view/button.js";
import { Toolbar } from "./view/toolbar.js";

window.vent = new Vent();
export class Controller {
    constructor() {
        this.btn = new Button("Constructor");
        this.toolbar = new Toolbar().tpl;
        this.initEvent();
    }
    initEvent() {
        utils.insertToDOM(this.btn).addEvent("click", this.btn, () => {
            utils.insertToDOM(this.toolbar);
            this.toolbar.querySelector(".toolbar_constr").classList.remove("c_hide");
        });
        utils.addEvent("click", this.toolbar.querySelector("#btn_constr_file"), (e) => {
            e.preventDefault();
            console.log("click btn save");
        });
        utils.addEvent("change", this.toolbar.querySelector("#file_constr"), function() {
            let file = this.files[0];
            const loadFile = new LoadImage(file);
        });

    }
}