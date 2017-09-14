// node-js-express-template/script.js

// To disable an eslint warning or error for an entire file, use this syntax: /* eslint no-alert: 0 */

// See https://stackoverflow.com/questions/34764287/turning-off-eslint-rule-for-a-specific-file

// If this file is loaded by index.html without using a route in server.js, the Web browser encounters the following error:
// - "The resource from “http://localhost:3000/script.js” was blocked due to MIME type mismatch (X-Content-Type-Options: nosniff)."

'use strict';

function getJSONRequest (url) {
	// This is essentially an augmented version of jQuery's AJAX $.getJSON()
	// See https://api.jquery.com/jquery.getjson/
	$.ajax({																	// eslint-disable-line no-undef

		dataType: 'json',
		url: url,
		success: function (result) {
			const message = 'getJSONRequest() sent to \'' + url + '\' succeeded; result is:';

			console.log(message, result);
			alert(message + ' ' + JSON.stringify(result));						// eslint-disable-line no-alert
		},
		error: function (error) {
			const message = 'getJSONRequest() sent to \'' + url + '\' failed; error is:';

			console.error(message, error.status, error.statusText);
			alert(message + ' ' + error.status + ' ' + error.statusText);		// eslint-disable-line no-alert
		}
	});
}

$('#btnClickMe').click(function () {		// eslint-disable-line no-undef
	console.log('#btnClickMe click');
	alert('Thanks.');						// eslint-disable-line no-alert
});

$('#btnJSONSuccess').click(function () {		// eslint-disable-line no-undef
	getJSONRequest('json');
});

$('#btnJSONFailure').click(function () {		// eslint-disable-line no-undef
	// getJSONRequest('servererror');
	getJSONRequest('teapot');
});
