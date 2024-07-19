let level1;

function loadLevel1() {
    level1 = new Level(
        createLevelEnemies(),
        createLevelClouds(),
        createLevelBackgrounds(),
        createLevelCoins(),
        createLevelBottles()
    )
}

/**
 * Creates an array of enemies for the level, including chickens, small chickens, and an end boss.
 *
 * @return {Array} Array of enemy objects for the level
 */
function createLevelEnemies() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
    ]
}

/**
 * Creates an array of BackgroundObject instances for the level backgrounds.
 *
 * @return {Array} An array of BackgroundObject instances for the level backgrounds.
 */
function createLevelBackgrounds() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -720, 500),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720, 80),
        new BackgroundObject('img/5_background/layers/air.png', 0, 500),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 80),
        new BackgroundObject('img/5_background/layers/air.png', 720, 500),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720, 80),
        new BackgroundObject('img/5_background/layers/air.png', 720 * 2, 500),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2, 80),
        new BackgroundObject('img/5_background/layers/air.png', 720 * 3, 500),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3, 80),
        new BackgroundObject('img/5_background/layers/air.png', 720 * 4, 500),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 4, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 4, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 4, 80),
    ]
}

/**
 * Creates an array of Coin objects representing the level coins.
 *
 * @return {Array} An array of Coin objects
 */
function createLevelCoins() {
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ]
}

/**
 * Create level clouds.
 *
 * @return {Array} Array of Cloud objects
 */
function createLevelClouds() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ]
}

/**
 * Creates an array of new Bottle objects.
 *
 * @return {array} An array of new Bottle objects
 */
function createLevelBottles() {
    return [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
    ]
}
