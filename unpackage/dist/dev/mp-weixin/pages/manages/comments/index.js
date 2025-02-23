"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  const _easycom_uv_rate2 = common_vendor.resolveComponent("uv-rate");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_tabs2 + _easycom_uv_avatar2 + _easycom_uv_rate2 + _easycom_uv_button2)();
}
const _easycom_uv_tabs = () => "../../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_avatar = () => "../../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
const _easycom_uv_rate = () => "../../../uni_modules/uv-rate/components/uv-rate/uv-rate.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_tabs + _easycom_uv_avatar + _easycom_uv_rate + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const tabs = common_vendor.ref([
      {
        name: "全部",
        key: 1
      },
      {
        name: "有圖",
        key: 2,
        badge: {
          value: 99
        }
      },
      {
        name: "好評",
        key: 3,
        badge: {
          value: 99
        }
      },
      {
        name: "中評",
        key: 4,
        badge: {
          value: 99
        }
      },
      {
        name: "差評",
        key: 5,
        badge: {
          value: 99
        }
      }
    ]);
    const handleReply = () => {
      common_vendor.index.navigateTo({
        url: "/pages/manages/comments/reply-comment"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: tabs.value,
          ["line-color"]: "#c74336",
          scrollable: false
        }),
        b: common_vendor.p({
          src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          size: 30
        }),
        c: common_vendor.p({
          count: 5
        }),
        d: common_vendor.o(handleReply),
        e: common_vendor.p({
          size: "normal"
        }),
        f: common_vendor.p({
          src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          size: 30
        }),
        g: common_vendor.p({
          count: 5
        }),
        h: common_vendor.p({
          size: "normal"
        }),
        i: common_vendor.p({
          src: "https://img.yzcdn.cn/vant/apple-1.jpg",
          size: 30
        }),
        j: common_vendor.p({
          count: 5
        }),
        k: common_vendor.p({
          size: "normal"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9d9beb1d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/comments/index.js.map
