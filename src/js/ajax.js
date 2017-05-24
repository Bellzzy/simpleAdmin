import Vue from 'vue'
export default {
	http(opts,succ,err){
		opts.data = opts.data || {body:{}};
		opts.body.token = sessionStorage.getItem('token');
		opts.body = JSON.stringify(opts.body);
		Vue.http(opts).then(function(d){
			succ&&succ(d.body);
		},err)
	},
	post(url,data,succ,err){
		this.http({
			url:url,
			method:'post',
			headers:{"Content-Type":'application/json;charset=utf-8',},
			body:data
		},succ,err)
	},
	login(url,data,succ,err){
		Vue.http({
			url:url,
			method:'post',
			body:data,
            emulateJSON:true
		}).then(function(d){
			succ&&succ(d.body)
		},err)
	}
}