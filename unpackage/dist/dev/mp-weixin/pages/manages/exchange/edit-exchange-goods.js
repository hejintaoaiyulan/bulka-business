"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_number_box2 = common_vendor.resolveComponent("uv-number-box");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_input2 + _easycom_uv_number_box2 + _easycom_uv_button2)();
}
const _easycom_uv_input = () => "../../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_number_box = () => "../../../uni_modules/uv-number-box/components/uv-number-box/uv-number-box.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_number_box + _easycom_uv_button)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      placeholder: "請輸入換購價格(HK$)",
      border: false,
      ["input-align"]: "right",
      fontSize: "26rpx",
      type: "digit"
    }),
    b: common_vendor.p({
      step: 1
    }),
    c: common_vendor.p({
      step: 1
    }),
    d: common_vendor.p({
      type: "primary"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8b8efbf5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/exchange/edit-exchange-goods.js.map
