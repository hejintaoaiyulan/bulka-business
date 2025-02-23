"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_input2 + _easycom_uv_button2)();
}
const _easycom_uv_input = () => "../../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "add-exchange",
  setup(__props) {
    const handleToChoose = () => {
      common_vendor.index.navigateTo({
        url: "/pages/manages/exchange/choose-exchange"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          placeholder: "請輸入活動名稱",
          border: false,
          ["input-align"]: "right",
          fontSize: "26rpx"
        }),
        b: common_vendor.p({
          placeholder: "請輸入最低參與金額",
          border: false,
          ["input-align"]: "right",
          fontSize: "26rpx",
          type: "digit"
        }),
        c: common_vendor.o(handleToChoose),
        d: common_vendor.p({
          type: "primary",
          block: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c6c503fc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/exchange/add-exchange.js.map
