class StatusBar_Bottle extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    percentage = 0;

    /**
    * Constructor function that initializes various images and applies gravity.
    */
    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 30;
        this.y = 60;
        this.height = 60;
        this.width = 200;
        this.setPercentage(0);
    }

    /**
    * This sets the percentage for the bottle bar
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        this.percentage = this.percentage * 20;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * This defines the percentages for the bottle bar
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

