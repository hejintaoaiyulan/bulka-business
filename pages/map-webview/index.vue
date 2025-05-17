<template>
	<view class="container" v-if="webUrl">
		<web-view :src="webUrl" @message="onMessage" @postMessage="onMessage" />
	</view>
</template>

<script>
	import {
		BaseUrl
	} from "@/api";

	export default {
		data() {
			return {
				webUrl: '' // ✅ 使用远程链接
			}
		},
		mounted() {
			// this.webUrl = 'https://uniapp.dcloud.io/static/web-view.html'
			uni.getLocation({
				success: (res) => {
					// this.webUrl = `http://192.168.31.115:5500/google-location.html?lat=${res.latitude}&lng=${res.longitude}`
					this.webUrl = `${BaseUrl}/google-location.html?lat=${res.latitude}&lng=${res.longitude}`
          // this.webUrl = 'https://uniapp.dcloud.io/static/web-view.html'
				}
			})
		},
		methods: {
			onMessage(e) {
				console.log(e)
				const data = e.detail.data[0]
				console.log('收到位置坐标:', data)
				// uni.showToast({
				// 	title: `纬度:${data.lat}, 经度:${data.lng}`,
				// 	icon: 'none'
				// })
				uni.$emit('setLocationData', data)
				uni.navigateBack()
				// TODO: 你可以把数据传回前一个页面、存储、发请求等
			}
		}
	}
</script>

<style>
	.container {
		height: 100%;
	}
</style>