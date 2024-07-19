class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    hp = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Apply gravity to the objects
     */
    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY >= 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this instanceof Character && this.y >= 221) {
                this.y = 221;
            }
        }, 1000 / 28);
        pushInterval(gravityInterval);
    }

    /**
     * Check if the object is above ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 221;
        }
    }

    /**
     * Checks if the object is on the ground
     */
    isOnGround() {
        return this.y >= 221;
    }

    /**
     * Checks if this object is colliding with another object.
     *
     * @param {object} mo - The other object to check for collision with.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate based on its speed.
     */
    moveLeft() {
        let moveLeftInterval = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
        pushInterval(moveLeftInterval);
    }

    /**
     * Moves the object to the right by increasing its x-coordinate based on its speed.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Update the image to the next one in the sequence.
     *
     * @param {Array} images - An array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Reduces the player's health points by 10. If the health points drop below 0, sets them to 0. 
     * Otherwise, updates the last hit timestamp and triggers the animated move backward action.
     */
    hit() {
        this.hp -= 10;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.moveBackward()
        }
    }

    /**
     * A function to make the character jump
     */
    jump() {
        this.speedY = 30;
        jumping_audio.play();
    }

    /**
     * Animate moving backward by a certain distance over a specified duration.
     */
    moveBackward() {
        const backwardDistance = 20;
        this.x -= backwardDistance;
    }

    /**
     * Check if the entity is dead.
     *
     * @return {boolean} true if the entity is dead otherwise false 
     */
    isDead() {
        return this.hp <= 0
    }

    /**
     * Check if the object is hurt based on the time passed since the last hit.
     *
     * @return {boolean} Indicates if the object is hurt or not
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.65
    }

    /**
     * A function to make the character jump left under certain conditions.
     *
     */
    jumpLeft() {
        if (!this.enemyIsDead) {
            if (this.y == 365) {
                let moveSmallChicken = setInterval(() => {
                    this.x -= this.speed;
                }, 1000 / 60);
                let jumpInterval = setInterval(() => {
                    this.speedY = 22;
                }, 1000);
                pushInterval(jumpInterval);
                pushInterval(moveSmallChicken);
            }
        }
    }
}

