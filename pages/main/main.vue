<template>
	<view class="back">
		<view class="radius">
			<text class="my" @click="Tomy">我的</text>
		</view>
		<view class="v1">今日好桃</view>
		<view class="v2">精选评论</view>
		<view class="v2">精选评论</view>
		<view class="tabbar">
			<view class="bloc1" @click="ToInform">公告</view>
			<view class="bloc" @click="ToSee">观赏</view>
			<view class="bloc" @click="ToShop">购物</view>
			<view class="bloc" @click="ToComment">讨论</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad(){
			
		},
		methods:{
			ToInform(){
				uni.navigateTo({
					url:"/pages/inform/inform"
				})
			},
			ToSee(){
				uni.navigateTo({
					url:"/pages/see/see"
				})
			},
			ToShop(){
				uni.navigateTo({
					url:"/pages/shop/shop"
				})
			},
			ToComment(){
				uni.navigateTo({
					url:"/pages/comment/comment"
				})
			},
			Tomy(){
				uni.navigateTo({
					url:"/pages/my/my"
				})
			}
		}
	}
</script>

<style>
	.back{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: linear-gradient(rgba(235,119,224,228) 0%,rgba(255,255,255,0) 70.487%);
	}
	.radius{
		margin-left: 25rpx;
		margin-top: 25rpx;
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		background-color: white;
		border-radius: 50%;
		text-align: center;
	}
	.my{
		margin-top: 10rpx;
	}
	.v1{
		width: 100%;
		height: 30%;
		margin-bottom: 5%;
		margin-top: 5%;
		background-color: white;
	}
	.v2{
		width: 100%;
		height: 20%;
		margin-bottom: 5%;
		background-color: gray;
	}
	.tabbar{
		display: flex;
	}
	.bloc1{
		width: 180rpx;
		height: 180rpx;
		text-align: center;
		line-height: 180rpx;
		background-color: lightpink;
	}
	.bloc{
		width: 180rpx;
		height: 180rpx;
		margin-left: 13rpx;
		text-align: center;
		line-height: 180rpx;
		background-color: lightpink;
	}
</style>