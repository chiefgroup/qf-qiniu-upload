!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("qfQiniuUpload",[],t):"object"==typeof exports?exports.qfQiniuUpload=t():e.qfQiniuUpload=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=1)}([function(e,t,n){"use strict";var a=n(9);t.a={name:"qf-qiniu-upload",directives:{paste:a.a},props:{orderId:{type:String,default:""},title:{type:String,default:"文件上传"},dir:{type:String,default:"dev"},num:{type:Number,default:9},uploadType:{type:String,default:"1"},uploadName:{type:String,default:"24"},uploadStatus:{default:""},upNum:{type:Number,default:0},watermark:{type:Boolean,default:!0}},data:function(){return{upToken:"",maxSize:500,imgList:[],fileList:[],dialogImageUrl:"",dialogVisible:!1,uploadFoces:!1,showFileList:!0}},created:function(){},mounted:function(){},methods:{upNumAddSub:function(e){this.$emit("update:upNum",e)},handleRemove:function(e,t){for(var n in this.imgList)e.id==this.imgList[n].id&&this.imgList.splice(n,1);this.$refs.upload.abort()},beforeRemove:function(e,t){if(e&&"success"===e.status)return this.$confirm("确定移除当前文件？")},handleExceed:function(e,t){this.$message.warning("当前限制选择 "+this.num+" 个文件，本次选择了 "+e.length+" 个文件，共选择了 "+(e.length+t.length)+" 个文件")},beforeAvatarUpload:function(e){var t=this,n=this;return new Promise(function(a,i){var r=e.size/1024/1024,o=r<t.maxSize,s="image/jpeg"===e.type||"image/jpg"===e.type||"image/png"===e.type;o||i();var u=1;if(r>2&&r<=5?u=.9:r>5&&r<=10?u=.8:r>10&&(u=.7),s&&u){var d=new Image,l="";d.src=URL.createObjectURL(e),d.onload=function(){l=n.compressUpload(d,e,u),a(l)},d.onerror=function(){i()}}else a(e)})},handleChange:function(e,t){for(var n in this.imgList)if(this.imgList[n].uid==e.uid)return;this.imgList.push(e)},uploadFiles:function(e,t){var n=this;this.upNumAddSub(this.upNum+1),n.showFileList=!0;var a="",i="",r="",o="stage"===Object({NODE_ENV:"production"}).VUE_APP_TITLE?this.dir+"_dev":this.dir;if(a=t&&"paste"==t?e:e.file,r=a.name,this.uploadStatus){var s=r.split(".");1==this.uploadStatus?(r="免费品牌交付表"+this.dateFormat(new Date,"date")+"."+s[s.length-1],a=new File([a],r)):2==this.uploadStatus&&(r="营业执照."+s[s.length-1],a=new File([a],r))}i=o+"/"+(new Date).getTime()+"_"+r;var u={useCdnDomain:!0,concurrentRequestLimit:1},d=null;d=10==this.uploadType?{"x:type":""+this.uploadType,"x:typeId":1}:{"x:type":""+this.uploadType,"x:typeId":""+this.orderId,"x:field":""+this.uploadName,"x:val":""+this.uploadStatus};var l={fname:r,params:d},p={next:function(t){e.onProgress&&e.onProgress({percent:t.total.percent})},error:function(e){n.upNumAddSub(this.upNum-1),n.$notify.closeAll(),n.$notify.error('"'+r+'"上传失败'),n.imgList.forEach(function(e,t){e.uid==a.uid&&n.imgList.splice(t,1)})},complete:function(e){n.upNumAddSub(this.upNum-1),n.$notify.closeAll(),n.$notify.success('"'+r+'"上传成功'),n.imgList.forEach(function(e,t){e.uid==a.uid&&n.imgList.splice(t,1)}),n.$emit("getBig",e.uploads,n.uploadStatus)}};this.$notify({message:'"'+r+'"上传中...',duration:0}),this.$emit("qiniuFn",function(e){var t=qiniu.upload(a,i,e,l,u);t.subscribe(p)})},compressUpload:function(e,t,n){var a=this.$refs.adjLogo,i=document.createElement("canvas"),r=i.getContext("2d"),o=(e.src.length,e.width),s=e.height;if(i.width=o,i.height=s,r.fillRect(0,0,i.width,i.height),r.drawImage(e,0,0,o,s),this.watermark){r.rotate(-20*Math.PI/180),r.translate(-o/2,-s/2),r.font="18px Vedana",r.fillStyle="#000",r.textAlign="center",r.textBaseline="Middle",r.globalAlpha=.15;for(var u=0;u<o/110;u++)for(var d=0;d<s/35;d++)if(u%2==d%2){var l=300*u,p=80*d;r.drawImage(a,l-180,p-30,93,36),r.fillText("电商服务大平台",l,p)}}var c=i.toDataURL("image/jpeg",n);return this.dataURLtoFile(c,t.name,t.type)},dataURItoBlob:function(e){var t=void 0;t=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):unescape(e.split(",")[1]);for(var n=e.split(",")[0].split(":")[1].split(";")[0],a=new Uint8Array(t.length),i=0;i<t.length;i+=1)a[i]=t.charCodeAt(i);return new Blob([a],{type:n})},dataURLtoFile:function(e,t,n){for(var a=e.split(","),i=(a[0].match(/:(.*?);/)[1],atob(a[1])),r=i.length,o=new Uint8Array(r);r--;)o[r]=i.charCodeAt(r);return new File([o],t,{type:n||"image/jpg"})},handlePaste:function(e){var t=this,n=this,a=null;if(!(e.clipboardData&&e.clipboardData.items[0]&&e.clipboardData.items[0].type&&e.clipboardData.items[0].type.indexOf("image")>-1))return void this.$message({type:"warning",message:"上传的文件必须为图片且无法复制本地图片且无法同时复制多张图片"});a=e.clipboardData.items[0].getAsFile();var i=new Image,r="";i.src=URL.createObjectURL(a),i.onload=function(){r=n.compressUpload(i,a,1),n.uploadFiles(r,"paste")},i.onerror=function(){t.$message.error("图片上传错误，请稍后重试！")}},upFoces:function(){this.uploadFoces=!0},upBlur:function(){this.uploadFoces=!1},dateFormat:function(e,t){if(e){e="string"==typeof e?e.replace(/-/g,"/"):e;var n=new Date(e),a=n.getFullYear(),i=n.getMonth()+1,r=n.getDate(),o=n.getHours(),s=n.getMinutes(),u=n.getSeconds();return i<10&&(i="0"+i),r<10&&(r="0"+r),o<10&&(o="0"+o),s<10&&(s="0"+s),u<10&&(u="0"+u),"date"==t?a+"-"+i+"-"+r:"month"==t?a+"-"+i:"time"==t?o+":"+s+":"+u:"md"==t?i+"."+r:a+"-"+i+"-"+r+" "+o+":"+s+":"+u}return""}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(2);a.a.install=function(e){return e.component(a.a.name,a.a)},t.default=a.a},function(e,t,n){"use strict";function a(e){n(3)}var i=n(0),r=n(11),o=n(8),s=a,u=o(i.a,r.a,!1,s,"data-v-85daeb66",null);t.a=u.exports},function(e,t,n){var a=n(4);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n(6)("3cfecee2",a,!0,{})},function(e,t,n){t=e.exports=n(5)(!1),t.push([e.i,".upload-index[data-v-85daeb66] .el-upload{width:100%}.upload-index[data-v-85daeb66] .el-upload .el-upload-dragger{width:100%;height:auto;border:none;text-align:left}.annotation[data-v-85daeb66]{color:#999;font-size:12px}.upload-box[data-v-85daeb66]{border:1px solid #a9a9a9;border-radius:6px;padding:0 5px 5px;text-align:left}.upload-box>p[data-v-85daeb66]{font-size:12px;line-height:14px}.upload-fo[data-v-85daeb66]{border:1px solid #409eff}",""])},function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=a(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([r]).join("\n")}return[n].join("\n")}function a(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var a=n(t,e);return t[2]?"@media "+t[2]+"{"+a+"}":a}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var a={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(a[r]=!0)}for(i=0;i<e.length;i++){var o=e[i];"number"==typeof o[0]&&a[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),t.push(o))}},t}},function(e,t,n){function a(e){for(var t=0;t<e.length;t++){var n=e[t],a=l[n.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](n.parts[i]);for(;i<n.parts.length;i++)a.parts.push(r(n.parts[i]));a.parts.length>n.parts.length&&(a.parts.length=n.parts.length)}else{for(var o=[],i=0;i<n.parts.length;i++)o.push(r(n.parts[i]));l[n.id]={id:n.id,refs:1,parts:o}}}}function i(){var e=document.createElement("style");return e.type="text/css",p.appendChild(e),e}function r(e){var t,n,a=document.querySelector("style["+v+'~="'+e.id+'"]');if(a){if(h)return m;a.parentNode.removeChild(a)}if(b){var r=f++;a=c||(c=i()),t=o.bind(null,a,r,!1),n=o.bind(null,a,r,!0)}else a=i(),t=s.bind(null,a),n=function(){a.parentNode.removeChild(a)};return t(e),function(a){if(a){if(a.css===e.css&&a.media===e.media&&a.sourceMap===e.sourceMap)return;t(e=a)}else n()}}function o(e,t,n,a){var i=n?"":a.css;if(e.styleSheet)e.styleSheet.cssText=y(t,i);else{var r=document.createTextNode(i),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(r,o[t]):e.appendChild(r)}}function s(e,t){var n=t.css,a=t.media,i=t.sourceMap;if(a&&e.setAttribute("media",a),g.ssrId&&e.setAttribute(v,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var d=n(7),l={},p=u&&(document.head||document.getElementsByTagName("head")[0]),c=null,f=0,h=!1,m=function(){},g=null,v="data-vue-ssr-id",b="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n,i){h=n,g=i||{};var r=d(e,t);return a(r),function(t){for(var n=[],i=0;i<r.length;i++){var o=r[i],s=l[o.id];s.refs--,n.push(s)}t?(r=d(e,t),a(r)):r=[];for(var i=0;i<n.length;i++){var s=n[i];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete l[s.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var n=[],a={},i=0;i<t.length;i++){var r=t[i],o=r[0],s=r[1],u=r[2],d=r[3],l={id:e+":"+i,css:s,media:u,sourceMap:d};a[o]?a[o].parts.push(l):n.push(a[o]={id:o,parts:[l]})}return n}},function(e,t){e.exports=function(e,t,n,a,i,r){var o,s=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(o=e,s=e.default);var d="function"==typeof s?s.options:s;t&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0),n&&(d.functional=!0),i&&(d._scopeId=i);var l;if(r?(l=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),a&&a.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},d._ssrRegister=l):a&&(l=a),l){var p=d.functional,c=p?d.render:d.beforeCreate;p?(d._injectStyles=l,d.render=function(e,t){return l.call(t),c(e,t)}):d.beforeCreate=c?[].concat(c,l):[l]}return{esModule:o,exports:s,options:d}}},function(e,t,n){"use strict";var a=n(10),i=function(e){e.directive("paste",a.a)};window.Vue&&(window.paste=a.a,Vue.use(i)),a.a.install=i,t.a=a.a},function(e,t,n){"use strict";t.a={inserted:function(e,t,n){e.addEventListener("paste",function(e){t.value(e)})}}},function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"upload-index"},[n("div",{directives:[{name:"paste",rawName:"v-paste",value:e.handlePaste,expression:"handlePaste"}],class:[e.uploadFoces?"upload-fo":"","upload-box"],attrs:{tabindex:"-1"},on:{focus:e.upFoces,blur:e.upBlur}},[n("p",[e._v("复制粘贴区域，鼠标点击此区域后可以使用ctrl+V的方式进行图片粘贴")]),e._v(" "),n("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"container","before-upload":e.beforeAvatarUpload,"http-request":e.uploadFiles,"on-remove":e.handleRemove,limit:e.num,"on-change":e.handleChange,"on-exceed":e.handleExceed,"file-list":e.imgList,drag:"",multiple:""}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v(e._s(e.title))]),e._v(" "),n("div",{staticClass:"annotation",attrs:{slot:"tip"},slot:"tip"},[e._v("PS: 单个文件不能大于"+e._s(e.maxSize)+"M")])],1)],1),e._v(" "),n("div",{staticStyle:{display:"none"}},[n("img",{ref:"adjLogo",staticClass:"adj-logo",attrs:{src:""}})])])},i=[],r={render:a,staticRenderFns:i};t.a=r}])});
//# sourceMappingURL=qfQiniuUpload.js.map