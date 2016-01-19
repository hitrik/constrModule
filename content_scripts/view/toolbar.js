import { Template } from "./template.js";
import { Utils } from "../utils.js";


const tplToolbar = `
<div class="toolbar_constr c_hide">
    <div class="toolbar_constr__container">
        <input type="file" name="file_constr" id="file_constr" />
        <button id="btn_constr">Load file</button>
    </div>
</div>
`;
export class Toolbar {
    constructor() {
        return new Template("div", tplToolbar);
    }
}