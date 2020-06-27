export function Game() { 

    const STONE = 1;
    const SAND = 2;
    const GROUND = 3;
    const COIN = 4;
    const PACMAN = 5;
    const KEY = 6;
    const DOOR = 7;
    const MUMMY = 8;

    let gameData = [
        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 6, 4, 4, 8, 4, 1, 4, 4, 4, 4, 4, 1],
            [1, 4, 1, 1, 1, 4, 1, 4, 1, 1, 1, 4, 1],
            [1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
            [1, 4, 4, 4, 1, 1, 5, 1, 1, 4, 4, 4, 1],
            [1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
            [1, 4, 1, 1, 4, 4, 1, 4, 4, 1, 1, 4, 1],
            [1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1]
        ],

        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 4, 1, 4, 1, 4, 1, 8, 4, 4, 4, 4, 1],
            [1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1],
            [1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1],
            [1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1],
            [1, 4, 1, 1, 1, 4, 4, 4, 4, 4, 1, 4, 1],
            [1, 4, 1, 1, 1, 4, 1, 4, 1, 1, 1, 4, 1],
            [1, 4, 4, 8, 4, 4, 1, 4, 4, 4, 4, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1]
        ],

    ];

    let grid = gameData[0]
    let level = 1;
    let score = 0;
    let map;

    let pacman = {
        x: 6,
        y: 4,
        direction: 'right'
    };

    let door = {
        x: 11,
        y: 8,
    }

    let key = {
        x: 1,
        y: 1,
    }

    function createTiles(data) {
        let tilesArray = [];
        data.forEach(row => {
            row.forEach(el => {
                let tile = document.createElement('div');
                tile.classList.add('tile');

                if (el === STONE) {
                    tile.classList.add('stone');
                } else if (el === SAND) {
                    tile.classList.add('sand');
                } else if (el === GROUND) {
                    tile.classList.add('ground')
                } else if (el === COIN) {
                    tile.classList.add('coin');
                } else if (el === PACMAN) {
                    tile.classList.add('pacman');
                    tile.classList.add(pacman.direction);
                } else if (el === KEY) {
                    tile.classList.add('key');
                } else if (el === DOOR) {
                    tile.classList.add('door')
                } else if (el === MUMMY) {
                    tile.classList.add('mummy');
                }
                tilesArray.push(tile);
            })
            let breakTile = document.createElement('br');
            tilesArray.push(breakTile);
        })
        return tilesArray;
    }

    function drawMap() {
        map = document.createElement('div');
        // console.log(grid)
        let tiles = createTiles(grid);
        tiles.forEach(tile => {
            map.appendChild(tile);
        });
        document.getElementById('body').appendChild(map)
        // document.body.appendChild(map);
    }

    function eraseMap() {
        document.getElementById('body').removeChild(map)
        // document.body.removeChild(map);
    }

    function gameOver() {
        if (score === 1050) {
            eraseMap()
            alert("You win!")
        };
    }

    function levelChange() {
        if (grid[pacman.y][pacman.x] === grid[door.y][door.x]) {
            grid = gameData[1];
            level = 2;
            // alert("You are in Level 1")
        }
    }

    function screenLevel() {
        document.getElementById('level').textContent = "Level: " + level;
    }

    function screenScore() {
        document.getElementById('score').textContent = "Score: " + score;
    }

    function doorUnlock() {
        if (grid[key.y][key.x] !== KEY) {
            grid[door.y][door.x] = GROUND;
        }
    }

    function moveDown() {
        pacman.direction = 'down';

        if ((grid[pacman.y + 1][pacman.x] !== STONE) && (grid[pacman.y + 1][pacman.x] !== DOOR)) {
            if (grid[pacman.y + 1][pacman.x] === COIN) {
                score = score += 10;
            }
            grid[pacman.y][pacman.x] = GROUND;
            pacman.y = pacman.y + 1;
            grid[pacman.y][pacman.x] = PACMAN;
        }
    }

    function moveUp() {
        pacman.direction = 'up';
        if (grid[pacman.y - 1][pacman.x] !== STONE) {
            if (grid[pacman.y - 1][pacman.x] === COIN) {
                score = score += 10;
            }
            grid[pacman.y][pacman.x] = GROUND;
            pacman.y = pacman.y - 1;
            grid[pacman.y][pacman.x] = PACMAN;
        }
    }

    function moveLeft() {
        pacman.direction = 'left';
        if (grid[pacman.y][pacman.x - 1] !== STONE) {
            if (grid[pacman.y][pacman.x - 1] === COIN) {
                score = score += 10;
            }
            grid[pacman.y][pacman.x] = GROUND;
            pacman.x = pacman.x - 1;
            grid[pacman.y][pacman.x] = PACMAN;
        }
    }

    function moveRight() {
        pacman.direction = 'right';
        if (grid[pacman.y][pacman.x + 1] !== STONE) {
            if (grid[pacman.y][pacman.x + 1] === COIN) {
                score = score += 10;
            }
            grid[pacman.y][pacman.x] = GROUND;
            pacman.x = pacman.x + 1;
            grid[pacman.y][pacman.x] = PACMAN;
        }
    }

    function setupKeyboardControls() {
        document.addEventListener('keydown', function (e) {
            // console.log(e.keyCode);
            if (e.keyCode === 37) {
                moveLeft();
            } else if (e.keyCode === 38) {
                moveUp();
            } else if (e.keyCode === 39) {
                moveRight();
            } else if (e.keyCode === 40) {
                moveDown();
            }
            screenLevel();
            screenScore();
            doorUnlock();
            levelChange();
            eraseMap();
            drawMap();
            gameOver();
        });
    }
}    
