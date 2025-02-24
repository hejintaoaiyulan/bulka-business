<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import "static/font/iconfont.css";
	/*每个页面公共css */

view, scrollview, text {
  box-sizing: border-box;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.safe-pb {
  padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);
}

.red-text {
  color: #ef4444;
}

.flex-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
