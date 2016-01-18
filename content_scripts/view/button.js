export class Button {
    constructor(text) {
        this.text = text;
        this.insertToDOM(this.createNode("div", {
            "class": "btn_constr"
        }, "Constr"));
    }

    createNode(tag, options, content) {
        let elem = document.createElement(tag);
        elem.textContent = content;
        if(options) {
            for (let item in options) {
                elem.setAttribute(item, options[item]);
            }
        }
        return elem;
    }

    addEvent(elem) {
        elem.addEventListener("click", () => {
            console.log("click  btn constr");
        }, false);
    }

    insertToDOM(elem) {
        let body = document.body;
        if(body) {
            body.appendChild(elem);
        } else console.log("can\'t find body on the page");
        this.addEvent(elem);
    }
}