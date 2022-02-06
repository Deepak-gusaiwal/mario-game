const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
// console.log(c);

const gravity = 0.5;
// player class
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 30
        this.height = 30
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity

        } else {
            this.velocity.y = 0;
        }
        this.draw();
    }
}

// scrolloffset
let scrolloffset = 0;


// Plateform Class
class Plateform {
    constructor(x, y, image) {
        this.position = {
            x: x,
            y: y

        }
        this.image = image
        this.width = 300
        this.height = 60

    }

    draw() {
        // c.fillStyle = 'blue';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
};


// GeneriObject Class
class GenericObject {
    constructor(x, y, image) {
        this.position = {
            x: x,
            y: y

        }
        this.image = image
            // this.width = 300
            // this.height = 60

    }

    draw() {

        c.drawImage(this.image, this.position.x, this.position.y, )
    }
};

// images
function createImage(imgsrc) {
    const image = new Image()
    image.src = imgsrc
    console.log(image)
    return image
}
let pImg = createImage('./images/platform.png');
let bgImg = createImage('./images/background.png');

// const image2 = new Image()
// image2.src = './images/hills.png'
// console.log(image2)

// variable for the plateforms
const plateform = new Plateform();
const plateforms = [new Plateform(0, 530, pImg), new Plateform(298, 530, pImg)];
const genericObjects = [new GenericObject(0, 0, bgImg)]

//variable for the players
const player = new Player();






const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}


// animation function
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);

    genericObjects.forEach((e) => {
        e.draw();
    });

    plateforms.forEach((plateform) => {
        plateform.draw();
    });

    player.update();

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;
        if (keys.right.pressed) {
            plateforms.forEach((plateform) => {
                plateform.position.x -= 5;
            });
            scrolloffset += 5;

        } else if (keys.left.pressed) {
            plateforms.forEach((plateform) => {
                plateform.position.x += 5;
            });
            scrolloffset -= 5;
        }
    }

    // platform collistion detection

    plateforms.forEach((plateform) => {
        if (player.position.y + player.height <= plateform.position.y &&
            player.position.y + player.height + player.velocity.y >= plateform.position.y &&
            player.position.x + player.width >= plateform.position.x &&
            player.position.x <= plateform.position.x + plateform.width) {
            player.velocity.y = 0;
        }
    });

    // console.log(player.position.y)
    if (scrolloffset > 2000) {
        console.log('you win')
    }
}
animate();





window.addEventListener('keydown', ({
    code
}) => {
    // console.log('key down event is fired', code);
    if (code == 'ArrowRight') {
        keys.right.pressed = true;
    } else if (code == 'ArrowLeft') {
        keys.left.pressed = true;
    } else if (code == 'ArrowDown') {
        // console.log('you press Down');
        player.velocity.y = 0;
    } else if (code == 'Space' || code == 'ArrowUp') {
        // console.log('you press UP');
        if (player.velocity.y == 0) {
            player.velocity.y = -20;
        }
    }

});

window.addEventListener('keyup', ({
    code
}) => {
    // console.log('key down event is fired', code);
    if (code == 'ArrowRight') {
        keys.right.pressed = false;
    } else if (code == 'ArrowLeft') {
        // console.log('you press Left');
        keys.left.pressed = false;
    } else if (code == 'ArrowDown') {
        // console.log('you press Down')
    } else if (code == 'Space' || code == 'ArrowUp') {
        // console.log('you press UP');
    }
});