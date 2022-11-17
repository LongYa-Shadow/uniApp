import qs from "qs";
import md5 from "spark-md5";
import logger from "./logger";
import serverInfo from "./server";

let tools = {}

tools.test = () => {
	console.log(md5.hash("user-pwd"));
	console.log(qs.stringify({
		"info": "黑暗骑士"
	}));
}
// 格式化日期
tools.formatDate = (value, format) => {
	try {
		// 获取日期格式参数
		format = format ? format : 'yyyy-MM-dd hh:mm:ss'
		if (!isNaN(value) && !(value instanceof Date)) {
			let time = new Date()
			time.setTime(parseInt(value))
			value = time
		}
		let year = value.getFullYear() + ''
		let month = value.getMonth() + 1
		let day = value.getDate()
		let hour = value.getHours()
		let minute = value.getMinutes()
		let second = value.getSeconds()
		month = month < 10 ? '0' + month : '' + month
		day = day < 10 ? '0' + day : '' + day
		hour = hour < 10 ? '0' + hour : '' + hour
		minute = minute < 10 ? '0' + minute : '' + minute
		second = second < 10 ? '0' + second : '' + second
		format = format.replace('yyyy', year)
		format = format.replace('MM', month)
		format = format.replace('dd', day)
		format = format.replace('hh', hour)
		format = format.replace('mm', minute)
		format = format.replace('ss', second)
		format = format.replace('ms', value.getMilliseconds())
		return format
	} catch (ex) {
		logger.error(ex)
		return ''
	}
}
// 合并json对象
tools.concatJson = (...jsons) => {
	logger.debug('json参数列表：', jsons)
	let result = {}
	jsons.forEach((json) => {
		for (const key in json) {
			if (Object.hasOwnProperty.call(json, key)) {
				result[key] = JSON.parse(JSON.stringify(json[key]))
			}
		}
	})
	return result
}
// 复制文本的方法
tools.copyText = async (str) => {
	// 尝试先用剪贴板api复制文本
	try {
		await navigator.clipboard.writeText(str)
		logger.debug('剪贴板复制文本成功')
		return
	} catch (err) {
		logger.debug('剪贴板复制文本失败: ', err)
	}
	// 不成功则用原始的方式复制
	let input = document.createElement('input')
	input.readOnly = 'readonly'
	input.value = str
	document.body.appendChild(input)
	input.select()
	input.setSelectionRange(0, input.value.length)
	document.execCommand('Copy')
	document.body.removeChild(input)
	logger.debug('原始api复制文本成功')
}

tools.empty = () => {}

//md5加密
tools.md5 = (info) => {
	return info ? md5(info) : ''
}

//Ajax封装
tools.ajax = (url, parmas, cb, handleMessage, method = "post") => {
	cb = cb ? cb : tools.empty()
	console.log(url, parmas, cb, method, handleMessage);
	uni.request({
		url: serverInfo.serverUrl + url,
		data: parmas,
		method: method,
		header: {
			token: serverInfo.loadToken(),
			// 'Content-Type': 'multipart/form-data'
		},
		success(res) {
			console.log('ajax请求结果：', res)
			// 处理code1000需要登录的情况
			if (res.data && res.data.code && res.data.code == 1000) {
				alert(res.data.message)
			}
			// 应答结果为错误且不需要处理的就直接弹出对话框
			if (!res.data.success && !handleMessage) {
				alert(res.data.message)
				return
			}
			console.log('自己处理应答结果')
			serverInfo.saveToken(res.data)
			cb(res.data)
		},
		fail(error) {
			console.log('ajax请求错误：', error)
			if (!handleMessage) {
				alert("访问数据失败" + error)
				return
			}
			console.log('自己处理错误结果')
			cb({
				code: 500,
				success: false,
				message: '访问数据失败！',
				error: error
			})
		}

	})
}
// 获取文件下载地址(未测试)
tools.getDownloadUrl = (fid) => {

	return uni.downloadFile({
		url: serverInfo.serverUrl + '/user/file/download?fid=' + fid
	})
}
export default tools
