"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_tabs2 + _easycom_uv_avatar2 + _easycom_uv_button2)();
}
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_avatar = () => "../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_tabs + _easycom_uv_avatar + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const storeTab = [
      {
        name: "全部",
        key: 1
      },
      {
        name: "待支付",
        key: 2
      },
      {
        name: "待接單",
        key: 3
      },
      {
        name: "待出餐",
        key: 4
      },
      {
        name: "待取餐",
        key: 5
      },
      {
        name: "已完成",
        key: 6
      },
      {
        name: "已取消",
        key: 7
      }
    ];
    const topTab = common_vendor.ref([
      {
        name: "門店自取",
        key: 1
      },
      {
        name: "門店堂食",
        key: 2
      }
    ]);
    const tabs = common_vendor.ref(storeTab);
    const handleToInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/orders/order-info"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: topTab.value,
          scrollable: false,
          ["item-style"]: "background-color: #000;color: #fff; height: 90rpx",
          lineColor: "transparent",
          ["active-style"]: {
            color: "#fff"
          },
          ["inactive-style"]: {
            color: "#b4b4b4"
          }
        }),
        b: common_vendor.p({
          list: tabs.value,
          ["line-color"]: "#c74336"
        }),
        c: common_vendor.p({
          src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          size: 30
        }),
        d: common_vendor.p({
          type: "primary"
        }),
        e: common_vendor.p({
          type: "danger"
        }),
        f: common_vendor.o(handleToInfo),
        g: common_vendor.p({
          src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          size: 30
        }),
        h: common_vendor.p({
          type: "primary"
        }),
        i: common_vendor.p({
          type: "danger"
        }),
        j: common_vendor.p({
          src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          size: 30
        }),
        k: common_vendor.p({
          type: "primary"
        }),
        l: common_vendor.p({
          type: "danger"
        }),
        m: common_vendor.p({
          src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          size: 30
        }),
        n: common_vendor.p({
          type: "primary"
        }),
        o: common_vendor.p({
          type: "danger"
        }),
        p: common_vendor.p({
          src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          size: 30
        }),
        q: common_vendor.p({
          type: "primary"
        }),
        r: common_vendor.p({
          type: "danger"
        }),
        s: common_vendor.p({
          src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          size: 30
        }),
        t: common_vendor.p({
          type: "primary"
        }),
        v: common_vendor.p({
          type: "danger"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e1e6274e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orders/index.js.map
