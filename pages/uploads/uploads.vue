<template>
	<view class="content">
		<view>
			<button class="button1" @click="upload">上传</button>
		</view>	
		<view class="sep"></view>
		<view style="display: flex;">
			<view style="font-size: 28rpx; color:lightgrey; margin:12rpx;">标签</view>
			<view v-for="item in labels" :class="[selectedlabel == item ? 'selectLab' : 'lab']" @click="changeLabel(item)">{{item}}</view>
		</view>
		<view>
			<textarea placeholder="请输入..." v-model="txt"></textarea>
		</view>
		<view class="morePhoto">
			<view v-for="(item,index) in imgUrl" :key="index">
				<video class="img" :src="videoUrl" mode="aspectFill" v-if="videoUrl" @longpress="delVideo"></video>
				<image class="img" :src="item" mode="aspectFill" @tap="previewImg(item)" v-else @longpress="delImg(index)"></image>
			</view>
			<view>
				<image v-if="imgUrl.length<9 && !videoUrl" src="/static/addMedia.png" class="img" @click="uploadPhoto"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				txt:"",
				imgUrl:[],
				videoUrl:"",
				labels:["桃子评价","好桃推荐","桃子趣事"],
				selectedlabel:"桃子评价"
			}
		},
		onLoad(){
			
		},
		methods:{
			changeLabel(label){
				this.selectedlabel = label
			},
			uploadPhoto(){
				uni.chooseMedia({
					count:9,
					mediaType:['image','video'],
					sourceType:['album','camera'],
					maxDuration:15,
					success: (res) => {
						console.log(res)
						//console.log(res.tempFiles[0].tempFilePath)
						if(res.type == "image"){
							 var img = [];
							for(var i = 0;i<res.tempFiles.length;i++){
								img = img.concat(res.tempFiles[i].tempFilePath)
							}
							this.imgUrl = this.imgUrl.concat(img)
							//console.log(this.imgUrl)
						}
						else{
							this.imgUrl = [];
							this.imgUrl = this.imgUrl.concat(res.tempFiles[0].thumbTempFilePath);
							console.log(this.imgUrl)
							this.videoUrl = res.tempFiles[0].tempFilePath;
							console.log(this.videoUrl)
						}
						if(res.type == "video" && res.tempFiles.length > 1){
							uni.showToast({
								icon:"error",
								title:"视频最多为1"
							})
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			previewImg(item){
				console.log(item)
				uni.previewImage({
					urls:this.imgUrl,
					current:item
				})
			},
			upload(){
				if(this.txt==""&&this.imgUrl==[]){
					uni.showToast({
						icon:"error",
						title:"不能上传空评论"
					});
					return;
				}
				var prof = getApp().globalData.profile;
				var user = getApp().globalData.username;
				uni.request({
					url:"",//填入后端端口
					data:{
						profile:prof,//用户的头像
						username:user,//用户的用户名
						label:this.selectedlabel,
						content:{
							comment:this.txt,
							img:this.imgUrl,
						}
					},
					method:"POST",
					success:(res)=>{
						console.log(res)
						uni.showToast({
							icon:"success",
							title:"上传成功"
						});
						uni.redirectTo({
							url:"/pages/comment/comment"
						});
					},
					fail: () => {
						//console.log(prof,user)
						uni.showToast({
							icon:"error",
							title:"上传失败请重试"
						});
					}
				})
			},
			delVideo(){
				this.videoUrl = "";
				this.imgUrl = [];
			},
			delImg(idx){
				console.log(idx)
				this.imgUrl.splice(idx,1)
			}
		}
	}
</script>

<style>
	.content{
		padding-left: 24rpx;
		padding-right: 24rpx;
	}
	.button1{
		margin-top: 24rpx;
		margin-left: 488rpx;
		width: 216rpx;
		height: 72rpx;
		background: linear-gradient(rgba(249,167,155,255) 0%,rgba(242,73,177,255) 100%);
		box-shadow: 0rpx 24rpx 48rpx rgb(249, 167, 155);
		border-radius: 48rpx;
		margin-bottom: 24rpx;
		font-size: 36rpx;
		line-height: 72rpx;
		color: ghostwhite;
	}
	.sep{
		height: 1rpx;
		background-color: grey;
	}
	.lab{
		font-size: 24rpx;
		border-radius: 18rpx;
		background-color: lightgray;
		margin: 12rpx;
		padding: 6rpx;
	}
	.selectLab{
		font-size: 24rpx;
		border-radius: 18rpx;
		background-color: lightpink;
		margin: 12rpx;
		padding: 6rpx;
	}
	.img{
		width: 200rpx;
		height: 200rpx;
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
</style>