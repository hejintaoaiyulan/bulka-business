"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_radio2 = common_vendor.resolveComponent("uv-radio");
  const _easycom_uv_radio_group2 = common_vendor.resolveComponent("uv-radio-group");
  const _easycom_uv_switch2 = common_vendor.resolveComponent("uv-switch");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_input2 + _easycom_uv_radio2 + _easycom_uv_radio_group2 + _easycom_uv_switch2 + _easycom_uv_button2)();
}
const _easycom_uv_input = () => "../../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_radio = () => "../../../uni_modules/uv-radio/components/uv-radio/uv-radio.js";
const _easycom_uv_radio_group = () => "../../../uni_modules/uv-radio/components/uv-radio-group/uv-radio-group.js";
const _easycom_uv_switch = () => "../../../uni_modules/uv-switch/components/uv-switch/uv-switch.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_radio + _easycom_uv_radio_group + _easycom_uv_switch + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "add-goods",
  setup(__props) {
    const formData = common_vendor.ref({
      mode: "single",
      value1: true,
      value2: true
    });
    const single = common_vendor.computed(() => {
      return formData.value.mode === "single";
    });
    const handleToSetSpecification = () => {
      common_vendor.index.navigateTo({
        url: "/pages/manages/goods/specification"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          inputAlign: "right",
          border: false,
          placeholder: "請輸入商品名稱",
          fontSize: "26rpx"
        }),
        b: common_vendor.p({
          inputAlign: "right",
          fontSize: "26rpx",
          border: false,
          placeholder: "請輸入商品名稱"
        }),
        c: single.value
      }, single.value ? {
        d: common_vendor.p({
          name: "single",
          label: "單規格"
        }),
        e: common_vendor.p({
          name: "multiple",
          label: "多規格"
        }),
        f: common_vendor.o(($event) => formData.value.mode = $event),
        g: common_vendor.p({
          ["custom-style"]: "display: flex; justify-content: flex-end; gap: 20rpx",
          modelValue: formData.value.mode
        }),
        h: common_vendor.p({
          placeholder: "請輸入商品庫存",
          border: false,
          ["input-align"]: "right",
          fontSize: "26rpx"
        }),
        i: common_vendor.p({
          placeholder: "請輸入商品原價",
          type: "digit",
          border: false,
          ["input-align"]: "right",
          fontSize: "26rpx"
        }),
        j: common_vendor.p({
          placeholder: "請輸入商品售價",
          type: "digit",
          border: false,
          ["input-align"]: "right",
          fontSize: "26rpx"
        })
      } : {
        k: common_vendor.p({
          name: "single",
          label: "單規格"
        }),
        l: common_vendor.p({
          name: "multiple",
          label: "多規格"
        }),
        m: common_vendor.o(($event) => formData.value.mode = $event),
        n: common_vendor.p({
          ["custom-style"]: "display: flex; justify-content: flex-end; gap: 20rpx",
          modelValue: formData.value.mode
        }),
        o: common_vendor.o(handleToSetSpecification)
      }, {
        p: common_vendor.p({
          placeholder: "請輸入商品折扣",
          type: "digit",
          border: false,
          ["input-align"]: "right",
          fontSize: "26rpx"
        }),
        q: common_vendor.o(($event) => formData.value.value1 = $event),
        r: common_vendor.p({
          modelValue: formData.value.value1
        }),
        s: common_vendor.o(($event) => formData.value.value2 = $event),
        t: common_vendor.p({
          modelValue: formData.value.value2
        }),
        v: common_vendor.p({
          placeholder: "請輸入商品順序",
          type: "digit",
          border: false,
          ["input-align"]: "right",
          fontSize: "26rpx"
        }),
        w: common_vendor.p({
          type: "primary"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6b283fb5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/goods/add-goods.js.map
