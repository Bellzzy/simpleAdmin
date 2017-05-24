<template>
	<div>
		<el-row class='main-title'>分类列表</el-row>
		<el-table :data="articleList" border stripe tooltip-effect="dark" style="width: 100%">
		    <el-table-column type="index" width='50'></el-table-column>
		    <el-table-column label="类别名称">
		    	<template scope='scope'>
		    		<el-input v-if='scope.row.isEdit' v-model='scope.row.categoryName' size='small' style='width:200px'></el-input>
		    		<span v-else>{{scope.row.categoryName}}</span>
		    	</template>
		    </el-table-column>
		    <el-table-column label="操作" width="150">
		    	<template scope='scope'>
			    	<el-button type='primary' size='mini' @click='mod(scope.row)'>{{scope.row.isEdit?"保存":"编辑"}}</el-button>
			    	<el-button type='danger' size='mini' @click='del(scope.row)'>删除</el-button>
		    	</template>
		    </el-table-column>
	  	</el-table>
	</div>
</template>
<script>
import ajax from '../js/ajax.js'
export default {
	data(){
		return {
			articleList:[]
		}
	},
	methods:{
		mod(obj){
			var self = this;
			if(obj.isEdit){
				// 提交保存数据
				ajax.post('/server/category.php',
					{id:obj.id,cateName:obj.categoryName,opt:'upd'},function(d){
					self.$message({
						message:d.msg.succ?'修改成功':d.msg.txt,
						type:d.msg.succ?'success':'error'
					})
				},function(e){
	                self.$message({
	                    message:e.statusText,
	                    type:'error'
	                })
				})
			}
			obj.isEdit = !obj.isEdit;
		},
		del(obj){
			var self = this;
			ajax.post('/server/category.php',{id:obj.id,opt:'del'},function(d){
				if(d.msg.succ){
					self.articleList.splice(obj.$index,1)
				}
				self.$message({
					message:d.msg.succ?'删除成功':d.msg.txt,
					type:d.msg.succ?'success':'error'
				})
			},function(e){
                self.$message({
                    message:e.statusText,
                    type:'error'
                })
			})
		}
	},
	mounted(){
        var self = this;
        ajax.post('/server/category.php',{opt:'que'},function(d){
        	console.log(d)
        	var i = d.data.length;
        	while(i--){
        		d.data[i].isEdit = false;
        	}
            self.articleList = d.data
        })
	}
}
</script>