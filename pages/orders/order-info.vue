<script setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref, computed } from "vue";
import { AcceptOrder, cancelOrder, getOrderDetail, ServingFood } from "../../api/order";
import { OrderStatusText } from "../../utils/fields";
import UvButton from "../../uni_modules/uv-button/components/uv-button/uv-button.vue";
import { scanCodeByOrder, showModal, Toast } from "../../utils";

let option = {};
const info = ref({});

onLoad((query) => {
  option = query;
});

onShow(() => {
  getInfo();
});

const getInfo = () => {
  getOrderDetail({ order_no: option.order_no }).then((res) => {
    info.value = res.data || {};
  });
};

const handleConnect = () => {
  if (info.value.user?.mobile) {
    uni.makePhoneCall({
      phoneNumber: info.value.user?.mobile,
    });
  }
};

const freebies = computed(() => {
  return (
    info.value.goods_list?.reduce((t, c) => {
      if (c.freebies) {
        t.push(c.freebies);
      }
      return t;
    }, []) || []
  );
});

const handleServingFood = () => {
  // 出餐
  showModal("是否確定出餐")
    .then(() => {
      ServingFood({ order_no: info.value.order_no }).then(() => {
        getInfo();
      });
    })
    .catch(() => {});
};

const handleAccept = () => {
  // 接單
  showModal("是否確定接單").then(() => {
    AcceptOrder({ order_no: info.value.order_no }).then(() => {
      getInfo();
    });
  });
};

const handleCancel = () => {
  // 取消訂單
  showModal("是否確定取消訂單").then(() => {
    cancelOrder({ order_no: info.value.order_no }).then(() => {
      getInfo();
    });
  });
};

const handleScanCode = () => {
  scanCodeByOrder().then(() => {
    Toast.success("掃碼成功");
    getInfo();
  });
};
</script>

<template>
  <view class="container">
    <view class="content">
      <view class="card">
        <view class="title">
          <view class="status-text">{{ $t(info.status_txt) }}</view>

          <view class="result" v-if="info.status === 4">
            <uv-button size="small" @click="handleScanCode">{{ $t("掃碼取餐") }}</uv-button>
          </view>
        </view>
        <view class="sub-title">{{ $t(OrderStatusText.map.get(info.status)) }}</view>
      </view>

      <view class="card">
        <view class="title">{{ $t("客戶信息") }}</view>
        <view class="user-content">
          <view class="user">
            <uv-avatar :size="30" :src="info.user?.avatar" />
            <text>{{ info.user?.nickname }}</text>
          </view>
          <view class="mobile">{{ info.user?.mobile }}</view>
        </view>
        <view class="call">
          <view class="call-button" @click="handleConnect"
            >{{ $t("聯繫客戶") }}
            <view class="iconfont icon-dianhua"></view>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="title">{{ $t("餐品詳情") }}</view>
        <view class="order-content" v-for="goods in info.goods_list" :key="goods.goods_id">
          <view class="order-single-msg">
            <view class="order-img">
              <image
                :src="goods.goods_image"
                mode="aspectFit"
                style="width: 100rpx; height: 100rpx"
              />
            </view>
            <view class="order-msg">
              <view class="order-title">{{ goods.goods_name }}</view>
              <view class="order-tip">
                {{ goods.goods_spec_name }}
              </view>
            </view>
          </view>
          <view class="price-msg">
            <view class="price">HK$ {{ goods.all_sale_price }}</view>
            <view class="count">{{ $t("共") }}{{ goods.num }}{{ $t("件") }}</view>
          </view>
        </view>

        <template v-if="freebies.length">
          <view class="title">{{ $t("贈品") }}</view>
          <view class="gift-item" v-for="(gift, index) in freebies" :key="index">
            <view class="gift-img">
              <image
                :src="gift.freebies_image"
                mode="aspectFit"
                style="width: 90rpx; height: 90rpx"
              />
            </view>
            <view class="gift-content">
              <view class="gift-title">{{ gift.freebies_name }}</view>
              <view class="gift-count">* {{ gift.freebies_num }}</view>
            </view>
          </view>
        </template>

        <view class="form-item" style="margin-top: 20rpx">
          <view class="form-label">{{ $t("費用合計") }}</view>
          <view class="form-value red-text"> HK$ {{ info.price }} </view>
        </view>
        <view class="form-item">
          <view class="form-label">{{ $t("訂單備註") }}</view>
          <view class="form-value">
            <text class="placeholder">{{ $t(info.mark || "無備注") }}</text>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="title">{{ $t("訂單信息") }}</view>
        <view class="form-item">
          <view class="form-label">{{ $t("訂單編號") }}</view>
          <view class="form-value">{{ info.order_no }}</view>
        </view>
        <view class="form-item">
          <view class="form-label">{{ $t("下單時間") }}</view>
          <view class="form-value">{{ info.createtime }}</view>
        </view>
        <view class="form-item">
          <view class="form-label">{{ $t("費用合計") }}</view>
          <view class="form-value">HK$ {{ info.price }}</view>
        </view>
        <view class="form-item">
          <view class="form-label">{{ $t("支付方式") }}</view>
          <view class="form-value">{{ $t(info.pay_type_txt) }}</view>
        </view>
        <view class="form-item" v-if="info.pay_time">
          <view class="form-label">
            <text>{{ $t("支付時間") }}</text>
          </view>
          <view class="form-value">
            <text>{{ info.pay_time }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="submit-button flex-right safe-pb">
      <uv-button size="small" v-if="[1, 2, 3, 4].includes(info.status)" @click="handleCancel">{{
        $t("取消訂單")
      }}</uv-button>
      <uv-button size="small" v-if="info.status === 2" @click="handleAccept">{{
        $t("接單")
      }}</uv-button>
      <uv-button size="small" v-if="info.status === 3" @click="handleServingFood">{{
        $t("確認出餐")
      }}</uv-button>
      <uv-button size="small" v-if="info.status === 4" @click="handleConnect">{{
        $t("聯繫客戶領取")
      }}</uv-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}

