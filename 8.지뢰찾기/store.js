import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // this.$store

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, //0이상이면 다 opened
}

//[
//  ['-1', '-1' , '-7']
//  ['-1', '-7' , '-1']
//  ['-1', '-1' , '-1']
//]

const plantMine = (row,cell,mine) => {
    const candidate = Array(row * cell).fill().map((arr,i)=>{
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random()* candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for(let i=0; i < row; i++){
        const rowData = [];
        data.push(rowData);
        for(let j=0; j < cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k =0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
}

export default new Vuex.Store({ // import store from './store';
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        halted: true, // 중단된
        result: '',
        openedCount : 0,
    },
    getters: {

    }, // vue의 computed와 비슷
    mutations: {
        [START_GAME](state, {row, cell, mine}){
            state.data = {
                row,
                cell,
                mine,
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false; //false가 되었을때 타이머 실행해주기
            state.openedCount = 0;
            //객체 변경하기
            //state.data['row'] = row;
            //Vue.set(state.data, 'row', row);
        }, //구조분해
        [OPEN_CELL](state, {row, cell}){
            let openedCount = 0;
            const checked = [];

            function checkAound(row, cell){ //주변 8칸 지뢰인지 검색
                const checkRowOrCellUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
                if(checkRowOrCellUndefined){ //주변이 없거나
                    return;
                }
                //주변이 뭔가했으면
                if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])){
                    return;
                }

                if(checked.includes(row + '/' + cell)){
                    return;
                }else{ //열지 않은것만 push
                    checked.push(row + '/' + cell);
                }

                let around = [];
                if(state.tableData[row -1]){ //선택 윗줄이 있으면
                    around = around.concat([
                        state.tableData[row-1][cell-1], state.tableData[row-1][cell], state.tableData[row-1][cell+1]
                    ]);
                }
                around = around.concat([
                    state.tableData[row][cell-1], state.tableData[row][cell+1]
                ]);
                if(state.tableData[row + 1]){ //선택 아랫줄이 있으면
                    around = around.concat([
                        state.tableData[row+1][cell-1], state.tableData[row+1][cell], state.tableData[row+1][cell+1]
                    ]);
                }
                const counted = around.filter(function(v){
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });
                if(counted.length === 0 && row > -1){ //주변칸에 지뢰가 없으면
                    const near = [];
                    if(row -1 > -1){
                        near.push([row-1, cell-1]);
                        near.push([row-1, cell]);
                        near.push([row-1, cell+1]);
                    }
                    near.push([row, cell-1]);
                    near.push([row, cell+1]);
                    if(row +1 < state.tableData.length){
                        near.push([row+1, cell-1]);
                        near.push([row+1, cell]);
                        near.push([row+1, cell+1]);
                    }
                    near.forEach((n)=>{
                        if(state.tableData[n[0]][n[1]] !== CODE.OPENED ){
                            checkAound(n[0], n[1]);
                        }
                    })
                }
                if(state.tableData[row][cell] === CODE.NORMAL){
                    openedCount += 1;
                }
                Vue.set(state.tableData[row], cell , counted.length);
                //return counted.length;
            }
            checkAound(row, cell);
            //const count = checkAound();
            //Vue.set(state.tableData[row], cell , count);
            let halted = false;
            let result;
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다.`;
            }
            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;
        },
        [CLICK_MINE](state, {row, cell}){
            state.halted = true; //중단
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, {row, cell}){
            if (state.tableData[row][cell] === CODE.MINE){
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            }else {
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, {row, cell}){
            if (state.tableData[row][cell] === CODE.FLAG_MINE){
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            }else {
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, {row, cell}){
            if (state.tableData[row][cell] === CODE.QUESTION_MINE){
                Vue.set(state.tableData[row], cell, CODE.MINE);
            }else {
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER](state){
            state.timer += 1;
        },
    }, // state를 수정할 때 사용해요. 동기적으로
});
