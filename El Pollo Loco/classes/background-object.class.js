class BackgroundObject extends MovableObject {
width = 722;
height = 480;

    /**
     * Constructor for initializing an object with an image path, x and y coordinates.
     *
     * @param {string} imagePath - The path to the image.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @return {void} 
     */
    constructor(imagePath, x) {
        super().loadImg(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}