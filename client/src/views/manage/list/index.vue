<template>
  <el-table
    :data="tableData">
    <el-table-column prop="date" label="日期" :formatter="dateFormat"></el-table-column>
    <el-table-column prop="user" label="创建人"></el-table-column>
    <el-table-column prop="name" label="项目名称"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      this.$http.get('/project/list', {
        size: 10,
        current: 1
      }).then(res => {
        this.tableData = res.data;
      })
    },
    methods: {
      dateFormat: function(row, column){
        let date = Number(row[column.property]);
        if (!date) return "";
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  }
</script>