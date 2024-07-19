let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let throw_audio = new Audio('audio/throw.mp3');
let dead_chicken_audio = new Audio('audio/dead_chicken.mp3');
let game_over_audio = new Audio('audio/game_over.mp3');
let bottle_hit_audio = new Audio('audio/bottle_hit.mp3');
let jumping_audio = new Audio('audio/jump.mp3');
let coin_collect_audio = new Audio('audio/coin_collect.mp3');
let collect_bottle_audio = new Audio('audio/collect_bottle.mp3');
let walking_audio = new Audio('audio/walking.mp3');
let background_audio = new Audio('audio/background.mp3');
let hurting_audio = new Audio('audio/hurt.mp3');
let idle_snoring = new Audio('audio/snoring.mp3');
let endboss_theme = new Audio('audio/endboss.mp3');
let muted = false;
activeFullscreen = false;
let lastThrowTime = 0;

/**
 * Initializes the canvas and creates a new world.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileButtonsTrue();
    mobileButtonsFalse();
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;}
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;}
    if (e.keyCode == 38) {
        keyboard.UP = true;}
    if (e.keyCode == 40) {
        keyboard.DOWN = true;}
    if (e.keyCode == 32) {
        e.preventDefault();
        keyboard.SPACE = true;}
    if (e.keyCode == 68) {
        keyboard.D = true;}
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;}
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;}
    if (e.keyCode == 38) {
        keyboard.UP = false;}
    if (e.keyCode == 40) {
        keyboard.DOWN = false;}
    if (e.keyCode == 32) {
        keyboard.SPACE = false;}
    if (e.keyCode == 68) {
        keyboard.D = false;}
});

/**
 * Function to handle touch on mobile buttons and update keyboard state to true 
 */
function mobileButtonsTrue() {
    document.getElementById('mobile-left').addEventListener('touchstart', function (e) {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('mobile-right').addEventListener('touchstart', function (e) {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('mobile-up').addEventListener('touchstart', function (e) {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('mobile-throw').addEventListener('touchstart', function (e) {
        e.preventDefault();
        keyboard.D = true;
    });
}

/**
 * Function to handle touch on mobile buttons and update keyboard state to false
 */
function mobileButtonsFalse() {
    document.getElementById('mobile-left').addEventListener('touchend', function (e) {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('mobile-right').addEventListener('touchend', function (e) {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('mobile-up').addEventListener('touchend', function (e) {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('mobile-throw').addEventListener('touchend', function (e) {
        e.preventDefault();
        keyboard.D = false;
    });
}

/**
 * Function to start the game by resetting the world, hiding start button, loading level 1, initializing, and playing background audio.
 */
function startGame() {
    if (world && world.character) {
        stopAllIntervals();
        world.resetCamera();
        world = null;
    }
    hideStartButton();
    loadLevel1();
    init();
    background_audio.play();
    background_audio.loop = true;
}

/**
 * Hides the start button and start screen, and blurs the restart button.
 *
 */
function hideStartButton() {
    let startbutton = document.getElementById('start-button');
    let startScreen = document.getElementById('start-screen');
    startScreen.style.backgroundImage = 'none';
    startbutton.classList.add('d-none');
    document.getElementById('restart-button').blur();
}

/**
 * Hides the game over screen by setting its display style to 'none'.
 *
 */
function hideGameOverScreen() {
    let gameOverScreen = document.getElementById('game-over-screen');
    gameOverScreen.style.display = 'none';
}

/**
 * Adds the provided interval to the collection of interval IDs.
 *
 * @param {type} interval - The interval ID to be added.
 */
function pushInterval(interval) {
    intervalIds.push(interval);
}

/**
 * Stops all intervals by clearing their IDs.
 *
 * @param {array} intervalIds - An array of interval IDs to be stopped
 * @return {undefined} 
 */
function stopAllIntervals() {
    intervalIds.forEach(id => clearInterval(id));
}

/**
 * Toggles the muted state of the background audio and updates the mute button accordingly.
 *
 */
function toggleMuted() {
    if (background_audio.muted) {
        unmuteSounds();
        document.getElementById('mute').classList.remove('unmute');
        document.getElementById('mute').classList.add('mute');
    } else {
        muteSounds();
        document.getElementById('mute').classList.remove('mute');
        document.getElementById('mute').classList.add('unmute');
    }
    document.getElementById('mute').blur();
}

/**
 * Mutes all sound effects in the game.
 */
function muteSounds() {
    background_audio.muted = true;
    game_over_audio.muted = true;
    dead_chicken_audio.muted = true;
    bottle_hit_audio.muted = true;
    coin_collect_audio.muted = true;
    collect_bottle_audio.muted = true;
    jumping_audio.muted = true;
    hurting_audio.muted = true;
    walking_audio.muted = true;
    throw_audio.muted = true;
    idle_snoring.muted = true;
    endboss_theme.muted = true;
}

/**
 * Sets the 'muted' property to false for all sound effects in the game.
 */
function unmuteSounds() {
    background_audio.muted = false;
    game_over_audio.muted = false;
    dead_chicken_audio.muted = false;
    bottle_hit_audio.muted = false;
    coin_collect_audio.muted = false;
    collect_bottle_audio.muted = false;
    jumping_audio.muted = false;
    hurting_audio.muted = false;
    walking_audio.muted = false;
    throw_audio.muted = false;
    idle_snoring.muted = false;
    endboss_theme.muted = false;
}


/**
 * Toggles fullscreen mode based on the current state.
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    if (activeFullscreen) {
        exitFullscreen();
        activeFullscreen = false;
    } else {
        enterFullscreen(fullscreen);
        activeFullscreen = true;
    }
}

/**
 * Function to enter fullscreen mode for the given element.
 *
 * @param {Element} element - The element for which fullscreen mode will be entered 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * A function to exit fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}






















