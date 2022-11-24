<template>
	<view>
		{{isLogin}}
		{{tbUser}}
		{{tbUserInfo}}
		{{userOtherInfo}}
	</view>
</template>

<script>
	import tools from '../js/tools.js'
	export default {
		data() {
			return {
				isLogin: false,
				tbUser: {},
				tbUserInfo: {},
				userOtherInfo: {}
			}
		},
		methods: {
			getUserInfo() {
				tools.ajax('/user/auth/getUserInfo', {}, (data) => {
					this.isLogin = data.success
					this.tbUser = data.tbUser
					this.tbUserInfo = data.tbUserInfo
					this.userOtherInfo = data.userOtherInfo
				}, true)
			}
		},
		onLoad() {
			this.getUserInfo()
		}
	}
</script>

<style>

</style>
