<template>
	<view>
		<image class="icon" src="../../static/add.png" @click="ToaddComm"></image>
		<view class="title">商品列表</view>
		<view class="goodsList">
			<view class="goods" v-for="(item,index) in goodList" :key="index"  @click="Togood(item.id)">
				<image class="imag" :src="item.img"></image>
				<view class="txt">{{item.name}}</view>
				<view style="color: lightpink;">￥{{item.price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				goodList:[
					{
						id:0,
						img:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
						name:"桃子111111111111111111",
						price:22
					},
					{
						id:1,
						img:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
						name:"桃子",
						price:22
					}
				]
			}
		},
		onLoad() {
			uni.request({
				url:'',
				method:"GET",
				success: (res) => {
					console.log(res)
				},
				fail(err) {
					console.log(err)
				}
			})
		},
		methods:{
			ToaddComm(){
				uni.navigateTo({
					url:"/pages/demo/demo"
				})
			},
			Togood(id){
				var Id = JSON.stringify(id)
				uni.navigateTo({
					url:"/pages/goods/goods?id="+Id
				})
			}
		}
	}
</script>

<style>
	.icon{
		width: 72rpx;
		height: 72rpx;
		padding-top: 24rpx;
		padding-left: 654rpx;
	}
	.title{
		width: 100%;
		margin-top: 48rpx;
		margin-bottom: 48rpx;
		height: 144rpx;
		text-align: center;
		line-height: 144rpx;
		font-size: 48rpx;
		border-left: 8rpx solid lightpink;
		background-color: white;
		border-radius: 12rpx;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
	}
	.goodsList{
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		margin: 12rpx;
	}
	.goods{
		width: 340rpx;
		height: 500rpx;
		object-fit: cover;
		border-radius: 12rpx;
		margin: 12rpx;
		background-color: white;
	}
	.imag{
		width: 340rpx;
		height: 400rpx;
		border-radius: 12rpx;
	}
	.txt{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-left: 12rpx;
	}
</style>