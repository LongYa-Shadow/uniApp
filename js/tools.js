import qs from "qs";
import md5 from "spark-md5";

let tools = {}

tools.test = () => {
	console.log(md5.hash("user-pwd"));
	console.log(qs.stringify({
		"info": "黑暗骑士"
	}));
}

//md5加密
tools.md5 = (info) => {
	return info ? md5(info) : ''
}

//Ajax封装
tools.ajax = (url, parmas, cb, methods) => {
	uni.getStorage({

	})
	uni.request({})
}
export default tools
