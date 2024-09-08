//Represents a single playing card with a value and a suit.

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    describe() {
        const names = [null, null, "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
        return `${names[this.value]} of ${this.suit}`;
    }
}

//Represents a deck of 52 playing cards.

class Deck {
    constructor() {
        this.cards = [];
        let cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
        for (let suit of cardSuits) {
            for (let value = 2; value <= 14; value++) {
                this.cards.push(new Card(value, suit));
            }
        }
    }
//Randomizes the order of the cards in the deck

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    //Splits the deck into two halves

    deal() {
        return [this.cards.slice(0, 26), this.cards.slice(26, 52)];
    }
}

//Represents a player in the game.

class Player {
    constructor(name) {
        this.name = name; //player's name
        this.hand = []; //array of cards
        this.score = 0; //player's score
    }

//Removes and returns the first card from the player's hand

    playCard() {
        return this.hand.shift();
    }

    addPoint() {
        this.score++; //increases player's score by one point
    }
}

//Game logic

//Player ID and new deck iniated
class Game {
    constructor(player1Name, player2Name) {
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
        this.deck = new Deck();
    }

    //Shuffles deck and deals; assigns cards to players
    dealCards() {
        this.deck.shuffle();
        let [hand1, hand2] = this.deck.deal();
        this.player1.hand = hand1;
        this.player2.hand = hand2;
    }

//Playing of cards

    playRound() {
        let card1 = this.player1.playCard();
        let card2 = this.player2.playCard();
        console.log(`${this.player1.name} plays ${card1.describe()}`);
        console.log(`${this.player2.name} plays ${card2.describe()}`);
        
        if (card1.value > card2.value) {
            this.player1.addPoint();
            console.log(`${this.player1.name} wins this round!`);
        } else if (card2.value > card1.value) {
            this.player2.addPoint();
            console.log(`${this.player2.name} wins this round!`);
        } else {
            console.log("It's a tie!");
        }
    }

    //Game flow using loops (26 rounds)

    playGame() {
        this.dealCards();
        for (let i = 0; i < 26; i++) {
            console.log(`\nRound ${i + 1}:`);
            this.playRound();
        }
        this.declareWinner();
    }
//Once 26 rounds are completed, points are calculated to determine winner
    declareWinner() {
        console.log(`\nFinal Score: ${this.player1.name} = ${this.player1.score}, ${this.player2.name} = ${this.player2.score}`);
        if (this.player1.score > this.player2.score) {
            console.log(`${this.player1.name} wins the game!`);
        } else if (this.player2.score > this.player1.score) {
            console.log(`${this.player2.name} wins the game!`);
        } else {
            console.log("The game is a tie!");
        }
    }
}

//Runs game
let game = new Game("Player 1", "Player 2");
game.playGame();
