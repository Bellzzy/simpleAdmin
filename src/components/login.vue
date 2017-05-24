<template>
    <div id="app">
        <div id='login'>
            <form @submit.prevent='submit' class="container">
                <label>用户名</label>
                    <el-input v-model="usn" placeholder="用户名"></el-input>
                <label>密码</label>
                    <el-input type="password" v-model="pwd" placeholder="密码"></el-input>
                <div>
                    <el-button native-type='submit' type="primary" :loading='onAjax'>{{buttonText}}</el-button>
                </div>
                <img src='../assets/images/logo.png' alt='logo' class='logo'/>
            </form>
        </div>
    </div>
</template>
<script>
import sha256 from '../js/sha256.js'
import ajax from '../js/ajax.js'
export default {
    data(){
        return {
            usn:'system',
            pwd:'123456',
            onAjax:false,
            buttonText:'登录'
        }
    },
    methods:{
        submit(){
            if(!this.usn){
                this.$message({
                    message:'请输入登录名',
                    type:'error'
                })
                return false
            }
            if(!this.pwd){
                this.$message({
                    message:'请输入登录密码',
                    type:'error'
                })
                return false
            }
            var self = this,
                data = {
                    usn:self.usn,
                    pwd:sha256.sha256(self.pwd)
                }
            ajax.post('/server/signin.php',data,function(d){
                if(d.msg.succ){
                    sessionStorage.setItem('token',d.data.token)
                    sessionStorage.setItem('id',d.data[0].adminId)
                    self.$router.push({path:'/main'})
                }else{
                    self.$message({
                        message:d.msg.txt,
                        type:'error'
                    })
                }
            },function(e){
                self.$message({
                    message:e.statusText,
                    type:'error'
                })
            })
        }
    }
}
</script>
<style lang='stylus'>
@import '../assets/stylus/login.styl'
</style>