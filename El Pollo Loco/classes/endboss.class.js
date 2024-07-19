class Endboss extends MovableObject {
    width = 500;
    height = 300;
    offset = {
        top: 80,
        bottom: 50,
        left: 80,
        right: 80
    };
    hp = 120;
    
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Constructor for initializing character properties and loading images.
     */
    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACKING);
        this.x = 2700;
        this.y = 140;
        this.animate();
        this.aggressive = false;
    }

    /**
     * Executes animations based on the state of the boss character.
     *
     */
    animate() {
        let animation = setInterval(() => {
            if (this.isDead()) {
                this.animateBossDead();
                return;
            }
            if (this.aggressive && this.x >= 2300) {
                this.animateBossWalking();
            } 
            if (this.aggressive && this.x <= 2301) {
                this.animateBossAggressive();
            }
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            this.checkEndbossHorizon();
        }, 150);
        pushInterval(animation);
    }
     
    /**
     * Animates the boss as dead by playing the dead animation and ending the boss's life after a short delay.
     */
    animateBossDead() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.loadImg(this.IMAGES_DEAD[2]);
        }, 300); 
        world.endbossDied();
    }
    
    /**
     * Animates the boss aggressively by playing the aggressive boss animation and attack animation.
    */
   animateBossAggressive() {
        this.playBossAggressive();
        this.playBossAttack();
        this.bossMoveLeft();
    }
    
    bossMoveLeft() {
        if (!this.isAlive) {
            this.x -= 25;
        }
    }

    /**
     * Animates the boss by playing the walking animation.
     */
    animateBossWalking() {
        this.playAnimation(this.IMAGES_WALKING);
        this.bossMoveLeft()
    }
    
    /**
     * Checks if the end boss is beyond a certain x-coordinate and if yes triggers the boss death
     */
    checkEndbossHorizon() {
        if(this.x < 50){
            world.endbossDied();
        }
    }
    
    /**
     * Plays the death animation for the boss.
     */
    playBossDead() {
        this.playAnimation(this.IMAGES_DEAD);
        
    }

    /**
     * Plays the aggressive boss animation
     */
    playBossAggressive() {
        this.playAnimation(this.IMAGES_ATTACKING);
    }

    /**
     * Executes a boss attack if the boss is not dead.
     *
     */
    playBossAttack() {
        setTimeout(() => {
            if (!this.isDead()) {
                this.x -= 10;
            }
        }, 300);
    }
}