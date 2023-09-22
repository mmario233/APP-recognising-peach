<template>
	<view>
		<view class="background"></view>
		<view class="content">
			<view class="uni-row">
				<view class="icon">
					<image src="../../static/username.png" mode="aspectFill" class="icon"></image>
				</view>
				<view class="inp">
					<input class="inp1" v-model="username" placeholder="请输入用户名"/>
				</view>
			</view>
			<view class="uni-row">
				<view class="icon">
					<image src="../../static/password.png" mode="aspectFill" class="icon"></image>
				</view>
				<view class="inp">
					<input class="inp1" :password="showPassword" v-model="password" placeholder="请输入密码"/> 
					<cover-image :src="[!showPassword ? '../../static/eye2.png' : '../../static/eye1.png']" class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']" @click="changePassword"></cover-image>
				</view>
			</view>
			<view class="b1">
				<button class="button1" @click="login">登录</button>
			</view>
			<view class="zhuce" @click="tozhuce">
				<image src="../../static/enroll.png"  class="zhuce" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:"",
				password:"",
				showPassword:true
			}
		},
		onLoad() {

		},
		methods: {
			login(){
				console.log("login")
				uni.request({
					url:"",//填入后端接口
					data:{
						user_username:this.username,
						user_password:this.password
					},
					method:"POST",//向后端发送数据
					success:(res)=>{//后端返回结果
						console.log(res)
						//待填入
						//判断用户名和密码是否在数据库中
						
						uni.showToast({
							icon:"success",
							title:"登录成功"
						});
						uni.redirectTo({
							url:"/pages/main/main"
						});
					},
					fail: () => {
						uni.showToast({
							icon:"error",
							title:"登录失败请重试"
						});
					}
				})
			},
			tozhuce(){
				console.log("zhuce")
				uni.navigateTo({
					url:"/pages/zhuce/zhuce"
				})
			},
			changePassword(){
				this.showPassword = !this.showPassword
				console.log(this.showPassword)
			}
		}
	}
</script>

<style>
	.content{
		padding-top: 40%;
	}
	.background{
		background: url(https://s3.bmp.ovh/imgs/2022/08/03/4651a4c00e4865bd.jpg) center/cover no-repeat;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.uni-row{
		display: flex;
		padding-left: 5%;
		padding-right: 5%;
		padding-bottom: 5%;
	}
	.icon{
		width: 72rpx;
		height: 72rpx;
	}
	.inp{
		width: 600rpx;
		height: 72rpx;
		display: flex;
		border-bottom: 2rpx solid gray;
	}
	.inp1{
		width: 600rpx;
		height: 72rpx;
	}
	.b1{
		padding-top: 10%;
	}
	.button1{
		position: center;
		width: 375rpx;
		height: 96rpx;
		background: linear-gradient(rgba(249,167,155,255) 0%,rgba(242,73,177,255) 100%);
		box-shadow: 0rpx 24rpx 48rpx rgb(249, 167, 155);
		border-radius: 60rpx;
		padding-bottom: 10%;
		font-size: 48rpx;
		color: ghostwhite;
		line-height: 96rpx;
	}
	.zhuce{
		padding-top: 10%;
		padding-bottom: 20%;
		height: 60rpx;
		width: 200rpx;
		position: absolute;
		padding-left: 150rpx;
	}
	.uni-icon {
		font-family: uniicons;
		font-size: 24px;
		font-weight: normal;
		font-style: normal;
		width: 24px;
		height: 24px;
		line-height: 24px;
		color: #999999;

	}
	.uni-eye-active {
		color: #007AFF;
	}
</style>
