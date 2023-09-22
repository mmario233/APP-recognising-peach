<template>
	<view style="background-color: #E5E5E5;">
		<swiper class="Swip" indicator-dots circular  autoplay duration="1000" interval="5000">
			<swiper-item v-for="(item,index) in scroll" :key="index" @click="Togood(item.id)">
				<image :src="item.img" style="height: 336rpx;width: 100%;"></image>
			</swiper-item>
		</swiper>
		<view class="title">推荐商品</view>
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
				scroll:[
					{
						id:0,
						img:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
						name:"桃子",
						price:22
					},
					{
						id:1,
						img:"http://tmp/dfBwdNEO9DhX69d6d9ccc2602cb6193cc6f9c6bcc809.jpg",
						name:"桃子",
						price:22
					}
				],
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
		onLoad(){
			uni.request({
				url:"",
				method:"GET",
				success: (res) => {
					console.log(res)
					//将数据存入scroll、goodList
					
					
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods:{
			Togood(id){
				console.log(id)
				var Id = JSON.stringify(id)
				uni.navigateTo({
					url:"/pages/goods/goods?id="+Id
				})
			}
		}
	}
</script>

<style>
	.Swip{
		width: 100%;
		height: 336rpx;
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