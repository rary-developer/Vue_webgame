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
      //   this.tableData[0][1] = 'O';
      //   this.tableData.push("O");
      // }
      onChange(){
        //this.tableData[1][0] = 'X'; 작동안됨
        //Vue.set(this.tableData[1],0,'X'); 가능
        this.$set(this.tableData[1], 0, 'X'); //Vue.set과 동일
      }
    },
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