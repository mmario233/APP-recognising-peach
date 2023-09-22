<template>
	<view>
		<view class="background"></view>
		<view v-if="catagory == '订单'" >
			<view v-for="item in information">
				<view style="display: flex;" class="dd" @click="Toddetail(item.id)">
					<image :src="item.img" class="img"></image>
					<view class="name">{{item.name}}</view>
					<view>
						<view>×{{item.quanity}}</view>
						<view>￥{{item.price}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="catagory == '帖子'">
			<view v-for="(item,index) of information" :key="index" class="comment">
				<view class="comment-top">
					<image class="icon1" :src="item.profile"></image>
					<text class="txt">{{item.username}}</text>
				</view>
				<view class="lab">
					{{item.label}}
				</view>
				<view class="commment-content">
					<text>{{item.content.comment}}</text>
					<view v-for="(itemson,idxs) in item.content.img" v-if="item.content.img.length==1">
						<image @click="previewImg(item.content.img,idxs)" class="img-1" :src="itemson" mode="widthFix"></image>
					</view>
					<view style="display: flex;" v-if="item.content.img.length==2">
						<view v-for="(itemson,idxs) in item.content.img" :key="index" >
							<image @click="previewImg(item.content.img,idxs)" class="img-2" :src="itemson" mode="aspectFill"></image>
						</view>
					</view>
					<view class="morePhoto">
						<view v-for="(itemson,idxs) in item.content.img" :key="index" v-if="item.content.img.length >= 3">
							<image @click="previewImg(item.content.img,idxs)" class="img-3" :src="itemson" mode="aspectFill"></image>
						</view>
					</view>
					<view class="like">
						<text v-for="(itemlike,index1) of item.like" >{{itemlike}}</text>
						<text v-if="item.like.length">觉得很赞</text>
					</view>
					<view v-for="(itemcom,index2) of item.exchange" >
						<text>{{itemcom.username}}:{{itemcom.comment}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="catagory == '收藏'">
			<view class="essay" v-for="(item,index) in information" @click="Todetail(item.id)">
				<image :src="item.pic" class="essay-img"></image>
				<view>
					<view class="Title">{{item.title}}</view>
					<view class="Content">{{item.content}}</view>
					<view class="Tim">{{item.tim}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				information:[
					// 订单示例
					// {
					// 	id:123,
					// 	name:"桃子",
					// 	img:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
					// 	quanity:1,
					// 	price:22
					// }
					//帖子的示例，自己发的帖子
					// {
					// 	profile:"../../static/username.png",
					// 	username:"用户1",
					//  label:"桃子评价",
					// 	content:{
					// 		comment:"这是一个示例1111111111111111111111这是一个示例",
					// 		img:["http://tmp/dfBwdNEO9DhX69d6d9ccc2602cb6193cc6f9c6bcc809.jpg"]
					// 	},
					// 	like:["用户1","用户2"],
					// 	exchange:[
					// 		{
					// 			username:"用户3",
					// 			comment:"好好好"
					// 		}
					// 	]
					// }
					//收藏的示例，收藏的公告栏文章
					// {
					// 	id:123,
					// 	pic:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
					// 	title:"桃子",
					// 	content:"23132",
					// 	tim:"2022/2/30"
					// }
				],
				catagory:""
			}
		},
		onLoad(e){
			console.log(e.id)
			this.catagory = e.id;
			uni.request({
				url:"",
				data:e.id,
				method:"GET",
				success: (res) => {
					//根据id获取不同的数据，存入information
					
				}
			})
		},
		methods:{
			previewImg(imgUrl,idx){
				console.log(imgUrl,idx)
				var imgU = JSON.parse(JSON.stringify(imgUrl));
				console.log(imgU)
				uni.previewImage({
					urls:imgU,
					current:idx,
					success: () => {
						
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
			},
			Toddetail(id){
				console.log(id)
				var Id = JSON.stringify(id)
				uni.navigateTo({
					url:"/pages/pay/pay?id="+Id
				})
			}
		}
	}
</script>

<style>
	.background{
		background: url(https://s3.bmp.ovh/imgs/2022/07/29/294ac2bb32fd38b5.jpg) center/cover no-repeat;
		filter: blur(4px);
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.dd{
		border-radius: 12rpx;
		background-color: white;
		margin: 24rpx;
		margin-top: 0rpx;
		padding-bottom: 24rpx;
		padding-top: 24rpx;
	}
	.name{
		width: 350rpx;
		font-size: 48rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.imag{
		margin: 12rpx;
		width: 216rpx;
		height: 216rpx;
	}
	.lab{
		font-size: 24rpx;
		border-radius: 18rpx;
		background-color: lightgray;
		margin: 12rpx;
		padding: 6rpx;
		width: 108rpx;
		margin-left: 36rpx;
		text-align: center;
	}
	.icon1{
		width: 72rpx;
		height: 72rpx;
		padding-top: 14rpx;
		padding-left: 36rpx;
	}
	.comment{
		border-radius: 12rpx;
		background-color: white;
		margin: 24rpx;
		margin-top: 0rpx;
		padding-bottom: 24rpx;
	}
	.comment-top{
		display: flex;
	}
	.comment-tail{
		display: flex;
		margin-left: 512rpx;
	}
	.txt{
		line-height: 72rpx;
		padding-left: 24rpx;
		padding-top: 14rpx;
	}
	.commment-content{
		padding-left: 53rpx;
		padding-right: 53rpx;
	}
	.img{
		margin: 24rpx;
		border-radius: 12rpx;
		width: 216rpx;
		height: 216rpx;
		margin-top: 0rpx;
	}
	.img-1{
		max-width: 448rpx;
		object-fit: cover;
		border-radius: 12rpx;
		margin: 12rpx;
	}
	.img-2{
		width: 288rpx;
		height: 288rpx;
		object-fit: cover;
		border-radius: 12rpx;
		margin: 12rpx;
	}
	.img-3{
		width: 182rpx;
		height: 182rpx;
		object-fit: cover;
		border-radius: 12rpx;
		margin: 12rpx;
	}
	.morePhoto{
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		margin: 12rpx;
	}
	.like{
		background-color: grey;
		border-radius: 10rpx;
	}
	.essay{
		display: flex;
		height: 216rpx;
		padding: 18rpx;
		background-color: white;
		border-radius: 12rpx;
		margin: 24rpx;
		margin-top: 0rpx;
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