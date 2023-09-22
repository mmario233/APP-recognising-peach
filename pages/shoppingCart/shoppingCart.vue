<template>
	<view style="background-color: #F2EEEE;">
		<view v-for="(itm,idx) in cartList" class="demo">
			<view style="display: flex;">
				<radio @click="changeAll(itm.isAll,idx)" :checked="itm.isAll"></radio>
				<view>{{itm.shopName}}</view>
			</view>
			<view v-for="(item,index) in itm.goods">
				<view style="margin: 12rpx; background:lightgray; height: 2rpx;"></view>
				<view style="display: flex;" >
					<radio @click="changeSelect(idx,item.selected,index)" :checked="item.selected"></radio>
					<image :src="item.img" class="imag"></image>
					<view class="txt">{{item.name}}</view>
					<view>
						<view>×{{item.quanity}}</view>
						<view>￥{{item.price}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="margin: 24rpx;background-color: darkgrey; height: 2rpx;"></view>
		<!-- 购物车非空 -->
		<view style="text-align: center;" v-if="cartList">
			<text>我是有底线的</text>
		</view>
		<!-- 购物车空时 -->
		<view style="text-align: center;" v-if="!cartList">
			<text>购物车中空空如也</text>
		</view>
		<view class="end">
			<view v-if="sum">￥{{sum}}</view>
			<button class="b1" @click="Topay(selectId)">立即支付</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cartList:[
					{
						shopName:"桃之夭夭",
						isAll:false,
						goods:[
							{
								id:123,
								name:"桃子会如何如何绝对不是举办的那地方就是",
								img:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
								quanity:1,
								price:22,
								shopName:"桃之夭夭",
								selected:false
							},
							{
								id:345,
								name:"桃子",
								img:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
								quanity:1,
								price:23,
								shopName:"桃之夭夭",
								selected:false
							}
						]
					},
					{
						shopName:"桃夭夭",
						isAll:false,
						goods:[
							{
								id:123,
								name:"桃子会如何如何绝对不是举办的那地方就是",
								img:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
								quanity:1,
								price:22,
								shopName:"桃夭夭",
								selected:false
							},
							{
								id:345,
								name:"桃子",
								img:"http://tmp/PXkgi0YrxDzJc0ef6f88d887112b046745aa211e01fb.jpg",
								quanity:1,
								price:23,
								shopName:"桃夭夭",
								selected:false
							}
						]
					}
				],
				selectList:[],
				selectId:[],
				sum:NaN
			}
		},
		onLoad(){
			uni.request({
				url:"",
				method:"GET",
				success: (res) => {
					console.log(res)
					//将数据放入goodsList
					
				},
				fail(err) {
					console.log(err)
				}
			})
		},
		methods:{
			changeAll(e,idx){
				console.log(e)
				this.cartList[idx].isAll = !e;
				if(e == true){
					var t = this.cartList[idx].goods;
					for(var i = 0; i<t.length; i++){
						t[i].selected = false;
						this.selectList.pop();
						this.selectId.pop();
						//console.log(this.selectList)
					}
					this.$forceUpdate()
					this.calSum()
				}
				else{
					var t = this.cartList[idx].goods;
					for(var i = 0; i<t.length; i++){
						t[i].selected = true;
						this.selectList.push(t[i])
						this.selectId.push(t[i].id)
					}
					this.$forceUpdate()
					this.calSum()
				}
				console.log(this.selectList)
			},
			changeSelect(idx,e,index){
				console.log(e)
				this.cartList[idx].goods[index].selected = !e;
				if(e == true){
					var t = this.selectList.indexOf(this.cartList[idx].goods[index]);
					this.selectList.splice(t,1);
					this.selectId.splice(t,1);
					this.calSum()
					if(this.cartList[idx].goods.length > this.selectList.length){
						this.cartList[idx].isAll = false;
						this.$forceUpdate()
					}
				}
				else{
					this.selectList.push(this.cartList[idx].goods[index])
					this.selectId.push(this.cartList[idx].goods[index].id)
					this.calSum()
					var count =0;
					for(var i=0;i<this.cartList[idx].goods.length;i++){
						if(this.cartList[idx].goods[i].selected)count++;
					}
					if(count == this.cartList[idx].goods.length){
						this.cartList[idx].isAll=true;
						this.$forceUpdate()
					}
				}	
				console.log(this.selectList)
			},
			calSum(){
				var sum = 0;
				for(var i=0;i<this.selectList.length;i++){
					sum += this.selectList[i].price*this.selectList[i].quanity;
				}
				this.sum = sum;
			},
			Topay(id){
				console.log(id)
				for(var i=0;i<this.selectList.length-1;i++){
					console.log(this.selectList[i].shopName,this.selectList[i+1].shopName)
					if(this.selectList[i].shopName!=this.selectList[i+1].shopName){
						uni.showToast({
							icon:"error",
							title:"一次只能一店"
						})
						return;
					}
				}
				
				if(id.length==0){
					uni.showToast({
						icon:"error",
						title:"未选中商品"
					})
					return;
				}
				var Id = JSON.parse(JSON.stringify(id));
				uni.navigateTo({
					url:"/pages/pay/pay?id="+Id//传递id参数到支付界面
				})
			}
		}
	}
</script>

<style>
	.demo{
		background-color: white;
		border-radius: 12rpx;
		padding: 24rpx;
		margin-bottom: 24rpx;
	}
	.imag{
		margin: 12rpx;
		width: 216rpx;
		height: 216rpx;
		border-radius: 12rpx;
	}
	.end{
		z-index: 99;
		height: 112rpx;
		width: 100%;
		background-color: white;
		position: fixed;
		bottom: 0;
		display: flex;
		line-height: 112rpx;
		margin-left: 24rpx;
	}
	.b1{
		float: right;
		margin-right: 36rpx;
		width: 288rpx;
		height: 72rpx;
		margin-top: 20rpx;
		line-height: 72rpx;
		font-size: 48rpx;
		background: linear-gradient(rgba(250,118,25,255) 0%,rgba(250,126,25,255) 44.593%,rgba(250,168,25,255) 83.407%,rgba(250,202,25,255) 100%);
		box-shadow: 0px 12px 48px rgb(249, 167, 155);
	}
	.txt{
		width: 375rpx;
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		height: 100rpx;
	}
</style>