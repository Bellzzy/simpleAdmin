<template>
	<div>
		<el-row class='main-title'>
			文章列表
			<el-input
			  placeholder="请输入文章标题"
			  icon="search"
			  v-model="searchTitle" 
			  size='small' 
			  :on-icon-click="searchData">
			</el-input>
		</el-row>
		<el-table :data="articleList" border stripe tooltip-effect="dark" style="width: 100%">
		    <el-table-column type="index" width='80'></el-table-column>
		    <el-table-column label='内容标题' prop="title"></el-table-column>
		    <el-table-column label="类别名称" prop='categoryName' width='100'>
		    </el-table-column>
		    <el-table-column label="操作" width="120">
		    	<template scope='scope'>
			    	<el-button type='primary' size='mini' @click='mod(scope.row)'>编辑</el-button>
			    	<el-button type='danger' size='mini' @click='delArticle(scope.row)'>删除</el-button>
		    	</template>
		    </el-table-column>
	  	</el-table>
	  	<div class='main-pagation'>
	  		<el-pagination
		      @size-change="pageSizeChange"
		      @current-change="pageChange"
		      :current-page="nowPage"
		      :page-sizes="[10, 20, 50, 100]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="totalSize">
		    </el-pagination>
	  	</div>
	</div>
</template>
<script>
import ajax from '../js/ajax.js'
export default {
	data(){
		return {
			articleList:[],
			nowPage:1,
			// 总页数
			totalSize:0,
			// 每页显示条数
			pageSize:10,
			// 当前页码
			page:1,
			// 搜索标题
			searchTitle:''
		}
	},
	methods:{
		mod(obj){
			this.$router.push({path:'/main/article/'+obj.id})
			// this.articleList[row.$index].isEdit = !this.articleList[row.$index].isEdit;
		},
		delArticle(obj){
			var self = this;
			ajax.post('/server/article.php',{id:obj.articleId,opt:'del'},function(d){
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
		},
		pageSizeChange(p){
			this.pageSize = p;
		},
		pageChange(p){
			this.page = p;
			this._getList()
		},
		searchData(){
			if(this.searchTitle){
				this._getList({search:this.searchTitle})
			}else{
				this._getList();
			}
		},
		_getList(data){
			data = data||{page:this.page,pageSize:this.pageSize};
			var self = this;
			data.opt = 'que';
			ajax.post('/server/article.php',data,function(d){
				if(!d.msg.succ){
					self.$message({
						message:d.msg.txt,
						type:'error'
					})
				}else{
					self.articleList = d.data.list
					self.totalSize = d.data.count.count*1
				}
			},function(e){
				self.$message({
					message:e.statusText,
					type:'error'
				})
			})
		}
	},
	mounted(){
		this._getList()
	}
}
</script>