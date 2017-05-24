<template>
	<div>
		<el-row class='main-title'>新增分类</el-row>
		<el-form label-width="80px">
			<el-row>
				<el-col :span='12'>
					<el-form-item label="分类名称">
						<el-input v-model="cateName" size='small'></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit" size='small'>
							添加分类
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>
<script>
import ajax from '../js/ajax.js'
export default {
	data(){
		return {
			cateName:''
		}
	},
	methods:{
		submit(){
			// 提交数据
			if(!this.cateName){
				this.$message({
					message:'分类名称不能为空',
					type:'error'
				})
				return;
			}
			var self = this;
			ajax.post('/server/category.php',{cateName:this.cateName,opt:'add'},function(d){
				self.$message({
					message:d.msg.succ?"添加成功":d.msg.txt,
					type:d.msg.succ?"success":"error"
				})
			})
		}
	}
}
</script>