<template>
	<view style="background-color: #F2EEEE;">
		<view class="demo1">
			<view>
				<view style="font-size: 48rpx;" class="addr">{{user.address}}</view>
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
		<view  class="demo" v-for="item in goods">
			<view>商品详情</view>
			<view style="display: flex;" >
				<image :src="item.img" class="imag"></image>
				<view style="width: 350rpx;">{{item.name}}</view>
				<view>
					<view>×{{item.quanity}}</view>
					<view>￥{{item.price}}</view>
				</view>
			</view>
		</view>
		<!-- <view class="demo">
			<view>支付方式</view>
			<radio-group @change="changePayment($event)">
				<radio v-for="itm in providerList" :value="itm">
					<text v-if="itm == 'wxpay'">微信支付</text>
					<text v-if="itm == 'alipay'">支付宝支付</text>
				</radio>
			</radio-group>
		</view> -->
		<view class="end">
			<view>￥{{sum}}</view>
			<button class="b1" @click="payup">立即支付</button>
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
				showInp:false,
				//selectPay:"",
				sum:NaN,
				//providerList:[],
				goods:[
					{
						id:123,
						name:"桃子",
						img:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
						quanity:1,
						price:22,
						pay_code:""
					},
					{
						id:123,
						name:"桃子",
						img:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
						quanity:1,
						price:22,
						pay_code:""
					}
				],
				user:{
					username:"345",
					address:"北京邮电大学",
					phone:"13333333333"
				}
			}
		},
		onLoad(e){
			var user = getApp().globalData;//用户的个人信息
			console.log(e)//e为商品id
			uni.request({
				url:'',
				method:"GET",
				success: (res) => {
					console.log(res)
					//将商品信息存入goods
					
				},
				fail: (err) => {
					console.log(err)
				}
			})
			// uni.getProvider({//获取支付渠道，小程序中只有微信支付
			// 	service:"payment",
			// 	success: (res) => {
			// 		console.log(res)
			// 		this.providerList = res.provider
			// 		console.log(this.providerList)
			// 	},
			// 	fail(err) {
			// 		console.log(err)
			// 	}
			// })
			var sum=0;
			for (var i = 0;i<this.goods.length;i++){
				sum += this.goods[i].price*this.goods[i].quanity;
			}
			this.sum = sum;
		},
		methods:{
			payup(){
				var pay_code_url = [];
				for(var i = 0; i < this.goods.length; i ++){
					pay_code_url = pay_code_url.push(this.goods[i].pay_code);
				}
				uni.previewImage({
					urls:pay_code_url,
					loop:true,
					success: (res) => {
						console.log(res)
					}
				})
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
			// changePayment(event){
			// 	console.log(event)
			// 	this.selectPay = event.detail.value
			// 	console.log(this.selectPay)
			// },
			changeInfo(){
				if(this.showInp&&this.address&&this.name&&this.phone){
					this.user.username = this.name;
					this.user.phone = this.phone;
					this.user.address = this.address;
					this.showInp = !this.showInp;
				}
				this.showInp = !this.showInp;
			}
		}
	}
</script>

<style>
	.demo1{
		background-color: white;
		border-radius: 12rpx;
		padding: 24rpx;
		margin-bottom: 24rpx;
		display: flex;
	}
	.demo{
		background-color: white;
		border-radius: 12rpx;
		padding: 24rpx;
		margin-bottom: 24rpx;
	}
	.addr{
		width: 650rpx;
	}
	.wenzi{
		display: flex;
		font-size: 24rpx;
		color: gray;
	}
	.imag{
		margin: 12rpx;
		width: 216rpx;
		height: 216rpx;
	}
	.end{
		z-index: 99;
		height: 112rpx;
		width: 100%;
		background-color: white;
		position: fixed;
		bottom: 0;
		display: flex;
		line-height: 112rpx;
		margin-left: 24rpx;
	}
	.b1{
		margin-left: 300rpx;
		width: 288rpx;
		height: 72rpx;
		margin-top: 20rpx;
		line-height: 72rpx;
		font-size: 48rpx;
		background: linear-gradient(rgba(250,118,25,255) 0%,rgba(250,126,25,255) 44.593%,rgba(250,168,25,255) 83.407%,rgba(250,202,25,255) 100%);
		box-shadow: 0px 12px 48px rgb(249, 167, 155);
	}
	.img{
		width: 72rpx;
		height: 72rpx;
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
</style>