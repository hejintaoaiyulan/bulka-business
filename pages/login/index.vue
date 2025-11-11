<script setup>
import { ref } from "vue";
import { Regs } from "../../globalConfig";
import { Login } from "../../api/login";
import { setToken } from "../../utils";
import { useUserStore } from "../../model/user";
import { onLoad } from "@dcloudio/uni-app";

const userStore = useUserStore();
const formData = ref({
  mobile: "",
  password: "",
  prefix: "852",
});

const pageQuery = ref({
  from: "",
});
onLoad((query = {}) => {
  pageQuery.value = query;
});

const handleToPassword = () => {
  uni.navigateTo({
    url: "/pages/login/reset-pwd",
  });
};

const handleRegister = () => {
  uni.navigateTo({
    url: "/pages/register/index",
  });
};

const handleLogin = () => {
  if (!Regs.mobile.test(formData.value.mobile)) {
    uni.showToast({
      title: "請輸入正確的手機號",
      icon: "none",
    });
    return;
  }
  if (!formData.value.password) {
    uni.showToast({
      title: "請輸入密碼",
      icon: "none",
    });
    return;
  }
  // #ifdef APP
  uni.getPushClientId({
    success: (res) => {
      // Toast.info(res.cid);
      console.log(res, 99999); //看下这处有没有执行 执行的cid是多少 真机跑下
      handleLogin2(res.cid);
    },
    fail(err) {
      // Toast.info(err);
      handleLogin2("");
    },
  });
  // #endif
};
const handleLogin2 = (cid) => {
  Login({ ...formData.value, prefix: formData.value.prefix, push_clientid: cid })
    .then(async (res) => {
      const { access_token, check_status, token_type, expires_in } = res.data || {};
      setToken(access_token, expires_in);
      uni.setStorageSync("token_type", token_type);
      userStore.getInfo();
      uni.$emit('connectWebSocket')
      if (check_status !== 4) {
        uni.navigateTo({
          url: "/pages/register/set-info",
        });
      } else if (check_status) {
        uni.reLaunch({
          url: "/pages/index/index",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // uni.redirectTo({
  //   url: '/pages/index/index'
  // })
};

const handleVisitorLogin = () => {
  userStore.setVisitorModal(true);
};
</script>

<template>
  <view class="container">
    <!--    <view class="header">-->
    <!--      <text>登錄</text>-->
    <!--    </view>-->
    <uv-navbar
      title="登錄"
      title-style="color: #fff"
      bg-color="black"
      :fixed="false"
      placeholder
      left-icon-color="#fff"
      :left-icon="!!pageQuery.from ? 'arrow-left' : ''"
      @left-click="uni.navigateBack({})"
    />
    <view class="content">
      <view class="form">
        <view class="form-item">
          <view class="form-label">
            <view class="iconfont icon-zhanghaozhongxinzhanghaoguanli"></view>
            <view class="label-text">賬號</view>
          </view>
          <view class="form-value" style="display: flex; column-gap: 10rpx; align-items: center">
            <uv-input
              placeholder="請輸入區號"
              v-model="formData.prefix"
              custom-style="width: 150rpx; flex: none"
            >
              <template v-slot:prefix>
                <uv-text text="+" margin="0 3px 0 0" type="tips"></uv-text>
              </template>
            </uv-input>
            <uv-input placeholder="請輸入手機號" v-model="formData.mobile"></uv-input>
          </view>
        </view>
        <view class="form-item">
          <view class="form-label">
            <view class="iconfont icon-mima"></view>
            <view class="label-text">密碼</view>
          </view>
          <view class="form-value">
            <uv-input
              placeholder="請輸入密碼"
              type="password"
              v-model="formData.password"
            ></uv-input>
          </view>
        </view>
        <view class="form-item">
          <view class="form-value flex-right">
            <view class="tips" @click="handleToPassword">忘記密碼?</view>
          </view>
        </view>
      </view>

      <view class="submit-button">
        <uv-button
          custom-style="background: black; color: #fff"
          :hairline="false"
          @click="handleLogin"
          >登錄</uv-button
        >
        <view class="register" @click="handleRegister">去註冊</view>
        <view class="register" @click="handleVisitorLogin">遊客登錄</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.header {
  background-color: #000;
  color: #fff;
  font-size: 60rpx;
  font-weight: bold;
  padding: 30rpx;
  padding-bottom: 50rpx;
}

.content {
  background-color: #fff;
  padding: 30rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  margin-top: -20rpx;
}

.form {
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
  margin-top: 30rpx;

  .form-item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 30rpx;

    .form-label {
      .iconfont {
        font-size: 50rpx;
        color: #000;
      }

      display: flex;
      margin-bottom: 20rpx;
      align-items: center;
      column-gap: 10rpx;
      font-size: 30rpx;
      color: #999;
    }
  }
}

.flex-right {
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  margin-top: 60rpx;
}

.tips {
  color: #999;
  font-size: 24rpx;
}

.register {
  margin-top: 20rpx;
  color: #000;
  font-size: 28rpx;
  text-align: center;
}
</style>
