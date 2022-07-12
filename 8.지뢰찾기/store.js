import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // this.$store

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MIME = 'CLICK_MIME';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export default new Vuex.Store({ // import store from './store';
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        result: '',
    },
    getters: {

    }, // vue의 computed와 비슷
    mutations: {
        [START_GAME](state, {row, cell, mime}){}, //구조분해
        [OPEN_CELL](state){},
        [CLICK_MIME](state){},
        [FLAG_CELL](state){},
        [QUESTION_CELL](state){},
        [NORMALIZE_CELL](state){},
        [INCREMENT_TIMER](state){},
    }, // state를 수정할 때 사용해요. 동기적으로
});
