<template>
	<view style="background-color: #E5E5E5;">
		<swiper class="Swip" indicator-dots circular  autoplay duration="1000" interval="5000">
			<swiper-item v-for="(item,index) in goods.img" :key="index">
				<image :src="item" style="width: 100%;height: 512rpx;"></image>
			</swiper-item>
		</swiper>
		<view class="demo">
			<view class="txt" @tap="showTitle">{{goods.title}}</view>
			<view style="font-size: 72rpx;color: lightpink;">￥{{goods.price}}</view>
		</view>
		<view class="demo">
			<view>货号：{{goods.NO}}</view>
			<view>库存：{{goods.stock}}</view>
			<view @tap = "open">请选择规格</view>
			<view>{{goods.shop_name}}</view>
		</view>
		<view class="demo">
			<view>详情</view>
			<rich-text :nodes="goods.detail"></rich-text>
		</view>
		<view style="height: 112rpx;">1</view>
		<view>
		</view>
		<view class="end">
			<image src="/static/shoppingCart.png" class="img" @click="Tocart"></image>
			<view class="butt">
				<button class="b1" @click="addCart">加入购物车</button>
				<button class="b2" @click="Topay(goods.id)">立即购买</button>
			</view>
		</view>
		<uni-popup ref="popup" type="top">
			<view class="popup">
				<view>￥{{selectedValue["价格"] || 0}}</view>
				<view v-for="item in specList">
					<view>{{item.name}}</view>
					<view style="display: flex;">
						<view v-for="itm in item.values" :class="[selectedValue[item.name] == itm ? 'selectLab' : 'lab']" @click="changeLabel(item.name,itm)">{{itm}}</view>
					</view>
				</view>
				<view>数量：</view>
				<uni-number-box :min="1" v-model="selectedValue['数量']"></uni-number-box>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				specList:[
					{
						name:"重量",
						values:["1kg","3kg","5kg"]
					},
					{
						name:"品种",
						values:["油桃","水蜜桃","毛桃"]
					},
				],
				selectedValue:{
					"数量":1
				},
				specprice:[
					{
						"重量":"1kg",
						"品种":"油桃",
						price:5
					},
					{
						"重量":"1kg",
						"品种":"水蜜桃",
						price:7
					},
					{
						"重量":"1kg",
						"品种":"毛桃",
						price:6
					},
					{
						"重量":"3kg",
						"品种":"油桃",
						price:13
					},
					{
						"重量":"3kg",
						"品种":"水蜜桃",
						price:19
					},
					{
						"重量":"3kg",
						"品种":"毛桃",
						price:16
					},
					{
						"重量":"5kg",
						"品种":"油桃",
						price:22
					},
					{
						"重量":"5kg",
						"品种":"水蜜桃",
						price:32
					},
					{
						"重量":"5kg",
						"品种":"毛桃",
						price:27
					}
				],
				goods:{
					id:123,
					img:["http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg","http://tmp/dfBwdNEO9DhX69d6d9ccc2602cb6193cc6f9c6bcc809.jpg"],
					title:"桃子吃烧烤都不舍得北京市你就不可能吃桃子吃烧烤都不舍得北京市你就不可能吃",
					price:'5~32',
					NO:123,
					stock:100,
					shop_name:"桃之夭夭",
					detail:"<div style='color:red' class='classTest'>hello world</div><div style='color:red' class='classTest'>hello world</div><div style='color:red' class='classTest'>hello world</div><div style='color:red' class='classTest'>hello world</div><div style='color:red' class='classTest'>hello world</div><div style='color:red' class='classTest'>hello world</div>"
				}
			}
		},
		onLoad(){
			uni.request({
				url:"",
				method:"GET",
				success: (res) => {
					console.log(res)
					//将数据存入goods、规格价格匹配表存入specprice
					
					
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods:{
			changeLabel(label,value){
				console.log(Object.keys(this.selectedValue).length,Object.keys(this.specList).length)
				//console.log(this.selectedValue["数量"])
				this.selectedValue[label] = value;
				console.log(this.selectedValue)
				this.$forceUpdate()
				if(Object.keys(this.selectedValue).length > Object.keys(this.specList).length ){
					var priceList = this.specprice;
					//console.log(priceList.find(item=>item["品种"]==="油桃"&&item["重量"]==="1kg"))
					var keys = Object.keys(this.selectedValue);
					keys.splice("数量",1);
					console.log(keys)
					var judge = "";
					for (var i = 0;i<keys.length;i++){
						if(i==0){
							judge += "item["+JSON.stringify(keys[i])+"]=="+JSON.stringify(this.selectedValue[keys[i]]);
							console.log(judge)
						}
						else{
							judge += "&&"
							judge += "item["+JSON.stringify(keys[i])+"]=="+JSON.stringify(this.selectedValue[keys[i]]);
							console.log(judge)
						}
					}
					var x = JSON.parse(JSON.stringify(priceList.find(function(item){return eval(judge)}))) ;
					console.log(x)
					this.selectedValue["价格"]=Number(x["price"]) * this.selectedValue["数量"];
					console.log(this.selectedValue)
				}
			},
			Tocart(){
				uni.navigateTo({
					url:"/pages/shoppingCart/shoppingCart"
				})
			},
			addCart(){
				
				if(Object.keys(this.selectedValue).length <= Object.keys(this.specList).length ){
					console.log(Object.keys(this.selectedValue).length,Object.keys(this.specList).length)
					uni.showToast({
						icon:"error",
						title:"规格有漏选项"
					})
					return
				}
				else{
					uni.request({
						url:'',
						data:{
							good:this.goods,
							value:this.selectedValue
						},
						method:"POST",
						success(res) {
							console.log(res)
							
						},
						fail(err) {
							console.log(err)
						}
					})
				}
			},
			Topay(id){
				if(Object.keys(this.selectedValue).length <= Object.keys(this.specList).length ){
					console.log(Object.keys(this.selectedValue).length,Object.keys(this.specList).length)
					uni.showToast({
						icon:"error",
						title:"规格有漏选项"
					})
					return
				}
				var Id = JSON.stringify(id)
				uni.navigateTo({
					url:"/pages/pay/pay?id="+Id
				})
			},
			showTitle(){
				uni.showModal({
					content:this.goods.title,
					showCancel:false
				})
			},
			open(){
				this.$refs.popup.open()
			}
		}
	}
</script>

<style>
	.Swip{
		width: 100%;
		height: 512rpx;
	}
	.demo{
		background-color: white;
		border-radius: 12rpx;
		margin-top: 12rpx;
		font-size: 48rpx;
		line-height: 72rpx;
		padding: 12rpx;
	}
	.end{
		z-index: 9;
		height: 112rpx;
		width: 100%;
		background-color: white;
		position: fixed;
		bottom: 0;
		display: flex;
		line-height: 112rpx;
	}
	.img{
		height: 72rpx;
		width: 72rpx;
		margin: 20rpx;
	}
	.butt{
		padding-left: 48rpx;
		display: flex;
		width: 576rpx;
		margin-top: 20rpx;
	}
	.b1{
		height: 72rpx;
		width: 288rpx;
		font-size: 36rpx;
		line-height: 72rpx;
		background: linear-gradient(rgba(250,84,25,255) 0%,rgba(250,101,25,255) 44.593%,rgba(250,109,25,255) 83.407%,rgba(250,135,25,255) 100%);
		box-shadow: 0px 12px 48px rgb(249, 167, 155);
	}
	.b2{
		height: 72rpx;
		width: 288rpx;
		font-size: 36rpx;
		line-height: 72rpx;
		background: linear-gradient(rgba(250,118,25,255) 0%,rgba(250,126,25,255) 44.593%,rgba(250,168,25,255) 83.407%,rgba(250,202,25,255) 100%);
		box-shadow: 0px 12px 48px rgb(249, 167, 155);
	}
	.txt{
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	.popup{
		width: 750rpx;
		z-index: 99;
		background-color: lavenderblush;
	}
	.lab{
		font-size: 36rpx;
		border-radius: 18rpx;
		background-color: lightgray;
		margin: 12rpx;
		padding: 6rpx;
	}
	.selectLab{
		font-size: 36rpx;
		border-radius: 18rpx;
		background-color: lightpink;
		margin: 12rpx;
		padding: 6rpx;
	}
</style>