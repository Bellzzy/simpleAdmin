<template>
	<div>
		<el-row class='main-title'>
			{{art.articleId?'文章编辑':'新增文章'}}
		</el-row>
		<el-form label-width="80px">
			<el-row>
				<el-col :span='20'>
					<el-form-item label="文章标题">
						<el-input v-model="art.title" size='small'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='8'>
					<el-form-item label="文章分类">
						<el-select v-model="art.categoryId" size='small'>
						    <el-option v-for="(item,index) in cateList" :key="index" :label="item.categoryName" :value="item.id">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='8'>
					<el-form-item label="文章来源">
						<el-input v-model="art.source" size='small'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='8'>
					<el-form-item label="文章作者">
						<el-input v-model="art.author" size='small'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='8'>
					<el-form-item label="文章编辑">
						<el-input v-model="art.editor" size='small'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style='margin-bottom:5px'>
				<el-col :span='20'>
					<el-form-item label="文章摘要">
						<el-input type='textarea' v-model="art.description"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='24'>
					<el-form-item label="文章正文">
						<vue-html5-editor :content="art.context" :height="400" @change="updateContent">
						</vue-html5-editor>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style='margin-top:5px'>
				<el-col :span='12'>
					<el-form-item label="文章封面" class='main-cover'>
						<input type='hidden' v-model='art.images'  disabled='true'/>
						<div v-if='art.images' class='cover'>
							<img v-bind:src='art.images' :title='art.images'/>
						</div>
						<form enctype="multipart/form-data" method="post">
							选择图片
						    <input type="file" id="uploadFile" runat="server" @change='selectFile'/>
						</form>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='12'>
					<el-form-item label="视频链接">
						<el-input v-model="art.videos" size='small'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='8'>
					<el-form-item label="文章权重">
						<el-input v-model="art.weights" size='small'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item>
				<el-button type="primary" size='small' @click="submit">
					{{art.articleId?"保存修改":"添加文章"}}
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import ajax from '../js/ajax.js'
export default {
	data(){
		return {
			art:{},
			cateList:[],
			articleId:''
		}
	},
	methods:{
		submit(){
			if(!this.art.title){
				this.$message({
					message:'请输入文章标题',
					type:'error'
				})
				return
			}
			if(!this.art.cateId){
				this.$message({
					message:'请选择文章类别',
					type:'error'
				})
				return
			}
			if(!this.art.summary){
				this.$message({
					message:'请输入文章摘要',
					type:'error'
				})
			}
			if(!this.art.content){
				this.$message({
					message:'请输入文章正文',
					type:'error'
				})
			}
			if(!this.art.cover){
				this.$message({
					message:'请上传文章封面',
					type:'error'
				})
				return
			}
			var self = this;
			this.article.opt = 'add';
			if(this.articleId){
				this.article.opt = 'upd';
			}
			ajax.post('/server/article.php',this.article,function(d){
				self.$message({
					message:d.msg.succ?"操作成功":d.msg.txt,
					type:d.msg.succ?"success":"error"
				})
			})
		},
		updateContent(d){
			this.article.articleContent = d
		},
		selectFile(event){
			var self = this;
			//判断是否有选择上传文件
	        var imgPath = event.target.value;
	        if (imgPath == "") {
	        	self.$message({
	        		message:'请选择上传图片！',
	        		type:'error'
	        	})
	            return;
	        }
	        //判断上传文件的后缀名
	        var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
	        if (strExtension != 'jpg' && strExtension != 'gif'
	            && strExtension != 'png' && strExtension != 'jpeg') {
	        	self.$message({
	        		message:'上传的文件必须是图片类型',
	        		type:'error'
	        	})
	            return;
	        };
	        var formdata = new FormData();
	        var fileObj = event.target.files;
	        formdata.append("file", fileObj[0]);
	        ajax.post('/server/uploadCover.php',formdata,function(d){
	        	if(d.info.code){
		        	self.$message({
		        		message:d.info.msg,
		        		type:'error'
		        	})
	        	}else{
	        		self.article.articleCover = d.data&&d.data[0];
	        	}
	        },function(e){
	        	self.$message({
	        		message:e.statusText,
	        		type:'error'
	        	})
	        })
		},
		_getArticleDetail(){
			var self = this;
			if(self.articleId){
	        	ajax.post('/server/article.php',{id:self.articleId,opt:'que'},function(d){
	        		self.art = d.data.list[0]
	        	})
			}else{
				self.article = {
					addtime:"",
					author:"",
					categoryId:'',
					content:"文章正文",
					cover:"12314214",
					editor:null,
					source:"",
					id:"",
					description:"测试文章摘要",
					title:"测试文章",
					viodes:null,
					weight:"1"
				}
			}
		}
	},
	watch:{
		$route(n,o){
			this.articleId = n.params.id*1;
			this._getArticleDetail();
		}
	},
	mounted(){
        var self = this,
        	params = this.$route.params||{};
        ajax.post('/server/category.php',{opt:'que'},function(d){
            self.cateList = d.data
        })
        self.articleId = params.id*1
        self._getArticleDetail();
	}
}
</script>