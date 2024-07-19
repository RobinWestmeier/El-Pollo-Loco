class StatusBar_Coin extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    percentage = 0;

    /**
     * Constructor function for initializing the class.
     */
    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 30;
        this.y = 110;
        this.height = 60;
        this.width = 200;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage and calculates a new value, then updates the image based on the new percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
         this.percentage = this.percentage * 20;
         let path = this.IMAGES[this.resolveImageIndex()];
         this.img = this.imageCache[path];
     }
 
     /**
      * This defines the percentages for the coin bar
      */
     resolveImageIndex() {
         if (this.percentage >= 100) {
             return 5;
         } else if (this.percentage >= 80) {
             return 4;
         } else if (this.percentage >= 60) {
             return 3;
         } else if (this.percentage >= 40) {
             return 2;
         } else if (this.percentage >= 20) {
             return 1;
         } else {
             return 0;
         }
     }
 }
 
 
