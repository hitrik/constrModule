import Canvas from "./canvas_draw.js";

/**
 * Process loaded file(image only) from constructor
 * @class
 * @param { file } object - file from input[type=file] provide by HTML5 FileAPI
 * */
export default class LoadImage {
    constructor(file) {
        this.file = file;
        this.prepareAPI();
    }
    prepareAPI() {
        let reader = new FileReader();
        reader.onload = this.onSuccess;
        reader.onerror = this.onError;
        reader.onprogress = () => {
            //TODO spinner
        };
        reader.readAsDataURL(this.file);
    }
    onSuccess(e) {
        this.base46Image = e.target.result;
        const canvas_draw = new Canvas(this.base46Image);
        console.log("base64 image", canvas_draw);
    }
    onError() {
        console.log("error on convert");
    }

}