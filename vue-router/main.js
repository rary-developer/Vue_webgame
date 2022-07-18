import Vue from 'vue';
import TicTacToe from './Router';

new Vue({
    render: createElement => createElement(TicTacToe)
}).$mount('#root');
