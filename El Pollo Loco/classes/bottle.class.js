class Bottle extends MovableObject {

    height = 75;
    width = 75;

    IMAGES_WALKING = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    /**
     * Constructor for initializing the object.
     */
    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.y = 350;
        this.x = 200 + Math.random() * 2000;
        this.animate();
    }
    
    /**
     * Animate the bottle by playing a walking animation
     */
    animate() {
        let animateBottle = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 750);
        pushInterval(animateBottle);
        }
    }