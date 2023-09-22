<template>
	<view>
		<view>
			<button class="button1" @click="upload">发布</button>
		</view>	
		<view class="sep"></view>
		<view>商品名称</view>
		<input v-model="name" placeholder = "请输入商品名称"/>
		<view>商品货号</view>
		<input v-model="id" placeholder = "请输入商品货号" />
		<view>规格</view>
		<view style="display: flex;" >
			<view style="font-size: 30rpx; color:lightgray; margin:12rpx;">字段</view>
			<image src="../../static/add.png" style="height: 48rpx;width: 48rpx;" @click="addLabel"></image>
		</view>	
		<view style="display: flex;" >
			<view v-for="(item,index) in labels" class="lab" @click="changeLabel(item,index)">{{item}}</view>
		</view>
		<view v-if="labels.length > 0">
			<view v-for="(item,index) in specList" class="spec">
				<view style="display: flex;" v-for="(itm,idx) in labels"> 
					<view>{{itm}}:</view>
					<input placeholder="请输入..." v-model="item[itm]" @blur="inpShow(index,idx)"/> 
				</view>
				<view style="display: flex;">
					<view>价格:</view>
					<input placeholder="请输入..." v-model="item['price']" @blur="inpShow(index,idx)"/> 
				</view>
			</view>
			<view style="text-align: center;">
				<image src="../../static/add1.png" @click="addSpec" style="height: 48rpx;width: 48rpx;"></image>
			</view>
		</view>
		<view>轮播图</view>
		<view class="morePhoto">
			<view v-for="(item,index) in imgUrl" :key="index">
				<image class="img" :src="item" mode="aspectFill" @tap="previewImg(item)" @longpress="delImg(index)"></image>
			</view>
			<view style="text-align: center">
				<image v-if="imgUrl.length<9 && !videoUrl" src="/static/addMedia.png" class="img" @click="uploadPhoto"></image>
			</view>
		</view>
		<view>详情编辑</view>
		<view style="display: flex;">
			<image class="imag" src="../../static/bold.png" @click="setBold()"></image>
			<image class="imag" src="../../static/header.png" @click="setHeader()"></image>
			<image class="imag" src="../../static/left.png" @click="setLeft()"></image>
			<image class="imag" src="../../static/center.png" @click="setCenter()"></image>
			<image class="imag" src="../../static/right.png" @click="setRight()"></image>
			<image class="imag" src="../../static/image.png" @click="insertImg()"></image>
			<image class="imag" src="../../static/undo.png" @click="udEd()"></image>
			<image class="imag" src="../../static/redo.png" @click="rdEd()"></image>
			<image class="imag" src="../../static/clear.png" @click="clrEd()"></image>
		</view>
		<editor id="editor" 
			show-img-size 
			show-img-resize 
			show-img-toolbar 
			class="ql-container" 
			placeholder="开始输入..." 
			@ready="onReadyEditor" @blur="getText"></editor>
	</view>
