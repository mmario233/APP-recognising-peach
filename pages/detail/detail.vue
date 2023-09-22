<template>
	<view>
		<view >
			<image @click="addCollection" class="collect" :src="[essay.Iscollect ? '/static/star1.png' : '/static/star.png']"></image>
		</view>
		<view>{{essay.title}}</view>
		<view>{{essay.tim}}</view>
		<rich-text :nodes="essay.content"></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				Id:"",
				essay:{//数据模板，为使页面更多样，采用富文本解析的方式呈现内容content
					id:"123",
					title:"测试",
					Iscollect:false,
					tim:"2022/2/30",
					content:"<div style='color:red' class='classTest'>hello world</div>"
				}
			}
		},
		onLoad(e) {
			console.log(e)
			this.Id = e.id;
			console.log(this.Id)
			uni.request({
				url:"",//后端接口
				method:"GET",
				success: (res) => {
					//数据存入essay
					
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods:{
			addCollection(){
				console.log(this.essay.Iscollect)
				this.essay.Iscollect = !this.essay.Iscollect;
				uni.request({
					url:"",
					method:"POST",
					data:{
						id:this.Id,
						stated:this.essay.Iscollect
					},
					success: (res) => {
						//收藏则需要更改数据的Iscollect,将id保存（例如数组里），我的收藏中会调用；
						//取消收藏同样更改Iscollect,将id从存入的地方删除
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style>
	.collect{
		padding-left:690rpx; 
		padding-top:12rpx; 
		height: 48rpx; 
		width: 48rpx;
	}
</style>