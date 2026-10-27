<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "../../model/user";
import { useSystemConfig } from "@/model/system";
import { showModal } from "@/utils";

// import UvPicker from "../../uni_modules/uv-picker/components/uv-picker/uv-picker.vue";
import { $t } from "@/i18n-helper";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

const pickerRef = ref(null);
// picker选项，只填name显示，value存标识
const langList = ref([
  [
    { name: "中文", value: "zh-CN" },
    { name: "English", value: "en" },
  ],
]);
// 打开选择器
const openLangPicker = () => {
  pickerRef.value.open();
};

// 确认选择，返回下标数组
const onPickerConfirm = (e) => {
  const item = e.value[0];
  console.log(e);

  if (!item) return;
  locale.value = item.value;
  uni.setStorageSync("locale", item.value);
  console.log(item.value);
};

const userStore = useUserStore();
const systemStore = useSystemConfig();

const handleLogout = () => {
  uni.showModal({
    title: "提示",
    content: "確定要退出登錄嗎？",
    success: function (res) {
      if (res.confirm) {
        userStore.logOut();
      }
    },
  });
};

const hideItem = computed(() => {
  return systemStore.systemConfig?.hidden_on?.toString() === "1";
});

const handleDestroy = () => {
  showModal("確定注銷賬號嗎？").then((res) => {
    uni.showLoading({
      title: "請稍後",
    });
    setTimeout(() => {
      uni.showModal({
        title: "提示",
        content: "您的注銷申請已提交，請您耐心等待結果",
        showCancel: false,
      });
      uni.hideLoading();
    }, 500);
  });
};
</script>

<template>
  <view class="container">
    <uv-cell-group>
      <uv-cell
        title="賬戶安全中心"
        arrow-direction="right"
        :isLink="true"
        title-style="line-height: 90rpx"
        url="/pages/settings/account-safe"
      ></uv-cell>
      <uv-cell
        title="關於我們"
        arrow-direction="right"
        :isLink="true"
        title-style="line-height: 90rpx"
        url="/pages/protocol/index?name=aboutUs"
      ></uv-cell>
      <uv-cell
        title="常見問題"
        arrow-direction="right"
        :isLink="true"
        url="/pages/account/helper"
        title-style="line-height: 90rpx"
      ></uv-cell>
      <uv-cell
        title="版本資訊"
        arrow-direction="right"
        :isLink="true"
        title-style="line-height: 90rpx"
        url="/pages/protocol/index?name=version"
      ></uv-cell>
      <uv-cell
        title="反饋建議"
        url="/pages/feedback/index"
        arrow-direction="right"
        :isLink="true"
        title-style="line-height: 90rpx"
      ></uv-cell>

      <uv-cell
        title="語言設置"
        :value="locale === 'en' ? 'English' : '中文'"
        :is-link="true"
        value-style="font-size:30rpx;color:#999"
        @click="openLangPicker"
      ></uv-cell>
    </uv-cell-group>
    <view class="logout" v-if="!hideItem">
      <view class="logout-btn" @click="handleDestroy">
        <text>注銷賬號</text>
      </view>
    </view>
    <view class="logout-button" @click="handleLogout">
      <uv-button custom-style="background: black; color: #fff" size="large">安全退出登錄</uv-button>
    </view>

    <uv-picker
      ref="pickerRef"
      keyName="name"
      :columns="langList"
      title="请选择"
      @confirm="onPickerConfirm"
    />
  </view>
</template>

<style scoped lang="scss">
.logout {
  margin-top: 40rpx;
  display: flex;
  justify-content: center;
}

.logout-btn {
  padding: 20rpx;
  width: 80%;
  background-color: transparent;
  color: #000;
  font-size: 24rpx;
  border-radius: 50rpx;
  text-align: center;
}

.logout-button {
  margin-top: 110rpx;
  padding: 0 30rpx;
}
</style>
