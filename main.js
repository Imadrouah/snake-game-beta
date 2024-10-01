let board = document.querySelector(".board"),
    boardRows = document.querySelectorAll(".board tr");
let currentIndex = [
    Math.floor(Math.random() * 8),
    Math.floor(Math.random() * 8),
];
let snake = [currentIndex];
let foodIndex = getRandomFoodIndex();
let score = 0,
    speed = 200,
    direct = "up",
    move = true,
    start = true;

boardRows[snake[0][0]].children[snake[0][1]].classList.add("snake-head");
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
    if (compareArrays(snake[0], foodIndex)) {
        score++;
        board.setAttribute("data-score", score);
        boardRows[foodIndex[0]].children[foodIndex[1]].classList.remove("food");
        foodIndex = getRandomFoodIndex();
        boardRows[foodIndex[0]].children[foodIndex[1]].classList.add("food");

        let lastPartIndex = snake[snake.length - 1];
        let newBodyPartIndex;
        switch (direct) {
            case "up":
                newBodyPartIndex = [lastPartIndex[0] + 1, lastPartIndex[1]];
                break;
            case "down":
                newBodyPartIndex = [lastPartIndex[0] - 1, lastPartIndex[1]];
                break;
            case "left":
                newBodyPartIndex = [lastPartIndex[0], lastPartIndex[1] + 1];
                break;
            case "right":
                newBodyPartIndex = [lastPartIndex[0], lastPartIndex[1] - 1];
                break;
            default:
                break;
        }

        if (
            newBodyPartIndex[0] >= 0 &&
            newBodyPartIndex[0] < 8 &&
            newBodyPartIndex[1] >= 0 &&
            newBodyPartIndex[1] < 8
        ) {
            boardRows[newBodyPartIndex[0]].children[
                newBodyPartIndex[1]
            ].classList.add("snake");
            snake.push(newBodyPartIndex);
        }
    }
}

function moving(direction) {
    if (
        move &&
        direct !== direction &&
        !(
            snake.length > 1 &&
            ((direct === "up" && direction === "down") ||
                (direct === "down" && direction === "up") ||
                (direct === "left" && direction === "right") ||
                (direct === "right" && direction === "left"))
        )
    ) {
        direct = direction;
        move = false;
        timerHandle();
    }
}
function snakeAutoMove() {
    if (snake.length > 1) {
        boardRows[snake[snake.length - 1][0]].children[
            snake[snake.length - 1][1]
        ].classList.remove("tail");
    }
    let oldSnakeIndexes = [...snake];

    boardRows[snake[0][0]].children[snake[0][1]].classList.remove("snake-head");
    switch (direct) {
        case "up":
            snake[0][0] -= 1;
            if (snake[0][0] < 0) snake[0][0] = 7;
            break;
        case "down":
            snake[0][0] += 1;
            if (snake[0][0] > 7) snake[0][0] = 0;
            break;
        case "left":
            snake[0][1] -= 1;
            if (snake[0][1] < 0) snake[0][1] = 7;
            break;
        case "right":
            snake[0][1] += 1;
            if (snake[0][1] > 7) snake[0][1] = 0;
            break;
        default:
            break;
    }

    boardRows[snake[0][0]].children[snake[0][1]].classList.add("snake-head");

    for (let index = 1; index < snake.length; index++) {
        boardRows[oldSnakeIndexes[index][0]].children[
            oldSnakeIndexes[index][1]
        ].classList.remove("snake");

        snake[index] = [...oldSnakeIndexes[index - 1]];

        boardRows[snake[index][0]].children[snake[index][1]].classList.add(
            "snake"
        );
    }

    if (snake.length > 1) {
        boardRows[snake[snake.length - 1][0]].children[
            snake[snake.length - 1][1]
        ].classList.add("tail");
    }

    move = true;
    board.id = direct;
    eat();
}
function autoPlay() {
    if (foodIndex[0] > snake[0][0] && direct !== "down") {
        direct = "down";
        timerHandle();
    } else if (foodIndex[0] < snake[0][0] && direct !== "up") {
        direct = "up";
        timerHandle();
    }
    if (foodIndex[0] == snake[0][0]) {
        if (foodIndex[1] < snake[0][1] && direct !== "left") {
            direct = "left";
            timerHandle();
        }
        if (foodIndex[1] > snake[0][1] && direct !== "right") {
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

function getRandomFoodIndex() {
    let index = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)];
    for (let part of snake) {
        if (compareArrays(index, part)) {
            return getRandomFoodIndex();
        }
    }
    return index;
}
function compareArrays(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}
