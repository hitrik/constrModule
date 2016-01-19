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