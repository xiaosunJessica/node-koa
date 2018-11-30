<template>
  <el-table
    :data="tableData">
    <el-table-column prop="date" label="日期" :formatter="dateFormat"></el-table-column>
    <el-table-column prop="user" label="创建人"></el-table-column>
    <el-table-column prop="name" label="项目名称"></el-table-column>
    <el-table-column label="操作">
			<template slot-scope="scope">
				<el-button @click="onEditItem(scope.row)" type="text">编辑</el-button>
				<el-button @click="onDeleteItem(scope.row)" type="text">删除</el-button>
			</template>
		</el-table-column>
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
				params: {
					size: 10,
					current: 1
				}
			}).then(res => {
        this.tableData = res.data;
      })
    },
    methods: {
      dateFormat: function(row, column){
        let date = Number(row[column.property]);
        if (!date) return "";
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
			},
			onEditItem: function(row) {
				this.$router.push(`/manage/edit/${row._id}`);
			},
			onDeleteItem: function(row) {
				this.$http.delete('/project/delete', {
					params: {
						id: row._id
					}
				})
			}
    }
  }
</script>