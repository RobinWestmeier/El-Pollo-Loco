class SmallChicken extends MovableObject {


    width = 80;
    height = 70;
    speed = 60;
    speedY = 20;
    enemyIsDead = false;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Constructor function that initializes various images and applies gravity.
     */
    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1000 + Math.random() * 2000;
        this.y = 365;
        this.speed = 0.5 + Math.random() * 0.75;
        this.applyGravity();
        this.animate();
        this.jumpLeft();
    }

    /**
    * This animates the small Chicken
    */
    animate() {
        let animateSmallChicken = setInterval(() => {
            if (!this.enemyIsDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.enemyIsDead) {
                this.loadImg(this.IMAGES_DEAD);
                this.y += 80;
            }
        }, 100 / this.speed);
        pushInterval(animateSmallChicken);
        if (!this.y > 365) {
            this.applyGravity();
        }
    }

    /**
    * This applies Gravity to the small Chickens when Jumping
    */
    applyGravity() {
        let gravityInterval2 = setInterval(() => {
            if (this.y < 365 || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (this.y > 365 && !this.enemyIsDead) {
                this.y = 365;
            }

        }, 1000 / 28);
        pushInterval(gravityInterval2);
    }
} 