<template>
	<view>
		<view class="background"></view>
		<view class="Nav" >
			<view v-for="(item,index) in sections" :key="index">
				<view :class="[selectedSection==index ? 'selectedSec':'section']" @click="changeSec(index)">{{item}}</view>
			</view>
		</view>
		<scroll-view>
			<view class="essay" v-for="(item,index) in informBoard" @click="Todetail(item.id)">
				<image :src="item.pic" class="essay-img"></image>
				<view>
					<view class="Title">{{item.title}}</view>
					<view class="Content">{{item.content}}</view>
					<view class="Tim">{{item.tim}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				selectedSection:0,
				sections:['新闻','活动','提示','帮助'],
				informBoard:[
					//数据模板
					{
						id:123,
						pic:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
						title:"桃子",
						content:"23132",
						tim:"2022/2/30"
					}
				]
			}
		},
		onLoad(){
			this.getInform();
		},
		methods:{
			changeSec(idx){
				this.selectedSection=idx;
				this.getInform()
			},
			getInform(){
				console.log(this.sections,this.selectedSection)
				var Sec = JSON.parse(JSON.stringify(this.sections))
				uni.request({
					url:"",//后端接口
					data:{
						catalog:Sec[this.selectedSection]//返回要获取信息的类别
					},
					method:"GET",
					success: (res) => {
						console.log(res)
						//将信息存入informBoard
						
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			Todetail(id){
				console.log(id)
				var Id = JSON.stringify(id)
				uni.navigateTo({
					url:"/pages/detail/detail?id="+Id
				})
			}
		}
	}
</script>

<style>
	.background{
		background: url(https://s3.bmp.ovh/imgs/2022/08/03/c0debd5f7adf5c5e.jpg) center/cover no-repeat;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.Nav{
		margin: 1rpx;
		padding: auto;
		display: flex;
	}
	.section{
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		width: 187rpx;
	}
	.selectedSec{
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		width: 187rpx;
		color: lightpink;
		border-bottom: 2rpx solid lightpink;
	}
	.essay{
		display: flex;
		width: 100%;
		height: 216rpx;
		padding: 18rpx;
		border-bottom: 2rpx solid black;
	}
	.essay-img{
		width: 180rpx;
		height: 180rpx;
		border-radius: 18rpx;
		margin: 18rpx;
	}
	.Title{
		font-size: 60rpx;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
	}
	.Content{
		font-size: 36rpx;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		color: gainsboro;
	}
	.Tim{
		width: 480rpx;
		text-align: right;
		font-size: 24rpx;
		color: darkgray;
	}
</style>