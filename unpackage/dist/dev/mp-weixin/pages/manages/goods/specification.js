"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_radio2 = common_vendor.resolveComponent("uv-radio");
  const _easycom_uv_radio_group2 = common_vendor.resolveComponent("uv-radio-group");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  (_easycom_uv_navbar2 + _easycom_uv_input2 + _easycom_uv_radio2 + _easycom_uv_radio_group2 + _easycom_uv_button2 + _easycom_uv_popup2)();
}
const _easycom_uv_navbar = () => "../../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_input = () => "../../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_radio = () => "../../../uni_modules/uv-radio/components/uv-radio/uv-radio.js";
const _easycom_uv_radio_group = () => "../../../uni_modules/uv-radio/components/uv-radio-group/uv-radio-group.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_popup = () => "../../../uni_modules/uv-popup/components/uv-popup/uv-popup.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_input + _easycom_uv_radio + _easycom_uv_radio_group + _easycom_uv_button + _easycom_uv_popup)();
}
const _sfc_main = {
  __name: "specification",
  setup(__props) {
    const popUp = common_vendor.ref();
    const formData = common_vendor.ref({
      mode: "single"
    });
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const handleAddItem = () => {
      var _a;
      (_a = popUp.value) == null ? void 0 : _a.open();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          title: "设置商品规格",
          fixed: true,
          ["bg-color"]: "#000000",
          ["title-style"]: "color: #fff",
          safeAreaInsetTop: true,
          placeholder: true,
          ["left-icon-color"]: "#fff"
        }),
        c: common_vendor.p({
          inputAlign: "right",
          border: false,
          placeholder: "請輸入規格名称",
          fontSize: "26rpx"
        }),
        d: common_vendor.p({
          name: "multiple",
          label: "是"
        }),
        e: common_vendor.p({
          name: "single",
          label: "否"
        }),
        f: common_vendor.o(($event) => formData.value.mode = $event),
        g: common_vendor.p({
          ["custom-style"]: "display: flex; justify-content: flex-end; gap: 20rpx",
          modelValue: formData.value.mode
        }),
        h: common_vendor.o(handleAddItem),
        i: common_vendor.p({
          inputAlign: "right",
          border: false,
          placeholder: "請輸入規格名称",
          fontSize: "26rpx"
        }),
        j: common_vendor.p({
          name: "multiple",
          label: "是"
        }),
        k: common_vendor.p({
          name: "single",
          label: "否"
        }),
        l: common_vendor.o(($event) => formData.value.mode = $event),
        m: common_vendor.p({
          ["custom-style"]: "display: flex; justify-content: flex-end; gap: 20rpx",
          modelValue: formData.value.mode
        }),
        n: common_vendor.p({
          type: "primary"
        }),
        o: common_vendor.p({
          placeholder: "輸入規格項名稱"
        }),
        p: common_vendor.p({
          placeholder: "輸入原價（HK$）"
        }),
        q: common_vendor.p({
          placeholder: "輸入售價（HK$）"
        }),
        r: common_vendor.p({
          placeholder: "輸入庫存數量"
        }),
        s: common_vendor.p({
          type: "primary"
        }),
        t: common_vendor.sr(popUp, "d952d24a-10", {
          "k": "popUp"
        }),
        v: common_vendor.p({
          mode: "bottom"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d952d24a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/goods/specification.js.map
