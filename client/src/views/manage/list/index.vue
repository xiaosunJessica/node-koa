<template>
	<el-table
		:data="tableData">
		<el-table-column prop="date" label="日期"></el-table-column>
		<el-table-column prop="user" label="创建人"></el-table-column>
		<el-table-column prop="name" label="项目名称"></el-table-column>
	</el-table>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					user: '小阔爱',
					name: '项目1',
				}]
			}
		}
	}
</script>