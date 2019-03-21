import {forEach} from 'lodash';

const defaultHeaders = {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json'
};

export function doFetch(url, options = {}) {
	var request;

	if (typeof url === 'string') {
		request = new Request(url, options || {});
		forEach(defaultHeaders, (value, key) => {
			if (!(options.headers && options.headers[key])) {
				request.headers.set(key, defaultHeaders[key]);
			}
		});
	} else {
		request = url;
		forEach(defaultHeaders, (value, key) => {
			if (!(options.headers && options.headers[key])) {
				request.headers.set(key, defaultHeaders[key]);
			}
		});
	}

	return fetch(request).then((response) => {
		return response.json();
	}).catch(console.log);
}
