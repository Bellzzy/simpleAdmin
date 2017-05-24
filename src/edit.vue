<template>
	<div id='app' style='margin:20px'>
		<vue-html5-editor :content="content" :height="500" @change="updateData"></vue-html5-editor>
		<el-button type='primary' @click='submit()'>提交</el-button>
	</div>
</template>
<script>
export default {
	data(){
		return {
			content:''
		}
	},
	methods:{
		submit(){
			console.log(this.content)
		},
		updateData(d){
			this.content = d
			// console.log(d)
			// console.log(this.content)
		}
	}
}
</script>