<template>
  <div>
    <div>{{turn}}님의 턴입니다.</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{winner}}님의 승리!</div>
    <div v-else="winner">{{winner}}님의 승리!</div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import TableComponent from './TableComponent';
  import EventBus from "./EventBus";
  export default {
    components:{
      TableComponent,
    },
    data() {
      return {
        tableData: [
          ['','',''],
          ['','',''],
          ['','',''],
        ],
        turn: "O",
        winner:'',
      }
    },
    methods: {
      //뷰에서 객체나 배열이 있고 내부값을 인덱스로 변경하면 화면에 반영이 안됨.
      //객체로 key값을 바꾸는경우도 마찬가지
      // //push등으로 사용하면 적용이 된다
      // onChangeData(){
      //   [0][1] = 'O';
      //   .push("O");
      // }
      onChange(){
        //[1][0] = 'X'; 작동안됨
        //Vue.set([1],0,'X'); 가능
        this.$set([1], 0, 'X'); //Vue.set과 동일
      },
      onClickTd(rowIndex, cellIndex){
        const rootData = this.$root.$data;
        this.$set(rootData.tableData[rowIndex], cellIndex,rootData.turn);
        let win = false;
        //가로 3줄
        if(rootData.tableData[rowIndex][0] === rootData.turn && rootData.tableData[rowIndex][1] === rootData.turn && rootData.tableData[rowIndex][2] && rootData.turn){
          win = true;
        }
        //세로 3줄
        if(rootData.tableData[0][cellIndex] === rootData.turn && rootData.tableData[1][cellIndex] === rootData.turn && rootData.tableData[2][cellIndex] && rootData.turn){
          win = true;
        }
        //대각선 3줄
        if(rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] && rootData.turn){
          win = true;
        }
        if(rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] && rootData.turn){
          win = true;
        }
        if(win){ //이긴경우 3줄
          rootData.winner = rootData.turn;
          rootData.turn = 'O';
          rootData.tableData = [['','',''],['','',''],['','','']];
        }else{
          let all = true;
          rootData.tableData.forEach((row)=>{
            row.forEach((cell)=>{
              if(!cell){
                all = false;
              }
            })
          });
          if(all){ //무승부
            rootData.turn = 'O';
            rootData.winner = '';
            rootData.tableData = [['','',''],['','',''],['','','']];
          }else{ //경기중
            rootData.turn = rootData.turn === 'O'?'X' : 'O';
          }
        }
      }
    },
    created() {
      EventBus.$on('clickTd', this.onClickTd);
    }
  };
</script>

<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>