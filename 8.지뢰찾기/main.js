import Vue from 'vue';
import TicTacToe from './MimeSweeper';

new Vue({
    render: createElement => createElement(TicTacToe)
}).$mount('#root');
