class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    statusBar_Coin = new StatusBar_Coin();
    statusBar_Bottle = new StatusBar_Bottle();
    statusBar_Endboss = new Statusbar_Endboss();
    throwableObjects = [];
    bottle_counter = 0;
    coin_counter = 0;
    gameOver = false;
    otherDirection = false;
    lastThrowTime = 0;
    immune = false;

    /**
     * Constructor for initializing the canvas and setting up the keyboard input.
     *
     * @param {type} canvas - the canvas element to be initialized
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the main game loop at a set interval, checking for collisions, throwing objects, enemy-bottle collisions, aggression, and game over.
     */
    run() {
        let runInterval = setInterval(() => {
            this.checkCollisionWithItems();
            this.checkThrowObjects();
            this.checkCollisionBottlesEnemy();
            this.checkIsAggressive();
            this.isGameOver();
        }, 50);
        pushInterval(runInterval);

        let enemyCollisionInterval = setInterval(() => {
            this.checkCollisionWithEnemy();
        }, 10);
        pushInterval(enemyCollisionInterval);
    }

    /**
     * Display the game over screen.
     */
    showGameOverScreen() {
        let gameOverScreen = document.getElementById('game-over-screen');
        gameOverScreen.style.display = 'flex';
    }

    /**
     * Checks if the game is over based on the character's status 
     */
    isGameOver() {
        if (this.character.isDead() || this.gameOver) {
            
            this.gameOver = true;
            this.showGameOverScreen();
            background_audio.pause();
            game_over_audio.play();

        } else {
            this.gameOver = false;
            hideGameOverScreen();
        }
    }

    /**
     * Ends the Game when the Endboss dies
     */
    endbossDied() {
        this.gameOver = true;
        this.showGameOverScreen();
        stopAllIntervals();
        idle_snoring.pause();
        background_audio.pause();
        endboss_theme.pause();
        game_over_audio.play();
    }

    /**
     * Mutes the Sounds
     */
    checkSounds() {
        if (!muted) {
            unmuteSounds();
        } else {
            muteSounds();
        }
    }

    /**
     * Check and throw objects based on certain conditions.
     */
    checkThrowObjects() {
        const currentTime = new Date().getTime();
        if (this.keyboard.D && this.bottle_counter > 0 && currentTime - lastThrowTime >= 1000) {
            let throwDirection = 1;
            if (this.character.otherDirection) {
                throwDirection = -1;
            }
            this.throwableObjects.push(new ThrowableObject(this.character.x, this.character.y, throwDirection));
            this.bottle_counter = this.bottle_counter - 1;
            this.statusBar_Bottle.setPercentage(this.bottle_counter);
            lastThrowTime = currentTime;
        }
    }

    /**
     * Checks collision from character and enemies
     */
    checkCollisionWithEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY <= 0 && !(enemy instanceof Endboss)) {
                    enemy.enemyIsDead = true;
                    dead_chicken_audio.play();
                    this.character.jump();
                    this.makeImmune();

                } else if (!this.immune) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.hp);
                    this.makeImmune();
                }
            }
        });
    }

    /**
     * Makes for a time immune
     */
    makeImmune() {
        this.immune = true;
        this.immuneTimer = setTimeout(() => {
            this.immune = false;
        }, 300);
    }

    /**
     * Checks for collisions with items in the level and adds corresponding items to the character's inventory.
     */
    checkCollisionWithItems() {
        [this.level.bottles, this.level.coins].forEach(items => {
            items.forEach((item, index) => {
                if (this.character.isColliding(item)) {
                    if (items === this.level.bottles) {
                        this.addbottle(index)
                    } else {
                        this.addCoin(index);
                    }
                }
            });
        });
    }

    /**
     * This function manages the bottle index
     */
    addbottle(index) {
        this.level.bottles.splice(index, 1);
        this.bottle_counter++;
        this.statusBar_Bottle.setPercentage(this.bottle_counter);
        collect_bottle_audio.play();
    }

    /**
     * This function manages the coin index
     */
    addCoin(index) {
        coin_collect_audio.play();
        this.level.coins.splice(index, 1);
        this.coin_counter++;
        this.statusBar_Coin.setPercentage(this.coin_counter);
    }

    /**
     * Check for collisions between bottles and enemies, handle interactions accordingly.
     */
    checkCollisionBottlesEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    bottle_hit_audio.play();
                    dead_chicken_audio.play();
                    bottle.isHitting = true;
                    enemy.enemyIsDead = true;
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                        this.statusBar_Endboss.setPercentage(enemy.hp);
                    }
                }
            })
        }
    }

    /**
     * Checks if the character is aggressive based on their relative x position
     */
    checkIsAggressive() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                const aggressionThreshold = 2200;
                if (this.character.x >= aggressionThreshold) {
                    enemy.aggressive = true;
                    background_audio.pause();
                    endboss_theme.play();
                }
            }
        });
    }

    /**
     * Draws the canvas, adds background objects, character, enemies, and clouds to the map, and requests animation frame for continuous drawing.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBar_Coin);
        this.addToMap(this.statusBar_Bottle);
        this.addToMap(this.statusBar_Endboss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    /**
     * Adds the given objects to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * This function adds the specified image to the canvas at the specified position and size.
     *
     * @param {object} mo - The object containing the image, x and y coordinates, as well as width and height.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        mo.draw(this.ctx);
        mo.drawRectangles(this.ctx);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }

    /**
     * Reset the camera to its initial position.
     */
    resetCamera() {
        this.camera_x = 0;
    }
}

