class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2950;

    /**
     * Constructor for initializing enemies, clouds, background objects, coins, and bottles.
     *
     * @param {type} enemies - description of the enemies parameter
     * @param {type} clouds - description of the clouds parameter
     * @param {type} backgroundObjects - description of the backgroundObjects parameter
     * @param {type} coins - description of the coins parameter
     * @param {type} bottles - description of the bottles parameter
     * @return {type} description of what the constructor returns
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}