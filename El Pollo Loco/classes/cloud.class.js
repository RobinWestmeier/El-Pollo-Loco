class Cloud extends MovableObject {
    y = 20;
    width = 400;
    height = 250;

    /**
     * Constructor for initializing the object.
     *
     */
    constructor() {
        super().loadImg('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 3500;
        this.animate();
    }

    /**
     * A description of the entire function.
     *
     */
    animate() {
       this.moveLeft();
    }
}