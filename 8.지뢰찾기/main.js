import Vue from 'vue';
import TicTacToe from './MineSweeper';

new Vue({
    render: createElement => createElement(TicTacToe)
}).$mount('#root');
