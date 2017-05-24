<template>
    <div id="app">
        <div class='navs'>
        	<div class='logo'><i></i></div>
			<el-menu default-active="2" theme="dark" router class="el-menu-vertical-demo">
				<el-menu-item index="/main"><i class="fa fa-home"></i>首页</el-menu-item>
				<el-submenu index="2">
					<template slot="title"><i class="fa fa-list-alt"></i>文章</template>
					<el-menu-item index="/main/article/0"><i class="fa fa-plus"></i>添加文章</el-menu-item>
					<el-menu-item index="/main/articlelist"><i class="fa fa-list-ol"></i>文章列表</el-menu-item>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title"><i class="fa fa-certificate"></i>分类</template>
					<el-menu-item index="/main/category/0"><i class="fa fa-plus"></i>添加分类</el-menu-item>
					<el-menu-item index="/main/categorylist"><i class="fa fa-list-ol"></i>分类列表</el-menu-item>
				</el-submenu>
				<el-menu-item index="/main/modpass"><i class="fa fa-edit"></i>修改密码</el-menu-item>
				<el-menu-item index=''><div @click='logout'><i class="fa fa-sign-out"></i>退出登录</div></el-menu-item>
			</el-menu>
        </div>
        <div class='main'>
        	<router-view></router-view>
        </div>
    </div>
</template>
<script>
import ajax from '../js/ajax.js'
export default {
    methods:{
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
    },
    mounted(){
    }
}
</script>
<style lang='stylus'>
@import '../assets/stylus/main.styl'
</style>