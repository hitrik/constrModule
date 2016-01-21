import { Template } from "./template.js";

let tplToolbar = `
<div class="toolbar_constr c_hide">
    <div class="toolbar_constr__container">
        <input type="file" name="file_constr" id="file_constr" />
        <div class="toolbar_constr_colors">
            <div class="toolbar_constr_color">
                <div class="colors__color_top"></div>
                <div class="colors_color_bottom"></div>
            </div>
        </div>
        <button id="btn_constr_file">Save</button>
    </div>
</div>
`;
export class Toolbar {
    constructor() {
        this.tpl = new Template("div", tplToolbar);
    }
}