let canvas = document.querySelector('canvas')
canvas.width = 1024
canvas.height = 576
let c = canvas.getContext('2d');

let g = 1;



// Creating a player class
class Player {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.speed = 10;

        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 66
        this.height = 150
        this.frame = 0
        this.playerimg = {
            stand: {
                right: standRight,
                left: standLeft,
                cropWidth: 177,
                width: 66
            },
            run: {
                right: runRight,
                left: runLeft,
                cropWidth: 340,
                width: 120
            }
        }
        this.currentimage = standRight
        this.currentCropWidth = 177
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.drawImage(this.currentimage,
            this.currentCropWidth * this.frame,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    };
    update() {
        this.frame++
            if ((this.frame > 59 && this.currentimage === this.playerimg.stand.right) || (this.frame > 59 && this.currentimage === this.playerimg.stand.left)) {
                this.frame = 0
            } else
        if ((this.frame > 30 && this.currentimage === this.playerimg.run.right) || (this.frame > 30 && this.currentimage === this.playerimg.run.left)) {
            this.frame = 0
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += g;
        } else {
            // this.velocity.y = 0;
        }
        this.draw();
        // console.log(this.position.y);
    }
}

// platform class
class Platform {
    constructor(m, x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.image = m
        this.width = m.width
        this.height = m.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }
}

//  GenericObject class
class OtherObjects {
    constructor(m, x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.image = m
        this.width = m.width
        this.height = m.height


    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}





// let player
let player;

// platform
let plateform = []

//Other Objects
let otherObjects = []
let screenScroll;



// let image
function fun2(src) {
    let image = new Image();
    image.src = src
    console.log(image)
    return image
}

let pImg = fun2('./images/platform.png');
let bgImg = fun2('./images/background.png');
let hImg = fun2('./images/hills.png');
let psImg = fun2('./images/platformSmallTall.png');


let runLeft = fun2('./images/spriteRunLeft.png');
let runRight = fun2('./images/spriteRunRight.png');
let standLeft = fun2('./images/spriteStandLeft.png');
let standRight = fun2('./images/spriteStandRight.png');
// for keybord events
let keys = {
    right: false,
    left: false,
}
let up = true;

//Calling the function init() here;
init();


// Reset Function
function init() {
    // let player
    player = new Player(100, 100);

    // platform
    plateform = [new Platform(pImg, 0, 576 - pImg.height),
        new Platform(pImg, pImg.width - 2, 576 - pImg.height),
        new Platform(pImg, (pImg.width + 100) * 2, 576 - pImg.height),
        new Platform(psImg, (psImg.width + 400) * 3, 576 - psImg.height)
    ]

    //Other Objects
    otherObjects = [new OtherObjects(bgImg, 0, 0),
        new OtherObjects(hImg, 0, 0)
    ]


    screenScroll = 0;
}


// Animate Function
function fun1() {

    requestAnimationFrame(fun1);
    c.clearRect(0, 0, canvas.width, canvas.height);
    otherObjects.forEach((e) => {
        e.draw()
    })


    plateform.forEach((e) => {
        e.draw();
    })
    player.update();


    if (keys.right && player.position.x < 400) {
        player.velocity.x = +player.speed;
    } else if ((keys.left && player.position.x > 100) || (keys.left && screenScroll === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;
        if (keys.right) {
            screenScroll += player.speed;

            plateform.forEach((e) => {
                e.position.x -= player.speed;
            });
            otherObjects.forEach((e) => {
                e.position.x -= player.speed * 0.66;
            });
        } else if (keys.left && screenScroll > 0) {
            screenScroll -= player.speed;

            plateform.forEach((e) => {
                e.position.x += player.speed;

            });
            otherObjects.forEach((e) => {
                e.position.x += player.speed * 0.66;
            });
        }
        // console.log(screenScroll);
        // Win Situation
        if (screenScroll > 2000) {
            console.log('you win')
        }

        // if lose condition
        if (player.position.y > canvas.height) {
            console.log('you lose');
            init();
            // location.reload();
        }
    }


    // collotion detection code
    plateform.forEach((e) => {
        // console.log(e.position.x, e.position.y);
        if (player.position.y + player.height <= e.position.y &&
            player.position.y + player.height + player.velocity.y >= e.position.y &&
            player.position.x + player.width > e.position.x &&
            player.position.x < e.position.x + e.width
        ) {
            player.velocity.y = 0;
        }
    });
    // console.log(player.position.x, player.position.y);

}
fun1();





// keybord keys function
window.addEventListener('keydown', ({ code }) => {
    console.log(code)
    if (code == 'Space' || code == 'ArrowUp') {
        if (up && player.velocity.y == 0) {
            player.velocity.y = -20;
            up = false
        }

    } else if (code == 'ArrowRight') {
        console.log('right');
        player.currentimage = player.playerimg.run.right;
        player.currentCropWidth = player.playerimg.run.cropWidth;
        player.width = player.playerimg.run.width;
        keys.right = true;
    } else if (code == "ArrowLeft") {
        keys.left = true;
        player.currentimage = player.playerimg.run.left;
        player.currentCropWidth = player.playerimg.run.cropWidth;
        player.width = player.playerimg.run.width;
    }
});


window.addEventListener('keyup', ({ code }) => {
    if (code == 'Space' || code == 'ArrowUp') {
        up = true
    } else if (code == "ArrowRight") {
        keys.right = false;
        player.currentimage = player.playerimg.stand.right;
        player.currentCropWidth = player.playerimg.stand.cropWidth;
        player.width = player.playerimg.stand.width;
    } else if (code == "ArrowLeft") {
        keys.left = false;
        player.currentimage = player.playerimg.stand.left;
        player.currentCropWidth = player.playerimg.stand.cropWidth;
        player.width = player.playerimg.stand.width;
    }
});