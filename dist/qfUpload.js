!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("qfUpload",[],t):"object"==typeof exports?exports.qfUpload=t():e.qfUpload=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=17)}([function(e,t,n){"use strict";function r(e){return"[object Array]"===S.call(e)}function i(e){return void 0===e}function o(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function a(e){return"[object ArrayBuffer]"===S.call(e)}function s(e){return"undefined"!=typeof FormData&&e instanceof FormData}function u(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function c(e){return"string"==typeof e}function l(e){return"number"==typeof e}function f(e){return null!==e&&"object"==typeof e}function d(e){if("[object Object]"!==S.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function p(e){return"[object Date]"===S.call(e)}function h(e){return"[object File]"===S.call(e)}function m(e){return"[object Blob]"===S.call(e)}function v(e){return"[object Function]"===S.call(e)}function g(e){return f(e)&&v(e.pipe)}function x(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function y(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function b(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function w(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,i=e.length;n<i;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}function C(){function e(e,n){d(t[n])&&d(e)?t[n]=C(t[n],e):d(e)?t[n]=C({},e):r(e)?t[n]=e.slice():t[n]=e}for(var t={},n=0,i=arguments.length;n<i;n++)w(arguments[n],e);return t}function L(e,t,n){return w(t,function(t,r){e[r]=n&&"function"==typeof t?E(t,n):t}),e}function U(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}var E=n(9),S=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:a,isBuffer:o,isFormData:s,isArrayBufferView:u,isString:c,isNumber:l,isObject:f,isPlainObject:d,isUndefined:i,isDate:p,isFile:h,isBlob:m,isFunction:v,isStream:g,isURLSearchParams:x,isStandardBrowserEnv:b,forEach:w,merge:C,extend:L,trim:y,stripBOM:U}},function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=r(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([o]).join("\n")}return[n].join("\n")}function r(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=l[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(o(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(o(n.parts[i]));l[n.id]={id:n.id,refs:1,parts:a}}}}function i(){var e=document.createElement("style");return e.type="text/css",f.appendChild(e),e}function o(e){var t,n,r=document.querySelector("style["+g+'~="'+e.id+'"]');if(r){if(h)return m;r.parentNode.removeChild(r)}if(x){var o=p++;r=d||(d=i()),t=a.bind(null,r,o,!1),n=a.bind(null,r,o,!0)}else r=i(),t=s.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function a(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function s(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),v.ssrId&&e.setAttribute(g,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(22),l={},f=u&&(document.head||document.getElementsByTagName("head")[0]),d=null,p=0,h=!1,m=function(){},v=null,g="data-vue-ssr-id",x="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n,i){h=n,v=i||{};var o=c(e,t);return r(o),function(t){for(var n=[],i=0;i<o.length;i++){var a=o[i],s=l[a.id];s.refs--,n.push(s)}t?(o=c(e,t),r(o)):o=[];for(var i=0;i<n.length;i++){var s=n[i];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete l[s.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t,n,r,i,o){var a,s=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(a=e,s=e.default);var c="function"==typeof s?s.options:s;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),i&&(c._scopeId=i);var l;if(o?(l=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},c._ssrRegister=l):r&&(l=r),l){var f=c.functional,d=f?c.render:c.beforeCreate;f?(c._injectStyles=l,c.render=function(e,t){return l.call(t),d(e,t)}):c.beforeCreate=d?[].concat(d,l):[l]}return{esModule:a,exports:s,options:c}}},function(e,t,n){"use strict";var r=n(5),i=n(6);t.a={name:"QfQiniuUpload",directives:{paste:i.a},props:{isFileType:{type:String,default:""},maxSize:{type:Number,default:500},title:{type:String,default:"文件上传"},fileList:{type:Array,default:function(){return[]}},dir:{type:String,default:""},private:{type:Number,default:1},num:{type:Number,default:9},upNum:{type:Number,default:0},watermark:{type:Boolean,default:!0},watermarkConfig:{type:Object,default:function(){return{title:"电商服务大平台",img:""}}},qiniuToken:Function,qiniuView:Function,previewFile:Function},computed:{isImg:function(){return!this.isFileType||-1!==this.isFileType.indexOf("image")}},data:function(){return{uploadFoces:!1,protocol:"https:"}},mounted:function(){this.protocol=location.protocol||"https:"},methods:{upNumAddSub:function(e){var t=this;setTimeout(function(){var n=t.upNum+e;t.$emit("update:upNum",n)},100)},handleRemove:function(e){if(e.id)for(var t in this.fileList)e.id==this.fileList[t].id&&this.fileList.splice(t,1);else e.uid&&(this.uploadEnd(null,e.uid),this.$refs.upload.abort(e))},beforeRemove:function(e){if(e&&"success"===e.status)return this.$confirm("确定移除当前文件？")},handleExceed:function(e,t){this.$message.warning("当前限制选择 "+this.num+" 个文件，本次选择了 "+e.length+" 个文件，共选择了 "+(e.length+t.length)+" 个文件")},beforeAvatarUpload:function(e){var t=this;return new Promise(function(n,r){var i=e.size/1024/1024;i<t.maxSize||(t.$message.warning("文件大小不能超过"+t.maxSize+"M"),r());var o=e.type,a=e.name.substring(e.name.lastIndexOf(".")),s={image:/^image\//.test(o),pdf:"application/pdf"===o,txt:/^text\//.test(o),video:/^video\//.test(o),audio:/^video\//.test(o),xls:"application/vnd.ms-excel"===o,xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===o,zip:/^application\/.*zip/.test(o),rar:".rar"===a,ppt:".ppt"===a||".pptx"===a};if(t.isFileType){var u=t.isFileType.split("|"),c=!1,l=!0,f=!1,d=void 0;try{for(var p,h=u[Symbol.iterator]();!(l=(p=h.next()).done);l=!0){if(s[p.value]){c=!0;break}}}catch(e){f=!0,d=e}finally{try{!l&&h.return&&h.return()}finally{if(f)throw d}}if(!c)return t.$message.warning("只能上传"+u+"类型的文件！"),r()}if(s.image){var m=1;if(i>2&&i<=5?m=.9:i>5&&i<=10?m=.8:i>10&&(m=.7),m<1||t.watermark){var v=new Image,g="";v.src=URL.createObjectURL(e),v.onload=function(){g=t.compressUpload(v,e,m),n(g)},v.onerror=function(){r()}}else n(e)}else n(e)})},handleChange:function(e){for(var t in this.fileList)if(this.fileList[t].uid==e.uid)return;this.fileList.push(e)},uploadFiles:function(e,t){var n=this,r=this,i="";i=t&&"paste"==t?e:e.file;var o=i.name,a={useCdnDomain:!0,concurrentRequestLimit:1},s={fname:o,customVars:null};this.upNumAddSub(1);var u=i.uid,c=null;setTimeout(function(){c=n.$notify({message:'"'+o+'"上传中...',duration:0})},100),this.qiniuToken({is_private:this.private}).then(function(t){var l=t.data.data;if(l){var f=(l.dir||"qiniu")+(n.dir?"/"+n.dir:"")+"/"+(new Date).getTime()+"_"+o;qiniu.upload(i,f,l.token,s,a).subscribe({next:function(t){e.onProgress&&e.onProgress({percent:t.total.percent})},error:function(e){r.uploadEnd(c,u),r.$notify.error('"'+o+'"上传失败')},complete:function(e){var t={id:u,name:o,key:f,path:r.protocol+"//"+l.domain+"/"+f,private:r.private};1!==r.private&&(t.file_path=t.path),r.uploadEnd(c,u),r.$notify.success('"'+o+'"上传成功'),r.fileList.push(t),r.$emit("successCallback",t)}})}}).catch(function(){n.uploadEnd(c,u)})},compressUpload:function(e,t,n){var r=document.createElement("canvas"),i=r.getContext("2d"),o=e.width,a=e.height;if(r.width=o,r.height=a,i.fillRect(0,0,r.width,r.height),i.drawImage(e,0,0,o,a),this.watermark){var s=this.$refs.qfUploadLogo,u=this.watermarkConfig.title,c=s.width,l=s.height;i.rotate(-20*Math.PI/180),i.translate(-o/2,-a/2),i.font="18px Vedana",i.fillStyle="#000",i.textAlign="center",i.textBaseline="Middle",i.globalAlpha=.15;for(var f=0;f<o/110;f++)for(var d=0;d<a/35;d++)if(f%2==d%2){var p=300*f,h=80*d;i.drawImage(s,p-180,h-30,c,l),i.fillText(u,p,h)}}var m=r.toDataURL("image/jpeg",n),v=this.dataURLtoFile(m,t.name,t.type);return v.uid=v.uid||t.uid,v},dataURLtoFile:function(e,t,n){for(var r=e.split(","),i=(r[0].match(/:(.*?);/)[1],atob(r[1])),o=i.length,a=new Uint8Array(o);o--;)a[o]=i.charCodeAt(o);return new File([a],t,{type:n||"image/jpg"})},handlePaste:function(e){var t=this,n=this,r=null;if(!(e.clipboardData&&e.clipboardData.items[0]&&e.clipboardData.items[0].type&&e.clipboardData.items[0].type.indexOf("image")>-1))return void this.$message({type:"warning",message:"上传的文件必须为图片且无法复制本地图片且无法同时复制多张图片"});r=e.clipboardData.items[0].getAsFile(),r.uid=(new Date).getTime();var i=new Image,o="";i.src=URL.createObjectURL(r),i.onload=function(){o=n.compressUpload(i,r,1),n.uploadFiles(o,"paste")},i.onerror=function(){t.$message.error("图片上传错误，请稍后重试！")}},upFoces:function(){this.uploadFoces=!0},upBlur:function(){this.uploadFoces=!1},handlePreview:function(e){this.previewFile?this.previewFile(e):e.file_path?Object(r.a)(e.file_path):this.qiniuView({url:encodeURI(e.path)}).then(function(e){var t=e.data.data;Object(r.a)(t.download_url)})},uploadEnd:function(e,t){var n=this;e&&(e.close(),this.upNumAddSub(-1)),this.fileList.forEach(function(e,r){e.uid==t&&n.fileList.splice(r,1)})}}}},function(e,t,n){"use strict";function r(e){var t=document.createElement("a");t.style.display="none",t.href=e,t.target="_blank",document.body.appendChild(t),t.click(),document.body.removeChild(t)}t.a=r},function(e,t,n){"use strict";var r=n(23),i=function(e){e.directive("paste",r.a)};window.Vue&&(window.paste=r.a,Vue.use(i)),r.a.install=i,t.a=r.a},function(e,t,n){e.exports=n.p+"qf_logo.png?8257f0bf87cfe99cce10598a50f75968"},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var i=n(5),o=n(29),a=n.n(o),s=n(6),u=a.a.CancelToken;t.a={name:"QfUpload",directives:{paste:s.a},props:{isFileType:{type:String,default:""},maxSize:{type:Number,default:20},title:{type:String,default:"点击/拖拽到此上传"},fileList:{type:Array,default:function(){return[]}},dir:{type:String,default:"dev"},num:{type:Number,default:9},upNum:{type:Number,default:0},rename:{type:String,default:""},private:{type:Number,default:1},watermark:{type:Boolean,default:!0},watermarkConfig:{type:Object,default:function(){return{title:"电商服务大平台",img:""}}},uploadsFile:Function,previewFile:Function},computed:{isImg:function(){return!this.isFileType||-1!==this.isFileType.indexOf("image")}},data:function(){return{cancelList:[],uploadFoces:!1,showViewer:!1,srcUrl:""}},mounted:function(){this.cancelList=[]},methods:{upNumAddSub:function(e){var t=this;setTimeout(function(){var n=t.upNum+e;t.$emit("update:upNum",n)},100)},closeViewer:function(){this.showViewer=!1},handlePictureCardPreview:function(e){if(this.previewFile)this.previewFile(e);else{var t=e.name;-1!=="jpg|jpeg|png".indexOf(t.substr(t.lastIndexOf(".")+1))?(this.srcUrl=e.full_path,this.showViewer=!0):Object(i.a)(e.full_path)}},handleRemove:function(e){if(e.id){for(var t in this.fileList)e.id==this.fileList[t].id&&this.fileList.splice(t,1);this.delserver&&this.$emit("delUploadsFile",e.id)}else if(e.uid){this.uploadEnd(null,e.uid);for(var t in this.cancelList)this.cancelList[t].uid==e.uid&&"function"==typeof this.cancelList[t].cancel&&(this.cancelList[t].cancel(),this.cancelList.splice(t,1));this.$refs.upload.abort(e)}},beforeRemove:function(e){if(e&&"success"===e.status)return this.$confirm("确定移除当前文件？")},handleExceed:function(e,t){this.$message.warning("当前限制选择 "+this.num+" 个文件，本次选择了 "+e.length+" 个文件，共选择了 "+(e.length+t.length)+" 个文件")},beforeAvatarUpload:function(e){var t=this;return new Promise(function(n,r){var i=e.size/1024/1024;i<t.maxSize||(t.$message.warning("文件大小不能超过"+t.maxSize+"M"),r());var o=e.type,a=e.name.substring(e.name.lastIndexOf(".")),s={image:/^image\//.test(o),pdf:"application/pdf"===o,txt:/^text\//.test(o),video:/^video\//.test(o),audio:/^video\//.test(o),xls:"application/vnd.ms-excel"===o,xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===o,zip:/^application\/.*zip/.test(o),rar:".rar"===a,ppt:".ppt"===a||".pptx"===a};if(t.isFileType){var u=t.isFileType.split("|"),c=!1,l=!0,f=!1,d=void 0;try{for(var p,h=u[Symbol.iterator]();!(l=(p=h.next()).done);l=!0){if(s[p.value]){c=!0;break}}}catch(e){f=!0,d=e}finally{try{!l&&h.return&&h.return()}finally{if(f)throw d}}if(!c)return t.$message.warning("只能上传"+u+"类型的文件！"),r()}if(s.image){var m=1;if(i>2&&i<=5?m=.9:i>5&&i<=10?m=.8:i>10&&(m=.7),m<1||t.watermark){var v=new Image,g="";v.src=URL.createObjectURL(e),v.onload=function(){g=t.compressUpload(v,e,m),n(g)},v.onerror=function(){r()}}else n(e)}else n(e)})},handleChange:function(e){for(var t in this.fileList)if(this.fileList[t].uid==e.uid)return;this.fileList.push(e)},uploadFiles:function(e,t){var n=this,i=this,o="",a="";if(t&&"paste"==t?(o=e.name||"image.png",a=e):(o=e.file.name,a=e.file),this.upNumAddSub(1),this.rename){var s=o.substr(o.lastIndexOf(".")+1);a=new File([a],this.rename+s)}var c=a.uid,l=new FormData;l.append("file[]",a),l.append("private",this.private),l.append("dir",this.dir);var f=new u(function(e){i.cancelList.push({uid:c,cancel:e})}),d=null;setTimeout(function(){d=n.$notify({message:'"'+o+'"上传中...',duration:0})},100),this.uploadsFile(l,f).then(function(e){var t=e.data.data;if(t instanceof Array){var i;(i=n.fileList).push.apply(i,r(t))}else n.fileList.push(t);n.uploadEnd(d,c)}).catch(function(){n.uploadEnd(d,c)})},compressUpload:function(e,t,n){var r=document.createElement("canvas"),i=r.getContext("2d"),o=e.width,a=e.height;if(r.width=o,r.height=a,i.fillRect(0,0,r.width,r.height),i.drawImage(e,0,0,o,a),this.watermark){var s=this.$refs.qfUploadLogo,u=this.watermarkConfig.title,c=s.width,l=s.height;i.rotate(-20*Math.PI/180),i.translate(-o/2,-a/2),i.font="18px Vedana",i.fillStyle="#000",i.textAlign="center",i.textBaseline="Middle",i.globalAlpha=.15;for(var f=0;f<o/110;f++)for(var d=0;d<a/35;d++)if(f%2==d%2){var p=300*f,h=80*d;i.drawImage(s,p-180,h-30,c,l),i.fillText(u,p,h)}}var m=r.toDataURL("image/jpeg",n),v=this.dataURLtoFile(m,t.name,t.type);return v.uid=v.uid||t.uid,v},dataURLtoFile:function(e,t,n){for(var r=e.split(","),i=(r[0].match(/:(.*?);/)[1],atob(r[1])),o=i.length,a=new Uint8Array(o);o--;)a[o]=i.charCodeAt(o);return new File([a],t,{type:n||"image/jpg"})},handlePaste:function(e){var t=this,n=this;if(this.fileList.length>=this.num)return void this.$message.warning("只能上传 "+this.num+" 个文件");var r=null;if(!(e.clipboardData&&e.clipboardData.items[0]&&e.clipboardData.items[0].type&&e.clipboardData.items[0].type.indexOf("image")>-1))return void this.$message.warning("上传的文件必须为图片且无法复制本地图片且无法同时复制多张图片");r=e.clipboardData.items[0].getAsFile(),r.uid=(new Date).getTime();var i=new Image,o="";i.src=URL.createObjectURL(r),i.onload=function(){o=n.compressUpload(i,r,1),n.uploadFiles(o,"paste")},i.onerror=function(){t.$message.error("图片上传错误，请稍后重试！")}},upFoces:function(){this.uploadFoces=!0},upBlur:function(){this.uploadFoces=!1},uploadEnd:function(e,t){e&&(e.close(),this.upNumAddSub(-1));for(var n in this.fileList)if(this.fileList[n].uid==t){this.fileList.splice(n,1);break}}}}},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var i=n(0);e.exports=function(e,t,n){if(!t)return e;var o;if(n)o=n(t);else if(i.isURLSearchParams(t))o=t.toString();else{var a=[];i.forEach(t,function(e,t){null!==e&&void 0!==e&&(i.isArray(e)?t+="[]":e=[e],i.forEach(e,function(e){i.isDate(e)?e=e.toISOString():i.isObject(e)&&(e=JSON.stringify(e)),a.push(r(t)+"="+r(e))}))}),o=a.join("&")}if(o){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";(function(t){function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var i=n(0),o=n(36),a={"Content-Type":"application/x-www-form-urlencoded"},s={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(13):void 0!==t&&"[object process]"===Object.prototype.toString.call(t)&&(e=n(13)),e}(),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};s.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){s.headers[e]={}}),i.forEach(["post","put","patch"],function(e){s.headers[e]=i.merge(a)}),e.exports=s}).call(t,n(35))},function(e,t,n){"use strict";var r=n(0),i=n(37),o=n(39),a=n(10),s=n(40),u=n(43),c=n(44),l=n(14);e.exports=function(e){return new Promise(function(t,n){var f=e.data,d=e.headers;r.isFormData(f)&&delete d["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";d.Authorization="Basic "+btoa(h+":"+m)}var v=s(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),a(v,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?u(p.getAllResponseHeaders()):null,o=e.responseType&&"text"!==e.responseType?p.response:p.responseText,a={data:o,status:p.status,statusText:p.statusText,headers:r,config:e,request:p};i(t,n,a),p=null}},p.onabort=function(){p&&(n(l("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){n(l("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var g=(e.withCredentials||c(v))&&e.xsrfCookieName?o.read(e.xsrfCookieName):void 0;g&&(d[e.xsrfHeaderName]=g)}if("setRequestHeader"in p&&r.forEach(d,function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)}),r.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){p&&(p.abort(),n(e),p=null)}),f||(f=null),p.send(f)})}},function(e,t,n){"use strict";var r=n(38);e.exports=function(e,t,n,i,o){var a=new Error(e);return r(a,t,n,i,o)}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){function n(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function i(i){r.isUndefined(t[i])?r.isUndefined(e[i])||(o[i]=n(void 0,e[i])):o[i]=n(e[i],t[i])}t=t||{};var o={},a=["url","method","data"],s=["headers","auth","proxy","params"],u=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],c=["validateStatus"];r.forEach(a,function(e){r.isUndefined(t[e])||(o[e]=n(void 0,t[e]))}),r.forEach(s,i),r.forEach(u,function(i){r.isUndefined(t[i])?r.isUndefined(e[i])||(o[i]=n(void 0,e[i])):o[i]=n(void 0,t[i])}),r.forEach(c,function(r){r in t?o[r]=n(e[r],t[r]):r in e&&(o[r]=n(void 0,e[r]))});var l=a.concat(s).concat(u).concat(c),f=Object.keys(e).concat(Object.keys(t)).filter(function(e){return-1===l.indexOf(e)});return r.forEach(f,i),o}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(18),i=n(25),o=[r.a,i.a],a=function(e){o.forEach(function(t){e.component(t.name,t)})};"undefined"!=typeof window&&window.Vue&&a(window.Vue),t.default={install:a,QfQiniuUpload:r.a,QfUpload:i.a}},function(e,t,n){"use strict";var r=n(19);r.a.install=function(e){e.component(r.a.name,r.a)},t.a=r.a},function(e,t,n){"use strict";function r(e){n(20)}var i=n(4),o=n(24),a=n(3),s=r,u=a(i.a,o.a,!1,s,null,null);t.a=u.exports},function(e,t,n){var r=n(21);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(2)("688eb962",r,!0,{})},function(e,t,n){t=e.exports=n(1)(!1),t.push([e.i,".upload-index .el-upload .el-upload-dragger{width:auto;height:auto;border:none;text-align:left}.upload-index :focus{outline:none}.annotation{color:#999;font-size:12px;line-height:14px}.upload-box{border:1px solid #a9a9a9;border-radius:6px;padding:5px;text-align:left}.upload-box>p{font-size:12px;line-height:14px;margin:0;margin-bottom:5px}.qf-upload-logo{height:0;overflow:hidden}.qf-upload-logo img{max-width:93px;max-height:36px}.upload-fo{border:1px solid #409eff}",""])},function(e,t){e.exports=function(e,t){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=o[0],s=o[1],u=o[2],c=o[3],l={id:e+":"+i,css:s,media:u,sourceMap:c};r[a]?r[a].parts.push(l):n.push(r[a]={id:a,parts:[l]})}return n}},function(e,t,n){"use strict";t.a={inserted:function(e,t,n){e.addEventListener("paste",function(e){t.value(e)})}}},function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"upload-index"},[e.isImg?r("div",{directives:[{name:"paste",rawName:"v-paste",value:e.handlePaste,expression:"handlePaste"}],class:[e.uploadFoces?"upload-fo":"","upload-box"],attrs:{tabindex:"-1"},on:{focus:e.upFoces,blur:e.upBlur}},[r("p",[e._v("复制粘贴区域，鼠标点击此区域后可以使用ctrl+V的方式进行图片粘贴")]),e._v(" "),r("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"container","before-upload":e.beforeAvatarUpload,"http-request":e.uploadFiles,"on-remove":e.handleRemove,limit:e.num,"on-change":e.handleChange,"on-exceed":e.handleExceed,"file-list":e.fileList,"on-preview":e.handlePreview,drag:"",multiple:""}},[r("el-button",{attrs:{size:"mini",type:"primary"}},[e._v(e._s(e.title))]),e._v(" "),r("div",{staticClass:"annotation",attrs:{slot:"tip"},slot:"tip"},[e._v("PS: 单个文件不能大于"+e._s(e.maxSize)+"M")])],1)],1):r("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"container","before-upload":e.beforeAvatarUpload,"http-request":e.uploadFiles,"before-remove":e.beforeRemove,"on-remove":e.handleRemove,limit:e.num,"on-change":e.handleChange,"on-exceed":e.handleExceed,"file-list":e.fileList,"on-preview":e.handlePreview,drag:"",multiple:""}},[r("el-button",{attrs:{size:"mini",type:"primary"}},[e._v(e._s(e.title))]),e._v(" "),r("div",{staticClass:"annotation",attrs:{slot:"tip"},slot:"tip"},[e._v("PS: 只能上传pdf, 文件不能大于"+e._s(e.maxSize)+"M")])],1),e._v(" "),r("div",{staticClass:"qf-upload-logo"},[e.watermarkConfig.img?r("img",{ref:"qfUploadLogo",attrs:{src:e.watermarkConfig.img}}):r("img",{ref:"qfUploadLogo",attrs:{src:n(7)}})])],1)},i=[],o={render:r,staticRenderFns:i};t.a=o},function(e,t,n){"use strict";var r=n(26);r.a.install=function(e){e.component(r.a.name,r.a)},t.a=r.a},function(e,t,n){"use strict";function r(e){n(27)}var i=n(8),o=n(48),a=n(3),s=r,u=a(i.a,o.a,!1,s,null,null);t.a=u.exports},function(e,t,n){var r=n(28);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(2)("5f617311",r,!0,{})},function(e,t,n){t=e.exports=n(1)(!1),t.push([e.i,".upload-index .el-upload .el-upload-dragger{width:auto;height:auto;border:none;text-align:left}.upload-index :focus{outline:none}.annotation{color:#999;font-size:12px;line-height:14px}.upload-box{border:1px solid #a9a9a9;border-radius:6px;padding:5px;text-align:left}.upload-box>p{font-size:12px;line-height:14px;margin:0;margin-bottom:5px}.qf-upload-logo{height:0;overflow:hidden}.qf-upload-logo img{max-width:93px;max-height:36px}.upload-fo{border:1px solid #409eff}.qifu-view{position:fixed;top:0;bottom:0;left:0;right:0;margin:auto;display:flex;justify-content:center;align-items:center;z-index:9999;background:rgba(0,0,0,.5)}.qifu-view img{max-width:100%;max-height:100%}.qifu-view-close{cursor:pointer;display:inline-block;width:40px;height:40px;line-height:40px;text-align:center;border-radius:50%;font-size:30px;color:#fff;background:#606266;position:absolute;top:40px;right:40px;z-index:3}",""])},function(e,t,n){e.exports=n(30)},function(e,t,n){"use strict";function r(e){var t=new a(e),n=o(a.prototype.request,t);return i.extend(n,a.prototype,t),i.extend(n,t),n}var i=n(0),o=n(9),a=n(31),s=n(15),u=n(12),c=r(u);c.Axios=a,c.create=function(e){return r(s(c.defaults,e))},c.Cancel=n(16),c.CancelToken=n(45),c.isCancel=n(11),c.all=function(e){return Promise.all(e)},c.spread=n(46),c.isAxiosError=n(47),e.exports=c,e.exports.default=c},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new a,response:new a}}var i=n(0),o=n(10),a=n(32),s=n(33),u=n(15);r.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=u(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},r.prototype.getUri=function(e){return e=u(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},i.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(u(n||{},{method:e,url:t,data:(n||{}).data}))}}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(u(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(){this.handlers=[]}var i=n(0);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){i.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var i=n(0),o=n(34),a=n(11),s=n(12);e.exports=function(e){return r(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=i.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),i.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return r(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return a(t)||(r(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(e){if(l===setTimeout)return setTimeout(e,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function o(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function a(){m&&p&&(m=!1,p.length?h=p.concat(h):v=-1,h.length&&s())}function s(){if(!m){var e=i(a);m=!0;for(var t=h.length;t;){for(p=h,h=[];++v<t;)p&&p[v].run();v=-1,t=h.length}p=null,m=!1,o(e)}}function u(e,t){this.fun=e,this.array=t}function c(){}var l,f,d=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(e){l=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}}();var p,h=[],m=!1,v=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new u(e,t)),1!==h.length||m||i(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=c,d.addListener=c,d.once=c,d.off=c,d.removeListener=c,d.removeAllListeners=c,d.emit=c,d.prependListener=c,d.prependOnceListener=c,d.listeners=function(e){return[]},d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(14);e.exports=function(e,t,n){var i=n.config.validateStatus;n.status&&i&&!i(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,i){return e.config=t,n&&(e.code=n),e.request=r,e.response=i,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,i,o,a){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(i)&&s.push("path="+i),r.isString(o)&&s.push("domain="+o),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";var r=n(41),i=n(42);e.exports=function(e,t){return e&&!r(t)?i(e,t):t}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(0),i=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,o,a={};return e?(r.forEach(e.split("\n"),function(e){if(o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t){if(a[t]&&i.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([n]):a[t]?a[t]+", "+n:n}}),a):a}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(i.setAttribute("href",t),t=i.href),i.setAttribute("href",t),{href:i.href,protocol:i.protocol?i.protocol.replace(/:$/,""):"",host:i.host,search:i.search?i.search.replace(/^\?/,""):"",hash:i.hash?i.hash.replace(/^#/,""):"",hostname:i.hostname,port:i.port,pathname:"/"===i.pathname.charAt(0)?i.pathname:"/"+i.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),i=document.createElement("a");return t=e(window.location.href),function(n){var i=r.isString(n)?e(n):n;return i.protocol===t.protocol&&i.host===t.host}}():function(){return function(){return!0}}()},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new i(e),t(n.reason))})}var i=n(16);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"upload-index"},[e.isImg?r("div",{directives:[{name:"paste",rawName:"v-paste",value:e.handlePaste,expression:"handlePaste"}],class:[e.uploadFoces?"upload-fo":"","upload-box"],attrs:{tabindex:"-1"},on:{focus:e.upFoces,blur:e.upBlur}},[r("p",[e._v("复制粘贴区域，鼠标点击此区域后可以使用ctrl+V的方式进行图片粘贴")]),e._v(" "),r("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"container","on-preview":e.handlePictureCardPreview,"before-upload":e.beforeAvatarUpload,"http-request":e.uploadFiles,"before-remove":e.beforeRemove,"on-remove":e.handleRemove,limit:e.num,"on-change":e.handleChange,"on-exceed":e.handleExceed,"file-list":e.fileList,drag:"",multiple:""}},[r("el-button",{attrs:{size:"mini",type:"primary"}},[e._v(e._s(e.title))]),e._v(" "),r("div",{staticClass:"annotation",attrs:{slot:"tip"},slot:"tip"},[e._v("PS: 单个文件不能大于"+e._s(e.maxSize)+"M")])],1)],1):r("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"container","on-preview":e.handlePictureCardPreview,"before-upload":e.beforeAvatarUpload,"http-request":e.uploadFiles,"before-remove":e.beforeRemove,"on-remove":e.handleRemove,limit:e.num,"on-change":e.handleChange,"on-exceed":e.handleExceed,"file-list":e.fileList,drag:"",multiple:""}},[r("el-button",{attrs:{size:"mini",type:"primary"}},[e._v(e._s(e.title))]),e._v(" "),r("div",{staticClass:"annotation",attrs:{slot:"tip"},slot:"tip"},[e._v("PS: 只能上传pdf, 文件不能大于"+e._s(e.maxSize)+"M")])],1),e._v(" "),r("div",{staticClass:"qf-upload-logo"},[e.watermarkConfig.img?r("img",{ref:"qfUploadLogo",attrs:{src:e.watermarkConfig.img}}):r("img",{ref:"qfUploadLogo",attrs:{src:n(7)}})]),e._v(" "),e.showViewer?r("div",{staticClass:"qifu-view"},[r("span",{staticClass:"qifu-view-close",on:{click:e.closeViewer}},[e._v("×")]),e._v(" "),r("img",{attrs:{src:e.srcUrl}})]):e._e()],1)},i=[],o={render:r,staticRenderFns:i};t.a=o}])});