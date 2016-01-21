/**
 * Compile template from string, use es6 interpolate string
 * @class
 * @param {string} tag - container, where will be inserted compiled template
 * @param {string} templateStr - template for compile
 * */
export class Template {
    constructor(tag, templateStr) {
        this.tpl = templateStr;
        this.tag = tag;
        return this.createContainer(this.tag, this.tpl);
    }

    createContainer(tag, template) {
        let container = document.createElement(tag);
        container.innerHTML = template;
        return container;
    }
}