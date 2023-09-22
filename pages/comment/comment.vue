<template>
	<view class="back">
		<image class="icon" src="../../static/add.png" @click="ToUpload"></image>
		<scroll-view>
			<view v-for="(item,index) of commentList" :key="index" >
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
					<view class="comment-tail">
						<image src="../../static/comm.png" class="icon2" @click="comm(index)" ></image>
						<image src="../../static/like.png" class="icon2" @click="lik(item.like)"></image>
					</view>
					<view class="sep"></view>
				</view>
			</view>
		</scroll-view>
		<view class="outModal" v-if="isShow">
			<input @blur="unShow" class="outInp" v-model="inpMsg" focus placeholder="请输入评论" confirm-type="done"  />
			<view class="outButton">
				<button size="mini" @click="addComm">发布</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				inpMsg:"",
				isShow:false,
				currentItem:NaN,
				commentList:[
					//返回数据模板
					{
						profile:"../../static/username.png",
						username:"用户1",
						label:"桃子评价",
						content:{
							comment:"这是一个示例1111111111111111111111这是一个示例",
							img:["http://tmp/dfBwdNEO9DhX69d6d9ccc2602cb6193cc6f9c6bcc809.jpg"]
						},
						like:["用户1","用户2"],
						exchange:[
							{
								username:"用户3",
								comment:"好好好"
							}
						]
					},
					{
						profile:"../../static/username.png",
						username:"用户1",
						label:"桃子评价",
						content:{
							comment:"这是一个示例1111111111111111111111这是一个示例",
							img:["http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg","http://tmp/dfBwdNEO9DhX69d6d9ccc2602cb6193cc6f9c6bcc809.jpg","http://tmp/4WFncluVsspWc0ef6f88d887112b046745aa211e01fb.jpg","http://tmp/iqn8Wz5cD2Tvc0ef6f88d887112b046745aa211e01fb.jpg"]
						},
						like:[],
						exchange:[]
					},
				]
			}
		},
		onShow(){
			//获取信息
			uni.request({
				url:"",//后端接口，
				method:"GET",
				success: (res) => {
					console.log(res.data)
					//将请求的数据放进commentList
					
					
					
					
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods:{
			updateComm(){
			//更新信息
			uni.request({
				url:"",//后端接口
				data:{
					conmmentList:this.commentList
				},
				method:"POST",
				success: (res) => {
					console.log("更新成功")
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
			ToUpload(){
				console.log("toupload")
				uni.navigateTo({
					url:"/pages/uploads/uploads"
				})
			},
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
			comm(idx){
				console.log(idx)
				this.currentItem = idx;
				this.isShow = true;
			},
			lik(likeList){
				console.log(likeList)
				var likeLst = JSON.parse(JSON.stringify(likeList));
				var user = getApp().globalData.username;
				if(likeLst.indexOf(user)===-1){
					likeList.push(user)
				}
				else{
					var t = likeLst.indexOf(user);
					console.log(t)
					likeList.splice(t,1)
				}
				this.updateComm();
			},
			unShow(){
				isShow:false;
			},
			addComm(){
				console.log(this.inpMsg)
				if(this.inpMsg==""){
					uni.showToast({
						icon:"error",
						title:"不能发布空评论"
					});
					return;
				}
				var t = this.currentItem;
				var cur = JSON.parse(JSON.stringify(this.commentList));
				console.log(cur[t].exchange)
				var user = getApp().globalData.username;
				var addItem = {
					username:user,
					comment:this.inpMsg
				};
				this.commentList[t].exchange.push(addItem)
				this.inpMsg=""
				this.updateComm();
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
	.icon{
		width: 72rpx;
		height: 72rpx;
		padding-top: 24rpx;
		padding-left: 654rpx;
	}
	.icon1{
		width: 72rpx;
		height: 72rpx;
		padding-top: 14rpx;
		padding-left: 36rpx;
	}
	.icon2{
		width: 48rpx;
		height: 48rpx;
		padding: 12rpx;
		
	}
	.comment-top{
		display: flex;
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
	.sep{
		height: 1rpx;
		background-color: grey;
	}
	.outModal{
		position: absolute;
		    display: flex;
		    align-items: center;
		    height: 110rpx;
		    bottom: 0rpx;
		    left: 0rpx;
		    right: 0rpx;
		    z-index: 500;
		    background: #fff;
	}
	.outInp{
		background: #fff;
		    margin-top: 12rpx;
		    z-index: 500;
		    width: 580rpx;
		    height: 110rpx;
		    padding-left: 35rpx;
	}
	.outButton{
		height: 110rpx;
		width: 170rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>