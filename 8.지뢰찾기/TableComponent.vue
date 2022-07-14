<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" :style="cellDataStyle(rowIndex, cellIndex)" @click="onClickTd(rowIndex, cellIndex)">
        {{cellDataText(rowIndex, cellIndex)}}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from 'vuex';
import { CODE, OPEN_CELL } from './store';

export default {
  computed:{
    ...mapState(['tableData', 'halted']),
    //cellData를 기반으로 작업을 하니까 computed에서 작업
    cellDataStyle(state){
      return(row, cell) => {
        switch (this.$store.state.tableData[row][cell]){
          case CODE.NORMAL:
          case CODE.MINE:
            return {
              background : '#444',
            };
          case CODE.CLICKED_MINE:
          case CODE.OPENED:
            return {
              background: 'white',
            };
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return {
              background : 'red',
            };
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return {
              background : 'yellow',
            };
          default:
            return {};
        }
      }
    },
    cellDataText(){
      return(row, cell) =>{
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.MINE:
            return 'X';
          case CODE.NORMAL:
            return '';
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return '!';
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return '?';
          case CODE.CLICKED_MINE:
            return '펑';
          default:
            return '';
        }
      }
    },
  },
  methods: {
    onClickTd(row, cell){
      if(this.halted){
        return;
      }
      this.$store.commit(OPEN_CELL, {row, cell});
    }
  }
};
</script>
