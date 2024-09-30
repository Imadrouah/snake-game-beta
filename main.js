let board = document.querySelector(".board"),
    boardRows = document.querySelectorAll(".board tr");
let currentIndex = [
        Math.floor(Math.random() * 8),
        Math.floor(Math.random() * 8),
    ],
    foodIndex = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)];
let snake = [];
let score = 0,
    speed = 200,
    direct = "up",
    move = true,
    start = true;

boardRows[currentIndex[0]].children[currentIndex[1]].classList.add(
    "snake-head"
);
boardRows[foodIndex[0]].children[foodIndex[1]].classList.add("food");

board.id = direct;

let upBtn = document.querySelector(".up"),
    downBtn = document.querySelector(".down"),
    leftBtn = document.querySelector(".left"),
    rightBtn = document.querySelector(".right");

let magicBtn = document.querySelector(".magic"),
    pauseBtn = document.querySelector(".pause"),
    resetBtn = document.querySelector(".reset");

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

magicBtn.addEventListener("click", () => {
    setInterval(autoPlay, 100);
});
pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
});
resetBtn.addEventListener("click", () => {
    window.location.reload();
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
        timerHandle();
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
function autoPlay() {
    if (foodIndex[0] >= currentIndex[0] && direct !== "down") {
        // console.log("go down");
        direct = "down";
        timerHandle();
    } else if (foodIndex[0] <= currentIndex[0] && direct !== "up") {
        // console.log("go up");
        direct = "up";
        timerHandle();
    }
    if (foodIndex[0] == currentIndex[0]) {
        if (foodIndex[1] <= currentIndex[1] && direct !== "left") {
            // console.log("go left");
            direct = "left";
            timerHandle();
        }
        if (foodIndex[1] >= currentIndex[1] && direct !== "right") {
            // console.log("go right");
            direct = "right";
            timerHandle();
        }
    }
}

function timerHandle() {
    clearInterval(timer);
    snakeAutoMove();
    timer = setInterval(snakeAutoMove, speed);
}
