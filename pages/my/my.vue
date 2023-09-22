<template>
	<view>
		<view class="background"></view>
		<view class="proff">
			<view class="prof">
				<image class="prof-img" src="https://s3.bmp.ovh/imgs/2022/08/01/c2602cb6193cc6f9.jpg"></image>
			</view>
		</view>
		<view class="demo1">
			<view>
				<view style="font-size: 48rpx;width: 650rpx;">{{user.address}}</view>
				<view class="wenzi">
					<text decode="true">{{user.username}}&emsp;{{user.phone}}</text>
				</view>
			</view>
			<view @click="changeInfo()">
				<image class="img" src="../../static/add.png" v-if="!showInp"></image>
				<text class="img" v-if="showInp">修改</text>
			</view>
		</view>
		<view v-if="showInp" class="demo">
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
					<image src="../../static/Package.png" mode="aspectFill" class="icon"></image>
				</view>
				<view class="inp">
					<input class="inp1" v-model="address" placeholder="请输入收货地址"/>
				</view>
			</view>
		</view>
		<view class="demo2" @click="Tomylist('订单')">
			<image class="img1" src="../../static/shoppingCart.png"></image>
			<view style="width: 600rpx; font-size:36rpx">我的订单</view>
		</view>
		<view class="demo2" @click="Tomylist('帖子')">
			<image class="img1" src="../../static/comment.png"></image>
			<view style="width: 600rpx; font-size:36rpx">我的讨论</view>
		</view>
		<view class="demo2" @click="Tomylist('收藏')">
			<image class="img1" src="../../static/star.png"></image>
			<view style="width: 600rpx; font-size:36rpx">我的收藏</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:"",
				phone:NaN,
				address:"",
				user:{},
				showInp:false
			}
		},
		onLoad(){
			var user = getApp().globalData;
			this.user = user;
		},
		methods:{
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
			changeInfo(){
				if(this.showInp&&this.address&&this.name&&this.phone){
					this.user.username = this.name;
					this.user.phone = this.phone;
					this.user.address = this.address;
					this.showInp = !this.showInp;
				}
				this.showInp = !this.showInp;
			},
			Tomylist(cls){
				console.log(cls)
				uni.navigateTo({
					url:"/pages/mylist/mylist?id="+cls
				})
			}
		}
	}
</script>

<style>
	.background{
		background: url(https://s3.bmp.ovh/imgs/2022/08/03/4651a4c00e4865bd.jpg) center/cover no-repeat;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.demo2{
		background-color: white;
		border-radius: 12rpx;
		padding: 24rpx;
		margin-bottom: 24rpx;
		display: flex;
		line-height: 60rpx;
		z-index: 1;
	}
	.demo1{
		background-color: white;
		border-radius: 12rpx;
		padding: 24rpx;
		margin-bottom: 24rpx;
		display: flex;
		z-index: 1;
	}
	.demo{
		background-color: white;
		border-radius: 12rpx;
		padding: 24rpx;
		margin-bottom: 24rpx;
	}
	.wenzi{
		display: flex;
		font-size: 24rpx;
		color: gray;
		z-index: 1;
	}
	.img{
		width: 72rpx;
		height: 72rpx;
		z-index: 1;
	}
	.img1{
		width: 60rpx;
		height: 60rpx;
		z-index: 1;
	}
	.proff{
		width: 100%;
		height: 250rpx;
		line-height: 250rpx;
		text-align: center;
		padding-top: 50rpx;
	}
	.prof{
		margin-left: 285rpx;
		width: 175rpx;
		height: 175rpx;
		background-color: white;
		border-radius: 50%;
		text-align: center;
	}
	.prof-img{
		height: 175rpx;
		width: 175rpx;
		border-radius: 50%;
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
		line-height: 72rpx;
		display: flex;
		border-bottom: 2rpx solid gray;
	}
	.inp1{
		width: 600rpx;
		height: 72rpx;
	}
</style>