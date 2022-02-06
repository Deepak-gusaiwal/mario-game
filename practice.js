let canvas = document.querySelector('canvas')
console.log(canvas);
const c = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(c);

let x = 100
let y = 100
let width = 30
let height = 30
let vx = 0;
let vy = 0;
let g = 0.5;


function draw() {
    c.fillStyle = 'red'
    c.fillRect(x, y, width, height);
}


function update() {
    x = x + vx;
    y = y + vy;
    // console.log('y is', y);
    if (y + height + vy <= canvas.height) {
        vy += g;
        // console.log('vy is', vy)
    } else {
        vy = 0;
    }
    draw();
}

setInterval(() => {

    c.clearRect(0, 0, canvas.width, canvas.height)
    update();
}, 15);

let right = false;
let left = false;
let Jump = false;

window.addEventListener('keydown', ({ code }) => {
    // console.log('key down event is fired', code);
    if (code == 'ArrowRight') {
        right = true;
        console.log(right);
        if (right) {
            vx = 5;
        }
    } else if (code == 'ArrowLeft') {
        console.log('you press Left');
        left = true;
        console.log(right);
        if (left) {
            vx = -5;
        }
    } else if (code == 'ArrowDown') {
        console.log('you press Down')
    } else if (code == 'Space' || code == 'ArrowUp') {
        console.log('you press UP');
        jump = true;
        if (jump) {
            vy -= 10;
        }
    }
});
window.addEventListener('keyup', ({ code }) => {
    // console.log('key down event is fired', code);
    if (code == 'ArrowRight') {
        right = false;
        console.log(right);
        vx = 0;
    } else if (code == 'ArrowLeft') {
        console.log('you press Left');
        left = false;
        console.log(left);
        vx = 0;
    } else if (code == 'ArrowDown') {
        console.log('you press Down')
    } else if (code == 'Space' || code == 'ArrowUp') {
        console.log('you press UP');
        jump = false
        vy = 0;
    }
});