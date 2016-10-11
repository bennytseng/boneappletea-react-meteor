import { BrowserPolicy } from 'meteor/browser-policy-common';
// e.g., BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
BrowserPolicy.content.allowDataUrlForAll()
BrowserPolicy.content.allowInlineScripts();
BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
BrowserPolicy.content.allowOriginForAll('maps.gstatic.com');
BrowserPolicy.content.allowEval('https://ajax.googleapis.com');