.gift-item {
  display: flex;
  column-gap: 20rpx;
  font-size: 26rpx;
  align-items: center;

  .gift-count {
    color: #666;
  }
}

.user-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

  .user {
    display: flex;
    align-items: center;
    column-gap: 8rpx;
    font-size: 26rpx;
  }

  .mobile {
    font-size: 26rpx;
    color: #333;
  }
}

.call {
  margin-top: 20rpx;
}

.call-button {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10rpx;
  font-size: 28rpx;

  .iconfont {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #a5adb3;
    color: #fff;
  }
}

.container {
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20rpx;
}

.submit-button {
  padding-top: 20rpx;
  padding-right: 20rpx;
  padding-left: 20rpx;
  flex: none;
  column-gap: 20rpx;
  background-color: #fff;
}

.card {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;

  .title {
    display: flex;
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20rpx;

    .status-text {
      color: #333;
      font-size: 28rpx;
    }

    .result {
      color: #333;
      font-size: 28rpx;
    }
  }

  .sub-title {
    color: #999;
    font-size: 24rpx;
    margin-top: 20rpx;
  }
}

.order-content {
  display: flex;
  column-gap: 50rpx;
  margin-bottom: 20rpx;
}

.order-single-msg {
  display: flex;
  column-gap: 20rpx;
  flex: 1;

  .order-img {
    border-radius: 10rpx;
  }

  .order-tip {
    color: #999;
    font-size: 24rpx;
  }
}

.order-title {
  font-size: 28rpx;
}

.price-msg {
  font-size: 26rpx;
  white-space: nowrap;
  flex: none;

  .price {
    color: #c74336;
  }

  .count {
    color: #999;
    font-size: 24rpx;
  }
}

.form-item {
  padding: 10rpx 0;
  font-size: 28rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20rpx;
}

.form-label {
  flex: none;
}

.form-value {
  font-size: 26rpx;
  flex: 1;
  text-align: right;
}

.placeholder {
  color: #888888;
  font-size: 26rpx;
  padding: 12rpx 22rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .iconfont {
    font-size: 24rpx;
    color: #666;
  }
}

.operation-item {
  :global(.uv-button) {
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>
