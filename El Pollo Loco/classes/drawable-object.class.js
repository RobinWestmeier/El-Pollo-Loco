class DrawableObject {
    x = 120;
    y = 230;
    img;
    height = 200;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
     * Load an image from the given path.
     *
     * @param {string} path - The path of the image
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws an image on the canvas
     *
     * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
     */
    draw(ctx) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads images from the given array of paths and stores them in the image cache.
     *
     * @param {Array} arr - the array of image paths to load 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * Draw rectangles on the canvas for specific instances.
     *
     * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
     */
    drawRectangles(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof SmallChicken || this instanceof Coin || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.rect(this.x + this.offset.right, this.y + this.offset.bottom, this.width - this.offset.left, this.height - this.offset.top);
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            
        }
    }
}

