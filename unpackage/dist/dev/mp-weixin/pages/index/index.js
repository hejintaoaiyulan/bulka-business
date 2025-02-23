"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  _easycom_uv_navbar2();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
if (!Math) {
  _easycom_uv_navbar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const handleRight = () => {
    };
    const handleToCategory = () => {
      common_vendor.index.navigateTo({
        url: "/pages/manages/goods-category/index"
      });
    };
    const handleToRouter = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleRight),
        b: common_vendor.p({
          title: "",
          ["bg-color"]: "#000000",
          ["left-icon-color"]: "#ffffff",
          leftText: "店鋪詳情",
          safeAreaInsetTop: true,
          placeholder: true,
          fixed: true,
          leftIcon: ""
        }),
        c: common_vendor.o(handleToCategory),
        d: common_vendor.o(($event) => handleToRouter("/pages/manages/goods/index")),
        e: common_vendor.o(($event) => handleToRouter("/pages/manages/promotions/index")),
        f: common_vendor.o(($event) => handleToRouter("/pages/manages/exchange/index")),
        g: common_vendor.o(($event) => handleToRouter("/pages/manages/comments/index"))
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
