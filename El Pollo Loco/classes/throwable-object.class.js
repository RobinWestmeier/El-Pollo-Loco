class ThrowableObject extends MovableObject {
    speedY = 20;
    speedX = 20;
    throwDirection;
    isHitting = false;

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Constructor for creating a new instance of the Bottle class.
     *
     * @param {type} x - the x coordinate
     * @param {type} y - the y coordinate
     * @param {type} throwDirection - the direction in which the bottle is thrown
     * @return {type} undefined
     */
    constructor(x, y, throwDirection) {
        super().loadImg('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.height = 60;
        this.width = 60;
        this.throw(x, y, throwDirection);
    }

    /**
     * Throws an object with the specified coordinates and direction.
     *
     * @param {type} x - The x-coordinate of the object
     * @param {type} y - The y-coordinate of the object
     * @param {type} throwDirection - The direction in which to throw the object
     * @return {type} undefined
     */
    throw(x, y, throwDirection) {
        this.throwDirection = throwDirection;
        this.speedX = 10 * throwDirection;
        this.speedY = 20;
        this.x = x;
        this.y = y;
        throw_audio.play();
        this.startThrowAnimation();
    }
    
    /**
     * Starts the throw animation by moving the bottle at regular intervals and applying gravity.
     *
     */
    startThrowAnimation() {
        let throwInterval = setInterval(() => {
            this.moveBottle();
        }, 20);
        pushInterval(throwInterval);
        this.applyGravity();
    }
    
    /**
     * Moves the bottle based on its speed and plays different animations based on collision.
     */
    moveBottle() {
        this.x += this.speedX;
        if (this.isHitting) {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        } else {
            this.playAnimation(this.IMAGES_BOTTLES);
        }
    }
}
