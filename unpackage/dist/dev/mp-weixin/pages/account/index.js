"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  _easycom_uv_avatar2();
}
const _easycom_uv_avatar = () => "../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
if (!Math) {
  _easycom_uv_avatar();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      size: 60,
      shape: "square",
      src: "https://img.yzcdn.cn/vant/apple-3.jpg"
    }),
    b: common_vendor.p({
      text: "資料",
      size: 40
    }),
    c: common_vendor.p({
      text: "資料",
      size: 40
    }),
    d: common_vendor.p({
      text: "資料",
      size: 40
    }),
    e: common_vendor.p({
      text: "資料",
      size: 40
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3c1b446f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/account/index.js.map
