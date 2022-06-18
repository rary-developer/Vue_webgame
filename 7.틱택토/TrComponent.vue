<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData" :row-data="rowData" :cell-data="cellData" row-index="rowIndex"></td-component>
  </tr>

</template>

<script>
  import TdComponent from './TdComponent'
  export default {
    comments:{
      TdComponent,
    },
    props:{
      rowData: Array,
      rowIndex: number,
    }
  }
</script>