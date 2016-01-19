export class Utils {
    constructor() {

    }
    insertToDOM(elem) {
        let body = document.body;
        if(body) {
            body.appendChild(elem);
        } else console.log("can\'t find body on the page");
        return this;
    }

    addEvent(type, elem, fn) {
        elem.addEventListener(type, fn, false);
        return this;
    }

    removeEvent(type, elem, fn) {
        elem.removeEventListener(type, fn, false);
        return this;
    }

    createNode(tag, options, content) {
        let elem = document.createElement(tag);
        elem.textContent = content;
        if(options) {
            for (let item in options) {
                if(options.hasOwnProperty(item)) {
                    elem.setAttribute(item, options[item]);
                }
            }
        }
        return elem;
    }
}