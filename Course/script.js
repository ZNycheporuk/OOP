// const fs = require('fs')

window.onload = () => {
    let gameData
    //The initial setup
    let gameBoard = [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0]
    ];
    //arrays to store the instances
    let pieces = [];
    let tiles = [];

    //distance formula
    let dist = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }
//     function jsonReader(filePath) {
//     let fileData = fs.readFileSync(filePath)
//     const object = JSON.parse(fileData)
//     return object
// }

// function jsonWriter(object, filePath) {
//     let string = JSON.stringify(object, null, 1)
//     fs.writeFileSync(filePath, string)
// }
    //strategy pattern
    class Strategy {
        add(player) { }
    }
    class NumbersStrategy extends Strategy {
        constructor() {
            super();
            $('#player1').append("<p id='score1'>0</p>");
            $('#player2').append("<p id='score2'>0</p>");
        }
        add(player) {
            if (player == 2) {
                $('#score1').html(1 + +($('#score1').html()));
                return;
            }
            $('#score2').html(1 + +($('#score2').html()))

        }
    }
    class CheckersSterategy extends Strategy {
        add(player) {
            if (player == 2) {
                $('#player1').append("<div class='capturedPiece'></div>");
                return;
            }
            $('#player2').append("<div class='capturedPiece'></div>");
        }
    }

    //prototype pattern
    //Piece object - there are 24 instances of them in a checkers game
    class Piece {
        constructor(element, position, playerNumber) {
            this.setElement(element);
            this.setPosition(position);
            this.setPlayer(playerNumber);
        }
    }
        Piece.prototype.allowedtomove = true;
        Piece.prototype.element;
        Piece.prototype.position;
        Piece.prototype.player = '';
        Piece.prototype.queen = false;
        Piece.prototype.strategy = new CheckersSterategy();

        Piece.prototype.setElement = function(element) {
        this.element = element
    };
        Piece.prototype.setPosition = function(position) {
        this.position = position
    };
        Piece.prototype.setPlayer = function(i) {
        if(i) {
        this.player = +i;
        return;
    }
        // (this.element.attr("id")<12)?this.player = 1: this.player = 2;
    }
        Piece.prototype.setStrategy = function() {
        this.strategy = strategy;
    }
        Piece.prototype.makeQueen = function() {
        this.element.css("backgroundImage", "url('img/queen" + this.player + ".png')");
        this.queen = true;
    }
        //moves the piece
        Piece.prototype.move = function(tile) {
        this.element.removeClass('selected');
        if (!board.isValidPlacetoMove(tile.position[0], tile.position[1])) return false;
        //make sure piece doesn't go backwards if it's not a queen
        if (this.player == 1 && this.queen == false) {
        if (tile.position[0] <this.position[0]) return false;
    } else if (this.player == 2 && this.queen == false) {
        if (tile.position[0]> this.position[0]) return false;
    }
        //remove the mark from Board.board and put it in the new spot
        board.board[this.position[0]][this.position[1]] = 0;
        board.board[tile.position[0]][tile.position[1]] = this.player;
        this.position =[tile.position[0], tile.position[1]];
        //change the css using board's dictionary
        this.element.css('top', board.dictionary[this.position[0]]);
        this.element.css('left', board.dictionary[this.position[1]]);
        //if piece reaches the end of the row on opposite side crown it a queen (can move all directions)
        if (!this.queen && (this.position[0] == 0 || this.position[0] == 7))
        this.makeQueen();
        return true;
    };
        //tests if piece can jump anywhere
        Piece.prototype.canJumpAny = function() {
        return (this.canOpponentJump([this.position[0] + 2, this.position[1] + 2]) ||
        this.canOpponentJump([this.position[0] + 2, this.position[1] - 2]) ||
        this.canOpponentJump([this.position[0] - 2, this.position[1] + 2]) ||
        this.canOpponentJump([this.position[0] - 2, this.position[1] - 2]))
    };
        //tests if an opponent jump can be made to a specific place
        Piece.prototype.canOpponentJump = function(newPosition) {
        //find what the displacement is
        let dx = newPosition[1] - this.position[1];
        let dy = newPosition[0] - this.position[0];
        //make sure object doesn't go backwards if not a queen
        if (this.player == 1 && this.queen == false) {
        if (newPosition[0] <this.position[0]) return false;
    } else if (this.player == 2 && this.queen == false) {
        if (newPosition[0]> this.position[0]) return false;
    }
        //must be in bounds
        if (newPosition[0]> 7 || newPosition[1]> 7 || newPosition[0] <0 || newPosition[1] <0) return false;
        //middle tile where the piece to be conquered sits
        let tileToCheckx = this.position[1] + dx / 2;
        let tileToChecky = this.position[0] + dy / 2;
        if (tileToCheckx> 7 || tileToChecky> 7 || tileToCheckx<0 || tileToChecky<0) return false;
        //if there is a piece there and there is no piece in the space after that
        if (!board.isValidPlacetoMove(tileToChecky, tileToCheckx) && board.isValidPlacetoMove(newPosition[0], newPosition[1])) {
        //find which object instance is sitting there
        for (let pieceIndex in pieces) {
        if (pieces[pieceIndex].position[0] == tileToChecky && pieces[pieceIndex].position[1] == tileToCheckx) {
        if (this.player != pieces[pieceIndex].player) {
        //return the piece sitting there
        return pieces[pieceIndex];
    }
    }
    }
    }
        return false;
    };
        Piece.prototype.opponentJump = function(tile) {
        let pieceToRemove = this.canOpponentJump(tile.position);
        //if there is a piece to be removed, remove it
        if (pieceToRemove) {
        pieceToRemove.remove();
        return true;
    }
        return false;
    };

        Piece.prototype.remove = function() {
        //remove it and delete it from the gameboard
        this.element.css("display", "none");
        if (this.player == 1) {
        this.strategy.add(1)
        board.score.player2 += 1;
    }
        if (this.player == 2) {
        this.strategy.add(2);
        // $('#player1').append("<div class='capturedPiece'><$('#player2').append("<div class='capturedPiece'></div>");/div>");
        board.score.player1 += 1;
    }
        board.board[this.position[0]][this.position[1]] = 0;
        //reset position so it doesn't get picked up by the for loop in the canOpponentJump method
        this.position =[];
        board.checkIfAnybodyWon();
    }

    class Tile {
        constructor(element, position) {
            //linked DOM element    
            this.element = element;
            //position in gameboard
            this.position = position;
        }
        inRange(piece) {
            for (let k of pieces)
                if (k.position[0] == this.position[0] && k.position[1] == this.position[1]) return 'wrong';
            if (!piece.queen && piece.player == 1 && this.position[0] < piece.position[0]) return 'wrong';
            if (!piece.queen && piece.player == 2 && this.position[0] > piece.position[0]) return 'wrong';
            if (dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) == Math.sqrt(2)) {
                //regular move
                return 'regular';
            } else if (dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) == 2 * Math.sqrt(2)) {
                //jump move
                return 'jump';
            }
        };
    }
    //Board object - controls logic of game
    class Board {
        constructor(gameBoard, mediator) {
            this.board = gameBoard,
                this.score = {
                    player1: 0,
                    player2: 0
                },
                this.mediator = mediator;
            this.playerTurn = 1,
                this.jumpexist = false,
                this.continuousjump = false,
                this.tilesElement = $('div.tiles'),
                //dictionary to convert position in Board.board to the viewport units
                this.dictionary = ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"]
        }
        initialize() {
            let countPieces = 0;
            let countTiles = 0;
            for (let row in this.board) { //row is the index

                for (let column in this.board[row]) { //column is the index
                    //whole set of if statements control where the tiles and pieces should be placed on the board
                    if (row % 2 == 1) {
                        if (column % 2 == 0) {
                            countTiles = this.tileRender(row, column, countTiles)
                            // console.log(row, column, countTiles)
                        }
                    } else {
                        if (column % 2 == 1) {
                            countTiles = this.tileRender(row, column, countTiles)
                            // console.log(row, column, countTiles)
                        }
                    }
                    if (this.board[row][column] == 1) {
                        countPieces = this.playerPiecesRender(1, row, column, countPieces)
                    } else if (this.board[row][column] == 2) {
                        countPieces = this.playerPiecesRender(2, row, column, countPieces)
                    }
                }
            }
        }
        deinitialize() {
            pieces = [];
            tiles = [];
            $('div.tile').remove();
            $('div.piece').remove();
        }

        tileRender(row, column, countTiles) {
            this.tilesElement.append("<div class='tile' id='tile" + countTiles + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
            tiles[countTiles] = new Tile($("#tile" + countTiles), [parseInt(row), parseInt(column)]);
            return countTiles + 1
        }
        playerPiecesRender(playerNumber, row, column, countPieces) {
            $(`.player${playerNumber}pieces`).append("<div class='piece' id='" + countPieces + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
            pieces[countPieces] = new Piece($("#" + countPieces), [parseInt(row), parseInt(column)], playerNumber);
            return countPieces + 1;
        }
        //check if the location has an object
        isValidPlacetoMove(row, column) {
            // console.log(row); console.log(column); console.log(this.board);
            if (row < 0 || row > 7 || column < 0 || column > 7) return false;
            if (this.board[row][column] == 0) {
                return true;
            }
            return false;
        }
        //change the active player - also changes div.turn's CSS
        changePlayerTurn() {

            if (this.playerTurn == 1) {
                this.playerTurn = 2;
            } else {
                this.playerTurn = 1;
            }
            this.checkIfJumpExist()
            this.mediator.swap();

            return;
        }
        checkIfAnybodyWon(a) {
            if (a) $('#winner').html("Player " + a + " has won!");
            if (this.score.player1 == 12) {
                $('#winner').html("Player 1 has won!");
                this.mediator.end();
                return;
            } else if (this.score.player2 == 12) {
                this.mediator.end();
                $('#winner').html("Player 2 has won!");
                return;
            }
            return false;
        }
        deletePieces() {

        }
        //reset the game
        clear() {
            location.reload();
        }
        checkIfJumpExist() {
            this.jumpexist = false
            this.continuousjump = false;
            for (let k of pieces) {
                k.allowedtomove = false;
                // if jump exist, only set those "jump" pieces "allowed to move"
                if (k.position.length != 0 && k.player == this.playerTurn && k.canJumpAny()) {
                    this.jumpexist = true
                    k.allowedtomove = true;
                }
            }
            // if jump doesn't exist, all pieces are allowed to move
            if (!this.jumpexist) {
                for (let k of pieces) k.allowedtomove = true;
            }
        }
    }
    // observer pattern
    class EventObserver {
        constructor() {
            this.observers = []
        }
        subscribe(fn) {
            this.observers.push(fn)
        }
        unsubscribe() {
            this.observers = []; /*this.observers.filter(subscriber => subscriber !== fn)*/
        }
        broadcast(data) {
            this.observers.forEach(subscriber => subscriber(data))
        }
    }
    //mediator pattern
    class Mediator {
        constructor() {
            this.board;
            this.timer;
            this.observer;
        }
        getBoardData() {
            return {
                gameBoard: this.board.board,
                score: this.board.score,
                turn: this.board.playerTurn,
            }
        }
        getTimerData() {
            return this.timer.currentState
        }

        processBoard(boardData) {
            this.board.deinitialize();
            this.board.board = boardData.gameBoard;
            this.board.score = boardData.score;
            this.board.playerTurn = boardData.turn;
            this.board.initialize();
        }
        processTimer(timerData) {
            this.timer.stop();
            this.timer.currentState = timerData;
            this.timer.start()
        }

        setBoard(board) {
            this.board = board;
        }
        setTimer(timer) {
            this.timer = timer;
        }
        setStrategy(strategy) {
            this.strategy = strategy;
        }
        setObserver(observer) {
            this.observer = observer;
        }
        swap() {
            this.timer.currentState.stop();
        }
        end() {
            this.timer.currentState.end();
            this.observer.unsubscribe()
        }

    }
    class Memento {
        constructor(mediator) {
            this.mediator = mediator;
            this.gameData;
        }

        save() {
            this.gameData = {
                boardData: this.mediator.getBoardData(),
                timerData: this.mediator.getTimerData(),
            }
            console.log(this.gameData)
            return;
        }
        load() {
            // this.mediator.timer.stop();
            console.log(this.gameData)
            this.mediator.processBoard(this.gameData.boardData);
            this.mediator.processTimer(this.gameData.timerData);
            return;
        }

    }
    // state pattern
    class Timer {
        constructor(mediator) {
            this.whiteTime = 5 * 60;
            this.blackTime = 5 * 60;
            this.mediator = mediator;
            this.currentState = new WhiteTurn(this);
        }
        change(state) {
            this.currentState = state;
            this.currentState.runCount();
        };
        start() {
            this.currentState.runCount();
        };
        stop(){ 
            this.currentState.end();
        }
    }
    class WhiteTurn {
        static counting;
        static Time = 5 * 60;
        static counter;
        static obj;
        constructor(obj) {
            WhiteTurn.obj = obj;
            WhiteTurn.Time = obj.whiteTime;
            WhiteTurn.counter = WhiteTurn.Time
        }
        stop() {
            WhiteTurn.stopCount();
            WhiteTurn.obj.whiteTime = WhiteTurn.Time;
            WhiteTurn.obj.change(new BlackTurn(WhiteTurn.obj))
        }
        end() {
            WhiteTurn.stopCount();
        }
        static displayTime() {
            let time = moment().hour(0).minute(0).second(--WhiteTurn.Time).format('mm : ss');
            $('#screen1').html(time);
            WhiteTurn.obj.whiteTime--;
            if (WhiteTurn.Time == 0) {
                mediator.board.checkIfAnybodyWon(2);
                WhiteTurn.stopCount()
            }
        }
        runCount() {
            WhiteTurn.counting = setInterval(WhiteTurn.displayTime, 1000);
        }
        static stopCount() {
            clearInterval(WhiteTurn.counting);
        }

    }
    class BlackTurn {
        static counting;
        static Time = 5 * 60;
        static counter;
        static obj;
        constructor(obj) {
            BlackTurn.obj = obj;
            BlackTurn.Time = obj.blackTime;
            BlackTurn.counter = BlackTurn.Time
        }
        stop() {
            BlackTurn.stopCount();
            BlackTurn.obj.blackTime = BlackTurn.Time;
            BlackTurn.obj.change(new WhiteTurn(BlackTurn.obj))
        }
        runCount() {
            BlackTurn.counting = setInterval(BlackTurn.displayTime, 1000);
        }
        end() {
            BlackTurn.stopCount();
        }
        static displayTime() {
            let time = moment().hour(0).minute(0).second(--BlackTurn.Time).format('mm : ss');
            $('#screen2').html(time);
            BlackTurn.obj.blackTime--;
            if (BlackTurn.Time == 0) {
                mediator.board.checkIfAnybodyWon(1);
                BlackTurn.stopCount()
            }
        }

        static stopCount() {
            clearInterval(BlackTurn.counting);
        }

    }
    //mediator between timer and swap turn   


    let mediator = new Mediator();
    //initialize the 8x8 board
    let board = new Board(gameBoard, mediator);
    mediator.setBoard(board);

    let saver = new Memento(mediator);
    let timer = new Timer(mediator);
    timer.start();
    mediator.setTimer(timer);
    //initialize the board
    board.initialize();

    /***
    Events
    ***/
    //select the piece on click if it is the player's turn
    let clickHandler = function (data) { $('.piece').on("click", data); }

    let click = function () {
        if ($('#numbers')) {
            $('#numbers').remove();
            $('#checkers').remove();
        }
        let selected;
        let isPlayersTurn = ($(this).parent().attr("class").split(' ')[0] == "player" + board.playerTurn + "pieces");
        if (isPlayersTurn) {
            if (!board.continuousjump && pieces[$(this).attr("id")].allowedtomove) {
                if ($(this).hasClass('selected')) selected = true;
                $('.piece').each(function (index) {
                    $('.piece').eq(index).removeClass('selected')
                });
                if (!selected) {
                    $(this).addClass('selected');
                }
            } else {
                let exist = "jump exist for other pieces, that piece is not allowed to move"
                let continuous = "continuous jump exist, you have to jump the same piece"
                let message = !board.continuousjump ? exist : continuous
                console.log(message)
            }
        }
        return;
    }
    let observer = new EventObserver();
    observer.subscribe(clickHandler)
    observer.broadcast(click)
    mediator.setObserver(observer)
    //reset game when clear button is pressed
    $('#cleargame').on("click", function () {
        board.clear();
    });

    //move piece when tile is clicked
    $('.tile').on("click", function () {
        //make sure a piece is selected
        if ($('.selected').length != 0) {
            //find the tile object being clicked
            let tileID = $(this).attr("id").replace(/tile/, '');
            let tile = tiles[tileID];
            //find the piece being selected
            let piece = pieces[$('.selected').attr("id")];
            //check if the tile is in range from the object
            let inRange = tile.inRange(piece);
            if (inRange != 'wrong') {
                //if the move needed is jump, then move it but also check if another move can be made (double and triple jumps)
                if (inRange == 'jump') {
                    if (piece.opponentJump(tile)) {
                        piece.move(tile);
                        if (piece.canJumpAny()) {
                            // Board.changePlayerTurn(); //change back to original since another turn can be made
                            piece.element.addClass('selected');
                            // exist continuous jump, you are not allowed to de-select this piece or select other pieces
                            board.continuousjump = true;
                        } else {
                            board.changePlayerTurn()
                            board.checkIfAnybodyWon();
                        }
                    }
                    //if it's regular then move it if no jumping is available
                } else if (inRange == 'regular' && !board.jumpexist) {
                    if (!piece.canJumpAny()) {
                        piece.move(tile);
                        board.changePlayerTurn()
                    } else {
                        alert("You must jump when possible!");
                    }
                }
            }
        }
    });
    $('#numbers').on('click', function () {
        Piece.prototype.strategy = new NumbersStrategy();
        $('#numbers').remove();
        $('#checkers').remove();
    })
    $('#checkers').on('click', function () {
        Piece.prototype.strategy = new CheckersSterategy();
        $('#numbers').remove();
        $('#checkers').remove();
    })
    $('#load').on('click', function () {
        saver.load();
    })
    document.getElementById('load').addEventListener('click', function(){

    })
    $('#save').on('click', function () {
        saver.save();
    })


}