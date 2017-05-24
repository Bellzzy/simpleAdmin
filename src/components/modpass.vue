<template>
	<div>
		<el-row class='main-title'>修改密码</el-row>
		<el-form label-width="100px">
			<el-row>
				<el-col :span='12'>
					<el-form-item label="请输入新密码">
						<el-input type='password' v-model="pwd" size='small'></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit" size='small'>
							提交
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>
<script>
import sha256 from '../js/sha256.js'
import ajax from '../js/ajax.js'
export default {
	data(){
		return {
			pwd:''
		}
	},
	methods:{
		submit(){
			if(!this.pwd){
				this.$message({
					message:'新密码不能为空',
					type:'error'
				})
				return;
			}
			if(this.pwd.length<6){
				this.$message({
					message:'新密码不能少于6位',
					type:'error'
				})
				return;
			}
			var id = sessionStorage.getItem('id');
			if(!id){
				this.logout();
			}
			var data = {id:id,pwd:sha256.sha256(this.pwd)},
				self = this;
			// 提交数据
			ajax.post('/server/adm.upd.php',data,function(d){
				self.$message({
					message:d.msg.succ?'修改成功':d.msg.txt,
					type:d.msg.succ?'success':'error'
				})
				if(d.msg.succ){
					setTimeout(function(){
						self.logout();
					},3000)
				}
			},function(e){
                self.$message({
                    message:e.statusText,
                    type:'error'
                })
			})
		},
		logout(){
    		var self = this;
    		ajax.post('/server/signout.php',{},function(d){
    			sessionStorage.clear();
    			self.$router.push({path:'/login'})
    		},function(e){
    			sessionStorage.clear();
    			self.$router.push({path:'/login'})
    		})
		}
	}
}
</script>