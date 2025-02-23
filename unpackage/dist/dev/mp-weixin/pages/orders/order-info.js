"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_avatar2 + _easycom_uv_button2)();
}
const _easycom_uv_avatar = () => "../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_avatar + _easycom_uv_button)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      size: 30,
      src: "https://img.yzcdn.cn/vant/apple-1.jpg"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-da433ca1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orders/order-info.js.map
