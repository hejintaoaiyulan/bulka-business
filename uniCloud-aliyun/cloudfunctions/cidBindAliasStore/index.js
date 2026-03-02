'use strict';
const uniPush = uniCloud.getPushManager({ appId: "__UNI__12D0337" })
exports.main = async (event) => {
	let queryStringParameters = JSON.parse(event.body) || {}

	let aliasList = queryStringParameters.aliasList
	const res = await uniPush.cidBindAlias(aliasList)
	return res;
};