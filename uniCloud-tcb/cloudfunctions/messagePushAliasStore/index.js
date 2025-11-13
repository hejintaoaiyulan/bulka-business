'use strict';
const uniPush = uniCloud.getPushManager({ appId: "__UNI__12D0337" })
exports.main = async (event) => {
	let queryStringParameters = JSON.parse(event.body) || event.queryStringParameters || {}
	let params = {
		"getui_alias": queryStringParameters.getui_alias,
		"title": queryStringParameters.title,
		"content": queryStringParameters.content,
		"payload": JSON.parse(queryStringParameters.payload),
		"badge": "+1",
	}
	if (queryStringParameters.force_notification == 1) {
		params.force_notification = true
	}
	// let params = {
	// 	"push_clientid": "e8fedd140696c095648b814a57f8a1af", //填写上一步在uni-app客户端获取到的客户端推送标识push_clientid
	// 	"title": "通知栏显示的标题",
	// 	"content": "通知栏显示的内容",
	// 	"payload": {
	// 		"text": "体验一下uni-push2.0"
	// 	}
	// }

	const res = await uniPush.sendMessage(params)
	return res;
};