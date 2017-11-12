export function getJSONHeader() {
	return window.__token && window.__data.user.data.userId ? {
		headers: {
			Authorization: window.__token,
			User: window.__data.user.data.userId,
		},
	} : {};
}
