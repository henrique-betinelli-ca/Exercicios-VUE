<template>
    <v-app>
        <v-main class="d-flex flex-column align-center justify-center"> 
            <v-card class="w-75 pa-15 elevation-3">
                <GameScreem
                    :board="board"
                    :currentPlayer="currentPlayer"
                    @played="handlePlay"
                />
                <GameOverDialog
                    v-model="isGameOver"
                    :winner="winner"
                    @restart-requested="resetGame"
                />
            </v-card>
        </v-main>
    </v-app>
</template>

<script>
    import GameScreem from "../../components/ExercicioDez/GameScreem.vue";
    import GameOverDialog from "../../components/ExercicioDez/GameOverDialog.vue";
    import * as service from "../../services/ExercicioDez/Service";

    export default {
        name: "GameView",
        components: {
            GameScreem,
            GameOverDialog
        },
        data() {
            return {
                board: service.createBoard(),
                currentPlayer: "X",
                winner: null,
                isGameOver: false
            }
        },
        methods: {
            handlePlay(index) {
                if(this.board[index] || this.winner) return;
                this.board[index] = this.currentPlayer;
                const result = service.checkWinner(this.board);
                if(result) {
                    this.winner = result;
                    this.isGameOver = true;
                } else {
                    this.currentPlayer = service.getNextPlayer(this.currentPlayer);
                }
            },
            resetGame() {
                this.board = service.createBoard();
                this.currentPlayer = "X";
                this.winner = null;
                this.isGameOver = false;
            }
        }
    }
</script>