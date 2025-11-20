<script setup>
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import dayjs from "dayjs";
import { useUserStore } from "./model/user";
import { onLaunch, onShow } from "@dcloudio/uni-app";
import { useWebSocket } from "@/hooks";
import { baseUrl } from "@/api";
import {onUnmounted, nextTick, onMounted, ref} from "vue";
import { bindClientId } from "@/api/public";
import { useSystemConfig } from "@/model/system";


dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
// 初始化音頻播放器
const audio = uni.createInnerAudioContext();
// #ifdef MP-WEIXIN
audio.obeyMuteSwitch = false;
// #endif
audio.src = "/static/order_bg.mp3";
audio.autoplay = false;
audio.onError((err) => {
  console.log(err, "play error");
});

const playAudio = () => {
  audio.stop(); // 先停止可能的上一段
  audio.seek(0);
  audio.play();
};

const dataClientId = ref('')
// 綁定客戶端ID
const bindClient = () => {
  bindClientId({
    client_id: dataClientId.value,
  }).then((res) => {
    if (res.data.result === 1) {
      console.log("綁定客戶端ID成功:", dataClientId.value);
    } else {
      console.error("綁定客戶端ID失敗:", res.data.message);
    }
  });
}

const { send, connect, close } = useWebSocket(
  `${baseUrl.replace(/^https?:\/\//, "ws://")}:7272/store/index/bindws`,
  {
    autoConnect: true,
    method: "POST",
    onMessage: (res) => {
      let data = res;
      try {
        data = JSON.parse(res);
      } catch (err) {
        // console.warn('非JSON消息:', res)
      }
      if (data.client_id) {
        dataClientId.value = data.client_id
        bindClient()
      }
      // 播放條件：type !== 'ping'
      if (data.type !== "ping" && data.type !== "init" && data.type !== 'create_order') {
        console.log("📩 播放音頻，因為收到消息:", data);
        nextTick(() => {
          playAudio();
        });
      }
      if(data.type === 'create_order'){
        uni.$emit('newOrder', data)
      }
	  console.log(data)
    },
    onOpen: () => {
      console.log("WebSocket 已連接");
    },
    onClose: () => {
      console.log("WebSocket 已斷開");
    },
    onError: (err) => {
      console.error("WebSocket 出錯:", err);
    },
  }
);

onMounted(() => {
  uni.$on('closeWebSocket', () => {
    close(1);
  });
  uni.$on('connectWebSocket', () => {
    console.log('收到連接WebSocket事件');
    connect();
    bindClient()
  });
})

onUnmounted(() => {
  if (audio) audio.destroy();
  uni.$off('closeWebSocket');
  uni.$off('connectWebSocket');
});

const userStore = useUserStore();
const systemStore = useSystemConfig();

onShow(() => {
  connect()
})

onLaunch(() => {
  // #ifdef APP-PLUS
  plus.runtime.setBadgeNumber(0); //清除app角标
  // #endif
  userStore.getInfo();
  systemStore.getSystemConfig();
  // connect()
});
</script>

<style lang="scss">
@import "static/font/iconfont.css";
/*每個頁面公共css */

view,
scrollview,
text {
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
