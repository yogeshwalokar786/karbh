var mailchimp,mailchimp_cart,mailchimp_billing_email,mailchimp_username_email,mailchimp_registration_email,mailchimp_submitted_email=!1,mailchimpReady=function(e){/in/.test(document.readyState)?setTimeout("mailchimpReady("+e+")",9):e()};function mailchimpGetCurrentUserByHash(e){try{if(!mailchimp_public_data.allowed_to_set_cookies)return;var i=mailchimp_public_data.ajax_url+"?action=mailchimp_get_user_by_hash&hash="+e,a=new XMLHttpRequest;a.open("POST",i,!0),a.onload=function(){if(a.status>=200&&a.status<400){var e=JSON.parse(a.responseText);if(!e)return;mailchimp_cart.valueEmail(e.email)&&mailchimp_cart.setEmail(e.email)}},a.onerror=function(){console.log("mailchimp.get_email_by_hash.request.error",a.responseText)},a.setRequestHeader("Content-Type","application/json"),a.setRequestHeader("Accept","application/json"),a.send()}catch(e){console.log("mailchimp.get_email_by_hash.error",e)}}function mailchimpHandleBillingEmail(e){try{if(!mailchimp_public_data.allowed_to_set_cookies)return;if(mailchimp_public_data.disable_carts)return;var i=document.querySelector("#mailchimp_woocommerce_newsletter");e||(e="#billing_email");var a=document.querySelector(e),t=void 0!==a?a.value:"";if(!mailchimp_cart.valueEmail(t)||mailchimp_submitted_email===t)return!1;mailchimp_cart.setEmail(t);var l=mailchimp_public_data.ajax_url+"?action=mailchimp_set_user_by_email&email="+t+"&mc_language="+mailchimp_public_data.language+"&subscribed="+(i&&i.checked?"1":"0"),m=new XMLHttpRequest;return m.open("POST",l,!0),m.onload=function(){var e=m.status>=200&&m.status<400,i=e?"mailchimp.handle_billing_email.request.success":"mailchimp.handle_billing_email.request.error";e&&(mailchimp_submitted_email=t),console.log(i,m.responseText)},m.onerror=function(){console.log("mailchimp.handle_billing_email.request.error",m.responseText)},m.setRequestHeader("Content-Type","application/json"),m.setRequestHeader("Accept","application/json"),m.send(),!0}catch(a){console.log("mailchimp.handle_billing_email.error",a),mailchimp_submitted_email=!1}}!function(){"use strict";var e,i,a,t={extend:function(e,i){for(var a in i||{})i.hasOwnProperty(a)&&(e[a]=i[a]);return e},getQueryStringVars:function(){var e=window.location.search||"",i=[],a={};if((e=e.substr(1)).length)for(var t in i=e.split("&")){var l=i[t];if("string"==typeof l){var m=l.split("="),n=m[0],r=m[1];n.length&&(void 0===a[n]&&(a[n]=[]),a[n].push(r))}}return a},unEscape:function(e){return decodeURIComponent(e)},escape:function(e){return encodeURIComponent(e)},createDate:function(e,i){e||(e=0);var a=new Date,t=i?a.getDate()-e:a.getDate()+e;return a.setDate(t),a},arrayUnique:function(e){for(var i=e.concat(),a=0;a<i.length;++a)for(var t=a+1;t<i.length;++t)i[a]===i[t]&&i.splice(t,1);return i},objectCombineUnique:function(e){for(var i=e[0],a=1;a<e.length;a++){var t=e[a];for(var l in t)i[l]=t[l]}return i}},l=(e=document,a=function(e,i,t){return 1===arguments.length?a.get(e):a.set(e,i,t)},a.get=function(i,t){return e.cookie!==a._cacheString&&a._populateCache(),null==a._cache[i]?t:a._cache[i]},a.defaults={path:"/",secure:!0,samesite:"strict"},a.set=function(t,l,m){switch(m={path:m&&m.path||a.defaults.path,domain:m&&m.domain||a.defaults.domain,expires:m&&m.expires||a.defaults.expires,secure:m&&m.secure!==i?m.secure:a.defaults.secure,samesite:m&&m.samesite||a.defaults.samesite},l===i&&(m.expires=-1),typeof m.expires){case"number":m.expires=new Date((new Date).getTime()+1e3*m.expires);break;case"string":m.expires=new Date(m.expires)}return t=encodeURIComponent(t)+"="+(l+"").replace(/[^!#-+\--:<-\[\]-~]/g,encodeURIComponent),t+=m.path?";path="+m.path:"",t+=m.domain?";domain="+m.domain:"",t+=m.expires?";expires="+m.expires.toGMTString():"",t+=m.secure?";secure":"",t+=m.samesite?";samesite="+m.samesite:"",e.cookie=t,a},a.expire=function(e,t){return a.set(e,i,t)},a._populateCache=function(){a._cache={};try{a._cacheString=e.cookie;for(var t=a._cacheString.split("; "),l=0;l<t.length;l++){var m=t[l].indexOf("="),n=decodeURIComponent(t[l].substr(0,m));m=decodeURIComponent(t[l].substr(m+1)),a._cache[n]===i&&(a._cache[n]=m)}}catch(e){console.log(e)}},a.enabled=function(){var e="1"===a.set("cookies.js","1").get("cookies.js");return a.expire("cookies.js"),e}(),a);mailchimp={storage:l,utils:t},mailchimp_cart=new function(){return this.email_types="input[type=email]",this.regex_email=/^([A-Za-z0-9_+\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,this.current_email=null,this.previous_email=null,this.expireUser=function(){this.current_email=null,mailchimp_public_data.allowed_to_set_cookies&&mailchimp.storage.expire("mailchimp.cart.current_email")},this.expireSaved=function(){mailchimp_public_data.allowed_to_set_cookies&&mailchimp.storage.expire("mailchimp.cart.items")},this.setEmail=function(e){if(mailchimp_public_data.allowed_to_set_cookies){if(!this.valueEmail(e))return!1;this.setPreviousEmail(this.getEmail()),mailchimp.storage.set("mailchimp.cart.current_email",this.current_email=e)}},this.getEmail=function(){if(mailchimp_public_data.allowed_to_set_cookies){if(this.current_email)return this.current_email;var e=mailchimp.storage.get("mailchimp.cart.current_email",!1);return!(!e||!this.valueEmail(e))&&(this.current_email=e)}},this.setPreviousEmail=function(e){if(mailchimp_public_data.allowed_to_set_cookies)return!!this.valueEmail(e)&&void mailchimp.storage.set("mailchimp.cart.previous_email",this.previous_email=e)},this.valueEmail=function(e){return this.regex_email.test(e)},this}}(),mailchimpReady((function(){if(mailchimp_public_data.allowed_to_set_cookies&&!mailchimp_public_data.disable_carts){if(void 0===e)var e={site_url:document.location.origin,defaulted:!0,ajax_url:document.location.origin+"/wp-admin?admin-ajax.php"};try{var i=mailchimp.utils.getQueryStringVars();void 0!==i.mc_cart_id&&mailchimpGetCurrentUserByHash(i.mc_cart_id);var a=document.querySelector("#mailchimp_woocommerce_newsletter");a&&(a.onchange=function(){mailchimp_submitted_email=null,mailchimpHandleBillingEmail("#billing_email")}),mailchimp_username_email=document.querySelector("#username"),mailchimp_billing_email=document.querySelector("#billing_email"),mailchimp_registration_email=document.querySelector("#reg_email"),mailchimp_billing_email&&(mailchimp_billing_email.onblur=function(){mailchimpHandleBillingEmail("#billing_email")},mailchimp_billing_email.onfocus=function(){mailchimpHandleBillingEmail("#billing_email")}),mailchimp_username_email&&(mailchimp_username_email.onblur=function(){mailchimpHandleBillingEmail("#username")},mailchimp_username_email.onfocus=function(){mailchimpHandleBillingEmail("#username")}),mailchimp_registration_email&&(mailchimp_registration_email.onblur=function(){mailchimpHandleBillingEmail("#reg_email")},mailchimp_registration_email.onfocus=function(){mailchimpHandleBillingEmail("#reg_email")})}catch(e){console.log("mailchimp ready error",e)}}}));