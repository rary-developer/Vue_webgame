<template>
  <table-component :table-data="tableData"></table-component>

</template>

<script>
  import TableComponent from './TableComponent';
  export default {
    comments:{
      TableComponent,
    },
    data() {
      return {
        tableData: [
          ['','',''],
          ['','',''],
          ['','',''],
        ]
      }
    },
    computed: {

    },
    methods: {

    },
    mounted() {

    },
    beforeDestroy() {

    },
  };
</script>

<style scoped>

</style>