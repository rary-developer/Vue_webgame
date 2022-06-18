<template>
  <tr-component v-for="(rowData, index) in tableData" :row-data="rowData" :row-index="index"></tr-component>
</template>

<script>
  import TrComponent from './TrComponent';
  export default {
    Components: {
      TrComponent,
    },
    props:{
      tableData: Array,
    }
  }
</script>