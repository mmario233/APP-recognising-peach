<template>
	<view>
		<view class="Nav" >
			<view v-for="(item,index) in sections" :key="index">
				<view :class="[selectedSection==index ? 'selectedSec':'section']" @click="changeSec(index)">{{item}}</view>
			</view>
		</view>
		<scroll-view>
			<view v-if="selectedSection" v-for="(item,index) in videoUrl" :key="index">
				<video :id="`video${index}`" :src="item" @play='videoPlay(index)' @pause="videoPause(index)" class="videos"></video>
			</view>
			<view v-if="selectedSection==0" v-for="(itm,idx) in imageUrl">
				<image :src="itm" class="imgs" mode='widthFix'></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				selectedSection:0,
				sections:['图片','视频'],
				playIdx:NaN,
				imageUrl:['https://s3.bmp.ovh/imgs/2022/08/16/8a764a2e724a0db0.jpg',
				'https://s3.bmp.ovh/imgs/2022/08/16/cb5c056af404a110.jpg',
				'https://s3.bmp.ovh/imgs/2022/08/16/a97098257fdbe2ef.jpg',
				'https://s3.bmp.ovh/imgs/2022/08/16/21563cdbae6263b3.png',
				'https://s3.bmp.ovh/imgs/2022/08/16/9d49f9926d52dad0.png',
				'https://s3.bmp.ovh/imgs/2022/08/16/c39038e60c04ef1c.png',
				'https://s3.bmp.ovh/imgs/2022/08/16/35b5c3474fa6e560.png',
				'https://s3.bmp.ovh/imgs/2022/08/16/81c0978273c120b3.png',
				'https://s3.bmp.ovh/imgs/2022/08/16/ccfe939f0bd164be.png'],
				videoUrl:['https://vd3.bdstatic.com/mda-jdar8ke4anb592ck/sc/mda-jdar8ke4anb592ck.mp4?v_from_s=hkapp-haokan-suzhou&auth_key=1660372349-0-0-4645630513fb9b5590515f0301fe117d&bcevod_channel=searchbox_feed&pd=1&cd=0&pt=3&logid=0148794276&vid=8152164657296330207&abtest=103579_2-103742_4-103747_2-103890_1&klogid=0148794276',
				'https://vd4.bdstatic.com/mda-kgbkhi2zye8jghdw/v1-cae/sc/mda-kgbkhi2zye8jghdw.mp4?v_from_s=hkapp-haokan-suzhou&auth_key=1660372712-0-0-c3e087a67fc37282abda6eb182746a88&bcevod_channel=searchbox_feed&pd=1&cd=0&pt=3&logid=0512359229&vid=8072795585778161748&abtest=103579_2-103742_4-103747_2-103890_1&klogid=0512359229',
				'https://vd3.bdstatic.com/mda-kfbh1dka2269fbu0/sc/mda-kfbh1dka2269fbu0.mp4?v_from_s=hkapp-haokan-suzhou&auth_key=1660373319-0-0-ab58cc58919a8dfb2ef4be6c800e0a04&bcevod_channel=searchbox_feed&pd=1&cd=0&pt=3&logid=1119040679&vid=6178804969358255487&abtest=103579_2-103742_4-103747_2-103890_1&klogid=1119040679',
				'https://vd3.bdstatic.com/mda-mdbxsnnwfupisbaw/sc/mda-mdbxsnnwfupisbaw.mp4?v_from_s=hkapp-haokan-suzhou&auth_key=1660373561-0-0-03de41fcba5b128bbf79289e52b0d4ab&bcevod_channel=searchbox_feed&cd=0&pd=1&pt=3&logid=1360969037&vid=6354396526556369521&abtest=103579_2-103742_4-103747_2-103890_1&klogid=1360969037']
			}
		},
		onLoad() {
			this.getInform();
		},
		methods:{
			changeSec(idx){
				this.selectedSection=idx;
				//console.log(this.imageUrl)
			},
			videoPlay(index) {
				console.log(this.playIdx,index)
				if (this.playIdx !== NaN) {
					console.log(`暂停上一个下标为${this.playIdx}的视频`);
					let videoContext  = uni.createVideoContext(`video${this.playIdx}`)
					videoContext.pause()
				}
				this.playIdx = index
				this.$forceUpdate()
			},
			videoPause(index){
				if (this.playIdx === index) {
					console.log(`暂停当前下标为${this.playIdx}的视频`);
					let videoContext  = uni.createVideoContext(`video${this.playIdx}`)
					videoContext.pause()
					this.playIdx = NaN
					return;
				}
			},
			getInform(){
				uni.request({
					url:"",//后端接口
					method:"GET",
					success: (res) => {
						console.log(res)
						//将信息存入imageUrl、videoUrl
						
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: pink;
	}
	.videos{
		width: 100%;
		border-radius: 12rpx;
	}
	.imgs{
		width: 100%;
		border-radius: 12rpx;
	}
	.Nav{
		margin: 1rpx;
		padding: auto;
		display: flex;
		z-index: 9;
	}
	.section{
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		width: 375rpx;
	}
	.selectedSec{
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		width: 375rpx;
		color: deeppink;
		border-bottom: 2rpx solid deeppink;
	}
</style>