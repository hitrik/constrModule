    export class Inject {
        constructor() {
            this.file = null;
            this.type = null;
            this.store = [];
        }

        getStore() {
            return this.store;
        }

        setStore(obj) {
            this.store.length = 0;
            return this.store.push(obj);
        }
        insertResource(obj) {
            if(!obj) {
                throw new Error("require object argument, insertResource");
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
                resource.addEventListener("load", () => {
                    console.log("resource is loaded");
                }, false);
            }
        }
    }