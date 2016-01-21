    export class Inject {
        constructor() {
            this.file;
            this.type;
            this.store = [];
        }

        getStore() {
            return this.store;
        }

        getFromExtension(path) {
            if(path) {
                return chrome.extension.getURL(path);
            }
        }

        setStore(obj) {
            this.store.length = 0;
            return this.store.push(obj);
        }
        insertResource(obj, callback) {
            if(!obj) {
                throw new Error("require object argument for insertResource");
            }
            let head = document.querySelector("head");
            let resource = null;
            switch(obj.type) {
                case "css":
                    resource = document.createElement("link");
                    resource.rel = "stylesheet";
                    resource.href = obj.file;
                    break;
                case "js":
                    resource = document.createElement("script");
                    resource.src = obj.file;
                    break;
                default :
                    return false;
            }
            if(head) {
                head.appendChild(resource);
                resource.addEventListener("load", (callback && callback()) || (() => {}), false);
            }
            return this;
        }
    }