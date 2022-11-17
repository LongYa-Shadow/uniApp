//服务器相关信息
let serverInfo = {}
// 本地存储token的key
serverInfo.serverTokenKey = 'teach_project_service_token'
// 后端服务基础地址
serverInfo.serverUrl = 'https://huhuiyu.top/teach_project_service'
// websocket服务基础地址
serverInfo.websocketUrl = 'wss://huhuiyu.top/teach_project_service/ws/'
// 本地token信息
serverInfo.saveToken = (resp) => {
	if (resp.data && resp.data.token) {
		uni.setStorage({
			key: serverInfo.serverTokenKey,
			data: resp.data.token
		})
	}
}
serverInfo.loadToken = () => {
	let token = uni.getStorage({
		key: serverInfo.serverTokenKey
	})
	return token ? token : ''
}

export default serverInfo