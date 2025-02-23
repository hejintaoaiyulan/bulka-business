"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "add-promotion"
};
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      placeholder: "請輸入活動名稱",
      border: false,
      ["input-align"]: "right",
      fontSize: "26rpx"
    }),
    b: common_vendor.p({
      type: "primary",
      block: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3b84a557"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/promotions/add-promotion.js.map
