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
					<input class="inp1" :password="showPassword" v-model="password" placeholder="请输入密码" /> 
					<cover-image :src="[!showPassword ? '../../static/eye2.png' : '../../static/eye1.png']" class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']" @click="changePassword"></cover-image>
				</view>
			</view>
			<view class="uni-row">
				<view class="icon">
					<image src="../../static/name.png" mode="aspectFill" class="icon"></image>
				</view>
				<view class="inp">
					<input class="inp1" v-model="name" type="text" placeholder="请输入姓名"/>
				</view>
			</view>
			<view class="uni-row">
				<view class="icon">
					<image src="../../static/Phone.png" mode="aspectFill" class="icon"></image>
				</view>
				<view class="inp">
					<input @blur="checkPhone" class="inp1" v-model="phone" type="number" placeholder="请输入手机号码" maxlength="11"/>
				</view>
			</view>
			<view class="uni-row">
				<view class="icon">
					<image src="../../static/Mail.png" mode="aspectFill" class="icon"></image>
				</view>
				<view class="inp">
					<input @blur="checkEmail" class="inp1" v-model="email" placeholder="请输入电子邮箱"/>
				</view>
			</view>
			<view class="uni-row">
				<view class="icon">
					<image src="../../static/Package.png" mode="aspectFill" class="icon"></image>
				</view>
				<view class="inp">
					<input class="inp1" v-model="address" placeholder="请输入收货地址"/>
				</view>
			</view>
			<view class="b1">
				<button class="button1" @click="enroll">注册</button>
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
				name:"",
				phone:NaN,
				email:"",
				address:"",
				showPassword:true
			}
		},
		methods:{
			enroll(){
				console.log("enroll")
				if(!(this.username&&this.password&&this.name&&this.phone&&this.email&&this.address)){
					uni.showToast({
						icon:"error",
						title:"请填完表单"
					});
					return;
				}
				uni.request({
					url:"",//填入后端接口
					data:{
						user_username:this.username,
						user_password:this.password,
						user_name:this.name,
						user_phone:this.phone,
						user_email:this.email,
						user_address:this.address
						
					},
					method:"POST",//向后端发送数据
					success:(res)=>{//后端返回结果
						console.log(res)
						//待填入
						//判断是否已经在数据库中
						
						uni.showToast({
							icon:"success",
							title:"注册成功"
						});
						uni.redirectTo({
							url:"/pages/index/index"
						});
					},
					fail: () => {
						uni.showToast({
							icon:"error",
							title:"注册失败请重试"
						});
					}
				})
			},
			changePassword(){
				this.showPassword = !this.showPassword
				console.log(this.showPassword)
			},
			checkPhone(e){
				console.log(e)
				const phone = e.detail.value;
				if(phone){
					const rule = RegExp(/^[1][0-9]{10}$/).test(phone)
					if(rule){
						return true
					}
					else{
						uni.showModal({
							title:"请输入正确的手机号码",
							showCancel:false,
							success: (res) => {
								if(res.confirm){
									this.phone = NaN;
								}
							}
						})
					}
				}
			},
			checkEmail(e){
				console.log(e)
				const email = e.detail.value;
				if(email){
					const rule = RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(email)
					if(rule){
						return true
					}
					else{
						uni.showModal({
							title:"请输入正确的邮箱",
							showCancel:false,
							success: (res) => {
								if(res.confirm){
									this.email = "";
								}
							}
						})
					}
				}
			}
		}
	}
</script>

<style>
	.content{
		padding-top: 15%;
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