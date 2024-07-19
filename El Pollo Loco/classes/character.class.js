class Character extends MovableObject {
    y = 130;
    speed = 6;
    speedY = 0;
    hp = 100;
    lastMovement = new Date().getTime();
    currentTime;
    timeSinceLastMovement;

    offset = {
        top: -50,
        bottom: 0,
        left: 20,
        right: 30,
    };
   

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    

    /**
     * Constructor function that initializes various images and applies gravity.
     */
    constructor() {
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
    }

    /**
     * Animate the character by moving and playing it at specified intervals.
     */
    animate() {
        this.lastMovement = new Date().getTime();
        const movementIntervalId = setInterval(() => {
            this.moveCharacter();
        }, 1000 / 60);

        const timeIntervalId = setInterval(() => {
            this.playCharacter();
        }, 120);
        pushInterval(movementIntervalId);
        pushInterval(timeIntervalId);
    }
    
    /**
     * This moves the Charackter
     */
    moveCharacter() {
        walking_audio.pause();
        if (this.canMoveRight()) {
            this.moveRight();
        }
        if (this.canMoveLeft()) {
          this.moveCharacterLeft();
        }
        if (this.canJump()) {
            this.jump();
            this.lastMovement = new Date().getTime();
        }
        if (!this.isOnGround()) {
            walking_audio.pause();
        }
        this.world.camera_x = -this.x + 120;
    }

    /**
     * Method to play various character animations based on different conditions.
     */
    playCharacter() {
        this.currentTime = new Date().getTime();
        this.timeSinceLastMovement = (this.currentTime - this.lastMovement) / 1000;
        this.playIdleAnimation();
        this.playDeadAnimation();
        this.playHurtAnimation();
        this.playJumpingAnimation();
        this.playWalkingAnimation();
    }
    
    /**
     * Plays idle animations based on the time since last movement.
     */
    playIdleAnimation() {
        if (this.timeSinceLastMovement >= 0) {
            this.playAnimation(this.IMAGES_IDLE);
            idle_snoring.pause();
        }
        if (this.timeSinceLastMovement >= 6 && !this.isHurt() && !this.gameOver) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            idle_snoring.play();
        }   
        if (this.isHurt() || this.gameOver) {
            idle_snoring.pause();
        }   

    }
    
    /**
     * Plays the dead animation if the character is dead.
     */
    playDeadAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
            stopAllIntervals();
        }, 500);
        }
    }
    
    /**
     * Plays the hurt animation if the player is hurt.
     */
    playHurtAnimation() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            hurting_audio.play();
        }
    }
    
    /**
     * Play jumping animation if the character is above ground.
     */
    playJumpingAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }
    
    /**
     * A function to play walking animation based on keyboard input.
     */
    playWalkingAnimation() {
        if (this.world.keyboard.RIGHT && this.world.character.isOnGround() && !this.isHurt() || this.world.keyboard.LEFT && this.world.character.isOnGround()) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
    
    /**
     * Determine if the entity can move to the right within the level boundaries.
     *
     * @return {boolean} true if the entity can move right otherwise false
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isHurt()
    }
    
    /**
     * Moves the character to the right, plays walking audio, and updates the last movement time.
     */
    moveRight() {
        super.moveRight();
        walking_audio.play();
        this.lastMovement = new Date().getTime();
    }

    /**
     * Check if the entity can move left.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0
    }
    /**
     * Moves the character to the left by decreasing the x coordinate
     */
    moveCharacterLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        walking_audio.play();
        this.lastMovement = new Date().getTime();
    }

    /**
     * Function that checks if the player can jump based on keyboard input and ground status.
     */
    canJump() {
        return this.world.keyboard.SPACE && this.isOnGround()
    }

};