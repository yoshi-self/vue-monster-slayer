new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
    },
    computed: {
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage,
            });
            if(this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage,
            });
            if(this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        heal() {
            this.playerHealth += 10;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals  for 10',
            });
            if(this.playerHealth > 100) {
                this.playerHealth = 100;
            }
            this.monsterAttacks();
        },
        giveUp() {
            this.gameIsRunning = false;
        },
        monsterAttacks() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Player hits Monster for ' + damage,
            });
            this.checkWin();
        },
        calculateDamage(min, max) {
            var damage = Math.floor(Math.random() * max) + 1;
            return Math.max(damage, min);
        },
        checkWin() {
            if(this.monsterHealth <= 0) {
                if(confirm('You won! New game?')) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if(this.playerHealth <= 0) {
                if(confirm('You lost! New game?')) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
    },
});
