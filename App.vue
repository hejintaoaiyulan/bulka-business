<script setup>
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import dayjs from "dayjs";
import {useUserStore} from "./model/user";
import { onLaunch } from '@dcloudio/uni-app'

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const userStore = useUserStore()

onLaunch(() => {
  userStore.getInfo()
})
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

.rotate-loading {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