</template>
<script>
export default {
	data(){
		return{
				name:"",
				id:"",
				imgUrl:[],
				labels:[],
				labelValues:[],
				specList:[],
				editorCtx:"",
				textForm:{
					align:""
				},
				content:""
			}
	},
	methods:{
		onReadyEditor(){
			uni.createSelectorQuery().select('#editor').context((res) => {
						      this.editorCtx = res.context
						    }).exec()
		},
		inpShow(index,idx){
			console.log(this.specList[index])
		},
		setBold(){
			this.editorCtx.format('bold');
			this.getText()
		},
		setHeader(){
			this.editorCtx.format('header','H3');
			this.getText()
		},
		setLeft(){
			this.textForm.align = 'left';
			this.editorCtx.format('align',this.textForm.align);
			this.getText()
		},
		setCenter(){
			this.textForm.align = 'center';
			this.editorCtx.format('align',this.textForm.align);
			this.getText()
		},
		setRight(){
			this.textForm.align = 'right';
			this.editorCtx.format('align',this.textForm.align);
			this.getText()
		},
		insertImg(){
			var that = this;
			uni.chooseImage({
				count:1,
				sourceType:['album'],
				success: (res) => {
					console.log(res.tempFilePaths[0])
					that.editorCtx.insertImage({
						src:res.tempFilePaths[0],
						alt:'图片',
						success:function(e){
							that.getText()
						}
					})
				}
			})
		},
		clrEd(){
			var that = this;
			this.editorCtx.clear({
				success:function(res){
					console.log(res)
					this.content = res.html;
				},
				fail:function(err){
					console.log(err)
				}
			})
		},
		udEd(){
			this.editorCtx.undo({
				success:function(res){
					console.log(res)
					this.content = res.html;
				},
				fail:function(err){
					console.log(err)
				}
			})
		},
		rdEd(){
			this.editorCtx.redo({
				success:function(res){
					console.log(res)
					this.content = res.html;
				},
				fail:function(err){
					console.log(err)
				}
			})
		},
		getText(){
			var that = this;
		    this.editorCtx.getContents({
				success:function(res){
					//console.log('返回内容',res)
					that.content = res.html;
					console.log("本地内容",that.content)
				}
			})
			
		},
		uploadPhoto(){
			uni.chooseImage({
				count:9,
				sourceType:['album','camera'],
				success: (res) => {
					console.log(res)
					var img = [];
					img = img.concat(res.tempFilePaths)
					this.imgUrl = this.imgUrl.concat(img)
					//console.log(this.imgUrl)
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
		addLabel(){
			uni.showModal({
				editable:true,
				placeholderText:"输入字段",
				success: (res) => {
					console.log(res.content)
					if(res.content){
						this.labels.push(res.content)
					}
					console.log(this.labels)
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		addSpec(){
			var obj = {};
			for(var i = 0; i < this.labels.length; i++){
				obj[this.labels[i]]="";
			}
			this.specList.push(obj);
			console.log(this.specList)
		},
		upload(){
			var that = this;
			var user = getApp().globalData.username;
			console.log("content",that.content)
			var goods = {};
			goods.user = user;
			goods.name = this.name;
			goods.id = this.id;
			goods.specList = this.specList;
			goods.imgUrl = this.imgUrl;
			goods.detail = that.content;
			goods.labels = this.labels;
			for(var i = 0; i<this.labels.length;i++){
				var values=[];
				//console.log("标签",that.labels[i])
				var label = that.labels[i];
				for(var j =0;j<that.specList.length;j++){
					//console.log(that.specList[j])
					var temp = JSON.parse(JSON.stringify(that.specList[j]))
					//console.log(temp)
					if(temp.label!=""){
						//console.log(1,temp[label])
						values.push(temp[label]);
					}
				}	
				if(values){
					that.labelValues[label] = values;
				}
			}
			goods.labelValues = this.labelValues;
			console.log(goods)
			uni.request({
				url:"",
				method:"POST",
				data:{
					goods:goods
				},
				success: (res) => {
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
	@import url("");
	#editor {
			width: 100%;
			min-height: 300px;
			border-radius: 12rpx;
			background-color: #CCCCCC;
		}
	.img{
		width: 200rpx;
		height: 200rpx;
		object-fit: cover;
		border-radius: 12rpx;
		margin: 12rpx;
	}
	.imag{
		width: 54rpx;
		height: 54rpx;
		margin: 8rpx;
	}
	.morePhoto{
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		margin: 12rpx;
	}
	.lab{
		font-size: 30rpx;
		border-radius: 18rpx;
		background-color: lightgray;
		margin: 12rpx;
		padding: 6rpx;
	}
	.spec{
		margin: 12rpx;
		padding: 6rpx;
		background-color: #CCCCCC;
		border-radius: 12rpx;
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
</style>