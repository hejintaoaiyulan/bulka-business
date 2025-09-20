<script setup>
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import dayjs from "dayjs";
import {useUserStore} from "./model/user";
import {onLaunch} from '@dcloudio/uni-app'
import {useWebSocket} from "@/hooks";
import {baseUrl} from "@/api";
import {onMounted, onUnmounted, nextTick} from 'vue'
import {bindClientId} from "@/api/public";
import {useSystemConfig} from "@/model/system";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
// 初始化音頻播放器
const audio = uni.createInnerAudioContext()
// #ifdef MP-WEIXIN
audio.obeyMuteSwitch = false
// #endif
audio.src = '/static/order_bg.mp3'
audio.autoplay = false
audio.onError(err => {
  console.log(err, 'play error')
})

const playAudio = () => {
  audio.stop() // 先停止可能的上一段
  audio.seek(0)
  audio.play()
}

const {send, connect} = useWebSocket(`${baseUrl.replace(/^https?:\/\//, 'ws://')}:7272/store/index/bindws`, {
  autoConnect: true,
  method: 'POST',
  onMessage: (res) => {
    let data = res
    try {
      data = JSON.parse(res)
    } catch (err) {
      // console.warn('非JSON消息:', res)
    }
    if (data.client_id) {
      bindClientId({
        client_id: data.client_id,
      }).then(res => {
        if (res.data.result === 1) {
          console.log('綁定客戶端ID成功:', data.client_id)
        } else {
          console.error('綁定客戶端ID失敗:', res.data.message)
        }
      })
    }
    // 播放條件：type !== 'ping'
    if (data.type !== 'ping' && data.type !== 'init') {
      console.log('📩 播放音頻，因為收到消息:', data)
      nextTick(() => {
        playAudio()
      })
    }
  },
  onOpen: () => {
    console.log('WebSocket 已連接')
  },
  onClose: () => {
    console.log('WebSocket 已斷開')
  },
  onError: (err) => {
    console.error('WebSocket 出錯:', err)
  }
})

onUnmounted(() => {
  if (audio) audio.destroy()
})

const userStore = useUserStore()
const systemStore = useSystemConfig()

onLaunch(() => {
  userStore.getInfo()
  systemStore.getSystemConfig()
})
</script>

<style lang="scss">
@import "static/font/iconfont.css";
/*每個頁面公共css */

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
