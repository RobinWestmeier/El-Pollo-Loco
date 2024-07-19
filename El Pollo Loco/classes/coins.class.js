class Coin extends MovableObject {
    height = 110;
    width = 110;
    
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    
    /**
     * Constructor for initializing the object
     */
    constructor() {
        super().loadImg('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_WALKING);   
        this.y = 50 + Math.random() * 200;
        this.x = 150 + Math.random() * 1800;
        this.animate();
    }

    /**
     * Animate the coin by playing a walking animation at regular intervals.
     */
    animate() {
        let animateCoin = setInterval(() => {
         this.playAnimation(this.IMAGES_WALKING);
        }, 500);
        pushInterval(animateCoin);
    }
}