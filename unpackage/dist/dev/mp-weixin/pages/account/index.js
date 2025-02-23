"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  _easycom_uv_avatar2();
}
const _easycom_uv_avatar = () => "../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
if (!Math) {
  _easycom_uv_avatar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const handleToRoute = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    return (_ctx, _cache) => {
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
        c: common_vendor.o(($event) => handleToRoute("/pages/account/account-info")),
        d: common_vendor.p({
          text: "資料",
          size: 40
        }),
        e: common_vendor.p({
          text: "資料",
          size: 40
        }),
        f: common_vendor.o(($event) => handleToRoute("/pages/account/helper")),
        g: common_vendor.p({
          text: "資料",
          size: 40
        }),
        h: common_vendor.o(($event) => handleToRoute("/pages/settings/index"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3c1b446f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/account/index.js.map
