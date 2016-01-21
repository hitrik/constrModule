import { utils } from "../utils.js";

/**
 * Draw image on canvas from image converted to base64
 * @class
 * @param {base64data} String - base64 string, encoded image loaded from form constructor
 */
export default class Canvas {
    constructor(base64data) {
        this.base64data = base64data;
        this.canvas = this.createCanvas();
        this.drawCanvas(this.canvas).then(() => {
            this.getColors(this.canvas, 45);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    createCanvas() {
        const widthOfScroll = 17;
        let canvas = utils.createNode("canvas", {
            id: "constructor_canvas"
        });
        canvas.width  = window.innerWidth - widthOfScroll;
        canvas.height = window.innerHeight;
        utils.insertToDOM(canvas);
        return canvas;
    }
    drawCanvas(canvas) {
        return new Promise((resolve, reject) => {
            let ctx = canvas.getContext("2d");
            let image = new Image();
            image.onload = function() {
                ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                resolve();
            };
            image.onerror = () => {
                reject();
            };
            image.src = this.base64data;
        });
    }
    getColors(canvas, blockSize) {
        var blockSize = blockSize,
            defaultRGB = { r:0,g:0,b:0 },
            context = canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = { r:0,g:0,b:0 },
            count = 0;

        if (!context) {
            return defaultRGB;
        }

        height = canvas.height;
        width = canvas.width;

        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */
            return defaultRGB;
        }

        length = data.data.length;

        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);

        console.log(rgb);
        return rgb;
    }
}