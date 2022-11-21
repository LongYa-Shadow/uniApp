<template>
	<view class="tc">
		<text class="title">{{title}}</text>
		<form>
			<view class="input-box">
				<input type="text" v-model="user.username" placeholder="用户名">
			</view>
			<view class="input-box">
				<input type="password" v-model="user.password" placeholder="密码">
			</view>
			<view class="btns">
				<button @click="login">登录</button>
				<button formType="reset">重置</button>
			</view>
		</form>
	</view>

</template>

<script>
	import tools from '../js/tools'
	export default {
		data() {
			return {
				title: '用户登录',
				user: {
					username: "",
					password: ''
				},

			}
		},
		methods: {
			login() {
				this.user.password = tools.md5(this.user.password)
				tools.ajax('/user/auth/login', this.user, data => {
					uni.showToast({
						title: data.message,
						duration: 300,
						complete() {
							if (data.success) {
								uni.navigateTo({
									url: '/pages/index/index'
								})
							}

						}
					})
				}, true)
			}
		},
		onLoad() {}
	}
</script>

<style>
	.tc {

		text-align: center;
	}

	.title {
		padding: 1rem;
		font-size: 2rem;
	}

	.input-box {
		margin: 1rem;
		border: 1px solid #f00;
		height: 30px;
	}

	.input-box input {
		width: 100%;
	}

	.btns {
		margin: 1rem;
		padding: 0.2rem;
		display: flex;
		justify-content: center;
	}

	.btns button {
		display: inline-block;
		margin: 0.5rem;
	}
</style>
