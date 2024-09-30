let boardRows = document.querySelectorAll(".board tr");
let currentIndex = [
    Math.floor(Math.random() * 8),
    Math.floor(Math.random() * 8),
];
let board = document.querySelector(".board");
let score = 0;
let foodIndex = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)];
let snake = [];
let speed = 200;
let direct = "up";
let move = true;
let start = true;

boardRows[currentIndex[0]].children[currentIndex[1]].classList.add(
    "snake-head"
);
boardRows[foodIndex[0]].children[foodIndex[1]].classList.add("food");

board.id = direct;

let upBtn = document.querySelector(".up"),
    downBtn = document.querySelector(".down"),
    leftBtn = document.querySelector(".left"),
    rightBtn = document.querySelector(".right");

let timer;

upBtn.addEventListener("click", () => {
    moving("up");
});
downBtn.addEventListener("click", () => {
    moving("down");
});
leftBtn.addEventListener("click", () => {
    moving("left");
});
rightBtn.addEventListener("click", () => {
    moving("right");
});

document.addEventListener("keyup", (e) => {
    if (start) {
        timer = setInterval(snakeAutoMove, speed);
        document.querySelector(".dialog").classList.add("hide");
        start = false;
    }
    if (e.key == "ArrowUp") {
        moving("up");
    }
    if (e.key == "ArrowDown") {
        moving("down");
    }
    if (e.key == "ArrowLeft") {
        moving("left");
    }
    if (e.key == "ArrowRight") {
        moving("right");
    }
});

function eat() {
    if (currentIndex.toLocaleString() == foodIndex.toLocaleString()) {
        score++;
        board.setAttribute("data-score", score);
        boardRows[foodIndex[0]].children[foodIndex[1]].classList.remove("food");
        foodIndex = [
            Math.floor(Math.random() * 8),
            Math.floor(Math.random() * 8),
        ];
        boardRows[foodIndex[0]].children[foodIndex[1]].classList.add("food");
        switch (direct) {
            case "up":

            case "down":

            case "left":

            case "right":

            default:
                break;
        }
    }
}

function moving(direction) {
    if (move && direct !== direction) {
        direct = direction;
        move = false;
        clearInterval(timer);
        snakeAutoMove();
        timer = setInterval(snakeAutoMove, speed);
    }
}
function snakeAutoMove() {
    eat();
    boardRows[currentIndex[0]].children[currentIndex[1]].classList.remove(
        "snake-head"
    );
    switch (direct) {
        case "up":
            currentIndex[0] -= 1;
            if (currentIndex[0] < 0) currentIndex[0] = 7;
            break;
        case "down":
            currentIndex[0] += 1;
            if (currentIndex[0] > 7) currentIndex[0] = 0;
            break;
        case "left":
            currentIndex[1] -= 1;
            if (currentIndex[1] < 0) currentIndex[1] = 7;
            break;
        case "right":
            currentIndex[1] += 1;
            if (currentIndex[1] > 7) currentIndex[1] = 0;
            break;
        default:
            break;
    }
    boardRows[currentIndex[0]].children[currentIndex[1]].classList.add(
        "snake-head"
    );
    move = true;
    board.id = direct;
}
