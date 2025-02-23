"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_input2 + _easycom_uv_tabs2 + _easycom_uv_button2)();
}
const _easycom_uv_input = () => "../../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_tabs = () => "../../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_tabs + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const list = [
      {
        name: "全部",
        id: 1
      },
      {
        name: "上架",
        id: 2
      },
      {
        name: "下架",
        id: 3
      }
    ];
    common_vendor.onReachBottom(() => {
      common_vendor.index.__f__("log", "at pages/manages/goods/index.vue:20", "触底了");
    });
    const handleAddGoods = () => {
      common_vendor.index.navigateTo({
        url: "/pages/manages/goods/add-goods"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          placeholder: "請輸入商品名稱",
          prefixIcon: "search",
          fontSize: "28rpx",
          border: false
        }),
        b: common_vendor.p({
          list,
          ["line-color"]: "#c74336",
          scrollable: false
        }),
        c: common_vendor.o(handleAddGoods),
        d: common_vendor.p({
          type: "primary"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c17dd06e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/goods/index.js.map
