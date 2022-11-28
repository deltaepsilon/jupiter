"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a2, b2) => {
    for (var prop in b2 ||= {})
      if (__hasOwnProp.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b2)) {
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a2, prop, b2[prop]);
      }
    return a2;
  };
  var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a2, b2) => (typeof require !== "undefined" ? require : a2)[b2]
  }) : x2)(function(x2) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __restKey = (key) => typeof key === "symbol" ? key : key + "";
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __esm = (fn2, res) => function __init() {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  };
  var __commonJS = (cb, mod2) => function __require2() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name5 in all)
      __defProp(target, name5, { get: all[name5], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // ../../node_modules/uuid/dist/esm-browser/rng.js
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  var getRandomValues, rnds8;
  var init_rng = __esm({
    "../../node_modules/uuid/dist/esm-browser/rng.js"() {
      rnds8 = new Uint8Array(16);
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/regex.js
  var regex_default;
  var init_regex = __esm({
    "../../node_modules/uuid/dist/esm-browser/regex.js"() {
      regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/validate.js
  function validate(uuid) {
    return typeof uuid === "string" && regex_default.test(uuid);
  }
  var validate_default;
  var init_validate = __esm({
    "../../node_modules/uuid/dist/esm-browser/validate.js"() {
      init_regex();
      validate_default = validate;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/stringify.js
  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    if (!validate_default(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  }
  var byteToHex, i2, stringify_default;
  var init_stringify = __esm({
    "../../node_modules/uuid/dist/esm-browser/stringify.js"() {
      init_validate();
      byteToHex = [];
      for (i2 = 0; i2 < 256; ++i2) {
        byteToHex.push((i2 + 256).toString(16).substr(1));
      }
      stringify_default = stringify;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/v1.js
  function v1(options, buf, offset) {
    var i2 = buf && offset || 0;
    var b2 = buf || new Array(16);
    options = options || {};
    var node = options.node || _nodeId;
    var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
    if (node == null || clockseq == null) {
      var seedBytes = options.random || (options.rng || rng)();
      if (node == null) {
        node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
      }
      if (clockseq == null) {
        clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
      }
    }
    var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
    var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
    if (dt < 0 && options.clockseq === void 0) {
      clockseq = clockseq + 1 & 16383;
    }
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
      nsecs = 0;
    }
    if (nsecs >= 1e4) {
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    msecs += 122192928e5;
    var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
    b2[i2++] = tl >>> 24 & 255;
    b2[i2++] = tl >>> 16 & 255;
    b2[i2++] = tl >>> 8 & 255;
    b2[i2++] = tl & 255;
    var tmh = msecs / 4294967296 * 1e4 & 268435455;
    b2[i2++] = tmh >>> 8 & 255;
    b2[i2++] = tmh & 255;
    b2[i2++] = tmh >>> 24 & 15 | 16;
    b2[i2++] = tmh >>> 16 & 255;
    b2[i2++] = clockseq >>> 8 | 128;
    b2[i2++] = clockseq & 255;
    for (var n2 = 0; n2 < 6; ++n2) {
      b2[i2 + n2] = node[n2];
    }
    return buf || stringify_default(b2);
  }
  var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
  var init_v1 = __esm({
    "../../node_modules/uuid/dist/esm-browser/v1.js"() {
      init_rng();
      init_stringify();
      _lastMSecs = 0;
      _lastNSecs = 0;
      v1_default = v1;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/parse.js
  function parse(uuid) {
    if (!validate_default(uuid)) {
      throw TypeError("Invalid UUID");
    }
    var v2;
    var arr = new Uint8Array(16);
    arr[0] = (v2 = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v2 >>> 16 & 255;
    arr[2] = v2 >>> 8 & 255;
    arr[3] = v2 & 255;
    arr[4] = (v2 = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v2 & 255;
    arr[6] = (v2 = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v2 & 255;
    arr[8] = (v2 = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v2 & 255;
    arr[10] = (v2 = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
    arr[11] = v2 / 4294967296 & 255;
    arr[12] = v2 >>> 24 & 255;
    arr[13] = v2 >>> 16 & 255;
    arr[14] = v2 >>> 8 & 255;
    arr[15] = v2 & 255;
    return arr;
  }
  var parse_default;
  var init_parse = __esm({
    "../../node_modules/uuid/dist/esm-browser/parse.js"() {
      init_validate();
      parse_default = parse;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/v35.js
  function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    var bytes = [];
    for (var i2 = 0; i2 < str.length; ++i2) {
      bytes.push(str.charCodeAt(i2));
    }
    return bytes;
  }
  function v35_default(name5, version6, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
      if (typeof value === "string") {
        value = stringToBytes(value);
      }
      if (typeof namespace === "string") {
        namespace = parse_default(namespace);
      }
      if (namespace.length !== 16) {
        throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      }
      var bytes = new Uint8Array(16 + value.length);
      bytes.set(namespace);
      bytes.set(value, namespace.length);
      bytes = hashfunc(bytes);
      bytes[6] = bytes[6] & 15 | version6;
      bytes[8] = bytes[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (var i2 = 0; i2 < 16; ++i2) {
          buf[offset + i2] = bytes[i2];
        }
        return buf;
      }
      return stringify_default(bytes);
    }
    try {
      generateUUID.name = name5;
    } catch (err) {
    }
    generateUUID.DNS = DNS;
    generateUUID.URL = URL2;
    return generateUUID;
  }
  var DNS, URL2;
  var init_v35 = __esm({
    "../../node_modules/uuid/dist/esm-browser/v35.js"() {
      init_stringify();
      init_parse();
      DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
      URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/md5.js
  function md5(bytes) {
    if (typeof bytes === "string") {
      var msg = unescape(encodeURIComponent(bytes));
      bytes = new Uint8Array(msg.length);
      for (var i2 = 0; i2 < msg.length; ++i2) {
        bytes[i2] = msg.charCodeAt(i2);
      }
    }
    return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
  }
  function md5ToHexEncodedArray(input) {
    var output = [];
    var length32 = input.length * 32;
    var hexTab = "0123456789abcdef";
    for (var i2 = 0; i2 < length32; i2 += 8) {
      var x2 = input[i2 >> 5] >>> i2 % 32 & 255;
      var hex = parseInt(hexTab.charAt(x2 >>> 4 & 15) + hexTab.charAt(x2 & 15), 16);
      output.push(hex);
    }
    return output;
  }
  function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
  }
  function wordsToMd5(x2, len) {
    x2[len >> 5] |= 128 << len % 32;
    x2[getOutputLength(len) - 1] = len;
    var a2 = 1732584193;
    var b2 = -271733879;
    var c2 = -1732584194;
    var d2 = 271733878;
    for (var i2 = 0; i2 < x2.length; i2 += 16) {
      var olda = a2;
      var oldb = b2;
      var oldc = c2;
      var oldd = d2;
      a2 = md5ff(a2, b2, c2, d2, x2[i2], 7, -680876936);
      d2 = md5ff(d2, a2, b2, c2, x2[i2 + 1], 12, -389564586);
      c2 = md5ff(c2, d2, a2, b2, x2[i2 + 2], 17, 606105819);
      b2 = md5ff(b2, c2, d2, a2, x2[i2 + 3], 22, -1044525330);
      a2 = md5ff(a2, b2, c2, d2, x2[i2 + 4], 7, -176418897);
      d2 = md5ff(d2, a2, b2, c2, x2[i2 + 5], 12, 1200080426);
      c2 = md5ff(c2, d2, a2, b2, x2[i2 + 6], 17, -1473231341);
      b2 = md5ff(b2, c2, d2, a2, x2[i2 + 7], 22, -45705983);
      a2 = md5ff(a2, b2, c2, d2, x2[i2 + 8], 7, 1770035416);
      d2 = md5ff(d2, a2, b2, c2, x2[i2 + 9], 12, -1958414417);
      c2 = md5ff(c2, d2, a2, b2, x2[i2 + 10], 17, -42063);
      b2 = md5ff(b2, c2, d2, a2, x2[i2 + 11], 22, -1990404162);
      a2 = md5ff(a2, b2, c2, d2, x2[i2 + 12], 7, 1804603682);
      d2 = md5ff(d2, a2, b2, c2, x2[i2 + 13], 12, -40341101);
      c2 = md5ff(c2, d2, a2, b2, x2[i2 + 14], 17, -1502002290);
      b2 = md5ff(b2, c2, d2, a2, x2[i2 + 15], 22, 1236535329);
      a2 = md5gg(a2, b2, c2, d2, x2[i2 + 1], 5, -165796510);
      d2 = md5gg(d2, a2, b2, c2, x2[i2 + 6], 9, -1069501632);
      c2 = md5gg(c2, d2, a2, b2, x2[i2 + 11], 14, 643717713);
      b2 = md5gg(b2, c2, d2, a2, x2[i2], 20, -373897302);
      a2 = md5gg(a2, b2, c2, d2, x2[i2 + 5], 5, -701558691);
      d2 = md5gg(d2, a2, b2, c2, x2[i2 + 10], 9, 38016083);
      c2 = md5gg(c2, d2, a2, b2, x2[i2 + 15], 14, -660478335);
      b2 = md5gg(b2, c2, d2, a2, x2[i2 + 4], 20, -405537848);
      a2 = md5gg(a2, b2, c2, d2, x2[i2 + 9], 5, 568446438);
      d2 = md5gg(d2, a2, b2, c2, x2[i2 + 14], 9, -1019803690);
      c2 = md5gg(c2, d2, a2, b2, x2[i2 + 3], 14, -187363961);
      b2 = md5gg(b2, c2, d2, a2, x2[i2 + 8], 20, 1163531501);
      a2 = md5gg(a2, b2, c2, d2, x2[i2 + 13], 5, -1444681467);
      d2 = md5gg(d2, a2, b2, c2, x2[i2 + 2], 9, -51403784);
      c2 = md5gg(c2, d2, a2, b2, x2[i2 + 7], 14, 1735328473);
      b2 = md5gg(b2, c2, d2, a2, x2[i2 + 12], 20, -1926607734);
      a2 = md5hh(a2, b2, c2, d2, x2[i2 + 5], 4, -378558);
      d2 = md5hh(d2, a2, b2, c2, x2[i2 + 8], 11, -2022574463);
      c2 = md5hh(c2, d2, a2, b2, x2[i2 + 11], 16, 1839030562);
      b2 = md5hh(b2, c2, d2, a2, x2[i2 + 14], 23, -35309556);
      a2 = md5hh(a2, b2, c2, d2, x2[i2 + 1], 4, -1530992060);
      d2 = md5hh(d2, a2, b2, c2, x2[i2 + 4], 11, 1272893353);
      c2 = md5hh(c2, d2, a2, b2, x2[i2 + 7], 16, -155497632);
      b2 = md5hh(b2, c2, d2, a2, x2[i2 + 10], 23, -1094730640);
      a2 = md5hh(a2, b2, c2, d2, x2[i2 + 13], 4, 681279174);
      d2 = md5hh(d2, a2, b2, c2, x2[i2], 11, -358537222);
      c2 = md5hh(c2, d2, a2, b2, x2[i2 + 3], 16, -722521979);
      b2 = md5hh(b2, c2, d2, a2, x2[i2 + 6], 23, 76029189);
      a2 = md5hh(a2, b2, c2, d2, x2[i2 + 9], 4, -640364487);
      d2 = md5hh(d2, a2, b2, c2, x2[i2 + 12], 11, -421815835);
      c2 = md5hh(c2, d2, a2, b2, x2[i2 + 15], 16, 530742520);
      b2 = md5hh(b2, c2, d2, a2, x2[i2 + 2], 23, -995338651);
      a2 = md5ii(a2, b2, c2, d2, x2[i2], 6, -198630844);
      d2 = md5ii(d2, a2, b2, c2, x2[i2 + 7], 10, 1126891415);
      c2 = md5ii(c2, d2, a2, b2, x2[i2 + 14], 15, -1416354905);
      b2 = md5ii(b2, c2, d2, a2, x2[i2 + 5], 21, -57434055);
      a2 = md5ii(a2, b2, c2, d2, x2[i2 + 12], 6, 1700485571);
      d2 = md5ii(d2, a2, b2, c2, x2[i2 + 3], 10, -1894986606);
      c2 = md5ii(c2, d2, a2, b2, x2[i2 + 10], 15, -1051523);
      b2 = md5ii(b2, c2, d2, a2, x2[i2 + 1], 21, -2054922799);
      a2 = md5ii(a2, b2, c2, d2, x2[i2 + 8], 6, 1873313359);
      d2 = md5ii(d2, a2, b2, c2, x2[i2 + 15], 10, -30611744);
      c2 = md5ii(c2, d2, a2, b2, x2[i2 + 6], 15, -1560198380);
      b2 = md5ii(b2, c2, d2, a2, x2[i2 + 13], 21, 1309151649);
      a2 = md5ii(a2, b2, c2, d2, x2[i2 + 4], 6, -145523070);
      d2 = md5ii(d2, a2, b2, c2, x2[i2 + 11], 10, -1120210379);
      c2 = md5ii(c2, d2, a2, b2, x2[i2 + 2], 15, 718787259);
      b2 = md5ii(b2, c2, d2, a2, x2[i2 + 9], 21, -343485551);
      a2 = safeAdd(a2, olda);
      b2 = safeAdd(b2, oldb);
      c2 = safeAdd(c2, oldc);
      d2 = safeAdd(d2, oldd);
    }
    return [a2, b2, c2, d2];
  }
  function bytesToWords(input) {
    if (input.length === 0) {
      return [];
    }
    var length8 = input.length * 8;
    var output = new Uint32Array(getOutputLength(length8));
    for (var i2 = 0; i2 < length8; i2 += 8) {
      output[i2 >> 5] |= (input[i2 / 8] & 255) << i2 % 32;
    }
    return output;
  }
  function safeAdd(x2, y2) {
    var lsw = (x2 & 65535) + (y2 & 65535);
    var msw = (x2 >> 16) + (y2 >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535;
  }
  function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  }
  function md5cmn(q2, a2, b2, x2, s2, t2) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a2, q2), safeAdd(x2, t2)), s2), b2);
  }
  function md5ff(a2, b2, c2, d2, x2, s2, t2) {
    return md5cmn(b2 & c2 | ~b2 & d2, a2, b2, x2, s2, t2);
  }
  function md5gg(a2, b2, c2, d2, x2, s2, t2) {
    return md5cmn(b2 & d2 | c2 & ~d2, a2, b2, x2, s2, t2);
  }
  function md5hh(a2, b2, c2, d2, x2, s2, t2) {
    return md5cmn(b2 ^ c2 ^ d2, a2, b2, x2, s2, t2);
  }
  function md5ii(a2, b2, c2, d2, x2, s2, t2) {
    return md5cmn(c2 ^ (b2 | ~d2), a2, b2, x2, s2, t2);
  }
  var md5_default;
  var init_md5 = __esm({
    "../../node_modules/uuid/dist/esm-browser/md5.js"() {
      md5_default = md5;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/v3.js
  var v3, v3_default;
  var init_v3 = __esm({
    "../../node_modules/uuid/dist/esm-browser/v3.js"() {
      init_v35();
      init_md5();
      v3 = v35_default("v3", 48, md5_default);
      v3_default = v3;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i2 = 0; i2 < 16; ++i2) {
        buf[offset + i2] = rnds[i2];
      }
      return buf;
    }
    return stringify_default(rnds);
  }
  var v4_default;
  var init_v4 = __esm({
    "../../node_modules/uuid/dist/esm-browser/v4.js"() {
      init_rng();
      init_stringify();
      v4_default = v4;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/sha1.js
  function f(s2, x2, y2, z2) {
    switch (s2) {
      case 0:
        return x2 & y2 ^ ~x2 & z2;
      case 1:
        return x2 ^ y2 ^ z2;
      case 2:
        return x2 & y2 ^ x2 & z2 ^ y2 & z2;
      case 3:
        return x2 ^ y2 ^ z2;
    }
  }
  function ROTL(x2, n2) {
    return x2 << n2 | x2 >>> 32 - n2;
  }
  function sha1(bytes) {
    var K = [1518500249, 1859775393, 2400959708, 3395469782];
    var H2 = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    if (typeof bytes === "string") {
      var msg = unescape(encodeURIComponent(bytes));
      bytes = [];
      for (var i2 = 0; i2 < msg.length; ++i2) {
        bytes.push(msg.charCodeAt(i2));
      }
    } else if (!Array.isArray(bytes)) {
      bytes = Array.prototype.slice.call(bytes);
    }
    bytes.push(128);
    var l2 = bytes.length / 4 + 2;
    var N = Math.ceil(l2 / 16);
    var M2 = new Array(N);
    for (var _i = 0; _i < N; ++_i) {
      var arr = new Uint32Array(16);
      for (var j2 = 0; j2 < 16; ++j2) {
        arr[j2] = bytes[_i * 64 + j2 * 4] << 24 | bytes[_i * 64 + j2 * 4 + 1] << 16 | bytes[_i * 64 + j2 * 4 + 2] << 8 | bytes[_i * 64 + j2 * 4 + 3];
      }
      M2[_i] = arr;
    }
    M2[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M2[N - 1][14] = Math.floor(M2[N - 1][14]);
    M2[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
    for (var _i2 = 0; _i2 < N; ++_i2) {
      var W2 = new Uint32Array(80);
      for (var t2 = 0; t2 < 16; ++t2) {
        W2[t2] = M2[_i2][t2];
      }
      for (var _t = 16; _t < 80; ++_t) {
        W2[_t] = ROTL(W2[_t - 3] ^ W2[_t - 8] ^ W2[_t - 14] ^ W2[_t - 16], 1);
      }
      var a2 = H2[0];
      var b2 = H2[1];
      var c2 = H2[2];
      var d2 = H2[3];
      var e = H2[4];
      for (var _t2 = 0; _t2 < 80; ++_t2) {
        var s2 = Math.floor(_t2 / 20);
        var T = ROTL(a2, 5) + f(s2, b2, c2, d2) + e + K[s2] + W2[_t2] >>> 0;
        e = d2;
        d2 = c2;
        c2 = ROTL(b2, 30) >>> 0;
        b2 = a2;
        a2 = T;
      }
      H2[0] = H2[0] + a2 >>> 0;
      H2[1] = H2[1] + b2 >>> 0;
      H2[2] = H2[2] + c2 >>> 0;
      H2[3] = H2[3] + d2 >>> 0;
      H2[4] = H2[4] + e >>> 0;
    }
    return [H2[0] >> 24 & 255, H2[0] >> 16 & 255, H2[0] >> 8 & 255, H2[0] & 255, H2[1] >> 24 & 255, H2[1] >> 16 & 255, H2[1] >> 8 & 255, H2[1] & 255, H2[2] >> 24 & 255, H2[2] >> 16 & 255, H2[2] >> 8 & 255, H2[2] & 255, H2[3] >> 24 & 255, H2[3] >> 16 & 255, H2[3] >> 8 & 255, H2[3] & 255, H2[4] >> 24 & 255, H2[4] >> 16 & 255, H2[4] >> 8 & 255, H2[4] & 255];
  }
  var sha1_default;
  var init_sha1 = __esm({
    "../../node_modules/uuid/dist/esm-browser/sha1.js"() {
      sha1_default = sha1;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/v5.js
  var v5, v5_default;
  var init_v5 = __esm({
    "../../node_modules/uuid/dist/esm-browser/v5.js"() {
      init_v35();
      init_sha1();
      v5 = v35_default("v5", 80, sha1_default);
      v5_default = v5;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/nil.js
  var nil_default;
  var init_nil = __esm({
    "../../node_modules/uuid/dist/esm-browser/nil.js"() {
      nil_default = "00000000-0000-0000-0000-000000000000";
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/version.js
  function version(uuid) {
    if (!validate_default(uuid)) {
      throw TypeError("Invalid UUID");
    }
    return parseInt(uuid.substr(14, 1), 16);
  }
  var version_default;
  var init_version = __esm({
    "../../node_modules/uuid/dist/esm-browser/version.js"() {
      init_validate();
      version_default = version;
    }
  });

  // ../../node_modules/uuid/dist/esm-browser/index.js
  var esm_browser_exports = {};
  __export(esm_browser_exports, {
    NIL: () => nil_default,
    parse: () => parse_default,
    stringify: () => stringify_default,
    v1: () => v1_default,
    v3: () => v3_default,
    v4: () => v4_default,
    v5: () => v5_default,
    validate: () => validate_default,
    version: () => version_default
  });
  var init_esm_browser = __esm({
    "../../node_modules/uuid/dist/esm-browser/index.js"() {
      init_v1();
      init_v3();
      init_v4();
      init_v5();
      init_nil();
      init_version();
      init_validate();
      init_stringify();
      init_parse();
    }
  });

  // ../../node_modules/any-base/src/converter.js
  var require_converter = __commonJS({
    "../../node_modules/any-base/src/converter.js"(exports, module) {
      "use strict";
      function Converter(srcAlphabet, dstAlphabet) {
        if (!srcAlphabet || !dstAlphabet || !srcAlphabet.length || !dstAlphabet.length) {
          throw new Error("Bad alphabet");
        }
        this.srcAlphabet = srcAlphabet;
        this.dstAlphabet = dstAlphabet;
      }
      Converter.prototype.convert = function(number) {
        var i2, divide, newlen, numberMap = {}, fromBase = this.srcAlphabet.length, toBase = this.dstAlphabet.length, length = number.length, result = typeof number === "string" ? "" : [];
        if (!this.isValid(number)) {
          throw new Error('Number "' + number + '" contains of non-alphabetic digits (' + this.srcAlphabet + ")");
        }
        if (this.srcAlphabet === this.dstAlphabet) {
          return number;
        }
        for (i2 = 0; i2 < length; i2++) {
          numberMap[i2] = this.srcAlphabet.indexOf(number[i2]);
        }
        do {
          divide = 0;
          newlen = 0;
          for (i2 = 0; i2 < length; i2++) {
            divide = divide * fromBase + numberMap[i2];
            if (divide >= toBase) {
              numberMap[newlen++] = parseInt(divide / toBase, 10);
              divide = divide % toBase;
            } else if (newlen > 0) {
              numberMap[newlen++] = 0;
            }
          }
          length = newlen;
          result = this.dstAlphabet.slice(divide, divide + 1).concat(result);
        } while (newlen !== 0);
        return result;
      };
      Converter.prototype.isValid = function(number) {
        var i2 = 0;
        for (; i2 < number.length; ++i2) {
          if (this.srcAlphabet.indexOf(number[i2]) === -1) {
            return false;
          }
        }
        return true;
      };
      module.exports = Converter;
    }
  });

  // ../../node_modules/any-base/index.js
  var require_any_base = __commonJS({
    "../../node_modules/any-base/index.js"(exports, module) {
      var Converter = require_converter();
      function anyBase(srcAlphabet, dstAlphabet) {
        var converter = new Converter(srcAlphabet, dstAlphabet);
        return function(number) {
          return converter.convert(number);
        };
      }
      anyBase.BIN = "01";
      anyBase.OCT = "01234567";
      anyBase.DEC = "0123456789";
      anyBase.HEX = "0123456789abcdef";
      module.exports = anyBase;
    }
  });

  // ../../node_modules/short-uuid/index.js
  var require_short_uuid = __commonJS({
    "../../node_modules/short-uuid/index.js"(exports, module) {
      var { v4: uuidv4 } = (init_esm_browser(), __toCommonJS(esm_browser_exports));
      var anyBase = require_any_base();
      var flickrBase58 = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
      var cookieBase90 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~";
      var baseOptions = {
        consistentLength: true
      };
      var toFlickr;
      var shortenUUID = (longId, translator, paddingParams) => {
        const translated = translator(longId.toLowerCase().replace(/-/g, ""));
        if (!paddingParams || !paddingParams.consistentLength)
          return translated;
        return translated.padStart(
          paddingParams.shortIdLength,
          paddingParams.paddingChar
        );
      };
      var enlargeUUID = (shortId, translator) => {
        const uu1 = translator(shortId).padStart(32, "0");
        const m2 = uu1.match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/);
        return [m2[1], m2[2], m2[3], m2[4], m2[5]].join("-");
      };
      var getShortIdLength = (alphabetLength) => Math.ceil(Math.log(2 ** 128) / Math.log(alphabetLength));
      module.exports = (() => {
        const makeConvertor = (toAlphabet, options) => {
          const useAlphabet = toAlphabet || flickrBase58;
          const selectedOptions = { ...baseOptions, ...options };
          if ([...new Set(Array.from(useAlphabet))].length !== useAlphabet.length) {
            throw new Error("The provided Alphabet has duplicate characters resulting in unreliable results");
          }
          const shortIdLength = getShortIdLength(useAlphabet.length);
          const paddingParams = {
            shortIdLength,
            consistentLength: selectedOptions.consistentLength,
            paddingChar: useAlphabet[0]
          };
          const fromHex = anyBase(anyBase.HEX, useAlphabet);
          const toHex = anyBase(useAlphabet, anyBase.HEX);
          const generate = () => shortenUUID(uuidv4(), fromHex, paddingParams);
          const translator = {
            new: generate,
            generate,
            uuid: uuidv4,
            fromUUID: (uuid) => shortenUUID(uuid, fromHex, paddingParams),
            toUUID: (shortUuid) => enlargeUUID(shortUuid, toHex),
            alphabet: useAlphabet,
            maxLength: shortIdLength
          };
          Object.freeze(translator);
          return translator;
        };
        makeConvertor.constants = {
          flickrBase58,
          cookieBase90
        };
        makeConvertor.uuid = uuidv4;
        makeConvertor.generate = () => {
          if (!toFlickr) {
            toFlickr = makeConvertor(flickrBase58).generate;
          }
          return toFlickr();
        };
        return makeConvertor;
      })();
    }
  });

  // ../../node_modules/localforage/dist/localforage.js
  var require_localforage = __commonJS({
    "../../node_modules/localforage/dist/localforage.js"(exports, module) {
      (function(f3) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f3();
        } else if (typeof define === "function" && define.amd) {
          define([], f3);
        } else {
          var g2;
          if (typeof window !== "undefined") {
            g2 = window;
          } else if (typeof global !== "undefined") {
            g2 = global;
          } else if (typeof self !== "undefined") {
            g2 = self;
          } else {
            g2 = this;
          }
          g2.localforage = f3();
        }
      })(function() {
        var define2, module2, exports2;
        return function e(t2, n2, r2) {
          function s2(o3, u2) {
            if (!n2[o3]) {
              if (!t2[o3]) {
                var a2 = typeof __require == "function" && __require;
                if (!u2 && a2)
                  return a2(o3, true);
                if (i2)
                  return i2(o3, true);
                var f3 = new Error("Cannot find module '" + o3 + "'");
                throw f3.code = "MODULE_NOT_FOUND", f3;
              }
              var l2 = n2[o3] = { exports: {} };
              t2[o3][0].call(l2.exports, function(e2) {
                var n3 = t2[o3][1][e2];
                return s2(n3 ? n3 : e2);
              }, l2, l2.exports, e, t2, n2, r2);
            }
            return n2[o3].exports;
          }
          var i2 = typeof __require == "function" && __require;
          for (var o2 = 0; o2 < r2.length; o2++)
            s2(r2[o2]);
          return s2;
        }({ 1: [function(_dereq_, module3, exports3) {
          (function(global2) {
            "use strict";
            var Mutation = global2.MutationObserver || global2.WebKitMutationObserver;
            var scheduleDrain;
            {
              if (Mutation) {
                var called = 0;
                var observer = new Mutation(nextTick);
                var element = global2.document.createTextNode("");
                observer.observe(element, {
                  characterData: true
                });
                scheduleDrain = function() {
                  element.data = called = ++called % 2;
                };
              } else if (!global2.setImmediate && typeof global2.MessageChannel !== "undefined") {
                var channel = new global2.MessageChannel();
                channel.port1.onmessage = nextTick;
                scheduleDrain = function() {
                  channel.port2.postMessage(0);
                };
              } else if ("document" in global2 && "onreadystatechange" in global2.document.createElement("script")) {
                scheduleDrain = function() {
                  var scriptEl = global2.document.createElement("script");
                  scriptEl.onreadystatechange = function() {
                    nextTick();
                    scriptEl.onreadystatechange = null;
                    scriptEl.parentNode.removeChild(scriptEl);
                    scriptEl = null;
                  };
                  global2.document.documentElement.appendChild(scriptEl);
                };
              } else {
                scheduleDrain = function() {
                  setTimeout(nextTick, 0);
                };
              }
            }
            var draining;
            var queue = [];
            function nextTick() {
              draining = true;
              var i2, oldQueue;
              var len = queue.length;
              while (len) {
                oldQueue = queue;
                queue = [];
                i2 = -1;
                while (++i2 < len) {
                  oldQueue[i2]();
                }
                len = queue.length;
              }
              draining = false;
            }
            module3.exports = immediate;
            function immediate(task) {
              if (queue.push(task) === 1 && !draining) {
                scheduleDrain();
              }
            }
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {}], 2: [function(_dereq_, module3, exports3) {
          "use strict";
          var immediate = _dereq_(1);
          function INTERNAL() {
          }
          var handlers = {};
          var REJECTED = ["REJECTED"];
          var FULFILLED = ["FULFILLED"];
          var PENDING = ["PENDING"];
          module3.exports = Promise2;
          function Promise2(resolver) {
            if (typeof resolver !== "function") {
              throw new TypeError("resolver must be a function");
            }
            this.state = PENDING;
            this.queue = [];
            this.outcome = void 0;
            if (resolver !== INTERNAL) {
              safelyResolveThenable(this, resolver);
            }
          }
          Promise2.prototype["catch"] = function(onRejected) {
            return this.then(null, onRejected);
          };
          Promise2.prototype.then = function(onFulfilled, onRejected) {
            if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
              return this;
            }
            var promise = new this.constructor(INTERNAL);
            if (this.state !== PENDING) {
              var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
              unwrap2(promise, resolver, this.outcome);
            } else {
              this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
            }
            return promise;
          };
          function QueueItem(promise, onFulfilled, onRejected) {
            this.promise = promise;
            if (typeof onFulfilled === "function") {
              this.onFulfilled = onFulfilled;
              this.callFulfilled = this.otherCallFulfilled;
            }
            if (typeof onRejected === "function") {
              this.onRejected = onRejected;
              this.callRejected = this.otherCallRejected;
            }
          }
          QueueItem.prototype.callFulfilled = function(value) {
            handlers.resolve(this.promise, value);
          };
          QueueItem.prototype.otherCallFulfilled = function(value) {
            unwrap2(this.promise, this.onFulfilled, value);
          };
          QueueItem.prototype.callRejected = function(value) {
            handlers.reject(this.promise, value);
          };
          QueueItem.prototype.otherCallRejected = function(value) {
            unwrap2(this.promise, this.onRejected, value);
          };
          function unwrap2(promise, func, value) {
            immediate(function() {
              var returnValue;
              try {
                returnValue = func(value);
              } catch (e) {
                return handlers.reject(promise, e);
              }
              if (returnValue === promise) {
                handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
              } else {
                handlers.resolve(promise, returnValue);
              }
            });
          }
          handlers.resolve = function(self2, value) {
            var result = tryCatch(getThen, value);
            if (result.status === "error") {
              return handlers.reject(self2, result.value);
            }
            var thenable = result.value;
            if (thenable) {
              safelyResolveThenable(self2, thenable);
            } else {
              self2.state = FULFILLED;
              self2.outcome = value;
              var i2 = -1;
              var len = self2.queue.length;
              while (++i2 < len) {
                self2.queue[i2].callFulfilled(value);
              }
            }
            return self2;
          };
          handlers.reject = function(self2, error2) {
            self2.state = REJECTED;
            self2.outcome = error2;
            var i2 = -1;
            var len = self2.queue.length;
            while (++i2 < len) {
              self2.queue[i2].callRejected(error2);
            }
            return self2;
          };
          function getThen(obj) {
            var then = obj && obj.then;
            if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
              return function appyThen() {
                then.apply(obj, arguments);
              };
            }
          }
          function safelyResolveThenable(self2, thenable) {
            var called = false;
            function onError(value) {
              if (called) {
                return;
              }
              called = true;
              handlers.reject(self2, value);
            }
            function onSuccess(value) {
              if (called) {
                return;
              }
              called = true;
              handlers.resolve(self2, value);
            }
            function tryToUnwrap() {
              thenable(onSuccess, onError);
            }
            var result = tryCatch(tryToUnwrap);
            if (result.status === "error") {
              onError(result.value);
            }
          }
          function tryCatch(func, value) {
            var out = {};
            try {
              out.value = func(value);
              out.status = "success";
            } catch (e) {
              out.status = "error";
              out.value = e;
            }
            return out;
          }
          Promise2.resolve = resolve;
          function resolve(value) {
            if (value instanceof this) {
              return value;
            }
            return handlers.resolve(new this(INTERNAL), value);
          }
          Promise2.reject = reject;
          function reject(reason) {
            var promise = new this(INTERNAL);
            return handlers.reject(promise, reason);
          }
          Promise2.all = all;
          function all(iterable) {
            var self2 = this;
            if (Object.prototype.toString.call(iterable) !== "[object Array]") {
              return this.reject(new TypeError("must be an array"));
            }
            var len = iterable.length;
            var called = false;
            if (!len) {
              return this.resolve([]);
            }
            var values = new Array(len);
            var resolved = 0;
            var i2 = -1;
            var promise = new this(INTERNAL);
            while (++i2 < len) {
              allResolver(iterable[i2], i2);
            }
            return promise;
            function allResolver(value, i3) {
              self2.resolve(value).then(resolveFromAll, function(error2) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error2);
                }
              });
              function resolveFromAll(outValue) {
                values[i3] = outValue;
                if (++resolved === len && !called) {
                  called = true;
                  handlers.resolve(promise, values);
                }
              }
            }
          }
          Promise2.race = race;
          function race(iterable) {
            var self2 = this;
            if (Object.prototype.toString.call(iterable) !== "[object Array]") {
              return this.reject(new TypeError("must be an array"));
            }
            var len = iterable.length;
            var called = false;
            if (!len) {
              return this.resolve([]);
            }
            var i2 = -1;
            var promise = new this(INTERNAL);
            while (++i2 < len) {
              resolver(iterable[i2]);
            }
            return promise;
            function resolver(value) {
              self2.resolve(value).then(function(response) {
                if (!called) {
                  called = true;
                  handlers.resolve(promise, response);
                }
              }, function(error2) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error2);
                }
              });
            }
          }
        }, { "1": 1 }], 3: [function(_dereq_, module3, exports3) {
          (function(global2) {
            "use strict";
            if (typeof global2.Promise !== "function") {
              global2.Promise = _dereq_(2);
            }
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, { "2": 2 }], 4: [function(_dereq_, module3, exports3) {
          "use strict";
          var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
          } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function getIDB() {
            try {
              if (typeof indexedDB !== "undefined") {
                return indexedDB;
              }
              if (typeof webkitIndexedDB !== "undefined") {
                return webkitIndexedDB;
              }
              if (typeof mozIndexedDB !== "undefined") {
                return mozIndexedDB;
              }
              if (typeof OIndexedDB !== "undefined") {
                return OIndexedDB;
              }
              if (typeof msIndexedDB !== "undefined") {
                return msIndexedDB;
              }
            } catch (e) {
              return;
            }
          }
          var idb = getIDB();
          function isIndexedDBValid() {
            try {
              if (!idb || !idb.open) {
                return false;
              }
              var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
              var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
              return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && typeof IDBKeyRange !== "undefined";
            } catch (e) {
              return false;
            }
          }
          function createBlob(parts, properties) {
            parts = parts || [];
            properties = properties || {};
            try {
              return new Blob(parts, properties);
            } catch (e) {
              if (e.name !== "TypeError") {
                throw e;
              }
              var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
              var builder = new Builder();
              for (var i2 = 0; i2 < parts.length; i2 += 1) {
                builder.append(parts[i2]);
              }
              return builder.getBlob(properties.type);
            }
          }
          if (typeof Promise === "undefined") {
            _dereq_(3);
          }
          var Promise$1 = Promise;
          function executeCallback(promise, callback) {
            if (callback) {
              promise.then(function(result) {
                callback(null, result);
              }, function(error2) {
                callback(error2);
              });
            }
          }
          function executeTwoCallbacks(promise, callback, errorCallback) {
            if (typeof callback === "function") {
              promise.then(callback);
            }
            if (typeof errorCallback === "function") {
              promise["catch"](errorCallback);
            }
          }
          function normalizeKey(key2) {
            if (typeof key2 !== "string") {
              console.warn(key2 + " used as a key, but it is not a string.");
              key2 = String(key2);
            }
            return key2;
          }
          function getCallback() {
            if (arguments.length && typeof arguments[arguments.length - 1] === "function") {
              return arguments[arguments.length - 1];
            }
          }
          var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
          var supportsBlobs = void 0;
          var dbContexts = {};
          var toString = Object.prototype.toString;
          var READ_ONLY = "readonly";
          var READ_WRITE = "readwrite";
          function _binStringToArrayBuffer(bin) {
            var length2 = bin.length;
            var buf = new ArrayBuffer(length2);
            var arr = new Uint8Array(buf);
            for (var i2 = 0; i2 < length2; i2++) {
              arr[i2] = bin.charCodeAt(i2);
            }
            return buf;
          }
          function _checkBlobSupportWithoutCaching(idb2) {
            return new Promise$1(function(resolve) {
              var txn = idb2.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
              var blob = createBlob([""]);
              txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
              txn.onabort = function(e) {
                e.preventDefault();
                e.stopPropagation();
                resolve(false);
              };
              txn.oncomplete = function() {
                var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                var matchedEdge = navigator.userAgent.match(/Edge\//);
                resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
              };
            })["catch"](function() {
              return false;
            });
          }
          function _checkBlobSupport(idb2) {
            if (typeof supportsBlobs === "boolean") {
              return Promise$1.resolve(supportsBlobs);
            }
            return _checkBlobSupportWithoutCaching(idb2).then(function(value) {
              supportsBlobs = value;
              return supportsBlobs;
            });
          }
          function _deferReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = {};
            deferredOperation.promise = new Promise$1(function(resolve, reject) {
              deferredOperation.resolve = resolve;
              deferredOperation.reject = reject;
            });
            dbContext.deferredOperations.push(deferredOperation);
            if (!dbContext.dbReady) {
              dbContext.dbReady = deferredOperation.promise;
            } else {
              dbContext.dbReady = dbContext.dbReady.then(function() {
                return deferredOperation.promise;
              });
            }
          }
          function _advanceReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = dbContext.deferredOperations.pop();
            if (deferredOperation) {
              deferredOperation.resolve();
              return deferredOperation.promise;
            }
          }
          function _rejectReadiness(dbInfo, err) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = dbContext.deferredOperations.pop();
            if (deferredOperation) {
              deferredOperation.reject(err);
              return deferredOperation.promise;
            }
          }
          function _getConnection(dbInfo, upgradeNeeded) {
            return new Promise$1(function(resolve, reject) {
              dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
              if (dbInfo.db) {
                if (upgradeNeeded) {
                  _deferReadiness(dbInfo);
                  dbInfo.db.close();
                } else {
                  return resolve(dbInfo.db);
                }
              }
              var dbArgs = [dbInfo.name];
              if (upgradeNeeded) {
                dbArgs.push(dbInfo.version);
              }
              var openreq = idb.open.apply(idb, dbArgs);
              if (upgradeNeeded) {
                openreq.onupgradeneeded = function(e) {
                  var db = openreq.result;
                  try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                      db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                  } catch (ex) {
                    if (ex.name === "ConstraintError") {
                      console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e.oldVersion + " to version " + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                      throw ex;
                    }
                  }
                };
              }
              openreq.onerror = function(e) {
                e.preventDefault();
                reject(openreq.error);
              };
              openreq.onsuccess = function() {
                var db = openreq.result;
                db.onversionchange = function(e) {
                  e.target.close();
                };
                resolve(db);
                _advanceReadiness(dbInfo);
              };
            });
          }
          function _getOriginalConnection(dbInfo) {
            return _getConnection(dbInfo, false);
          }
          function _getUpgradedConnection(dbInfo) {
            return _getConnection(dbInfo, true);
          }
          function _isUpgradeNeeded(dbInfo, defaultVersion) {
            if (!dbInfo.db) {
              return true;
            }
            var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
            var isDowngrade = dbInfo.version < dbInfo.db.version;
            var isUpgrade = dbInfo.version > dbInfo.db.version;
            if (isDowngrade) {
              if (dbInfo.version !== defaultVersion) {
                console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + ".");
              }
              dbInfo.version = dbInfo.db.version;
            }
            if (isUpgrade || isNewStore) {
              if (isNewStore) {
                var incVersion = dbInfo.db.version + 1;
                if (incVersion > dbInfo.version) {
                  dbInfo.version = incVersion;
                }
              }
              return true;
            }
            return false;
          }
          function _encodeBlob(blob) {
            return new Promise$1(function(resolve, reject) {
              var reader = new FileReader();
              reader.onerror = reject;
              reader.onloadend = function(e) {
                var base642 = btoa(e.target.result || "");
                resolve({
                  __local_forage_encoded_blob: true,
                  data: base642,
                  type: blob.type
                });
              };
              reader.readAsBinaryString(blob);
            });
          }
          function _decodeBlob(encodedBlob) {
            var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
            return createBlob([arrayBuff], { type: encodedBlob.type });
          }
          function _isEncodedBlob(value) {
            return value && value.__local_forage_encoded_blob;
          }
          function _fullyReady(callback) {
            var self2 = this;
            var promise = self2._initReady().then(function() {
              var dbContext = dbContexts[self2._dbInfo.name];
              if (dbContext && dbContext.dbReady) {
                return dbContext.dbReady;
              }
            });
            executeTwoCallbacks(promise, callback, callback);
            return promise;
          }
          function _tryReconnect(dbInfo) {
            _deferReadiness(dbInfo);
            var dbContext = dbContexts[dbInfo.name];
            var forages = dbContext.forages;
            for (var i2 = 0; i2 < forages.length; i2++) {
              var forage = forages[i2];
              if (forage._dbInfo.db) {
                forage._dbInfo.db.close();
                forage._dbInfo.db = null;
              }
            }
            dbInfo.db = null;
            return _getOriginalConnection(dbInfo).then(function(db) {
              dbInfo.db = db;
              if (_isUpgradeNeeded(dbInfo)) {
                return _getUpgradedConnection(dbInfo);
              }
              return db;
            }).then(function(db) {
              dbInfo.db = dbContext.db = db;
              for (var i3 = 0; i3 < forages.length; i3++) {
                forages[i3]._dbInfo.db = db;
              }
            })["catch"](function(err) {
              _rejectReadiness(dbInfo, err);
              throw err;
            });
          }
          function createTransaction(dbInfo, mode, callback, retries) {
            if (retries === void 0) {
              retries = 1;
            }
            try {
              var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
              callback(null, tx);
            } catch (err) {
              if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) {
                return Promise$1.resolve().then(function() {
                  if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    if (dbInfo.db) {
                      dbInfo.version = dbInfo.db.version + 1;
                    }
                    return _getUpgradedConnection(dbInfo);
                  }
                }).then(function() {
                  return _tryReconnect(dbInfo).then(function() {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                  });
                })["catch"](callback);
              }
              callback(err);
            }
          }
          function createDbContext() {
            return {
              forages: [],
              db: null,
              dbReady: null,
              deferredOperations: []
            };
          }
          function _initStorage(options) {
            var self2 = this;
            var dbInfo = {
              db: null
            };
            if (options) {
              for (var i2 in options) {
                dbInfo[i2] = options[i2];
              }
            }
            var dbContext = dbContexts[dbInfo.name];
            if (!dbContext) {
              dbContext = createDbContext();
              dbContexts[dbInfo.name] = dbContext;
            }
            dbContext.forages.push(self2);
            if (!self2._initReady) {
              self2._initReady = self2.ready;
              self2.ready = _fullyReady;
            }
            var initPromises = [];
            function ignoreErrors() {
              return Promise$1.resolve();
            }
            for (var j2 = 0; j2 < dbContext.forages.length; j2++) {
              var forage = dbContext.forages[j2];
              if (forage !== self2) {
                initPromises.push(forage._initReady()["catch"](ignoreErrors));
              }
            }
            var forages = dbContext.forages.slice(0);
            return Promise$1.all(initPromises).then(function() {
              dbInfo.db = dbContext.db;
              return _getOriginalConnection(dbInfo);
            }).then(function(db) {
              dbInfo.db = db;
              if (_isUpgradeNeeded(dbInfo, self2._defaultConfig.version)) {
                return _getUpgradedConnection(dbInfo);
              }
              return db;
            }).then(function(db) {
              dbInfo.db = dbContext.db = db;
              self2._dbInfo = dbInfo;
              for (var k2 = 0; k2 < forages.length; k2++) {
                var forage2 = forages[k2];
                if (forage2 !== self2) {
                  forage2._dbInfo.db = dbInfo.db;
                  forage2._dbInfo.version = dbInfo.version;
                }
              }
            });
          }
          function getItem(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.get(key2);
                    req.onsuccess = function() {
                      var value = req.result;
                      if (value === void 0) {
                        value = null;
                      }
                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }
                      resolve(value);
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate(iterator, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;
                    req.onsuccess = function() {
                      var cursor = req.result;
                      if (cursor) {
                        var value = cursor.value;
                        if (_isEncodedBlob(value)) {
                          value = _decodeBlob(value);
                        }
                        var result = iterator(value, cursor.key, iterationNumber++);
                        if (result !== void 0) {
                          resolve(result);
                        } else {
                          cursor["continue"]();
                        }
                      } else {
                        resolve();
                      }
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem(key2, value, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              var dbInfo;
              self2.ready().then(function() {
                dbInfo = self2._dbInfo;
                if (toString.call(value) === "[object Blob]") {
                  return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                    if (blobSupport) {
                      return value;
                    }
                    return _encodeBlob(value);
                  });
                }
                return value;
              }).then(function(value2) {
                createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    if (value2 === null) {
                      value2 = void 0;
                    }
                    var req = store.put(value2, key2);
                    transaction.oncomplete = function() {
                      if (value2 === void 0) {
                        value2 = null;
                      }
                      resolve(value2);
                    };
                    transaction.onabort = transaction.onerror = function() {
                      var err2 = req.error ? req.error : req.transaction.error;
                      reject(err2);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function removeItem(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store["delete"](key2);
                    transaction.oncomplete = function() {
                      resolve();
                    };
                    transaction.onerror = function() {
                      reject(req.error);
                    };
                    transaction.onabort = function() {
                      var err2 = req.error ? req.error : req.transaction.error;
                      reject(err2);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function clear2(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.clear();
                    transaction.oncomplete = function() {
                      resolve();
                    };
                    transaction.onabort = transaction.onerror = function() {
                      var err2 = req.error ? req.error : req.transaction.error;
                      reject(err2);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.count();
                    req.onsuccess = function() {
                      resolve(req.result);
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key(n2, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              if (n2 < 0) {
                resolve(null);
                return;
              }
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();
                    req.onsuccess = function() {
                      var cursor = req.result;
                      if (!cursor) {
                        resolve(null);
                        return;
                      }
                      if (n2 === 0) {
                        resolve(cursor.key);
                      } else {
                        if (!advanced) {
                          advanced = true;
                          cursor.advance(n2);
                        } else {
                          resolve(cursor.key);
                        }
                      }
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys2 = [];
                    req.onsuccess = function() {
                      var cursor = req.result;
                      if (!cursor) {
                        resolve(keys2);
                        return;
                      }
                      keys2.push(cursor.key);
                      cursor["continue"]();
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function dropInstance(options, callback) {
            callback = getCallback.apply(this, arguments);
            var currentConfig = this.config();
            options = typeof options !== "function" && options || {};
            if (!options.name) {
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self2 = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject("Invalid arguments");
            } else {
              var isCurrentDb = options.name === currentConfig.name && self2._dbInfo.db;
              var dbPromise2 = isCurrentDb ? Promise$1.resolve(self2._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                dbContext.db = db;
                for (var i2 = 0; i2 < forages.length; i2++) {
                  forages[i2]._dbInfo.db = db;
                }
                return db;
              });
              if (!options.storeName) {
                promise = dbPromise2.then(function(db) {
                  _deferReadiness(options);
                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  db.close();
                  for (var i2 = 0; i2 < forages.length; i2++) {
                    var forage = forages[i2];
                    forage._dbInfo.db = null;
                  }
                  var dropDBPromise = new Promise$1(function(resolve, reject) {
                    var req = idb.deleteDatabase(options.name);
                    req.onerror = function() {
                      var db2 = req.result;
                      if (db2) {
                        db2.close();
                      }
                      reject(req.error);
                    };
                    req.onblocked = function() {
                      console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };
                    req.onsuccess = function() {
                      var db2 = req.result;
                      if (db2) {
                        db2.close();
                      }
                      resolve(db2);
                    };
                  });
                  return dropDBPromise.then(function(db2) {
                    dbContext.db = db2;
                    for (var i3 = 0; i3 < forages.length; i3++) {
                      var _forage = forages[i3];
                      _advanceReadiness(_forage._dbInfo);
                    }
                  })["catch"](function(err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                    });
                    throw err;
                  });
                });
              } else {
                promise = dbPromise2.then(function(db) {
                  if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                  }
                  var newVersion = db.version + 1;
                  _deferReadiness(options);
                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  db.close();
                  for (var i2 = 0; i2 < forages.length; i2++) {
                    var forage = forages[i2];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                  }
                  var dropObjectPromise = new Promise$1(function(resolve, reject) {
                    var req = idb.open(options.name, newVersion);
                    req.onerror = function(err) {
                      var db2 = req.result;
                      db2.close();
                      reject(err);
                    };
                    req.onupgradeneeded = function() {
                      var db2 = req.result;
                      db2.deleteObjectStore(options.storeName);
                    };
                    req.onsuccess = function() {
                      var db2 = req.result;
                      db2.close();
                      resolve(db2);
                    };
                  });
                  return dropObjectPromise.then(function(db2) {
                    dbContext.db = db2;
                    for (var j2 = 0; j2 < forages.length; j2++) {
                      var _forage2 = forages[j2];
                      _forage2._dbInfo.db = db2;
                      _advanceReadiness(_forage2._dbInfo);
                    }
                  })["catch"](function(err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                    });
                    throw err;
                  });
                });
              }
            }
            executeCallback(promise, callback);
            return promise;
          }
          var asyncStorage = {
            _driver: "asyncStorage",
            _initStorage,
            _support: isIndexedDBValid(),
            iterate,
            getItem,
            setItem,
            removeItem,
            clear: clear2,
            length,
            key,
            keys,
            dropInstance
          };
          function isWebSQLValid() {
            return typeof openDatabase === "function";
          }
          var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          var BLOB_TYPE_PREFIX = "~~local_forage_type~";
          var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
          var SERIALIZED_MARKER = "__lfsc__:";
          var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
          var TYPE_ARRAYBUFFER = "arbf";
          var TYPE_BLOB = "blob";
          var TYPE_INT8ARRAY = "si08";
          var TYPE_UINT8ARRAY = "ui08";
          var TYPE_UINT8CLAMPEDARRAY = "uic8";
          var TYPE_INT16ARRAY = "si16";
          var TYPE_INT32ARRAY = "si32";
          var TYPE_UINT16ARRAY = "ur16";
          var TYPE_UINT32ARRAY = "ui32";
          var TYPE_FLOAT32ARRAY = "fl32";
          var TYPE_FLOAT64ARRAY = "fl64";
          var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
          var toString$1 = Object.prototype.toString;
          function stringToBuffer(serializedString) {
            var bufferLength = serializedString.length * 0.75;
            var len = serializedString.length;
            var i2;
            var p2 = 0;
            var encoded1, encoded2, encoded3, encoded4;
            if (serializedString[serializedString.length - 1] === "=") {
              bufferLength--;
              if (serializedString[serializedString.length - 2] === "=") {
                bufferLength--;
              }
            }
            var buffer = new ArrayBuffer(bufferLength);
            var bytes = new Uint8Array(buffer);
            for (i2 = 0; i2 < len; i2 += 4) {
              encoded1 = BASE_CHARS.indexOf(serializedString[i2]);
              encoded2 = BASE_CHARS.indexOf(serializedString[i2 + 1]);
              encoded3 = BASE_CHARS.indexOf(serializedString[i2 + 2]);
              encoded4 = BASE_CHARS.indexOf(serializedString[i2 + 3]);
              bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
              bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
              bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
            }
            return buffer;
          }
          function bufferToString(buffer) {
            var bytes = new Uint8Array(buffer);
            var base64String = "";
            var i2;
            for (i2 = 0; i2 < bytes.length; i2 += 3) {
              base64String += BASE_CHARS[bytes[i2] >> 2];
              base64String += BASE_CHARS[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
              base64String += BASE_CHARS[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
              base64String += BASE_CHARS[bytes[i2 + 2] & 63];
            }
            if (bytes.length % 3 === 2) {
              base64String = base64String.substring(0, base64String.length - 1) + "=";
            } else if (bytes.length % 3 === 1) {
              base64String = base64String.substring(0, base64String.length - 2) + "==";
            }
            return base64String;
          }
          function serialize2(value, callback) {
            var valueType = "";
            if (value) {
              valueType = toString$1.call(value);
            }
            if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$1.call(value.buffer) === "[object ArrayBuffer]")) {
              var buffer;
              var marker = SERIALIZED_MARKER;
              if (value instanceof ArrayBuffer) {
                buffer = value;
                marker += TYPE_ARRAYBUFFER;
              } else {
                buffer = value.buffer;
                if (valueType === "[object Int8Array]") {
                  marker += TYPE_INT8ARRAY;
                } else if (valueType === "[object Uint8Array]") {
                  marker += TYPE_UINT8ARRAY;
                } else if (valueType === "[object Uint8ClampedArray]") {
                  marker += TYPE_UINT8CLAMPEDARRAY;
                } else if (valueType === "[object Int16Array]") {
                  marker += TYPE_INT16ARRAY;
                } else if (valueType === "[object Uint16Array]") {
                  marker += TYPE_UINT16ARRAY;
                } else if (valueType === "[object Int32Array]") {
                  marker += TYPE_INT32ARRAY;
                } else if (valueType === "[object Uint32Array]") {
                  marker += TYPE_UINT32ARRAY;
                } else if (valueType === "[object Float32Array]") {
                  marker += TYPE_FLOAT32ARRAY;
                } else if (valueType === "[object Float64Array]") {
                  marker += TYPE_FLOAT64ARRAY;
                } else {
                  callback(new Error("Failed to get type for BinaryArray"));
                }
              }
              callback(marker + bufferToString(buffer));
            } else if (valueType === "[object Blob]") {
              var fileReader = new FileReader();
              fileReader.onload = function() {
                var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
              };
              fileReader.readAsArrayBuffer(value);
            } else {
              try {
                callback(JSON.stringify(value));
              } catch (e) {
                console.error("Couldn't convert value into a JSON string: ", value);
                callback(null, e);
              }
            }
          }
          function deserialize2(value) {
            if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
              return JSON.parse(value);
            }
            var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
            var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
            var blobType;
            if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
              var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
              blobType = matcher[1];
              serializedString = serializedString.substring(matcher[0].length);
            }
            var buffer = stringToBuffer(serializedString);
            switch (type) {
              case TYPE_ARRAYBUFFER:
                return buffer;
              case TYPE_BLOB:
                return createBlob([buffer], { type: blobType });
              case TYPE_INT8ARRAY:
                return new Int8Array(buffer);
              case TYPE_UINT8ARRAY:
                return new Uint8Array(buffer);
              case TYPE_UINT8CLAMPEDARRAY:
                return new Uint8ClampedArray(buffer);
              case TYPE_INT16ARRAY:
                return new Int16Array(buffer);
              case TYPE_UINT16ARRAY:
                return new Uint16Array(buffer);
              case TYPE_INT32ARRAY:
                return new Int32Array(buffer);
              case TYPE_UINT32ARRAY:
                return new Uint32Array(buffer);
              case TYPE_FLOAT32ARRAY:
                return new Float32Array(buffer);
              case TYPE_FLOAT64ARRAY:
                return new Float64Array(buffer);
              default:
                throw new Error("Unkown type: " + type);
            }
          }
          var localforageSerializer = {
            serialize: serialize2,
            deserialize: deserialize2,
            stringToBuffer,
            bufferToString
          };
          function createDbTable(t2, dbInfo, callback, errorCallback) {
            t2.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
          }
          function _initStorage$1(options) {
            var self2 = this;
            var dbInfo = {
              db: null
            };
            if (options) {
              for (var i2 in options) {
                dbInfo[i2] = typeof options[i2] !== "string" ? options[i2].toString() : options[i2];
              }
            }
            var dbInfoPromise = new Promise$1(function(resolve, reject) {
              try {
                dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
              } catch (e) {
                return reject(e);
              }
              dbInfo.db.transaction(function(t2) {
                createDbTable(t2, dbInfo, function() {
                  self2._dbInfo = dbInfo;
                  resolve();
                }, function(t3, error2) {
                  reject(error2);
                });
              }, reject);
            });
            dbInfo.serializer = localforageSerializer;
            return dbInfoPromise;
          }
          function tryExecuteSql(t2, dbInfo, sqlStatement, args, callback, errorCallback) {
            t2.executeSql(sqlStatement, args, callback, function(t3, error2) {
              if (error2.code === error2.SYNTAX_ERR) {
                t3.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t4, results) {
                  if (!results.rows.length) {
                    createDbTable(t4, dbInfo, function() {
                      t4.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                  } else {
                    errorCallback(t4, error2);
                  }
                }, errorCallback);
              } else {
                errorCallback(t3, error2);
              }
            }, errorCallback);
          }
          function getItem$1(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t2) {
                  tryExecuteSql(t2, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key2], function(t3, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;
                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }
                    resolve(result);
                  }, function(t3, error2) {
                    reject(error2);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate$1(iterator, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t2) {
                  tryExecuteSql(t2, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t3, results) {
                    var rows = results.rows;
                    var length2 = rows.length;
                    for (var i2 = 0; i2 < length2; i2++) {
                      var item = rows.item(i2);
                      var result = item.value;
                      if (result) {
                        result = dbInfo.serializer.deserialize(result);
                      }
                      result = iterator(result, item.key, i2 + 1);
                      if (result !== void 0) {
                        resolve(result);
                        return;
                      }
                    }
                    resolve();
                  }, function(t3, error2) {
                    reject(error2);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function _setItem(key2, value, callback, retriesLeft) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                if (value === void 0) {
                  value = null;
                }
                var originalValue = value;
                var dbInfo = self2._dbInfo;
                dbInfo.serializer.serialize(value, function(value2, error2) {
                  if (error2) {
                    reject(error2);
                  } else {
                    dbInfo.db.transaction(function(t2) {
                      tryExecuteSql(t2, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key2, value2], function() {
                        resolve(originalValue);
                      }, function(t3, error3) {
                        reject(error3);
                      });
                    }, function(sqlError) {
                      if (sqlError.code === sqlError.QUOTA_ERR) {
                        if (retriesLeft > 0) {
                          resolve(_setItem.apply(self2, [key2, originalValue, callback, retriesLeft - 1]));
                          return;
                        }
                        reject(sqlError);
                      }
                    });
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem$1(key2, value, callback) {
            return _setItem.apply(this, [key2, value, callback, 1]);
          }
          function removeItem$1(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t2) {
                  tryExecuteSql(t2, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key2], function() {
                    resolve();
                  }, function(t3, error2) {
                    reject(error2);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function clear$1(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t2) {
                  tryExecuteSql(t2, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                    resolve();
                  }, function(t3, error2) {
                    reject(error2);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length$1(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t2) {
                  tryExecuteSql(t2, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t3, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                  }, function(t3, error2) {
                    reject(error2);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key$1(n2, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t2) {
                  tryExecuteSql(t2, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n2 + 1], function(t3, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                  }, function(t3, error2) {
                    reject(error2);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys$1(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t2) {
                  tryExecuteSql(t2, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t3, results) {
                    var keys2 = [];
                    for (var i2 = 0; i2 < results.rows.length; i2++) {
                      keys2.push(results.rows.item(i2).key);
                    }
                    resolve(keys2);
                  }, function(t3, error2) {
                    reject(error2);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function getAllStoreNames(db) {
            return new Promise$1(function(resolve, reject) {
              db.transaction(function(t2) {
                t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t3, results) {
                  var storeNames = [];
                  for (var i2 = 0; i2 < results.rows.length; i2++) {
                    storeNames.push(results.rows.item(i2).name);
                  }
                  resolve({
                    db,
                    storeNames
                  });
                }, function(t3, error2) {
                  reject(error2);
                });
              }, function(sqlError) {
                reject(sqlError);
              });
            });
          }
          function dropInstance$1(options, callback) {
            callback = getCallback.apply(this, arguments);
            var currentConfig = this.config();
            options = typeof options !== "function" && options || {};
            if (!options.name) {
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self2 = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject("Invalid arguments");
            } else {
              promise = new Promise$1(function(resolve) {
                var db;
                if (options.name === currentConfig.name) {
                  db = self2._dbInfo.db;
                } else {
                  db = openDatabase(options.name, "", "", 0);
                }
                if (!options.storeName) {
                  resolve(getAllStoreNames(db));
                } else {
                  resolve({
                    db,
                    storeNames: [options.storeName]
                  });
                }
              }).then(function(operationInfo) {
                return new Promise$1(function(resolve, reject) {
                  operationInfo.db.transaction(function(t2) {
                    function dropTable(storeName) {
                      return new Promise$1(function(resolve2, reject2) {
                        t2.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
                          resolve2();
                        }, function(t3, error2) {
                          reject2(error2);
                        });
                      });
                    }
                    var operations = [];
                    for (var i2 = 0, len = operationInfo.storeNames.length; i2 < len; i2++) {
                      operations.push(dropTable(operationInfo.storeNames[i2]));
                    }
                    Promise$1.all(operations).then(function() {
                      resolve();
                    })["catch"](function(e) {
                      reject(e);
                    });
                  }, function(sqlError) {
                    reject(sqlError);
                  });
                });
              });
            }
            executeCallback(promise, callback);
            return promise;
          }
          var webSQLStorage = {
            _driver: "webSQLStorage",
            _initStorage: _initStorage$1,
            _support: isWebSQLValid(),
            iterate: iterate$1,
            getItem: getItem$1,
            setItem: setItem$1,
            removeItem: removeItem$1,
            clear: clear$1,
            length: length$1,
            key: key$1,
            keys: keys$1,
            dropInstance: dropInstance$1
          };
          function isLocalStorageValid() {
            try {
              return typeof localStorage !== "undefined" && "setItem" in localStorage && !!localStorage.setItem;
            } catch (e) {
              return false;
            }
          }
          function _getKeyPrefix(options, defaultConfig) {
            var keyPrefix = options.name + "/";
            if (options.storeName !== defaultConfig.storeName) {
              keyPrefix += options.storeName + "/";
            }
            return keyPrefix;
          }
          function checkIfLocalStorageThrows() {
            var localStorageTestKey = "_localforage_support_test";
            try {
              localStorage.setItem(localStorageTestKey, true);
              localStorage.removeItem(localStorageTestKey);
              return false;
            } catch (e) {
              return true;
            }
          }
          function _isLocalStorageUsable() {
            return !checkIfLocalStorageThrows() || localStorage.length > 0;
          }
          function _initStorage$2(options) {
            var self2 = this;
            var dbInfo = {};
            if (options) {
              for (var i2 in options) {
                dbInfo[i2] = options[i2];
              }
            }
            dbInfo.keyPrefix = _getKeyPrefix(options, self2._defaultConfig);
            if (!_isLocalStorageUsable()) {
              return Promise$1.reject();
            }
            self2._dbInfo = dbInfo;
            dbInfo.serializer = localforageSerializer;
            return Promise$1.resolve();
          }
          function clear$2(callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var keyPrefix = self2._dbInfo.keyPrefix;
              for (var i2 = localStorage.length - 1; i2 >= 0; i2--) {
                var key2 = localStorage.key(i2);
                if (key2.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key2);
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          }
          function getItem$2(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var result = localStorage.getItem(dbInfo.keyPrefix + key2);
              if (result) {
                result = dbInfo.serializer.deserialize(result);
              }
              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate$2(iterator, callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var keyPrefix = dbInfo.keyPrefix;
              var keyPrefixLength = keyPrefix.length;
              var length2 = localStorage.length;
              var iterationNumber = 1;
              for (var i2 = 0; i2 < length2; i2++) {
                var key2 = localStorage.key(i2);
                if (key2.indexOf(keyPrefix) !== 0) {
                  continue;
                }
                var value = localStorage.getItem(key2);
                if (value) {
                  value = dbInfo.serializer.deserialize(value);
                }
                value = iterator(value, key2.substring(keyPrefixLength), iterationNumber++);
                if (value !== void 0) {
                  return value;
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key$2(n2, callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var result;
              try {
                result = localStorage.key(n2);
              } catch (error2) {
                result = null;
              }
              if (result) {
                result = result.substring(dbInfo.keyPrefix.length);
              }
              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys$2(callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var length2 = localStorage.length;
              var keys2 = [];
              for (var i2 = 0; i2 < length2; i2++) {
                var itemKey = localStorage.key(i2);
                if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                  keys2.push(itemKey.substring(dbInfo.keyPrefix.length));
                }
              }
              return keys2;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length$2(callback) {
            var self2 = this;
            var promise = self2.keys().then(function(keys2) {
              return keys2.length;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function removeItem$2(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              localStorage.removeItem(dbInfo.keyPrefix + key2);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem$2(key2, value, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = self2.ready().then(function() {
              if (value === void 0) {
                value = null;
              }
              var originalValue = value;
              return new Promise$1(function(resolve, reject) {
                var dbInfo = self2._dbInfo;
                dbInfo.serializer.serialize(value, function(value2, error2) {
                  if (error2) {
                    reject(error2);
                  } else {
                    try {
                      localStorage.setItem(dbInfo.keyPrefix + key2, value2);
                      resolve(originalValue);
                    } catch (e) {
                      if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                        reject(e);
                      }
                      reject(e);
                    }
                  }
                });
              });
            });
            executeCallback(promise, callback);
            return promise;
          }
          function dropInstance$2(options, callback) {
            callback = getCallback.apply(this, arguments);
            options = typeof options !== "function" && options || {};
            if (!options.name) {
              var currentConfig = this.config();
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self2 = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject("Invalid arguments");
            } else {
              promise = new Promise$1(function(resolve) {
                if (!options.storeName) {
                  resolve(options.name + "/");
                } else {
                  resolve(_getKeyPrefix(options, self2._defaultConfig));
                }
              }).then(function(keyPrefix) {
                for (var i2 = localStorage.length - 1; i2 >= 0; i2--) {
                  var key2 = localStorage.key(i2);
                  if (key2.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key2);
                  }
                }
              });
            }
            executeCallback(promise, callback);
            return promise;
          }
          var localStorageWrapper = {
            _driver: "localStorageWrapper",
            _initStorage: _initStorage$2,
            _support: isLocalStorageValid(),
            iterate: iterate$2,
            getItem: getItem$2,
            setItem: setItem$2,
            removeItem: removeItem$2,
            clear: clear$2,
            length: length$2,
            key: key$2,
            keys: keys$2,
            dropInstance: dropInstance$2
          };
          var sameValue = function sameValue2(x2, y2) {
            return x2 === y2 || typeof x2 === "number" && typeof y2 === "number" && isNaN(x2) && isNaN(y2);
          };
          var includes = function includes2(array, searchElement) {
            var len = array.length;
            var i2 = 0;
            while (i2 < len) {
              if (sameValue(array[i2], searchElement)) {
                return true;
              }
              i2++;
            }
            return false;
          };
          var isArray = Array.isArray || function(arg) {
            return Object.prototype.toString.call(arg) === "[object Array]";
          };
          var DefinedDrivers = {};
          var DriverSupport = {};
          var DefaultDrivers = {
            INDEXEDDB: asyncStorage,
            WEBSQL: webSQLStorage,
            LOCALSTORAGE: localStorageWrapper
          };
          var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
          var OptionalDriverMethods = ["dropInstance"];
          var LibraryMethods = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(OptionalDriverMethods);
          var DefaultConfig = {
            description: "",
            driver: DefaultDriverOrder.slice(),
            name: "localforage",
            size: 4980736,
            storeName: "keyvaluepairs",
            version: 1
          };
          function callWhenReady(localForageInstance, libraryMethod) {
            localForageInstance[libraryMethod] = function() {
              var _args = arguments;
              return localForageInstance.ready().then(function() {
                return localForageInstance[libraryMethod].apply(localForageInstance, _args);
              });
            };
          }
          function extend() {
            for (var i2 = 1; i2 < arguments.length; i2++) {
              var arg = arguments[i2];
              if (arg) {
                for (var _key in arg) {
                  if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                      arguments[0][_key] = arg[_key].slice();
                    } else {
                      arguments[0][_key] = arg[_key];
                    }
                  }
                }
              }
            }
            return arguments[0];
          }
          var LocalForage = function() {
            function LocalForage2(options) {
              _classCallCheck(this, LocalForage2);
              for (var driverTypeKey in DefaultDrivers) {
                if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                  var driver = DefaultDrivers[driverTypeKey];
                  var driverName = driver._driver;
                  this[driverTypeKey] = driverName;
                  if (!DefinedDrivers[driverName]) {
                    this.defineDriver(driver);
                  }
                }
              }
              this._defaultConfig = extend({}, DefaultConfig);
              this._config = extend({}, this._defaultConfig, options);
              this._driverSet = null;
              this._initDriver = null;
              this._ready = false;
              this._dbInfo = null;
              this._wrapLibraryMethodsWithReady();
              this.setDriver(this._config.driver)["catch"](function() {
              });
            }
            LocalForage2.prototype.config = function config(options) {
              if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
                if (this._ready) {
                  return new Error("Can't call config() after localforage has been used.");
                }
                for (var i2 in options) {
                  if (i2 === "storeName") {
                    options[i2] = options[i2].replace(/\W/g, "_");
                  }
                  if (i2 === "version" && typeof options[i2] !== "number") {
                    return new Error("Database version must be a number.");
                  }
                  this._config[i2] = options[i2];
                }
                if ("driver" in options && options.driver) {
                  return this.setDriver(this._config.driver);
                }
                return true;
              } else if (typeof options === "string") {
                return this._config[options];
              } else {
                return this._config;
              }
            };
            LocalForage2.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
              var promise = new Promise$1(function(resolve, reject) {
                try {
                  var driverName = driverObject._driver;
                  var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                  if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                  }
                  var driverMethods = LibraryMethods.concat("_initStorage");
                  for (var i2 = 0, len = driverMethods.length; i2 < len; i2++) {
                    var driverMethodName = driverMethods[i2];
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
                      reject(complianceError);
                      return;
                    }
                  }
                  var configureMissingMethods = function configureMissingMethods2() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory2(methodName) {
                      return function() {
                        var error2 = new Error("Method " + methodName + " is not implemented by the current driver");
                        var promise2 = Promise$1.reject(error2);
                        executeCallback(promise2, arguments[arguments.length - 1]);
                        return promise2;
                      };
                    };
                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                      var optionalDriverMethod = OptionalDriverMethods[_i];
                      if (!driverObject[optionalDriverMethod]) {
                        driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                      }
                    }
                  };
                  configureMissingMethods();
                  var setDriverSupport = function setDriverSupport2(support) {
                    if (DefinedDrivers[driverName]) {
                      console.info("Redefining LocalForage driver: " + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    resolve();
                  };
                  if ("_support" in driverObject) {
                    if (driverObject._support && typeof driverObject._support === "function") {
                      driverObject._support().then(setDriverSupport, reject);
                    } else {
                      setDriverSupport(!!driverObject._support);
                    }
                  } else {
                    setDriverSupport(true);
                  }
                } catch (e) {
                  reject(e);
                }
              });
              executeTwoCallbacks(promise, callback, errorCallback);
              return promise;
            };
            LocalForage2.prototype.driver = function driver() {
              return this._driver || null;
            };
            LocalForage2.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
              var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error("Driver not found."));
              executeTwoCallbacks(getDriverPromise, callback, errorCallback);
              return getDriverPromise;
            };
            LocalForage2.prototype.getSerializer = function getSerializer(callback) {
              var serializerPromise = Promise$1.resolve(localforageSerializer);
              executeTwoCallbacks(serializerPromise, callback);
              return serializerPromise;
            };
            LocalForage2.prototype.ready = function ready(callback) {
              var self2 = this;
              var promise = self2._driverSet.then(function() {
                if (self2._ready === null) {
                  self2._ready = self2._initDriver();
                }
                return self2._ready;
              });
              executeTwoCallbacks(promise, callback, callback);
              return promise;
            };
            LocalForage2.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
              var self2 = this;
              if (!isArray(drivers)) {
                drivers = [drivers];
              }
              var supportedDrivers = this._getSupportedDrivers(drivers);
              function setDriverToConfig() {
                self2._config.driver = self2.driver();
              }
              function extendSelfWithDriver(driver) {
                self2._extend(driver);
                setDriverToConfig();
                self2._ready = self2._initStorage(self2._config);
                return self2._ready;
              }
              function initDriver(supportedDrivers2) {
                return function() {
                  var currentDriverIndex = 0;
                  function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers2.length) {
                      var driverName = supportedDrivers2[currentDriverIndex];
                      currentDriverIndex++;
                      self2._dbInfo = null;
                      self2._ready = null;
                      return self2.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }
                    setDriverToConfig();
                    var error2 = new Error("No available storage method found.");
                    self2._driverSet = Promise$1.reject(error2);
                    return self2._driverSet;
                  }
                  return driverPromiseLoop();
                };
              }
              var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
                return Promise$1.resolve();
              }) : Promise$1.resolve();
              this._driverSet = oldDriverSetDone.then(function() {
                var driverName = supportedDrivers[0];
                self2._dbInfo = null;
                self2._ready = null;
                return self2.getDriver(driverName).then(function(driver) {
                  self2._driver = driver._driver;
                  setDriverToConfig();
                  self2._wrapLibraryMethodsWithReady();
                  self2._initDriver = initDriver(supportedDrivers);
                });
              })["catch"](function() {
                setDriverToConfig();
                var error2 = new Error("No available storage method found.");
                self2._driverSet = Promise$1.reject(error2);
                return self2._driverSet;
              });
              executeTwoCallbacks(this._driverSet, callback, errorCallback);
              return this._driverSet;
            };
            LocalForage2.prototype.supports = function supports(driverName) {
              return !!DriverSupport[driverName];
            };
            LocalForage2.prototype._extend = function _extend(libraryMethodsAndProperties) {
              extend(this, libraryMethodsAndProperties);
            };
            LocalForage2.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
              var supportedDrivers = [];
              for (var i2 = 0, len = drivers.length; i2 < len; i2++) {
                var driverName = drivers[i2];
                if (this.supports(driverName)) {
                  supportedDrivers.push(driverName);
                }
              }
              return supportedDrivers;
            };
            LocalForage2.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
              for (var i2 = 0, len = LibraryMethods.length; i2 < len; i2++) {
                callWhenReady(this, LibraryMethods[i2]);
              }
            };
            LocalForage2.prototype.createInstance = function createInstance(options) {
              return new LocalForage2(options);
            };
            return LocalForage2;
          }();
          var localforage_js = new LocalForage();
          module3.exports = localforage_js;
        }, { "3": 3 }] }, {}, [4])(4);
      });
    }
  });

  // ../../node_modules/tslib/tslib.js
  var require_tslib = __commonJS({
    "../../node_modules/tslib/tslib.js"(exports, module) {
      var __extends2;
      var __assign2;
      var __rest2;
      var __decorate2;
      var __param2;
      var __metadata2;
      var __awaiter2;
      var __generator2;
      var __exportStar2;
      var __values2;
      var __read2;
      var __spread2;
      var __spreadArrays2;
      var __spreadArray2;
      var __await2;
      var __asyncGenerator2;
      var __asyncDelegator2;
      var __asyncValues2;
      var __makeTemplateObject2;
      var __importStar2;
      var __importDefault2;
      var __classPrivateFieldGet2;
      var __classPrivateFieldSet2;
      var __classPrivateFieldIn2;
      var __createBinding2;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module === "object" && typeof module.exports === "object") {
          factory(createExporter(root, createExporter(module.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v2) {
            return exports2[id] = previous ? previous(id, v2) : v2;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p2 in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p2))
              d2[p2] = b2[p2];
        };
        __extends2 = function(d2, b2) {
          if (typeof b2 !== "function" && b2 !== null)
            throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
          extendStatics(d2, b2);
          function __() {
            this.constructor = d2;
          }
          d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
        };
        __assign2 = Object.assign || function(t2) {
          for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
            s2 = arguments[i2];
            for (var p2 in s2)
              if (Object.prototype.hasOwnProperty.call(s2, p2))
                t2[p2] = s2[p2];
          }
          return t2;
        };
        __rest2 = function(s2, e) {
          var t2 = {};
          for (var p2 in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p2) && e.indexOf(p2) < 0)
              t2[p2] = s2[p2];
          if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
              if (e.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
                t2[p2[i2]] = s2[p2[i2]];
            }
          return t2;
        };
        __decorate2 = function(decorators, target, key, desc) {
          var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r2 = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i2 = decorators.length - 1; i2 >= 0; i2--)
              if (d2 = decorators[i2])
                r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
          return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
        };
        __param2 = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata2 = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter2 = function(thisArg, _arguments, P2, generator) {
          function adopt(value) {
            return value instanceof P2 ? value : new P2(function(resolve) {
              resolve(value);
            });
          }
          return new (P2 || (P2 = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator2 = function(thisArg, body) {
          var _2 = { label: 0, sent: function() {
            if (t2[0] & 1)
              throw t2[1];
            return t2[1];
          }, trys: [], ops: [] }, f3, y2, t2, g2;
          return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
            return this;
          }), g2;
          function verb(n2) {
            return function(v2) {
              return step([n2, v2]);
            };
          }
          function step(op) {
            if (f3)
              throw new TypeError("Generator is already executing.");
            while (g2 && (g2 = 0, op[0] && (_2 = 0)), _2)
              try {
                if (f3 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
                  return t2;
                if (y2 = 0, t2)
                  op = [op[0] & 2, t2.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t2 = op;
                    break;
                  case 4:
                    _2.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _2.label++;
                    y2 = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _2.ops.pop();
                    _2.trys.pop();
                    continue;
                  default:
                    if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _2 = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                      _2.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _2.label < t2[1]) {
                      _2.label = t2[1];
                      t2 = op;
                      break;
                    }
                    if (t2 && _2.label < t2[2]) {
                      _2.label = t2[2];
                      _2.ops.push(op);
                      break;
                    }
                    if (t2[2])
                      _2.ops.pop();
                    _2.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _2);
              } catch (e) {
                op = [6, e];
                y2 = 0;
              } finally {
                f3 = t2 = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __exportStar2 = function(m2, o2) {
          for (var p2 in m2)
            if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(o2, p2))
              __createBinding2(o2, m2, p2);
        };
        __createBinding2 = Object.create ? function(o2, m2, k2, k22) {
          if (k22 === void 0)
            k22 = k2;
          var desc = Object.getOwnPropertyDescriptor(m2, k2);
          if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() {
              return m2[k2];
            } };
          }
          Object.defineProperty(o2, k22, desc);
        } : function(o2, m2, k2, k22) {
          if (k22 === void 0)
            k22 = k2;
          o2[k22] = m2[k2];
        };
        __values2 = function(o2) {
          var s2 = typeof Symbol === "function" && Symbol.iterator, m2 = s2 && o2[s2], i2 = 0;
          if (m2)
            return m2.call(o2);
          if (o2 && typeof o2.length === "number")
            return {
              next: function() {
                if (o2 && i2 >= o2.length)
                  o2 = void 0;
                return { value: o2 && o2[i2++], done: !o2 };
              }
            };
          throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read2 = function(o2, n2) {
          var m2 = typeof Symbol === "function" && o2[Symbol.iterator];
          if (!m2)
            return o2;
          var i2 = m2.call(o2), r2, ar = [], e;
          try {
            while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done)
              ar.push(r2.value);
          } catch (error2) {
            e = { error: error2 };
          } finally {
            try {
              if (r2 && !r2.done && (m2 = i2["return"]))
                m2.call(i2);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread2 = function() {
          for (var ar = [], i2 = 0; i2 < arguments.length; i2++)
            ar = ar.concat(__read2(arguments[i2]));
          return ar;
        };
        __spreadArrays2 = function() {
          for (var s2 = 0, i2 = 0, il = arguments.length; i2 < il; i2++)
            s2 += arguments[i2].length;
          for (var r2 = Array(s2), k2 = 0, i2 = 0; i2 < il; i2++)
            for (var a2 = arguments[i2], j2 = 0, jl = a2.length; j2 < jl; j2++, k2++)
              r2[k2] = a2[j2];
          return r2;
        };
        __spreadArray2 = function(to, from, pack) {
          if (pack || arguments.length === 2)
            for (var i2 = 0, l2 = from.length, ar; i2 < l2; i2++) {
              if (ar || !(i2 in from)) {
                if (!ar)
                  ar = Array.prototype.slice.call(from, 0, i2);
                ar[i2] = from[i2];
              }
            }
          return to.concat(ar || Array.prototype.slice.call(from));
        };
        __await2 = function(v2) {
          return this instanceof __await2 ? (this.v = v2, this) : new __await2(v2);
        };
        __asyncGenerator2 = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g2 = generator.apply(thisArg, _arguments || []), i2, q2 = [];
          return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
            return this;
          }, i2;
          function verb(n2) {
            if (g2[n2])
              i2[n2] = function(v2) {
                return new Promise(function(a2, b2) {
                  q2.push([n2, v2, a2, b2]) > 1 || resume(n2, v2);
                });
              };
          }
          function resume(n2, v2) {
            try {
              step(g2[n2](v2));
            } catch (e) {
              settle(q2[0][3], e);
            }
          }
          function step(r2) {
            r2.value instanceof __await2 ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q2[0][2], r2);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f3, v2) {
            if (f3(v2), q2.shift(), q2.length)
              resume(q2[0][0], q2[0][1]);
          }
        };
        __asyncDelegator2 = function(o2) {
          var i2, p2;
          return i2 = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i2[Symbol.iterator] = function() {
            return this;
          }, i2;
          function verb(n2, f3) {
            i2[n2] = o2[n2] ? function(v2) {
              return (p2 = !p2) ? { value: __await2(o2[n2](v2)), done: n2 === "return" } : f3 ? f3(v2) : v2;
            } : f3;
          }
        };
        __asyncValues2 = function(o2) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m2 = o2[Symbol.asyncIterator], i2;
          return m2 ? m2.call(o2) : (o2 = typeof __values2 === "function" ? __values2(o2) : o2[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
            return this;
          }, i2);
          function verb(n2) {
            i2[n2] = o2[n2] && function(v2) {
              return new Promise(function(resolve, reject) {
                v2 = o2[n2](v2), settle(resolve, reject, v2.done, v2.value);
              });
            };
          }
          function settle(resolve, reject, d2, v2) {
            Promise.resolve(v2).then(function(v6) {
              resolve({ value: v6, done: d2 });
            }, reject);
          }
        };
        __makeTemplateObject2 = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        var __setModuleDefault = Object.create ? function(o2, v2) {
          Object.defineProperty(o2, "default", { enumerable: true, value: v2 });
        } : function(o2, v2) {
          o2["default"] = v2;
        };
        __importStar2 = function(mod2) {
          if (mod2 && mod2.__esModule)
            return mod2;
          var result = {};
          if (mod2 != null) {
            for (var k2 in mod2)
              if (k2 !== "default" && Object.prototype.hasOwnProperty.call(mod2, k2))
                __createBinding2(result, mod2, k2);
          }
          __setModuleDefault(result, mod2);
          return result;
        };
        __importDefault2 = function(mod2) {
          return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
        };
        __classPrivateFieldGet2 = function(receiver, state, kind, f3) {
          if (kind === "a" && !f3)
            throw new TypeError("Private accessor was defined without a getter");
          if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
          return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
        };
        __classPrivateFieldSet2 = function(receiver, state, value, kind, f3) {
          if (kind === "m")
            throw new TypeError("Private method is not writable");
          if (kind === "a" && !f3)
            throw new TypeError("Private accessor was defined without a setter");
          if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
          return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
        };
        __classPrivateFieldIn2 = function(state, receiver) {
          if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
            throw new TypeError("Cannot use 'in' operator on non-object");
          return typeof state === "function" ? receiver === state : state.has(receiver);
        };
        exporter("__extends", __extends2);
        exporter("__assign", __assign2);
        exporter("__rest", __rest2);
        exporter("__decorate", __decorate2);
        exporter("__param", __param2);
        exporter("__metadata", __metadata2);
        exporter("__awaiter", __awaiter2);
        exporter("__generator", __generator2);
        exporter("__exportStar", __exportStar2);
        exporter("__createBinding", __createBinding2);
        exporter("__values", __values2);
        exporter("__read", __read2);
        exporter("__spread", __spread2);
        exporter("__spreadArrays", __spreadArrays2);
        exporter("__spreadArray", __spreadArray2);
        exporter("__await", __await2);
        exporter("__asyncGenerator", __asyncGenerator2);
        exporter("__asyncDelegator", __asyncDelegator2);
        exporter("__asyncValues", __asyncValues2);
        exporter("__makeTemplateObject", __makeTemplateObject2);
        exporter("__importStar", __importStar2);
        exporter("__importDefault", __importDefault2);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
        exporter("__classPrivateFieldIn", __classPrivateFieldIn2);
      });
    }
  });

  // ../../packages/post-message/src/schema.ts
  var import_short_uuid = __toESM(require_short_uuid());

  // ../../node_modules/zod/lib/index.mjs
  var util;
  (function(util2) {
    util2.assertEqual = (val) => val;
    function assertIs(_arg) {
    }
    util2.assertIs = assertIs;
    function assertNever(_x) {
      throw new Error();
    }
    util2.assertNever = assertNever;
    util2.arrayToEnum = (items) => {
      const obj = {};
      for (const item of items) {
        obj[item] = item;
      }
      return obj;
    };
    util2.getValidEnumValues = (obj) => {
      const validKeys = util2.objectKeys(obj).filter((k2) => typeof obj[obj[k2]] !== "number");
      const filtered = {};
      for (const k2 of validKeys) {
        filtered[k2] = obj[k2];
      }
      return util2.objectValues(filtered);
    };
    util2.objectValues = (obj) => {
      return util2.objectKeys(obj).map(function(e) {
        return obj[e];
      });
    };
    util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
      const keys = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          keys.push(key);
        }
      }
      return keys;
    };
    util2.find = (arr, checker) => {
      for (const item of arr) {
        if (checker(item))
          return item;
      }
      return void 0;
    };
    util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
      return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
    }
    util2.joinValues = joinValues;
    util2.jsonStringifyReplacer = (_2, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    };
  })(util || (util = {}));
  var ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]);
  var getParsedType = (data) => {
    const t2 = typeof data;
    switch (t2) {
      case "undefined":
        return ZodParsedType.undefined;
      case "string":
        return ZodParsedType.string;
      case "number":
        return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
      case "boolean":
        return ZodParsedType.boolean;
      case "function":
        return ZodParsedType.function;
      case "bigint":
        return ZodParsedType.bigint;
      case "object":
        if (Array.isArray(data)) {
          return ZodParsedType.array;
        }
        if (data === null) {
          return ZodParsedType.null;
        }
        if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
          return ZodParsedType.promise;
        }
        if (typeof Map !== "undefined" && data instanceof Map) {
          return ZodParsedType.map;
        }
        if (typeof Set !== "undefined" && data instanceof Set) {
          return ZodParsedType.set;
        }
        if (typeof Date !== "undefined" && data instanceof Date) {
          return ZodParsedType.date;
        }
        return ZodParsedType.object;
      default:
        return ZodParsedType.unknown;
    }
  };
  var ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of"
  ]);
  var quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
  };
  var ZodError = class extends Error {
    constructor(issues) {
      super();
      this.issues = [];
      this.addIssue = (sub) => {
        this.issues = [...this.issues, sub];
      };
      this.addIssues = (subs = []) => {
        this.issues = [...this.issues, ...subs];
      };
      const actualProto = new.target.prototype;
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(this, actualProto);
      } else {
        this.__proto__ = actualProto;
      }
      this.name = "ZodError";
      this.issues = issues;
    }
    get errors() {
      return this.issues;
    }
    format(_mapper) {
      const mapper = _mapper || function(issue) {
        return issue.message;
      };
      const fieldErrors = { _errors: [] };
      const processError = (error2) => {
        for (const issue of error2.issues) {
          if (issue.code === "invalid_union") {
            issue.unionErrors.map(processError);
          } else if (issue.code === "invalid_return_type") {
            processError(issue.returnTypeError);
          } else if (issue.code === "invalid_arguments") {
            processError(issue.argumentsError);
          } else if (issue.path.length === 0) {
            fieldErrors._errors.push(mapper(issue));
          } else {
            let curr = fieldErrors;
            let i2 = 0;
            while (i2 < issue.path.length) {
              const el = issue.path[i2];
              const terminal = i2 === issue.path.length - 1;
              if (!terminal) {
                curr[el] = curr[el] || { _errors: [] };
              } else {
                curr[el] = curr[el] || { _errors: [] };
                curr[el]._errors.push(mapper(issue));
              }
              curr = curr[el];
              i2++;
            }
          }
        }
      };
      processError(this);
      return fieldErrors;
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
      const fieldErrors = {};
      const formErrors = [];
      for (const sub of this.issues) {
        if (sub.path.length > 0) {
          fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
          fieldErrors[sub.path[0]].push(mapper(sub));
        } else {
          formErrors.push(mapper(sub));
        }
      }
      return { formErrors, fieldErrors };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  ZodError.create = (issues) => {
    const error2 = new ZodError(issues);
    return error2;
  };
  var errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = "Required";
        } else {
          message = `Expected ${issue.expected}, received ${issue.received}`;
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
        break;
      case ZodIssueCode.unrecognized_keys:
        message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
        break;
      case ZodIssueCode.invalid_union:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
        break;
      case ZodIssueCode.invalid_enum_value:
        message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
        break;
      case ZodIssueCode.invalid_arguments:
        message = `Invalid function arguments`;
        break;
      case ZodIssueCode.invalid_return_type:
        message = `Invalid function return type`;
        break;
      case ZodIssueCode.invalid_date:
        message = `Invalid date`;
        break;
      case ZodIssueCode.invalid_string:
        if (typeof issue.validation === "object") {
          if ("startsWith" in issue.validation) {
            message = `Invalid input: must start with "${issue.validation.startsWith}"`;
          } else if ("endsWith" in issue.validation) {
            message = `Invalid input: must end with "${issue.validation.endsWith}"`;
          } else {
            util.assertNever(issue.validation);
          }
        } else if (issue.validation !== "regex") {
          message = `Invalid ${issue.validation}`;
        } else {
          message = "Invalid";
        }
        break;
      case ZodIssueCode.too_small:
        if (issue.type === "array")
          message = `Array must contain ${issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
        else if (issue.type === "string")
          message = `String must contain ${issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
        else if (issue.type === "number")
          message = `Number must be greater than ${issue.inclusive ? `or equal to ` : ``}${issue.minimum}`;
        else if (issue.type === "date")
          message = `Date must be greater than ${issue.inclusive ? `or equal to ` : ``}${new Date(issue.minimum)}`;
        else
          message = "Invalid input";
        break;
      case ZodIssueCode.too_big:
        if (issue.type === "array")
          message = `Array must contain ${issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
        else if (issue.type === "string")
          message = `String must contain ${issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
        else if (issue.type === "number")
          message = `Number must be less than ${issue.inclusive ? `or equal to ` : ``}${issue.maximum}`;
        else if (issue.type === "date")
          message = `Date must be smaller than ${issue.inclusive ? `or equal to ` : ``}${new Date(issue.maximum)}`;
        else
          message = "Invalid input";
        break;
      case ZodIssueCode.custom:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = `Intersection results could not be merged`;
        break;
      case ZodIssueCode.not_multiple_of:
        message = `Number must be a multiple of ${issue.multipleOf}`;
        break;
      default:
        message = _ctx.defaultError;
        util.assertNever(issue);
    }
    return { message };
  };
  var overrideErrorMap = errorMap;
  function setErrorMap(map2) {
    overrideErrorMap = map2;
  }
  function getErrorMap() {
    return overrideErrorMap;
  }
  var makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...issueData.path || []];
    const fullIssue = {
      ...issueData,
      path: fullPath
    };
    let errorMessage = "";
    const maps = errorMaps.filter((m2) => !!m2).slice().reverse();
    for (const map2 of maps) {
      errorMessage = map2(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message || errorMessage
    };
  };
  var EMPTY_PATH = [];
  function addIssueToContext(ctx, issueData) {
    const issue = makeIssue({
      issueData,
      data: ctx.data,
      path: ctx.path,
      errorMaps: [
        ctx.common.contextualErrorMap,
        ctx.schemaErrorMap,
        getErrorMap(),
        errorMap
      ].filter((x2) => !!x2)
    });
    ctx.common.issues.push(issue);
  }
  var ParseStatus = class {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      if (this.value === "valid")
        this.value = "dirty";
    }
    abort() {
      if (this.value !== "aborted")
        this.value = "aborted";
    }
    static mergeArray(status, results) {
      const arrayValue = [];
      for (const s2 of results) {
        if (s2.status === "aborted")
          return INVALID;
        if (s2.status === "dirty")
          status.dirty();
        arrayValue.push(s2.value);
      }
      return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
      const syncPairs = [];
      for (const pair of pairs) {
        syncPairs.push({
          key: await pair.key,
          value: await pair.value
        });
      }
      return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
      const finalObject = {};
      for (const pair of pairs) {
        const { key, value } = pair;
        if (key.status === "aborted")
          return INVALID;
        if (value.status === "aborted")
          return INVALID;
        if (key.status === "dirty")
          status.dirty();
        if (value.status === "dirty")
          status.dirty();
        if (typeof value.value !== "undefined" || pair.alwaysSet) {
          finalObject[key.value] = value.value;
        }
      }
      return { status: status.value, value: finalObject };
    }
  };
  var INVALID = Object.freeze({
    status: "aborted"
  });
  var DIRTY = (value) => ({ status: "dirty", value });
  var OK = (value) => ({ status: "valid", value });
  var isAborted = (x2) => x2.status === "aborted";
  var isDirty = (x2) => x2.status === "dirty";
  var isValid = (x2) => x2.status === "valid";
  var isAsync = (x2) => typeof Promise !== void 0 && x2 instanceof Promise;
  var errorUtil;
  (function(errorUtil2) {
    errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
  })(errorUtil || (errorUtil = {}));
  var ParseInputLazyPath = class {
    constructor(parent, value, path, key) {
      this.parent = parent;
      this.data = value;
      this._path = path;
      this._key = key;
    }
    get path() {
      return this._path.concat(this._key);
    }
  };
  var handleResult = (ctx, result) => {
    if (isValid(result)) {
      return { success: true, data: result.value };
    } else {
      if (!ctx.common.issues.length) {
        throw new Error("Validation failed but no issues detected.");
      }
      const error2 = new ZodError(ctx.common.issues);
      return { success: false, error: error2 };
    }
  };
  function processCreateParams(params) {
    if (!params)
      return {};
    const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
    if (errorMap2 && (invalid_type_error || required_error)) {
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap2)
      return { errorMap: errorMap2, description };
    const customMap = (iss, ctx) => {
      if (iss.code !== "invalid_type")
        return { message: ctx.defaultError };
      if (typeof ctx.data === "undefined") {
        return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
      }
      return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
    };
    return { errorMap: customMap, description };
  }
  var ZodType = class {
    constructor(def) {
      this.spa = this.safeParseAsync;
      this.superRefine = this._refinement;
      this._def = def;
      this.parse = this.parse.bind(this);
      this.safeParse = this.safeParse.bind(this);
      this.parseAsync = this.parseAsync.bind(this);
      this.safeParseAsync = this.safeParseAsync.bind(this);
      this.spa = this.spa.bind(this);
      this.refine = this.refine.bind(this);
      this.refinement = this.refinement.bind(this);
      this.superRefine = this.superRefine.bind(this);
      this.optional = this.optional.bind(this);
      this.nullable = this.nullable.bind(this);
      this.nullish = this.nullish.bind(this);
      this.array = this.array.bind(this);
      this.promise = this.promise.bind(this);
      this.or = this.or.bind(this);
      this.and = this.and.bind(this);
      this.transform = this.transform.bind(this);
      this.default = this.default.bind(this);
      this.describe = this.describe.bind(this);
      this.isNullable = this.isNullable.bind(this);
      this.isOptional = this.isOptional.bind(this);
    }
    get description() {
      return this._def.description;
    }
    _getType(input) {
      return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
      return ctx || {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      };
    }
    _processInputParams(input) {
      return {
        status: new ParseStatus(),
        ctx: {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        }
      };
    }
    _parseSync(input) {
      const result = this._parse(input);
      if (isAsync(result)) {
        throw new Error("Synchronous parse encountered promise.");
      }
      return result;
    }
    _parseAsync(input) {
      const result = this._parse(input);
      return Promise.resolve(result);
    }
    parse(data, params) {
      const result = this.safeParse(data, params);
      if (result.success)
        return result.data;
      throw result.error;
    }
    safeParse(data, params) {
      var _a;
      const ctx = {
        common: {
          issues: [],
          async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
          contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
        },
        path: (params === null || params === void 0 ? void 0 : params.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const result = this._parseSync({ data, path: ctx.path, parent: ctx });
      return handleResult(ctx, result);
    }
    async parseAsync(data, params) {
      const result = await this.safeParseAsync(data, params);
      if (result.success)
        return result.data;
      throw result.error;
    }
    async safeParseAsync(data, params) {
      const ctx = {
        common: {
          issues: [],
          contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
          async: true
        },
        path: (params === null || params === void 0 ? void 0 : params.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const maybeAsyncResult = this._parse({ data, path: [], parent: ctx });
      const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
      return handleResult(ctx, result);
    }
    refine(check, message) {
      const getIssueProperties = (val) => {
        if (typeof message === "string" || typeof message === "undefined") {
          return { message };
        } else if (typeof message === "function") {
          return message(val);
        } else {
          return message;
        }
      };
      return this._refinement((val, ctx) => {
        const result = check(val);
        const setError = () => ctx.addIssue({
          code: ZodIssueCode.custom,
          ...getIssueProperties(val)
        });
        if (typeof Promise !== "undefined" && result instanceof Promise) {
          return result.then((data) => {
            if (!data) {
              setError();
              return false;
            } else {
              return true;
            }
          });
        }
        if (!result) {
          setError();
          return false;
        } else {
          return true;
        }
      });
    }
    refinement(check, refinementData) {
      return this._refinement((val, ctx) => {
        if (!check(val)) {
          ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
          return false;
        } else {
          return true;
        }
      });
    }
    _refinement(refinement) {
      return new ZodEffects({
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "refinement", refinement }
      });
    }
    optional() {
      return ZodOptional.create(this);
    }
    nullable() {
      return ZodNullable.create(this);
    }
    nullish() {
      return this.optional().nullable();
    }
    array() {
      return ZodArray.create(this);
    }
    promise() {
      return ZodPromise.create(this);
    }
    or(option) {
      return ZodUnion.create([this, option]);
    }
    and(incoming) {
      return ZodIntersection.create(this, incoming);
    }
    transform(transform) {
      return new ZodEffects({
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "transform", transform }
      });
    }
    default(def) {
      const defaultValueFunc = typeof def === "function" ? def : () => def;
      return new ZodDefault({
        innerType: this,
        defaultValue: defaultValueFunc,
        typeName: ZodFirstPartyTypeKind.ZodDefault
      });
    }
    brand() {
      return new ZodBranded({
        typeName: ZodFirstPartyTypeKind.ZodBranded,
        type: this,
        ...processCreateParams(void 0)
      });
    }
    describe(description) {
      const This = this.constructor;
      return new This({
        ...this._def,
        description
      });
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  };
  var cuidRegex = /^c[^\s-]{8,}$/i;
  var uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
  var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var ZodString = class extends ZodType {
    constructor() {
      super(...arguments);
      this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
        validation,
        code: ZodIssueCode.invalid_string,
        ...errorUtil.errToObj(message)
      });
      this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
      this.trim = () => new ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }]
      });
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.string) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(
          ctx2,
          {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.string,
            received: ctx2.parsedType
          }
        );
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.length < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.length > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "email") {
          if (!emailRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "email",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "uuid") {
          if (!uuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "uuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid") {
          if (!cuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "url") {
          try {
            new URL(input.data);
          } catch (_a) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "url",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "regex") {
          check.regex.lastIndex = 0;
          const testResult = check.regex.test(input.data);
          if (!testResult) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "regex",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "trim") {
          input.data = input.data.trim();
        } else if (check.kind === "startsWith") {
          if (!input.data.startsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { startsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "endsWith") {
          if (!input.data.endsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { endsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    _addCheck(check) {
      return new ZodString({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    email(message) {
      return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
      return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
      return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
      return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
      return this._addCheck({
        kind: "regex",
        regex,
        ...errorUtil.errToObj(message)
      });
    }
    startsWith(value, message) {
      return this._addCheck({
        kind: "startsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    endsWith(value, message) {
      return this._addCheck({
        kind: "endsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    min(minLength, message) {
      return this._addCheck({
        kind: "min",
        value: minLength,
        ...errorUtil.errToObj(message)
      });
    }
    max(maxLength, message) {
      return this._addCheck({
        kind: "max",
        value: maxLength,
        ...errorUtil.errToObj(message)
      });
    }
    length(len, message) {
      return this.min(len, message).max(len, message);
    }
    get isEmail() {
      return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isUUID() {
      return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isCUID() {
      return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get minLength() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxLength() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
  };
  ZodString.create = (params) => {
    return new ZodString({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodString,
      ...processCreateParams(params)
    });
  };
  function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return valInt % stepInt / Math.pow(10, decCount);
  }
  var ZodNumber = class extends ZodType {
    constructor() {
      super(...arguments);
      this.min = this.gte;
      this.max = this.lte;
      this.step = this.multipleOf;
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.number) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.number,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      let ctx = void 0;
      const status = new ParseStatus();
      for (const check of this._def.checks) {
        if (check.kind === "int") {
          if (!util.isInteger(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_type,
              expected: "integer",
              received: "float",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "number",
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
          if (tooBig) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "number",
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "multipleOf") {
          if (floatSafeRemainder(input.data, check.value) !== 0) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
      return new ZodNumber({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind,
            value,
            inclusive,
            message: errorUtil.toString(message)
          }
        ]
      });
    }
    _addCheck(check) {
      return new ZodNumber({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    int(message) {
      return this._addCheck({
        kind: "int",
        message: errorUtil.toString(message)
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    get minValue() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxValue() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
    get isInt() {
      return !!this._def.checks.find((ch) => ch.kind === "int");
    }
  };
  ZodNumber.create = (params) => {
    return new ZodNumber({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodNumber,
      ...processCreateParams(params)
    });
  };
  var ZodBigInt = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.bigint) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.bigint,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodBigInt.create = (params) => {
    return new ZodBigInt({
      typeName: ZodFirstPartyTypeKind.ZodBigInt,
      ...processCreateParams(params)
    });
  };
  var ZodBoolean = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.boolean) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.boolean,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodBoolean.create = (params) => {
    return new ZodBoolean({
      typeName: ZodFirstPartyTypeKind.ZodBoolean,
      ...processCreateParams(params)
    });
  };
  var ZodDate = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.date) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.date,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      if (isNaN(input.data.getTime())) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_date
        });
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.getTime() < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              message: check.message,
              inclusive: true,
              minimum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.getTime() > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              message: check.message,
              inclusive: true,
              maximum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return {
        status: status.value,
        value: new Date(input.data.getTime())
      };
    }
    _addCheck(check) {
      return new ZodDate({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    min(minDate, message) {
      return this._addCheck({
        kind: "min",
        value: minDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    max(maxDate, message) {
      return this._addCheck({
        kind: "max",
        value: maxDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    get minDate() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min != null ? new Date(min) : null;
    }
    get maxDate() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max != null ? new Date(max) : null;
    }
  };
  ZodDate.create = (params) => {
    return new ZodDate({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodDate,
      ...processCreateParams(params)
    });
  };
  var ZodUndefined = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.undefined,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodUndefined.create = (params) => {
    return new ZodUndefined({
      typeName: ZodFirstPartyTypeKind.ZodUndefined,
      ...processCreateParams(params)
    });
  };
  var ZodNull = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.null) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.null,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodNull.create = (params) => {
    return new ZodNull({
      typeName: ZodFirstPartyTypeKind.ZodNull,
      ...processCreateParams(params)
    });
  };
  var ZodAny = class extends ZodType {
    constructor() {
      super(...arguments);
      this._any = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  };
  ZodAny.create = (params) => {
    return new ZodAny({
      typeName: ZodFirstPartyTypeKind.ZodAny,
      ...processCreateParams(params)
    });
  };
  var ZodUnknown = class extends ZodType {
    constructor() {
      super(...arguments);
      this._unknown = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  };
  ZodUnknown.create = (params) => {
    return new ZodUnknown({
      typeName: ZodFirstPartyTypeKind.ZodUnknown,
      ...processCreateParams(params)
    });
  };
  var ZodNever = class extends ZodType {
    _parse(input) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.never,
        received: ctx.parsedType
      });
      return INVALID;
    }
  };
  ZodNever.create = (params) => {
    return new ZodNever({
      typeName: ZodFirstPartyTypeKind.ZodNever,
      ...processCreateParams(params)
    });
  };
  var ZodVoid = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.void,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodVoid.create = (params) => {
    return new ZodVoid({
      typeName: ZodFirstPartyTypeKind.ZodVoid,
      ...processCreateParams(params)
    });
  };
  var ZodArray = class extends ZodType {
    _parse(input) {
      const { ctx, status } = this._processInputParams(input);
      const def = this._def;
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (def.minLength !== null) {
        if (ctx.data.length < def.minLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minLength.value,
            type: "array",
            inclusive: true,
            message: def.minLength.message
          });
          status.dirty();
        }
      }
      if (def.maxLength !== null) {
        if (ctx.data.length > def.maxLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxLength.value,
            type: "array",
            inclusive: true,
            message: def.maxLength.message
          });
          status.dirty();
        }
      }
      if (ctx.common.async) {
        return Promise.all(ctx.data.map((item, i2) => {
          return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i2));
        })).then((result2) => {
          return ParseStatus.mergeArray(status, result2);
        });
      }
      const result = ctx.data.map((item, i2) => {
        return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i2));
      });
      return ParseStatus.mergeArray(status, result);
    }
    get element() {
      return this._def.type;
    }
    min(minLength, message) {
      return new ZodArray({
        ...this._def,
        minLength: { value: minLength, message: errorUtil.toString(message) }
      });
    }
    max(maxLength, message) {
      return new ZodArray({
        ...this._def,
        maxLength: { value: maxLength, message: errorUtil.toString(message) }
      });
    }
    length(len, message) {
      return this.min(len, message).max(len, message);
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
  ZodArray.create = (schema, params) => {
    return new ZodArray({
      type: schema,
      minLength: null,
      maxLength: null,
      typeName: ZodFirstPartyTypeKind.ZodArray,
      ...processCreateParams(params)
    });
  };
  var objectUtil;
  (function(objectUtil2) {
    objectUtil2.mergeShapes = (first, second) => {
      return {
        ...first,
        ...second
      };
    };
  })(objectUtil || (objectUtil = {}));
  var AugmentFactory = (def) => (augmentation) => {
    return new ZodObject({
      ...def,
      shape: () => ({
        ...def.shape(),
        ...augmentation
      })
    });
  };
  function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
      const newShape = {};
      for (const key in schema.shape) {
        const fieldSchema = schema.shape[key];
        newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
      }
      return new ZodObject({
        ...schema._def,
        shape: () => newShape
      });
    } else if (schema instanceof ZodArray) {
      return ZodArray.create(deepPartialify(schema.element));
    } else if (schema instanceof ZodOptional) {
      return ZodOptional.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodNullable) {
      return ZodNullable.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodTuple) {
      return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    } else {
      return schema;
    }
  }
  var ZodObject = class extends ZodType {
    constructor() {
      super(...arguments);
      this._cached = null;
      this.nonstrict = this.passthrough;
      this.augment = AugmentFactory(this._def);
      this.extend = AugmentFactory(this._def);
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      const shape = this._def.shape();
      const keys = util.objectKeys(shape);
      return this._cached = { shape, keys };
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.object) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const { status, ctx } = this._processInputParams(input);
      const { shape, keys: shapeKeys } = this._getCached();
      const extraKeys = [];
      if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
        for (const key in ctx.data) {
          if (!shapeKeys.includes(key)) {
            extraKeys.push(key);
          }
        }
      }
      const pairs = [];
      for (const key of shapeKeys) {
        const keyValidator = shape[key];
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
      if (this._def.catchall instanceof ZodNever) {
        const unknownKeys = this._def.unknownKeys;
        if (unknownKeys === "passthrough") {
          for (const key of extraKeys) {
            pairs.push({
              key: { status: "valid", value: key },
              value: { status: "valid", value: ctx.data[key] }
            });
          }
        } else if (unknownKeys === "strict") {
          if (extraKeys.length > 0) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.unrecognized_keys,
              keys: extraKeys
            });
            status.dirty();
          }
        } else if (unknownKeys === "strip")
          ;
        else {
          throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
        }
      } else {
        const catchall = this._def.catchall;
        for (const key of extraKeys) {
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: catchall._parse(
              new ParseInputLazyPath(ctx, value, ctx.path, key)
            ),
            alwaysSet: key in ctx.data
          });
        }
      }
      if (ctx.common.async) {
        return Promise.resolve().then(async () => {
          const syncPairs = [];
          for (const pair of pairs) {
            const key = await pair.key;
            syncPairs.push({
              key,
              value: await pair.value,
              alwaysSet: pair.alwaysSet
            });
          }
          return syncPairs;
        }).then((syncPairs) => {
          return ParseStatus.mergeObjectSync(status, syncPairs);
        });
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get shape() {
      return this._def.shape();
    }
    strict(message) {
      errorUtil.errToObj;
      return new ZodObject({
        ...this._def,
        unknownKeys: "strict",
        ...message !== void 0 ? {
          errorMap: (issue, ctx) => {
            var _a, _b, _c, _d;
            const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
            if (issue.code === "unrecognized_keys")
              return {
                message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
              };
            return {
              message: defaultError
            };
          }
        } : {}
      });
    }
    strip() {
      return new ZodObject({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new ZodObject({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    setKey(key, schema) {
      return this.augment({ [key]: schema });
    }
    merge(merging) {
      const merged = new ZodObject({
        unknownKeys: merging._def.unknownKeys,
        catchall: merging._def.catchall,
        shape: () => objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
        typeName: ZodFirstPartyTypeKind.ZodObject
      });
      return merged;
    }
    catchall(index) {
      return new ZodObject({
        ...this._def,
        catchall: index
      });
    }
    pick(mask) {
      const shape = {};
      util.objectKeys(mask).map((key) => {
        if (this.shape[key])
          shape[key] = this.shape[key];
      });
      return new ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    omit(mask) {
      const shape = {};
      util.objectKeys(this.shape).map((key) => {
        if (util.objectKeys(mask).indexOf(key) === -1) {
          shape[key] = this.shape[key];
        }
      });
      return new ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    deepPartial() {
      return deepPartialify(this);
    }
    partial(mask) {
      const newShape = {};
      if (mask) {
        util.objectKeys(this.shape).map((key) => {
          if (util.objectKeys(mask).indexOf(key) === -1) {
            newShape[key] = this.shape[key];
          } else {
            newShape[key] = this.shape[key].optional();
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => newShape
        });
      } else {
        for (const key in this.shape) {
          const fieldSchema = this.shape[key];
          newShape[key] = fieldSchema.optional();
        }
      }
      return new ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    required() {
      const newShape = {};
      for (const key in this.shape) {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
      return new ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    keyof() {
      return createZodEnum(util.objectKeys(this.shape));
    }
  };
  ZodObject.create = (shape, params) => {
    return new ZodObject({
      shape: () => shape,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
      shape: () => shape,
      unknownKeys: "strict",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
      shape,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  var ZodUnion = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const options = this._def.options;
      function handleResults(results) {
        for (const result of results) {
          if (result.result.status === "valid") {
            return result.result;
          }
        }
        for (const result of results) {
          if (result.result.status === "dirty") {
            ctx.common.issues.push(...result.ctx.common.issues);
            return result.result;
          }
        }
        const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return Promise.all(options.map(async (option) => {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await option._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            }),
            ctx: childCtx
          };
        })).then(handleResults);
      } else {
        let dirty = void 0;
        const issues = [];
        for (const option of options) {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          const result = option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          });
          if (result.status === "valid") {
            return result;
          } else if (result.status === "dirty" && !dirty) {
            dirty = { result, ctx: childCtx };
          }
          if (childCtx.common.issues.length) {
            issues.push(childCtx.common.issues);
          }
        }
        if (dirty) {
          ctx.common.issues.push(...dirty.ctx.common.issues);
          return dirty.result;
        }
        const unionErrors = issues.map((issues2) => new ZodError(issues2));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  ZodUnion.create = (types, params) => {
    return new ZodUnion({
      options: types,
      typeName: ZodFirstPartyTypeKind.ZodUnion,
      ...processCreateParams(params)
    });
  };
  var ZodDiscriminatedUnion = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const discriminator = this.discriminator;
      const discriminatorValue = ctx.data[discriminator];
      const option = this.options.get(discriminatorValue);
      if (!option) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union_discriminator,
          options: this.validDiscriminatorValues,
          path: [discriminator]
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return option._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      } else {
        return option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get validDiscriminatorValues() {
      return Array.from(this.options.keys());
    }
    get options() {
      return this._def.options;
    }
    static create(discriminator, types, params) {
      const options = /* @__PURE__ */ new Map();
      try {
        types.forEach((type) => {
          const discriminatorValue = type.shape[discriminator].value;
          options.set(discriminatorValue, type);
        });
      } catch (e) {
        throw new Error("The discriminator value could not be extracted from all the provided schemas");
      }
      if (options.size !== types.length) {
        throw new Error("Some of the discriminator values are not unique");
      }
      return new ZodDiscriminatedUnion({
        typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
        discriminator,
        options,
        ...processCreateParams(params)
      });
    }
  };
  function mergeValues(a2, b2) {
    const aType = getParsedType(a2);
    const bType = getParsedType(b2);
    if (a2 === b2) {
      return { valid: true, data: a2 };
    } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
      const bKeys = util.objectKeys(b2);
      const sharedKeys = util.objectKeys(a2).filter((key) => bKeys.indexOf(key) !== -1);
      const newObj = { ...a2, ...b2 };
      for (const key of sharedKeys) {
        const sharedValue = mergeValues(a2[key], b2[key]);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newObj[key] = sharedValue.data;
      }
      return { valid: true, data: newObj };
    } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
      if (a2.length !== b2.length) {
        return { valid: false };
      }
      const newArray = [];
      for (let index = 0; index < a2.length; index++) {
        const itemA = a2[index];
        const itemB = b2[index];
        const sharedValue = mergeValues(itemA, itemB);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newArray.push(sharedValue.data);
      }
      return { valid: true, data: newArray };
    } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a2 === +b2) {
      return { valid: true, data: a2 };
    } else {
      return { valid: false };
    }
  }
  var ZodIntersection = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const handleParsed = (parsedLeft, parsedRight) => {
        if (isAborted(parsedLeft) || isAborted(parsedRight)) {
          return INVALID;
        }
        const merged = mergeValues(parsedLeft.value, parsedRight.value);
        if (!merged.valid) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_intersection_types
          });
          return INVALID;
        }
        if (isDirty(parsedLeft) || isDirty(parsedRight)) {
          status.dirty();
        }
        return { status: status.value, value: merged.data };
      };
      if (ctx.common.async) {
        return Promise.all([
          this._def.left._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }),
          this._def.right._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          })
        ]).then(([left, right]) => handleParsed(left, right));
      } else {
        return handleParsed(this._def.left._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }), this._def.right._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }));
      }
    }
  };
  ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
      left,
      right,
      typeName: ZodFirstPartyTypeKind.ZodIntersection,
      ...processCreateParams(params)
    });
  };
  var ZodTuple = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (ctx.data.length < this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: this._def.items.length,
          inclusive: true,
          type: "array"
        });
        return INVALID;
      }
      const rest = this._def.rest;
      if (!rest && ctx.data.length > this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: this._def.items.length,
          inclusive: true,
          type: "array"
        });
        status.dirty();
      }
      const items = ctx.data.map((item, itemIndex) => {
        const schema = this._def.items[itemIndex] || this._def.rest;
        if (!schema)
          return null;
        return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
      }).filter((x2) => !!x2);
      if (ctx.common.async) {
        return Promise.all(items).then((results) => {
          return ParseStatus.mergeArray(status, results);
        });
      } else {
        return ParseStatus.mergeArray(status, items);
      }
    }
    get items() {
      return this._def.items;
    }
    rest(rest) {
      return new ZodTuple({
        ...this._def,
        rest
      });
    }
  };
  ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
      items: schemas,
      typeName: ZodFirstPartyTypeKind.ZodTuple,
      rest: null,
      ...processCreateParams(params)
    });
  };
  var ZodRecord = class extends ZodType {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const pairs = [];
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      for (const key in ctx.data) {
        pairs.push({
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
          value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
        });
      }
      if (ctx.common.async) {
        return ParseStatus.mergeObjectAsync(status, pairs);
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get element() {
      return this._def.valueType;
    }
    static create(first, second, third) {
      if (second instanceof ZodType) {
        return new ZodRecord({
          keyType: first,
          valueType: second,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(third)
        });
      }
      return new ZodRecord({
        keyType: ZodString.create(),
        valueType: first,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(second)
      });
    }
  };
  var ZodMap = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.map) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.map,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      const pairs = [...ctx.data.entries()].map(([key, value], index) => {
        return {
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
          value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
        };
      });
      if (ctx.common.async) {
        const finalMap = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        });
      } else {
        const finalMap = /* @__PURE__ */ new Map();
        for (const pair of pairs) {
          const key = pair.key;
          const value = pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      }
    }
  };
  ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
      valueType,
      keyType,
      typeName: ZodFirstPartyTypeKind.ZodMap,
      ...processCreateParams(params)
    });
  };
  var ZodSet = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.set) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.set,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const def = this._def;
      if (def.minSize !== null) {
        if (ctx.data.size < def.minSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minSize.value,
            type: "set",
            inclusive: true,
            message: def.minSize.message
          });
          status.dirty();
        }
      }
      if (def.maxSize !== null) {
        if (ctx.data.size > def.maxSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxSize.value,
            type: "set",
            inclusive: true,
            message: def.maxSize.message
          });
          status.dirty();
        }
      }
      const valueType = this._def.valueType;
      function finalizeSet(elements2) {
        const parsedSet = /* @__PURE__ */ new Set();
        for (const element of elements2) {
          if (element.status === "aborted")
            return INVALID;
          if (element.status === "dirty")
            status.dirty();
          parsedSet.add(element.value);
        }
        return { status: status.value, value: parsedSet };
      }
      const elements = [...ctx.data.values()].map((item, i2) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i2)));
      if (ctx.common.async) {
        return Promise.all(elements).then((elements2) => finalizeSet(elements2));
      } else {
        return finalizeSet(elements);
      }
    }
    min(minSize, message) {
      return new ZodSet({
        ...this._def,
        minSize: { value: minSize, message: errorUtil.toString(message) }
      });
    }
    max(maxSize, message) {
      return new ZodSet({
        ...this._def,
        maxSize: { value: maxSize, message: errorUtil.toString(message) }
      });
    }
    size(size, message) {
      return this.min(size, message).max(size, message);
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
  ZodSet.create = (valueType, params) => {
    return new ZodSet({
      valueType,
      minSize: null,
      maxSize: null,
      typeName: ZodFirstPartyTypeKind.ZodSet,
      ...processCreateParams(params)
    });
  };
  var ZodFunction = class extends ZodType {
    constructor() {
      super(...arguments);
      this.validate = this.implement;
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.function) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.function,
          received: ctx.parsedType
        });
        return INVALID;
      }
      function makeArgsIssue(args, error2) {
        return makeIssue({
          data: args,
          path: ctx.path,
          errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            getErrorMap(),
            errorMap
          ].filter((x2) => !!x2),
          issueData: {
            code: ZodIssueCode.invalid_arguments,
            argumentsError: error2
          }
        });
      }
      function makeReturnsIssue(returns, error2) {
        return makeIssue({
          data: returns,
          path: ctx.path,
          errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            getErrorMap(),
            errorMap
          ].filter((x2) => !!x2),
          issueData: {
            code: ZodIssueCode.invalid_return_type,
            returnTypeError: error2
          }
        });
      }
      const params = { errorMap: ctx.common.contextualErrorMap };
      const fn2 = ctx.data;
      if (this._def.returns instanceof ZodPromise) {
        return OK(async (...args) => {
          const error2 = new ZodError([]);
          const parsedArgs = await this._def.args.parseAsync(args, params).catch((e) => {
            error2.addIssue(makeArgsIssue(args, e));
            throw error2;
          });
          const result = await fn2(...parsedArgs);
          const parsedReturns = await this._def.returns._def.type.parseAsync(result, params).catch((e) => {
            error2.addIssue(makeReturnsIssue(result, e));
            throw error2;
          });
          return parsedReturns;
        });
      } else {
        return OK((...args) => {
          const parsedArgs = this._def.args.safeParse(args, params);
          if (!parsedArgs.success) {
            throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
          }
          const result = fn2(...parsedArgs.data);
          const parsedReturns = this._def.returns.safeParse(result, params);
          if (!parsedReturns.success) {
            throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
          }
          return parsedReturns.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...items) {
      return new ZodFunction({
        ...this._def,
        args: ZodTuple.create(items).rest(ZodUnknown.create())
      });
    }
    returns(returnType) {
      return new ZodFunction({
        ...this._def,
        returns: returnType
      });
    }
    implement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    strictImplement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    static create(args, returns, params) {
      return new ZodFunction({
        args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
        returns: returns || ZodUnknown.create(),
        typeName: ZodFirstPartyTypeKind.ZodFunction,
        ...processCreateParams(params)
      });
    }
  };
  var ZodLazy = class extends ZodType {
    get schema() {
      return this._def.getter();
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const lazySchema = this._def.getter();
      return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
  };
  ZodLazy.create = (getter, params) => {
    return new ZodLazy({
      getter,
      typeName: ZodFirstPartyTypeKind.ZodLazy,
      ...processCreateParams(params)
    });
  };
  var ZodLiteral = class extends ZodType {
    _parse(input) {
      if (input.data !== this._def.value) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_literal,
          expected: this._def.value
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
    get value() {
      return this._def.value;
    }
  };
  ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
      value,
      typeName: ZodFirstPartyTypeKind.ZodLiteral,
      ...processCreateParams(params)
    });
  };
  function createZodEnum(values, params) {
    return new ZodEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodEnum,
      ...processCreateParams(params)
    });
  }
  var ZodEnum = class extends ZodType {
    _parse(input) {
      if (typeof input.data !== "string") {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (this._def.values.indexOf(input.data) === -1) {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Values() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
  };
  ZodEnum.create = createZodEnum;
  var ZodNativeEnum = class extends ZodType {
    _parse(input) {
      const nativeEnumValues = util.getValidEnumValues(this._def.values);
      const ctx = this._getOrReturnCtx(input);
      if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (nativeEnumValues.indexOf(input.data) === -1) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
      ...processCreateParams(params)
    });
  };
  var ZodPromise = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.promise,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
      return OK(promisified.then((data) => {
        return this._def.type.parseAsync(data, {
          path: ctx.path,
          errorMap: ctx.common.contextualErrorMap
        });
      }));
    }
  };
  ZodPromise.create = (schema, params) => {
    return new ZodPromise({
      type: schema,
      typeName: ZodFirstPartyTypeKind.ZodPromise,
      ...processCreateParams(params)
    });
  };
  var ZodEffects = class extends ZodType {
    innerType() {
      return this._def.schema;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const effect = this._def.effect || null;
      if (effect.type === "preprocess") {
        const processed = effect.transform(ctx.data);
        if (ctx.common.async) {
          return Promise.resolve(processed).then((processed2) => {
            return this._def.schema._parseAsync({
              data: processed2,
              path: ctx.path,
              parent: ctx
            });
          });
        } else {
          return this._def.schema._parseSync({
            data: processed,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      const checkCtx = {
        addIssue: (arg) => {
          addIssueToContext(ctx, arg);
          if (arg.fatal) {
            status.abort();
          } else {
            status.dirty();
          }
        },
        get path() {
          return ctx.path;
        }
      };
      checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
      if (effect.type === "refinement") {
        const executeRefinement = (acc) => {
          const result = effect.refinement(acc, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(result);
          }
          if (result instanceof Promise) {
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          }
          return acc;
        };
        if (ctx.common.async === false) {
          const inner = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          executeRefinement(inner.value);
          return { status: status.value, value: inner.value };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            return executeRefinement(inner.value).then(() => {
              return { status: status.value, value: inner.value };
            });
          });
        }
      }
      if (effect.type === "transform") {
        if (ctx.common.async === false) {
          const base = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (!isValid(base))
            return base;
          const result = effect.transform(base.value, checkCtx);
          if (result instanceof Promise) {
            throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
          }
          return { status: status.value, value: result };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
            if (!isValid(base))
              return base;
            return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
          });
        }
      }
      util.assertNever(effect);
    }
  };
  ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
      schema,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect,
      ...processCreateParams(params)
    });
  };
  ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
      schema,
      effect: { type: "preprocess", transform: preprocess },
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      ...processCreateParams(params)
    });
  };
  var ZodOptional = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.undefined) {
        return OK(void 0);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodOptional.create = (type, params) => {
    return new ZodOptional({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodOptional,
      ...processCreateParams(params)
    });
  };
  var ZodNullable = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.null) {
        return OK(null);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodNullable.create = (type, params) => {
    return new ZodNullable({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodNullable,
      ...processCreateParams(params)
    });
  };
  var ZodDefault = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      let data = ctx.data;
      if (ctx.parsedType === ZodParsedType.undefined) {
        data = this._def.defaultValue();
      }
      return this._def.innerType._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  ZodDefault.create = (type, params) => {
    return new ZodOptional({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodOptional,
      ...processCreateParams(params)
    });
  };
  var ZodNaN = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.nan) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.nan,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
  };
  ZodNaN.create = (params) => {
    return new ZodNaN({
      typeName: ZodFirstPartyTypeKind.ZodNaN,
      ...processCreateParams(params)
    });
  };
  var BRAND = Symbol("zod_brand");
  var ZodBranded = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const data = ctx.data;
      return this._def.type._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    unwrap() {
      return this._def.type;
    }
  };
  var custom = (check, params = {}, fatal2) => {
    if (check)
      return ZodAny.create().superRefine((data, ctx) => {
        if (!check(data)) {
          const p2 = typeof params === "function" ? params(data) : params;
          const p22 = typeof p2 === "string" ? { message: p2 } : p2;
          ctx.addIssue({ code: "custom", ...p22, fatal: fatal2 });
        }
      });
    return ZodAny.create();
  };
  var late = {
    object: ZodObject.lazycreate
  };
  var ZodFirstPartyTypeKind;
  (function(ZodFirstPartyTypeKind2) {
    ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
  var instanceOfType = (cls, params = {
    message: `Input not instance of ${cls.name}`
  }) => custom((data) => data instanceof cls, params, true);
  var stringType = ZodString.create;
  var numberType = ZodNumber.create;
  var nanType = ZodNaN.create;
  var bigIntType = ZodBigInt.create;
  var booleanType = ZodBoolean.create;
  var dateType = ZodDate.create;
  var undefinedType = ZodUndefined.create;
  var nullType = ZodNull.create;
  var anyType = ZodAny.create;
  var unknownType = ZodUnknown.create;
  var neverType = ZodNever.create;
  var voidType = ZodVoid.create;
  var arrayType = ZodArray.create;
  var objectType = ZodObject.create;
  var strictObjectType = ZodObject.strictCreate;
  var unionType = ZodUnion.create;
  var discriminatedUnionType = ZodDiscriminatedUnion.create;
  var intersectionType = ZodIntersection.create;
  var tupleType = ZodTuple.create;
  var recordType = ZodRecord.create;
  var mapType = ZodMap.create;
  var setType = ZodSet.create;
  var functionType = ZodFunction.create;
  var lazyType = ZodLazy.create;
  var literalType = ZodLiteral.create;
  var enumType = ZodEnum.create;
  var nativeEnumType = ZodNativeEnum.create;
  var promiseType = ZodPromise.create;
  var effectsType = ZodEffects.create;
  var optionalType = ZodOptional.create;
  var nullableType = ZodNullable.create;
  var preprocessType = ZodEffects.createWithPreprocess;
  var ostring = () => stringType().optional();
  var onumber = () => numberType().optional();
  var oboolean = () => booleanType().optional();
  var NEVER = INVALID;
  var mod = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    getParsedType,
    ZodParsedType,
    defaultErrorMap: errorMap,
    setErrorMap,
    getErrorMap,
    makeIssue,
    EMPTY_PATH,
    addIssueToContext,
    ParseStatus,
    INVALID,
    DIRTY,
    OK,
    isAborted,
    isDirty,
    isValid,
    isAsync,
    ZodType,
    ZodString,
    ZodNumber,
    ZodBigInt,
    ZodBoolean,
    ZodDate,
    ZodUndefined,
    ZodNull,
    ZodAny,
    ZodUnknown,
    ZodNever,
    ZodVoid,
    ZodArray,
    get objectUtil() {
      return objectUtil;
    },
    ZodObject,
    ZodUnion,
    ZodDiscriminatedUnion,
    ZodIntersection,
    ZodTuple,
    ZodRecord,
    ZodMap,
    ZodSet,
    ZodFunction,
    ZodLazy,
    ZodLiteral,
    ZodEnum,
    ZodNativeEnum,
    ZodPromise,
    ZodEffects,
    ZodTransformer: ZodEffects,
    ZodOptional,
    ZodNullable,
    ZodDefault,
    ZodNaN,
    BRAND,
    ZodBranded,
    custom,
    Schema: ZodType,
    ZodSchema: ZodType,
    late,
    get ZodFirstPartyTypeKind() {
      return ZodFirstPartyTypeKind;
    },
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    date: dateType,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    "enum": enumType,
    "function": functionType,
    "instanceof": instanceOfType,
    intersection: intersectionType,
    lazy: lazyType,
    literal: literalType,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    "null": nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    oboolean,
    onumber,
    optional: optionalType,
    ostring,
    preprocess: preprocessType,
    promise: promiseType,
    record: recordType,
    set: setType,
    strictObject: strictObjectType,
    string: stringType,
    transformer: effectsType,
    tuple: tupleType,
    "undefined": undefinedType,
    union: unionType,
    unknown: unknownType,
    "void": voidType,
    NEVER,
    ZodIssueCode,
    quotelessJson,
    ZodError
  });

  // ../../packages/post-message/src/schema.ts
  var payloadSchema = mod.object({ error: mod.string().optional(), data: mod.any().optional() });
  var postMessageSchema = mod.object({
    uuid: mod.string().default(() => import_short_uuid.default.uuid()),
    success: mod.boolean().default(true),
    payload: payloadSchema
  });
  function getMessage({ payload, success, uuid }) {
    return postMessageSchema.parse({ payload, success, uuid });
  }

  // ../../packages/post-message/src/worker-client.ts
  var NATIVE_EVENT_TYPES = /* @__PURE__ */ new Set(["ping", "keyChanged"]);
  function initWorkerClient() {
    const pendingMessages = /* @__PURE__ */ new Map();
    function listener(event) {
      const parsed = postMessageSchema.safeParse(event.data);
      const isNativeMessage = NATIVE_EVENT_TYPES.has(event.data.eventType);
      if (isNativeMessage) {
      } else if (parsed.success) {
        const { uuid } = parsed.data;
        const handler = pendingMessages.get(uuid);
        if (handler) {
          pendingMessages.delete(uuid);
          handler(parsed.data);
        }
      } else {
        console.warn("event failed to parse", event);
        console.error(parsed.error);
        throw new Error("Invalid message");
      }
    }
    function unsubscribe() {
      self.removeEventListener("message", listener);
    }
    self.addEventListener("message", listener);
    async function sendMessageToClients2({
      expectResult,
      payload,
      success,
      ttlSeconds = 10,
      uuid
    }) {
      const message = getMessage({ payload, success, uuid });
      const clients = await self.clients.matchAll();
      clients.forEach((client) => {
        client.postMessage(message);
      });
      return expectResult ? new Promise((resolve, reject) => {
        let timedOut = false;
        const timer = setTimeout(() => {
          timedOut = true;
          reject(`Timeout of ${ttlSeconds} seconds exceeded`);
        }, ttlSeconds * 1e3);
        pendingMessages.set(message.uuid, function handler(message2) {
          if (timedOut) {
            const { payload: payload2, success: success2 } = message2;
            clearTimeout(timer);
            success2 ? resolve(payload2) : reject(payload2);
          }
        });
      }) : Promise.resolve({ data: { success: true } });
    }
    return { sendMessageToClients: sendMessageToClients2, unsubscribe };
  }

  // ../../packages/data/service-worker.ts
  var ackMessageSchema = mod.boolean();
  var syncStatusMessageSchema = mod.object({
    taskId: mod.string(),
    isActive: mod.boolean().optional()
  });
  var syncGetRefsMessageSchema = mod.object({
    metadataRefPath: mod.string(),
    tasksRefPath: mod.string()
  });
  var syncTaskMessageSchema = mod.object({
    taskId: mod.string()
  });
  var MessageAction = /* @__PURE__ */ ((MessageAction2) => {
    MessageAction2["ack"] = "ack";
    MessageAction2["syncStatus"] = "syncStatus";
    MessageAction2["syncStart"] = "syncStart";
    MessageAction2["syncStop"] = "syncStop";
    MessageAction2["syncEmpty"] = "syncEmpty";
    MessageAction2["syncRequeue"] = "syncRequeue";
    MessageAction2["syncGetRefs"] = "syncGetRefs";
    MessageAction2["syncTaskStatus"] = "syncTaskStatus";
    MessageAction2["syncQueueRefs"] = "syncQueueRefs";
    return MessageAction2;
  })(MessageAction || {});
  function encodePostMessage({ action, data, error: error2, uuid }) {
    const payload = { error: error2, data: { action, ...data } };
    return postMessageSchema.parse({
      payload,
      success: !error2,
      uuid
    });
  }
  var messageActionSchema = mod.nativeEnum(MessageAction);
  function decodePostMessage(message) {
    const { payload, uuid } = postMessageSchema.parse(message);
    const { data, error: error2 } = payload;
    const action = messageActionSchema.parse(data.action);
    switch (action) {
      case "syncStatus" /* syncStatus */:
        return { action, data: syncStatusMessageSchema.parse(data), error: error2, uuid };
      case "syncGetRefs" /* syncGetRefs */:
        return { action, data: syncGetRefsMessageSchema.parse(data), error: error2, uuid };
      case "syncStart" /* syncStart */:
      case "syncStop" /* syncStop */:
      case "syncEmpty" /* syncEmpty */:
      case "syncRequeue" /* syncRequeue */:
        return { action, data: syncTaskMessageSchema.parse(data), error: error2, uuid };
      default:
        return { action, data: false, error: error2, uuid };
    }
  }

  // ../../node_modules/@firebase/util/dist/index.esm2017.js
  var CONSTANTS = {
    NODE_CLIENT: false,
    NODE_ADMIN: false,
    SDK_VERSION: "${JSCORE_VERSION}"
  };
  var assert = function(assertion, message) {
    if (!assertion) {
      throw assertionError(message);
    }
  };
  var assertionError = function(message) {
    return new Error("Firebase Database (" + CONSTANTS.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + message);
  };
  var stringToByteArray$1 = function(str) {
    const out = [];
    let p2 = 0;
    for (let i2 = 0; i2 < str.length; i2++) {
      let c2 = str.charCodeAt(i2);
      if (c2 < 128) {
        out[p2++] = c2;
      } else if (c2 < 2048) {
        out[p2++] = c2 >> 6 | 192;
        out[p2++] = c2 & 63 | 128;
      } else if ((c2 & 64512) === 55296 && i2 + 1 < str.length && (str.charCodeAt(i2 + 1) & 64512) === 56320) {
        c2 = 65536 + ((c2 & 1023) << 10) + (str.charCodeAt(++i2) & 1023);
        out[p2++] = c2 >> 18 | 240;
        out[p2++] = c2 >> 12 & 63 | 128;
        out[p2++] = c2 >> 6 & 63 | 128;
        out[p2++] = c2 & 63 | 128;
      } else {
        out[p2++] = c2 >> 12 | 224;
        out[p2++] = c2 >> 6 & 63 | 128;
        out[p2++] = c2 & 63 | 128;
      }
    }
    return out;
  };
  var byteArrayToString = function(bytes) {
    const out = [];
    let pos = 0, c2 = 0;
    while (pos < bytes.length) {
      const c1 = bytes[pos++];
      if (c1 < 128) {
        out[c2++] = String.fromCharCode(c1);
      } else if (c1 > 191 && c1 < 224) {
        const c22 = bytes[pos++];
        out[c2++] = String.fromCharCode((c1 & 31) << 6 | c22 & 63);
      } else if (c1 > 239 && c1 < 365) {
        const c22 = bytes[pos++];
        const c3 = bytes[pos++];
        const c4 = bytes[pos++];
        const u2 = ((c1 & 7) << 18 | (c22 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
        out[c2++] = String.fromCharCode(55296 + (u2 >> 10));
        out[c2++] = String.fromCharCode(56320 + (u2 & 1023));
      } else {
        const c22 = bytes[pos++];
        const c3 = bytes[pos++];
        out[c2++] = String.fromCharCode((c1 & 15) << 12 | (c22 & 63) << 6 | c3 & 63);
      }
    }
    return out.join("");
  };
  var base64 = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: typeof atob === "function",
    encodeByteArray(input, webSafe) {
      if (!Array.isArray(input)) {
        throw Error("encodeByteArray takes an array as a parameter");
      }
      this.init_();
      const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
      const output = [];
      for (let i2 = 0; i2 < input.length; i2 += 3) {
        const byte1 = input[i2];
        const haveByte2 = i2 + 1 < input.length;
        const byte2 = haveByte2 ? input[i2 + 1] : 0;
        const haveByte3 = i2 + 2 < input.length;
        const byte3 = haveByte3 ? input[i2 + 2] : 0;
        const outByte1 = byte1 >> 2;
        const outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
        let outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
        let outByte4 = byte3 & 63;
        if (!haveByte3) {
          outByte4 = 64;
          if (!haveByte2) {
            outByte3 = 64;
          }
        }
        output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
      }
      return output.join("");
    },
    encodeString(input, webSafe) {
      if (this.HAS_NATIVE_SUPPORT && !webSafe) {
        return btoa(input);
      }
      return this.encodeByteArray(stringToByteArray$1(input), webSafe);
    },
    decodeString(input, webSafe) {
      if (this.HAS_NATIVE_SUPPORT && !webSafe) {
        return atob(input);
      }
      return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
    },
    decodeStringToByteArray(input, webSafe) {
      this.init_();
      const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
      const output = [];
      for (let i2 = 0; i2 < input.length; ) {
        const byte1 = charToByteMap[input.charAt(i2++)];
        const haveByte2 = i2 < input.length;
        const byte2 = haveByte2 ? charToByteMap[input.charAt(i2)] : 0;
        ++i2;
        const haveByte3 = i2 < input.length;
        const byte3 = haveByte3 ? charToByteMap[input.charAt(i2)] : 64;
        ++i2;
        const haveByte4 = i2 < input.length;
        const byte4 = haveByte4 ? charToByteMap[input.charAt(i2)] : 64;
        ++i2;
        if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
          throw Error();
        }
        const outByte1 = byte1 << 2 | byte2 >> 4;
        output.push(outByte1);
        if (byte3 !== 64) {
          const outByte2 = byte2 << 4 & 240 | byte3 >> 2;
          output.push(outByte2);
          if (byte4 !== 64) {
            const outByte3 = byte3 << 6 & 192 | byte4;
            output.push(outByte3);
          }
        }
      }
      return output;
    },
    init_() {
      if (!this.byteToCharMap_) {
        this.byteToCharMap_ = {};
        this.charToByteMap_ = {};
        this.byteToCharMapWebSafe_ = {};
        this.charToByteMapWebSafe_ = {};
        for (let i2 = 0; i2 < this.ENCODED_VALS.length; i2++) {
          this.byteToCharMap_[i2] = this.ENCODED_VALS.charAt(i2);
          this.charToByteMap_[this.byteToCharMap_[i2]] = i2;
          this.byteToCharMapWebSafe_[i2] = this.ENCODED_VALS_WEBSAFE.charAt(i2);
          this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i2]] = i2;
          if (i2 >= this.ENCODED_VALS_BASE.length) {
            this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i2)] = i2;
            this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i2)] = i2;
          }
        }
      }
    }
  };
  var base64Encode = function(str) {
    const utf8Bytes = stringToByteArray$1(str);
    return base64.encodeByteArray(utf8Bytes, true);
  };
  var base64urlEncodeWithoutPadding = function(str) {
    return base64Encode(str).replace(/\./g, "");
  };
  var base64Decode = function(str) {
    try {
      return base64.decodeString(str, true);
    } catch (e) {
      console.error("base64Decode failed: ", e);
    }
    return null;
  };
  function deepCopy(value) {
    return deepExtend(void 0, value);
  }
  function deepExtend(target, source) {
    if (!(source instanceof Object)) {
      return source;
    }
    switch (source.constructor) {
      case Date:
        const dateValue = source;
        return new Date(dateValue.getTime());
      case Object:
        if (target === void 0) {
          target = {};
        }
        break;
      case Array:
        target = [];
        break;
      default:
        return source;
    }
    for (const prop in source) {
      if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
        continue;
      }
      target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
  }
  function isValidKey(key) {
    return key !== "__proto__";
  }
  function getUA() {
    if (typeof navigator !== "undefined" && typeof navigator["userAgent"] === "string") {
      return navigator["userAgent"];
    } else {
      return "";
    }
  }
  function isMobileCordova() {
    return typeof window !== "undefined" && !!(window["cordova"] || window["phonegap"] || window["PhoneGap"]) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
  }
  function isBrowserExtension() {
    const runtime = typeof chrome === "object" ? chrome.runtime : typeof browser === "object" ? browser.runtime : void 0;
    return typeof runtime === "object" && runtime.id !== void 0;
  }
  function isReactNative() {
    return typeof navigator === "object" && navigator["product"] === "ReactNative";
  }
  function isIE() {
    const ua = getUA();
    return ua.indexOf("MSIE ") >= 0 || ua.indexOf("Trident/") >= 0;
  }
  function isNodeSdk() {
    return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
  }
  function isIndexedDBAvailable() {
    return typeof indexedDB === "object";
  }
  function validateIndexedDBOpenable() {
    return new Promise((resolve, reject) => {
      try {
        let preExist = true;
        const DB_CHECK_NAME = "validate-browser-context-for-indexeddb-analytics-module";
        const request = self.indexedDB.open(DB_CHECK_NAME);
        request.onsuccess = () => {
          request.result.close();
          if (!preExist) {
            self.indexedDB.deleteDatabase(DB_CHECK_NAME);
          }
          resolve(true);
        };
        request.onupgradeneeded = () => {
          preExist = false;
        };
        request.onerror = () => {
          var _a;
          reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || "");
        };
      } catch (error2) {
        reject(error2);
      }
    });
  }
  function getGlobal() {
    if (typeof self !== "undefined") {
      return self;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    throw new Error("Unable to locate global object.");
  }
  var getDefaultsFromGlobal = () => getGlobal().__FIREBASE_DEFAULTS__;
  var getDefaultsFromEnvVariable = () => {
    if (typeof process === "undefined" || typeof process.env === "undefined") {
      return;
    }
    const defaultsJsonString = process.env.__FIREBASE_DEFAULTS__;
    if (defaultsJsonString) {
      return JSON.parse(defaultsJsonString);
    }
  };
  var getDefaultsFromCookie = () => {
    if (typeof document === "undefined") {
      return;
    }
    let match;
    try {
      match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch (e) {
      return;
    }
    const decoded = match && base64Decode(match[1]);
    return decoded && JSON.parse(decoded);
  };
  var getDefaults = () => {
    try {
      return getDefaultsFromGlobal() || getDefaultsFromEnvVariable() || getDefaultsFromCookie();
    } catch (e) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
      return;
    }
  };
  var getDefaultEmulatorHost = (productName) => {
    var _a, _b;
    return (_b = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.emulatorHosts) === null || _b === void 0 ? void 0 : _b[productName];
  };
  var getDefaultEmulatorHostnameAndPort = (productName) => {
    const host = getDefaultEmulatorHost(productName);
    if (!host) {
      return void 0;
    }
    const separatorIndex = host.lastIndexOf(":");
    if (separatorIndex <= 0 || separatorIndex + 1 === host.length) {
      throw new Error(`Invalid host ${host} with no separate hostname and port!`);
    }
    const port = parseInt(host.substring(separatorIndex + 1), 10);
    if (host[0] === "[") {
      return [host.substring(1, separatorIndex - 1), port];
    } else {
      return [host.substring(0, separatorIndex), port];
    }
  };
  var getDefaultAppConfig = () => {
    var _a;
    return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.config;
  };
  var getExperimentalSetting = (name5) => {
    var _a;
    return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a[`_${name5}`];
  };
  var Deferred = class {
    constructor() {
      this.reject = () => {
      };
      this.resolve = () => {
      };
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
    wrapCallback(callback) {
      return (error2, value) => {
        if (error2) {
          this.reject(error2);
        } else {
          this.resolve(value);
        }
        if (typeof callback === "function") {
          this.promise.catch(() => {
          });
          if (callback.length === 1) {
            callback(error2);
          } else {
            callback(error2, value);
          }
        }
      };
    }
  };
  function createMockUserToken(token, projectId) {
    if (token.uid) {
      throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
    }
    const header = {
      alg: "none",
      type: "JWT"
    };
    const project = projectId || "demo-project";
    const iat = token.iat || 0;
    const sub = token.sub || token.user_id;
    if (!sub) {
      throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
    }
    const payload = Object.assign({
      iss: `https://securetoken.google.com/${project}`,
      aud: project,
      iat,
      exp: iat + 3600,
      auth_time: iat,
      sub,
      user_id: sub,
      firebase: {
        sign_in_provider: "custom",
        identities: {}
      }
    }, token);
    const signature = "";
    return [
      base64urlEncodeWithoutPadding(JSON.stringify(header)),
      base64urlEncodeWithoutPadding(JSON.stringify(payload)),
      signature
    ].join(".");
  }
  var ERROR_NAME = "FirebaseError";
  var FirebaseError = class extends Error {
    constructor(code, message, customData) {
      super(message);
      this.code = code;
      this.customData = customData;
      this.name = ERROR_NAME;
      Object.setPrototypeOf(this, FirebaseError.prototype);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ErrorFactory.prototype.create);
      }
    }
  };
  var ErrorFactory = class {
    constructor(service, serviceName, errors) {
      this.service = service;
      this.serviceName = serviceName;
      this.errors = errors;
    }
    create(code, ...data) {
      const customData = data[0] || {};
      const fullCode = `${this.service}/${code}`;
      const template = this.errors[code];
      const message = template ? replaceTemplate(template, customData) : "Error";
      const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
      const error2 = new FirebaseError(fullCode, fullMessage, customData);
      return error2;
    }
  };
  function replaceTemplate(template, data) {
    return template.replace(PATTERN, (_2, key) => {
      const value = data[key];
      return value != null ? String(value) : `<${key}?>`;
    });
  }
  var PATTERN = /\{\$([^}]+)}/g;
  function jsonEval(str) {
    return JSON.parse(str);
  }
  function stringify2(data) {
    return JSON.stringify(data);
  }
  var decode = function(token) {
    let header = {}, claims = {}, data = {}, signature = "";
    try {
      const parts = token.split(".");
      header = jsonEval(base64Decode(parts[0]) || "");
      claims = jsonEval(base64Decode(parts[1]) || "");
      signature = parts[2];
      data = claims["d"] || {};
      delete claims["d"];
    } catch (e) {
    }
    return {
      header,
      claims,
      data,
      signature
    };
  };
  var isValidFormat = function(token) {
    const decoded = decode(token), claims = decoded.claims;
    return !!claims && typeof claims === "object" && claims.hasOwnProperty("iat");
  };
  var isAdmin = function(token) {
    const claims = decode(token).claims;
    return typeof claims === "object" && claims["admin"] === true;
  };
  function contains(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  function safeGet(obj, key) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return obj[key];
    } else {
      return void 0;
    }
  }
  function isEmpty(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }
  function map(obj, fn2, contextObj) {
    const res = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        res[key] = fn2.call(contextObj, obj[key], key, obj);
      }
    }
    return res;
  }
  function deepEqual(a2, b2) {
    if (a2 === b2) {
      return true;
    }
    const aKeys = Object.keys(a2);
    const bKeys = Object.keys(b2);
    for (const k2 of aKeys) {
      if (!bKeys.includes(k2)) {
        return false;
      }
      const aProp = a2[k2];
      const bProp = b2[k2];
      if (isObject(aProp) && isObject(bProp)) {
        if (!deepEqual(aProp, bProp)) {
          return false;
        }
      } else if (aProp !== bProp) {
        return false;
      }
    }
    for (const k2 of bKeys) {
      if (!aKeys.includes(k2)) {
        return false;
      }
    }
    return true;
  }
  function isObject(thing) {
    return thing !== null && typeof thing === "object";
  }
  function querystring(querystringParams) {
    const params = [];
    for (const [key, value] of Object.entries(querystringParams)) {
      if (Array.isArray(value)) {
        value.forEach((arrayVal) => {
          params.push(encodeURIComponent(key) + "=" + encodeURIComponent(arrayVal));
        });
      } else {
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      }
    }
    return params.length ? "&" + params.join("&") : "";
  }
  function querystringDecode(querystring2) {
    const obj = {};
    const tokens = querystring2.replace(/^\?/, "").split("&");
    tokens.forEach((token) => {
      if (token) {
        const [key, value] = token.split("=");
        obj[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });
    return obj;
  }
  function extractQuerystring(url) {
    const queryStart = url.indexOf("?");
    if (!queryStart) {
      return "";
    }
    const fragmentStart = url.indexOf("#", queryStart);
    return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : void 0);
  }
  var Sha1 = class {
    constructor() {
      this.chain_ = [];
      this.buf_ = [];
      this.W_ = [];
      this.pad_ = [];
      this.inbuf_ = 0;
      this.total_ = 0;
      this.blockSize = 512 / 8;
      this.pad_[0] = 128;
      for (let i2 = 1; i2 < this.blockSize; ++i2) {
        this.pad_[i2] = 0;
      }
      this.reset();
    }
    reset() {
      this.chain_[0] = 1732584193;
      this.chain_[1] = 4023233417;
      this.chain_[2] = 2562383102;
      this.chain_[3] = 271733878;
      this.chain_[4] = 3285377520;
      this.inbuf_ = 0;
      this.total_ = 0;
    }
    compress_(buf, offset) {
      if (!offset) {
        offset = 0;
      }
      const W2 = this.W_;
      if (typeof buf === "string") {
        for (let i2 = 0; i2 < 16; i2++) {
          W2[i2] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
          offset += 4;
        }
      } else {
        for (let i2 = 0; i2 < 16; i2++) {
          W2[i2] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
          offset += 4;
        }
      }
      for (let i2 = 16; i2 < 80; i2++) {
        const t2 = W2[i2 - 3] ^ W2[i2 - 8] ^ W2[i2 - 14] ^ W2[i2 - 16];
        W2[i2] = (t2 << 1 | t2 >>> 31) & 4294967295;
      }
      let a2 = this.chain_[0];
      let b2 = this.chain_[1];
      let c2 = this.chain_[2];
      let d2 = this.chain_[3];
      let e = this.chain_[4];
      let f3, k2;
      for (let i2 = 0; i2 < 80; i2++) {
        if (i2 < 40) {
          if (i2 < 20) {
            f3 = d2 ^ b2 & (c2 ^ d2);
            k2 = 1518500249;
          } else {
            f3 = b2 ^ c2 ^ d2;
            k2 = 1859775393;
          }
        } else {
          if (i2 < 60) {
            f3 = b2 & c2 | d2 & (b2 | c2);
            k2 = 2400959708;
          } else {
            f3 = b2 ^ c2 ^ d2;
            k2 = 3395469782;
          }
        }
        const t2 = (a2 << 5 | a2 >>> 27) + f3 + e + k2 + W2[i2] & 4294967295;
        e = d2;
        d2 = c2;
        c2 = (b2 << 30 | b2 >>> 2) & 4294967295;
        b2 = a2;
        a2 = t2;
      }
      this.chain_[0] = this.chain_[0] + a2 & 4294967295;
      this.chain_[1] = this.chain_[1] + b2 & 4294967295;
      this.chain_[2] = this.chain_[2] + c2 & 4294967295;
      this.chain_[3] = this.chain_[3] + d2 & 4294967295;
      this.chain_[4] = this.chain_[4] + e & 4294967295;
    }
    update(bytes, length) {
      if (bytes == null) {
        return;
      }
      if (length === void 0) {
        length = bytes.length;
      }
      const lengthMinusBlock = length - this.blockSize;
      let n2 = 0;
      const buf = this.buf_;
      let inbuf = this.inbuf_;
      while (n2 < length) {
        if (inbuf === 0) {
          while (n2 <= lengthMinusBlock) {
            this.compress_(bytes, n2);
            n2 += this.blockSize;
          }
        }
        if (typeof bytes === "string") {
          while (n2 < length) {
            buf[inbuf] = bytes.charCodeAt(n2);
            ++inbuf;
            ++n2;
            if (inbuf === this.blockSize) {
              this.compress_(buf);
              inbuf = 0;
              break;
            }
          }
        } else {
          while (n2 < length) {
            buf[inbuf] = bytes[n2];
            ++inbuf;
            ++n2;
            if (inbuf === this.blockSize) {
              this.compress_(buf);
              inbuf = 0;
              break;
            }
          }
        }
      }
      this.inbuf_ = inbuf;
      this.total_ += length;
    }
    digest() {
      const digest = [];
      let totalBits = this.total_ * 8;
      if (this.inbuf_ < 56) {
        this.update(this.pad_, 56 - this.inbuf_);
      } else {
        this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
      }
      for (let i2 = this.blockSize - 1; i2 >= 56; i2--) {
        this.buf_[i2] = totalBits & 255;
        totalBits /= 256;
      }
      this.compress_(this.buf_);
      let n2 = 0;
      for (let i2 = 0; i2 < 5; i2++) {
        for (let j2 = 24; j2 >= 0; j2 -= 8) {
          digest[n2] = this.chain_[i2] >> j2 & 255;
          ++n2;
        }
      }
      return digest;
    }
  };
  function createSubscribe(executor, onNoObservers) {
    const proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
  }
  var ObserverProxy = class {
    constructor(executor, onNoObservers) {
      this.observers = [];
      this.unsubscribes = [];
      this.observerCount = 0;
      this.task = Promise.resolve();
      this.finalized = false;
      this.onNoObservers = onNoObservers;
      this.task.then(() => {
        executor(this);
      }).catch((e) => {
        this.error(e);
      });
    }
    next(value) {
      this.forEachObserver((observer) => {
        observer.next(value);
      });
    }
    error(error2) {
      this.forEachObserver((observer) => {
        observer.error(error2);
      });
      this.close(error2);
    }
    complete() {
      this.forEachObserver((observer) => {
        observer.complete();
      });
      this.close();
    }
    subscribe(nextOrObserver, error2, complete) {
      let observer;
      if (nextOrObserver === void 0 && error2 === void 0 && complete === void 0) {
        throw new Error("Missing Observer.");
      }
      if (implementsAnyMethods(nextOrObserver, [
        "next",
        "error",
        "complete"
      ])) {
        observer = nextOrObserver;
      } else {
        observer = {
          next: nextOrObserver,
          error: error2,
          complete
        };
      }
      if (observer.next === void 0) {
        observer.next = noop;
      }
      if (observer.error === void 0) {
        observer.error = noop;
      }
      if (observer.complete === void 0) {
        observer.complete = noop;
      }
      const unsub = this.unsubscribeOne.bind(this, this.observers.length);
      if (this.finalized) {
        this.task.then(() => {
          try {
            if (this.finalError) {
              observer.error(this.finalError);
            } else {
              observer.complete();
            }
          } catch (e) {
          }
          return;
        });
      }
      this.observers.push(observer);
      return unsub;
    }
    unsubscribeOne(i2) {
      if (this.observers === void 0 || this.observers[i2] === void 0) {
        return;
      }
      delete this.observers[i2];
      this.observerCount -= 1;
      if (this.observerCount === 0 && this.onNoObservers !== void 0) {
        this.onNoObservers(this);
      }
    }
    forEachObserver(fn2) {
      if (this.finalized) {
        return;
      }
      for (let i2 = 0; i2 < this.observers.length; i2++) {
        this.sendOne(i2, fn2);
      }
    }
    sendOne(i2, fn2) {
      this.task.then(() => {
        if (this.observers !== void 0 && this.observers[i2] !== void 0) {
          try {
            fn2(this.observers[i2]);
          } catch (e) {
            if (typeof console !== "undefined" && console.error) {
              console.error(e);
            }
          }
        }
      });
    }
    close(err) {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      if (err !== void 0) {
        this.finalError = err;
      }
      this.task.then(() => {
        this.observers = void 0;
        this.onNoObservers = void 0;
      });
    }
  };
  function implementsAnyMethods(obj, methods) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    for (const method of methods) {
      if (method in obj && typeof obj[method] === "function") {
        return true;
      }
    }
    return false;
  }
  function noop() {
  }
  function errorPrefix(fnName, argName) {
    return `${fnName} failed: ${argName} argument `;
  }
  var stringToByteArray = function(str) {
    const out = [];
    let p2 = 0;
    for (let i2 = 0; i2 < str.length; i2++) {
      let c2 = str.charCodeAt(i2);
      if (c2 >= 55296 && c2 <= 56319) {
        const high = c2 - 55296;
        i2++;
        assert(i2 < str.length, "Surrogate pair missing trail surrogate.");
        const low = str.charCodeAt(i2) - 56320;
        c2 = 65536 + (high << 10) + low;
      }
      if (c2 < 128) {
        out[p2++] = c2;
      } else if (c2 < 2048) {
        out[p2++] = c2 >> 6 | 192;
        out[p2++] = c2 & 63 | 128;
      } else if (c2 < 65536) {
        out[p2++] = c2 >> 12 | 224;
        out[p2++] = c2 >> 6 & 63 | 128;
        out[p2++] = c2 & 63 | 128;
      } else {
        out[p2++] = c2 >> 18 | 240;
        out[p2++] = c2 >> 12 & 63 | 128;
        out[p2++] = c2 >> 6 & 63 | 128;
        out[p2++] = c2 & 63 | 128;
      }
    }
    return out;
  };
  var stringLength = function(str) {
    let p2 = 0;
    for (let i2 = 0; i2 < str.length; i2++) {
      const c2 = str.charCodeAt(i2);
      if (c2 < 128) {
        p2++;
      } else if (c2 < 2048) {
        p2 += 2;
      } else if (c2 >= 55296 && c2 <= 56319) {
        p2 += 4;
        i2++;
      } else {
        p2 += 3;
      }
    }
    return p2;
  };
  var MAX_VALUE_MILLIS = 4 * 60 * 60 * 1e3;
  function getModularInstance(service) {
    if (service && service._delegate) {
      return service._delegate;
    } else {
      return service;
    }
  }

  // ../../node_modules/@firebase/component/dist/esm/index.esm2017.js
  var Component = class {
    constructor(name5, instanceFactory, type) {
      this.name = name5;
      this.instanceFactory = instanceFactory;
      this.type = type;
      this.multipleInstances = false;
      this.serviceProps = {};
      this.instantiationMode = "LAZY";
      this.onInstanceCreated = null;
    }
    setInstantiationMode(mode) {
      this.instantiationMode = mode;
      return this;
    }
    setMultipleInstances(multipleInstances) {
      this.multipleInstances = multipleInstances;
      return this;
    }
    setServiceProps(props) {
      this.serviceProps = props;
      return this;
    }
    setInstanceCreatedCallback(callback) {
      this.onInstanceCreated = callback;
      return this;
    }
  };
  var DEFAULT_ENTRY_NAME = "[DEFAULT]";
  var Provider = class {
    constructor(name5, container) {
      this.name = name5;
      this.container = container;
      this.component = null;
      this.instances = /* @__PURE__ */ new Map();
      this.instancesDeferred = /* @__PURE__ */ new Map();
      this.instancesOptions = /* @__PURE__ */ new Map();
      this.onInitCallbacks = /* @__PURE__ */ new Map();
    }
    get(identifier) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
      if (!this.instancesDeferred.has(normalizedIdentifier)) {
        const deferred = new Deferred();
        this.instancesDeferred.set(normalizedIdentifier, deferred);
        if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
          try {
            const instance = this.getOrInitializeService({
              instanceIdentifier: normalizedIdentifier
            });
            if (instance) {
              deferred.resolve(instance);
            }
          } catch (e) {
          }
        }
      }
      return this.instancesDeferred.get(normalizedIdentifier).promise;
    }
    getImmediate(options) {
      var _a;
      const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
      const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        try {
          return this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });
        } catch (e) {
          if (optional) {
            return null;
          } else {
            throw e;
          }
        }
      } else {
        if (optional) {
          return null;
        } else {
          throw Error(`Service ${this.name} is not available`);
        }
      }
    }
    getComponent() {
      return this.component;
    }
    setComponent(component) {
      if (component.name !== this.name) {
        throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
      }
      if (this.component) {
        throw Error(`Component for ${this.name} has already been provided`);
      }
      this.component = component;
      if (!this.shouldAutoInitialize()) {
        return;
      }
      if (isComponentEager(component)) {
        try {
          this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME });
        } catch (e) {
        }
      }
      for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
        const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });
          instanceDeferred.resolve(instance);
        } catch (e) {
        }
      }
    }
    clearInstance(identifier = DEFAULT_ENTRY_NAME) {
      this.instancesDeferred.delete(identifier);
      this.instancesOptions.delete(identifier);
      this.instances.delete(identifier);
    }
    async delete() {
      const services = Array.from(this.instances.values());
      await Promise.all([
        ...services.filter((service) => "INTERNAL" in service).map((service) => service.INTERNAL.delete()),
        ...services.filter((service) => "_delete" in service).map((service) => service._delete())
      ]);
    }
    isComponentSet() {
      return this.component != null;
    }
    isInitialized(identifier = DEFAULT_ENTRY_NAME) {
      return this.instances.has(identifier);
    }
    getOptions(identifier = DEFAULT_ENTRY_NAME) {
      return this.instancesOptions.get(identifier) || {};
    }
    initialize(opts = {}) {
      const { options = {} } = opts;
      const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
      if (this.isInitialized(normalizedIdentifier)) {
        throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
      }
      if (!this.isComponentSet()) {
        throw Error(`Component ${this.name} has not been registered yet`);
      }
      const instance = this.getOrInitializeService({
        instanceIdentifier: normalizedIdentifier,
        options
      });
      for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
        const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
        if (normalizedIdentifier === normalizedDeferredIdentifier) {
          instanceDeferred.resolve(instance);
        }
      }
      return instance;
    }
    onInit(callback, identifier) {
      var _a;
      const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
      const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
      existingCallbacks.add(callback);
      this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
      const existingInstance = this.instances.get(normalizedIdentifier);
      if (existingInstance) {
        callback(existingInstance, normalizedIdentifier);
      }
      return () => {
        existingCallbacks.delete(callback);
      };
    }
    invokeOnInitCallbacks(instance, identifier) {
      const callbacks = this.onInitCallbacks.get(identifier);
      if (!callbacks) {
        return;
      }
      for (const callback of callbacks) {
        try {
          callback(instance, identifier);
        } catch (_a) {
        }
      }
    }
    getOrInitializeService({ instanceIdentifier, options = {} }) {
      let instance = this.instances.get(instanceIdentifier);
      if (!instance && this.component) {
        instance = this.component.instanceFactory(this.container, {
          instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
          options
        });
        this.instances.set(instanceIdentifier, instance);
        this.instancesOptions.set(instanceIdentifier, options);
        this.invokeOnInitCallbacks(instance, instanceIdentifier);
        if (this.component.onInstanceCreated) {
          try {
            this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
          } catch (_a) {
          }
        }
      }
      return instance || null;
    }
    normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
      if (this.component) {
        return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
      } else {
        return identifier;
      }
    }
    shouldAutoInitialize() {
      return !!this.component && this.component.instantiationMode !== "EXPLICIT";
    }
  };
  function normalizeIdentifierForFactory(identifier) {
    return identifier === DEFAULT_ENTRY_NAME ? void 0 : identifier;
  }
  function isComponentEager(component) {
    return component.instantiationMode === "EAGER";
  }
  var ComponentContainer = class {
    constructor(name5) {
      this.name = name5;
      this.providers = /* @__PURE__ */ new Map();
    }
    addComponent(component) {
      const provider = this.getProvider(component.name);
      if (provider.isComponentSet()) {
        throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
      }
      provider.setComponent(component);
    }
    addOrOverwriteComponent(component) {
      const provider = this.getProvider(component.name);
      if (provider.isComponentSet()) {
        this.providers.delete(component.name);
      }
      this.addComponent(component);
    }
    getProvider(name5) {
      if (this.providers.has(name5)) {
        return this.providers.get(name5);
      }
      const provider = new Provider(name5, this);
      this.providers.set(name5, provider);
      return provider;
    }
    getProviders() {
      return Array.from(this.providers.values());
    }
  };

  // ../../node_modules/@firebase/logger/dist/esm/index.esm2017.js
  var instances = [];
  var LogLevel;
  (function(LogLevel2) {
    LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
    LogLevel2[LogLevel2["VERBOSE"] = 1] = "VERBOSE";
    LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
    LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
    LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
    LogLevel2[LogLevel2["SILENT"] = 5] = "SILENT";
  })(LogLevel || (LogLevel = {}));
  var levelStringToEnum = {
    "debug": LogLevel.DEBUG,
    "verbose": LogLevel.VERBOSE,
    "info": LogLevel.INFO,
    "warn": LogLevel.WARN,
    "error": LogLevel.ERROR,
    "silent": LogLevel.SILENT
  };
  var defaultLogLevel = LogLevel.INFO;
  var ConsoleMethod = {
    [LogLevel.DEBUG]: "log",
    [LogLevel.VERBOSE]: "log",
    [LogLevel.INFO]: "info",
    [LogLevel.WARN]: "warn",
    [LogLevel.ERROR]: "error"
  };
  var defaultLogHandler = (instance, logType, ...args) => {
    if (logType < instance.logLevel) {
      return;
    }
    const now = new Date().toISOString();
    const method = ConsoleMethod[logType];
    if (method) {
      console[method](`[${now}]  ${instance.name}:`, ...args);
    } else {
      throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
    }
  };
  var Logger = class {
    constructor(name5) {
      this.name = name5;
      this._logLevel = defaultLogLevel;
      this._logHandler = defaultLogHandler;
      this._userLogHandler = null;
      instances.push(this);
    }
    get logLevel() {
      return this._logLevel;
    }
    set logLevel(val) {
      if (!(val in LogLevel)) {
        throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
      }
      this._logLevel = val;
    }
    setLogLevel(val) {
      this._logLevel = typeof val === "string" ? levelStringToEnum[val] : val;
    }
    get logHandler() {
      return this._logHandler;
    }
    set logHandler(val) {
      if (typeof val !== "function") {
        throw new TypeError("Value assigned to `logHandler` must be a function");
      }
      this._logHandler = val;
    }
    get userLogHandler() {
      return this._userLogHandler;
    }
    set userLogHandler(val) {
      this._userLogHandler = val;
    }
    debug(...args) {
      this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
      this._logHandler(this, LogLevel.DEBUG, ...args);
    }
    log(...args) {
      this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
      this._logHandler(this, LogLevel.VERBOSE, ...args);
    }
    info(...args) {
      this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
      this._logHandler(this, LogLevel.INFO, ...args);
    }
    warn(...args) {
      this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
      this._logHandler(this, LogLevel.WARN, ...args);
    }
    error(...args) {
      this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
      this._logHandler(this, LogLevel.ERROR, ...args);
    }
  };

  // ../../node_modules/idb/build/wrap-idb-value.js
  var instanceOfAny = (object, constructors) => constructors.some((c2) => object instanceof c2);
  var idbProxyableTypes;
  var cursorAdvanceMethods;
  function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
      IDBDatabase,
      IDBObjectStore,
      IDBIndex,
      IDBCursor,
      IDBTransaction
    ]);
  }
  function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey
    ]);
  }
  var cursorRequestMap = /* @__PURE__ */ new WeakMap();
  var transactionDoneMap = /* @__PURE__ */ new WeakMap();
  var transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
  var transformCache = /* @__PURE__ */ new WeakMap();
  var reverseTransformCache = /* @__PURE__ */ new WeakMap();
  function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
      const unlisten = () => {
        request.removeEventListener("success", success);
        request.removeEventListener("error", error2);
      };
      const success = () => {
        resolve(wrap(request.result));
        unlisten();
      };
      const error2 = () => {
        reject(request.error);
        unlisten();
      };
      request.addEventListener("success", success);
      request.addEventListener("error", error2);
    });
    promise.then((value) => {
      if (value instanceof IDBCursor) {
        cursorRequestMap.set(value, request);
      }
    }).catch(() => {
    });
    reverseTransformCache.set(promise, request);
    return promise;
  }
  function cacheDonePromiseForTransaction(tx) {
    if (transactionDoneMap.has(tx))
      return;
    const done = new Promise((resolve, reject) => {
      const unlisten = () => {
        tx.removeEventListener("complete", complete);
        tx.removeEventListener("error", error2);
        tx.removeEventListener("abort", error2);
      };
      const complete = () => {
        resolve();
        unlisten();
      };
      const error2 = () => {
        reject(tx.error || new DOMException("AbortError", "AbortError"));
        unlisten();
      };
      tx.addEventListener("complete", complete);
      tx.addEventListener("error", error2);
      tx.addEventListener("abort", error2);
    });
    transactionDoneMap.set(tx, done);
  }
  var idbProxyTraps = {
    get(target, prop, receiver) {
      if (target instanceof IDBTransaction) {
        if (prop === "done")
          return transactionDoneMap.get(target);
        if (prop === "objectStoreNames") {
          return target.objectStoreNames || transactionStoreNamesMap.get(target);
        }
        if (prop === "store") {
          return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
        }
      }
      return wrap(target[prop]);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
        return true;
      }
      return prop in target;
    }
  };
  function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }
  function wrapFunction(func) {
    if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
      return function(storeNames, ...args) {
        const tx = func.call(unwrap(this), storeNames, ...args);
        transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
        return wrap(tx);
      };
    }
    if (getCursorAdvanceMethods().includes(func)) {
      return function(...args) {
        func.apply(unwrap(this), args);
        return wrap(cursorRequestMap.get(this));
      };
    }
    return function(...args) {
      return wrap(func.apply(unwrap(this), args));
    };
  }
  function transformCachableValue(value) {
    if (typeof value === "function")
      return wrapFunction(value);
    if (value instanceof IDBTransaction)
      cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
      return new Proxy(value, idbProxyTraps);
    return value;
  }
  function wrap(value) {
    if (value instanceof IDBRequest)
      return promisifyRequest(value);
    if (transformCache.has(value))
      return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }
    return newValue;
  }
  var unwrap = (value) => reverseTransformCache.get(value);

  // ../../node_modules/idb/build/index.js
  function openDB(name5, version6, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name5, version6);
    const openPromise = wrap(request);
    if (upgrade) {
      request.addEventListener("upgradeneeded", (event) => {
        upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
      });
    }
    if (blocked)
      request.addEventListener("blocked", () => blocked());
    openPromise.then((db) => {
      if (terminated)
        db.addEventListener("close", () => terminated());
      if (blocking)
        db.addEventListener("versionchange", () => blocking());
    }).catch(() => {
    });
    return openPromise;
  }
  var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
  var writeMethods = ["put", "add", "delete", "clear"];
  var cachedMethods = /* @__PURE__ */ new Map();
  function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
      return;
    }
    if (cachedMethods.get(prop))
      return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
      return;
    }
    const method = async function(storeName, ...args) {
      const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
      let target2 = tx.store;
      if (useIndex)
        target2 = target2.index(args.shift());
      return (await Promise.all([
        target2[targetFuncName](...args),
        isWrite && tx.done
      ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
  }));

  // ../../node_modules/@firebase/app/dist/esm/index.esm2017.js
  var PlatformLoggerServiceImpl = class {
    constructor(container) {
      this.container = container;
    }
    getPlatformInfoString() {
      const providers = this.container.getProviders();
      return providers.map((provider) => {
        if (isVersionServiceProvider(provider)) {
          const service = provider.getImmediate();
          return `${service.library}/${service.version}`;
        } else {
          return null;
        }
      }).filter((logString) => logString).join(" ");
    }
  };
  function isVersionServiceProvider(provider) {
    const component = provider.getComponent();
    return (component === null || component === void 0 ? void 0 : component.type) === "VERSION";
  }
  var name$o = "@firebase/app";
  var version$1 = "0.8.4";
  var logger = new Logger("@firebase/app");
  var name$n = "@firebase/app-compat";
  var name$m = "@firebase/analytics-compat";
  var name$l = "@firebase/analytics";
  var name$k = "@firebase/app-check-compat";
  var name$j = "@firebase/app-check";
  var name$i = "@firebase/auth";
  var name$h = "@firebase/auth-compat";
  var name$g = "@firebase/database";
  var name$f = "@firebase/database-compat";
  var name$e = "@firebase/functions";
  var name$d = "@firebase/functions-compat";
  var name$c = "@firebase/installations";
  var name$b = "@firebase/installations-compat";
  var name$a = "@firebase/messaging";
  var name$9 = "@firebase/messaging-compat";
  var name$8 = "@firebase/performance";
  var name$7 = "@firebase/performance-compat";
  var name$6 = "@firebase/remote-config";
  var name$5 = "@firebase/remote-config-compat";
  var name$4 = "@firebase/storage";
  var name$3 = "@firebase/storage-compat";
  var name$2 = "@firebase/firestore";
  var name$1 = "@firebase/firestore-compat";
  var name = "firebase";
  var version2 = "9.14.0";
  var DEFAULT_ENTRY_NAME2 = "[DEFAULT]";
  var PLATFORM_LOG_STRING = {
    [name$o]: "fire-core",
    [name$n]: "fire-core-compat",
    [name$l]: "fire-analytics",
    [name$m]: "fire-analytics-compat",
    [name$j]: "fire-app-check",
    [name$k]: "fire-app-check-compat",
    [name$i]: "fire-auth",
    [name$h]: "fire-auth-compat",
    [name$g]: "fire-rtdb",
    [name$f]: "fire-rtdb-compat",
    [name$e]: "fire-fn",
    [name$d]: "fire-fn-compat",
    [name$c]: "fire-iid",
    [name$b]: "fire-iid-compat",
    [name$a]: "fire-fcm",
    [name$9]: "fire-fcm-compat",
    [name$8]: "fire-perf",
    [name$7]: "fire-perf-compat",
    [name$6]: "fire-rc",
    [name$5]: "fire-rc-compat",
    [name$4]: "fire-gcs",
    [name$3]: "fire-gcs-compat",
    [name$2]: "fire-fst",
    [name$1]: "fire-fst-compat",
    "fire-js": "fire-js",
    [name]: "fire-js-all"
  };
  var _apps = /* @__PURE__ */ new Map();
  var _components = /* @__PURE__ */ new Map();
  function _addComponent(app2, component) {
    try {
      app2.container.addComponent(component);
    } catch (e) {
      logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app2.name}`, e);
    }
  }
  function _registerComponent(component) {
    const componentName = component.name;
    if (_components.has(componentName)) {
      logger.debug(`There were multiple attempts to register component ${componentName}.`);
      return false;
    }
    _components.set(componentName, component);
    for (const app2 of _apps.values()) {
      _addComponent(app2, component);
    }
    return true;
  }
  function _getProvider(app2, name5) {
    const heartbeatController = app2.container.getProvider("heartbeat").getImmediate({ optional: true });
    if (heartbeatController) {
      void heartbeatController.triggerHeartbeat();
    }
    return app2.container.getProvider(name5);
  }
  var ERRORS = {
    ["no-app"]: "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    ["bad-app-name"]: "Illegal App name: '{$appName}",
    ["duplicate-app"]: "Firebase App named '{$appName}' already exists with different options or config",
    ["app-deleted"]: "Firebase App named '{$appName}' already deleted",
    ["no-options"]: "Need to provide options, when not being deployed to hosting via source.",
    ["invalid-app-argument"]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    ["invalid-log-argument"]: "First argument to `onLog` must be null or a function.",
    ["idb-open"]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    ["idb-get"]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    ["idb-set"]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    ["idb-delete"]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."
  };
  var ERROR_FACTORY = new ErrorFactory("app", "Firebase", ERRORS);
  var FirebaseAppImpl = class {
    constructor(options, config, container) {
      this._isDeleted = false;
      this._options = Object.assign({}, options);
      this._config = Object.assign({}, config);
      this._name = config.name;
      this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
      this._container = container;
      this.container.addComponent(new Component("app", () => this, "PUBLIC"));
    }
    get automaticDataCollectionEnabled() {
      this.checkDestroyed();
      return this._automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(val) {
      this.checkDestroyed();
      this._automaticDataCollectionEnabled = val;
    }
    get name() {
      this.checkDestroyed();
      return this._name;
    }
    get options() {
      this.checkDestroyed();
      return this._options;
    }
    get config() {
      this.checkDestroyed();
      return this._config;
    }
    get container() {
      return this._container;
    }
    get isDeleted() {
      return this._isDeleted;
    }
    set isDeleted(val) {
      this._isDeleted = val;
    }
    checkDestroyed() {
      if (this.isDeleted) {
        throw ERROR_FACTORY.create("app-deleted", { appName: this._name });
      }
    }
  };
  var SDK_VERSION = version2;
  function initializeApp(_options, rawConfig = {}) {
    let options = _options;
    if (typeof rawConfig !== "object") {
      const name6 = rawConfig;
      rawConfig = { name: name6 };
    }
    const config = Object.assign({ name: DEFAULT_ENTRY_NAME2, automaticDataCollectionEnabled: false }, rawConfig);
    const name5 = config.name;
    if (typeof name5 !== "string" || !name5) {
      throw ERROR_FACTORY.create("bad-app-name", {
        appName: String(name5)
      });
    }
    options || (options = getDefaultAppConfig());
    if (!options) {
      throw ERROR_FACTORY.create("no-options");
    }
    const existingApp = _apps.get(name5);
    if (existingApp) {
      if (deepEqual(options, existingApp.options) && deepEqual(config, existingApp.config)) {
        return existingApp;
      } else {
        throw ERROR_FACTORY.create("duplicate-app", { appName: name5 });
      }
    }
    const container = new ComponentContainer(name5);
    for (const component of _components.values()) {
      container.addComponent(component);
    }
    const newApp = new FirebaseAppImpl(options, config, container);
    _apps.set(name5, newApp);
    return newApp;
  }
  function getApp(name5 = DEFAULT_ENTRY_NAME2) {
    const app2 = _apps.get(name5);
    if (!app2 && name5 === DEFAULT_ENTRY_NAME2) {
      return initializeApp();
    }
    if (!app2) {
      throw ERROR_FACTORY.create("no-app", { appName: name5 });
    }
    return app2;
  }
  function registerVersion(libraryKeyOrName, version6, variant) {
    var _a;
    let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
    if (variant) {
      library += `-${variant}`;
    }
    const libraryMismatch = library.match(/\s|\//);
    const versionMismatch = version6.match(/\s|\//);
    if (libraryMismatch || versionMismatch) {
      const warning = [
        `Unable to register library "${library}" with version "${version6}":`
      ];
      if (libraryMismatch) {
        warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
      }
      if (libraryMismatch && versionMismatch) {
        warning.push("and");
      }
      if (versionMismatch) {
        warning.push(`version name "${version6}" contains illegal characters (whitespace or "/")`);
      }
      logger.warn(warning.join(" "));
      return;
    }
    _registerComponent(new Component(`${library}-version`, () => ({ library, version: version6 }), "VERSION"));
  }
  var DB_NAME = "firebase-heartbeat-database";
  var DB_VERSION = 1;
  var STORE_NAME = "firebase-heartbeat-store";
  var dbPromise = null;
  function getDbPromise() {
    if (!dbPromise) {
      dbPromise = openDB(DB_NAME, DB_VERSION, {
        upgrade: (db, oldVersion) => {
          switch (oldVersion) {
            case 0:
              db.createObjectStore(STORE_NAME);
          }
        }
      }).catch((e) => {
        throw ERROR_FACTORY.create("idb-open", {
          originalErrorMessage: e.message
        });
      });
    }
    return dbPromise;
  }
  async function readHeartbeatsFromIndexedDB(app2) {
    var _a;
    try {
      const db = await getDbPromise();
      return db.transaction(STORE_NAME).objectStore(STORE_NAME).get(computeKey(app2));
    } catch (e) {
      if (e instanceof FirebaseError) {
        logger.warn(e.message);
      } else {
        const idbGetError = ERROR_FACTORY.create("idb-get", {
          originalErrorMessage: (_a = e) === null || _a === void 0 ? void 0 : _a.message
        });
        logger.warn(idbGetError.message);
      }
    }
  }
  async function writeHeartbeatsToIndexedDB(app2, heartbeatObject) {
    var _a;
    try {
      const db = await getDbPromise();
      const tx = db.transaction(STORE_NAME, "readwrite");
      const objectStore = tx.objectStore(STORE_NAME);
      await objectStore.put(heartbeatObject, computeKey(app2));
      return tx.done;
    } catch (e) {
      if (e instanceof FirebaseError) {
        logger.warn(e.message);
      } else {
        const idbGetError = ERROR_FACTORY.create("idb-set", {
          originalErrorMessage: (_a = e) === null || _a === void 0 ? void 0 : _a.message
        });
        logger.warn(idbGetError.message);
      }
    }
  }
  function computeKey(app2) {
    return `${app2.name}!${app2.options.appId}`;
  }
  var MAX_HEADER_BYTES = 1024;
  var STORED_HEARTBEAT_RETENTION_MAX_MILLIS = 30 * 24 * 60 * 60 * 1e3;
  var HeartbeatServiceImpl = class {
    constructor(container) {
      this.container = container;
      this._heartbeatsCache = null;
      const app2 = this.container.getProvider("app").getImmediate();
      this._storage = new HeartbeatStorageImpl(app2);
      this._heartbeatsCachePromise = this._storage.read().then((result) => {
        this._heartbeatsCache = result;
        return result;
      });
    }
    async triggerHeartbeat() {
      const platformLogger = this.container.getProvider("platform-logger").getImmediate();
      const agent = platformLogger.getPlatformInfoString();
      const date = getUTCDateString();
      if (this._heartbeatsCache === null) {
        this._heartbeatsCache = await this._heartbeatsCachePromise;
      }
      if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some((singleDateHeartbeat) => singleDateHeartbeat.date === date)) {
        return;
      } else {
        this._heartbeatsCache.heartbeats.push({ date, agent });
      }
      this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((singleDateHeartbeat) => {
        const hbTimestamp = new Date(singleDateHeartbeat.date).valueOf();
        const now = Date.now();
        return now - hbTimestamp <= STORED_HEARTBEAT_RETENTION_MAX_MILLIS;
      });
      return this._storage.overwrite(this._heartbeatsCache);
    }
    async getHeartbeatsHeader() {
      if (this._heartbeatsCache === null) {
        await this._heartbeatsCachePromise;
      }
      if (this._heartbeatsCache === null || this._heartbeatsCache.heartbeats.length === 0) {
        return "";
      }
      const date = getUTCDateString();
      const { heartbeatsToSend, unsentEntries } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
      const headerString = base64urlEncodeWithoutPadding(JSON.stringify({ version: 2, heartbeats: heartbeatsToSend }));
      this._heartbeatsCache.lastSentHeartbeatDate = date;
      if (unsentEntries.length > 0) {
        this._heartbeatsCache.heartbeats = unsentEntries;
        await this._storage.overwrite(this._heartbeatsCache);
      } else {
        this._heartbeatsCache.heartbeats = [];
        void this._storage.overwrite(this._heartbeatsCache);
      }
      return headerString;
    }
  };
  function getUTCDateString() {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }
  function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
    const heartbeatsToSend = [];
    let unsentEntries = heartbeatsCache.slice();
    for (const singleDateHeartbeat of heartbeatsCache) {
      const heartbeatEntry = heartbeatsToSend.find((hb) => hb.agent === singleDateHeartbeat.agent);
      if (!heartbeatEntry) {
        heartbeatsToSend.push({
          agent: singleDateHeartbeat.agent,
          dates: [singleDateHeartbeat.date]
        });
        if (countBytes(heartbeatsToSend) > maxSize) {
          heartbeatsToSend.pop();
          break;
        }
      } else {
        heartbeatEntry.dates.push(singleDateHeartbeat.date);
        if (countBytes(heartbeatsToSend) > maxSize) {
          heartbeatEntry.dates.pop();
          break;
        }
      }
      unsentEntries = unsentEntries.slice(1);
    }
    return {
      heartbeatsToSend,
      unsentEntries
    };
  }
  var HeartbeatStorageImpl = class {
    constructor(app2) {
      this.app = app2;
      this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
    }
    async runIndexedDBEnvironmentCheck() {
      if (!isIndexedDBAvailable()) {
        return false;
      } else {
        return validateIndexedDBOpenable().then(() => true).catch(() => false);
      }
    }
    async read() {
      const canUseIndexedDB = await this._canUseIndexedDBPromise;
      if (!canUseIndexedDB) {
        return { heartbeats: [] };
      } else {
        const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
        return idbHeartbeatObject || { heartbeats: [] };
      }
    }
    async overwrite(heartbeatsObject) {
      var _a;
      const canUseIndexedDB = await this._canUseIndexedDBPromise;
      if (!canUseIndexedDB) {
        return;
      } else {
        const existingHeartbeatsObject = await this.read();
        return writeHeartbeatsToIndexedDB(this.app, {
          lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
          heartbeats: heartbeatsObject.heartbeats
        });
      }
    }
    async add(heartbeatsObject) {
      var _a;
      const canUseIndexedDB = await this._canUseIndexedDBPromise;
      if (!canUseIndexedDB) {
        return;
      } else {
        const existingHeartbeatsObject = await this.read();
        return writeHeartbeatsToIndexedDB(this.app, {
          lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
          heartbeats: [
            ...existingHeartbeatsObject.heartbeats,
            ...heartbeatsObject.heartbeats
          ]
        });
      }
    }
  };
  function countBytes(heartbeatsCache) {
    return base64urlEncodeWithoutPadding(
      JSON.stringify({ version: 2, heartbeats: heartbeatsCache })
    ).length;
  }
  function registerCoreComponents(variant) {
    _registerComponent(new Component("platform-logger", (container) => new PlatformLoggerServiceImpl(container), "PRIVATE"));
    _registerComponent(new Component("heartbeat", (container) => new HeartbeatServiceImpl(container), "PRIVATE"));
    registerVersion(name$o, version$1, variant);
    registerVersion(name$o, version$1, "esm2017");
    registerVersion("fire-js", "");
  }
  registerCoreComponents("");

  // ../../node_modules/@firebase/database/dist/index.esm2017.js
  var name2 = "@firebase/database";
  var version3 = "0.13.10";
  var SDK_VERSION2 = "";
  function setSDKVersion(version6) {
    SDK_VERSION2 = version6;
  }
  var DOMStorageWrapper = class {
    constructor(domStorage_) {
      this.domStorage_ = domStorage_;
      this.prefix_ = "firebase:";
    }
    set(key, value) {
      if (value == null) {
        this.domStorage_.removeItem(this.prefixedName_(key));
      } else {
        this.domStorage_.setItem(this.prefixedName_(key), stringify2(value));
      }
    }
    get(key) {
      const storedVal = this.domStorage_.getItem(this.prefixedName_(key));
      if (storedVal == null) {
        return null;
      } else {
        return jsonEval(storedVal);
      }
    }
    remove(key) {
      this.domStorage_.removeItem(this.prefixedName_(key));
    }
    prefixedName_(name5) {
      return this.prefix_ + name5;
    }
    toString() {
      return this.domStorage_.toString();
    }
  };
  var MemoryStorage = class {
    constructor() {
      this.cache_ = {};
      this.isInMemoryStorage = true;
    }
    set(key, value) {
      if (value == null) {
        delete this.cache_[key];
      } else {
        this.cache_[key] = value;
      }
    }
    get(key) {
      if (contains(this.cache_, key)) {
        return this.cache_[key];
      }
      return null;
    }
    remove(key) {
      delete this.cache_[key];
    }
  };
  var createStoragefor = function(domStorageName) {
    try {
      if (typeof window !== "undefined" && typeof window[domStorageName] !== "undefined") {
        const domStorage = window[domStorageName];
        domStorage.setItem("firebase:sentinel", "cache");
        domStorage.removeItem("firebase:sentinel");
        return new DOMStorageWrapper(domStorage);
      }
    } catch (e) {
    }
    return new MemoryStorage();
  };
  var PersistentStorage = createStoragefor("localStorage");
  var SessionStorage = createStoragefor("sessionStorage");
  var logClient = new Logger("@firebase/database");
  var LUIDGenerator = function() {
    let id = 1;
    return function() {
      return id++;
    };
  }();
  var sha12 = function(str) {
    const utf8Bytes = stringToByteArray(str);
    const sha13 = new Sha1();
    sha13.update(utf8Bytes);
    const sha1Bytes = sha13.digest();
    return base64.encodeByteArray(sha1Bytes);
  };
  var buildLogMessage_ = function(...varArgs) {
    let message = "";
    for (let i2 = 0; i2 < varArgs.length; i2++) {
      const arg = varArgs[i2];
      if (Array.isArray(arg) || arg && typeof arg === "object" && typeof arg.length === "number") {
        message += buildLogMessage_.apply(null, arg);
      } else if (typeof arg === "object") {
        message += stringify2(arg);
      } else {
        message += arg;
      }
      message += " ";
    }
    return message;
  };
  var logger2 = null;
  var firstLog_ = true;
  var enableLogging$1 = function(logger_, persistent) {
    assert(!persistent || logger_ === true || logger_ === false, "Can't turn on custom loggers persistently.");
    if (logger_ === true) {
      logClient.logLevel = LogLevel.VERBOSE;
      logger2 = logClient.log.bind(logClient);
      if (persistent) {
        SessionStorage.set("logging_enabled", true);
      }
    } else if (typeof logger_ === "function") {
      logger2 = logger_;
    } else {
      logger2 = null;
      SessionStorage.remove("logging_enabled");
    }
  };
  var log = function(...varArgs) {
    if (firstLog_ === true) {
      firstLog_ = false;
      if (logger2 === null && SessionStorage.get("logging_enabled") === true) {
        enableLogging$1(true);
      }
    }
    if (logger2) {
      const message = buildLogMessage_.apply(null, varArgs);
      logger2(message);
    }
  };
  var logWrapper = function(prefix) {
    return function(...varArgs) {
      log(prefix, ...varArgs);
    };
  };
  var error = function(...varArgs) {
    const message = "FIREBASE INTERNAL ERROR: " + buildLogMessage_(...varArgs);
    logClient.error(message);
  };
  var fatal = function(...varArgs) {
    const message = `FIREBASE FATAL ERROR: ${buildLogMessage_(...varArgs)}`;
    logClient.error(message);
    throw new Error(message);
  };
  var warn = function(...varArgs) {
    const message = "FIREBASE WARNING: " + buildLogMessage_(...varArgs);
    logClient.warn(message);
  };
  var warnIfPageIsSecure = function() {
    if (typeof window !== "undefined" && window.location && window.location.protocol && window.location.protocol.indexOf("https:") !== -1) {
      warn("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
    }
  };
  var isInvalidJSONNumber = function(data) {
    return typeof data === "number" && (data !== data || data === Number.POSITIVE_INFINITY || data === Number.NEGATIVE_INFINITY);
  };
  var executeWhenDOMReady = function(fn2) {
    if (isNodeSdk() || document.readyState === "complete") {
      fn2();
    } else {
      let called = false;
      const wrappedFn = function() {
        if (!document.body) {
          setTimeout(wrappedFn, Math.floor(10));
          return;
        }
        if (!called) {
          called = true;
          fn2();
        }
      };
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", wrappedFn, false);
        window.addEventListener("load", wrappedFn, false);
      } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", () => {
          if (document.readyState === "complete") {
            wrappedFn();
          }
        });
        window.attachEvent("onload", wrappedFn);
      }
    }
  };
  var MIN_NAME = "[MIN_NAME]";
  var MAX_NAME = "[MAX_NAME]";
  var nameCompare = function(a2, b2) {
    if (a2 === b2) {
      return 0;
    } else if (a2 === MIN_NAME || b2 === MAX_NAME) {
      return -1;
    } else if (b2 === MIN_NAME || a2 === MAX_NAME) {
      return 1;
    } else {
      const aAsInt = tryParseInt(a2), bAsInt = tryParseInt(b2);
      if (aAsInt !== null) {
        if (bAsInt !== null) {
          return aAsInt - bAsInt === 0 ? a2.length - b2.length : aAsInt - bAsInt;
        } else {
          return -1;
        }
      } else if (bAsInt !== null) {
        return 1;
      } else {
        return a2 < b2 ? -1 : 1;
      }
    }
  };
  var stringCompare = function(a2, b2) {
    if (a2 === b2) {
      return 0;
    } else if (a2 < b2) {
      return -1;
    } else {
      return 1;
    }
  };
  var requireKey = function(key, obj) {
    if (obj && key in obj) {
      return obj[key];
    } else {
      throw new Error("Missing required key (" + key + ") in object: " + stringify2(obj));
    }
  };
  var ObjectToUniqueKey = function(obj) {
    if (typeof obj !== "object" || obj === null) {
      return stringify2(obj);
    }
    const keys = [];
    for (const k2 in obj) {
      keys.push(k2);
    }
    keys.sort();
    let key = "{";
    for (let i2 = 0; i2 < keys.length; i2++) {
      if (i2 !== 0) {
        key += ",";
      }
      key += stringify2(keys[i2]);
      key += ":";
      key += ObjectToUniqueKey(obj[keys[i2]]);
    }
    key += "}";
    return key;
  };
  var splitStringBySize = function(str, segsize) {
    const len = str.length;
    if (len <= segsize) {
      return [str];
    }
    const dataSegs = [];
    for (let c2 = 0; c2 < len; c2 += segsize) {
      if (c2 + segsize > len) {
        dataSegs.push(str.substring(c2, len));
      } else {
        dataSegs.push(str.substring(c2, c2 + segsize));
      }
    }
    return dataSegs;
  };
  function each(obj, fn2) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn2(key, obj[key]);
      }
    }
  }
  var doubleToIEEE754String = function(v2) {
    assert(!isInvalidJSONNumber(v2), "Invalid JSON number");
    const ebits = 11, fbits = 52;
    const bias = (1 << ebits - 1) - 1;
    let s2, e, f3, ln2, i2;
    if (v2 === 0) {
      e = 0;
      f3 = 0;
      s2 = 1 / v2 === -Infinity ? 1 : 0;
    } else {
      s2 = v2 < 0;
      v2 = Math.abs(v2);
      if (v2 >= Math.pow(2, 1 - bias)) {
        ln2 = Math.min(Math.floor(Math.log(v2) / Math.LN2), bias);
        e = ln2 + bias;
        f3 = Math.round(v2 * Math.pow(2, fbits - ln2) - Math.pow(2, fbits));
      } else {
        e = 0;
        f3 = Math.round(v2 / Math.pow(2, 1 - bias - fbits));
      }
    }
    const bits = [];
    for (i2 = fbits; i2; i2 -= 1) {
      bits.push(f3 % 2 ? 1 : 0);
      f3 = Math.floor(f3 / 2);
    }
    for (i2 = ebits; i2; i2 -= 1) {
      bits.push(e % 2 ? 1 : 0);
      e = Math.floor(e / 2);
    }
    bits.push(s2 ? 1 : 0);
    bits.reverse();
    const str = bits.join("");
    let hexByteString = "";
    for (i2 = 0; i2 < 64; i2 += 8) {
      let hexByte = parseInt(str.substr(i2, 8), 2).toString(16);
      if (hexByte.length === 1) {
        hexByte = "0" + hexByte;
      }
      hexByteString = hexByteString + hexByte;
    }
    return hexByteString.toLowerCase();
  };
  var isChromeExtensionContentScript = function() {
    return !!(typeof window === "object" && window["chrome"] && window["chrome"]["extension"] && !/^chrome/.test(window.location.href));
  };
  var isWindowsStoreApp = function() {
    return typeof Windows === "object" && typeof Windows.UI === "object";
  };
  function errorForServerCode(code, query2) {
    let reason = "Unknown Error";
    if (code === "too_big") {
      reason = "The data requested exceeds the maximum size that can be accessed with a single request.";
    } else if (code === "permission_denied") {
      reason = "Client doesn't have permission to access the desired data.";
    } else if (code === "unavailable") {
      reason = "The service is unavailable";
    }
    const error2 = new Error(code + " at " + query2._path.toString() + ": " + reason);
    error2.code = code.toUpperCase();
    return error2;
  }
  var INTEGER_REGEXP_ = new RegExp("^-?(0*)\\d{1,10}$");
  var INTEGER_32_MIN = -2147483648;
  var INTEGER_32_MAX = 2147483647;
  var tryParseInt = function(str) {
    if (INTEGER_REGEXP_.test(str)) {
      const intVal = Number(str);
      if (intVal >= INTEGER_32_MIN && intVal <= INTEGER_32_MAX) {
        return intVal;
      }
    }
    return null;
  };
  var exceptionGuard = function(fn2) {
    try {
      fn2();
    } catch (e) {
      setTimeout(() => {
        const stack = e.stack || "";
        warn("Exception was thrown by user callback.", stack);
        throw e;
      }, Math.floor(0));
    }
  };
  var beingCrawled = function() {
    const userAgent = typeof window === "object" && window["navigator"] && window["navigator"]["userAgent"] || "";
    return userAgent.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0;
  };
  var setTimeoutNonBlocking = function(fn2, time) {
    const timeout = setTimeout(fn2, time);
    if (typeof timeout === "number" && typeof Deno !== "undefined" && Deno["unrefTimer"]) {
      Deno.unrefTimer(timeout);
    } else if (typeof timeout === "object" && timeout["unref"]) {
      timeout["unref"]();
    }
    return timeout;
  };
  var AppCheckTokenProvider = class {
    constructor(appName_, appCheckProvider) {
      this.appName_ = appName_;
      this.appCheckProvider = appCheckProvider;
      this.appCheck = appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.getImmediate({ optional: true });
      if (!this.appCheck) {
        appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.get().then((appCheck) => this.appCheck = appCheck);
      }
    }
    getToken(forceRefresh) {
      if (!this.appCheck) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (this.appCheck) {
              this.getToken(forceRefresh).then(resolve, reject);
            } else {
              resolve(null);
            }
          }, 0);
        });
      }
      return this.appCheck.getToken(forceRefresh);
    }
    addTokenChangeListener(listener) {
      var _a;
      (_a = this.appCheckProvider) === null || _a === void 0 ? void 0 : _a.get().then((appCheck) => appCheck.addTokenListener(listener));
    }
    notifyForInvalidToken() {
      warn(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`);
    }
  };
  var FirebaseAuthTokenProvider = class {
    constructor(appName_, firebaseOptions_, authProvider_) {
      this.appName_ = appName_;
      this.firebaseOptions_ = firebaseOptions_;
      this.authProvider_ = authProvider_;
      this.auth_ = null;
      this.auth_ = authProvider_.getImmediate({ optional: true });
      if (!this.auth_) {
        authProvider_.onInit((auth) => this.auth_ = auth);
      }
    }
    getToken(forceRefresh) {
      if (!this.auth_) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (this.auth_) {
              this.getToken(forceRefresh).then(resolve, reject);
            } else {
              resolve(null);
            }
          }, 0);
        });
      }
      return this.auth_.getToken(forceRefresh).catch((error2) => {
        if (error2 && error2.code === "auth/token-not-initialized") {
          log("Got auth/token-not-initialized error.  Treating as null token.");
          return null;
        } else {
          return Promise.reject(error2);
        }
      });
    }
    addTokenChangeListener(listener) {
      if (this.auth_) {
        this.auth_.addAuthTokenListener(listener);
      } else {
        this.authProvider_.get().then((auth) => auth.addAuthTokenListener(listener));
      }
    }
    removeTokenChangeListener(listener) {
      this.authProvider_.get().then((auth) => auth.removeAuthTokenListener(listener));
    }
    notifyForInvalidToken() {
      let errorMessage = 'Provided authentication credentials for the app named "' + this.appName_ + '" are invalid. This usually indicates your app was not initialized correctly. ';
      if ("credential" in this.firebaseOptions_) {
        errorMessage += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.';
      } else if ("serviceAccount" in this.firebaseOptions_) {
        errorMessage += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.';
      } else {
        errorMessage += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.';
      }
      warn(errorMessage);
    }
  };
  var EmulatorTokenProvider = class {
    constructor(accessToken) {
      this.accessToken = accessToken;
    }
    getToken(forceRefresh) {
      return Promise.resolve({
        accessToken: this.accessToken
      });
    }
    addTokenChangeListener(listener) {
      listener(this.accessToken);
    }
    removeTokenChangeListener(listener) {
    }
    notifyForInvalidToken() {
    }
  };
  EmulatorTokenProvider.OWNER = "owner";
  var PROTOCOL_VERSION = "5";
  var VERSION_PARAM = "v";
  var TRANSPORT_SESSION_PARAM = "s";
  var REFERER_PARAM = "r";
  var FORGE_REF = "f";
  var FORGE_DOMAIN_RE = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;
  var LAST_SESSION_PARAM = "ls";
  var APPLICATION_ID_PARAM = "p";
  var APP_CHECK_TOKEN_PARAM = "ac";
  var WEBSOCKET = "websocket";
  var LONG_POLLING = "long_polling";
  var RepoInfo = class {
    constructor(host, secure, namespace, webSocketOnly, nodeAdmin = false, persistenceKey = "", includeNamespaceInQueryParams = false) {
      this.secure = secure;
      this.namespace = namespace;
      this.webSocketOnly = webSocketOnly;
      this.nodeAdmin = nodeAdmin;
      this.persistenceKey = persistenceKey;
      this.includeNamespaceInQueryParams = includeNamespaceInQueryParams;
      this._host = host.toLowerCase();
      this._domain = this._host.substr(this._host.indexOf(".") + 1);
      this.internalHost = PersistentStorage.get("host:" + host) || this._host;
    }
    isCacheableHost() {
      return this.internalHost.substr(0, 2) === "s-";
    }
    isCustomHost() {
      return this._domain !== "firebaseio.com" && this._domain !== "firebaseio-demo.com";
    }
    get host() {
      return this._host;
    }
    set host(newHost) {
      if (newHost !== this.internalHost) {
        this.internalHost = newHost;
        if (this.isCacheableHost()) {
          PersistentStorage.set("host:" + this._host, this.internalHost);
        }
      }
    }
    toString() {
      let str = this.toURLString();
      if (this.persistenceKey) {
        str += "<" + this.persistenceKey + ">";
      }
      return str;
    }
    toURLString() {
      const protocol = this.secure ? "https://" : "http://";
      const query2 = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : "";
      return `${protocol}${this.host}/${query2}`;
    }
  };
  function repoInfoNeedsQueryParam(repoInfo) {
    return repoInfo.host !== repoInfo.internalHost || repoInfo.isCustomHost() || repoInfo.includeNamespaceInQueryParams;
  }
  function repoInfoConnectionURL(repoInfo, type, params) {
    assert(typeof type === "string", "typeof type must == string");
    assert(typeof params === "object", "typeof params must == object");
    let connURL;
    if (type === WEBSOCKET) {
      connURL = (repoInfo.secure ? "wss://" : "ws://") + repoInfo.internalHost + "/.ws?";
    } else if (type === LONG_POLLING) {
      connURL = (repoInfo.secure ? "https://" : "http://") + repoInfo.internalHost + "/.lp?";
    } else {
      throw new Error("Unknown connection type: " + type);
    }
    if (repoInfoNeedsQueryParam(repoInfo)) {
      params["ns"] = repoInfo.namespace;
    }
    const pairs = [];
    each(params, (key, value) => {
      pairs.push(key + "=" + value);
    });
    return connURL + pairs.join("&");
  }
  var StatsCollection = class {
    constructor() {
      this.counters_ = {};
    }
    incrementCounter(name5, amount = 1) {
      if (!contains(this.counters_, name5)) {
        this.counters_[name5] = 0;
      }
      this.counters_[name5] += amount;
    }
    get() {
      return deepCopy(this.counters_);
    }
  };
  var collections = {};
  var reporters = {};
  function statsManagerGetCollection(repoInfo) {
    const hashString = repoInfo.toString();
    if (!collections[hashString]) {
      collections[hashString] = new StatsCollection();
    }
    return collections[hashString];
  }
  function statsManagerGetOrCreateReporter(repoInfo, creatorFunction) {
    const hashString = repoInfo.toString();
    if (!reporters[hashString]) {
      reporters[hashString] = creatorFunction();
    }
    return reporters[hashString];
  }
  var PacketReceiver = class {
    constructor(onMessage_) {
      this.onMessage_ = onMessage_;
      this.pendingResponses = [];
      this.currentResponseNum = 0;
      this.closeAfterResponse = -1;
      this.onClose = null;
    }
    closeAfter(responseNum, callback) {
      this.closeAfterResponse = responseNum;
      this.onClose = callback;
      if (this.closeAfterResponse < this.currentResponseNum) {
        this.onClose();
        this.onClose = null;
      }
    }
    handleResponse(requestNum, data) {
      this.pendingResponses[requestNum] = data;
      while (this.pendingResponses[this.currentResponseNum]) {
        const toProcess = this.pendingResponses[this.currentResponseNum];
        delete this.pendingResponses[this.currentResponseNum];
        for (let i2 = 0; i2 < toProcess.length; ++i2) {
          if (toProcess[i2]) {
            exceptionGuard(() => {
              this.onMessage_(toProcess[i2]);
            });
          }
        }
        if (this.currentResponseNum === this.closeAfterResponse) {
          if (this.onClose) {
            this.onClose();
            this.onClose = null;
          }
          break;
        }
        this.currentResponseNum++;
      }
    }
  };
  var FIREBASE_LONGPOLL_START_PARAM = "start";
  var FIREBASE_LONGPOLL_CLOSE_COMMAND = "close";
  var FIREBASE_LONGPOLL_COMMAND_CB_NAME = "pLPCommand";
  var FIREBASE_LONGPOLL_DATA_CB_NAME = "pRTLPCB";
  var FIREBASE_LONGPOLL_ID_PARAM = "id";
  var FIREBASE_LONGPOLL_PW_PARAM = "pw";
  var FIREBASE_LONGPOLL_SERIAL_PARAM = "ser";
  var FIREBASE_LONGPOLL_CALLBACK_ID_PARAM = "cb";
  var FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM = "seg";
  var FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET = "ts";
  var FIREBASE_LONGPOLL_DATA_PARAM = "d";
  var FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM = "dframe";
  var MAX_URL_DATA_SIZE = 1870;
  var SEG_HEADER_SIZE = 30;
  var MAX_PAYLOAD_SIZE = MAX_URL_DATA_SIZE - SEG_HEADER_SIZE;
  var KEEPALIVE_REQUEST_INTERVAL = 25e3;
  var LP_CONNECT_TIMEOUT = 3e4;
  var BrowserPollConnection = class {
    constructor(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
      this.connId = connId;
      this.repoInfo = repoInfo;
      this.applicationId = applicationId;
      this.appCheckToken = appCheckToken;
      this.authToken = authToken;
      this.transportSessionId = transportSessionId;
      this.lastSessionId = lastSessionId;
      this.bytesSent = 0;
      this.bytesReceived = 0;
      this.everConnected_ = false;
      this.log_ = logWrapper(connId);
      this.stats_ = statsManagerGetCollection(repoInfo);
      this.urlFn = (params) => {
        if (this.appCheckToken) {
          params[APP_CHECK_TOKEN_PARAM] = this.appCheckToken;
        }
        return repoInfoConnectionURL(repoInfo, LONG_POLLING, params);
      };
    }
    open(onMessage, onDisconnect) {
      this.curSegmentNum = 0;
      this.onDisconnect_ = onDisconnect;
      this.myPacketOrderer = new PacketReceiver(onMessage);
      this.isClosed_ = false;
      this.connectTimeoutTimer_ = setTimeout(() => {
        this.log_("Timed out trying to connect.");
        this.onClosed_();
        this.connectTimeoutTimer_ = null;
      }, Math.floor(LP_CONNECT_TIMEOUT));
      executeWhenDOMReady(() => {
        if (this.isClosed_) {
          return;
        }
        this.scriptTagHolder = new FirebaseIFrameScriptHolder((...args) => {
          const [command, arg1, arg2, arg3, arg4] = args;
          this.incrementIncomingBytes_(args);
          if (!this.scriptTagHolder) {
            return;
          }
          if (this.connectTimeoutTimer_) {
            clearTimeout(this.connectTimeoutTimer_);
            this.connectTimeoutTimer_ = null;
          }
          this.everConnected_ = true;
          if (command === FIREBASE_LONGPOLL_START_PARAM) {
            this.id = arg1;
            this.password = arg2;
          } else if (command === FIREBASE_LONGPOLL_CLOSE_COMMAND) {
            if (arg1) {
              this.scriptTagHolder.sendNewPolls = false;
              this.myPacketOrderer.closeAfter(arg1, () => {
                this.onClosed_();
              });
            } else {
              this.onClosed_();
            }
          } else {
            throw new Error("Unrecognized command received: " + command);
          }
        }, (...args) => {
          const [pN, data] = args;
          this.incrementIncomingBytes_(args);
          this.myPacketOrderer.handleResponse(pN, data);
        }, () => {
          this.onClosed_();
        }, this.urlFn);
        const urlParams = {};
        urlParams[FIREBASE_LONGPOLL_START_PARAM] = "t";
        urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = Math.floor(Math.random() * 1e8);
        if (this.scriptTagHolder.uniqueCallbackIdentifier) {
          urlParams[FIREBASE_LONGPOLL_CALLBACK_ID_PARAM] = this.scriptTagHolder.uniqueCallbackIdentifier;
        }
        urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
        if (this.transportSessionId) {
          urlParams[TRANSPORT_SESSION_PARAM] = this.transportSessionId;
        }
        if (this.lastSessionId) {
          urlParams[LAST_SESSION_PARAM] = this.lastSessionId;
        }
        if (this.applicationId) {
          urlParams[APPLICATION_ID_PARAM] = this.applicationId;
        }
        if (this.appCheckToken) {
          urlParams[APP_CHECK_TOKEN_PARAM] = this.appCheckToken;
        }
        if (typeof location !== "undefined" && location.hostname && FORGE_DOMAIN_RE.test(location.hostname)) {
          urlParams[REFERER_PARAM] = FORGE_REF;
        }
        const connectURL = this.urlFn(urlParams);
        this.log_("Connecting via long-poll to " + connectURL);
        this.scriptTagHolder.addTag(connectURL, () => {
        });
      });
    }
    start() {
      this.scriptTagHolder.startLongPoll(this.id, this.password);
      this.addDisconnectPingFrame(this.id, this.password);
    }
    static forceAllow() {
      BrowserPollConnection.forceAllow_ = true;
    }
    static forceDisallow() {
      BrowserPollConnection.forceDisallow_ = true;
    }
    static isAvailable() {
      if (isNodeSdk()) {
        return false;
      } else if (BrowserPollConnection.forceAllow_) {
        return true;
      } else {
        return !BrowserPollConnection.forceDisallow_ && typeof document !== "undefined" && document.createElement != null && !isChromeExtensionContentScript() && !isWindowsStoreApp();
      }
    }
    markConnectionHealthy() {
    }
    shutdown_() {
      this.isClosed_ = true;
      if (this.scriptTagHolder) {
        this.scriptTagHolder.close();
        this.scriptTagHolder = null;
      }
      if (this.myDisconnFrame) {
        document.body.removeChild(this.myDisconnFrame);
        this.myDisconnFrame = null;
      }
      if (this.connectTimeoutTimer_) {
        clearTimeout(this.connectTimeoutTimer_);
        this.connectTimeoutTimer_ = null;
      }
    }
    onClosed_() {
      if (!this.isClosed_) {
        this.log_("Longpoll is closing itself");
        this.shutdown_();
        if (this.onDisconnect_) {
          this.onDisconnect_(this.everConnected_);
          this.onDisconnect_ = null;
        }
      }
    }
    close() {
      if (!this.isClosed_) {
        this.log_("Longpoll is being closed.");
        this.shutdown_();
      }
    }
    send(data) {
      const dataStr = stringify2(data);
      this.bytesSent += dataStr.length;
      this.stats_.incrementCounter("bytes_sent", dataStr.length);
      const base64data = base64Encode(dataStr);
      const dataSegs = splitStringBySize(base64data, MAX_PAYLOAD_SIZE);
      for (let i2 = 0; i2 < dataSegs.length; i2++) {
        this.scriptTagHolder.enqueueSegment(this.curSegmentNum, dataSegs.length, dataSegs[i2]);
        this.curSegmentNum++;
      }
    }
    addDisconnectPingFrame(id, pw) {
      if (isNodeSdk()) {
        return;
      }
      this.myDisconnFrame = document.createElement("iframe");
      const urlParams = {};
      urlParams[FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM] = "t";
      urlParams[FIREBASE_LONGPOLL_ID_PARAM] = id;
      urlParams[FIREBASE_LONGPOLL_PW_PARAM] = pw;
      this.myDisconnFrame.src = this.urlFn(urlParams);
      this.myDisconnFrame.style.display = "none";
      document.body.appendChild(this.myDisconnFrame);
    }
    incrementIncomingBytes_(args) {
      const bytesReceived = stringify2(args).length;
      this.bytesReceived += bytesReceived;
      this.stats_.incrementCounter("bytes_received", bytesReceived);
    }
  };
  var FirebaseIFrameScriptHolder = class {
    constructor(commandCB, onMessageCB, onDisconnect, urlFn) {
      this.onDisconnect = onDisconnect;
      this.urlFn = urlFn;
      this.outstandingRequests = /* @__PURE__ */ new Set();
      this.pendingSegs = [];
      this.currentSerial = Math.floor(Math.random() * 1e8);
      this.sendNewPolls = true;
      if (!isNodeSdk()) {
        this.uniqueCallbackIdentifier = LUIDGenerator();
        window[FIREBASE_LONGPOLL_COMMAND_CB_NAME + this.uniqueCallbackIdentifier] = commandCB;
        window[FIREBASE_LONGPOLL_DATA_CB_NAME + this.uniqueCallbackIdentifier] = onMessageCB;
        this.myIFrame = FirebaseIFrameScriptHolder.createIFrame_();
        let script = "";
        if (this.myIFrame.src && this.myIFrame.src.substr(0, "javascript:".length) === "javascript:") {
          const currentDomain = document.domain;
          script = '<script>document.domain="' + currentDomain + '";<\/script>';
        }
        const iframeContents = "<html><body>" + script + "</body></html>";
        try {
          this.myIFrame.doc.open();
          this.myIFrame.doc.write(iframeContents);
          this.myIFrame.doc.close();
        } catch (e) {
          log("frame writing exception");
          if (e.stack) {
            log(e.stack);
          }
          log(e);
        }
      } else {
        this.commandCB = commandCB;
        this.onMessageCB = onMessageCB;
      }
    }
    static createIFrame_() {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      if (document.body) {
        document.body.appendChild(iframe);
        try {
          const a2 = iframe.contentWindow.document;
          if (!a2) {
            log("No IE domain setting required");
          }
        } catch (e) {
          const domain = document.domain;
          iframe.src = "javascript:void((function(){document.open();document.domain='" + domain + "';document.close();})())";
        }
      } else {
        throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
      }
      if (iframe.contentDocument) {
        iframe.doc = iframe.contentDocument;
      } else if (iframe.contentWindow) {
        iframe.doc = iframe.contentWindow.document;
      } else if (iframe.document) {
        iframe.doc = iframe.document;
      }
      return iframe;
    }
    close() {
      this.alive = false;
      if (this.myIFrame) {
        this.myIFrame.doc.body.innerHTML = "";
        setTimeout(() => {
          if (this.myIFrame !== null) {
            document.body.removeChild(this.myIFrame);
            this.myIFrame = null;
          }
        }, Math.floor(0));
      }
      const onDisconnect = this.onDisconnect;
      if (onDisconnect) {
        this.onDisconnect = null;
        onDisconnect();
      }
    }
    startLongPoll(id, pw) {
      this.myID = id;
      this.myPW = pw;
      this.alive = true;
      while (this.newRequest_()) {
      }
    }
    newRequest_() {
      if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
        this.currentSerial++;
        const urlParams = {};
        urlParams[FIREBASE_LONGPOLL_ID_PARAM] = this.myID;
        urlParams[FIREBASE_LONGPOLL_PW_PARAM] = this.myPW;
        urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = this.currentSerial;
        let theURL = this.urlFn(urlParams);
        let curDataString = "";
        let i2 = 0;
        while (this.pendingSegs.length > 0) {
          const nextSeg = this.pendingSegs[0];
          if (nextSeg.d.length + SEG_HEADER_SIZE + curDataString.length <= MAX_URL_DATA_SIZE) {
            const theSeg = this.pendingSegs.shift();
            curDataString = curDataString + "&" + FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM + i2 + "=" + theSeg.seg + "&" + FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET + i2 + "=" + theSeg.ts + "&" + FIREBASE_LONGPOLL_DATA_PARAM + i2 + "=" + theSeg.d;
            i2++;
          } else {
            break;
          }
        }
        theURL = theURL + curDataString;
        this.addLongPollTag_(theURL, this.currentSerial);
        return true;
      } else {
        return false;
      }
    }
    enqueueSegment(segnum, totalsegs, data) {
      this.pendingSegs.push({ seg: segnum, ts: totalsegs, d: data });
      if (this.alive) {
        this.newRequest_();
      }
    }
    addLongPollTag_(url, serial) {
      this.outstandingRequests.add(serial);
      const doNewRequest = () => {
        this.outstandingRequests.delete(serial);
        this.newRequest_();
      };
      const keepaliveTimeout = setTimeout(doNewRequest, Math.floor(KEEPALIVE_REQUEST_INTERVAL));
      const readyStateCB = () => {
        clearTimeout(keepaliveTimeout);
        doNewRequest();
      };
      this.addTag(url, readyStateCB);
    }
    addTag(url, loadCB) {
      if (isNodeSdk()) {
        this.doNodeLongPoll(url, loadCB);
      } else {
        setTimeout(() => {
          try {
            if (!this.sendNewPolls) {
              return;
            }
            const newScript = this.myIFrame.doc.createElement("script");
            newScript.type = "text/javascript";
            newScript.async = true;
            newScript.src = url;
            newScript.onload = newScript.onreadystatechange = function() {
              const rstate = newScript.readyState;
              if (!rstate || rstate === "loaded" || rstate === "complete") {
                newScript.onload = newScript.onreadystatechange = null;
                if (newScript.parentNode) {
                  newScript.parentNode.removeChild(newScript);
                }
                loadCB();
              }
            };
            newScript.onerror = () => {
              log("Long-poll script failed to load: " + url);
              this.sendNewPolls = false;
              this.close();
            };
            this.myIFrame.doc.body.appendChild(newScript);
          } catch (e) {
          }
        }, Math.floor(1));
      }
    }
  };
  var WEBSOCKET_MAX_FRAME_SIZE = 16384;
  var WEBSOCKET_KEEPALIVE_INTERVAL = 45e3;
  var WebSocketImpl = null;
  if (typeof MozWebSocket !== "undefined") {
    WebSocketImpl = MozWebSocket;
  } else if (typeof WebSocket !== "undefined") {
    WebSocketImpl = WebSocket;
  }
  var WebSocketConnection = class {
    constructor(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
      this.connId = connId;
      this.applicationId = applicationId;
      this.appCheckToken = appCheckToken;
      this.authToken = authToken;
      this.keepaliveTimer = null;
      this.frames = null;
      this.totalFrames = 0;
      this.bytesSent = 0;
      this.bytesReceived = 0;
      this.log_ = logWrapper(this.connId);
      this.stats_ = statsManagerGetCollection(repoInfo);
      this.connURL = WebSocketConnection.connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken, applicationId);
      this.nodeAdmin = repoInfo.nodeAdmin;
    }
    static connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken, applicationId) {
      const urlParams = {};
      urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
      if (!isNodeSdk() && typeof location !== "undefined" && location.hostname && FORGE_DOMAIN_RE.test(location.hostname)) {
        urlParams[REFERER_PARAM] = FORGE_REF;
      }
      if (transportSessionId) {
        urlParams[TRANSPORT_SESSION_PARAM] = transportSessionId;
      }
      if (lastSessionId) {
        urlParams[LAST_SESSION_PARAM] = lastSessionId;
      }
      if (appCheckToken) {
        urlParams[APP_CHECK_TOKEN_PARAM] = appCheckToken;
      }
      if (applicationId) {
        urlParams[APPLICATION_ID_PARAM] = applicationId;
      }
      return repoInfoConnectionURL(repoInfo, WEBSOCKET, urlParams);
    }
    open(onMessage, onDisconnect) {
      this.onDisconnect = onDisconnect;
      this.onMessage = onMessage;
      this.log_("Websocket connecting to " + this.connURL);
      this.everConnected_ = false;
      PersistentStorage.set("previous_websocket_failure", true);
      try {
        let options;
        if (isNodeSdk()) {
          const device = this.nodeAdmin ? "AdminNode" : "Node";
          options = {
            headers: {
              "User-Agent": `Firebase/${PROTOCOL_VERSION}/${SDK_VERSION2}/${process.platform}/${device}`,
              "X-Firebase-GMPID": this.applicationId || ""
            }
          };
          if (this.authToken) {
            options.headers["Authorization"] = `Bearer ${this.authToken}`;
          }
          if (this.appCheckToken) {
            options.headers["X-Firebase-AppCheck"] = this.appCheckToken;
          }
          const env = process["env"];
          const proxy = this.connURL.indexOf("wss://") === 0 ? env["HTTPS_PROXY"] || env["https_proxy"] : env["HTTP_PROXY"] || env["http_proxy"];
          if (proxy) {
            options["proxy"] = { origin: proxy };
          }
        }
        this.mySock = new WebSocketImpl(this.connURL, [], options);
      } catch (e) {
        this.log_("Error instantiating WebSocket.");
        const error2 = e.message || e.data;
        if (error2) {
          this.log_(error2);
        }
        this.onClosed_();
        return;
      }
      this.mySock.onopen = () => {
        this.log_("Websocket connected.");
        this.everConnected_ = true;
      };
      this.mySock.onclose = () => {
        this.log_("Websocket connection was disconnected.");
        this.mySock = null;
        this.onClosed_();
      };
      this.mySock.onmessage = (m2) => {
        this.handleIncomingFrame(m2);
      };
      this.mySock.onerror = (e) => {
        this.log_("WebSocket error.  Closing connection.");
        const error2 = e.message || e.data;
        if (error2) {
          this.log_(error2);
        }
        this.onClosed_();
      };
    }
    start() {
    }
    static forceDisallow() {
      WebSocketConnection.forceDisallow_ = true;
    }
    static isAvailable() {
      let isOldAndroid = false;
      if (typeof navigator !== "undefined" && navigator.userAgent) {
        const oldAndroidRegex = /Android ([0-9]{0,}\.[0-9]{0,})/;
        const oldAndroidMatch = navigator.userAgent.match(oldAndroidRegex);
        if (oldAndroidMatch && oldAndroidMatch.length > 1) {
          if (parseFloat(oldAndroidMatch[1]) < 4.4) {
            isOldAndroid = true;
          }
        }
      }
      return !isOldAndroid && WebSocketImpl !== null && !WebSocketConnection.forceDisallow_;
    }
    static previouslyFailed() {
      return PersistentStorage.isInMemoryStorage || PersistentStorage.get("previous_websocket_failure") === true;
    }
    markConnectionHealthy() {
      PersistentStorage.remove("previous_websocket_failure");
    }
    appendFrame_(data) {
      this.frames.push(data);
      if (this.frames.length === this.totalFrames) {
        const fullMess = this.frames.join("");
        this.frames = null;
        const jsonMess = jsonEval(fullMess);
        this.onMessage(jsonMess);
      }
    }
    handleNewFrameCount_(frameCount) {
      this.totalFrames = frameCount;
      this.frames = [];
    }
    extractFrameCount_(data) {
      assert(this.frames === null, "We already have a frame buffer");
      if (data.length <= 6) {
        const frameCount = Number(data);
        if (!isNaN(frameCount)) {
          this.handleNewFrameCount_(frameCount);
          return null;
        }
      }
      this.handleNewFrameCount_(1);
      return data;
    }
    handleIncomingFrame(mess) {
      if (this.mySock === null) {
        return;
      }
      const data = mess["data"];
      this.bytesReceived += data.length;
      this.stats_.incrementCounter("bytes_received", data.length);
      this.resetKeepAlive();
      if (this.frames !== null) {
        this.appendFrame_(data);
      } else {
        const remainingData = this.extractFrameCount_(data);
        if (remainingData !== null) {
          this.appendFrame_(remainingData);
        }
      }
    }
    send(data) {
      this.resetKeepAlive();
      const dataStr = stringify2(data);
      this.bytesSent += dataStr.length;
      this.stats_.incrementCounter("bytes_sent", dataStr.length);
      const dataSegs = splitStringBySize(dataStr, WEBSOCKET_MAX_FRAME_SIZE);
      if (dataSegs.length > 1) {
        this.sendString_(String(dataSegs.length));
      }
      for (let i2 = 0; i2 < dataSegs.length; i2++) {
        this.sendString_(dataSegs[i2]);
      }
    }
    shutdown_() {
      this.isClosed_ = true;
      if (this.keepaliveTimer) {
        clearInterval(this.keepaliveTimer);
        this.keepaliveTimer = null;
      }
      if (this.mySock) {
        this.mySock.close();
        this.mySock = null;
      }
    }
    onClosed_() {
      if (!this.isClosed_) {
        this.log_("WebSocket is closing itself");
        this.shutdown_();
        if (this.onDisconnect) {
          this.onDisconnect(this.everConnected_);
          this.onDisconnect = null;
        }
      }
    }
    close() {
      if (!this.isClosed_) {
        this.log_("WebSocket is being closed");
        this.shutdown_();
      }
    }
    resetKeepAlive() {
      clearInterval(this.keepaliveTimer);
      this.keepaliveTimer = setInterval(() => {
        if (this.mySock) {
          this.sendString_("0");
        }
        this.resetKeepAlive();
      }, Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL));
    }
    sendString_(str) {
      try {
        this.mySock.send(str);
      } catch (e) {
        this.log_("Exception thrown from WebSocket.send():", e.message || e.data, "Closing connection.");
        setTimeout(this.onClosed_.bind(this), 0);
      }
    }
  };
  WebSocketConnection.responsesRequiredToBeHealthy = 2;
  WebSocketConnection.healthyTimeout = 3e4;
  var TransportManager = class {
    constructor(repoInfo) {
      this.initTransports_(repoInfo);
    }
    static get ALL_TRANSPORTS() {
      return [BrowserPollConnection, WebSocketConnection];
    }
    static get IS_TRANSPORT_INITIALIZED() {
      return this.globalTransportInitialized_;
    }
    initTransports_(repoInfo) {
      const isWebSocketsAvailable = WebSocketConnection && WebSocketConnection["isAvailable"]();
      let isSkipPollConnection = isWebSocketsAvailable && !WebSocketConnection.previouslyFailed();
      if (repoInfo.webSocketOnly) {
        if (!isWebSocketsAvailable) {
          warn("wss:// URL used, but browser isn't known to support websockets.  Trying anyway.");
        }
        isSkipPollConnection = true;
      }
      if (isSkipPollConnection) {
        this.transports_ = [WebSocketConnection];
      } else {
        const transports = this.transports_ = [];
        for (const transport of TransportManager.ALL_TRANSPORTS) {
          if (transport && transport["isAvailable"]()) {
            transports.push(transport);
          }
        }
        TransportManager.globalTransportInitialized_ = true;
      }
    }
    initialTransport() {
      if (this.transports_.length > 0) {
        return this.transports_[0];
      } else {
        throw new Error("No transports available");
      }
    }
    upgradeTransport() {
      if (this.transports_.length > 1) {
        return this.transports_[1];
      } else {
        return null;
      }
    }
  };
  TransportManager.globalTransportInitialized_ = false;
  var UPGRADE_TIMEOUT = 6e4;
  var DELAY_BEFORE_SENDING_EXTRA_REQUESTS = 5e3;
  var BYTES_SENT_HEALTHY_OVERRIDE = 10 * 1024;
  var BYTES_RECEIVED_HEALTHY_OVERRIDE = 100 * 1024;
  var MESSAGE_TYPE = "t";
  var MESSAGE_DATA = "d";
  var CONTROL_SHUTDOWN = "s";
  var CONTROL_RESET = "r";
  var CONTROL_ERROR = "e";
  var CONTROL_PONG = "o";
  var SWITCH_ACK = "a";
  var END_TRANSMISSION = "n";
  var PING = "p";
  var SERVER_HELLO = "h";
  var Connection = class {
    constructor(id, repoInfo_, applicationId_, appCheckToken_, authToken_, onMessage_, onReady_, onDisconnect_, onKill_, lastSessionId) {
      this.id = id;
      this.repoInfo_ = repoInfo_;
      this.applicationId_ = applicationId_;
      this.appCheckToken_ = appCheckToken_;
      this.authToken_ = authToken_;
      this.onMessage_ = onMessage_;
      this.onReady_ = onReady_;
      this.onDisconnect_ = onDisconnect_;
      this.onKill_ = onKill_;
      this.lastSessionId = lastSessionId;
      this.connectionCount = 0;
      this.pendingDataMessages = [];
      this.state_ = 0;
      this.log_ = logWrapper("c:" + this.id + ":");
      this.transportManager_ = new TransportManager(repoInfo_);
      this.log_("Connection created");
      this.start_();
    }
    start_() {
      const conn = this.transportManager_.initialTransport();
      this.conn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId);
      this.primaryResponsesRequired_ = conn["responsesRequiredToBeHealthy"] || 0;
      const onMessageReceived = this.connReceiver_(this.conn_);
      const onConnectionLost = this.disconnReceiver_(this.conn_);
      this.tx_ = this.conn_;
      this.rx_ = this.conn_;
      this.secondaryConn_ = null;
      this.isHealthy_ = false;
      setTimeout(() => {
        this.conn_ && this.conn_.open(onMessageReceived, onConnectionLost);
      }, Math.floor(0));
      const healthyTimeoutMS = conn["healthyTimeout"] || 0;
      if (healthyTimeoutMS > 0) {
        this.healthyTimeout_ = setTimeoutNonBlocking(() => {
          this.healthyTimeout_ = null;
          if (!this.isHealthy_) {
            if (this.conn_ && this.conn_.bytesReceived > BYTES_RECEIVED_HEALTHY_OVERRIDE) {
              this.log_("Connection exceeded healthy timeout but has received " + this.conn_.bytesReceived + " bytes.  Marking connection healthy.");
              this.isHealthy_ = true;
              this.conn_.markConnectionHealthy();
            } else if (this.conn_ && this.conn_.bytesSent > BYTES_SENT_HEALTHY_OVERRIDE) {
              this.log_("Connection exceeded healthy timeout but has sent " + this.conn_.bytesSent + " bytes.  Leaving connection alive.");
            } else {
              this.log_("Closing unhealthy connection after timeout.");
              this.close();
            }
          }
        }, Math.floor(healthyTimeoutMS));
      }
    }
    nextTransportId_() {
      return "c:" + this.id + ":" + this.connectionCount++;
    }
    disconnReceiver_(conn) {
      return (everConnected) => {
        if (conn === this.conn_) {
          this.onConnectionLost_(everConnected);
        } else if (conn === this.secondaryConn_) {
          this.log_("Secondary connection lost.");
          this.onSecondaryConnectionLost_();
        } else {
          this.log_("closing an old connection");
        }
      };
    }
    connReceiver_(conn) {
      return (message) => {
        if (this.state_ !== 2) {
          if (conn === this.rx_) {
            this.onPrimaryMessageReceived_(message);
          } else if (conn === this.secondaryConn_) {
            this.onSecondaryMessageReceived_(message);
          } else {
            this.log_("message on old connection");
          }
        }
      };
    }
    sendRequest(dataMsg) {
      const msg = { t: "d", d: dataMsg };
      this.sendData_(msg);
    }
    tryCleanupConnection() {
      if (this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_) {
        this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId);
        this.conn_ = this.secondaryConn_;
        this.secondaryConn_ = null;
      }
    }
    onSecondaryControl_(controlData) {
      if (MESSAGE_TYPE in controlData) {
        const cmd = controlData[MESSAGE_TYPE];
        if (cmd === SWITCH_ACK) {
          this.upgradeIfSecondaryHealthy_();
        } else if (cmd === CONTROL_RESET) {
          this.log_("Got a reset on secondary, closing it");
          this.secondaryConn_.close();
          if (this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) {
            this.close();
          }
        } else if (cmd === CONTROL_PONG) {
          this.log_("got pong on secondary.");
          this.secondaryResponsesRequired_--;
          this.upgradeIfSecondaryHealthy_();
        }
      }
    }
    onSecondaryMessageReceived_(parsedData) {
      const layer = requireKey("t", parsedData);
      const data = requireKey("d", parsedData);
      if (layer === "c") {
        this.onSecondaryControl_(data);
      } else if (layer === "d") {
        this.pendingDataMessages.push(data);
      } else {
        throw new Error("Unknown protocol layer: " + layer);
      }
    }
    upgradeIfSecondaryHealthy_() {
      if (this.secondaryResponsesRequired_ <= 0) {
        this.log_("Secondary connection is healthy.");
        this.isHealthy_ = true;
        this.secondaryConn_.markConnectionHealthy();
        this.proceedWithUpgrade_();
      } else {
        this.log_("sending ping on secondary.");
        this.secondaryConn_.send({ t: "c", d: { t: PING, d: {} } });
      }
    }
    proceedWithUpgrade_() {
      this.secondaryConn_.start();
      this.log_("sending client ack on secondary");
      this.secondaryConn_.send({ t: "c", d: { t: SWITCH_ACK, d: {} } });
      this.log_("Ending transmission on primary");
      this.conn_.send({ t: "c", d: { t: END_TRANSMISSION, d: {} } });
      this.tx_ = this.secondaryConn_;
      this.tryCleanupConnection();
    }
    onPrimaryMessageReceived_(parsedData) {
      const layer = requireKey("t", parsedData);
      const data = requireKey("d", parsedData);
      if (layer === "c") {
        this.onControl_(data);
      } else if (layer === "d") {
        this.onDataMessage_(data);
      }
    }
    onDataMessage_(message) {
      this.onPrimaryResponse_();
      this.onMessage_(message);
    }
    onPrimaryResponse_() {
      if (!this.isHealthy_) {
        this.primaryResponsesRequired_--;
        if (this.primaryResponsesRequired_ <= 0) {
          this.log_("Primary connection is healthy.");
          this.isHealthy_ = true;
          this.conn_.markConnectionHealthy();
        }
      }
    }
    onControl_(controlData) {
      const cmd = requireKey(MESSAGE_TYPE, controlData);
      if (MESSAGE_DATA in controlData) {
        const payload = controlData[MESSAGE_DATA];
        if (cmd === SERVER_HELLO) {
          this.onHandshake_(payload);
        } else if (cmd === END_TRANSMISSION) {
          this.log_("recvd end transmission on primary");
          this.rx_ = this.secondaryConn_;
          for (let i2 = 0; i2 < this.pendingDataMessages.length; ++i2) {
            this.onDataMessage_(this.pendingDataMessages[i2]);
          }
          this.pendingDataMessages = [];
          this.tryCleanupConnection();
        } else if (cmd === CONTROL_SHUTDOWN) {
          this.onConnectionShutdown_(payload);
        } else if (cmd === CONTROL_RESET) {
          this.onReset_(payload);
        } else if (cmd === CONTROL_ERROR) {
          error("Server Error: " + payload);
        } else if (cmd === CONTROL_PONG) {
          this.log_("got pong on primary.");
          this.onPrimaryResponse_();
          this.sendPingOnPrimaryIfNecessary_();
        } else {
          error("Unknown control packet command: " + cmd);
        }
      }
    }
    onHandshake_(handshake) {
      const timestamp = handshake.ts;
      const version6 = handshake.v;
      const host = handshake.h;
      this.sessionId = handshake.s;
      this.repoInfo_.host = host;
      if (this.state_ === 0) {
        this.conn_.start();
        this.onConnectionEstablished_(this.conn_, timestamp);
        if (PROTOCOL_VERSION !== version6) {
          warn("Protocol version mismatch detected");
        }
        this.tryStartUpgrade_();
      }
    }
    tryStartUpgrade_() {
      const conn = this.transportManager_.upgradeTransport();
      if (conn) {
        this.startUpgrade_(conn);
      }
    }
    startUpgrade_(conn) {
      this.secondaryConn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId);
      this.secondaryResponsesRequired_ = conn["responsesRequiredToBeHealthy"] || 0;
      const onMessage = this.connReceiver_(this.secondaryConn_);
      const onDisconnect = this.disconnReceiver_(this.secondaryConn_);
      this.secondaryConn_.open(onMessage, onDisconnect);
      setTimeoutNonBlocking(() => {
        if (this.secondaryConn_) {
          this.log_("Timed out trying to upgrade.");
          this.secondaryConn_.close();
        }
      }, Math.floor(UPGRADE_TIMEOUT));
    }
    onReset_(host) {
      this.log_("Reset packet received.  New host: " + host);
      this.repoInfo_.host = host;
      if (this.state_ === 1) {
        this.close();
      } else {
        this.closeConnections_();
        this.start_();
      }
    }
    onConnectionEstablished_(conn, timestamp) {
      this.log_("Realtime connection established.");
      this.conn_ = conn;
      this.state_ = 1;
      if (this.onReady_) {
        this.onReady_(timestamp, this.sessionId);
        this.onReady_ = null;
      }
      if (this.primaryResponsesRequired_ === 0) {
        this.log_("Primary connection is healthy.");
        this.isHealthy_ = true;
      } else {
        setTimeoutNonBlocking(() => {
          this.sendPingOnPrimaryIfNecessary_();
        }, Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS));
      }
    }
    sendPingOnPrimaryIfNecessary_() {
      if (!this.isHealthy_ && this.state_ === 1) {
        this.log_("sending ping on primary.");
        this.sendData_({ t: "c", d: { t: PING, d: {} } });
      }
    }
    onSecondaryConnectionLost_() {
      const conn = this.secondaryConn_;
      this.secondaryConn_ = null;
      if (this.tx_ === conn || this.rx_ === conn) {
        this.close();
      }
    }
    onConnectionLost_(everConnected) {
      this.conn_ = null;
      if (!everConnected && this.state_ === 0) {
        this.log_("Realtime connection failed.");
        if (this.repoInfo_.isCacheableHost()) {
          PersistentStorage.remove("host:" + this.repoInfo_.host);
          this.repoInfo_.internalHost = this.repoInfo_.host;
        }
      } else if (this.state_ === 1) {
        this.log_("Realtime connection lost.");
      }
      this.close();
    }
    onConnectionShutdown_(reason) {
      this.log_("Connection shutdown command received. Shutting down...");
      if (this.onKill_) {
        this.onKill_(reason);
        this.onKill_ = null;
      }
      this.onDisconnect_ = null;
      this.close();
    }
    sendData_(data) {
      if (this.state_ !== 1) {
        throw "Connection is not connected";
      } else {
        this.tx_.send(data);
      }
    }
    close() {
      if (this.state_ !== 2) {
        this.log_("Closing realtime connection.");
        this.state_ = 2;
        this.closeConnections_();
        if (this.onDisconnect_) {
          this.onDisconnect_();
          this.onDisconnect_ = null;
        }
      }
    }
    closeConnections_() {
      this.log_("Shutting down all connections");
      if (this.conn_) {
        this.conn_.close();
        this.conn_ = null;
      }
      if (this.secondaryConn_) {
        this.secondaryConn_.close();
        this.secondaryConn_ = null;
      }
      if (this.healthyTimeout_) {
        clearTimeout(this.healthyTimeout_);
        this.healthyTimeout_ = null;
      }
    }
  };
  var ServerActions = class {
    put(pathString, data, onComplete, hash) {
    }
    merge(pathString, data, onComplete, hash) {
    }
    refreshAuthToken(token) {
    }
    refreshAppCheckToken(token) {
    }
    onDisconnectPut(pathString, data, onComplete) {
    }
    onDisconnectMerge(pathString, data, onComplete) {
    }
    onDisconnectCancel(pathString, onComplete) {
    }
    reportStats(stats) {
    }
  };
  var EventEmitter = class {
    constructor(allowedEvents_) {
      this.allowedEvents_ = allowedEvents_;
      this.listeners_ = {};
      assert(Array.isArray(allowedEvents_) && allowedEvents_.length > 0, "Requires a non-empty array");
    }
    trigger(eventType, ...varArgs) {
      if (Array.isArray(this.listeners_[eventType])) {
        const listeners = [...this.listeners_[eventType]];
        for (let i2 = 0; i2 < listeners.length; i2++) {
          listeners[i2].callback.apply(listeners[i2].context, varArgs);
        }
      }
    }
    on(eventType, callback, context) {
      this.validateEventType_(eventType);
      this.listeners_[eventType] = this.listeners_[eventType] || [];
      this.listeners_[eventType].push({ callback, context });
      const eventData = this.getInitialEvent(eventType);
      if (eventData) {
        callback.apply(context, eventData);
      }
    }
    off(eventType, callback, context) {
      this.validateEventType_(eventType);
      const listeners = this.listeners_[eventType] || [];
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listeners[i2].callback === callback && (!context || context === listeners[i2].context)) {
          listeners.splice(i2, 1);
          return;
        }
      }
    }
    validateEventType_(eventType) {
      assert(this.allowedEvents_.find((et) => {
        return et === eventType;
      }), "Unknown event: " + eventType);
    }
  };
  var OnlineMonitor = class extends EventEmitter {
    constructor() {
      super(["online"]);
      this.online_ = true;
      if (typeof window !== "undefined" && typeof window.addEventListener !== "undefined" && !isMobileCordova()) {
        window.addEventListener("online", () => {
          if (!this.online_) {
            this.online_ = true;
            this.trigger("online", true);
          }
        }, false);
        window.addEventListener("offline", () => {
          if (this.online_) {
            this.online_ = false;
            this.trigger("online", false);
          }
        }, false);
      }
    }
    static getInstance() {
      return new OnlineMonitor();
    }
    getInitialEvent(eventType) {
      assert(eventType === "online", "Unknown event type: " + eventType);
      return [this.online_];
    }
    currentlyOnline() {
      return this.online_;
    }
  };
  var MAX_PATH_DEPTH = 32;
  var MAX_PATH_LENGTH_BYTES = 768;
  var Path = class {
    constructor(pathOrString, pieceNum) {
      if (pieceNum === void 0) {
        this.pieces_ = pathOrString.split("/");
        let copyTo = 0;
        for (let i2 = 0; i2 < this.pieces_.length; i2++) {
          if (this.pieces_[i2].length > 0) {
            this.pieces_[copyTo] = this.pieces_[i2];
            copyTo++;
          }
        }
        this.pieces_.length = copyTo;
        this.pieceNum_ = 0;
      } else {
        this.pieces_ = pathOrString;
        this.pieceNum_ = pieceNum;
      }
    }
    toString() {
      let pathString = "";
      for (let i2 = this.pieceNum_; i2 < this.pieces_.length; i2++) {
        if (this.pieces_[i2] !== "") {
          pathString += "/" + this.pieces_[i2];
        }
      }
      return pathString || "/";
    }
  };
  function newEmptyPath() {
    return new Path("");
  }
  function pathGetFront(path) {
    if (path.pieceNum_ >= path.pieces_.length) {
      return null;
    }
    return path.pieces_[path.pieceNum_];
  }
  function pathGetLength(path) {
    return path.pieces_.length - path.pieceNum_;
  }
  function pathPopFront(path) {
    let pieceNum = path.pieceNum_;
    if (pieceNum < path.pieces_.length) {
      pieceNum++;
    }
    return new Path(path.pieces_, pieceNum);
  }
  function pathGetBack(path) {
    if (path.pieceNum_ < path.pieces_.length) {
      return path.pieces_[path.pieces_.length - 1];
    }
    return null;
  }
  function pathToUrlEncodedString(path) {
    let pathString = "";
    for (let i2 = path.pieceNum_; i2 < path.pieces_.length; i2++) {
      if (path.pieces_[i2] !== "") {
        pathString += "/" + encodeURIComponent(String(path.pieces_[i2]));
      }
    }
    return pathString || "/";
  }
  function pathSlice(path, begin = 0) {
    return path.pieces_.slice(path.pieceNum_ + begin);
  }
  function pathParent(path) {
    if (path.pieceNum_ >= path.pieces_.length) {
      return null;
    }
    const pieces = [];
    for (let i2 = path.pieceNum_; i2 < path.pieces_.length - 1; i2++) {
      pieces.push(path.pieces_[i2]);
    }
    return new Path(pieces, 0);
  }
  function pathChild(path, childPathObj) {
    const pieces = [];
    for (let i2 = path.pieceNum_; i2 < path.pieces_.length; i2++) {
      pieces.push(path.pieces_[i2]);
    }
    if (childPathObj instanceof Path) {
      for (let i2 = childPathObj.pieceNum_; i2 < childPathObj.pieces_.length; i2++) {
        pieces.push(childPathObj.pieces_[i2]);
      }
    } else {
      const childPieces = childPathObj.split("/");
      for (let i2 = 0; i2 < childPieces.length; i2++) {
        if (childPieces[i2].length > 0) {
          pieces.push(childPieces[i2]);
        }
      }
    }
    return new Path(pieces, 0);
  }
  function pathIsEmpty(path) {
    return path.pieceNum_ >= path.pieces_.length;
  }
  function newRelativePath(outerPath, innerPath) {
    const outer = pathGetFront(outerPath), inner = pathGetFront(innerPath);
    if (outer === null) {
      return innerPath;
    } else if (outer === inner) {
      return newRelativePath(pathPopFront(outerPath), pathPopFront(innerPath));
    } else {
      throw new Error("INTERNAL ERROR: innerPath (" + innerPath + ") is not within outerPath (" + outerPath + ")");
    }
  }
  function pathCompare(left, right) {
    const leftKeys = pathSlice(left, 0);
    const rightKeys = pathSlice(right, 0);
    for (let i2 = 0; i2 < leftKeys.length && i2 < rightKeys.length; i2++) {
      const cmp = nameCompare(leftKeys[i2], rightKeys[i2]);
      if (cmp !== 0) {
        return cmp;
      }
    }
    if (leftKeys.length === rightKeys.length) {
      return 0;
    }
    return leftKeys.length < rightKeys.length ? -1 : 1;
  }
  function pathEquals(path, other) {
    if (pathGetLength(path) !== pathGetLength(other)) {
      return false;
    }
    for (let i2 = path.pieceNum_, j2 = other.pieceNum_; i2 <= path.pieces_.length; i2++, j2++) {
      if (path.pieces_[i2] !== other.pieces_[j2]) {
        return false;
      }
    }
    return true;
  }
  function pathContains(path, other) {
    let i2 = path.pieceNum_;
    let j2 = other.pieceNum_;
    if (pathGetLength(path) > pathGetLength(other)) {
      return false;
    }
    while (i2 < path.pieces_.length) {
      if (path.pieces_[i2] !== other.pieces_[j2]) {
        return false;
      }
      ++i2;
      ++j2;
    }
    return true;
  }
  var ValidationPath = class {
    constructor(path, errorPrefix_) {
      this.errorPrefix_ = errorPrefix_;
      this.parts_ = pathSlice(path, 0);
      this.byteLength_ = Math.max(1, this.parts_.length);
      for (let i2 = 0; i2 < this.parts_.length; i2++) {
        this.byteLength_ += stringLength(this.parts_[i2]);
      }
      validationPathCheckValid(this);
    }
  };
  function validationPathPush(validationPath, child2) {
    if (validationPath.parts_.length > 0) {
      validationPath.byteLength_ += 1;
    }
    validationPath.parts_.push(child2);
    validationPath.byteLength_ += stringLength(child2);
    validationPathCheckValid(validationPath);
  }
  function validationPathPop(validationPath) {
    const last = validationPath.parts_.pop();
    validationPath.byteLength_ -= stringLength(last);
    if (validationPath.parts_.length > 0) {
      validationPath.byteLength_ -= 1;
    }
  }
  function validationPathCheckValid(validationPath) {
    if (validationPath.byteLength_ > MAX_PATH_LENGTH_BYTES) {
      throw new Error(validationPath.errorPrefix_ + "has a key path longer than " + MAX_PATH_LENGTH_BYTES + " bytes (" + validationPath.byteLength_ + ").");
    }
    if (validationPath.parts_.length > MAX_PATH_DEPTH) {
      throw new Error(validationPath.errorPrefix_ + "path specified exceeds the maximum depth that can be written (" + MAX_PATH_DEPTH + ") or object contains a cycle " + validationPathToErrorString(validationPath));
    }
  }
  function validationPathToErrorString(validationPath) {
    if (validationPath.parts_.length === 0) {
      return "";
    }
    return "in property '" + validationPath.parts_.join(".") + "'";
  }
  var VisibilityMonitor = class extends EventEmitter {
    constructor() {
      super(["visible"]);
      let hidden;
      let visibilityChange;
      if (typeof document !== "undefined" && typeof document.addEventListener !== "undefined") {
        if (typeof document["hidden"] !== "undefined") {
          visibilityChange = "visibilitychange";
          hidden = "hidden";
        } else if (typeof document["mozHidden"] !== "undefined") {
          visibilityChange = "mozvisibilitychange";
          hidden = "mozHidden";
        } else if (typeof document["msHidden"] !== "undefined") {
          visibilityChange = "msvisibilitychange";
          hidden = "msHidden";
        } else if (typeof document["webkitHidden"] !== "undefined") {
          visibilityChange = "webkitvisibilitychange";
          hidden = "webkitHidden";
        }
      }
      this.visible_ = true;
      if (visibilityChange) {
        document.addEventListener(visibilityChange, () => {
          const visible = !document[hidden];
          if (visible !== this.visible_) {
            this.visible_ = visible;
            this.trigger("visible", visible);
          }
        }, false);
      }
    }
    static getInstance() {
      return new VisibilityMonitor();
    }
    getInitialEvent(eventType) {
      assert(eventType === "visible", "Unknown event type: " + eventType);
      return [this.visible_];
    }
  };
  var RECONNECT_MIN_DELAY = 1e3;
  var RECONNECT_MAX_DELAY_DEFAULT = 60 * 5 * 1e3;
  var RECONNECT_MAX_DELAY_FOR_ADMINS = 30 * 1e3;
  var RECONNECT_DELAY_MULTIPLIER = 1.3;
  var RECONNECT_DELAY_RESET_TIMEOUT = 3e4;
  var SERVER_KILL_INTERRUPT_REASON = "server_kill";
  var INVALID_TOKEN_THRESHOLD = 3;
  var PersistentConnection = class extends ServerActions {
    constructor(repoInfo_, applicationId_, onDataUpdate_, onConnectStatus_, onServerInfoUpdate_, authTokenProvider_, appCheckTokenProvider_, authOverride_) {
      super();
      this.repoInfo_ = repoInfo_;
      this.applicationId_ = applicationId_;
      this.onDataUpdate_ = onDataUpdate_;
      this.onConnectStatus_ = onConnectStatus_;
      this.onServerInfoUpdate_ = onServerInfoUpdate_;
      this.authTokenProvider_ = authTokenProvider_;
      this.appCheckTokenProvider_ = appCheckTokenProvider_;
      this.authOverride_ = authOverride_;
      this.id = PersistentConnection.nextPersistentConnectionId_++;
      this.log_ = logWrapper("p:" + this.id + ":");
      this.interruptReasons_ = {};
      this.listens = /* @__PURE__ */ new Map();
      this.outstandingPuts_ = [];
      this.outstandingGets_ = [];
      this.outstandingPutCount_ = 0;
      this.outstandingGetCount_ = 0;
      this.onDisconnectRequestQueue_ = [];
      this.connected_ = false;
      this.reconnectDelay_ = RECONNECT_MIN_DELAY;
      this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_DEFAULT;
      this.securityDebugCallback_ = null;
      this.lastSessionId = null;
      this.establishConnectionTimer_ = null;
      this.visible_ = false;
      this.requestCBHash_ = {};
      this.requestNumber_ = 0;
      this.realtime_ = null;
      this.authToken_ = null;
      this.appCheckToken_ = null;
      this.forceTokenRefresh_ = false;
      this.invalidAuthTokenCount_ = 0;
      this.invalidAppCheckTokenCount_ = 0;
      this.firstConnection_ = true;
      this.lastConnectionAttemptTime_ = null;
      this.lastConnectionEstablishedTime_ = null;
      if (authOverride_ && !isNodeSdk()) {
        throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
      }
      VisibilityMonitor.getInstance().on("visible", this.onVisible_, this);
      if (repoInfo_.host.indexOf("fblocal") === -1) {
        OnlineMonitor.getInstance().on("online", this.onOnline_, this);
      }
    }
    sendRequest(action, body, onResponse) {
      const curReqNum = ++this.requestNumber_;
      const msg = { r: curReqNum, a: action, b: body };
      this.log_(stringify2(msg));
      assert(this.connected_, "sendRequest call when we're not connected not allowed.");
      this.realtime_.sendRequest(msg);
      if (onResponse) {
        this.requestCBHash_[curReqNum] = onResponse;
      }
    }
    get(query2) {
      this.initConnection_();
      const deferred = new Deferred();
      const request = {
        p: query2._path.toString(),
        q: query2._queryObject
      };
      const outstandingGet = {
        action: "g",
        request,
        onComplete: (message) => {
          const payload = message["d"];
          if (message["s"] === "ok") {
            deferred.resolve(payload);
          } else {
            deferred.reject(payload);
          }
        }
      };
      this.outstandingGets_.push(outstandingGet);
      this.outstandingGetCount_++;
      const index = this.outstandingGets_.length - 1;
      if (this.connected_) {
        this.sendGet_(index);
      }
      return deferred.promise;
    }
    listen(query2, currentHashFn, tag, onComplete) {
      this.initConnection_();
      const queryId = query2._queryIdentifier;
      const pathString = query2._path.toString();
      this.log_("Listen called for " + pathString + " " + queryId);
      if (!this.listens.has(pathString)) {
        this.listens.set(pathString, /* @__PURE__ */ new Map());
      }
      assert(query2._queryParams.isDefault() || !query2._queryParams.loadsAllData(), "listen() called for non-default but complete query");
      assert(!this.listens.get(pathString).has(queryId), `listen() called twice for same path/queryId.`);
      const listenSpec = {
        onComplete,
        hashFn: currentHashFn,
        query: query2,
        tag
      };
      this.listens.get(pathString).set(queryId, listenSpec);
      if (this.connected_) {
        this.sendListen_(listenSpec);
      }
    }
    sendGet_(index) {
      const get2 = this.outstandingGets_[index];
      this.sendRequest("g", get2.request, (message) => {
        delete this.outstandingGets_[index];
        this.outstandingGetCount_--;
        if (this.outstandingGetCount_ === 0) {
          this.outstandingGets_ = [];
        }
        if (get2.onComplete) {
          get2.onComplete(message);
        }
      });
    }
    sendListen_(listenSpec) {
      const query2 = listenSpec.query;
      const pathString = query2._path.toString();
      const queryId = query2._queryIdentifier;
      this.log_("Listen on " + pathString + " for " + queryId);
      const req = { p: pathString };
      const action = "q";
      if (listenSpec.tag) {
        req["q"] = query2._queryObject;
        req["t"] = listenSpec.tag;
      }
      req["h"] = listenSpec.hashFn();
      this.sendRequest(action, req, (message) => {
        const payload = message["d"];
        const status = message["s"];
        PersistentConnection.warnOnListenWarnings_(payload, query2);
        const currentListenSpec = this.listens.get(pathString) && this.listens.get(pathString).get(queryId);
        if (currentListenSpec === listenSpec) {
          this.log_("listen response", message);
          if (status !== "ok") {
            this.removeListen_(pathString, queryId);
          }
          if (listenSpec.onComplete) {
            listenSpec.onComplete(status, payload);
          }
        }
      });
    }
    static warnOnListenWarnings_(payload, query2) {
      if (payload && typeof payload === "object" && contains(payload, "w")) {
        const warnings = safeGet(payload, "w");
        if (Array.isArray(warnings) && ~warnings.indexOf("no_index")) {
          const indexSpec = '".indexOn": "' + query2._queryParams.getIndex().toString() + '"';
          const indexPath = query2._path.toString();
          warn(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${indexSpec} at ${indexPath} to your security rules for better performance.`);
        }
      }
    }
    refreshAuthToken(token) {
      this.authToken_ = token;
      this.log_("Auth token refreshed");
      if (this.authToken_) {
        this.tryAuth();
      } else {
        if (this.connected_) {
          this.sendRequest("unauth", {}, () => {
          });
        }
      }
      this.reduceReconnectDelayIfAdminCredential_(token);
    }
    reduceReconnectDelayIfAdminCredential_(credential) {
      const isFirebaseSecret = credential && credential.length === 40;
      if (isFirebaseSecret || isAdmin(credential)) {
        this.log_("Admin auth credential detected.  Reducing max reconnect time.");
        this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
      }
    }
    refreshAppCheckToken(token) {
      this.appCheckToken_ = token;
      this.log_("App check token refreshed");
      if (this.appCheckToken_) {
        this.tryAppCheck();
      } else {
        if (this.connected_) {
          this.sendRequest("unappeck", {}, () => {
          });
        }
      }
    }
    tryAuth() {
      if (this.connected_ && this.authToken_) {
        const token = this.authToken_;
        const authMethod = isValidFormat(token) ? "auth" : "gauth";
        const requestData = { cred: token };
        if (this.authOverride_ === null) {
          requestData["noauth"] = true;
        } else if (typeof this.authOverride_ === "object") {
          requestData["authvar"] = this.authOverride_;
        }
        this.sendRequest(authMethod, requestData, (res) => {
          const status = res["s"];
          const data = res["d"] || "error";
          if (this.authToken_ === token) {
            if (status === "ok") {
              this.invalidAuthTokenCount_ = 0;
            } else {
              this.onAuthRevoked_(status, data);
            }
          }
        });
      }
    }
    tryAppCheck() {
      if (this.connected_ && this.appCheckToken_) {
        this.sendRequest("appcheck", { "token": this.appCheckToken_ }, (res) => {
          const status = res["s"];
          const data = res["d"] || "error";
          if (status === "ok") {
            this.invalidAppCheckTokenCount_ = 0;
          } else {
            this.onAppCheckRevoked_(status, data);
          }
        });
      }
    }
    unlisten(query2, tag) {
      const pathString = query2._path.toString();
      const queryId = query2._queryIdentifier;
      this.log_("Unlisten called for " + pathString + " " + queryId);
      assert(query2._queryParams.isDefault() || !query2._queryParams.loadsAllData(), "unlisten() called for non-default but complete query");
      const listen = this.removeListen_(pathString, queryId);
      if (listen && this.connected_) {
        this.sendUnlisten_(pathString, queryId, query2._queryObject, tag);
      }
    }
    sendUnlisten_(pathString, queryId, queryObj, tag) {
      this.log_("Unlisten on " + pathString + " for " + queryId);
      const req = { p: pathString };
      const action = "n";
      if (tag) {
        req["q"] = queryObj;
        req["t"] = tag;
      }
      this.sendRequest(action, req);
    }
    onDisconnectPut(pathString, data, onComplete) {
      this.initConnection_();
      if (this.connected_) {
        this.sendOnDisconnect_("o", pathString, data, onComplete);
      } else {
        this.onDisconnectRequestQueue_.push({
          pathString,
          action: "o",
          data,
          onComplete
        });
      }
    }
    onDisconnectMerge(pathString, data, onComplete) {
      this.initConnection_();
      if (this.connected_) {
        this.sendOnDisconnect_("om", pathString, data, onComplete);
      } else {
        this.onDisconnectRequestQueue_.push({
          pathString,
          action: "om",
          data,
          onComplete
        });
      }
    }
    onDisconnectCancel(pathString, onComplete) {
      this.initConnection_();
      if (this.connected_) {
        this.sendOnDisconnect_("oc", pathString, null, onComplete);
      } else {
        this.onDisconnectRequestQueue_.push({
          pathString,
          action: "oc",
          data: null,
          onComplete
        });
      }
    }
    sendOnDisconnect_(action, pathString, data, onComplete) {
      const request = { p: pathString, d: data };
      this.log_("onDisconnect " + action, request);
      this.sendRequest(action, request, (response) => {
        if (onComplete) {
          setTimeout(() => {
            onComplete(response["s"], response["d"]);
          }, Math.floor(0));
        }
      });
    }
    put(pathString, data, onComplete, hash) {
      this.putInternal("p", pathString, data, onComplete, hash);
    }
    merge(pathString, data, onComplete, hash) {
      this.putInternal("m", pathString, data, onComplete, hash);
    }
    putInternal(action, pathString, data, onComplete, hash) {
      this.initConnection_();
      const request = {
        p: pathString,
        d: data
      };
      if (hash !== void 0) {
        request["h"] = hash;
      }
      this.outstandingPuts_.push({
        action,
        request,
        onComplete
      });
      this.outstandingPutCount_++;
      const index = this.outstandingPuts_.length - 1;
      if (this.connected_) {
        this.sendPut_(index);
      } else {
        this.log_("Buffering put: " + pathString);
      }
    }
    sendPut_(index) {
      const action = this.outstandingPuts_[index].action;
      const request = this.outstandingPuts_[index].request;
      const onComplete = this.outstandingPuts_[index].onComplete;
      this.outstandingPuts_[index].queued = this.connected_;
      this.sendRequest(action, request, (message) => {
        this.log_(action + " response", message);
        delete this.outstandingPuts_[index];
        this.outstandingPutCount_--;
        if (this.outstandingPutCount_ === 0) {
          this.outstandingPuts_ = [];
        }
        if (onComplete) {
          onComplete(message["s"], message["d"]);
        }
      });
    }
    reportStats(stats) {
      if (this.connected_) {
        const request = { c: stats };
        this.log_("reportStats", request);
        this.sendRequest("s", request, (result) => {
          const status = result["s"];
          if (status !== "ok") {
            const errorReason = result["d"];
            this.log_("reportStats", "Error sending stats: " + errorReason);
          }
        });
      }
    }
    onDataMessage_(message) {
      if ("r" in message) {
        this.log_("from server: " + stringify2(message));
        const reqNum = message["r"];
        const onResponse = this.requestCBHash_[reqNum];
        if (onResponse) {
          delete this.requestCBHash_[reqNum];
          onResponse(message["b"]);
        }
      } else if ("error" in message) {
        throw "A server-side error has occurred: " + message["error"];
      } else if ("a" in message) {
        this.onDataPush_(message["a"], message["b"]);
      }
    }
    onDataPush_(action, body) {
      this.log_("handleServerMessage", action, body);
      if (action === "d") {
        this.onDataUpdate_(
          body["p"],
          body["d"],
          false,
          body["t"]
        );
      } else if (action === "m") {
        this.onDataUpdate_(
          body["p"],
          body["d"],
          true,
          body["t"]
        );
      } else if (action === "c") {
        this.onListenRevoked_(body["p"], body["q"]);
      } else if (action === "ac") {
        this.onAuthRevoked_(body["s"], body["d"]);
      } else if (action === "apc") {
        this.onAppCheckRevoked_(body["s"], body["d"]);
      } else if (action === "sd") {
        this.onSecurityDebugPacket_(body);
      } else {
        error("Unrecognized action received from server: " + stringify2(action) + "\nAre you using the latest client?");
      }
    }
    onReady_(timestamp, sessionId) {
      this.log_("connection ready");
      this.connected_ = true;
      this.lastConnectionEstablishedTime_ = new Date().getTime();
      this.handleTimestamp_(timestamp);
      this.lastSessionId = sessionId;
      if (this.firstConnection_) {
        this.sendConnectStats_();
      }
      this.restoreState_();
      this.firstConnection_ = false;
      this.onConnectStatus_(true);
    }
    scheduleConnect_(timeout) {
      assert(!this.realtime_, "Scheduling a connect when we're already connected/ing?");
      if (this.establishConnectionTimer_) {
        clearTimeout(this.establishConnectionTimer_);
      }
      this.establishConnectionTimer_ = setTimeout(() => {
        this.establishConnectionTimer_ = null;
        this.establishConnection_();
      }, Math.floor(timeout));
    }
    initConnection_() {
      if (!this.realtime_ && this.firstConnection_) {
        this.scheduleConnect_(0);
      }
    }
    onVisible_(visible) {
      if (visible && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_) {
        this.log_("Window became visible.  Reducing delay.");
        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        if (!this.realtime_) {
          this.scheduleConnect_(0);
        }
      }
      this.visible_ = visible;
    }
    onOnline_(online) {
      if (online) {
        this.log_("Browser went online.");
        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        if (!this.realtime_) {
          this.scheduleConnect_(0);
        }
      } else {
        this.log_("Browser went offline.  Killing connection.");
        if (this.realtime_) {
          this.realtime_.close();
        }
      }
    }
    onRealtimeDisconnect_() {
      this.log_("data client disconnected");
      this.connected_ = false;
      this.realtime_ = null;
      this.cancelSentTransactions_();
      this.requestCBHash_ = {};
      if (this.shouldReconnect_()) {
        if (!this.visible_) {
          this.log_("Window isn't visible.  Delaying reconnect.");
          this.reconnectDelay_ = this.maxReconnectDelay_;
          this.lastConnectionAttemptTime_ = new Date().getTime();
        } else if (this.lastConnectionEstablishedTime_) {
          const timeSinceLastConnectSucceeded = new Date().getTime() - this.lastConnectionEstablishedTime_;
          if (timeSinceLastConnectSucceeded > RECONNECT_DELAY_RESET_TIMEOUT) {
            this.reconnectDelay_ = RECONNECT_MIN_DELAY;
          }
          this.lastConnectionEstablishedTime_ = null;
        }
        const timeSinceLastConnectAttempt = new Date().getTime() - this.lastConnectionAttemptTime_;
        let reconnectDelay = Math.max(0, this.reconnectDelay_ - timeSinceLastConnectAttempt);
        reconnectDelay = Math.random() * reconnectDelay;
        this.log_("Trying to reconnect in " + reconnectDelay + "ms");
        this.scheduleConnect_(reconnectDelay);
        this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * RECONNECT_DELAY_MULTIPLIER);
      }
      this.onConnectStatus_(false);
    }
    async establishConnection_() {
      if (this.shouldReconnect_()) {
        this.log_("Making a connection attempt");
        this.lastConnectionAttemptTime_ = new Date().getTime();
        this.lastConnectionEstablishedTime_ = null;
        const onDataMessage = this.onDataMessage_.bind(this);
        const onReady = this.onReady_.bind(this);
        const onDisconnect = this.onRealtimeDisconnect_.bind(this);
        const connId = this.id + ":" + PersistentConnection.nextConnectionId_++;
        const lastSessionId = this.lastSessionId;
        let canceled = false;
        let connection = null;
        const closeFn = function() {
          if (connection) {
            connection.close();
          } else {
            canceled = true;
            onDisconnect();
          }
        };
        const sendRequestFn = function(msg) {
          assert(connection, "sendRequest call when we're not connected not allowed.");
          connection.sendRequest(msg);
        };
        this.realtime_ = {
          close: closeFn,
          sendRequest: sendRequestFn
        };
        const forceRefresh = this.forceTokenRefresh_;
        this.forceTokenRefresh_ = false;
        try {
          const [authToken, appCheckToken] = await Promise.all([
            this.authTokenProvider_.getToken(forceRefresh),
            this.appCheckTokenProvider_.getToken(forceRefresh)
          ]);
          if (!canceled) {
            log("getToken() completed. Creating connection.");
            this.authToken_ = authToken && authToken.accessToken;
            this.appCheckToken_ = appCheckToken && appCheckToken.token;
            connection = new Connection(
              connId,
              this.repoInfo_,
              this.applicationId_,
              this.appCheckToken_,
              this.authToken_,
              onDataMessage,
              onReady,
              onDisconnect,
              (reason) => {
                warn(reason + " (" + this.repoInfo_.toString() + ")");
                this.interrupt(SERVER_KILL_INTERRUPT_REASON);
              },
              lastSessionId
            );
          } else {
            log("getToken() completed but was canceled");
          }
        } catch (error2) {
          this.log_("Failed to get token: " + error2);
          if (!canceled) {
            if (this.repoInfo_.nodeAdmin) {
              warn(error2);
            }
            closeFn();
          }
        }
      }
    }
    interrupt(reason) {
      log("Interrupting connection for reason: " + reason);
      this.interruptReasons_[reason] = true;
      if (this.realtime_) {
        this.realtime_.close();
      } else {
        if (this.establishConnectionTimer_) {
          clearTimeout(this.establishConnectionTimer_);
          this.establishConnectionTimer_ = null;
        }
        if (this.connected_) {
          this.onRealtimeDisconnect_();
        }
      }
    }
    resume(reason) {
      log("Resuming connection for reason: " + reason);
      delete this.interruptReasons_[reason];
      if (isEmpty(this.interruptReasons_)) {
        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        if (!this.realtime_) {
          this.scheduleConnect_(0);
        }
      }
    }
    handleTimestamp_(timestamp) {
      const delta = timestamp - new Date().getTime();
      this.onServerInfoUpdate_({ serverTimeOffset: delta });
    }
    cancelSentTransactions_() {
      for (let i2 = 0; i2 < this.outstandingPuts_.length; i2++) {
        const put = this.outstandingPuts_[i2];
        if (put && "h" in put.request && put.queued) {
          if (put.onComplete) {
            put.onComplete("disconnect");
          }
          delete this.outstandingPuts_[i2];
          this.outstandingPutCount_--;
        }
      }
      if (this.outstandingPutCount_ === 0) {
        this.outstandingPuts_ = [];
      }
    }
    onListenRevoked_(pathString, query2) {
      let queryId;
      if (!query2) {
        queryId = "default";
      } else {
        queryId = query2.map((q2) => ObjectToUniqueKey(q2)).join("$");
      }
      const listen = this.removeListen_(pathString, queryId);
      if (listen && listen.onComplete) {
        listen.onComplete("permission_denied");
      }
    }
    removeListen_(pathString, queryId) {
      const normalizedPathString = new Path(pathString).toString();
      let listen;
      if (this.listens.has(normalizedPathString)) {
        const map2 = this.listens.get(normalizedPathString);
        listen = map2.get(queryId);
        map2.delete(queryId);
        if (map2.size === 0) {
          this.listens.delete(normalizedPathString);
        }
      } else {
        listen = void 0;
      }
      return listen;
    }
    onAuthRevoked_(statusCode, explanation) {
      log("Auth token revoked: " + statusCode + "/" + explanation);
      this.authToken_ = null;
      this.forceTokenRefresh_ = true;
      this.realtime_.close();
      if (statusCode === "invalid_token" || statusCode === "permission_denied") {
        this.invalidAuthTokenCount_++;
        if (this.invalidAuthTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
          this.reconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
          this.authTokenProvider_.notifyForInvalidToken();
        }
      }
    }
    onAppCheckRevoked_(statusCode, explanation) {
      log("App check token revoked: " + statusCode + "/" + explanation);
      this.appCheckToken_ = null;
      this.forceTokenRefresh_ = true;
      if (statusCode === "invalid_token" || statusCode === "permission_denied") {
        this.invalidAppCheckTokenCount_++;
        if (this.invalidAppCheckTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
          this.appCheckTokenProvider_.notifyForInvalidToken();
        }
      }
    }
    onSecurityDebugPacket_(body) {
      if (this.securityDebugCallback_) {
        this.securityDebugCallback_(body);
      } else {
        if ("msg" in body) {
          console.log("FIREBASE: " + body["msg"].replace("\n", "\nFIREBASE: "));
        }
      }
    }
    restoreState_() {
      this.tryAuth();
      this.tryAppCheck();
      for (const queries of this.listens.values()) {
        for (const listenSpec of queries.values()) {
          this.sendListen_(listenSpec);
        }
      }
      for (let i2 = 0; i2 < this.outstandingPuts_.length; i2++) {
        if (this.outstandingPuts_[i2]) {
          this.sendPut_(i2);
        }
      }
      while (this.onDisconnectRequestQueue_.length) {
        const request = this.onDisconnectRequestQueue_.shift();
        this.sendOnDisconnect_(request.action, request.pathString, request.data, request.onComplete);
      }
      for (let i2 = 0; i2 < this.outstandingGets_.length; i2++) {
        if (this.outstandingGets_[i2]) {
          this.sendGet_(i2);
        }
      }
    }
    sendConnectStats_() {
      const stats = {};
      let clientName = "js";
      if (isNodeSdk()) {
        if (this.repoInfo_.nodeAdmin) {
          clientName = "admin_node";
        } else {
          clientName = "node";
        }
      }
      stats["sdk." + clientName + "." + SDK_VERSION2.replace(/\./g, "-")] = 1;
      if (isMobileCordova()) {
        stats["framework.cordova"] = 1;
      } else if (isReactNative()) {
        stats["framework.reactnative"] = 1;
      }
      this.reportStats(stats);
    }
    shouldReconnect_() {
      const online = OnlineMonitor.getInstance().currentlyOnline();
      return isEmpty(this.interruptReasons_) && online;
    }
  };
  PersistentConnection.nextPersistentConnectionId_ = 0;
  PersistentConnection.nextConnectionId_ = 0;
  var NamedNode = class {
    constructor(name5, node) {
      this.name = name5;
      this.node = node;
    }
    static Wrap(name5, node) {
      return new NamedNode(name5, node);
    }
  };
  var Index = class {
    getCompare() {
      return this.compare.bind(this);
    }
    indexedValueChanged(oldNode, newNode) {
      const oldWrapped = new NamedNode(MIN_NAME, oldNode);
      const newWrapped = new NamedNode(MIN_NAME, newNode);
      return this.compare(oldWrapped, newWrapped) !== 0;
    }
    minPost() {
      return NamedNode.MIN;
    }
  };
  var __EMPTY_NODE;
  var KeyIndex = class extends Index {
    static get __EMPTY_NODE() {
      return __EMPTY_NODE;
    }
    static set __EMPTY_NODE(val) {
      __EMPTY_NODE = val;
    }
    compare(a2, b2) {
      return nameCompare(a2.name, b2.name);
    }
    isDefinedOn(node) {
      throw assertionError("KeyIndex.isDefinedOn not expected to be called.");
    }
    indexedValueChanged(oldNode, newNode) {
      return false;
    }
    minPost() {
      return NamedNode.MIN;
    }
    maxPost() {
      return new NamedNode(MAX_NAME, __EMPTY_NODE);
    }
    makePost(indexValue, name5) {
      assert(typeof indexValue === "string", "KeyIndex indexValue must always be a string.");
      return new NamedNode(indexValue, __EMPTY_NODE);
    }
    toString() {
      return ".key";
    }
  };
  var KEY_INDEX = new KeyIndex();
  var SortedMapIterator = class {
    constructor(node, startKey, comparator, isReverse_, resultGenerator_ = null) {
      this.isReverse_ = isReverse_;
      this.resultGenerator_ = resultGenerator_;
      this.nodeStack_ = [];
      let cmp = 1;
      while (!node.isEmpty()) {
        node = node;
        cmp = startKey ? comparator(node.key, startKey) : 1;
        if (isReverse_) {
          cmp *= -1;
        }
        if (cmp < 0) {
          if (this.isReverse_) {
            node = node.left;
          } else {
            node = node.right;
          }
        } else if (cmp === 0) {
          this.nodeStack_.push(node);
          break;
        } else {
          this.nodeStack_.push(node);
          if (this.isReverse_) {
            node = node.right;
          } else {
            node = node.left;
          }
        }
      }
    }
    getNext() {
      if (this.nodeStack_.length === 0) {
        return null;
      }
      let node = this.nodeStack_.pop();
      let result;
      if (this.resultGenerator_) {
        result = this.resultGenerator_(node.key, node.value);
      } else {
        result = { key: node.key, value: node.value };
      }
      if (this.isReverse_) {
        node = node.left;
        while (!node.isEmpty()) {
          this.nodeStack_.push(node);
          node = node.right;
        }
      } else {
        node = node.right;
        while (!node.isEmpty()) {
          this.nodeStack_.push(node);
          node = node.left;
        }
      }
      return result;
    }
    hasNext() {
      return this.nodeStack_.length > 0;
    }
    peek() {
      if (this.nodeStack_.length === 0) {
        return null;
      }
      const node = this.nodeStack_[this.nodeStack_.length - 1];
      if (this.resultGenerator_) {
        return this.resultGenerator_(node.key, node.value);
      } else {
        return { key: node.key, value: node.value };
      }
    }
  };
  var LLRBNode = class {
    constructor(key, value, color, left, right) {
      this.key = key;
      this.value = value;
      this.color = color != null ? color : LLRBNode.RED;
      this.left = left != null ? left : SortedMap.EMPTY_NODE;
      this.right = right != null ? right : SortedMap.EMPTY_NODE;
    }
    copy(key, value, color, left, right) {
      return new LLRBNode(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
    }
    count() {
      return this.left.count() + 1 + this.right.count();
    }
    isEmpty() {
      return false;
    }
    inorderTraversal(action) {
      return this.left.inorderTraversal(action) || !!action(this.key, this.value) || this.right.inorderTraversal(action);
    }
    reverseTraversal(action) {
      return this.right.reverseTraversal(action) || action(this.key, this.value) || this.left.reverseTraversal(action);
    }
    min_() {
      if (this.left.isEmpty()) {
        return this;
      } else {
        return this.left.min_();
      }
    }
    minKey() {
      return this.min_().key;
    }
    maxKey() {
      if (this.right.isEmpty()) {
        return this.key;
      } else {
        return this.right.maxKey();
      }
    }
    insert(key, value, comparator) {
      let n2 = this;
      const cmp = comparator(key, n2.key);
      if (cmp < 0) {
        n2 = n2.copy(null, null, null, n2.left.insert(key, value, comparator), null);
      } else if (cmp === 0) {
        n2 = n2.copy(null, value, null, null, null);
      } else {
        n2 = n2.copy(null, null, null, null, n2.right.insert(key, value, comparator));
      }
      return n2.fixUp_();
    }
    removeMin_() {
      if (this.left.isEmpty()) {
        return SortedMap.EMPTY_NODE;
      }
      let n2 = this;
      if (!n2.left.isRed_() && !n2.left.left.isRed_()) {
        n2 = n2.moveRedLeft_();
      }
      n2 = n2.copy(null, null, null, n2.left.removeMin_(), null);
      return n2.fixUp_();
    }
    remove(key, comparator) {
      let n2, smallest;
      n2 = this;
      if (comparator(key, n2.key) < 0) {
        if (!n2.left.isEmpty() && !n2.left.isRed_() && !n2.left.left.isRed_()) {
          n2 = n2.moveRedLeft_();
        }
        n2 = n2.copy(null, null, null, n2.left.remove(key, comparator), null);
      } else {
        if (n2.left.isRed_()) {
          n2 = n2.rotateRight_();
        }
        if (!n2.right.isEmpty() && !n2.right.isRed_() && !n2.right.left.isRed_()) {
          n2 = n2.moveRedRight_();
        }
        if (comparator(key, n2.key) === 0) {
          if (n2.right.isEmpty()) {
            return SortedMap.EMPTY_NODE;
          } else {
            smallest = n2.right.min_();
            n2 = n2.copy(smallest.key, smallest.value, null, null, n2.right.removeMin_());
          }
        }
        n2 = n2.copy(null, null, null, null, n2.right.remove(key, comparator));
      }
      return n2.fixUp_();
    }
    isRed_() {
      return this.color;
    }
    fixUp_() {
      let n2 = this;
      if (n2.right.isRed_() && !n2.left.isRed_()) {
        n2 = n2.rotateLeft_();
      }
      if (n2.left.isRed_() && n2.left.left.isRed_()) {
        n2 = n2.rotateRight_();
      }
      if (n2.left.isRed_() && n2.right.isRed_()) {
        n2 = n2.colorFlip_();
      }
      return n2;
    }
    moveRedLeft_() {
      let n2 = this.colorFlip_();
      if (n2.right.left.isRed_()) {
        n2 = n2.copy(null, null, null, null, n2.right.rotateRight_());
        n2 = n2.rotateLeft_();
        n2 = n2.colorFlip_();
      }
      return n2;
    }
    moveRedRight_() {
      let n2 = this.colorFlip_();
      if (n2.left.left.isRed_()) {
        n2 = n2.rotateRight_();
        n2 = n2.colorFlip_();
      }
      return n2;
    }
    rotateLeft_() {
      const nl = this.copy(null, null, LLRBNode.RED, null, this.right.left);
      return this.right.copy(null, null, this.color, nl, null);
    }
    rotateRight_() {
      const nr = this.copy(null, null, LLRBNode.RED, this.left.right, null);
      return this.left.copy(null, null, this.color, null, nr);
    }
    colorFlip_() {
      const left = this.left.copy(null, null, !this.left.color, null, null);
      const right = this.right.copy(null, null, !this.right.color, null, null);
      return this.copy(null, null, !this.color, left, right);
    }
    checkMaxDepth_() {
      const blackDepth = this.check_();
      return Math.pow(2, blackDepth) <= this.count() + 1;
    }
    check_() {
      if (this.isRed_() && this.left.isRed_()) {
        throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
      }
      if (this.right.isRed_()) {
        throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
      }
      const blackDepth = this.left.check_();
      if (blackDepth !== this.right.check_()) {
        throw new Error("Black depths differ");
      } else {
        return blackDepth + (this.isRed_() ? 0 : 1);
      }
    }
  };
  LLRBNode.RED = true;
  LLRBNode.BLACK = false;
  var LLRBEmptyNode = class {
    copy(key, value, color, left, right) {
      return this;
    }
    insert(key, value, comparator) {
      return new LLRBNode(key, value, null);
    }
    remove(key, comparator) {
      return this;
    }
    count() {
      return 0;
    }
    isEmpty() {
      return true;
    }
    inorderTraversal(action) {
      return false;
    }
    reverseTraversal(action) {
      return false;
    }
    minKey() {
      return null;
    }
    maxKey() {
      return null;
    }
    check_() {
      return 0;
    }
    isRed_() {
      return false;
    }
  };
  var SortedMap = class {
    constructor(comparator_, root_ = SortedMap.EMPTY_NODE) {
      this.comparator_ = comparator_;
      this.root_ = root_;
    }
    insert(key, value) {
      return new SortedMap(this.comparator_, this.root_.insert(key, value, this.comparator_).copy(null, null, LLRBNode.BLACK, null, null));
    }
    remove(key) {
      return new SortedMap(this.comparator_, this.root_.remove(key, this.comparator_).copy(null, null, LLRBNode.BLACK, null, null));
    }
    get(key) {
      let cmp;
      let node = this.root_;
      while (!node.isEmpty()) {
        cmp = this.comparator_(key, node.key);
        if (cmp === 0) {
          return node.value;
        } else if (cmp < 0) {
          node = node.left;
        } else if (cmp > 0) {
          node = node.right;
        }
      }
      return null;
    }
    getPredecessorKey(key) {
      let cmp, node = this.root_, rightParent = null;
      while (!node.isEmpty()) {
        cmp = this.comparator_(key, node.key);
        if (cmp === 0) {
          if (!node.left.isEmpty()) {
            node = node.left;
            while (!node.right.isEmpty()) {
              node = node.right;
            }
            return node.key;
          } else if (rightParent) {
            return rightParent.key;
          } else {
            return null;
          }
        } else if (cmp < 0) {
          node = node.left;
        } else if (cmp > 0) {
          rightParent = node;
          node = node.right;
        }
      }
      throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
    }
    isEmpty() {
      return this.root_.isEmpty();
    }
    count() {
      return this.root_.count();
    }
    minKey() {
      return this.root_.minKey();
    }
    maxKey() {
      return this.root_.maxKey();
    }
    inorderTraversal(action) {
      return this.root_.inorderTraversal(action);
    }
    reverseTraversal(action) {
      return this.root_.reverseTraversal(action);
    }
    getIterator(resultGenerator) {
      return new SortedMapIterator(this.root_, null, this.comparator_, false, resultGenerator);
    }
    getIteratorFrom(key, resultGenerator) {
      return new SortedMapIterator(this.root_, key, this.comparator_, false, resultGenerator);
    }
    getReverseIteratorFrom(key, resultGenerator) {
      return new SortedMapIterator(this.root_, key, this.comparator_, true, resultGenerator);
    }
    getReverseIterator(resultGenerator) {
      return new SortedMapIterator(this.root_, null, this.comparator_, true, resultGenerator);
    }
  };
  SortedMap.EMPTY_NODE = new LLRBEmptyNode();
  function NAME_ONLY_COMPARATOR(left, right) {
    return nameCompare(left.name, right.name);
  }
  function NAME_COMPARATOR(left, right) {
    return nameCompare(left, right);
  }
  var MAX_NODE$2;
  function setMaxNode$1(val) {
    MAX_NODE$2 = val;
  }
  var priorityHashText = function(priority) {
    if (typeof priority === "number") {
      return "number:" + doubleToIEEE754String(priority);
    } else {
      return "string:" + priority;
    }
  };
  var validatePriorityNode = function(priorityNode) {
    if (priorityNode.isLeafNode()) {
      const val = priorityNode.val();
      assert(typeof val === "string" || typeof val === "number" || typeof val === "object" && contains(val, ".sv"), "Priority must be a string or number.");
    } else {
      assert(priorityNode === MAX_NODE$2 || priorityNode.isEmpty(), "priority of unexpected type.");
    }
    assert(priorityNode === MAX_NODE$2 || priorityNode.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
  };
  var __childrenNodeConstructor;
  var LeafNode = class {
    constructor(value_, priorityNode_ = LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
      this.value_ = value_;
      this.priorityNode_ = priorityNode_;
      this.lazyHash_ = null;
      assert(this.value_ !== void 0 && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value.");
      validatePriorityNode(this.priorityNode_);
    }
    static set __childrenNodeConstructor(val) {
      __childrenNodeConstructor = val;
    }
    static get __childrenNodeConstructor() {
      return __childrenNodeConstructor;
    }
    isLeafNode() {
      return true;
    }
    getPriority() {
      return this.priorityNode_;
    }
    updatePriority(newPriorityNode) {
      return new LeafNode(this.value_, newPriorityNode);
    }
    getImmediateChild(childName) {
      if (childName === ".priority") {
        return this.priorityNode_;
      } else {
        return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
      }
    }
    getChild(path) {
      if (pathIsEmpty(path)) {
        return this;
      } else if (pathGetFront(path) === ".priority") {
        return this.priorityNode_;
      } else {
        return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
      }
    }
    hasChild() {
      return false;
    }
    getPredecessorChildName(childName, childNode) {
      return null;
    }
    updateImmediateChild(childName, newChildNode) {
      if (childName === ".priority") {
        return this.updatePriority(newChildNode);
      } else if (newChildNode.isEmpty() && childName !== ".priority") {
        return this;
      } else {
        return LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(childName, newChildNode).updatePriority(this.priorityNode_);
      }
    }
    updateChild(path, newChildNode) {
      const front = pathGetFront(path);
      if (front === null) {
        return newChildNode;
      } else if (newChildNode.isEmpty() && front !== ".priority") {
        return this;
      } else {
        assert(front !== ".priority" || pathGetLength(path) === 1, ".priority must be the last token in a path");
        return this.updateImmediateChild(front, LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateChild(pathPopFront(path), newChildNode));
      }
    }
    isEmpty() {
      return false;
    }
    numChildren() {
      return 0;
    }
    forEachChild(index, action) {
      return false;
    }
    val(exportFormat) {
      if (exportFormat && !this.getPriority().isEmpty()) {
        return {
          ".value": this.getValue(),
          ".priority": this.getPriority().val()
        };
      } else {
        return this.getValue();
      }
    }
    hash() {
      if (this.lazyHash_ === null) {
        let toHash = "";
        if (!this.priorityNode_.isEmpty()) {
          toHash += "priority:" + priorityHashText(this.priorityNode_.val()) + ":";
        }
        const type = typeof this.value_;
        toHash += type + ":";
        if (type === "number") {
          toHash += doubleToIEEE754String(this.value_);
        } else {
          toHash += this.value_;
        }
        this.lazyHash_ = sha12(toHash);
      }
      return this.lazyHash_;
    }
    getValue() {
      return this.value_;
    }
    compareTo(other) {
      if (other === LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
        return 1;
      } else if (other instanceof LeafNode.__childrenNodeConstructor) {
        return -1;
      } else {
        assert(other.isLeafNode(), "Unknown node type");
        return this.compareToLeafNode_(other);
      }
    }
    compareToLeafNode_(otherLeaf) {
      const otherLeafType = typeof otherLeaf.value_;
      const thisLeafType = typeof this.value_;
      const otherIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(otherLeafType);
      const thisIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(thisLeafType);
      assert(otherIndex >= 0, "Unknown leaf type: " + otherLeafType);
      assert(thisIndex >= 0, "Unknown leaf type: " + thisLeafType);
      if (otherIndex === thisIndex) {
        if (thisLeafType === "object") {
          return 0;
        } else {
          if (this.value_ < otherLeaf.value_) {
            return -1;
          } else if (this.value_ === otherLeaf.value_) {
            return 0;
          } else {
            return 1;
          }
        }
      } else {
        return thisIndex - otherIndex;
      }
    }
    withIndex() {
      return this;
    }
    isIndexed() {
      return true;
    }
    equals(other) {
      if (other === this) {
        return true;
      } else if (other.isLeafNode()) {
        const otherLeaf = other;
        return this.value_ === otherLeaf.value_ && this.priorityNode_.equals(otherLeaf.priorityNode_);
      } else {
        return false;
      }
    }
  };
  LeafNode.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
  var nodeFromJSON$1;
  var MAX_NODE$1;
  function setNodeFromJSON(val) {
    nodeFromJSON$1 = val;
  }
  function setMaxNode(val) {
    MAX_NODE$1 = val;
  }
  var PriorityIndex = class extends Index {
    compare(a2, b2) {
      const aPriority = a2.node.getPriority();
      const bPriority = b2.node.getPriority();
      const indexCmp = aPriority.compareTo(bPriority);
      if (indexCmp === 0) {
        return nameCompare(a2.name, b2.name);
      } else {
        return indexCmp;
      }
    }
    isDefinedOn(node) {
      return !node.getPriority().isEmpty();
    }
    indexedValueChanged(oldNode, newNode) {
      return !oldNode.getPriority().equals(newNode.getPriority());
    }
    minPost() {
      return NamedNode.MIN;
    }
    maxPost() {
      return new NamedNode(MAX_NAME, new LeafNode("[PRIORITY-POST]", MAX_NODE$1));
    }
    makePost(indexValue, name5) {
      const priorityNode = nodeFromJSON$1(indexValue);
      return new NamedNode(name5, new LeafNode("[PRIORITY-POST]", priorityNode));
    }
    toString() {
      return ".priority";
    }
  };
  var PRIORITY_INDEX = new PriorityIndex();
  var LOG_2 = Math.log(2);
  var Base12Num = class {
    constructor(length) {
      const logBase2 = (num) => parseInt(Math.log(num) / LOG_2, 10);
      const bitMask = (bits) => parseInt(Array(bits + 1).join("1"), 2);
      this.count = logBase2(length + 1);
      this.current_ = this.count - 1;
      const mask = bitMask(this.count);
      this.bits_ = length + 1 & mask;
    }
    nextBitIsOne() {
      const result = !(this.bits_ & 1 << this.current_);
      this.current_--;
      return result;
    }
  };
  var buildChildSet = function(childList, cmp, keyFn, mapSortFn) {
    childList.sort(cmp);
    const buildBalancedTree = function(low, high) {
      const length = high - low;
      let namedNode;
      let key;
      if (length === 0) {
        return null;
      } else if (length === 1) {
        namedNode = childList[low];
        key = keyFn ? keyFn(namedNode) : namedNode;
        return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, null, null);
      } else {
        const middle = parseInt(length / 2, 10) + low;
        const left = buildBalancedTree(low, middle);
        const right = buildBalancedTree(middle + 1, high);
        namedNode = childList[middle];
        key = keyFn ? keyFn(namedNode) : namedNode;
        return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, left, right);
      }
    };
    const buildFrom12Array = function(base122) {
      let node = null;
      let root2 = null;
      let index = childList.length;
      const buildPennant = function(chunkSize, color) {
        const low = index - chunkSize;
        const high = index;
        index -= chunkSize;
        const childTree = buildBalancedTree(low + 1, high);
        const namedNode = childList[low];
        const key = keyFn ? keyFn(namedNode) : namedNode;
        attachPennant(new LLRBNode(key, namedNode.node, color, null, childTree));
      };
      const attachPennant = function(pennant) {
        if (node) {
          node.left = pennant;
          node = pennant;
        } else {
          root2 = pennant;
          node = pennant;
        }
      };
      for (let i2 = 0; i2 < base122.count; ++i2) {
        const isOne = base122.nextBitIsOne();
        const chunkSize = Math.pow(2, base122.count - (i2 + 1));
        if (isOne) {
          buildPennant(chunkSize, LLRBNode.BLACK);
        } else {
          buildPennant(chunkSize, LLRBNode.BLACK);
          buildPennant(chunkSize, LLRBNode.RED);
        }
      }
      return root2;
    };
    const base12 = new Base12Num(childList.length);
    const root = buildFrom12Array(base12);
    return new SortedMap(mapSortFn || cmp, root);
  };
  var _defaultIndexMap;
  var fallbackObject = {};
  var IndexMap = class {
    constructor(indexes_, indexSet_) {
      this.indexes_ = indexes_;
      this.indexSet_ = indexSet_;
    }
    static get Default() {
      assert(fallbackObject && PRIORITY_INDEX, "ChildrenNode.ts has not been loaded");
      _defaultIndexMap = _defaultIndexMap || new IndexMap({ ".priority": fallbackObject }, { ".priority": PRIORITY_INDEX });
      return _defaultIndexMap;
    }
    get(indexKey) {
      const sortedMap = safeGet(this.indexes_, indexKey);
      if (!sortedMap) {
        throw new Error("No index defined for " + indexKey);
      }
      if (sortedMap instanceof SortedMap) {
        return sortedMap;
      } else {
        return null;
      }
    }
    hasIndex(indexDefinition) {
      return contains(this.indexSet_, indexDefinition.toString());
    }
    addIndex(indexDefinition, existingChildren) {
      assert(indexDefinition !== KEY_INDEX, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
      const childList = [];
      let sawIndexedValue = false;
      const iter = existingChildren.getIterator(NamedNode.Wrap);
      let next = iter.getNext();
      while (next) {
        sawIndexedValue = sawIndexedValue || indexDefinition.isDefinedOn(next.node);
        childList.push(next);
        next = iter.getNext();
      }
      let newIndex;
      if (sawIndexedValue) {
        newIndex = buildChildSet(childList, indexDefinition.getCompare());
      } else {
        newIndex = fallbackObject;
      }
      const indexName = indexDefinition.toString();
      const newIndexSet = Object.assign({}, this.indexSet_);
      newIndexSet[indexName] = indexDefinition;
      const newIndexes = Object.assign({}, this.indexes_);
      newIndexes[indexName] = newIndex;
      return new IndexMap(newIndexes, newIndexSet);
    }
    addToIndexes(namedNode, existingChildren) {
      const newIndexes = map(this.indexes_, (indexedChildren, indexName) => {
        const index = safeGet(this.indexSet_, indexName);
        assert(index, "Missing index implementation for " + indexName);
        if (indexedChildren === fallbackObject) {
          if (index.isDefinedOn(namedNode.node)) {
            const childList = [];
            const iter = existingChildren.getIterator(NamedNode.Wrap);
            let next = iter.getNext();
            while (next) {
              if (next.name !== namedNode.name) {
                childList.push(next);
              }
              next = iter.getNext();
            }
            childList.push(namedNode);
            return buildChildSet(childList, index.getCompare());
          } else {
            return fallbackObject;
          }
        } else {
          const existingSnap = existingChildren.get(namedNode.name);
          let newChildren = indexedChildren;
          if (existingSnap) {
            newChildren = newChildren.remove(new NamedNode(namedNode.name, existingSnap));
          }
          return newChildren.insert(namedNode, namedNode.node);
        }
      });
      return new IndexMap(newIndexes, this.indexSet_);
    }
    removeFromIndexes(namedNode, existingChildren) {
      const newIndexes = map(this.indexes_, (indexedChildren) => {
        if (indexedChildren === fallbackObject) {
          return indexedChildren;
        } else {
          const existingSnap = existingChildren.get(namedNode.name);
          if (existingSnap) {
            return indexedChildren.remove(new NamedNode(namedNode.name, existingSnap));
          } else {
            return indexedChildren;
          }
        }
      });
      return new IndexMap(newIndexes, this.indexSet_);
    }
  };
  var EMPTY_NODE;
  var ChildrenNode = class {
    constructor(children_, priorityNode_, indexMap_) {
      this.children_ = children_;
      this.priorityNode_ = priorityNode_;
      this.indexMap_ = indexMap_;
      this.lazyHash_ = null;
      if (this.priorityNode_) {
        validatePriorityNode(this.priorityNode_);
      }
      if (this.children_.isEmpty()) {
        assert(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority");
      }
    }
    static get EMPTY_NODE() {
      return EMPTY_NODE || (EMPTY_NODE = new ChildrenNode(new SortedMap(NAME_COMPARATOR), null, IndexMap.Default));
    }
    isLeafNode() {
      return false;
    }
    getPriority() {
      return this.priorityNode_ || EMPTY_NODE;
    }
    updatePriority(newPriorityNode) {
      if (this.children_.isEmpty()) {
        return this;
      } else {
        return new ChildrenNode(this.children_, newPriorityNode, this.indexMap_);
      }
    }
    getImmediateChild(childName) {
      if (childName === ".priority") {
        return this.getPriority();
      } else {
        const child2 = this.children_.get(childName);
        return child2 === null ? EMPTY_NODE : child2;
      }
    }
    getChild(path) {
      const front = pathGetFront(path);
      if (front === null) {
        return this;
      }
      return this.getImmediateChild(front).getChild(pathPopFront(path));
    }
    hasChild(childName) {
      return this.children_.get(childName) !== null;
    }
    updateImmediateChild(childName, newChildNode) {
      assert(newChildNode, "We should always be passing snapshot nodes");
      if (childName === ".priority") {
        return this.updatePriority(newChildNode);
      } else {
        const namedNode = new NamedNode(childName, newChildNode);
        let newChildren, newIndexMap;
        if (newChildNode.isEmpty()) {
          newChildren = this.children_.remove(childName);
          newIndexMap = this.indexMap_.removeFromIndexes(namedNode, this.children_);
        } else {
          newChildren = this.children_.insert(childName, newChildNode);
          newIndexMap = this.indexMap_.addToIndexes(namedNode, this.children_);
        }
        const newPriority = newChildren.isEmpty() ? EMPTY_NODE : this.priorityNode_;
        return new ChildrenNode(newChildren, newPriority, newIndexMap);
      }
    }
    updateChild(path, newChildNode) {
      const front = pathGetFront(path);
      if (front === null) {
        return newChildNode;
      } else {
        assert(pathGetFront(path) !== ".priority" || pathGetLength(path) === 1, ".priority must be the last token in a path");
        const newImmediateChild = this.getImmediateChild(front).updateChild(pathPopFront(path), newChildNode);
        return this.updateImmediateChild(front, newImmediateChild);
      }
    }
    isEmpty() {
      return this.children_.isEmpty();
    }
    numChildren() {
      return this.children_.count();
    }
    val(exportFormat) {
      if (this.isEmpty()) {
        return null;
      }
      const obj = {};
      let numKeys = 0, maxKey = 0, allIntegerKeys = true;
      this.forEachChild(PRIORITY_INDEX, (key, childNode) => {
        obj[key] = childNode.val(exportFormat);
        numKeys++;
        if (allIntegerKeys && ChildrenNode.INTEGER_REGEXP_.test(key)) {
          maxKey = Math.max(maxKey, Number(key));
        } else {
          allIntegerKeys = false;
        }
      });
      if (!exportFormat && allIntegerKeys && maxKey < 2 * numKeys) {
        const array = [];
        for (const key in obj) {
          array[key] = obj[key];
        }
        return array;
      } else {
        if (exportFormat && !this.getPriority().isEmpty()) {
          obj[".priority"] = this.getPriority().val();
        }
        return obj;
      }
    }
    hash() {
      if (this.lazyHash_ === null) {
        let toHash = "";
        if (!this.getPriority().isEmpty()) {
          toHash += "priority:" + priorityHashText(this.getPriority().val()) + ":";
        }
        this.forEachChild(PRIORITY_INDEX, (key, childNode) => {
          const childHash = childNode.hash();
          if (childHash !== "") {
            toHash += ":" + key + ":" + childHash;
          }
        });
        this.lazyHash_ = toHash === "" ? "" : sha12(toHash);
      }
      return this.lazyHash_;
    }
    getPredecessorChildName(childName, childNode, index) {
      const idx = this.resolveIndex_(index);
      if (idx) {
        const predecessor = idx.getPredecessorKey(new NamedNode(childName, childNode));
        return predecessor ? predecessor.name : null;
      } else {
        return this.children_.getPredecessorKey(childName);
      }
    }
    getFirstChildName(indexDefinition) {
      const idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        const minKey = idx.minKey();
        return minKey && minKey.name;
      } else {
        return this.children_.minKey();
      }
    }
    getFirstChild(indexDefinition) {
      const minKey = this.getFirstChildName(indexDefinition);
      if (minKey) {
        return new NamedNode(minKey, this.children_.get(minKey));
      } else {
        return null;
      }
    }
    getLastChildName(indexDefinition) {
      const idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        const maxKey = idx.maxKey();
        return maxKey && maxKey.name;
      } else {
        return this.children_.maxKey();
      }
    }
    getLastChild(indexDefinition) {
      const maxKey = this.getLastChildName(indexDefinition);
      if (maxKey) {
        return new NamedNode(maxKey, this.children_.get(maxKey));
      } else {
        return null;
      }
    }
    forEachChild(index, action) {
      const idx = this.resolveIndex_(index);
      if (idx) {
        return idx.inorderTraversal((wrappedNode) => {
          return action(wrappedNode.name, wrappedNode.node);
        });
      } else {
        return this.children_.inorderTraversal(action);
      }
    }
    getIterator(indexDefinition) {
      return this.getIteratorFrom(indexDefinition.minPost(), indexDefinition);
    }
    getIteratorFrom(startPost, indexDefinition) {
      const idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        return idx.getIteratorFrom(startPost, (key) => key);
      } else {
        const iterator = this.children_.getIteratorFrom(startPost.name, NamedNode.Wrap);
        let next = iterator.peek();
        while (next != null && indexDefinition.compare(next, startPost) < 0) {
          iterator.getNext();
          next = iterator.peek();
        }
        return iterator;
      }
    }
    getReverseIterator(indexDefinition) {
      return this.getReverseIteratorFrom(indexDefinition.maxPost(), indexDefinition);
    }
    getReverseIteratorFrom(endPost, indexDefinition) {
      const idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        return idx.getReverseIteratorFrom(endPost, (key) => {
          return key;
        });
      } else {
        const iterator = this.children_.getReverseIteratorFrom(endPost.name, NamedNode.Wrap);
        let next = iterator.peek();
        while (next != null && indexDefinition.compare(next, endPost) > 0) {
          iterator.getNext();
          next = iterator.peek();
        }
        return iterator;
      }
    }
    compareTo(other) {
      if (this.isEmpty()) {
        if (other.isEmpty()) {
          return 0;
        } else {
          return -1;
        }
      } else if (other.isLeafNode() || other.isEmpty()) {
        return 1;
      } else if (other === MAX_NODE) {
        return -1;
      } else {
        return 0;
      }
    }
    withIndex(indexDefinition) {
      if (indexDefinition === KEY_INDEX || this.indexMap_.hasIndex(indexDefinition)) {
        return this;
      } else {
        const newIndexMap = this.indexMap_.addIndex(indexDefinition, this.children_);
        return new ChildrenNode(this.children_, this.priorityNode_, newIndexMap);
      }
    }
    isIndexed(index) {
      return index === KEY_INDEX || this.indexMap_.hasIndex(index);
    }
    equals(other) {
      if (other === this) {
        return true;
      } else if (other.isLeafNode()) {
        return false;
      } else {
        const otherChildrenNode = other;
        if (!this.getPriority().equals(otherChildrenNode.getPriority())) {
          return false;
        } else if (this.children_.count() === otherChildrenNode.children_.count()) {
          const thisIter = this.getIterator(PRIORITY_INDEX);
          const otherIter = otherChildrenNode.getIterator(PRIORITY_INDEX);
          let thisCurrent = thisIter.getNext();
          let otherCurrent = otherIter.getNext();
          while (thisCurrent && otherCurrent) {
            if (thisCurrent.name !== otherCurrent.name || !thisCurrent.node.equals(otherCurrent.node)) {
              return false;
            }
            thisCurrent = thisIter.getNext();
            otherCurrent = otherIter.getNext();
          }
          return thisCurrent === null && otherCurrent === null;
        } else {
          return false;
        }
      }
    }
    resolveIndex_(indexDefinition) {
      if (indexDefinition === KEY_INDEX) {
        return null;
      } else {
        return this.indexMap_.get(indexDefinition.toString());
      }
    }
  };
  ChildrenNode.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
  var MaxNode = class extends ChildrenNode {
    constructor() {
      super(new SortedMap(NAME_COMPARATOR), ChildrenNode.EMPTY_NODE, IndexMap.Default);
    }
    compareTo(other) {
      if (other === this) {
        return 0;
      } else {
        return 1;
      }
    }
    equals(other) {
      return other === this;
    }
    getPriority() {
      return this;
    }
    getImmediateChild(childName) {
      return ChildrenNode.EMPTY_NODE;
    }
    isEmpty() {
      return false;
    }
  };
  var MAX_NODE = new MaxNode();
  Object.defineProperties(NamedNode, {
    MIN: {
      value: new NamedNode(MIN_NAME, ChildrenNode.EMPTY_NODE)
    },
    MAX: {
      value: new NamedNode(MAX_NAME, MAX_NODE)
    }
  });
  KeyIndex.__EMPTY_NODE = ChildrenNode.EMPTY_NODE;
  LeafNode.__childrenNodeConstructor = ChildrenNode;
  setMaxNode$1(MAX_NODE);
  setMaxNode(MAX_NODE);
  var USE_HINZE = true;
  function nodeFromJSON(json, priority = null) {
    if (json === null) {
      return ChildrenNode.EMPTY_NODE;
    }
    if (typeof json === "object" && ".priority" in json) {
      priority = json[".priority"];
    }
    assert(priority === null || typeof priority === "string" || typeof priority === "number" || typeof priority === "object" && ".sv" in priority, "Invalid priority type found: " + typeof priority);
    if (typeof json === "object" && ".value" in json && json[".value"] !== null) {
      json = json[".value"];
    }
    if (typeof json !== "object" || ".sv" in json) {
      const jsonLeaf = json;
      return new LeafNode(jsonLeaf, nodeFromJSON(priority));
    }
    if (!(json instanceof Array) && USE_HINZE) {
      const children = [];
      let childrenHavePriority = false;
      const hinzeJsonObj = json;
      each(hinzeJsonObj, (key, child2) => {
        if (key.substring(0, 1) !== ".") {
          const childNode = nodeFromJSON(child2);
          if (!childNode.isEmpty()) {
            childrenHavePriority = childrenHavePriority || !childNode.getPriority().isEmpty();
            children.push(new NamedNode(key, childNode));
          }
        }
      });
      if (children.length === 0) {
        return ChildrenNode.EMPTY_NODE;
      }
      const childSet = buildChildSet(children, NAME_ONLY_COMPARATOR, (namedNode) => namedNode.name, NAME_COMPARATOR);
      if (childrenHavePriority) {
        const sortedChildSet = buildChildSet(children, PRIORITY_INDEX.getCompare());
        return new ChildrenNode(childSet, nodeFromJSON(priority), new IndexMap({ ".priority": sortedChildSet }, { ".priority": PRIORITY_INDEX }));
      } else {
        return new ChildrenNode(childSet, nodeFromJSON(priority), IndexMap.Default);
      }
    } else {
      let node = ChildrenNode.EMPTY_NODE;
      each(json, (key, childData) => {
        if (contains(json, key)) {
          if (key.substring(0, 1) !== ".") {
            const childNode = nodeFromJSON(childData);
            if (childNode.isLeafNode() || !childNode.isEmpty()) {
              node = node.updateImmediateChild(key, childNode);
            }
          }
        }
      });
      return node.updatePriority(nodeFromJSON(priority));
    }
  }
  setNodeFromJSON(nodeFromJSON);
  var PathIndex = class extends Index {
    constructor(indexPath_) {
      super();
      this.indexPath_ = indexPath_;
      assert(!pathIsEmpty(indexPath_) && pathGetFront(indexPath_) !== ".priority", "Can't create PathIndex with empty path or .priority key");
    }
    extractChild(snap) {
      return snap.getChild(this.indexPath_);
    }
    isDefinedOn(node) {
      return !node.getChild(this.indexPath_).isEmpty();
    }
    compare(a2, b2) {
      const aChild = this.extractChild(a2.node);
      const bChild = this.extractChild(b2.node);
      const indexCmp = aChild.compareTo(bChild);
      if (indexCmp === 0) {
        return nameCompare(a2.name, b2.name);
      } else {
        return indexCmp;
      }
    }
    makePost(indexValue, name5) {
      const valueNode = nodeFromJSON(indexValue);
      const node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, valueNode);
      return new NamedNode(name5, node);
    }
    maxPost() {
      const node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, MAX_NODE);
      return new NamedNode(MAX_NAME, node);
    }
    toString() {
      return pathSlice(this.indexPath_, 0).join("/");
    }
  };
  var ValueIndex = class extends Index {
    compare(a2, b2) {
      const indexCmp = a2.node.compareTo(b2.node);
      if (indexCmp === 0) {
        return nameCompare(a2.name, b2.name);
      } else {
        return indexCmp;
      }
    }
    isDefinedOn(node) {
      return true;
    }
    indexedValueChanged(oldNode, newNode) {
      return !oldNode.equals(newNode);
    }
    minPost() {
      return NamedNode.MIN;
    }
    maxPost() {
      return NamedNode.MAX;
    }
    makePost(indexValue, name5) {
      const valueNode = nodeFromJSON(indexValue);
      return new NamedNode(name5, valueNode);
    }
    toString() {
      return ".value";
    }
  };
  var VALUE_INDEX = new ValueIndex();
  var PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
  var MIN_PUSH_CHAR = "-";
  var MAX_PUSH_CHAR = "z";
  var MAX_KEY_LEN = 786;
  var nextPushId = function() {
    let lastPushTime = 0;
    const lastRandChars = [];
    return function(now) {
      const duplicateTime = now === lastPushTime;
      lastPushTime = now;
      let i2;
      const timeStampChars = new Array(8);
      for (i2 = 7; i2 >= 0; i2--) {
        timeStampChars[i2] = PUSH_CHARS.charAt(now % 64);
        now = Math.floor(now / 64);
      }
      assert(now === 0, "Cannot push at time == 0");
      let id = timeStampChars.join("");
      if (!duplicateTime) {
        for (i2 = 0; i2 < 12; i2++) {
          lastRandChars[i2] = Math.floor(Math.random() * 64);
        }
      } else {
        for (i2 = 11; i2 >= 0 && lastRandChars[i2] === 63; i2--) {
          lastRandChars[i2] = 0;
        }
        lastRandChars[i2]++;
      }
      for (i2 = 0; i2 < 12; i2++) {
        id += PUSH_CHARS.charAt(lastRandChars[i2]);
      }
      assert(id.length === 20, "nextPushId: Length should be 20.");
      return id;
    };
  }();
  var successor = function(key) {
    if (key === "" + INTEGER_32_MAX) {
      return MIN_PUSH_CHAR;
    }
    const keyAsInt = tryParseInt(key);
    if (keyAsInt != null) {
      return "" + (keyAsInt + 1);
    }
    const next = new Array(key.length);
    for (let i3 = 0; i3 < next.length; i3++) {
      next[i3] = key.charAt(i3);
    }
    if (next.length < MAX_KEY_LEN) {
      next.push(MIN_PUSH_CHAR);
      return next.join("");
    }
    let i2 = next.length - 1;
    while (i2 >= 0 && next[i2] === MAX_PUSH_CHAR) {
      i2--;
    }
    if (i2 === -1) {
      return MAX_NAME;
    }
    const source = next[i2];
    const sourcePlusOne = PUSH_CHARS.charAt(PUSH_CHARS.indexOf(source) + 1);
    next[i2] = sourcePlusOne;
    return next.slice(0, i2 + 1).join("");
  };
  function changeValue(snapshotNode) {
    return { type: "value", snapshotNode };
  }
  function changeChildAdded(childName, snapshotNode) {
    return { type: "child_added", snapshotNode, childName };
  }
  function changeChildRemoved(childName, snapshotNode) {
    return { type: "child_removed", snapshotNode, childName };
  }
  function changeChildChanged(childName, snapshotNode, oldSnap) {
    return {
      type: "child_changed",
      snapshotNode,
      childName,
      oldSnap
    };
  }
  function changeChildMoved(childName, snapshotNode) {
    return { type: "child_moved", snapshotNode, childName };
  }
  var IndexedFilter = class {
    constructor(index_) {
      this.index_ = index_;
    }
    updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
      assert(snap.isIndexed(this.index_), "A node must be indexed if only a child is updated");
      const oldChild = snap.getImmediateChild(key);
      if (oldChild.getChild(affectedPath).equals(newChild.getChild(affectedPath))) {
        if (oldChild.isEmpty() === newChild.isEmpty()) {
          return snap;
        }
      }
      if (optChangeAccumulator != null) {
        if (newChild.isEmpty()) {
          if (snap.hasChild(key)) {
            optChangeAccumulator.trackChildChange(changeChildRemoved(key, oldChild));
          } else {
            assert(snap.isLeafNode(), "A child remove without an old child only makes sense on a leaf node");
          }
        } else if (oldChild.isEmpty()) {
          optChangeAccumulator.trackChildChange(changeChildAdded(key, newChild));
        } else {
          optChangeAccumulator.trackChildChange(changeChildChanged(key, newChild, oldChild));
        }
      }
      if (snap.isLeafNode() && newChild.isEmpty()) {
        return snap;
      } else {
        return snap.updateImmediateChild(key, newChild).withIndex(this.index_);
      }
    }
    updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
      if (optChangeAccumulator != null) {
        if (!oldSnap.isLeafNode()) {
          oldSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
            if (!newSnap.hasChild(key)) {
              optChangeAccumulator.trackChildChange(changeChildRemoved(key, childNode));
            }
          });
        }
        if (!newSnap.isLeafNode()) {
          newSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
            if (oldSnap.hasChild(key)) {
              const oldChild = oldSnap.getImmediateChild(key);
              if (!oldChild.equals(childNode)) {
                optChangeAccumulator.trackChildChange(changeChildChanged(key, childNode, oldChild));
              }
            } else {
              optChangeAccumulator.trackChildChange(changeChildAdded(key, childNode));
            }
          });
        }
      }
      return newSnap.withIndex(this.index_);
    }
    updatePriority(oldSnap, newPriority) {
      if (oldSnap.isEmpty()) {
        return ChildrenNode.EMPTY_NODE;
      } else {
        return oldSnap.updatePriority(newPriority);
      }
    }
    filtersNodes() {
      return false;
    }
    getIndexedFilter() {
      return this;
    }
    getIndex() {
      return this.index_;
    }
  };
  var RangedFilter = class {
    constructor(params) {
      this.indexedFilter_ = new IndexedFilter(params.getIndex());
      this.index_ = params.getIndex();
      this.startPost_ = RangedFilter.getStartPost_(params);
      this.endPost_ = RangedFilter.getEndPost_(params);
    }
    getStartPost() {
      return this.startPost_;
    }
    getEndPost() {
      return this.endPost_;
    }
    matches(node) {
      return this.index_.compare(this.getStartPost(), node) <= 0 && this.index_.compare(node, this.getEndPost()) <= 0;
    }
    updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
      if (!this.matches(new NamedNode(key, newChild))) {
        newChild = ChildrenNode.EMPTY_NODE;
      }
      return this.indexedFilter_.updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
    }
    updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
      if (newSnap.isLeafNode()) {
        newSnap = ChildrenNode.EMPTY_NODE;
      }
      let filtered = newSnap.withIndex(this.index_);
      filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
      const self2 = this;
      newSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
        if (!self2.matches(new NamedNode(key, childNode))) {
          filtered = filtered.updateImmediateChild(key, ChildrenNode.EMPTY_NODE);
        }
      });
      return this.indexedFilter_.updateFullNode(oldSnap, filtered, optChangeAccumulator);
    }
    updatePriority(oldSnap, newPriority) {
      return oldSnap;
    }
    filtersNodes() {
      return true;
    }
    getIndexedFilter() {
      return this.indexedFilter_;
    }
    getIndex() {
      return this.index_;
    }
    static getStartPost_(params) {
      if (params.hasStart()) {
        const startName = params.getIndexStartName();
        return params.getIndex().makePost(params.getIndexStartValue(), startName);
      } else {
        return params.getIndex().minPost();
      }
    }
    static getEndPost_(params) {
      if (params.hasEnd()) {
        const endName = params.getIndexEndName();
        return params.getIndex().makePost(params.getIndexEndValue(), endName);
      } else {
        return params.getIndex().maxPost();
      }
    }
  };
  var LimitedFilter = class {
    constructor(params) {
      this.rangedFilter_ = new RangedFilter(params);
      this.index_ = params.getIndex();
      this.limit_ = params.getLimit();
      this.reverse_ = !params.isViewFromLeft();
    }
    updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
      if (!this.rangedFilter_.matches(new NamedNode(key, newChild))) {
        newChild = ChildrenNode.EMPTY_NODE;
      }
      if (snap.getImmediateChild(key).equals(newChild)) {
        return snap;
      } else if (snap.numChildren() < this.limit_) {
        return this.rangedFilter_.getIndexedFilter().updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
      } else {
        return this.fullLimitUpdateChild_(snap, key, newChild, source, optChangeAccumulator);
      }
    }
    updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
      let filtered;
      if (newSnap.isLeafNode() || newSnap.isEmpty()) {
        filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
      } else {
        if (this.limit_ * 2 < newSnap.numChildren() && newSnap.isIndexed(this.index_)) {
          filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
          let iterator;
          if (this.reverse_) {
            iterator = newSnap.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_);
          } else {
            iterator = newSnap.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
          }
          let count = 0;
          while (iterator.hasNext() && count < this.limit_) {
            const next = iterator.getNext();
            let inRange;
            if (this.reverse_) {
              inRange = this.index_.compare(this.rangedFilter_.getStartPost(), next) <= 0;
            } else {
              inRange = this.index_.compare(next, this.rangedFilter_.getEndPost()) <= 0;
            }
            if (inRange) {
              filtered = filtered.updateImmediateChild(next.name, next.node);
              count++;
            } else {
              break;
            }
          }
        } else {
          filtered = newSnap.withIndex(this.index_);
          filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
          let startPost;
          let endPost;
          let cmp;
          let iterator;
          if (this.reverse_) {
            iterator = filtered.getReverseIterator(this.index_);
            startPost = this.rangedFilter_.getEndPost();
            endPost = this.rangedFilter_.getStartPost();
            const indexCompare = this.index_.getCompare();
            cmp = (a2, b2) => indexCompare(b2, a2);
          } else {
            iterator = filtered.getIterator(this.index_);
            startPost = this.rangedFilter_.getStartPost();
            endPost = this.rangedFilter_.getEndPost();
            cmp = this.index_.getCompare();
          }
          let count = 0;
          let foundStartPost = false;
          while (iterator.hasNext()) {
            const next = iterator.getNext();
            if (!foundStartPost && cmp(startPost, next) <= 0) {
              foundStartPost = true;
            }
            const inRange = foundStartPost && count < this.limit_ && cmp(next, endPost) <= 0;
            if (inRange) {
              count++;
            } else {
              filtered = filtered.updateImmediateChild(next.name, ChildrenNode.EMPTY_NODE);
            }
          }
        }
      }
      return this.rangedFilter_.getIndexedFilter().updateFullNode(oldSnap, filtered, optChangeAccumulator);
    }
    updatePriority(oldSnap, newPriority) {
      return oldSnap;
    }
    filtersNodes() {
      return true;
    }
    getIndexedFilter() {
      return this.rangedFilter_.getIndexedFilter();
    }
    getIndex() {
      return this.index_;
    }
    fullLimitUpdateChild_(snap, childKey, childSnap, source, changeAccumulator) {
      let cmp;
      if (this.reverse_) {
        const indexCmp = this.index_.getCompare();
        cmp = (a2, b2) => indexCmp(b2, a2);
      } else {
        cmp = this.index_.getCompare();
      }
      const oldEventCache = snap;
      assert(oldEventCache.numChildren() === this.limit_, "");
      const newChildNamedNode = new NamedNode(childKey, childSnap);
      const windowBoundary = this.reverse_ ? oldEventCache.getFirstChild(this.index_) : oldEventCache.getLastChild(this.index_);
      const inRange = this.rangedFilter_.matches(newChildNamedNode);
      if (oldEventCache.hasChild(childKey)) {
        const oldChildSnap = oldEventCache.getImmediateChild(childKey);
        let nextChild = source.getChildAfterChild(this.index_, windowBoundary, this.reverse_);
        while (nextChild != null && (nextChild.name === childKey || oldEventCache.hasChild(nextChild.name))) {
          nextChild = source.getChildAfterChild(this.index_, nextChild, this.reverse_);
        }
        const compareNext = nextChild == null ? 1 : cmp(nextChild, newChildNamedNode);
        const remainsInWindow = inRange && !childSnap.isEmpty() && compareNext >= 0;
        if (remainsInWindow) {
          if (changeAccumulator != null) {
            changeAccumulator.trackChildChange(changeChildChanged(childKey, childSnap, oldChildSnap));
          }
          return oldEventCache.updateImmediateChild(childKey, childSnap);
        } else {
          if (changeAccumulator != null) {
            changeAccumulator.trackChildChange(changeChildRemoved(childKey, oldChildSnap));
          }
          const newEventCache = oldEventCache.updateImmediateChild(childKey, ChildrenNode.EMPTY_NODE);
          const nextChildInRange = nextChild != null && this.rangedFilter_.matches(nextChild);
          if (nextChildInRange) {
            if (changeAccumulator != null) {
              changeAccumulator.trackChildChange(changeChildAdded(nextChild.name, nextChild.node));
            }
            return newEventCache.updateImmediateChild(nextChild.name, nextChild.node);
          } else {
            return newEventCache;
          }
        }
      } else if (childSnap.isEmpty()) {
        return snap;
      } else if (inRange) {
        if (cmp(windowBoundary, newChildNamedNode) >= 0) {
          if (changeAccumulator != null) {
            changeAccumulator.trackChildChange(changeChildRemoved(windowBoundary.name, windowBoundary.node));
            changeAccumulator.trackChildChange(changeChildAdded(childKey, childSnap));
          }
          return oldEventCache.updateImmediateChild(childKey, childSnap).updateImmediateChild(windowBoundary.name, ChildrenNode.EMPTY_NODE);
        } else {
          return snap;
        }
      } else {
        return snap;
      }
    }
  };
  var QueryParams = class {
    constructor() {
      this.limitSet_ = false;
      this.startSet_ = false;
      this.startNameSet_ = false;
      this.startAfterSet_ = false;
      this.endSet_ = false;
      this.endNameSet_ = false;
      this.endBeforeSet_ = false;
      this.limit_ = 0;
      this.viewFrom_ = "";
      this.indexStartValue_ = null;
      this.indexStartName_ = "";
      this.indexEndValue_ = null;
      this.indexEndName_ = "";
      this.index_ = PRIORITY_INDEX;
    }
    hasStart() {
      return this.startSet_;
    }
    hasStartAfter() {
      return this.startAfterSet_;
    }
    hasEndBefore() {
      return this.endBeforeSet_;
    }
    isViewFromLeft() {
      if (this.viewFrom_ === "") {
        return this.startSet_;
      } else {
        return this.viewFrom_ === "l";
      }
    }
    getIndexStartValue() {
      assert(this.startSet_, "Only valid if start has been set");
      return this.indexStartValue_;
    }
    getIndexStartName() {
      assert(this.startSet_, "Only valid if start has been set");
      if (this.startNameSet_) {
        return this.indexStartName_;
      } else {
        return MIN_NAME;
      }
    }
    hasEnd() {
      return this.endSet_;
    }
    getIndexEndValue() {
      assert(this.endSet_, "Only valid if end has been set");
      return this.indexEndValue_;
    }
    getIndexEndName() {
      assert(this.endSet_, "Only valid if end has been set");
      if (this.endNameSet_) {
        return this.indexEndName_;
      } else {
        return MAX_NAME;
      }
    }
    hasLimit() {
      return this.limitSet_;
    }
    hasAnchoredLimit() {
      return this.limitSet_ && this.viewFrom_ !== "";
    }
    getLimit() {
      assert(this.limitSet_, "Only valid if limit has been set");
      return this.limit_;
    }
    getIndex() {
      return this.index_;
    }
    loadsAllData() {
      return !(this.startSet_ || this.endSet_ || this.limitSet_);
    }
    isDefault() {
      return this.loadsAllData() && this.index_ === PRIORITY_INDEX;
    }
    copy() {
      const copy = new QueryParams();
      copy.limitSet_ = this.limitSet_;
      copy.limit_ = this.limit_;
      copy.startSet_ = this.startSet_;
      copy.indexStartValue_ = this.indexStartValue_;
      copy.startNameSet_ = this.startNameSet_;
      copy.indexStartName_ = this.indexStartName_;
      copy.endSet_ = this.endSet_;
      copy.indexEndValue_ = this.indexEndValue_;
      copy.endNameSet_ = this.endNameSet_;
      copy.indexEndName_ = this.indexEndName_;
      copy.index_ = this.index_;
      copy.viewFrom_ = this.viewFrom_;
      return copy;
    }
  };
  function queryParamsGetNodeFilter(queryParams) {
    if (queryParams.loadsAllData()) {
      return new IndexedFilter(queryParams.getIndex());
    } else if (queryParams.hasLimit()) {
      return new LimitedFilter(queryParams);
    } else {
      return new RangedFilter(queryParams);
    }
  }
  function queryParamsLimitToFirst(queryParams, newLimit) {
    const newParams = queryParams.copy();
    newParams.limitSet_ = true;
    newParams.limit_ = newLimit;
    newParams.viewFrom_ = "l";
    return newParams;
  }
  function queryParamsStartAt(queryParams, indexValue, key) {
    const newParams = queryParams.copy();
    newParams.startSet_ = true;
    if (indexValue === void 0) {
      indexValue = null;
    }
    newParams.indexStartValue_ = indexValue;
    if (key != null) {
      newParams.startNameSet_ = true;
      newParams.indexStartName_ = key;
    } else {
      newParams.startNameSet_ = false;
      newParams.indexStartName_ = "";
    }
    return newParams;
  }
  function queryParamsStartAfter(queryParams, indexValue, key) {
    let params;
    if (queryParams.index_ === KEY_INDEX) {
      if (typeof indexValue === "string") {
        indexValue = successor(indexValue);
      }
      params = queryParamsStartAt(queryParams, indexValue, key);
    } else {
      let childKey;
      if (key == null) {
        childKey = MAX_NAME;
      } else {
        childKey = successor(key);
      }
      params = queryParamsStartAt(queryParams, indexValue, childKey);
    }
    params.startAfterSet_ = true;
    return params;
  }
  function queryParamsEndAt(queryParams, indexValue, key) {
    const newParams = queryParams.copy();
    newParams.endSet_ = true;
    if (indexValue === void 0) {
      indexValue = null;
    }
    newParams.indexEndValue_ = indexValue;
    if (key !== void 0) {
      newParams.endNameSet_ = true;
      newParams.indexEndName_ = key;
    } else {
      newParams.endNameSet_ = false;
      newParams.indexEndName_ = "";
    }
    return newParams;
  }
  function queryParamsOrderBy(queryParams, index) {
    const newParams = queryParams.copy();
    newParams.index_ = index;
    return newParams;
  }
  function queryParamsToRestQueryStringParameters(queryParams) {
    const qs = {};
    if (queryParams.isDefault()) {
      return qs;
    }
    let orderBy;
    if (queryParams.index_ === PRIORITY_INDEX) {
      orderBy = "$priority";
    } else if (queryParams.index_ === VALUE_INDEX) {
      orderBy = "$value";
    } else if (queryParams.index_ === KEY_INDEX) {
      orderBy = "$key";
    } else {
      assert(queryParams.index_ instanceof PathIndex, "Unrecognized index type!");
      orderBy = queryParams.index_.toString();
    }
    qs["orderBy"] = stringify2(orderBy);
    if (queryParams.startSet_) {
      qs["startAt"] = stringify2(queryParams.indexStartValue_);
      if (queryParams.startNameSet_) {
        qs["startAt"] += "," + stringify2(queryParams.indexStartName_);
      }
    }
    if (queryParams.endSet_) {
      qs["endAt"] = stringify2(queryParams.indexEndValue_);
      if (queryParams.endNameSet_) {
        qs["endAt"] += "," + stringify2(queryParams.indexEndName_);
      }
    }
    if (queryParams.limitSet_) {
      if (queryParams.isViewFromLeft()) {
        qs["limitToFirst"] = queryParams.limit_;
      } else {
        qs["limitToLast"] = queryParams.limit_;
      }
    }
    return qs;
  }
  function queryParamsGetQueryObject(queryParams) {
    const obj = {};
    if (queryParams.startSet_) {
      obj["sp"] = queryParams.indexStartValue_;
      if (queryParams.startNameSet_) {
        obj["sn"] = queryParams.indexStartName_;
      }
    }
    if (queryParams.endSet_) {
      obj["ep"] = queryParams.indexEndValue_;
      if (queryParams.endNameSet_) {
        obj["en"] = queryParams.indexEndName_;
      }
    }
    if (queryParams.limitSet_) {
      obj["l"] = queryParams.limit_;
      let viewFrom = queryParams.viewFrom_;
      if (viewFrom === "") {
        if (queryParams.isViewFromLeft()) {
          viewFrom = "l";
        } else {
          viewFrom = "r";
        }
      }
      obj["vf"] = viewFrom;
    }
    if (queryParams.index_ !== PRIORITY_INDEX) {
      obj["i"] = queryParams.index_.toString();
    }
    return obj;
  }
  var ReadonlyRestClient = class extends ServerActions {
    constructor(repoInfo_, onDataUpdate_, authTokenProvider_, appCheckTokenProvider_) {
      super();
      this.repoInfo_ = repoInfo_;
      this.onDataUpdate_ = onDataUpdate_;
      this.authTokenProvider_ = authTokenProvider_;
      this.appCheckTokenProvider_ = appCheckTokenProvider_;
      this.log_ = logWrapper("p:rest:");
      this.listens_ = {};
    }
    reportStats(stats) {
      throw new Error("Method not implemented.");
    }
    static getListenId_(query2, tag) {
      if (tag !== void 0) {
        return "tag$" + tag;
      } else {
        assert(query2._queryParams.isDefault(), "should have a tag if it's not a default query.");
        return query2._path.toString();
      }
    }
    listen(query2, currentHashFn, tag, onComplete) {
      const pathString = query2._path.toString();
      this.log_("Listen called for " + pathString + " " + query2._queryIdentifier);
      const listenId = ReadonlyRestClient.getListenId_(query2, tag);
      const thisListen = {};
      this.listens_[listenId] = thisListen;
      const queryStringParameters = queryParamsToRestQueryStringParameters(query2._queryParams);
      this.restRequest_(pathString + ".json", queryStringParameters, (error2, result) => {
        let data = result;
        if (error2 === 404) {
          data = null;
          error2 = null;
        }
        if (error2 === null) {
          this.onDataUpdate_(pathString, data, false, tag);
        }
        if (safeGet(this.listens_, listenId) === thisListen) {
          let status;
          if (!error2) {
            status = "ok";
          } else if (error2 === 401) {
            status = "permission_denied";
          } else {
            status = "rest_error:" + error2;
          }
          onComplete(status, null);
        }
      });
    }
    unlisten(query2, tag) {
      const listenId = ReadonlyRestClient.getListenId_(query2, tag);
      delete this.listens_[listenId];
    }
    get(query2) {
      const queryStringParameters = queryParamsToRestQueryStringParameters(query2._queryParams);
      const pathString = query2._path.toString();
      const deferred = new Deferred();
      this.restRequest_(pathString + ".json", queryStringParameters, (error2, result) => {
        let data = result;
        if (error2 === 404) {
          data = null;
          error2 = null;
        }
        if (error2 === null) {
          this.onDataUpdate_(
            pathString,
            data,
            false,
            null
          );
          deferred.resolve(data);
        } else {
          deferred.reject(new Error(data));
        }
      });
      return deferred.promise;
    }
    refreshAuthToken(token) {
    }
    restRequest_(pathString, queryStringParameters = {}, callback) {
      queryStringParameters["format"] = "export";
      return Promise.all([
        this.authTokenProvider_.getToken(false),
        this.appCheckTokenProvider_.getToken(false)
      ]).then(([authToken, appCheckToken]) => {
        if (authToken && authToken.accessToken) {
          queryStringParameters["auth"] = authToken.accessToken;
        }
        if (appCheckToken && appCheckToken.token) {
          queryStringParameters["ac"] = appCheckToken.token;
        }
        const url = (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host + pathString + "?ns=" + this.repoInfo_.namespace + querystring(queryStringParameters);
        this.log_("Sending REST request for " + url);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (callback && xhr.readyState === 4) {
            this.log_("REST Response for " + url + " received. status:", xhr.status, "response:", xhr.responseText);
            let res = null;
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                res = jsonEval(xhr.responseText);
              } catch (e) {
                warn("Failed to parse JSON response for " + url + ": " + xhr.responseText);
              }
              callback(null, res);
            } else {
              if (xhr.status !== 401 && xhr.status !== 404) {
                warn("Got unsuccessful REST response for " + url + " Status: " + xhr.status);
              }
              callback(xhr.status);
            }
            callback = null;
          }
        };
        xhr.open("GET", url, true);
        xhr.send();
      });
    }
  };
  var SnapshotHolder = class {
    constructor() {
      this.rootNode_ = ChildrenNode.EMPTY_NODE;
    }
    getNode(path) {
      return this.rootNode_.getChild(path);
    }
    updateSnapshot(path, newSnapshotNode) {
      this.rootNode_ = this.rootNode_.updateChild(path, newSnapshotNode);
    }
  };
  function newSparseSnapshotTree() {
    return {
      value: null,
      children: /* @__PURE__ */ new Map()
    };
  }
  function sparseSnapshotTreeRemember(sparseSnapshotTree, path, data) {
    if (pathIsEmpty(path)) {
      sparseSnapshotTree.value = data;
      sparseSnapshotTree.children.clear();
    } else if (sparseSnapshotTree.value !== null) {
      sparseSnapshotTree.value = sparseSnapshotTree.value.updateChild(path, data);
    } else {
      const childKey = pathGetFront(path);
      if (!sparseSnapshotTree.children.has(childKey)) {
        sparseSnapshotTree.children.set(childKey, newSparseSnapshotTree());
      }
      const child2 = sparseSnapshotTree.children.get(childKey);
      path = pathPopFront(path);
      sparseSnapshotTreeRemember(child2, path, data);
    }
  }
  function sparseSnapshotTreeForEachTree(sparseSnapshotTree, prefixPath, func) {
    if (sparseSnapshotTree.value !== null) {
      func(prefixPath, sparseSnapshotTree.value);
    } else {
      sparseSnapshotTreeForEachChild(sparseSnapshotTree, (key, tree) => {
        const path = new Path(prefixPath.toString() + "/" + key);
        sparseSnapshotTreeForEachTree(tree, path, func);
      });
    }
  }
  function sparseSnapshotTreeForEachChild(sparseSnapshotTree, func) {
    sparseSnapshotTree.children.forEach((tree, key) => {
      func(key, tree);
    });
  }
  var StatsListener = class {
    constructor(collection_) {
      this.collection_ = collection_;
      this.last_ = null;
    }
    get() {
      const newStats = this.collection_.get();
      const delta = Object.assign({}, newStats);
      if (this.last_) {
        each(this.last_, (stat, value) => {
          delta[stat] = delta[stat] - value;
        });
      }
      this.last_ = newStats;
      return delta;
    }
  };
  var FIRST_STATS_MIN_TIME = 10 * 1e3;
  var FIRST_STATS_MAX_TIME = 30 * 1e3;
  var REPORT_STATS_INTERVAL = 5 * 60 * 1e3;
  var StatsReporter = class {
    constructor(collection, server_) {
      this.server_ = server_;
      this.statsToReport_ = {};
      this.statsListener_ = new StatsListener(collection);
      const timeout = FIRST_STATS_MIN_TIME + (FIRST_STATS_MAX_TIME - FIRST_STATS_MIN_TIME) * Math.random();
      setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(timeout));
    }
    reportStats_() {
      const stats = this.statsListener_.get();
      const reportedStats = {};
      let haveStatsToReport = false;
      each(stats, (stat, value) => {
        if (value > 0 && contains(this.statsToReport_, stat)) {
          reportedStats[stat] = value;
          haveStatsToReport = true;
        }
      });
      if (haveStatsToReport) {
        this.server_.reportStats(reportedStats);
      }
      setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * REPORT_STATS_INTERVAL));
    }
  };
  var OperationType;
  (function(OperationType3) {
    OperationType3[OperationType3["OVERWRITE"] = 0] = "OVERWRITE";
    OperationType3[OperationType3["MERGE"] = 1] = "MERGE";
    OperationType3[OperationType3["ACK_USER_WRITE"] = 2] = "ACK_USER_WRITE";
    OperationType3[OperationType3["LISTEN_COMPLETE"] = 3] = "LISTEN_COMPLETE";
  })(OperationType || (OperationType = {}));
  function newOperationSourceUser() {
    return {
      fromUser: true,
      fromServer: false,
      queryId: null,
      tagged: false
    };
  }
  function newOperationSourceServer() {
    return {
      fromUser: false,
      fromServer: true,
      queryId: null,
      tagged: false
    };
  }
  function newOperationSourceServerTaggedQuery(queryId) {
    return {
      fromUser: false,
      fromServer: true,
      queryId,
      tagged: true
    };
  }
  var AckUserWrite = class {
    constructor(path, affectedTree, revert) {
      this.path = path;
      this.affectedTree = affectedTree;
      this.revert = revert;
      this.type = OperationType.ACK_USER_WRITE;
      this.source = newOperationSourceUser();
    }
    operationForChild(childName) {
      if (!pathIsEmpty(this.path)) {
        assert(pathGetFront(this.path) === childName, "operationForChild called for unrelated child.");
        return new AckUserWrite(pathPopFront(this.path), this.affectedTree, this.revert);
      } else if (this.affectedTree.value != null) {
        assert(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths.");
        return this;
      } else {
        const childTree = this.affectedTree.subtree(new Path(childName));
        return new AckUserWrite(newEmptyPath(), childTree, this.revert);
      }
    }
  };
  var ListenComplete = class {
    constructor(source, path) {
      this.source = source;
      this.path = path;
      this.type = OperationType.LISTEN_COMPLETE;
    }
    operationForChild(childName) {
      if (pathIsEmpty(this.path)) {
        return new ListenComplete(this.source, newEmptyPath());
      } else {
        return new ListenComplete(this.source, pathPopFront(this.path));
      }
    }
  };
  var Overwrite = class {
    constructor(source, path, snap) {
      this.source = source;
      this.path = path;
      this.snap = snap;
      this.type = OperationType.OVERWRITE;
    }
    operationForChild(childName) {
      if (pathIsEmpty(this.path)) {
        return new Overwrite(this.source, newEmptyPath(), this.snap.getImmediateChild(childName));
      } else {
        return new Overwrite(this.source, pathPopFront(this.path), this.snap);
      }
    }
  };
  var Merge = class {
    constructor(source, path, children) {
      this.source = source;
      this.path = path;
      this.children = children;
      this.type = OperationType.MERGE;
    }
    operationForChild(childName) {
      if (pathIsEmpty(this.path)) {
        const childTree = this.children.subtree(new Path(childName));
        if (childTree.isEmpty()) {
          return null;
        } else if (childTree.value) {
          return new Overwrite(this.source, newEmptyPath(), childTree.value);
        } else {
          return new Merge(this.source, newEmptyPath(), childTree);
        }
      } else {
        assert(pathGetFront(this.path) === childName, "Can't get a merge for a child not on the path of the operation");
        return new Merge(this.source, pathPopFront(this.path), this.children);
      }
    }
    toString() {
      return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")";
    }
  };
  var CacheNode = class {
    constructor(node_, fullyInitialized_, filtered_) {
      this.node_ = node_;
      this.fullyInitialized_ = fullyInitialized_;
      this.filtered_ = filtered_;
    }
    isFullyInitialized() {
      return this.fullyInitialized_;
    }
    isFiltered() {
      return this.filtered_;
    }
    isCompleteForPath(path) {
      if (pathIsEmpty(path)) {
        return this.isFullyInitialized() && !this.filtered_;
      }
      const childKey = pathGetFront(path);
      return this.isCompleteForChild(childKey);
    }
    isCompleteForChild(key) {
      return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(key);
    }
    getNode() {
      return this.node_;
    }
  };
  var EventGenerator = class {
    constructor(query_) {
      this.query_ = query_;
      this.index_ = this.query_._queryParams.getIndex();
    }
  };
  function eventGeneratorGenerateEventsForChanges(eventGenerator, changes, eventCache, eventRegistrations) {
    const events = [];
    const moves = [];
    changes.forEach((change) => {
      if (change.type === "child_changed" && eventGenerator.index_.indexedValueChanged(change.oldSnap, change.snapshotNode)) {
        moves.push(changeChildMoved(change.childName, change.snapshotNode));
      }
    });
    eventGeneratorGenerateEventsForType(eventGenerator, events, "child_removed", changes, eventRegistrations, eventCache);
    eventGeneratorGenerateEventsForType(eventGenerator, events, "child_added", changes, eventRegistrations, eventCache);
    eventGeneratorGenerateEventsForType(eventGenerator, events, "child_moved", moves, eventRegistrations, eventCache);
    eventGeneratorGenerateEventsForType(eventGenerator, events, "child_changed", changes, eventRegistrations, eventCache);
    eventGeneratorGenerateEventsForType(eventGenerator, events, "value", changes, eventRegistrations, eventCache);
    return events;
  }
  function eventGeneratorGenerateEventsForType(eventGenerator, events, eventType, changes, registrations, eventCache) {
    const filteredChanges = changes.filter((change) => change.type === eventType);
    filteredChanges.sort((a2, b2) => eventGeneratorCompareChanges(eventGenerator, a2, b2));
    filteredChanges.forEach((change) => {
      const materializedChange = eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache);
      registrations.forEach((registration) => {
        if (registration.respondsTo(change.type)) {
          events.push(registration.createEvent(materializedChange, eventGenerator.query_));
        }
      });
    });
  }
  function eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache) {
    if (change.type === "value" || change.type === "child_removed") {
      return change;
    } else {
      change.prevName = eventCache.getPredecessorChildName(change.childName, change.snapshotNode, eventGenerator.index_);
      return change;
    }
  }
  function eventGeneratorCompareChanges(eventGenerator, a2, b2) {
    if (a2.childName == null || b2.childName == null) {
      throw assertionError("Should only compare child_ events.");
    }
    const aWrapped = new NamedNode(a2.childName, a2.snapshotNode);
    const bWrapped = new NamedNode(b2.childName, b2.snapshotNode);
    return eventGenerator.index_.compare(aWrapped, bWrapped);
  }
  function newViewCache(eventCache, serverCache) {
    return { eventCache, serverCache };
  }
  function viewCacheUpdateEventSnap(viewCache, eventSnap, complete, filtered) {
    return newViewCache(new CacheNode(eventSnap, complete, filtered), viewCache.serverCache);
  }
  function viewCacheUpdateServerSnap(viewCache, serverSnap, complete, filtered) {
    return newViewCache(viewCache.eventCache, new CacheNode(serverSnap, complete, filtered));
  }
  function viewCacheGetCompleteEventSnap(viewCache) {
    return viewCache.eventCache.isFullyInitialized() ? viewCache.eventCache.getNode() : null;
  }
  function viewCacheGetCompleteServerSnap(viewCache) {
    return viewCache.serverCache.isFullyInitialized() ? viewCache.serverCache.getNode() : null;
  }
  var emptyChildrenSingleton;
  var EmptyChildren = () => {
    if (!emptyChildrenSingleton) {
      emptyChildrenSingleton = new SortedMap(stringCompare);
    }
    return emptyChildrenSingleton;
  };
  var ImmutableTree = class {
    constructor(value, children = EmptyChildren()) {
      this.value = value;
      this.children = children;
    }
    static fromObject(obj) {
      let tree = new ImmutableTree(null);
      each(obj, (childPath, childSnap) => {
        tree = tree.set(new Path(childPath), childSnap);
      });
      return tree;
    }
    isEmpty() {
      return this.value === null && this.children.isEmpty();
    }
    findRootMostMatchingPathAndValue(relativePath, predicate) {
      if (this.value != null && predicate(this.value)) {
        return { path: newEmptyPath(), value: this.value };
      } else {
        if (pathIsEmpty(relativePath)) {
          return null;
        } else {
          const front = pathGetFront(relativePath);
          const child2 = this.children.get(front);
          if (child2 !== null) {
            const childExistingPathAndValue = child2.findRootMostMatchingPathAndValue(pathPopFront(relativePath), predicate);
            if (childExistingPathAndValue != null) {
              const fullPath = pathChild(new Path(front), childExistingPathAndValue.path);
              return { path: fullPath, value: childExistingPathAndValue.value };
            } else {
              return null;
            }
          } else {
            return null;
          }
        }
      }
    }
    findRootMostValueAndPath(relativePath) {
      return this.findRootMostMatchingPathAndValue(relativePath, () => true);
    }
    subtree(relativePath) {
      if (pathIsEmpty(relativePath)) {
        return this;
      } else {
        const front = pathGetFront(relativePath);
        const childTree = this.children.get(front);
        if (childTree !== null) {
          return childTree.subtree(pathPopFront(relativePath));
        } else {
          return new ImmutableTree(null);
        }
      }
    }
    set(relativePath, toSet) {
      if (pathIsEmpty(relativePath)) {
        return new ImmutableTree(toSet, this.children);
      } else {
        const front = pathGetFront(relativePath);
        const child2 = this.children.get(front) || new ImmutableTree(null);
        const newChild = child2.set(pathPopFront(relativePath), toSet);
        const newChildren = this.children.insert(front, newChild);
        return new ImmutableTree(this.value, newChildren);
      }
    }
    remove(relativePath) {
      if (pathIsEmpty(relativePath)) {
        if (this.children.isEmpty()) {
          return new ImmutableTree(null);
        } else {
          return new ImmutableTree(null, this.children);
        }
      } else {
        const front = pathGetFront(relativePath);
        const child2 = this.children.get(front);
        if (child2) {
          const newChild = child2.remove(pathPopFront(relativePath));
          let newChildren;
          if (newChild.isEmpty()) {
            newChildren = this.children.remove(front);
          } else {
            newChildren = this.children.insert(front, newChild);
          }
          if (this.value === null && newChildren.isEmpty()) {
            return new ImmutableTree(null);
          } else {
            return new ImmutableTree(this.value, newChildren);
          }
        } else {
          return this;
        }
      }
    }
    get(relativePath) {
      if (pathIsEmpty(relativePath)) {
        return this.value;
      } else {
        const front = pathGetFront(relativePath);
        const child2 = this.children.get(front);
        if (child2) {
          return child2.get(pathPopFront(relativePath));
        } else {
          return null;
        }
      }
    }
    setTree(relativePath, newTree) {
      if (pathIsEmpty(relativePath)) {
        return newTree;
      } else {
        const front = pathGetFront(relativePath);
        const child2 = this.children.get(front) || new ImmutableTree(null);
        const newChild = child2.setTree(pathPopFront(relativePath), newTree);
        let newChildren;
        if (newChild.isEmpty()) {
          newChildren = this.children.remove(front);
        } else {
          newChildren = this.children.insert(front, newChild);
        }
        return new ImmutableTree(this.value, newChildren);
      }
    }
    fold(fn2) {
      return this.fold_(newEmptyPath(), fn2);
    }
    fold_(pathSoFar, fn2) {
      const accum = {};
      this.children.inorderTraversal((childKey, childTree) => {
        accum[childKey] = childTree.fold_(pathChild(pathSoFar, childKey), fn2);
      });
      return fn2(pathSoFar, this.value, accum);
    }
    findOnPath(path, f3) {
      return this.findOnPath_(path, newEmptyPath(), f3);
    }
    findOnPath_(pathToFollow, pathSoFar, f3) {
      const result = this.value ? f3(pathSoFar, this.value) : false;
      if (result) {
        return result;
      } else {
        if (pathIsEmpty(pathToFollow)) {
          return null;
        } else {
          const front = pathGetFront(pathToFollow);
          const nextChild = this.children.get(front);
          if (nextChild) {
            return nextChild.findOnPath_(pathPopFront(pathToFollow), pathChild(pathSoFar, front), f3);
          } else {
            return null;
          }
        }
      }
    }
    foreachOnPath(path, f3) {
      return this.foreachOnPath_(path, newEmptyPath(), f3);
    }
    foreachOnPath_(pathToFollow, currentRelativePath, f3) {
      if (pathIsEmpty(pathToFollow)) {
        return this;
      } else {
        if (this.value) {
          f3(currentRelativePath, this.value);
        }
        const front = pathGetFront(pathToFollow);
        const nextChild = this.children.get(front);
        if (nextChild) {
          return nextChild.foreachOnPath_(pathPopFront(pathToFollow), pathChild(currentRelativePath, front), f3);
        } else {
          return new ImmutableTree(null);
        }
      }
    }
    foreach(f3) {
      this.foreach_(newEmptyPath(), f3);
    }
    foreach_(currentRelativePath, f3) {
      this.children.inorderTraversal((childName, childTree) => {
        childTree.foreach_(pathChild(currentRelativePath, childName), f3);
      });
      if (this.value) {
        f3(currentRelativePath, this.value);
      }
    }
    foreachChild(f3) {
      this.children.inorderTraversal((childName, childTree) => {
        if (childTree.value) {
          f3(childName, childTree.value);
        }
      });
    }
  };
  var CompoundWrite = class {
    constructor(writeTree_) {
      this.writeTree_ = writeTree_;
    }
    static empty() {
      return new CompoundWrite(new ImmutableTree(null));
    }
  };
  function compoundWriteAddWrite(compoundWrite, path, node) {
    if (pathIsEmpty(path)) {
      return new CompoundWrite(new ImmutableTree(node));
    } else {
      const rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
      if (rootmost != null) {
        const rootMostPath = rootmost.path;
        let value = rootmost.value;
        const relativePath = newRelativePath(rootMostPath, path);
        value = value.updateChild(relativePath, node);
        return new CompoundWrite(compoundWrite.writeTree_.set(rootMostPath, value));
      } else {
        const subtree = new ImmutableTree(node);
        const newWriteTree2 = compoundWrite.writeTree_.setTree(path, subtree);
        return new CompoundWrite(newWriteTree2);
      }
    }
  }
  function compoundWriteAddWrites(compoundWrite, path, updates) {
    let newWrite = compoundWrite;
    each(updates, (childKey, node) => {
      newWrite = compoundWriteAddWrite(newWrite, pathChild(path, childKey), node);
    });
    return newWrite;
  }
  function compoundWriteRemoveWrite(compoundWrite, path) {
    if (pathIsEmpty(path)) {
      return CompoundWrite.empty();
    } else {
      const newWriteTree2 = compoundWrite.writeTree_.setTree(path, new ImmutableTree(null));
      return new CompoundWrite(newWriteTree2);
    }
  }
  function compoundWriteHasCompleteWrite(compoundWrite, path) {
    return compoundWriteGetCompleteNode(compoundWrite, path) != null;
  }
  function compoundWriteGetCompleteNode(compoundWrite, path) {
    const rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
    if (rootmost != null) {
      return compoundWrite.writeTree_.get(rootmost.path).getChild(newRelativePath(rootmost.path, path));
    } else {
      return null;
    }
  }
  function compoundWriteGetCompleteChildren(compoundWrite) {
    const children = [];
    const node = compoundWrite.writeTree_.value;
    if (node != null) {
      if (!node.isLeafNode()) {
        node.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
          children.push(new NamedNode(childName, childNode));
        });
      }
    } else {
      compoundWrite.writeTree_.children.inorderTraversal((childName, childTree) => {
        if (childTree.value != null) {
          children.push(new NamedNode(childName, childTree.value));
        }
      });
    }
    return children;
  }
  function compoundWriteChildCompoundWrite(compoundWrite, path) {
    if (pathIsEmpty(path)) {
      return compoundWrite;
    } else {
      const shadowingNode = compoundWriteGetCompleteNode(compoundWrite, path);
      if (shadowingNode != null) {
        return new CompoundWrite(new ImmutableTree(shadowingNode));
      } else {
        return new CompoundWrite(compoundWrite.writeTree_.subtree(path));
      }
    }
  }
  function compoundWriteIsEmpty(compoundWrite) {
    return compoundWrite.writeTree_.isEmpty();
  }
  function compoundWriteApply(compoundWrite, node) {
    return applySubtreeWrite(newEmptyPath(), compoundWrite.writeTree_, node);
  }
  function applySubtreeWrite(relativePath, writeTree, node) {
    if (writeTree.value != null) {
      return node.updateChild(relativePath, writeTree.value);
    } else {
      let priorityWrite = null;
      writeTree.children.inorderTraversal((childKey, childTree) => {
        if (childKey === ".priority") {
          assert(childTree.value !== null, "Priority writes must always be leaf nodes");
          priorityWrite = childTree.value;
        } else {
          node = applySubtreeWrite(pathChild(relativePath, childKey), childTree, node);
        }
      });
      if (!node.getChild(relativePath).isEmpty() && priorityWrite !== null) {
        node = node.updateChild(pathChild(relativePath, ".priority"), priorityWrite);
      }
      return node;
    }
  }
  function writeTreeChildWrites(writeTree, path) {
    return newWriteTreeRef(path, writeTree);
  }
  function writeTreeAddOverwrite(writeTree, path, snap, writeId, visible) {
    assert(writeId > writeTree.lastWriteId, "Stacking an older write on top of newer ones");
    if (visible === void 0) {
      visible = true;
    }
    writeTree.allWrites.push({
      path,
      snap,
      writeId,
      visible
    });
    if (visible) {
      writeTree.visibleWrites = compoundWriteAddWrite(writeTree.visibleWrites, path, snap);
    }
    writeTree.lastWriteId = writeId;
  }
  function writeTreeAddMerge(writeTree, path, changedChildren, writeId) {
    assert(writeId > writeTree.lastWriteId, "Stacking an older merge on top of newer ones");
    writeTree.allWrites.push({
      path,
      children: changedChildren,
      writeId,
      visible: true
    });
    writeTree.visibleWrites = compoundWriteAddWrites(writeTree.visibleWrites, path, changedChildren);
    writeTree.lastWriteId = writeId;
  }
  function writeTreeGetWrite(writeTree, writeId) {
    for (let i2 = 0; i2 < writeTree.allWrites.length; i2++) {
      const record = writeTree.allWrites[i2];
      if (record.writeId === writeId) {
        return record;
      }
    }
    return null;
  }
  function writeTreeRemoveWrite(writeTree, writeId) {
    const idx = writeTree.allWrites.findIndex((s2) => {
      return s2.writeId === writeId;
    });
    assert(idx >= 0, "removeWrite called with nonexistent writeId.");
    const writeToRemove = writeTree.allWrites[idx];
    writeTree.allWrites.splice(idx, 1);
    let removedWriteWasVisible = writeToRemove.visible;
    let removedWriteOverlapsWithOtherWrites = false;
    let i2 = writeTree.allWrites.length - 1;
    while (removedWriteWasVisible && i2 >= 0) {
      const currentWrite = writeTree.allWrites[i2];
      if (currentWrite.visible) {
        if (i2 >= idx && writeTreeRecordContainsPath_(currentWrite, writeToRemove.path)) {
          removedWriteWasVisible = false;
        } else if (pathContains(writeToRemove.path, currentWrite.path)) {
          removedWriteOverlapsWithOtherWrites = true;
        }
      }
      i2--;
    }
    if (!removedWriteWasVisible) {
      return false;
    } else if (removedWriteOverlapsWithOtherWrites) {
      writeTreeResetTree_(writeTree);
      return true;
    } else {
      if (writeToRemove.snap) {
        writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, writeToRemove.path);
      } else {
        const children = writeToRemove.children;
        each(children, (childName) => {
          writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, pathChild(writeToRemove.path, childName));
        });
      }
      return true;
    }
  }
  function writeTreeRecordContainsPath_(writeRecord, path) {
    if (writeRecord.snap) {
      return pathContains(writeRecord.path, path);
    } else {
      for (const childName in writeRecord.children) {
        if (writeRecord.children.hasOwnProperty(childName) && pathContains(pathChild(writeRecord.path, childName), path)) {
          return true;
        }
      }
      return false;
    }
  }
  function writeTreeResetTree_(writeTree) {
    writeTree.visibleWrites = writeTreeLayerTree_(writeTree.allWrites, writeTreeDefaultFilter_, newEmptyPath());
    if (writeTree.allWrites.length > 0) {
      writeTree.lastWriteId = writeTree.allWrites[writeTree.allWrites.length - 1].writeId;
    } else {
      writeTree.lastWriteId = -1;
    }
  }
  function writeTreeDefaultFilter_(write) {
    return write.visible;
  }
  function writeTreeLayerTree_(writes, filter, treeRoot) {
    let compoundWrite = CompoundWrite.empty();
    for (let i2 = 0; i2 < writes.length; ++i2) {
      const write = writes[i2];
      if (filter(write)) {
        const writePath = write.path;
        let relativePath;
        if (write.snap) {
          if (pathContains(treeRoot, writePath)) {
            relativePath = newRelativePath(treeRoot, writePath);
            compoundWrite = compoundWriteAddWrite(compoundWrite, relativePath, write.snap);
          } else if (pathContains(writePath, treeRoot)) {
            relativePath = newRelativePath(writePath, treeRoot);
            compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), write.snap.getChild(relativePath));
          } else
            ;
        } else if (write.children) {
          if (pathContains(treeRoot, writePath)) {
            relativePath = newRelativePath(treeRoot, writePath);
            compoundWrite = compoundWriteAddWrites(compoundWrite, relativePath, write.children);
          } else if (pathContains(writePath, treeRoot)) {
            relativePath = newRelativePath(writePath, treeRoot);
            if (pathIsEmpty(relativePath)) {
              compoundWrite = compoundWriteAddWrites(compoundWrite, newEmptyPath(), write.children);
            } else {
              const child2 = safeGet(write.children, pathGetFront(relativePath));
              if (child2) {
                const deepNode = child2.getChild(pathPopFront(relativePath));
                compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), deepNode);
              }
            }
          } else
            ;
        } else {
          throw assertionError("WriteRecord should have .snap or .children");
        }
      }
    }
    return compoundWrite;
  }
  function writeTreeCalcCompleteEventCache(writeTree, treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
    if (!writeIdsToExclude && !includeHiddenWrites) {
      const shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
      if (shadowingNode != null) {
        return shadowingNode;
      } else {
        const subMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
        if (compoundWriteIsEmpty(subMerge)) {
          return completeServerCache;
        } else if (completeServerCache == null && !compoundWriteHasCompleteWrite(subMerge, newEmptyPath())) {
          return null;
        } else {
          const layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
          return compoundWriteApply(subMerge, layeredCache);
        }
      }
    } else {
      const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
      if (!includeHiddenWrites && compoundWriteIsEmpty(merge)) {
        return completeServerCache;
      } else {
        if (!includeHiddenWrites && completeServerCache == null && !compoundWriteHasCompleteWrite(merge, newEmptyPath())) {
          return null;
        } else {
          const filter = function(write) {
            return (write.visible || includeHiddenWrites) && (!writeIdsToExclude || !~writeIdsToExclude.indexOf(write.writeId)) && (pathContains(write.path, treePath) || pathContains(treePath, write.path));
          };
          const mergeAtPath = writeTreeLayerTree_(writeTree.allWrites, filter, treePath);
          const layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
          return compoundWriteApply(mergeAtPath, layeredCache);
        }
      }
    }
  }
  function writeTreeCalcCompleteEventChildren(writeTree, treePath, completeServerChildren) {
    let completeChildren = ChildrenNode.EMPTY_NODE;
    const topLevelSet = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
    if (topLevelSet) {
      if (!topLevelSet.isLeafNode()) {
        topLevelSet.forEachChild(PRIORITY_INDEX, (childName, childSnap) => {
          completeChildren = completeChildren.updateImmediateChild(childName, childSnap);
        });
      }
      return completeChildren;
    } else if (completeServerChildren) {
      const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
      completeServerChildren.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
        const node = compoundWriteApply(compoundWriteChildCompoundWrite(merge, new Path(childName)), childNode);
        completeChildren = completeChildren.updateImmediateChild(childName, node);
      });
      compoundWriteGetCompleteChildren(merge).forEach((namedNode) => {
        completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
      });
      return completeChildren;
    } else {
      const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
      compoundWriteGetCompleteChildren(merge).forEach((namedNode) => {
        completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
      });
      return completeChildren;
    }
  }
  function writeTreeCalcEventCacheAfterServerOverwrite(writeTree, treePath, childPath, existingEventSnap, existingServerSnap) {
    assert(existingEventSnap || existingServerSnap, "Either existingEventSnap or existingServerSnap must exist");
    const path = pathChild(treePath, childPath);
    if (compoundWriteHasCompleteWrite(writeTree.visibleWrites, path)) {
      return null;
    } else {
      const childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
      if (compoundWriteIsEmpty(childMerge)) {
        return existingServerSnap.getChild(childPath);
      } else {
        return compoundWriteApply(childMerge, existingServerSnap.getChild(childPath));
      }
    }
  }
  function writeTreeCalcCompleteChild(writeTree, treePath, childKey, existingServerSnap) {
    const path = pathChild(treePath, childKey);
    const shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
    if (shadowingNode != null) {
      return shadowingNode;
    } else {
      if (existingServerSnap.isCompleteForChild(childKey)) {
        const childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
        return compoundWriteApply(childMerge, existingServerSnap.getNode().getImmediateChild(childKey));
      } else {
        return null;
      }
    }
  }
  function writeTreeShadowingWrite(writeTree, path) {
    return compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
  }
  function writeTreeCalcIndexedSlice(writeTree, treePath, completeServerData, startPost, count, reverse, index) {
    let toIterate;
    const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
    const shadowingNode = compoundWriteGetCompleteNode(merge, newEmptyPath());
    if (shadowingNode != null) {
      toIterate = shadowingNode;
    } else if (completeServerData != null) {
      toIterate = compoundWriteApply(merge, completeServerData);
    } else {
      return [];
    }
    toIterate = toIterate.withIndex(index);
    if (!toIterate.isEmpty() && !toIterate.isLeafNode()) {
      const nodes = [];
      const cmp = index.getCompare();
      const iter = reverse ? toIterate.getReverseIteratorFrom(startPost, index) : toIterate.getIteratorFrom(startPost, index);
      let next = iter.getNext();
      while (next && nodes.length < count) {
        if (cmp(next, startPost) !== 0) {
          nodes.push(next);
        }
        next = iter.getNext();
      }
      return nodes;
    } else {
      return [];
    }
  }
  function newWriteTree() {
    return {
      visibleWrites: CompoundWrite.empty(),
      allWrites: [],
      lastWriteId: -1
    };
  }
  function writeTreeRefCalcCompleteEventCache(writeTreeRef, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
    return writeTreeCalcCompleteEventCache(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites);
  }
  function writeTreeRefCalcCompleteEventChildren(writeTreeRef, completeServerChildren) {
    return writeTreeCalcCompleteEventChildren(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerChildren);
  }
  function writeTreeRefCalcEventCacheAfterServerOverwrite(writeTreeRef, path, existingEventSnap, existingServerSnap) {
    return writeTreeCalcEventCacheAfterServerOverwrite(writeTreeRef.writeTree, writeTreeRef.treePath, path, existingEventSnap, existingServerSnap);
  }
  function writeTreeRefShadowingWrite(writeTreeRef, path) {
    return writeTreeShadowingWrite(writeTreeRef.writeTree, pathChild(writeTreeRef.treePath, path));
  }
  function writeTreeRefCalcIndexedSlice(writeTreeRef, completeServerData, startPost, count, reverse, index) {
    return writeTreeCalcIndexedSlice(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerData, startPost, count, reverse, index);
  }
  function writeTreeRefCalcCompleteChild(writeTreeRef, childKey, existingServerCache) {
    return writeTreeCalcCompleteChild(writeTreeRef.writeTree, writeTreeRef.treePath, childKey, existingServerCache);
  }
  function writeTreeRefChild(writeTreeRef, childName) {
    return newWriteTreeRef(pathChild(writeTreeRef.treePath, childName), writeTreeRef.writeTree);
  }
  function newWriteTreeRef(path, writeTree) {
    return {
      treePath: path,
      writeTree
    };
  }
  var ChildChangeAccumulator = class {
    constructor() {
      this.changeMap = /* @__PURE__ */ new Map();
    }
    trackChildChange(change) {
      const type = change.type;
      const childKey = change.childName;
      assert(type === "child_added" || type === "child_changed" || type === "child_removed", "Only child changes supported for tracking");
      assert(childKey !== ".priority", "Only non-priority child changes can be tracked.");
      const oldChange = this.changeMap.get(childKey);
      if (oldChange) {
        const oldType = oldChange.type;
        if (type === "child_added" && oldType === "child_removed") {
          this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.snapshotNode));
        } else if (type === "child_removed" && oldType === "child_added") {
          this.changeMap.delete(childKey);
        } else if (type === "child_removed" && oldType === "child_changed") {
          this.changeMap.set(childKey, changeChildRemoved(childKey, oldChange.oldSnap));
        } else if (type === "child_changed" && oldType === "child_added") {
          this.changeMap.set(childKey, changeChildAdded(childKey, change.snapshotNode));
        } else if (type === "child_changed" && oldType === "child_changed") {
          this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.oldSnap));
        } else {
          throw assertionError("Illegal combination of changes: " + change + " occurred after " + oldChange);
        }
      } else {
        this.changeMap.set(childKey, change);
      }
    }
    getChanges() {
      return Array.from(this.changeMap.values());
    }
  };
  var NoCompleteChildSource_ = class {
    getCompleteChild(childKey) {
      return null;
    }
    getChildAfterChild(index, child2, reverse) {
      return null;
    }
  };
  var NO_COMPLETE_CHILD_SOURCE = new NoCompleteChildSource_();
  var WriteTreeCompleteChildSource = class {
    constructor(writes_, viewCache_, optCompleteServerCache_ = null) {
      this.writes_ = writes_;
      this.viewCache_ = viewCache_;
      this.optCompleteServerCache_ = optCompleteServerCache_;
    }
    getCompleteChild(childKey) {
      const node = this.viewCache_.eventCache;
      if (node.isCompleteForChild(childKey)) {
        return node.getNode().getImmediateChild(childKey);
      } else {
        const serverNode = this.optCompleteServerCache_ != null ? new CacheNode(this.optCompleteServerCache_, true, false) : this.viewCache_.serverCache;
        return writeTreeRefCalcCompleteChild(this.writes_, childKey, serverNode);
      }
    }
    getChildAfterChild(index, child2, reverse) {
      const completeServerData = this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : viewCacheGetCompleteServerSnap(this.viewCache_);
      const nodes = writeTreeRefCalcIndexedSlice(this.writes_, completeServerData, child2, 1, reverse, index);
      if (nodes.length === 0) {
        return null;
      } else {
        return nodes[0];
      }
    }
  };
  function newViewProcessor(filter) {
    return { filter };
  }
  function viewProcessorAssertIndexed(viewProcessor, viewCache) {
    assert(viewCache.eventCache.getNode().isIndexed(viewProcessor.filter.getIndex()), "Event snap not indexed");
    assert(viewCache.serverCache.getNode().isIndexed(viewProcessor.filter.getIndex()), "Server snap not indexed");
  }
  function viewProcessorApplyOperation(viewProcessor, oldViewCache, operation, writesCache, completeCache) {
    const accumulator = new ChildChangeAccumulator();
    let newViewCache2, filterServerNode;
    if (operation.type === OperationType.OVERWRITE) {
      const overwrite = operation;
      if (overwrite.source.fromUser) {
        newViewCache2 = viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, accumulator);
      } else {
        assert(overwrite.source.fromServer, "Unknown source.");
        filterServerNode = overwrite.source.tagged || oldViewCache.serverCache.isFiltered() && !pathIsEmpty(overwrite.path);
        newViewCache2 = viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, filterServerNode, accumulator);
      }
    } else if (operation.type === OperationType.MERGE) {
      const merge = operation;
      if (merge.source.fromUser) {
        newViewCache2 = viewProcessorApplyUserMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, accumulator);
      } else {
        assert(merge.source.fromServer, "Unknown source.");
        filterServerNode = merge.source.tagged || oldViewCache.serverCache.isFiltered();
        newViewCache2 = viewProcessorApplyServerMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, filterServerNode, accumulator);
      }
    } else if (operation.type === OperationType.ACK_USER_WRITE) {
      const ackUserWrite = operation;
      if (!ackUserWrite.revert) {
        newViewCache2 = viewProcessorAckUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, ackUserWrite.affectedTree, writesCache, completeCache, accumulator);
      } else {
        newViewCache2 = viewProcessorRevertUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, writesCache, completeCache, accumulator);
      }
    } else if (operation.type === OperationType.LISTEN_COMPLETE) {
      newViewCache2 = viewProcessorListenComplete(viewProcessor, oldViewCache, operation.path, writesCache, accumulator);
    } else {
      throw assertionError("Unknown operation type: " + operation.type);
    }
    const changes = accumulator.getChanges();
    viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache2, changes);
    return { viewCache: newViewCache2, changes };
  }
  function viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache2, accumulator) {
    const eventSnap = newViewCache2.eventCache;
    if (eventSnap.isFullyInitialized()) {
      const isLeafOrEmpty = eventSnap.getNode().isLeafNode() || eventSnap.getNode().isEmpty();
      const oldCompleteSnap = viewCacheGetCompleteEventSnap(oldViewCache);
      if (accumulator.length > 0 || !oldViewCache.eventCache.isFullyInitialized() || isLeafOrEmpty && !eventSnap.getNode().equals(oldCompleteSnap) || !eventSnap.getNode().getPriority().equals(oldCompleteSnap.getPriority())) {
        accumulator.push(changeValue(viewCacheGetCompleteEventSnap(newViewCache2)));
      }
    }
  }
  function viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, viewCache, changePath, writesCache, source, accumulator) {
    const oldEventSnap = viewCache.eventCache;
    if (writeTreeRefShadowingWrite(writesCache, changePath) != null) {
      return viewCache;
    } else {
      let newEventCache, serverNode;
      if (pathIsEmpty(changePath)) {
        assert(viewCache.serverCache.isFullyInitialized(), "If change path is empty, we must have complete server data");
        if (viewCache.serverCache.isFiltered()) {
          const serverCache = viewCacheGetCompleteServerSnap(viewCache);
          const completeChildren = serverCache instanceof ChildrenNode ? serverCache : ChildrenNode.EMPTY_NODE;
          const completeEventChildren = writeTreeRefCalcCompleteEventChildren(writesCache, completeChildren);
          newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeEventChildren, accumulator);
        } else {
          const completeNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
          newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeNode, accumulator);
        }
      } else {
        const childKey = pathGetFront(changePath);
        if (childKey === ".priority") {
          assert(pathGetLength(changePath) === 1, "Can't have a priority with additional path components");
          const oldEventNode = oldEventSnap.getNode();
          serverNode = viewCache.serverCache.getNode();
          const updatedPriority = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventNode, serverNode);
          if (updatedPriority != null) {
            newEventCache = viewProcessor.filter.updatePriority(oldEventNode, updatedPriority);
          } else {
            newEventCache = oldEventSnap.getNode();
          }
        } else {
          const childChangePath = pathPopFront(changePath);
          let newEventChild;
          if (oldEventSnap.isCompleteForChild(childKey)) {
            serverNode = viewCache.serverCache.getNode();
            const eventChildUpdate = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventSnap.getNode(), serverNode);
            if (eventChildUpdate != null) {
              newEventChild = oldEventSnap.getNode().getImmediateChild(childKey).updateChild(childChangePath, eventChildUpdate);
            } else {
              newEventChild = oldEventSnap.getNode().getImmediateChild(childKey);
            }
          } else {
            newEventChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
          }
          if (newEventChild != null) {
            newEventCache = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newEventChild, childChangePath, source, accumulator);
          } else {
            newEventCache = oldEventSnap.getNode();
          }
        }
      }
      return viewCacheUpdateEventSnap(viewCache, newEventCache, oldEventSnap.isFullyInitialized() || pathIsEmpty(changePath), viewProcessor.filter.filtersNodes());
    }
  }
  function viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, filterServerNode, accumulator) {
    const oldServerSnap = oldViewCache.serverCache;
    let newServerCache;
    const serverFilter = filterServerNode ? viewProcessor.filter : viewProcessor.filter.getIndexedFilter();
    if (pathIsEmpty(changePath)) {
      newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), changedSnap, null);
    } else if (serverFilter.filtersNodes() && !oldServerSnap.isFiltered()) {
      const newServerNode = oldServerSnap.getNode().updateChild(changePath, changedSnap);
      newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), newServerNode, null);
    } else {
      const childKey = pathGetFront(changePath);
      if (!oldServerSnap.isCompleteForPath(changePath) && pathGetLength(changePath) > 1) {
        return oldViewCache;
      }
      const childChangePath = pathPopFront(changePath);
      const childNode = oldServerSnap.getNode().getImmediateChild(childKey);
      const newChildNode = childNode.updateChild(childChangePath, changedSnap);
      if (childKey === ".priority") {
        newServerCache = serverFilter.updatePriority(oldServerSnap.getNode(), newChildNode);
      } else {
        newServerCache = serverFilter.updateChild(oldServerSnap.getNode(), childKey, newChildNode, childChangePath, NO_COMPLETE_CHILD_SOURCE, null);
      }
    }
    const newViewCache2 = viewCacheUpdateServerSnap(oldViewCache, newServerCache, oldServerSnap.isFullyInitialized() || pathIsEmpty(changePath), serverFilter.filtersNodes());
    const source = new WriteTreeCompleteChildSource(writesCache, newViewCache2, completeCache);
    return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache2, changePath, writesCache, source, accumulator);
  }
  function viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, accumulator) {
    const oldEventSnap = oldViewCache.eventCache;
    let newViewCache2, newEventCache;
    const source = new WriteTreeCompleteChildSource(writesCache, oldViewCache, completeCache);
    if (pathIsEmpty(changePath)) {
      newEventCache = viewProcessor.filter.updateFullNode(oldViewCache.eventCache.getNode(), changedSnap, accumulator);
      newViewCache2 = viewCacheUpdateEventSnap(oldViewCache, newEventCache, true, viewProcessor.filter.filtersNodes());
    } else {
      const childKey = pathGetFront(changePath);
      if (childKey === ".priority") {
        newEventCache = viewProcessor.filter.updatePriority(oldViewCache.eventCache.getNode(), changedSnap);
        newViewCache2 = viewCacheUpdateEventSnap(oldViewCache, newEventCache, oldEventSnap.isFullyInitialized(), oldEventSnap.isFiltered());
      } else {
        const childChangePath = pathPopFront(changePath);
        const oldChild = oldEventSnap.getNode().getImmediateChild(childKey);
        let newChild;
        if (pathIsEmpty(childChangePath)) {
          newChild = changedSnap;
        } else {
          const childNode = source.getCompleteChild(childKey);
          if (childNode != null) {
            if (pathGetBack(childChangePath) === ".priority" && childNode.getChild(pathParent(childChangePath)).isEmpty()) {
              newChild = childNode;
            } else {
              newChild = childNode.updateChild(childChangePath, changedSnap);
            }
          } else {
            newChild = ChildrenNode.EMPTY_NODE;
          }
        }
        if (!oldChild.equals(newChild)) {
          const newEventSnap = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newChild, childChangePath, source, accumulator);
          newViewCache2 = viewCacheUpdateEventSnap(oldViewCache, newEventSnap, oldEventSnap.isFullyInitialized(), viewProcessor.filter.filtersNodes());
        } else {
          newViewCache2 = oldViewCache;
        }
      }
    }
    return newViewCache2;
  }
  function viewProcessorCacheHasChild(viewCache, childKey) {
    return viewCache.eventCache.isCompleteForChild(childKey);
  }
  function viewProcessorApplyUserMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, accumulator) {
    let curViewCache = viewCache;
    changedChildren.foreach((relativePath, childNode) => {
      const writePath = pathChild(path, relativePath);
      if (viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) {
        curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
      }
    });
    changedChildren.foreach((relativePath, childNode) => {
      const writePath = pathChild(path, relativePath);
      if (!viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) {
        curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
      }
    });
    return curViewCache;
  }
  function viewProcessorApplyMerge(viewProcessor, node, merge) {
    merge.foreach((relativePath, childNode) => {
      node = node.updateChild(relativePath, childNode);
    });
    return node;
  }
  function viewProcessorApplyServerMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, filterServerNode, accumulator) {
    if (viewCache.serverCache.getNode().isEmpty() && !viewCache.serverCache.isFullyInitialized()) {
      return viewCache;
    }
    let curViewCache = viewCache;
    let viewMergeTree;
    if (pathIsEmpty(path)) {
      viewMergeTree = changedChildren;
    } else {
      viewMergeTree = new ImmutableTree(null).setTree(path, changedChildren);
    }
    const serverNode = viewCache.serverCache.getNode();
    viewMergeTree.children.inorderTraversal((childKey, childTree) => {
      if (serverNode.hasChild(childKey)) {
        const serverChild = viewCache.serverCache.getNode().getImmediateChild(childKey);
        const newChild = viewProcessorApplyMerge(viewProcessor, serverChild, childTree);
        curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
      }
    });
    viewMergeTree.children.inorderTraversal((childKey, childMergeTree) => {
      const isUnknownDeepMerge = !viewCache.serverCache.isCompleteForChild(childKey) && childMergeTree.value === null;
      if (!serverNode.hasChild(childKey) && !isUnknownDeepMerge) {
        const serverChild = viewCache.serverCache.getNode().getImmediateChild(childKey);
        const newChild = viewProcessorApplyMerge(viewProcessor, serverChild, childMergeTree);
        curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
      }
    });
    return curViewCache;
  }
  function viewProcessorAckUserWrite(viewProcessor, viewCache, ackPath, affectedTree, writesCache, completeCache, accumulator) {
    if (writeTreeRefShadowingWrite(writesCache, ackPath) != null) {
      return viewCache;
    }
    const filterServerNode = viewCache.serverCache.isFiltered();
    const serverCache = viewCache.serverCache;
    if (affectedTree.value != null) {
      if (pathIsEmpty(ackPath) && serverCache.isFullyInitialized() || serverCache.isCompleteForPath(ackPath)) {
        return viewProcessorApplyServerOverwrite(viewProcessor, viewCache, ackPath, serverCache.getNode().getChild(ackPath), writesCache, completeCache, filterServerNode, accumulator);
      } else if (pathIsEmpty(ackPath)) {
        let changedChildren = new ImmutableTree(null);
        serverCache.getNode().forEachChild(KEY_INDEX, (name5, node) => {
          changedChildren = changedChildren.set(new Path(name5), node);
        });
        return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
      } else {
        return viewCache;
      }
    } else {
      let changedChildren = new ImmutableTree(null);
      affectedTree.foreach((mergePath, value) => {
        const serverCachePath = pathChild(ackPath, mergePath);
        if (serverCache.isCompleteForPath(serverCachePath)) {
          changedChildren = changedChildren.set(mergePath, serverCache.getNode().getChild(serverCachePath));
        }
      });
      return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
    }
  }
  function viewProcessorListenComplete(viewProcessor, viewCache, path, writesCache, accumulator) {
    const oldServerNode = viewCache.serverCache;
    const newViewCache2 = viewCacheUpdateServerSnap(viewCache, oldServerNode.getNode(), oldServerNode.isFullyInitialized() || pathIsEmpty(path), oldServerNode.isFiltered());
    return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache2, path, writesCache, NO_COMPLETE_CHILD_SOURCE, accumulator);
  }
  function viewProcessorRevertUserWrite(viewProcessor, viewCache, path, writesCache, completeServerCache, accumulator) {
    let complete;
    if (writeTreeRefShadowingWrite(writesCache, path) != null) {
      return viewCache;
    } else {
      const source = new WriteTreeCompleteChildSource(writesCache, viewCache, completeServerCache);
      const oldEventCache = viewCache.eventCache.getNode();
      let newEventCache;
      if (pathIsEmpty(path) || pathGetFront(path) === ".priority") {
        let newNode;
        if (viewCache.serverCache.isFullyInitialized()) {
          newNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
        } else {
          const serverChildren = viewCache.serverCache.getNode();
          assert(serverChildren instanceof ChildrenNode, "serverChildren would be complete if leaf node");
          newNode = writeTreeRefCalcCompleteEventChildren(writesCache, serverChildren);
        }
        newNode = newNode;
        newEventCache = viewProcessor.filter.updateFullNode(oldEventCache, newNode, accumulator);
      } else {
        const childKey = pathGetFront(path);
        let newChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
        if (newChild == null && viewCache.serverCache.isCompleteForChild(childKey)) {
          newChild = oldEventCache.getImmediateChild(childKey);
        }
        if (newChild != null) {
          newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, newChild, pathPopFront(path), source, accumulator);
        } else if (viewCache.eventCache.getNode().hasChild(childKey)) {
          newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, ChildrenNode.EMPTY_NODE, pathPopFront(path), source, accumulator);
        } else {
          newEventCache = oldEventCache;
        }
        if (newEventCache.isEmpty() && viewCache.serverCache.isFullyInitialized()) {
          complete = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
          if (complete.isLeafNode()) {
            newEventCache = viewProcessor.filter.updateFullNode(newEventCache, complete, accumulator);
          }
        }
      }
      complete = viewCache.serverCache.isFullyInitialized() || writeTreeRefShadowingWrite(writesCache, newEmptyPath()) != null;
      return viewCacheUpdateEventSnap(viewCache, newEventCache, complete, viewProcessor.filter.filtersNodes());
    }
  }
  var View = class {
    constructor(query_, initialViewCache) {
      this.query_ = query_;
      this.eventRegistrations_ = [];
      const params = this.query_._queryParams;
      const indexFilter = new IndexedFilter(params.getIndex());
      const filter = queryParamsGetNodeFilter(params);
      this.processor_ = newViewProcessor(filter);
      const initialServerCache = initialViewCache.serverCache;
      const initialEventCache = initialViewCache.eventCache;
      const serverSnap = indexFilter.updateFullNode(ChildrenNode.EMPTY_NODE, initialServerCache.getNode(), null);
      const eventSnap = filter.updateFullNode(ChildrenNode.EMPTY_NODE, initialEventCache.getNode(), null);
      const newServerCache = new CacheNode(serverSnap, initialServerCache.isFullyInitialized(), indexFilter.filtersNodes());
      const newEventCache = new CacheNode(eventSnap, initialEventCache.isFullyInitialized(), filter.filtersNodes());
      this.viewCache_ = newViewCache(newEventCache, newServerCache);
      this.eventGenerator_ = new EventGenerator(this.query_);
    }
    get query() {
      return this.query_;
    }
  };
  function viewGetServerCache(view) {
    return view.viewCache_.serverCache.getNode();
  }
  function viewGetCompleteNode(view) {
    return viewCacheGetCompleteEventSnap(view.viewCache_);
  }
  function viewGetCompleteServerCache(view, path) {
    const cache = viewCacheGetCompleteServerSnap(view.viewCache_);
    if (cache) {
      if (view.query._queryParams.loadsAllData() || !pathIsEmpty(path) && !cache.getImmediateChild(pathGetFront(path)).isEmpty()) {
        return cache.getChild(path);
      }
    }
    return null;
  }
  function viewIsEmpty(view) {
    return view.eventRegistrations_.length === 0;
  }
  function viewAddEventRegistration(view, eventRegistration) {
    view.eventRegistrations_.push(eventRegistration);
  }
  function viewRemoveEventRegistration(view, eventRegistration, cancelError) {
    const cancelEvents = [];
    if (cancelError) {
      assert(eventRegistration == null, "A cancel should cancel all event registrations.");
      const path = view.query._path;
      view.eventRegistrations_.forEach((registration) => {
        const maybeEvent = registration.createCancelEvent(cancelError, path);
        if (maybeEvent) {
          cancelEvents.push(maybeEvent);
        }
      });
    }
    if (eventRegistration) {
      let remaining = [];
      for (let i2 = 0; i2 < view.eventRegistrations_.length; ++i2) {
        const existing = view.eventRegistrations_[i2];
        if (!existing.matches(eventRegistration)) {
          remaining.push(existing);
        } else if (eventRegistration.hasAnyCallback()) {
          remaining = remaining.concat(view.eventRegistrations_.slice(i2 + 1));
          break;
        }
      }
      view.eventRegistrations_ = remaining;
    } else {
      view.eventRegistrations_ = [];
    }
    return cancelEvents;
  }
  function viewApplyOperation(view, operation, writesCache, completeServerCache) {
    if (operation.type === OperationType.MERGE && operation.source.queryId !== null) {
      assert(viewCacheGetCompleteServerSnap(view.viewCache_), "We should always have a full cache before handling merges");
      assert(viewCacheGetCompleteEventSnap(view.viewCache_), "Missing event cache, even though we have a server cache");
    }
    const oldViewCache = view.viewCache_;
    const result = viewProcessorApplyOperation(view.processor_, oldViewCache, operation, writesCache, completeServerCache);
    viewProcessorAssertIndexed(view.processor_, result.viewCache);
    assert(result.viewCache.serverCache.isFullyInitialized() || !oldViewCache.serverCache.isFullyInitialized(), "Once a server snap is complete, it should never go back");
    view.viewCache_ = result.viewCache;
    return viewGenerateEventsForChanges_(view, result.changes, result.viewCache.eventCache.getNode(), null);
  }
  function viewGetInitialEvents(view, registration) {
    const eventSnap = view.viewCache_.eventCache;
    const initialChanges = [];
    if (!eventSnap.getNode().isLeafNode()) {
      const eventNode = eventSnap.getNode();
      eventNode.forEachChild(PRIORITY_INDEX, (key, childNode) => {
        initialChanges.push(changeChildAdded(key, childNode));
      });
    }
    if (eventSnap.isFullyInitialized()) {
      initialChanges.push(changeValue(eventSnap.getNode()));
    }
    return viewGenerateEventsForChanges_(view, initialChanges, eventSnap.getNode(), registration);
  }
  function viewGenerateEventsForChanges_(view, changes, eventCache, eventRegistration) {
    const registrations = eventRegistration ? [eventRegistration] : view.eventRegistrations_;
    return eventGeneratorGenerateEventsForChanges(view.eventGenerator_, changes, eventCache, registrations);
  }
  var referenceConstructor$1;
  var SyncPoint = class {
    constructor() {
      this.views = /* @__PURE__ */ new Map();
    }
  };
  function syncPointSetReferenceConstructor(val) {
    assert(!referenceConstructor$1, "__referenceConstructor has already been defined");
    referenceConstructor$1 = val;
  }
  function syncPointGetReferenceConstructor() {
    assert(referenceConstructor$1, "Reference.ts has not been loaded");
    return referenceConstructor$1;
  }
  function syncPointIsEmpty(syncPoint) {
    return syncPoint.views.size === 0;
  }
  function syncPointApplyOperation(syncPoint, operation, writesCache, optCompleteServerCache) {
    const queryId = operation.source.queryId;
    if (queryId !== null) {
      const view = syncPoint.views.get(queryId);
      assert(view != null, "SyncTree gave us an op for an invalid query.");
      return viewApplyOperation(view, operation, writesCache, optCompleteServerCache);
    } else {
      let events = [];
      for (const view of syncPoint.views.values()) {
        events = events.concat(viewApplyOperation(view, operation, writesCache, optCompleteServerCache));
      }
      return events;
    }
  }
  function syncPointGetView(syncPoint, query2, writesCache, serverCache, serverCacheComplete) {
    const queryId = query2._queryIdentifier;
    const view = syncPoint.views.get(queryId);
    if (!view) {
      let eventCache = writeTreeRefCalcCompleteEventCache(writesCache, serverCacheComplete ? serverCache : null);
      let eventCacheComplete = false;
      if (eventCache) {
        eventCacheComplete = true;
      } else if (serverCache instanceof ChildrenNode) {
        eventCache = writeTreeRefCalcCompleteEventChildren(writesCache, serverCache);
        eventCacheComplete = false;
      } else {
        eventCache = ChildrenNode.EMPTY_NODE;
        eventCacheComplete = false;
      }
      const viewCache = newViewCache(new CacheNode(eventCache, eventCacheComplete, false), new CacheNode(serverCache, serverCacheComplete, false));
      return new View(query2, viewCache);
    }
    return view;
  }
  function syncPointAddEventRegistration(syncPoint, query2, eventRegistration, writesCache, serverCache, serverCacheComplete) {
    const view = syncPointGetView(syncPoint, query2, writesCache, serverCache, serverCacheComplete);
    if (!syncPoint.views.has(query2._queryIdentifier)) {
      syncPoint.views.set(query2._queryIdentifier, view);
    }
    viewAddEventRegistration(view, eventRegistration);
    return viewGetInitialEvents(view, eventRegistration);
  }
  function syncPointRemoveEventRegistration(syncPoint, query2, eventRegistration, cancelError) {
    const queryId = query2._queryIdentifier;
    const removed = [];
    let cancelEvents = [];
    const hadCompleteView = syncPointHasCompleteView(syncPoint);
    if (queryId === "default") {
      for (const [viewQueryId, view] of syncPoint.views.entries()) {
        cancelEvents = cancelEvents.concat(viewRemoveEventRegistration(view, eventRegistration, cancelError));
        if (viewIsEmpty(view)) {
          syncPoint.views.delete(viewQueryId);
          if (!view.query._queryParams.loadsAllData()) {
            removed.push(view.query);
          }
        }
      }
    } else {
      const view = syncPoint.views.get(queryId);
      if (view) {
        cancelEvents = cancelEvents.concat(viewRemoveEventRegistration(view, eventRegistration, cancelError));
        if (viewIsEmpty(view)) {
          syncPoint.views.delete(queryId);
          if (!view.query._queryParams.loadsAllData()) {
            removed.push(view.query);
          }
        }
      }
    }
    if (hadCompleteView && !syncPointHasCompleteView(syncPoint)) {
      removed.push(new (syncPointGetReferenceConstructor())(query2._repo, query2._path));
    }
    return { removed, events: cancelEvents };
  }
  function syncPointGetQueryViews(syncPoint) {
    const result = [];
    for (const view of syncPoint.views.values()) {
      if (!view.query._queryParams.loadsAllData()) {
        result.push(view);
      }
    }
    return result;
  }
  function syncPointGetCompleteServerCache(syncPoint, path) {
    let serverCache = null;
    for (const view of syncPoint.views.values()) {
      serverCache = serverCache || viewGetCompleteServerCache(view, path);
    }
    return serverCache;
  }
  function syncPointViewForQuery(syncPoint, query2) {
    const params = query2._queryParams;
    if (params.loadsAllData()) {
      return syncPointGetCompleteView(syncPoint);
    } else {
      const queryId = query2._queryIdentifier;
      return syncPoint.views.get(queryId);
    }
  }
  function syncPointViewExistsForQuery(syncPoint, query2) {
    return syncPointViewForQuery(syncPoint, query2) != null;
  }
  function syncPointHasCompleteView(syncPoint) {
    return syncPointGetCompleteView(syncPoint) != null;
  }
  function syncPointGetCompleteView(syncPoint) {
    for (const view of syncPoint.views.values()) {
      if (view.query._queryParams.loadsAllData()) {
        return view;
      }
    }
    return null;
  }
  var referenceConstructor;
  function syncTreeSetReferenceConstructor(val) {
    assert(!referenceConstructor, "__referenceConstructor has already been defined");
    referenceConstructor = val;
  }
  function syncTreeGetReferenceConstructor() {
    assert(referenceConstructor, "Reference.ts has not been loaded");
    return referenceConstructor;
  }
  var syncTreeNextQueryTag_ = 1;
  var SyncTree = class {
    constructor(listenProvider_) {
      this.listenProvider_ = listenProvider_;
      this.syncPointTree_ = new ImmutableTree(null);
      this.pendingWriteTree_ = newWriteTree();
      this.tagToQueryMap = /* @__PURE__ */ new Map();
      this.queryToTagMap = /* @__PURE__ */ new Map();
    }
  };
  function syncTreeApplyUserOverwrite(syncTree, path, newData, writeId, visible) {
    writeTreeAddOverwrite(syncTree.pendingWriteTree_, path, newData, writeId, visible);
    if (!visible) {
      return [];
    } else {
      return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceUser(), path, newData));
    }
  }
  function syncTreeApplyUserMerge(syncTree, path, changedChildren, writeId) {
    writeTreeAddMerge(syncTree.pendingWriteTree_, path, changedChildren, writeId);
    const changeTree = ImmutableTree.fromObject(changedChildren);
    return syncTreeApplyOperationToSyncPoints_(syncTree, new Merge(newOperationSourceUser(), path, changeTree));
  }
  function syncTreeAckUserWrite(syncTree, writeId, revert = false) {
    const write = writeTreeGetWrite(syncTree.pendingWriteTree_, writeId);
    const needToReevaluate = writeTreeRemoveWrite(syncTree.pendingWriteTree_, writeId);
    if (!needToReevaluate) {
      return [];
    } else {
      let affectedTree = new ImmutableTree(null);
      if (write.snap != null) {
        affectedTree = affectedTree.set(newEmptyPath(), true);
      } else {
        each(write.children, (pathString) => {
          affectedTree = affectedTree.set(new Path(pathString), true);
        });
      }
      return syncTreeApplyOperationToSyncPoints_(syncTree, new AckUserWrite(write.path, affectedTree, revert));
    }
  }
  function syncTreeApplyServerOverwrite(syncTree, path, newData) {
    return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceServer(), path, newData));
  }
  function syncTreeApplyServerMerge(syncTree, path, changedChildren) {
    const changeTree = ImmutableTree.fromObject(changedChildren);
    return syncTreeApplyOperationToSyncPoints_(syncTree, new Merge(newOperationSourceServer(), path, changeTree));
  }
  function syncTreeApplyListenComplete(syncTree, path) {
    return syncTreeApplyOperationToSyncPoints_(syncTree, new ListenComplete(newOperationSourceServer(), path));
  }
  function syncTreeApplyTaggedListenComplete(syncTree, path, tag) {
    const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
    if (queryKey) {
      const r2 = syncTreeParseQueryKey_(queryKey);
      const queryPath = r2.path, queryId = r2.queryId;
      const relativePath = newRelativePath(queryPath, path);
      const op = new ListenComplete(newOperationSourceServerTaggedQuery(queryId), relativePath);
      return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
    } else {
      return [];
    }
  }
  function syncTreeRemoveEventRegistration(syncTree, query2, eventRegistration, cancelError, skipListenerDedup = false) {
    const path = query2._path;
    const maybeSyncPoint = syncTree.syncPointTree_.get(path);
    let cancelEvents = [];
    if (maybeSyncPoint && (query2._queryIdentifier === "default" || syncPointViewExistsForQuery(maybeSyncPoint, query2))) {
      const removedAndEvents = syncPointRemoveEventRegistration(maybeSyncPoint, query2, eventRegistration, cancelError);
      if (syncPointIsEmpty(maybeSyncPoint)) {
        syncTree.syncPointTree_ = syncTree.syncPointTree_.remove(path);
      }
      const removed = removedAndEvents.removed;
      cancelEvents = removedAndEvents.events;
      if (!skipListenerDedup) {
        const removingDefault = -1 !== removed.findIndex((query3) => {
          return query3._queryParams.loadsAllData();
        });
        const covered = syncTree.syncPointTree_.findOnPath(path, (relativePath, parentSyncPoint) => syncPointHasCompleteView(parentSyncPoint));
        if (removingDefault && !covered) {
          const subtree = syncTree.syncPointTree_.subtree(path);
          if (!subtree.isEmpty()) {
            const newViews = syncTreeCollectDistinctViewsForSubTree_(subtree);
            for (let i2 = 0; i2 < newViews.length; ++i2) {
              const view = newViews[i2], newQuery = view.query;
              const listener = syncTreeCreateListenerForView_(syncTree, view);
              syncTree.listenProvider_.startListening(syncTreeQueryForListening_(newQuery), syncTreeTagForQuery(syncTree, newQuery), listener.hashFn, listener.onComplete);
            }
          }
        }
        if (!covered && removed.length > 0 && !cancelError) {
          if (removingDefault) {
            const defaultTag = null;
            syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(query2), defaultTag);
          } else {
            removed.forEach((queryToRemove) => {
              const tagToRemove = syncTree.queryToTagMap.get(syncTreeMakeQueryKey_(queryToRemove));
              syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToRemove), tagToRemove);
            });
          }
        }
      }
      syncTreeRemoveTags_(syncTree, removed);
    }
    return cancelEvents;
  }
  function syncTreeApplyTaggedQueryOverwrite(syncTree, path, snap, tag) {
    const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
    if (queryKey != null) {
      const r2 = syncTreeParseQueryKey_(queryKey);
      const queryPath = r2.path, queryId = r2.queryId;
      const relativePath = newRelativePath(queryPath, path);
      const op = new Overwrite(newOperationSourceServerTaggedQuery(queryId), relativePath, snap);
      return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
    } else {
      return [];
    }
  }
  function syncTreeApplyTaggedQueryMerge(syncTree, path, changedChildren, tag) {
    const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
    if (queryKey) {
      const r2 = syncTreeParseQueryKey_(queryKey);
      const queryPath = r2.path, queryId = r2.queryId;
      const relativePath = newRelativePath(queryPath, path);
      const changeTree = ImmutableTree.fromObject(changedChildren);
      const op = new Merge(newOperationSourceServerTaggedQuery(queryId), relativePath, changeTree);
      return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
    } else {
      return [];
    }
  }
  function syncTreeAddEventRegistration(syncTree, query2, eventRegistration, skipSetupListener = false) {
    const path = query2._path;
    let serverCache = null;
    let foundAncestorDefaultView = false;
    syncTree.syncPointTree_.foreachOnPath(path, (pathToSyncPoint, sp) => {
      const relativePath = newRelativePath(pathToSyncPoint, path);
      serverCache = serverCache || syncPointGetCompleteServerCache(sp, relativePath);
      foundAncestorDefaultView = foundAncestorDefaultView || syncPointHasCompleteView(sp);
    });
    let syncPoint = syncTree.syncPointTree_.get(path);
    if (!syncPoint) {
      syncPoint = new SyncPoint();
      syncTree.syncPointTree_ = syncTree.syncPointTree_.set(path, syncPoint);
    } else {
      foundAncestorDefaultView = foundAncestorDefaultView || syncPointHasCompleteView(syncPoint);
      serverCache = serverCache || syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
    }
    let serverCacheComplete;
    if (serverCache != null) {
      serverCacheComplete = true;
    } else {
      serverCacheComplete = false;
      serverCache = ChildrenNode.EMPTY_NODE;
      const subtree = syncTree.syncPointTree_.subtree(path);
      subtree.foreachChild((childName, childSyncPoint) => {
        const completeCache = syncPointGetCompleteServerCache(childSyncPoint, newEmptyPath());
        if (completeCache) {
          serverCache = serverCache.updateImmediateChild(childName, completeCache);
        }
      });
    }
    const viewAlreadyExists = syncPointViewExistsForQuery(syncPoint, query2);
    if (!viewAlreadyExists && !query2._queryParams.loadsAllData()) {
      const queryKey = syncTreeMakeQueryKey_(query2);
      assert(!syncTree.queryToTagMap.has(queryKey), "View does not exist, but we have a tag");
      const tag = syncTreeGetNextQueryTag_();
      syncTree.queryToTagMap.set(queryKey, tag);
      syncTree.tagToQueryMap.set(tag, queryKey);
    }
    const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, path);
    let events = syncPointAddEventRegistration(syncPoint, query2, eventRegistration, writesCache, serverCache, serverCacheComplete);
    if (!viewAlreadyExists && !foundAncestorDefaultView && !skipSetupListener) {
      const view = syncPointViewForQuery(syncPoint, query2);
      events = events.concat(syncTreeSetupListener_(syncTree, query2, view));
    }
    return events;
  }
  function syncTreeCalcCompleteEventCache(syncTree, path, writeIdsToExclude) {
    const includeHiddenSets = true;
    const writeTree = syncTree.pendingWriteTree_;
    const serverCache = syncTree.syncPointTree_.findOnPath(path, (pathSoFar, syncPoint) => {
      const relativePath = newRelativePath(pathSoFar, path);
      const serverCache2 = syncPointGetCompleteServerCache(syncPoint, relativePath);
      if (serverCache2) {
        return serverCache2;
      }
    });
    return writeTreeCalcCompleteEventCache(writeTree, path, serverCache, writeIdsToExclude, includeHiddenSets);
  }
  function syncTreeGetServerValue(syncTree, query2) {
    const path = query2._path;
    let serverCache = null;
    syncTree.syncPointTree_.foreachOnPath(path, (pathToSyncPoint, sp) => {
      const relativePath = newRelativePath(pathToSyncPoint, path);
      serverCache = serverCache || syncPointGetCompleteServerCache(sp, relativePath);
    });
    let syncPoint = syncTree.syncPointTree_.get(path);
    if (!syncPoint) {
      syncPoint = new SyncPoint();
      syncTree.syncPointTree_ = syncTree.syncPointTree_.set(path, syncPoint);
    } else {
      serverCache = serverCache || syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
    }
    const serverCacheComplete = serverCache != null;
    const serverCacheNode = serverCacheComplete ? new CacheNode(serverCache, true, false) : null;
    const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, query2._path);
    const view = syncPointGetView(syncPoint, query2, writesCache, serverCacheComplete ? serverCacheNode.getNode() : ChildrenNode.EMPTY_NODE, serverCacheComplete);
    return viewGetCompleteNode(view);
  }
  function syncTreeApplyOperationToSyncPoints_(syncTree, operation) {
    return syncTreeApplyOperationHelper_(
      operation,
      syncTree.syncPointTree_,
      null,
      writeTreeChildWrites(syncTree.pendingWriteTree_, newEmptyPath())
    );
  }
  function syncTreeApplyOperationHelper_(operation, syncPointTree, serverCache, writesCache) {
    if (pathIsEmpty(operation.path)) {
      return syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache);
    } else {
      const syncPoint = syncPointTree.get(newEmptyPath());
      if (serverCache == null && syncPoint != null) {
        serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
      }
      let events = [];
      const childName = pathGetFront(operation.path);
      const childOperation = operation.operationForChild(childName);
      const childTree = syncPointTree.children.get(childName);
      if (childTree && childOperation) {
        const childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
        const childWritesCache = writeTreeRefChild(writesCache, childName);
        events = events.concat(syncTreeApplyOperationHelper_(childOperation, childTree, childServerCache, childWritesCache));
      }
      if (syncPoint) {
        events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
      }
      return events;
    }
  }
  function syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache) {
    const syncPoint = syncPointTree.get(newEmptyPath());
    if (serverCache == null && syncPoint != null) {
      serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
    }
    let events = [];
    syncPointTree.children.inorderTraversal((childName, childTree) => {
      const childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
      const childWritesCache = writeTreeRefChild(writesCache, childName);
      const childOperation = operation.operationForChild(childName);
      if (childOperation) {
        events = events.concat(syncTreeApplyOperationDescendantsHelper_(childOperation, childTree, childServerCache, childWritesCache));
      }
    });
    if (syncPoint) {
      events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
    }
    return events;
  }
  function syncTreeCreateListenerForView_(syncTree, view) {
    const query2 = view.query;
    const tag = syncTreeTagForQuery(syncTree, query2);
    return {
      hashFn: () => {
        const cache = viewGetServerCache(view) || ChildrenNode.EMPTY_NODE;
        return cache.hash();
      },
      onComplete: (status) => {
        if (status === "ok") {
          if (tag) {
            return syncTreeApplyTaggedListenComplete(syncTree, query2._path, tag);
          } else {
            return syncTreeApplyListenComplete(syncTree, query2._path);
          }
        } else {
          const error2 = errorForServerCode(status, query2);
          return syncTreeRemoveEventRegistration(
            syncTree,
            query2,
            null,
            error2
          );
        }
      }
    };
  }
  function syncTreeTagForQuery(syncTree, query2) {
    const queryKey = syncTreeMakeQueryKey_(query2);
    return syncTree.queryToTagMap.get(queryKey);
  }
  function syncTreeMakeQueryKey_(query2) {
    return query2._path.toString() + "$" + query2._queryIdentifier;
  }
  function syncTreeQueryKeyForTag_(syncTree, tag) {
    return syncTree.tagToQueryMap.get(tag);
  }
  function syncTreeParseQueryKey_(queryKey) {
    const splitIndex = queryKey.indexOf("$");
    assert(splitIndex !== -1 && splitIndex < queryKey.length - 1, "Bad queryKey.");
    return {
      queryId: queryKey.substr(splitIndex + 1),
      path: new Path(queryKey.substr(0, splitIndex))
    };
  }
  function syncTreeApplyTaggedOperation_(syncTree, queryPath, operation) {
    const syncPoint = syncTree.syncPointTree_.get(queryPath);
    assert(syncPoint, "Missing sync point for query tag that we're tracking");
    const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, queryPath);
    return syncPointApplyOperation(syncPoint, operation, writesCache, null);
  }
  function syncTreeCollectDistinctViewsForSubTree_(subtree) {
    return subtree.fold((relativePath, maybeChildSyncPoint, childMap) => {
      if (maybeChildSyncPoint && syncPointHasCompleteView(maybeChildSyncPoint)) {
        const completeView = syncPointGetCompleteView(maybeChildSyncPoint);
        return [completeView];
      } else {
        let views = [];
        if (maybeChildSyncPoint) {
          views = syncPointGetQueryViews(maybeChildSyncPoint);
        }
        each(childMap, (_key, childViews) => {
          views = views.concat(childViews);
        });
        return views;
      }
    });
  }
  function syncTreeQueryForListening_(query2) {
    if (query2._queryParams.loadsAllData() && !query2._queryParams.isDefault()) {
      return new (syncTreeGetReferenceConstructor())(query2._repo, query2._path);
    } else {
      return query2;
    }
  }
  function syncTreeRemoveTags_(syncTree, queries) {
    for (let j2 = 0; j2 < queries.length; ++j2) {
      const removedQuery = queries[j2];
      if (!removedQuery._queryParams.loadsAllData()) {
        const removedQueryKey = syncTreeMakeQueryKey_(removedQuery);
        const removedQueryTag = syncTree.queryToTagMap.get(removedQueryKey);
        syncTree.queryToTagMap.delete(removedQueryKey);
        syncTree.tagToQueryMap.delete(removedQueryTag);
      }
    }
  }
  function syncTreeGetNextQueryTag_() {
    return syncTreeNextQueryTag_++;
  }
  function syncTreeSetupListener_(syncTree, query2, view) {
    const path = query2._path;
    const tag = syncTreeTagForQuery(syncTree, query2);
    const listener = syncTreeCreateListenerForView_(syncTree, view);
    const events = syncTree.listenProvider_.startListening(syncTreeQueryForListening_(query2), tag, listener.hashFn, listener.onComplete);
    const subtree = syncTree.syncPointTree_.subtree(path);
    if (tag) {
      assert(!syncPointHasCompleteView(subtree.value), "If we're adding a query, it shouldn't be shadowed");
    } else {
      const queriesToStop = subtree.fold((relativePath, maybeChildSyncPoint, childMap) => {
        if (!pathIsEmpty(relativePath) && maybeChildSyncPoint && syncPointHasCompleteView(maybeChildSyncPoint)) {
          return [syncPointGetCompleteView(maybeChildSyncPoint).query];
        } else {
          let queries = [];
          if (maybeChildSyncPoint) {
            queries = queries.concat(syncPointGetQueryViews(maybeChildSyncPoint).map((view2) => view2.query));
          }
          each(childMap, (_key, childQueries) => {
            queries = queries.concat(childQueries);
          });
          return queries;
        }
      });
      for (let i2 = 0; i2 < queriesToStop.length; ++i2) {
        const queryToStop = queriesToStop[i2];
        syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToStop), syncTreeTagForQuery(syncTree, queryToStop));
      }
    }
    return events;
  }
  var ExistingValueProvider = class {
    constructor(node_) {
      this.node_ = node_;
    }
    getImmediateChild(childName) {
      const child2 = this.node_.getImmediateChild(childName);
      return new ExistingValueProvider(child2);
    }
    node() {
      return this.node_;
    }
  };
  var DeferredValueProvider = class {
    constructor(syncTree, path) {
      this.syncTree_ = syncTree;
      this.path_ = path;
    }
    getImmediateChild(childName) {
      const childPath = pathChild(this.path_, childName);
      return new DeferredValueProvider(this.syncTree_, childPath);
    }
    node() {
      return syncTreeCalcCompleteEventCache(this.syncTree_, this.path_);
    }
  };
  var generateWithValues = function(values) {
    values = values || {};
    values["timestamp"] = values["timestamp"] || new Date().getTime();
    return values;
  };
  var resolveDeferredLeafValue = function(value, existingVal, serverValues) {
    if (!value || typeof value !== "object") {
      return value;
    }
    assert(".sv" in value, "Unexpected leaf node or priority contents");
    if (typeof value[".sv"] === "string") {
      return resolveScalarDeferredValue(value[".sv"], existingVal, serverValues);
    } else if (typeof value[".sv"] === "object") {
      return resolveComplexDeferredValue(value[".sv"], existingVal);
    } else {
      assert(false, "Unexpected server value: " + JSON.stringify(value, null, 2));
    }
  };
  var resolveScalarDeferredValue = function(op, existing, serverValues) {
    switch (op) {
      case "timestamp":
        return serverValues["timestamp"];
      default:
        assert(false, "Unexpected server value: " + op);
    }
  };
  var resolveComplexDeferredValue = function(op, existing, unused) {
    if (!op.hasOwnProperty("increment")) {
      assert(false, "Unexpected server value: " + JSON.stringify(op, null, 2));
    }
    const delta = op["increment"];
    if (typeof delta !== "number") {
      assert(false, "Unexpected increment value: " + delta);
    }
    const existingNode = existing.node();
    assert(existingNode !== null && typeof existingNode !== "undefined", "Expected ChildrenNode.EMPTY_NODE for nulls");
    if (!existingNode.isLeafNode()) {
      return delta;
    }
    const leaf = existingNode;
    const existingVal = leaf.getValue();
    if (typeof existingVal !== "number") {
      return delta;
    }
    return existingVal + delta;
  };
  var resolveDeferredValueTree = function(path, node, syncTree, serverValues) {
    return resolveDeferredValue(node, new DeferredValueProvider(syncTree, path), serverValues);
  };
  var resolveDeferredValueSnapshot = function(node, existing, serverValues) {
    return resolveDeferredValue(node, new ExistingValueProvider(existing), serverValues);
  };
  function resolveDeferredValue(node, existingVal, serverValues) {
    const rawPri = node.getPriority().val();
    const priority = resolveDeferredLeafValue(rawPri, existingVal.getImmediateChild(".priority"), serverValues);
    let newNode;
    if (node.isLeafNode()) {
      const leafNode = node;
      const value = resolveDeferredLeafValue(leafNode.getValue(), existingVal, serverValues);
      if (value !== leafNode.getValue() || priority !== leafNode.getPriority().val()) {
        return new LeafNode(value, nodeFromJSON(priority));
      } else {
        return node;
      }
    } else {
      const childrenNode = node;
      newNode = childrenNode;
      if (priority !== childrenNode.getPriority().val()) {
        newNode = newNode.updatePriority(new LeafNode(priority));
      }
      childrenNode.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
        const newChildNode = resolveDeferredValue(childNode, existingVal.getImmediateChild(childName), serverValues);
        if (newChildNode !== childNode) {
          newNode = newNode.updateImmediateChild(childName, newChildNode);
        }
      });
      return newNode;
    }
  }
  var Tree = class {
    constructor(name5 = "", parent = null, node = { children: {}, childCount: 0 }) {
      this.name = name5;
      this.parent = parent;
      this.node = node;
    }
  };
  function treeSubTree(tree, pathObj) {
    let path = pathObj instanceof Path ? pathObj : new Path(pathObj);
    let child2 = tree, next = pathGetFront(path);
    while (next !== null) {
      const childNode = safeGet(child2.node.children, next) || {
        children: {},
        childCount: 0
      };
      child2 = new Tree(next, child2, childNode);
      path = pathPopFront(path);
      next = pathGetFront(path);
    }
    return child2;
  }
  function treeGetValue(tree) {
    return tree.node.value;
  }
  function treeSetValue(tree, value) {
    tree.node.value = value;
    treeUpdateParents(tree);
  }
  function treeHasChildren(tree) {
    return tree.node.childCount > 0;
  }
  function treeIsEmpty(tree) {
    return treeGetValue(tree) === void 0 && !treeHasChildren(tree);
  }
  function treeForEachChild(tree, action) {
    each(tree.node.children, (child2, childTree) => {
      action(new Tree(child2, tree, childTree));
    });
  }
  function treeForEachDescendant(tree, action, includeSelf, childrenFirst) {
    if (includeSelf && !childrenFirst) {
      action(tree);
    }
    treeForEachChild(tree, (child2) => {
      treeForEachDescendant(child2, action, true, childrenFirst);
    });
    if (includeSelf && childrenFirst) {
      action(tree);
    }
  }
  function treeForEachAncestor(tree, action, includeSelf) {
    let node = includeSelf ? tree : tree.parent;
    while (node !== null) {
      if (action(node)) {
        return true;
      }
      node = node.parent;
    }
    return false;
  }
  function treeGetPath(tree) {
    return new Path(tree.parent === null ? tree.name : treeGetPath(tree.parent) + "/" + tree.name);
  }
  function treeUpdateParents(tree) {
    if (tree.parent !== null) {
      treeUpdateChild(tree.parent, tree.name, tree);
    }
  }
  function treeUpdateChild(tree, childName, child2) {
    const childEmpty = treeIsEmpty(child2);
    const childExists = contains(tree.node.children, childName);
    if (childEmpty && childExists) {
      delete tree.node.children[childName];
      tree.node.childCount--;
      treeUpdateParents(tree);
    } else if (!childEmpty && !childExists) {
      tree.node.children[childName] = child2.node;
      tree.node.childCount++;
      treeUpdateParents(tree);
    }
  }
  var INVALID_KEY_REGEX_ = /[\[\].#$\/\u0000-\u001F\u007F]/;
  var INVALID_PATH_REGEX_ = /[\[\].#$\u0000-\u001F\u007F]/;
  var MAX_LEAF_SIZE_ = 10 * 1024 * 1024;
  var isValidKey2 = function(key) {
    return typeof key === "string" && key.length !== 0 && !INVALID_KEY_REGEX_.test(key);
  };
  var isValidPathString = function(pathString) {
    return typeof pathString === "string" && pathString.length !== 0 && !INVALID_PATH_REGEX_.test(pathString);
  };
  var isValidRootPathString = function(pathString) {
    if (pathString) {
      pathString = pathString.replace(/^\/*\.info(\/|$)/, "/");
    }
    return isValidPathString(pathString);
  };
  var isValidPriority = function(priority) {
    return priority === null || typeof priority === "string" || typeof priority === "number" && !isInvalidJSONNumber(priority) || priority && typeof priority === "object" && contains(priority, ".sv");
  };
  var validateFirebaseDataArg = function(fnName, value, path, optional) {
    if (optional && value === void 0) {
      return;
    }
    validateFirebaseData(errorPrefix(fnName, "value"), value, path);
  };
  var validateFirebaseData = function(errorPrefix2, data, path_) {
    const path = path_ instanceof Path ? new ValidationPath(path_, errorPrefix2) : path_;
    if (data === void 0) {
      throw new Error(errorPrefix2 + "contains undefined " + validationPathToErrorString(path));
    }
    if (typeof data === "function") {
      throw new Error(errorPrefix2 + "contains a function " + validationPathToErrorString(path) + " with contents = " + data.toString());
    }
    if (isInvalidJSONNumber(data)) {
      throw new Error(errorPrefix2 + "contains " + data.toString() + " " + validationPathToErrorString(path));
    }
    if (typeof data === "string" && data.length > MAX_LEAF_SIZE_ / 3 && stringLength(data) > MAX_LEAF_SIZE_) {
      throw new Error(errorPrefix2 + "contains a string greater than " + MAX_LEAF_SIZE_ + " utf8 bytes " + validationPathToErrorString(path) + " ('" + data.substring(0, 50) + "...')");
    }
    if (data && typeof data === "object") {
      let hasDotValue = false;
      let hasActualChild = false;
      each(data, (key, value) => {
        if (key === ".value") {
          hasDotValue = true;
        } else if (key !== ".priority" && key !== ".sv") {
          hasActualChild = true;
          if (!isValidKey2(key)) {
            throw new Error(errorPrefix2 + " contains an invalid key (" + key + ") " + validationPathToErrorString(path) + `.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);
          }
        }
        validationPathPush(path, key);
        validateFirebaseData(errorPrefix2, value, path);
        validationPathPop(path);
      });
      if (hasDotValue && hasActualChild) {
        throw new Error(errorPrefix2 + ' contains ".value" child ' + validationPathToErrorString(path) + " in addition to actual children.");
      }
    }
  };
  var validateFirebaseMergePaths = function(errorPrefix2, mergePaths) {
    let i2, curPath;
    for (i2 = 0; i2 < mergePaths.length; i2++) {
      curPath = mergePaths[i2];
      const keys = pathSlice(curPath);
      for (let j2 = 0; j2 < keys.length; j2++) {
        if (keys[j2] === ".priority" && j2 === keys.length - 1)
          ;
        else if (!isValidKey2(keys[j2])) {
          throw new Error(errorPrefix2 + "contains an invalid key (" + keys[j2] + ") in path " + curPath.toString() + `. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);
        }
      }
    }
    mergePaths.sort(pathCompare);
    let prevPath = null;
    for (i2 = 0; i2 < mergePaths.length; i2++) {
      curPath = mergePaths[i2];
      if (prevPath !== null && pathContains(prevPath, curPath)) {
        throw new Error(errorPrefix2 + "contains a path " + prevPath.toString() + " that is ancestor of another path " + curPath.toString());
      }
      prevPath = curPath;
    }
  };
  var validateFirebaseMergeDataArg = function(fnName, data, path, optional) {
    if (optional && data === void 0) {
      return;
    }
    const errorPrefix$1 = errorPrefix(fnName, "values");
    if (!(data && typeof data === "object") || Array.isArray(data)) {
      throw new Error(errorPrefix$1 + " must be an object containing the children to replace.");
    }
    const mergePaths = [];
    each(data, (key, value) => {
      const curPath = new Path(key);
      validateFirebaseData(errorPrefix$1, value, pathChild(path, curPath));
      if (pathGetBack(curPath) === ".priority") {
        if (!isValidPriority(value)) {
          throw new Error(errorPrefix$1 + "contains an invalid value for '" + curPath.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
        }
      }
      mergePaths.push(curPath);
    });
    validateFirebaseMergePaths(errorPrefix$1, mergePaths);
  };
  var validateKey = function(fnName, argumentName, key, optional) {
    if (optional && key === void 0) {
      return;
    }
    if (!isValidKey2(key)) {
      throw new Error(errorPrefix(fnName, argumentName) + 'was an invalid key = "' + key + `".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`);
    }
  };
  var validatePathString = function(fnName, argumentName, pathString, optional) {
    if (optional && pathString === void 0) {
      return;
    }
    if (!isValidPathString(pathString)) {
      throw new Error(errorPrefix(fnName, argumentName) + 'was an invalid path = "' + pathString + `". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`);
    }
  };
  var validateRootPathString = function(fnName, argumentName, pathString, optional) {
    if (pathString) {
      pathString = pathString.replace(/^\/*\.info(\/|$)/, "/");
    }
    validatePathString(fnName, argumentName, pathString, optional);
  };
  var validateWritablePath = function(fnName, path) {
    if (pathGetFront(path) === ".info") {
      throw new Error(fnName + " failed = Can't modify data under /.info/");
    }
  };
  var validateUrl = function(fnName, parsedUrl) {
    const pathString = parsedUrl.path.toString();
    if (!(typeof parsedUrl.repoInfo.host === "string") || parsedUrl.repoInfo.host.length === 0 || !isValidKey2(parsedUrl.repoInfo.namespace) && parsedUrl.repoInfo.host.split(":")[0] !== "localhost" || pathString.length !== 0 && !isValidRootPathString(pathString)) {
      throw new Error(errorPrefix(fnName, "url") + `must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`);
    }
  };
  var EventQueue = class {
    constructor() {
      this.eventLists_ = [];
      this.recursionDepth_ = 0;
    }
  };
  function eventQueueQueueEvents(eventQueue, eventDataList) {
    let currList = null;
    for (let i2 = 0; i2 < eventDataList.length; i2++) {
      const data = eventDataList[i2];
      const path = data.getPath();
      if (currList !== null && !pathEquals(path, currList.path)) {
        eventQueue.eventLists_.push(currList);
        currList = null;
      }
      if (currList === null) {
        currList = { events: [], path };
      }
      currList.events.push(data);
    }
    if (currList) {
      eventQueue.eventLists_.push(currList);
    }
  }
  function eventQueueRaiseEventsAtPath(eventQueue, path, eventDataList) {
    eventQueueQueueEvents(eventQueue, eventDataList);
    eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, (eventPath) => pathEquals(eventPath, path));
  }
  function eventQueueRaiseEventsForChangedPath(eventQueue, changedPath, eventDataList) {
    eventQueueQueueEvents(eventQueue, eventDataList);
    eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, (eventPath) => pathContains(eventPath, changedPath) || pathContains(changedPath, eventPath));
  }
  function eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, predicate) {
    eventQueue.recursionDepth_++;
    let sentAll = true;
    for (let i2 = 0; i2 < eventQueue.eventLists_.length; i2++) {
      const eventList = eventQueue.eventLists_[i2];
      if (eventList) {
        const eventPath = eventList.path;
        if (predicate(eventPath)) {
          eventListRaise(eventQueue.eventLists_[i2]);
          eventQueue.eventLists_[i2] = null;
        } else {
          sentAll = false;
        }
      }
    }
    if (sentAll) {
      eventQueue.eventLists_ = [];
    }
    eventQueue.recursionDepth_--;
  }
  function eventListRaise(eventList) {
    for (let i2 = 0; i2 < eventList.events.length; i2++) {
      const eventData = eventList.events[i2];
      if (eventData !== null) {
        eventList.events[i2] = null;
        const eventFn = eventData.getEventRunner();
        if (logger2) {
          log("event: " + eventData.toString());
        }
        exceptionGuard(eventFn);
      }
    }
  }
  var INTERRUPT_REASON = "repo_interrupt";
  var MAX_TRANSACTION_RETRIES = 25;
  var Repo = class {
    constructor(repoInfo_, forceRestClient_, authTokenProvider_, appCheckProvider_) {
      this.repoInfo_ = repoInfo_;
      this.forceRestClient_ = forceRestClient_;
      this.authTokenProvider_ = authTokenProvider_;
      this.appCheckProvider_ = appCheckProvider_;
      this.dataUpdateCount = 0;
      this.statsListener_ = null;
      this.eventQueue_ = new EventQueue();
      this.nextWriteId_ = 1;
      this.interceptServerDataCallback_ = null;
      this.onDisconnect_ = newSparseSnapshotTree();
      this.transactionQueueTree_ = new Tree();
      this.persistentConnection_ = null;
      this.key = this.repoInfo_.toURLString();
    }
    toString() {
      return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host;
    }
  };
  function repoStart(repo, appId, authOverride) {
    repo.stats_ = statsManagerGetCollection(repo.repoInfo_);
    if (repo.forceRestClient_ || beingCrawled()) {
      repo.server_ = new ReadonlyRestClient(repo.repoInfo_, (pathString, data, isMerge, tag) => {
        repoOnDataUpdate(repo, pathString, data, isMerge, tag);
      }, repo.authTokenProvider_, repo.appCheckProvider_);
      setTimeout(() => repoOnConnectStatus(repo, true), 0);
    } else {
      if (typeof authOverride !== "undefined" && authOverride !== null) {
        if (typeof authOverride !== "object") {
          throw new Error("Only objects are supported for option databaseAuthVariableOverride");
        }
        try {
          stringify2(authOverride);
        } catch (e) {
          throw new Error("Invalid authOverride provided: " + e);
        }
      }
      repo.persistentConnection_ = new PersistentConnection(repo.repoInfo_, appId, (pathString, data, isMerge, tag) => {
        repoOnDataUpdate(repo, pathString, data, isMerge, tag);
      }, (connectStatus) => {
        repoOnConnectStatus(repo, connectStatus);
      }, (updates) => {
        repoOnServerInfoUpdate(repo, updates);
      }, repo.authTokenProvider_, repo.appCheckProvider_, authOverride);
      repo.server_ = repo.persistentConnection_;
    }
    repo.authTokenProvider_.addTokenChangeListener((token) => {
      repo.server_.refreshAuthToken(token);
    });
    repo.appCheckProvider_.addTokenChangeListener((result) => {
      repo.server_.refreshAppCheckToken(result.token);
    });
    repo.statsReporter_ = statsManagerGetOrCreateReporter(repo.repoInfo_, () => new StatsReporter(repo.stats_, repo.server_));
    repo.infoData_ = new SnapshotHolder();
    repo.infoSyncTree_ = new SyncTree({
      startListening: (query2, tag, currentHashFn, onComplete) => {
        let infoEvents = [];
        const node = repo.infoData_.getNode(query2._path);
        if (!node.isEmpty()) {
          infoEvents = syncTreeApplyServerOverwrite(repo.infoSyncTree_, query2._path, node);
          setTimeout(() => {
            onComplete("ok");
          }, 0);
        }
        return infoEvents;
      },
      stopListening: () => {
      }
    });
    repoUpdateInfo(repo, "connected", false);
    repo.serverSyncTree_ = new SyncTree({
      startListening: (query2, tag, currentHashFn, onComplete) => {
        repo.server_.listen(query2, currentHashFn, tag, (status, data) => {
          const events = onComplete(status, data);
          eventQueueRaiseEventsForChangedPath(repo.eventQueue_, query2._path, events);
        });
        return [];
      },
      stopListening: (query2, tag) => {
        repo.server_.unlisten(query2, tag);
      }
    });
  }
  function repoServerTime(repo) {
    const offsetNode = repo.infoData_.getNode(new Path(".info/serverTimeOffset"));
    const offset = offsetNode.val() || 0;
    return new Date().getTime() + offset;
  }
  function repoGenerateServerValues(repo) {
    return generateWithValues({
      timestamp: repoServerTime(repo)
    });
  }
  function repoOnDataUpdate(repo, pathString, data, isMerge, tag) {
    repo.dataUpdateCount++;
    const path = new Path(pathString);
    data = repo.interceptServerDataCallback_ ? repo.interceptServerDataCallback_(pathString, data) : data;
    let events = [];
    if (tag) {
      if (isMerge) {
        const taggedChildren = map(data, (raw) => nodeFromJSON(raw));
        events = syncTreeApplyTaggedQueryMerge(repo.serverSyncTree_, path, taggedChildren, tag);
      } else {
        const taggedSnap = nodeFromJSON(data);
        events = syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_, path, taggedSnap, tag);
      }
    } else if (isMerge) {
      const changedChildren = map(data, (raw) => nodeFromJSON(raw));
      events = syncTreeApplyServerMerge(repo.serverSyncTree_, path, changedChildren);
    } else {
      const snap = nodeFromJSON(data);
      events = syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap);
    }
    let affectedPath = path;
    if (events.length > 0) {
      affectedPath = repoRerunTransactions(repo, path);
    }
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, events);
  }
  function repoOnConnectStatus(repo, connectStatus) {
    repoUpdateInfo(repo, "connected", connectStatus);
    if (connectStatus === false) {
      repoRunOnDisconnectEvents(repo);
    }
  }
  function repoOnServerInfoUpdate(repo, updates) {
    each(updates, (key, value) => {
      repoUpdateInfo(repo, key, value);
    });
  }
  function repoUpdateInfo(repo, pathString, value) {
    const path = new Path("/.info/" + pathString);
    const newNode = nodeFromJSON(value);
    repo.infoData_.updateSnapshot(path, newNode);
    const events = syncTreeApplyServerOverwrite(repo.infoSyncTree_, path, newNode);
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
  }
  function repoGetNextWriteId(repo) {
    return repo.nextWriteId_++;
  }
  function repoGetValue(repo, query2, eventRegistration) {
    const cached = syncTreeGetServerValue(repo.serverSyncTree_, query2);
    if (cached != null) {
      return Promise.resolve(cached);
    }
    return repo.server_.get(query2).then((payload) => {
      const node = nodeFromJSON(payload).withIndex(query2._queryParams.getIndex());
      syncTreeAddEventRegistration(repo.serverSyncTree_, query2, eventRegistration, true);
      let events;
      if (query2._queryParams.loadsAllData()) {
        events = syncTreeApplyServerOverwrite(repo.serverSyncTree_, query2._path, node);
      } else {
        const tag = syncTreeTagForQuery(repo.serverSyncTree_, query2);
        events = syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_, query2._path, node, tag);
      }
      eventQueueRaiseEventsForChangedPath(repo.eventQueue_, query2._path, events);
      syncTreeRemoveEventRegistration(repo.serverSyncTree_, query2, eventRegistration, null, true);
      return node;
    }, (err) => {
      repoLog(repo, "get for query " + stringify2(query2) + " failed: " + err);
      return Promise.reject(new Error(err));
    });
  }
  function repoSetWithPriority(repo, path, newVal, newPriority, onComplete) {
    repoLog(repo, "set", {
      path: path.toString(),
      value: newVal,
      priority: newPriority
    });
    const serverValues = repoGenerateServerValues(repo);
    const newNodeUnresolved = nodeFromJSON(newVal, newPriority);
    const existing = syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path);
    const newNode = resolveDeferredValueSnapshot(newNodeUnresolved, existing, serverValues);
    const writeId = repoGetNextWriteId(repo);
    const events = syncTreeApplyUserOverwrite(repo.serverSyncTree_, path, newNode, writeId, true);
    eventQueueQueueEvents(repo.eventQueue_, events);
    repo.server_.put(path.toString(), newNodeUnresolved.val(true), (status, errorReason) => {
      const success = status === "ok";
      if (!success) {
        warn("set at " + path + " failed: " + status);
      }
      const clearEvents = syncTreeAckUserWrite(repo.serverSyncTree_, writeId, !success);
      eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, clearEvents);
      repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
    });
    const affectedPath = repoAbortTransactions(repo, path);
    repoRerunTransactions(repo, affectedPath);
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, []);
  }
  function repoUpdate(repo, path, childrenToMerge, onComplete) {
    repoLog(repo, "update", { path: path.toString(), value: childrenToMerge });
    let empty = true;
    const serverValues = repoGenerateServerValues(repo);
    const changedChildren = {};
    each(childrenToMerge, (changedKey, changedValue) => {
      empty = false;
      changedChildren[changedKey] = resolveDeferredValueTree(pathChild(path, changedKey), nodeFromJSON(changedValue), repo.serverSyncTree_, serverValues);
    });
    if (!empty) {
      const writeId = repoGetNextWriteId(repo);
      const events = syncTreeApplyUserMerge(repo.serverSyncTree_, path, changedChildren, writeId);
      eventQueueQueueEvents(repo.eventQueue_, events);
      repo.server_.merge(path.toString(), childrenToMerge, (status, errorReason) => {
        const success = status === "ok";
        if (!success) {
          warn("update at " + path + " failed: " + status);
        }
        const clearEvents = syncTreeAckUserWrite(repo.serverSyncTree_, writeId, !success);
        const affectedPath = clearEvents.length > 0 ? repoRerunTransactions(repo, path) : path;
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, clearEvents);
        repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
      });
      each(childrenToMerge, (changedPath) => {
        const affectedPath = repoAbortTransactions(repo, pathChild(path, changedPath));
        repoRerunTransactions(repo, affectedPath);
      });
      eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, []);
    } else {
      log("update() called with empty data.  Don't do anything.");
      repoCallOnCompleteCallback(repo, onComplete, "ok", void 0);
    }
  }
  function repoRunOnDisconnectEvents(repo) {
    repoLog(repo, "onDisconnectEvents");
    const serverValues = repoGenerateServerValues(repo);
    const resolvedOnDisconnectTree = newSparseSnapshotTree();
    sparseSnapshotTreeForEachTree(repo.onDisconnect_, newEmptyPath(), (path, node) => {
      const resolved = resolveDeferredValueTree(path, node, repo.serverSyncTree_, serverValues);
      sparseSnapshotTreeRemember(resolvedOnDisconnectTree, path, resolved);
    });
    let events = [];
    sparseSnapshotTreeForEachTree(resolvedOnDisconnectTree, newEmptyPath(), (path, snap) => {
      events = events.concat(syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap));
      const affectedPath = repoAbortTransactions(repo, path);
      repoRerunTransactions(repo, affectedPath);
    });
    repo.onDisconnect_ = newSparseSnapshotTree();
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, newEmptyPath(), events);
  }
  function repoAddEventCallbackForQuery(repo, query2, eventRegistration) {
    let events;
    if (pathGetFront(query2._path) === ".info") {
      events = syncTreeAddEventRegistration(repo.infoSyncTree_, query2, eventRegistration);
    } else {
      events = syncTreeAddEventRegistration(repo.serverSyncTree_, query2, eventRegistration);
    }
    eventQueueRaiseEventsAtPath(repo.eventQueue_, query2._path, events);
  }
  function repoRemoveEventCallbackForQuery(repo, query2, eventRegistration) {
    let events;
    if (pathGetFront(query2._path) === ".info") {
      events = syncTreeRemoveEventRegistration(repo.infoSyncTree_, query2, eventRegistration);
    } else {
      events = syncTreeRemoveEventRegistration(repo.serverSyncTree_, query2, eventRegistration);
    }
    eventQueueRaiseEventsAtPath(repo.eventQueue_, query2._path, events);
  }
  function repoInterrupt(repo) {
    if (repo.persistentConnection_) {
      repo.persistentConnection_.interrupt(INTERRUPT_REASON);
    }
  }
  function repoLog(repo, ...varArgs) {
    let prefix = "";
    if (repo.persistentConnection_) {
      prefix = repo.persistentConnection_.id + ":";
    }
    log(prefix, ...varArgs);
  }
  function repoCallOnCompleteCallback(repo, callback, status, errorReason) {
    if (callback) {
      exceptionGuard(() => {
        if (status === "ok") {
          callback(null);
        } else {
          const code = (status || "error").toUpperCase();
          let message = code;
          if (errorReason) {
            message += ": " + errorReason;
          }
          const error2 = new Error(message);
          error2.code = code;
          callback(error2);
        }
      });
    }
  }
  function repoGetLatestState(repo, path, excludeSets) {
    return syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path, excludeSets) || ChildrenNode.EMPTY_NODE;
  }
  function repoSendReadyTransactions(repo, node = repo.transactionQueueTree_) {
    if (!node) {
      repoPruneCompletedTransactionsBelowNode(repo, node);
    }
    if (treeGetValue(node)) {
      const queue = repoBuildTransactionQueue(repo, node);
      assert(queue.length > 0, "Sending zero length transaction queue");
      const allRun = queue.every((transaction) => transaction.status === 0);
      if (allRun) {
        repoSendTransactionQueue(repo, treeGetPath(node), queue);
      }
    } else if (treeHasChildren(node)) {
      treeForEachChild(node, (childNode) => {
        repoSendReadyTransactions(repo, childNode);
      });
    }
  }
  function repoSendTransactionQueue(repo, path, queue) {
    const setsToIgnore = queue.map((txn) => {
      return txn.currentWriteId;
    });
    const latestState = repoGetLatestState(repo, path, setsToIgnore);
    let snapToSend = latestState;
    const latestHash = latestState.hash();
    for (let i2 = 0; i2 < queue.length; i2++) {
      const txn = queue[i2];
      assert(txn.status === 0, "tryToSendTransactionQueue_: items in queue should all be run.");
      txn.status = 1;
      txn.retryCount++;
      const relativePath = newRelativePath(path, txn.path);
      snapToSend = snapToSend.updateChild(relativePath, txn.currentOutputSnapshotRaw);
    }
    const dataToSend = snapToSend.val(true);
    const pathToSend = path;
    repo.server_.put(pathToSend.toString(), dataToSend, (status) => {
      repoLog(repo, "transaction put response", {
        path: pathToSend.toString(),
        status
      });
      let events = [];
      if (status === "ok") {
        const callbacks = [];
        for (let i2 = 0; i2 < queue.length; i2++) {
          queue[i2].status = 2;
          events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i2].currentWriteId));
          if (queue[i2].onComplete) {
            callbacks.push(() => queue[i2].onComplete(null, true, queue[i2].currentOutputSnapshotResolved));
          }
          queue[i2].unwatcher();
        }
        repoPruneCompletedTransactionsBelowNode(repo, treeSubTree(repo.transactionQueueTree_, path));
        repoSendReadyTransactions(repo, repo.transactionQueueTree_);
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
        for (let i2 = 0; i2 < callbacks.length; i2++) {
          exceptionGuard(callbacks[i2]);
        }
      } else {
        if (status === "datastale") {
          for (let i2 = 0; i2 < queue.length; i2++) {
            if (queue[i2].status === 3) {
              queue[i2].status = 4;
            } else {
              queue[i2].status = 0;
            }
          }
        } else {
          warn("transaction at " + pathToSend.toString() + " failed: " + status);
          for (let i2 = 0; i2 < queue.length; i2++) {
            queue[i2].status = 4;
            queue[i2].abortReason = status;
          }
        }
        repoRerunTransactions(repo, path);
      }
    }, latestHash);
  }
  function repoRerunTransactions(repo, changedPath) {
    const rootMostTransactionNode = repoGetAncestorTransactionNode(repo, changedPath);
    const path = treeGetPath(rootMostTransactionNode);
    const queue = repoBuildTransactionQueue(repo, rootMostTransactionNode);
    repoRerunTransactionQueue(repo, queue, path);
    return path;
  }
  function repoRerunTransactionQueue(repo, queue, path) {
    if (queue.length === 0) {
      return;
    }
    const callbacks = [];
    let events = [];
    const txnsToRerun = queue.filter((q2) => {
      return q2.status === 0;
    });
    const setsToIgnore = txnsToRerun.map((q2) => {
      return q2.currentWriteId;
    });
    for (let i2 = 0; i2 < queue.length; i2++) {
      const transaction = queue[i2];
      const relativePath = newRelativePath(path, transaction.path);
      let abortTransaction = false, abortReason;
      assert(relativePath !== null, "rerunTransactionsUnderNode_: relativePath should not be null.");
      if (transaction.status === 4) {
        abortTransaction = true;
        abortReason = transaction.abortReason;
        events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
      } else if (transaction.status === 0) {
        if (transaction.retryCount >= MAX_TRANSACTION_RETRIES) {
          abortTransaction = true;
          abortReason = "maxretry";
          events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
        } else {
          const currentNode = repoGetLatestState(repo, transaction.path, setsToIgnore);
          transaction.currentInputSnapshot = currentNode;
          const newData = queue[i2].update(currentNode.val());
          if (newData !== void 0) {
            validateFirebaseData("transaction failed: Data returned ", newData, transaction.path);
            let newDataNode = nodeFromJSON(newData);
            const hasExplicitPriority = typeof newData === "object" && newData != null && contains(newData, ".priority");
            if (!hasExplicitPriority) {
              newDataNode = newDataNode.updatePriority(currentNode.getPriority());
            }
            const oldWriteId = transaction.currentWriteId;
            const serverValues = repoGenerateServerValues(repo);
            const newNodeResolved = resolveDeferredValueSnapshot(newDataNode, currentNode, serverValues);
            transaction.currentOutputSnapshotRaw = newDataNode;
            transaction.currentOutputSnapshotResolved = newNodeResolved;
            transaction.currentWriteId = repoGetNextWriteId(repo);
            setsToIgnore.splice(setsToIgnore.indexOf(oldWriteId), 1);
            events = events.concat(syncTreeApplyUserOverwrite(repo.serverSyncTree_, transaction.path, newNodeResolved, transaction.currentWriteId, transaction.applyLocally));
            events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, oldWriteId, true));
          } else {
            abortTransaction = true;
            abortReason = "nodata";
            events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
          }
        }
      }
      eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
      events = [];
      if (abortTransaction) {
        queue[i2].status = 2;
        (function(unwatcher) {
          setTimeout(unwatcher, Math.floor(0));
        })(queue[i2].unwatcher);
        if (queue[i2].onComplete) {
          if (abortReason === "nodata") {
            callbacks.push(() => queue[i2].onComplete(null, false, queue[i2].currentInputSnapshot));
          } else {
            callbacks.push(() => queue[i2].onComplete(new Error(abortReason), false, null));
          }
        }
      }
    }
    repoPruneCompletedTransactionsBelowNode(repo, repo.transactionQueueTree_);
    for (let i2 = 0; i2 < callbacks.length; i2++) {
      exceptionGuard(callbacks[i2]);
    }
    repoSendReadyTransactions(repo, repo.transactionQueueTree_);
  }
  function repoGetAncestorTransactionNode(repo, path) {
    let front;
    let transactionNode = repo.transactionQueueTree_;
    front = pathGetFront(path);
    while (front !== null && treeGetValue(transactionNode) === void 0) {
      transactionNode = treeSubTree(transactionNode, front);
      path = pathPopFront(path);
      front = pathGetFront(path);
    }
    return transactionNode;
  }
  function repoBuildTransactionQueue(repo, transactionNode) {
    const transactionQueue = [];
    repoAggregateTransactionQueuesForNode(repo, transactionNode, transactionQueue);
    transactionQueue.sort((a2, b2) => a2.order - b2.order);
    return transactionQueue;
  }
  function repoAggregateTransactionQueuesForNode(repo, node, queue) {
    const nodeQueue = treeGetValue(node);
    if (nodeQueue) {
      for (let i2 = 0; i2 < nodeQueue.length; i2++) {
        queue.push(nodeQueue[i2]);
      }
    }
    treeForEachChild(node, (child2) => {
      repoAggregateTransactionQueuesForNode(repo, child2, queue);
    });
  }
  function repoPruneCompletedTransactionsBelowNode(repo, node) {
    const queue = treeGetValue(node);
    if (queue) {
      let to = 0;
      for (let from = 0; from < queue.length; from++) {
        if (queue[from].status !== 2) {
          queue[to] = queue[from];
          to++;
        }
      }
      queue.length = to;
      treeSetValue(node, queue.length > 0 ? queue : void 0);
    }
    treeForEachChild(node, (childNode) => {
      repoPruneCompletedTransactionsBelowNode(repo, childNode);
    });
  }
  function repoAbortTransactions(repo, path) {
    const affectedPath = treeGetPath(repoGetAncestorTransactionNode(repo, path));
    const transactionNode = treeSubTree(repo.transactionQueueTree_, path);
    treeForEachAncestor(transactionNode, (node) => {
      repoAbortTransactionsOnNode(repo, node);
    });
    repoAbortTransactionsOnNode(repo, transactionNode);
    treeForEachDescendant(transactionNode, (node) => {
      repoAbortTransactionsOnNode(repo, node);
    });
    return affectedPath;
  }
  function repoAbortTransactionsOnNode(repo, node) {
    const queue = treeGetValue(node);
    if (queue) {
      const callbacks = [];
      let events = [];
      let lastSent = -1;
      for (let i2 = 0; i2 < queue.length; i2++) {
        if (queue[i2].status === 3)
          ;
        else if (queue[i2].status === 1) {
          assert(lastSent === i2 - 1, "All SENT items should be at beginning of queue.");
          lastSent = i2;
          queue[i2].status = 3;
          queue[i2].abortReason = "set";
        } else {
          assert(queue[i2].status === 0, "Unexpected transaction status in abort");
          queue[i2].unwatcher();
          events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i2].currentWriteId, true));
          if (queue[i2].onComplete) {
            callbacks.push(queue[i2].onComplete.bind(null, new Error("set"), false, null));
          }
        }
      }
      if (lastSent === -1) {
        treeSetValue(node, void 0);
      } else {
        queue.length = lastSent + 1;
      }
      eventQueueRaiseEventsForChangedPath(repo.eventQueue_, treeGetPath(node), events);
      for (let i2 = 0; i2 < callbacks.length; i2++) {
        exceptionGuard(callbacks[i2]);
      }
    }
  }
  function decodePath(pathString) {
    let pathStringDecoded = "";
    const pieces = pathString.split("/");
    for (let i2 = 0; i2 < pieces.length; i2++) {
      if (pieces[i2].length > 0) {
        let piece = pieces[i2];
        try {
          piece = decodeURIComponent(piece.replace(/\+/g, " "));
        } catch (e) {
        }
        pathStringDecoded += "/" + piece;
      }
    }
    return pathStringDecoded;
  }
  function decodeQuery(queryString) {
    const results = {};
    if (queryString.charAt(0) === "?") {
      queryString = queryString.substring(1);
    }
    for (const segment of queryString.split("&")) {
      if (segment.length === 0) {
        continue;
      }
      const kv = segment.split("=");
      if (kv.length === 2) {
        results[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
      } else {
        warn(`Invalid query segment '${segment}' in query '${queryString}'`);
      }
    }
    return results;
  }
  var parseRepoInfo = function(dataURL, nodeAdmin) {
    const parsedUrl = parseDatabaseURL(dataURL), namespace = parsedUrl.namespace;
    if (parsedUrl.domain === "firebase.com") {
      fatal(parsedUrl.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
    }
    if ((!namespace || namespace === "undefined") && parsedUrl.domain !== "localhost") {
      fatal("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");
    }
    if (!parsedUrl.secure) {
      warnIfPageIsSecure();
    }
    const webSocketOnly = parsedUrl.scheme === "ws" || parsedUrl.scheme === "wss";
    return {
      repoInfo: new RepoInfo(
        parsedUrl.host,
        parsedUrl.secure,
        namespace,
        webSocketOnly,
        nodeAdmin,
        "",
        namespace !== parsedUrl.subdomain
      ),
      path: new Path(parsedUrl.pathString)
    };
  };
  var parseDatabaseURL = function(dataURL) {
    let host = "", domain = "", subdomain = "", pathString = "", namespace = "";
    let secure = true, scheme = "https", port = 443;
    if (typeof dataURL === "string") {
      let colonInd = dataURL.indexOf("//");
      if (colonInd >= 0) {
        scheme = dataURL.substring(0, colonInd - 1);
        dataURL = dataURL.substring(colonInd + 2);
      }
      let slashInd = dataURL.indexOf("/");
      if (slashInd === -1) {
        slashInd = dataURL.length;
      }
      let questionMarkInd = dataURL.indexOf("?");
      if (questionMarkInd === -1) {
        questionMarkInd = dataURL.length;
      }
      host = dataURL.substring(0, Math.min(slashInd, questionMarkInd));
      if (slashInd < questionMarkInd) {
        pathString = decodePath(dataURL.substring(slashInd, questionMarkInd));
      }
      const queryParams = decodeQuery(dataURL.substring(Math.min(dataURL.length, questionMarkInd)));
      colonInd = host.indexOf(":");
      if (colonInd >= 0) {
        secure = scheme === "https" || scheme === "wss";
        port = parseInt(host.substring(colonInd + 1), 10);
      } else {
        colonInd = host.length;
      }
      const hostWithoutPort = host.slice(0, colonInd);
      if (hostWithoutPort.toLowerCase() === "localhost") {
        domain = "localhost";
      } else if (hostWithoutPort.split(".").length <= 2) {
        domain = hostWithoutPort;
      } else {
        const dotInd = host.indexOf(".");
        subdomain = host.substring(0, dotInd).toLowerCase();
        domain = host.substring(dotInd + 1);
        namespace = subdomain;
      }
      if ("ns" in queryParams) {
        namespace = queryParams["ns"];
      }
    }
    return {
      host,
      port,
      domain,
      subdomain,
      secure,
      scheme,
      pathString,
      namespace
    };
  };
  var DataEvent = class {
    constructor(eventType, eventRegistration, snapshot, prevName) {
      this.eventType = eventType;
      this.eventRegistration = eventRegistration;
      this.snapshot = snapshot;
      this.prevName = prevName;
    }
    getPath() {
      const ref2 = this.snapshot.ref;
      if (this.eventType === "value") {
        return ref2._path;
      } else {
        return ref2.parent._path;
      }
    }
    getEventType() {
      return this.eventType;
    }
    getEventRunner() {
      return this.eventRegistration.getEventRunner(this);
    }
    toString() {
      return this.getPath().toString() + ":" + this.eventType + ":" + stringify2(this.snapshot.exportVal());
    }
  };
  var CancelEvent = class {
    constructor(eventRegistration, error2, path) {
      this.eventRegistration = eventRegistration;
      this.error = error2;
      this.path = path;
    }
    getPath() {
      return this.path;
    }
    getEventType() {
      return "cancel";
    }
    getEventRunner() {
      return this.eventRegistration.getEventRunner(this);
    }
    toString() {
      return this.path.toString() + ":cancel";
    }
  };
  var CallbackContext = class {
    constructor(snapshotCallback, cancelCallback) {
      this.snapshotCallback = snapshotCallback;
      this.cancelCallback = cancelCallback;
    }
    onValue(expDataSnapshot, previousChildName) {
      this.snapshotCallback.call(null, expDataSnapshot, previousChildName);
    }
    onCancel(error2) {
      assert(this.hasCancelCallback, "Raising a cancel event on a listener with no cancel callback");
      return this.cancelCallback.call(null, error2);
    }
    get hasCancelCallback() {
      return !!this.cancelCallback;
    }
    matches(other) {
      return this.snapshotCallback === other.snapshotCallback || this.snapshotCallback.userCallback !== void 0 && this.snapshotCallback.userCallback === other.snapshotCallback.userCallback && this.snapshotCallback.context === other.snapshotCallback.context;
    }
  };
  var QueryImpl = class {
    constructor(_repo, _path, _queryParams, _orderByCalled) {
      this._repo = _repo;
      this._path = _path;
      this._queryParams = _queryParams;
      this._orderByCalled = _orderByCalled;
    }
    get key() {
      if (pathIsEmpty(this._path)) {
        return null;
      } else {
        return pathGetBack(this._path);
      }
    }
    get ref() {
      return new ReferenceImpl(this._repo, this._path);
    }
    get _queryIdentifier() {
      const obj = queryParamsGetQueryObject(this._queryParams);
      const id = ObjectToUniqueKey(obj);
      return id === "{}" ? "default" : id;
    }
    get _queryObject() {
      return queryParamsGetQueryObject(this._queryParams);
    }
    isEqual(other) {
      other = getModularInstance(other);
      if (!(other instanceof QueryImpl)) {
        return false;
      }
      const sameRepo = this._repo === other._repo;
      const samePath = pathEquals(this._path, other._path);
      const sameQueryIdentifier = this._queryIdentifier === other._queryIdentifier;
      return sameRepo && samePath && sameQueryIdentifier;
    }
    toJSON() {
      return this.toString();
    }
    toString() {
      return this._repo.toString() + pathToUrlEncodedString(this._path);
    }
  };
  function validateNoPreviousOrderByCall(query2, fnName) {
    if (query2._orderByCalled === true) {
      throw new Error(fnName + ": You can't combine multiple orderBy calls.");
    }
  }
  function validateQueryEndpoints(params) {
    let startNode = null;
    let endNode = null;
    if (params.hasStart()) {
      startNode = params.getIndexStartValue();
    }
    if (params.hasEnd()) {
      endNode = params.getIndexEndValue();
    }
    if (params.getIndex() === KEY_INDEX) {
      const tooManyArgsError = "Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().";
      const wrongArgTypeError = "Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";
      if (params.hasStart()) {
        const startName = params.getIndexStartName();
        if (startName !== MIN_NAME) {
          throw new Error(tooManyArgsError);
        } else if (typeof startNode !== "string") {
          throw new Error(wrongArgTypeError);
        }
      }
      if (params.hasEnd()) {
        const endName = params.getIndexEndName();
        if (endName !== MAX_NAME) {
          throw new Error(tooManyArgsError);
        } else if (typeof endNode !== "string") {
          throw new Error(wrongArgTypeError);
        }
      }
    } else if (params.getIndex() === PRIORITY_INDEX) {
      if (startNode != null && !isValidPriority(startNode) || endNode != null && !isValidPriority(endNode)) {
        throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).");
      }
    } else {
      assert(params.getIndex() instanceof PathIndex || params.getIndex() === VALUE_INDEX, "unknown index type.");
      if (startNode != null && typeof startNode === "object" || endNode != null && typeof endNode === "object") {
        throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.");
      }
    }
  }
  function validateLimit(params) {
    if (params.hasStart() && params.hasEnd() && params.hasLimit() && !params.hasAnchoredLimit()) {
      throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.");
    }
  }
  var ReferenceImpl = class extends QueryImpl {
    constructor(repo, path) {
      super(repo, path, new QueryParams(), false);
    }
    get parent() {
      const parentPath = pathParent(this._path);
      return parentPath === null ? null : new ReferenceImpl(this._repo, parentPath);
    }
    get root() {
      let ref2 = this;
      while (ref2.parent !== null) {
        ref2 = ref2.parent;
      }
      return ref2;
    }
  };
  var DataSnapshot = class {
    constructor(_node, ref2, _index) {
      this._node = _node;
      this.ref = ref2;
      this._index = _index;
    }
    get priority() {
      return this._node.getPriority().val();
    }
    get key() {
      return this.ref.key;
    }
    get size() {
      return this._node.numChildren();
    }
    child(path) {
      const childPath = new Path(path);
      const childRef = child(this.ref, path);
      return new DataSnapshot(this._node.getChild(childPath), childRef, PRIORITY_INDEX);
    }
    exists() {
      return !this._node.isEmpty();
    }
    exportVal() {
      return this._node.val(true);
    }
    forEach(action) {
      if (this._node.isLeafNode()) {
        return false;
      }
      const childrenNode = this._node;
      return !!childrenNode.forEachChild(this._index, (key, node) => {
        return action(new DataSnapshot(node, child(this.ref, key), PRIORITY_INDEX));
      });
    }
    hasChild(path) {
      const childPath = new Path(path);
      return !this._node.getChild(childPath).isEmpty();
    }
    hasChildren() {
      if (this._node.isLeafNode()) {
        return false;
      } else {
        return !this._node.isEmpty();
      }
    }
    toJSON() {
      return this.exportVal();
    }
    val() {
      return this._node.val();
    }
  };
  function ref(db, path) {
    db = getModularInstance(db);
    db._checkNotDeleted("ref");
    return path !== void 0 ? child(db._root, path) : db._root;
  }
  function child(parent, path) {
    parent = getModularInstance(parent);
    if (pathGetFront(parent._path) === null) {
      validateRootPathString("child", "path", path, false);
    } else {
      validatePathString("child", "path", path, false);
    }
    return new ReferenceImpl(parent._repo, pathChild(parent._path, path));
  }
  function push(parent, value) {
    parent = getModularInstance(parent);
    validateWritablePath("push", parent._path);
    validateFirebaseDataArg("push", value, parent._path, true);
    const now = repoServerTime(parent._repo);
    const name5 = nextPushId(now);
    const thennablePushRef = child(parent, name5);
    const pushRef = child(parent, name5);
    let promise;
    if (value != null) {
      promise = set(pushRef, value).then(() => pushRef);
    } else {
      promise = Promise.resolve(pushRef);
    }
    thennablePushRef.then = promise.then.bind(promise);
    thennablePushRef.catch = promise.then.bind(promise, void 0);
    return thennablePushRef;
  }
  function remove(ref2) {
    validateWritablePath("remove", ref2._path);
    return set(ref2, null);
  }
  function set(ref2, value) {
    ref2 = getModularInstance(ref2);
    validateWritablePath("set", ref2._path);
    validateFirebaseDataArg("set", value, ref2._path, false);
    const deferred = new Deferred();
    repoSetWithPriority(
      ref2._repo,
      ref2._path,
      value,
      null,
      deferred.wrapCallback(() => {
      })
    );
    return deferred.promise;
  }
  function update(ref2, values) {
    validateFirebaseMergeDataArg("update", values, ref2._path, false);
    const deferred = new Deferred();
    repoUpdate(ref2._repo, ref2._path, values, deferred.wrapCallback(() => {
    }));
    return deferred.promise;
  }
  function get(query2) {
    query2 = getModularInstance(query2);
    const callbackContext = new CallbackContext(() => {
    });
    const container = new ValueEventRegistration(callbackContext);
    return repoGetValue(query2._repo, query2, container).then((node) => {
      return new DataSnapshot(node, new ReferenceImpl(query2._repo, query2._path), query2._queryParams.getIndex());
    });
  }
  var ValueEventRegistration = class {
    constructor(callbackContext) {
      this.callbackContext = callbackContext;
    }
    respondsTo(eventType) {
      return eventType === "value";
    }
    createEvent(change, query2) {
      const index = query2._queryParams.getIndex();
      return new DataEvent("value", this, new DataSnapshot(change.snapshotNode, new ReferenceImpl(query2._repo, query2._path), index));
    }
    getEventRunner(eventData) {
      if (eventData.getEventType() === "cancel") {
        return () => this.callbackContext.onCancel(eventData.error);
      } else {
        return () => this.callbackContext.onValue(eventData.snapshot, null);
      }
    }
    createCancelEvent(error2, path) {
      if (this.callbackContext.hasCancelCallback) {
        return new CancelEvent(this, error2, path);
      } else {
        return null;
      }
    }
    matches(other) {
      if (!(other instanceof ValueEventRegistration)) {
        return false;
      } else if (!other.callbackContext || !this.callbackContext) {
        return true;
      } else {
        return other.callbackContext.matches(this.callbackContext);
      }
    }
    hasAnyCallback() {
      return this.callbackContext !== null;
    }
  };
  var ChildEventRegistration = class {
    constructor(eventType, callbackContext) {
      this.eventType = eventType;
      this.callbackContext = callbackContext;
    }
    respondsTo(eventType) {
      let eventToCheck = eventType === "children_added" ? "child_added" : eventType;
      eventToCheck = eventToCheck === "children_removed" ? "child_removed" : eventToCheck;
      return this.eventType === eventToCheck;
    }
    createCancelEvent(error2, path) {
      if (this.callbackContext.hasCancelCallback) {
        return new CancelEvent(this, error2, path);
      } else {
        return null;
      }
    }
    createEvent(change, query2) {
      assert(change.childName != null, "Child events should have a childName.");
      const childRef = child(new ReferenceImpl(query2._repo, query2._path), change.childName);
      const index = query2._queryParams.getIndex();
      return new DataEvent(change.type, this, new DataSnapshot(change.snapshotNode, childRef, index), change.prevName);
    }
    getEventRunner(eventData) {
      if (eventData.getEventType() === "cancel") {
        return () => this.callbackContext.onCancel(eventData.error);
      } else {
        return () => this.callbackContext.onValue(eventData.snapshot, eventData.prevName);
      }
    }
    matches(other) {
      if (other instanceof ChildEventRegistration) {
        return this.eventType === other.eventType && (!this.callbackContext || !other.callbackContext || this.callbackContext.matches(other.callbackContext));
      }
      return false;
    }
    hasAnyCallback() {
      return !!this.callbackContext;
    }
  };
  function addEventListener(query2, eventType, callback, cancelCallbackOrListenOptions, options) {
    let cancelCallback;
    if (typeof cancelCallbackOrListenOptions === "object") {
      cancelCallback = void 0;
      options = cancelCallbackOrListenOptions;
    }
    if (typeof cancelCallbackOrListenOptions === "function") {
      cancelCallback = cancelCallbackOrListenOptions;
    }
    if (options && options.onlyOnce) {
      const userCallback = callback;
      const onceCallback = (dataSnapshot, previousChildName) => {
        repoRemoveEventCallbackForQuery(query2._repo, query2, container);
        userCallback(dataSnapshot, previousChildName);
      };
      onceCallback.userCallback = callback.userCallback;
      onceCallback.context = callback.context;
      callback = onceCallback;
    }
    const callbackContext = new CallbackContext(callback, cancelCallback || void 0);
    const container = eventType === "value" ? new ValueEventRegistration(callbackContext) : new ChildEventRegistration(eventType, callbackContext);
    repoAddEventCallbackForQuery(query2._repo, query2, container);
    return () => repoRemoveEventCallbackForQuery(query2._repo, query2, container);
  }
  function onValue(query2, callback, cancelCallbackOrListenOptions, options) {
    return addEventListener(query2, "value", callback, cancelCallbackOrListenOptions, options);
  }
  function onChildAdded(query2, callback, cancelCallbackOrListenOptions, options) {
    return addEventListener(query2, "child_added", callback, cancelCallbackOrListenOptions, options);
  }
  var QueryConstraint = class {
  };
  var QueryEndAtConstraint = class extends QueryConstraint {
    constructor(_value, _key) {
      super();
      this._value = _value;
      this._key = _key;
    }
    _apply(query2) {
      validateFirebaseDataArg("endAt", this._value, query2._path, true);
      const newParams = queryParamsEndAt(query2._queryParams, this._value, this._key);
      validateLimit(newParams);
      validateQueryEndpoints(newParams);
      if (query2._queryParams.hasEnd()) {
        throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");
      }
      return new QueryImpl(query2._repo, query2._path, newParams, query2._orderByCalled);
    }
  };
  var QueryStartAtConstraint = class extends QueryConstraint {
    constructor(_value, _key) {
      super();
      this._value = _value;
      this._key = _key;
    }
    _apply(query2) {
      validateFirebaseDataArg("startAt", this._value, query2._path, true);
      const newParams = queryParamsStartAt(query2._queryParams, this._value, this._key);
      validateLimit(newParams);
      validateQueryEndpoints(newParams);
      if (query2._queryParams.hasStart()) {
        throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");
      }
      return new QueryImpl(query2._repo, query2._path, newParams, query2._orderByCalled);
    }
  };
  var QueryStartAfterConstraint = class extends QueryConstraint {
    constructor(_value, _key) {
      super();
      this._value = _value;
      this._key = _key;
    }
    _apply(query2) {
      validateFirebaseDataArg("startAfter", this._value, query2._path, false);
      const newParams = queryParamsStartAfter(query2._queryParams, this._value, this._key);
      validateLimit(newParams);
      validateQueryEndpoints(newParams);
      if (query2._queryParams.hasStart()) {
        throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");
      }
      return new QueryImpl(query2._repo, query2._path, newParams, query2._orderByCalled);
    }
  };
  function startAfter(value, key) {
    validateKey("startAfter", "key", key, true);
    return new QueryStartAfterConstraint(value, key);
  }
  var QueryLimitToFirstConstraint = class extends QueryConstraint {
    constructor(_limit) {
      super();
      this._limit = _limit;
    }
    _apply(query2) {
      if (query2._queryParams.hasLimit()) {
        throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");
      }
      return new QueryImpl(query2._repo, query2._path, queryParamsLimitToFirst(query2._queryParams, this._limit), query2._orderByCalled);
    }
  };
  function limitToFirst(limit) {
    if (typeof limit !== "number" || Math.floor(limit) !== limit || limit <= 0) {
      throw new Error("limitToFirst: First argument must be a positive integer.");
    }
    return new QueryLimitToFirstConstraint(limit);
  }
  var QueryOrderByChildConstraint = class extends QueryConstraint {
    constructor(_path) {
      super();
      this._path = _path;
    }
    _apply(query2) {
      validateNoPreviousOrderByCall(query2, "orderByChild");
      const parsedPath = new Path(this._path);
      if (pathIsEmpty(parsedPath)) {
        throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");
      }
      const index = new PathIndex(parsedPath);
      const newParams = queryParamsOrderBy(query2._queryParams, index);
      validateQueryEndpoints(newParams);
      return new QueryImpl(
        query2._repo,
        query2._path,
        newParams,
        true
      );
    }
  };
  function orderByChild(path) {
    if (path === "$key") {
      throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');
    } else if (path === "$priority") {
      throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');
    } else if (path === "$value") {
      throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');
    }
    validatePathString("orderByChild", "path", path, false);
    return new QueryOrderByChildConstraint(path);
  }
  var QueryOrderByKeyConstraint = class extends QueryConstraint {
    _apply(query2) {
      validateNoPreviousOrderByCall(query2, "orderByKey");
      const newParams = queryParamsOrderBy(query2._queryParams, KEY_INDEX);
      validateQueryEndpoints(newParams);
      return new QueryImpl(
        query2._repo,
        query2._path,
        newParams,
        true
      );
    }
  };
  function orderByKey() {
    return new QueryOrderByKeyConstraint();
  }
  var QueryEqualToValueConstraint = class extends QueryConstraint {
    constructor(_value, _key) {
      super();
      this._value = _value;
      this._key = _key;
    }
    _apply(query2) {
      validateFirebaseDataArg("equalTo", this._value, query2._path, false);
      if (query2._queryParams.hasStart()) {
        throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");
      }
      if (query2._queryParams.hasEnd()) {
        throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");
      }
      return new QueryEndAtConstraint(this._value, this._key)._apply(new QueryStartAtConstraint(this._value, this._key)._apply(query2));
    }
  };
  function equalTo(value, key) {
    validateKey("equalTo", "key", key, true);
    return new QueryEqualToValueConstraint(value, key);
  }
  function query(query2, ...queryConstraints) {
    let queryImpl = getModularInstance(query2);
    for (const constraint of queryConstraints) {
      queryImpl = constraint._apply(queryImpl);
    }
    return queryImpl;
  }
  syncPointSetReferenceConstructor(ReferenceImpl);
  syncTreeSetReferenceConstructor(ReferenceImpl);
  var FIREBASE_DATABASE_EMULATOR_HOST_VAR = "FIREBASE_DATABASE_EMULATOR_HOST";
  var repos = {};
  var useRestClient = false;
  function repoManagerApplyEmulatorSettings(repo, host, port, tokenProvider) {
    repo.repoInfo_ = new RepoInfo(
      `${host}:${port}`,
      false,
      repo.repoInfo_.namespace,
      repo.repoInfo_.webSocketOnly,
      repo.repoInfo_.nodeAdmin,
      repo.repoInfo_.persistenceKey,
      repo.repoInfo_.includeNamespaceInQueryParams
    );
    if (tokenProvider) {
      repo.authTokenProvider_ = tokenProvider;
    }
  }
  function repoManagerDatabaseFromApp(app2, authProvider, appCheckProvider, url, nodeAdmin) {
    let dbUrl = url || app2.options.databaseURL;
    if (dbUrl === void 0) {
      if (!app2.options.projectId) {
        fatal("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp().");
      }
      log("Using default host for project ", app2.options.projectId);
      dbUrl = `${app2.options.projectId}-default-rtdb.firebaseio.com`;
    }
    let parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
    let repoInfo = parsedUrl.repoInfo;
    let isEmulator;
    let dbEmulatorHost = void 0;
    if (typeof process !== "undefined" && process.env) {
      dbEmulatorHost = process.env[FIREBASE_DATABASE_EMULATOR_HOST_VAR];
    }
    if (dbEmulatorHost) {
      isEmulator = true;
      dbUrl = `http://${dbEmulatorHost}?ns=${repoInfo.namespace}`;
      parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
      repoInfo = parsedUrl.repoInfo;
    } else {
      isEmulator = !parsedUrl.repoInfo.secure;
    }
    const authTokenProvider = nodeAdmin && isEmulator ? new EmulatorTokenProvider(EmulatorTokenProvider.OWNER) : new FirebaseAuthTokenProvider(app2.name, app2.options, authProvider);
    validateUrl("Invalid Firebase Database URL", parsedUrl);
    if (!pathIsEmpty(parsedUrl.path)) {
      fatal("Database URL must point to the root of a Firebase Database (not including a child path).");
    }
    const repo = repoManagerCreateRepo(repoInfo, app2, authTokenProvider, new AppCheckTokenProvider(app2.name, appCheckProvider));
    return new Database(repo, app2);
  }
  function repoManagerDeleteRepo(repo, appName) {
    const appRepos = repos[appName];
    if (!appRepos || appRepos[repo.key] !== repo) {
      fatal(`Database ${appName}(${repo.repoInfo_}) has already been deleted.`);
    }
    repoInterrupt(repo);
    delete appRepos[repo.key];
  }
  function repoManagerCreateRepo(repoInfo, app2, authTokenProvider, appCheckProvider) {
    let appRepos = repos[app2.name];
    if (!appRepos) {
      appRepos = {};
      repos[app2.name] = appRepos;
    }
    let repo = appRepos[repoInfo.toURLString()];
    if (repo) {
      fatal("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");
    }
    repo = new Repo(repoInfo, useRestClient, authTokenProvider, appCheckProvider);
    appRepos[repoInfo.toURLString()] = repo;
    return repo;
  }
  var Database = class {
    constructor(_repoInternal, app2) {
      this._repoInternal = _repoInternal;
      this.app = app2;
      this["type"] = "database";
      this._instanceStarted = false;
    }
    get _repo() {
      if (!this._instanceStarted) {
        repoStart(this._repoInternal, this.app.options.appId, this.app.options["databaseAuthVariableOverride"]);
        this._instanceStarted = true;
      }
      return this._repoInternal;
    }
    get _root() {
      if (!this._rootInternal) {
        this._rootInternal = new ReferenceImpl(this._repo, newEmptyPath());
      }
      return this._rootInternal;
    }
    _delete() {
      if (this._rootInternal !== null) {
        repoManagerDeleteRepo(this._repo, this.app.name);
        this._repoInternal = null;
        this._rootInternal = null;
      }
      return Promise.resolve();
    }
    _checkNotDeleted(apiName) {
      if (this._rootInternal === null) {
        fatal("Cannot call " + apiName + " on a deleted database.");
      }
    }
  };
  function getDatabase(app2 = getApp(), url) {
    const db = _getProvider(app2, "database").getImmediate({
      identifier: url
    });
    const emulator = getDefaultEmulatorHostnameAndPort("database");
    if (emulator) {
      connectDatabaseEmulator(db, ...emulator);
    }
    return db;
  }
  function connectDatabaseEmulator(db, host, port, options = {}) {
    db = getModularInstance(db);
    db._checkNotDeleted("useEmulator");
    if (db._instanceStarted) {
      fatal("Cannot call useEmulator() after instance has already been initialized.");
    }
    const repo = db._repoInternal;
    let tokenProvider = void 0;
    if (repo.repoInfo_.nodeAdmin) {
      if (options.mockUserToken) {
        fatal('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".');
      }
      tokenProvider = new EmulatorTokenProvider(EmulatorTokenProvider.OWNER);
    } else if (options.mockUserToken) {
      const token = typeof options.mockUserToken === "string" ? options.mockUserToken : createMockUserToken(options.mockUserToken, db.app.options.projectId);
      tokenProvider = new EmulatorTokenProvider(token);
    }
    repoManagerApplyEmulatorSettings(repo, host, port, tokenProvider);
  }
  function registerDatabase(variant) {
    setSDKVersion(SDK_VERSION);
    _registerComponent(new Component("database", (container, { instanceIdentifier: url }) => {
      const app2 = container.getProvider("app").getImmediate();
      const authProvider = container.getProvider("auth-internal");
      const appCheckProvider = container.getProvider("app-check-internal");
      return repoManagerDatabaseFromApp(app2, authProvider, appCheckProvider, url);
    }, "PUBLIC").setMultipleInstances(true));
    registerVersion(name2, version3, variant);
    registerVersion(name2, version3, "esm2017");
  }
  function increment(delta) {
    return {
      ".sv": {
        "increment": delta
      }
    };
  }
  PersistentConnection.prototype.simpleListen = function(pathString, onComplete) {
    this.sendRequest("q", { p: pathString }, onComplete);
  };
  PersistentConnection.prototype.echo = function(data, onEcho) {
    this.sendRequest("echo", { d: data }, onEcho);
  };
  registerDatabase();

  // ../../packages/queue/src/schema.ts
  var metadataSchema = mod.object({
    ["isPaused" /* isPaused */]: mod.boolean().optional(),
    ["count" /* count */]: mod.number().int().optional(),
    ["errorCount" /* errorCount */]: mod.number().int().optional(),
    ["waitingCount" /* waitingCount */]: mod.number().int().optional(),
    ["activeCount" /* activeCount */]: mod.number().int().optional(),
    ["completeCount" /* completeCount */]: mod.number().int().optional()
  });
  var TaskState = /* @__PURE__ */ ((TaskState3) => {
    TaskState3["error"] = "error";
    TaskState3["waiting"] = "waiting";
    TaskState3["active"] = "active";
    TaskState3["complete"] = "complete";
    return TaskState3;
  })(TaskState || {});
  var taskSchema = mod.object({
    ["state" /* state */]: mod.nativeEnum(TaskState),
    ["message" /* message */]: mod.string().optional(),
    ["data" /* data */]: mod.any(),
    ["created" /* created */]: mod.number(),
    ["started" /* started */]: mod.number().optional().nullable(),
    ["errored" /* errored */]: mod.number().optional().nullable(),
    ["completed" /* completed */]: mod.number().optional().nullable()
  });
  var errorSchema = mod.object({ created: mod.date(), message: mod.string() });
  var logSchema = mod.object({ task: taskSchema, errors: mod.record(mod.string(), errorSchema) });

  // ../../packages/queue/src/utils/debounce.ts
  function debounce(func, { millis = 300, leading = false } = {}) {
    return leading ? leadingDebounce(func, { millis }) : trailingDebounce(func, { millis });
  }
  function leadingDebounce(func, { millis }) {
    let blocked = false;
    return (...args) => {
      if (!blocked) {
        blocked = true;
        func(...args);
        setTimeout(() => {
          blocked = false;
        }, millis);
      }
    };
  }
  function trailingDebounce(func, { millis }) {
    let timer;
    return (...args) => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => func(...args), millis);
    };
  }

  // ../../packages/queue/src/utils/map-tasks.ts
  function mapTasks(dataSnapshot) {
    const data = dataSnapshot.val();
    switch (true) {
      case !data:
        return {};
      case !!data.state: {
        const key = dataSnapshot.key || "";
        const task = taskSchema.parse(data);
        return { [key]: task };
      }
      default:
        return Object.entries(dataSnapshot.val() || {}).reduce((acc, [key, value]) => {
          const task = taskSchema.parse(value);
          acc[key] = task;
          return acc;
        }, {});
    }
  }

  // ../../packages/queue/src/utils/page-through-tasks.ts
  async function pageThroughTasks({
    batchSize,
    callback,
    startAfterKey,
    taskState,
    tasksRef
  }) {
    const tasksQuery = startAfterKey ? query(tasksRef, orderByKey(), limitToFirst(batchSize), startAfter(startAfterKey)) : query(tasksRef, orderByChild("state" /* state */), limitToFirst(batchSize), equalTo(taskState));
    const snapshot = await get(tasksQuery);
    const queueTasks = mapTasks(snapshot);
    const matchingTasks = Object.entries(queueTasks).reduce((acc, [key, task]) => {
      if (task.state === taskState) {
        acc[key] = task;
      }
      return acc;
    }, {});
    const existMatchingTasks = Object.keys(matchingTasks).length > 0;
    const lastKey = Object.keys(queueTasks).pop();
    const isLastPage = !lastKey;
    if (existMatchingTasks) {
      await callback(matchingTasks);
    }
    if (!isLastPage && lastKey) {
      await pageThroughTasks({ batchSize, callback, startAfterKey: lastKey, taskState, tasksRef });
    }
  }

  // ../../packages/queue/src/queue/handle-active.ts
  async function handleActive({
    callback,
    dataSnapshot,
    queueRef
  }) {
    const started = Date.now();
    const data = mapTasks(dataSnapshot);
    const task = Object.values(data)[0] ?? null;
    try {
      const { success, message } = await callback(data);
      if (!success) {
        throw new Error(message);
      } else {
        await update(dataSnapshot.ref, {
          ["message" /* message */]: message,
          ["state" /* state */]: "complete" /* complete */,
          ["started" /* started */]: started,
          ["completed" /* completed */]: Date.now()
        });
        return { success, message };
      }
    } catch (error2) {
      let message = "";
      if (error2 instanceof Error) {
        message = error2.message;
      } else {
        message = String(message);
      }
      update(dataSnapshot.ref, {
        ["message" /* message */]: message,
        ["state" /* state */]: "error" /* error */,
        ["started" /* started */]: started,
        ["errored" /* errored */]: Date.now()
      });
      await update(queueRef, {
        [`${"logs" /* logs */}/${dataSnapshot.key}/${"task" /* task */}`]: task,
        [`${"logs" /* logs */}/${dataSnapshot.key}/${"errors" /* errors */}/${push(queueRef).key}`]: errorSchema.parse({
          created: new Date(),
          message
        })
      });
      return { success: false, message };
    }
  }

  // ../../packages/queue/src/queue/handle-waiting.ts
  var ONE_SECOND = 1e3;
  function handleWaiting({
    batchSize,
    callback,
    metadataRef,
    queueRef,
    tasksRef
  }) {
    const activeQuery = query(tasksRef, orderByChild("state" /* state */), limitToFirst(batchSize), equalTo("active" /* active */));
    const unlistenMetadata = onValue(
      metadataRef,
      debounce(
        async (metadataSnapshot) => {
          const metadata = metadataSchema.parse(metadataSnapshot.val());
          const { activeCount: activeCount2 = 0, waitingCount = 0 } = metadata;
          const countToActivate = Math.min(Math.max(0, batchSize - Math.max(0, activeCount2)), waitingCount);
          if (countToActivate > 0) {
            const waitingDataSnapshot = await get(
              query(tasksRef, orderByChild("state" /* state */), limitToFirst(countToActivate), equalTo("waiting" /* waiting */))
            );
            const newWaitingTasks = mapTasks(waitingDataSnapshot);
            const newWaitingTaskCount = Object.keys(newWaitingTasks).length;
            const updates = Object.entries(newWaitingTasks).reduce(
              (acc, [key, task]) => {
                acc[`${"task" /* task */}/${key}/${"state" /* state */}`] = "active" /* active */;
                acc[`${"task" /* task */}/${key}/${"started" /* started */}`] = Date.now();
                return acc;
              },
              {
                [`${"metadata" /* metadata */}/${"activeCount" /* activeCount */}`]: increment(+newWaitingTaskCount),
                [`${"metadata" /* metadata */}/${"waitingCount" /* waitingCount */}`]: increment(-newWaitingTaskCount)
              }
            );
            await update(queueRef, updates);
          }
        },
        { millis: ONE_SECOND }
      )
    );
    let activeCount = 0;
    let errorCount = 0;
    let completeCount = 0;
    const unlistenActiveAdded = onChildAdded(activeQuery, async (dataSnapshot) => {
      const { success } = await handleActive({ callback, dataSnapshot, queueRef });
      if (success) {
        completeCount++;
      } else {
        errorCount++;
      }
      activeCount--;
    });
    const timer = setInterval(async () => {
      const updates = {
        ["activeCount" /* activeCount */]: increment(activeCount),
        ["completeCount" /* completeCount */]: increment(completeCount),
        ["errorCount" /* errorCount */]: increment(errorCount)
      };
      const i2 = activeCount;
      activeCount = 0;
      completeCount = 0;
      errorCount = 0;
      await update(metadataRef, updates);
    }, ONE_SECOND);
    return () => {
      unlistenActiveAdded();
      unlistenMetadata();
      setTimeout(() => {
        clearInterval(timer);
      }, ONE_SECOND);
    };
  }

  // ../../packages/queue/src/queue/queue.ts
  function Queue({ batchSize = 1, callback, ref: queueRef }) {
    const metadataRef = child(queueRef, "metadata" /* metadata */);
    const tasksRef = child(queueRef, "task" /* task */);
    let unlisten;
    function mount() {
      let unlistenWaiting = null;
      let unlistenWaitingTimer;
      const unlistenMetadata = onValue(metadataRef, (dataSnapshot) => {
        const value = dataSnapshot.val();
        const parsed = metadataSchema.safeParse(value);
        if (parsed.success) {
          const { isPaused, activeCount, waitingCount } = parsed.data;
          if (!isPaused && !unlistenWaiting) {
            unlistenWaiting = handleWaiting({ batchSize, callback, metadataRef, queueRef, tasksRef });
          } else if (!activeCount && !waitingCount) {
            clearTimeout(unlistenWaitingTimer);
            unlistenWaitingTimer = setTimeout(() => {
              unlistenWaiting?.();
              unlistenWaiting = null;
            }, 1e3 * 5);
          }
        }
      });
      return () => {
        unlistenWaiting?.();
        unlistenMetadata();
      };
    }
    async function add(tasks) {
      const newTasks = tasks.map(
        (data) => taskSchema.parse({ ["created" /* created */]: Date.now(), ["state" /* state */]: "waiting" /* waiting */, ["data" /* data */]: data })
      );
      const updates = newTasks.reduce(
        (acc, task) => {
          const newRef = push(tasksRef);
          acc[`${"task" /* task */}/${newRef.key}`] = task;
          return acc;
        },
        {
          [`${metadataRef.key}/${"activeCount" /* activeCount */}`]: increment(0),
          [`${metadataRef.key}/${"errorCount" /* errorCount */}`]: increment(0),
          [`${metadataRef.key}/${"waitingCount" /* waitingCount */}`]: increment(newTasks.length),
          [`${metadataRef.key}/${"completeCount" /* completeCount */}`]: increment(0),
          [`${metadataRef.key}/${"count" /* count */}`]: increment(newTasks.length)
        }
      );
      await update(queueRef, updates);
    }
    async function empty() {
      unmount();
      await remove(queueRef);
    }
    async function stop() {
      unmount();
      await update(metadataRef, { isPaused: true });
    }
    async function start() {
      await update(metadataRef, { isPaused: false });
      unlisten = mount();
    }
    function unmount() {
      unlisten?.();
      unlisten = null;
    }
    async function requeueByKey(keys, metadataKey) {
      const updates = getRequeueUpdates(keys, metadataKey);
      await stop();
      await update(queueRef, updates);
      return { success: true, message: `${updates.length} errored tasks reqeueued` };
    }
    async function requeueByState(taskState) {
      const metadataKey = taskState === "complete" /* complete */ ? "completeCount" /* completeCount */ : "errorCount" /* errorCount */;
      await stop();
      await pageThroughTasks({
        batchSize: 3,
        callback: async (queueTasks) => {
          const keys = Object.keys(queueTasks);
          const updates = getRequeueUpdates(keys, metadataKey);
          await update(queueRef, updates);
          return { success: true, message: `${updates.length} errored tasks reqeueued` };
        },
        taskState,
        tasksRef
      });
    }
    function getRequeueUpdates(keys, metadataKey) {
      return keys.reduce(
        (acc, key) => {
          acc[`${"task" /* task */}/${key}/${"state" /* state */}`] = "waiting" /* waiting */;
          acc[`${"task" /* task */}/${key}/${"started" /* started */}`] = null;
          acc[`${"task" /* task */}/${key}/${"completed" /* completed */}`] = null;
          return acc;
        },
        {
          [`${"metadata" /* metadata */}/${metadataKey}`]: increment(-keys.length),
          [`${"metadata" /* metadata */}/${"waitingCount" /* waitingCount */}`]: increment(keys.length)
        }
      );
    }
    return {
      add,
      empty,
      stop,
      start,
      metadataRef,
      tasksRef,
      requeueByKey,
      requeueByState
    };
  }

  // ../../packages/data/media-items.ts
  var mediaItemSchema = mod.object({
    id: mod.string(),
    description: mod.string().optional(),
    productUrl: mod.string(),
    baseUrl: mod.string(),
    mimeType: mod.string(),
    filename: mod.string(),
    mediaMetadata: mod.object({
      creationTime: mod.string(),
      width: mod.string(),
      height: mod.string(),
      video: mod.object({
        cameraMake: mod.string().optional(),
        cameraModel: mod.string().optional(),
        fps: mod.number().optional(),
        status: mod.enum(["UNSPECIFIED", "PROCESSING", "FAILED", "READY"])
      }).optional(),
      photo: mod.object({
        cameraMake: mod.string().optional(),
        cameraModel: mod.string().optional(),
        focalLength: mod.number().optional(),
        apertureFNumber: mod.number().optional(),
        isoEquivalent: mod.number().optional(),
        exposureTime: mod.string().optional()
      }).optional()
    }),
    contributorInfo: mod.object({ profilePictureBaseUrl: mod.string().optional(), displayName: mod.string().optional() }).optional()
  });
  var mediaItemsResponseSchema = mod.object({
    accessToken: mod.string(),
    refreshToken: mod.string(),
    mediaItems: mod.array(mediaItemSchema),
    nextPageToken: mod.string().optional()
  });

  // ../../packages/data/download.ts
  var downloadSchema = mod.object({ ["mediaItem" /* mediaItem */]: mediaItemSchema });
  var downloadTaskSchema = taskSchema.extend({
    ["data" /* data */]: mod.object({
      ["mediaItem" /* mediaItem */]: mediaItemSchema.optional()
    })
  });
  function getDownloadQueueRefPath({ userId, syncTaskId }) {
    return `download-queue/${userId}/${syncTaskId}`;
  }

  // ../../packages/data/sync.ts
  var SyncStage = /* @__PURE__ */ ((SyncStage2) => {
    SyncStage2["ready"] = "ready";
    SyncStage2["downloading"] = "downloading";
    return SyncStage2;
  })(SyncStage || {});
  var syncTaskSchema = mod.object({
    ["accessToken" /* accessToken */]: mod.string(),
    ["accessTokenCreated" /* accessTokenCreated */]: mod.number(),
    ["refreshToken" /* refreshToken */]: mod.string(),
    ["taskName" /* taskName */]: mod.string(),
    ["directoryHandle" /* directoryHandle */]: mod.any().refine((obj) => obj instanceof FileSystemDirectoryHandle, { message: "Must be a FileSystemDirectoryHandle" }),
    ["fileCount" /* fileCount */]: mod.number(),
    ["importedCount" /* importedCount */]: mod.number(),
    ["processedCount" /* processedCount */]: mod.number(),
    ["exportedCount" /* exportedCount */]: mod.number(),
    ["created" /* created */]: mod.date(),
    ["stage" /* stage */]: mod.nativeEnum(SyncStage),
    ["paused" /* paused */]: mod.boolean().optional().transform((val) => val ?? false),
    ["previousPageToken" /* previousPageToken */]: mod.string().nullable().optional(),
    ["nextPageToken" /* nextPageToken */]: mod.string().nullable().optional()
  });
  var syncTaskRecordSchema = mod.object({
    ["accessToken" /* accessToken */]: mod.string(),
    ["accessTokenCreated" /* accessTokenCreated */]: mod.number(),
    ["refreshToken" /* refreshToken */]: mod.string(),
    ["taskName" /* taskName */]: mod.string(),
    ["fileCount" /* fileCount */]: mod.number(),
    ["importedCount" /* importedCount */]: mod.number(),
    ["processedCount" /* processedCount */]: mod.number(),
    ["exportedCount" /* exportedCount */]: mod.number(),
    ["directoryName" /* directoryName */]: mod.string(),
    ["created" /* created */]: mod.string(),
    ["stage" /* stage */]: mod.nativeEnum(SyncStage),
    ["paused" /* paused */]: mod.boolean().optional().transform((val) => val ?? false),
    ["previousPageToken" /* previousPageToken */]: mod.string().nullable().optional(),
    ["nextPageToken" /* nextPageToken */]: mod.string().nullable().optional()
  });
  function getSyncTasksRefPath(userId) {
    return `sync-tasks/${userId}`;
  }
  function getSyncTaskRefPath({ taskId, userId }) {
    return `${getSyncTasksRefPath(userId)}/${taskId}`;
  }

  // ../../packages/ui/utils/app.ts
  function isServer() {
    return typeof window === "undefined" && !isServiceWorker();
  }
  function isClient(callback) {
    const isClient2 = typeof window !== "undefined" || isServiceWorker();
    return isClient2 && callback ? callback() : isClient2;
  }
  function isServiceWorker() {
    return typeof self !== "undefined";
  }

  // ../../packages/ui/utils/firebase.ts
  function getPath(ref2) {
    return ref2.toString().replace(ref2.root.toString(), "");
  }

  // ../../packages/ui/utils/url.ts
  function addParams(uri, params) {
    const url = new URL(uri);
    const keys = Object.keys(params);
    keys.forEach((key) => {
      const value = params[key];
      const isDefined = typeof value !== "undefined";
      isDefined && url.searchParams.append(key, String(value));
    });
    return url.toString();
  }

  // ../../packages/ui/utils/localforage.ts
  var localforage_exports = {};
  __export(localforage_exports, {
    LocalforageDataType: () => LocalforageDataType,
    addSyncTask: () => addSyncTask,
    clear: () => clear,
    clearSyncTasks: () => clearSyncTasks,
    getSyncTask: () => getSyncTask,
    removeSyncTask: () => removeSyncTask,
    updateSyncTask: () => updateSyncTask
  });

  // ../../node_modules/immer/dist/immer.esm.mjs
  function n(n2) {
    for (var r2 = arguments.length, t2 = Array(r2 > 1 ? r2 - 1 : 0), e = 1; e < r2; e++)
      t2[e - 1] = arguments[e];
    if (true) {
      var i2 = Y[n2], o2 = i2 ? "function" == typeof i2 ? i2.apply(null, t2) : i2 : "unknown error nr: " + n2;
      throw Error("[Immer] " + o2);
    }
    throw Error("[Immer] minified error nr: " + n2 + (t2.length ? " " + t2.map(function(n3) {
      return "'" + n3 + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
  }
  function r(n2) {
    return !!n2 && !!n2[Q];
  }
  function t(n2) {
    var r2;
    return !!n2 && (function(n3) {
      if (!n3 || "object" != typeof n3)
        return false;
      var r3 = Object.getPrototypeOf(n3);
      if (null === r3)
        return true;
      var t2 = Object.hasOwnProperty.call(r3, "constructor") && r3.constructor;
      return t2 === Object || "function" == typeof t2 && Function.toString.call(t2) === Z;
    }(n2) || Array.isArray(n2) || !!n2[L] || !!(null === (r2 = n2.constructor) || void 0 === r2 ? void 0 : r2[L]) || s(n2) || v(n2));
  }
  function i(n2, r2, t2) {
    void 0 === t2 && (t2 = false), 0 === o(n2) ? (t2 ? Object.keys : nn)(n2).forEach(function(e) {
      t2 && "symbol" == typeof e || r2(e, n2[e], n2);
    }) : n2.forEach(function(t3, e) {
      return r2(e, t3, n2);
    });
  }
  function o(n2) {
    var r2 = n2[Q];
    return r2 ? r2.i > 3 ? r2.i - 4 : r2.i : Array.isArray(n2) ? 1 : s(n2) ? 2 : v(n2) ? 3 : 0;
  }
  function u(n2, r2) {
    return 2 === o(n2) ? n2.has(r2) : Object.prototype.hasOwnProperty.call(n2, r2);
  }
  function a(n2, r2) {
    return 2 === o(n2) ? n2.get(r2) : n2[r2];
  }
  function f2(n2, r2, t2) {
    var e = o(n2);
    2 === e ? n2.set(r2, t2) : 3 === e ? (n2.delete(r2), n2.add(t2)) : n2[r2] = t2;
  }
  function c(n2, r2) {
    return n2 === r2 ? 0 !== n2 || 1 / n2 == 1 / r2 : n2 != n2 && r2 != r2;
  }
  function s(n2) {
    return X && n2 instanceof Map;
  }
  function v(n2) {
    return q && n2 instanceof Set;
  }
  function p(n2) {
    return n2.o || n2.t;
  }
  function l(n2) {
    if (Array.isArray(n2))
      return Array.prototype.slice.call(n2);
    var r2 = rn(n2);
    delete r2[Q];
    for (var t2 = nn(r2), e = 0; e < t2.length; e++) {
      var i2 = t2[e], o2 = r2[i2];
      false === o2.writable && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (r2[i2] = { configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i2] });
    }
    return Object.create(Object.getPrototypeOf(n2), r2);
  }
  function d(n2, e) {
    return void 0 === e && (e = false), y(n2) || r(n2) || !t(n2) ? n2 : (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e && i(n2, function(n3, r2) {
      return d(r2, true);
    }, true), n2);
  }
  function h() {
    n(2);
  }
  function y(n2) {
    return null == n2 || "object" != typeof n2 || Object.isFrozen(n2);
  }
  function b(r2) {
    var t2 = tn[r2];
    return t2 || n(18, r2), t2;
  }
  function m(n2, r2) {
    tn[n2] || (tn[n2] = r2);
  }
  function _() {
    return U || n(0), U;
  }
  function j(n2, r2) {
    r2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = r2);
  }
  function O(n2) {
    g(n2), n2.p.forEach(S), n2.p = null;
  }
  function g(n2) {
    n2 === U && (U = n2.l);
  }
  function w(n2) {
    return U = { p: [], l: U, h: n2, m: true, _: 0 };
  }
  function S(n2) {
    var r2 = n2[Q];
    0 === r2.i || 1 === r2.i ? r2.j() : r2.O = true;
  }
  function P(r2, e) {
    e._ = e.p.length;
    var i2 = e.p[0], o2 = void 0 !== r2 && r2 !== i2;
    return e.h.g || b("ES5").S(e, r2, o2), o2 ? (i2[Q].P && (O(e), n(4)), t(r2) && (r2 = M(e, r2), e.l || x(e, r2)), e.u && b("Patches").M(i2[Q].t, r2, e.u, e.s)) : r2 = M(e, i2, []), O(e), e.u && e.v(e.u, e.s), r2 !== H ? r2 : void 0;
  }
  function M(n2, r2, t2) {
    if (y(r2))
      return r2;
    var e = r2[Q];
    if (!e)
      return i(r2, function(i2, o3) {
        return A(n2, e, r2, i2, o3, t2);
      }, true), r2;
    if (e.A !== n2)
      return r2;
    if (!e.P)
      return x(n2, e.t, true), e.t;
    if (!e.I) {
      e.I = true, e.A._--;
      var o2 = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o;
      i(3 === e.i ? new Set(o2) : o2, function(r3, i2) {
        return A(n2, e, o2, r3, i2, t2);
      }), x(n2, o2, false), t2 && n2.u && b("Patches").R(e, t2, n2.u, n2.s);
    }
    return e.o;
  }
  function A(e, i2, o2, a2, c2, s2) {
    if (c2 === o2 && n(5), r(c2)) {
      var v2 = M(e, c2, s2 && i2 && 3 !== i2.i && !u(i2.D, a2) ? s2.concat(a2) : void 0);
      if (f2(o2, a2, v2), !r(v2))
        return;
      e.m = false;
    }
    if (t(c2) && !y(c2)) {
      if (!e.h.F && e._ < 1)
        return;
      M(e, c2), i2 && i2.A.l || x(e, c2);
    }
  }
  function x(n2, r2, t2) {
    void 0 === t2 && (t2 = false), n2.h.F && n2.m && d(r2, t2);
  }
  function z(n2, r2) {
    var t2 = n2[Q];
    return (t2 ? p(t2) : n2)[r2];
  }
  function I(n2, r2) {
    if (r2 in n2)
      for (var t2 = Object.getPrototypeOf(n2); t2; ) {
        var e = Object.getOwnPropertyDescriptor(t2, r2);
        if (e)
          return e;
        t2 = Object.getPrototypeOf(t2);
      }
  }
  function k(n2) {
    n2.P || (n2.P = true, n2.l && k(n2.l));
  }
  function E(n2) {
    n2.o || (n2.o = l(n2.t));
  }
  function R(n2, r2, t2) {
    var e = s(r2) ? b("MapSet").N(r2, t2) : v(r2) ? b("MapSet").T(r2, t2) : n2.g ? function(n3, r3) {
      var t3 = Array.isArray(n3), e2 = { i: t3 ? 1 : 0, A: r3 ? r3.A : _(), P: false, I: false, D: {}, l: r3, t: n3, k: null, o: null, j: null, C: false }, i2 = e2, o2 = en;
      t3 && (i2 = [e2], o2 = on);
      var u2 = Proxy.revocable(i2, o2), a2 = u2.revoke, f3 = u2.proxy;
      return e2.k = f3, e2.j = a2, f3;
    }(r2, t2) : b("ES5").J(r2, t2);
    return (t2 ? t2.A : _()).p.push(e), e;
  }
  function D(e) {
    return r(e) || n(22, e), function n2(r2) {
      if (!t(r2))
        return r2;
      var e2, u2 = r2[Q], c2 = o(r2);
      if (u2) {
        if (!u2.P && (u2.i < 4 || !b("ES5").K(u2)))
          return u2.t;
        u2.I = true, e2 = F(r2, c2), u2.I = false;
      } else
        e2 = F(r2, c2);
      return i(e2, function(r3, t2) {
        u2 && a(u2.t, r3) === t2 || f2(e2, r3, n2(t2));
      }), 3 === c2 ? new Set(e2) : e2;
    }(e);
  }
  function F(n2, r2) {
    switch (r2) {
      case 2:
        return new Map(n2);
      case 3:
        return Array.from(n2);
    }
    return l(n2);
  }
  function C() {
    function r2(n2, r3) {
      function t2() {
        this.constructor = n2;
      }
      a2(n2, r3), n2.prototype = (t2.prototype = r3.prototype, new t2());
    }
    function e(n2) {
      n2.o || (n2.D = /* @__PURE__ */ new Map(), n2.o = new Map(n2.t));
    }
    function o2(n2) {
      n2.o || (n2.o = /* @__PURE__ */ new Set(), n2.t.forEach(function(r3) {
        if (t(r3)) {
          var e2 = R(n2.A.h, r3, n2);
          n2.p.set(r3, e2), n2.o.add(e2);
        } else
          n2.o.add(r3);
      }));
    }
    function u2(r3) {
      r3.O && n(3, JSON.stringify(p(r3)));
    }
    var a2 = function(n2, r3) {
      return (a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, r4) {
        n3.__proto__ = r4;
      } || function(n3, r4) {
        for (var t2 in r4)
          r4.hasOwnProperty(t2) && (n3[t2] = r4[t2]);
      })(n2, r3);
    }, f3 = function() {
      function n2(n3, r3) {
        return this[Q] = { i: 2, l: r3, A: r3 ? r3.A : _(), P: false, I: false, o: void 0, D: void 0, t: n3, k: this, C: false, O: false }, this;
      }
      r2(n2, Map);
      var o3 = n2.prototype;
      return Object.defineProperty(o3, "size", { get: function() {
        return p(this[Q]).size;
      } }), o3.has = function(n3) {
        return p(this[Q]).has(n3);
      }, o3.set = function(n3, r3) {
        var t2 = this[Q];
        return u2(t2), p(t2).has(n3) && p(t2).get(n3) === r3 || (e(t2), k(t2), t2.D.set(n3, true), t2.o.set(n3, r3), t2.D.set(n3, true)), this;
      }, o3.delete = function(n3) {
        if (!this.has(n3))
          return false;
        var r3 = this[Q];
        return u2(r3), e(r3), k(r3), r3.t.has(n3) ? r3.D.set(n3, false) : r3.D.delete(n3), r3.o.delete(n3), true;
      }, o3.clear = function() {
        var n3 = this[Q];
        u2(n3), p(n3).size && (e(n3), k(n3), n3.D = /* @__PURE__ */ new Map(), i(n3.t, function(r3) {
          n3.D.set(r3, false);
        }), n3.o.clear());
      }, o3.forEach = function(n3, r3) {
        var t2 = this;
        p(this[Q]).forEach(function(e2, i2) {
          n3.call(r3, t2.get(i2), i2, t2);
        });
      }, o3.get = function(n3) {
        var r3 = this[Q];
        u2(r3);
        var i2 = p(r3).get(n3);
        if (r3.I || !t(i2))
          return i2;
        if (i2 !== r3.t.get(n3))
          return i2;
        var o4 = R(r3.A.h, i2, r3);
        return e(r3), r3.o.set(n3, o4), o4;
      }, o3.keys = function() {
        return p(this[Q]).keys();
      }, o3.values = function() {
        var n3, r3 = this, t2 = this.keys();
        return (n3 = {})[V] = function() {
          return r3.values();
        }, n3.next = function() {
          var n4 = t2.next();
          return n4.done ? n4 : { done: false, value: r3.get(n4.value) };
        }, n3;
      }, o3.entries = function() {
        var n3, r3 = this, t2 = this.keys();
        return (n3 = {})[V] = function() {
          return r3.entries();
        }, n3.next = function() {
          var n4 = t2.next();
          if (n4.done)
            return n4;
          var e2 = r3.get(n4.value);
          return { done: false, value: [n4.value, e2] };
        }, n3;
      }, o3[V] = function() {
        return this.entries();
      }, n2;
    }(), c2 = function() {
      function n2(n3, r3) {
        return this[Q] = { i: 3, l: r3, A: r3 ? r3.A : _(), P: false, I: false, o: void 0, t: n3, k: this, p: /* @__PURE__ */ new Map(), O: false, C: false }, this;
      }
      r2(n2, Set);
      var t2 = n2.prototype;
      return Object.defineProperty(t2, "size", { get: function() {
        return p(this[Q]).size;
      } }), t2.has = function(n3) {
        var r3 = this[Q];
        return u2(r3), r3.o ? !!r3.o.has(n3) || !(!r3.p.has(n3) || !r3.o.has(r3.p.get(n3))) : r3.t.has(n3);
      }, t2.add = function(n3) {
        var r3 = this[Q];
        return u2(r3), this.has(n3) || (o2(r3), k(r3), r3.o.add(n3)), this;
      }, t2.delete = function(n3) {
        if (!this.has(n3))
          return false;
        var r3 = this[Q];
        return u2(r3), o2(r3), k(r3), r3.o.delete(n3) || !!r3.p.has(n3) && r3.o.delete(r3.p.get(n3));
      }, t2.clear = function() {
        var n3 = this[Q];
        u2(n3), p(n3).size && (o2(n3), k(n3), n3.o.clear());
      }, t2.values = function() {
        var n3 = this[Q];
        return u2(n3), o2(n3), n3.o.values();
      }, t2.entries = function() {
        var n3 = this[Q];
        return u2(n3), o2(n3), n3.o.entries();
      }, t2.keys = function() {
        return this.values();
      }, t2[V] = function() {
        return this.values();
      }, t2.forEach = function(n3, r3) {
        for (var t3 = this.values(), e2 = t3.next(); !e2.done; )
          n3.call(r3, e2.value, e2.value, this), e2 = t3.next();
      }, n2;
    }();
    m("MapSet", { N: function(n2, r3) {
      return new f3(n2, r3);
    }, T: function(n2, r3) {
      return new c2(n2, r3);
    } });
  }
  var G;
  var U;
  var W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x");
  var X = "undefined" != typeof Map;
  var q = "undefined" != typeof Set;
  var B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect;
  var H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G);
  var L = W ? Symbol.for("immer-draftable") : "__$immer_draftable";
  var Q = W ? Symbol.for("immer-state") : "__$immer_state";
  var V = "undefined" != typeof Symbol && Symbol.iterator || "@@iterator";
  var Y = { 0: "Illegal state", 1: "Immer drafts cannot have computed properties", 2: "This object has been frozen and should not be mutated", 3: function(n2) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n2;
  }, 4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", 5: "Immer forbids circular references", 6: "The first or second argument to `produce` must be a function", 7: "The third argument to `produce` must be a function or undefined", 8: "First argument to `createDraft` must be a plain object, an array, or an immerable object", 9: "First argument to `finishDraft` must be a draft returned by `createDraft`", 10: "The given draft is already finalized", 11: "Object.defineProperty() cannot be used on an Immer draft", 12: "Object.setPrototypeOf() cannot be used on an Immer draft", 13: "Immer only supports deleting array indices", 14: "Immer only supports setting array indices and the 'length' property", 15: function(n2) {
    return "Cannot apply patch, path doesn't resolve: " + n2;
  }, 16: 'Sets cannot have "replace" patches.', 17: function(n2) {
    return "Unsupported patch operation: " + n2;
  }, 18: function(n2) {
    return "The plugin for '" + n2 + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n2 + "()` when initializing your application.";
  }, 20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available", 21: function(n2) {
    return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n2 + "'";
  }, 22: function(n2) {
    return "'current' expects a draft, got: " + n2;
  }, 23: function(n2) {
    return "'original' expects a draft, got: " + n2;
  }, 24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed" };
  var Z = "" + Object.prototype.constructor;
  var nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n2) {
    return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
  } : Object.getOwnPropertyNames;
  var rn = Object.getOwnPropertyDescriptors || function(n2) {
    var r2 = {};
    return nn(n2).forEach(function(t2) {
      r2[t2] = Object.getOwnPropertyDescriptor(n2, t2);
    }), r2;
  };
  var tn = {};
  var en = { get: function(n2, r2) {
    if (r2 === Q)
      return n2;
    var e = p(n2);
    if (!u(e, r2))
      return function(n3, r3, t2) {
        var e2, i3 = I(r3, t2);
        return i3 ? "value" in i3 ? i3.value : null === (e2 = i3.get) || void 0 === e2 ? void 0 : e2.call(n3.k) : void 0;
      }(n2, e, r2);
    var i2 = e[r2];
    return n2.I || !t(i2) ? i2 : i2 === z(n2.t, r2) ? (E(n2), n2.o[r2] = R(n2.A.h, i2, n2)) : i2;
  }, has: function(n2, r2) {
    return r2 in p(n2);
  }, ownKeys: function(n2) {
    return Reflect.ownKeys(p(n2));
  }, set: function(n2, r2, t2) {
    var e = I(p(n2), r2);
    if (null == e ? void 0 : e.set)
      return e.set.call(n2.k, t2), true;
    if (!n2.P) {
      var i2 = z(p(n2), r2), o2 = null == i2 ? void 0 : i2[Q];
      if (o2 && o2.t === t2)
        return n2.o[r2] = t2, n2.D[r2] = false, true;
      if (c(t2, i2) && (void 0 !== t2 || u(n2.t, r2)))
        return true;
      E(n2), k(n2);
    }
    return n2.o[r2] === t2 && "number" != typeof t2 && (void 0 !== t2 || r2 in n2.o) || (n2.o[r2] = t2, n2.D[r2] = true, true);
  }, deleteProperty: function(n2, r2) {
    return void 0 !== z(n2.t, r2) || r2 in n2.t ? (n2.D[r2] = false, E(n2), k(n2)) : delete n2.D[r2], n2.o && delete n2.o[r2], true;
  }, getOwnPropertyDescriptor: function(n2, r2) {
    var t2 = p(n2), e = Reflect.getOwnPropertyDescriptor(t2, r2);
    return e ? { writable: true, configurable: 1 !== n2.i || "length" !== r2, enumerable: e.enumerable, value: t2[r2] } : e;
  }, defineProperty: function() {
    n(11);
  }, getPrototypeOf: function(n2) {
    return Object.getPrototypeOf(n2.t);
  }, setPrototypeOf: function() {
    n(12);
  } };
  var on = {};
  i(en, function(n2, r2) {
    on[n2] = function() {
      return arguments[0] = arguments[0][0], r2.apply(this, arguments);
    };
  }), on.deleteProperty = function(r2, t2) {
    return isNaN(parseInt(t2)) && n(13), on.set.call(this, r2, t2, void 0);
  }, on.set = function(r2, t2, e) {
    return "length" !== t2 && isNaN(parseInt(t2)) && n(14), en.set.call(this, r2[0], t2, e, r2[0]);
  };
  var un = function() {
    function e(r2) {
      var e2 = this;
      this.g = B, this.F = true, this.produce = function(r3, i3, o2) {
        if ("function" == typeof r3 && "function" != typeof i3) {
          var u2 = i3;
          i3 = r3;
          var a2 = e2;
          return function(n2) {
            var r4 = this;
            void 0 === n2 && (n2 = u2);
            for (var t2 = arguments.length, e3 = Array(t2 > 1 ? t2 - 1 : 0), o3 = 1; o3 < t2; o3++)
              e3[o3 - 1] = arguments[o3];
            return a2.produce(n2, function(n3) {
              var t3;
              return (t3 = i3).call.apply(t3, [r4, n3].concat(e3));
            });
          };
        }
        var f3;
        if ("function" != typeof i3 && n(6), void 0 !== o2 && "function" != typeof o2 && n(7), t(r3)) {
          var c2 = w(e2), s2 = R(e2, r3, void 0), v2 = true;
          try {
            f3 = i3(s2), v2 = false;
          } finally {
            v2 ? O(c2) : g(c2);
          }
          return "undefined" != typeof Promise && f3 instanceof Promise ? f3.then(function(n2) {
            return j(c2, o2), P(n2, c2);
          }, function(n2) {
            throw O(c2), n2;
          }) : (j(c2, o2), P(f3, c2));
        }
        if (!r3 || "object" != typeof r3) {
          if (void 0 === (f3 = i3(r3)) && (f3 = r3), f3 === H && (f3 = void 0), e2.F && d(f3, true), o2) {
            var p2 = [], l2 = [];
            b("Patches").M(r3, f3, p2, l2), o2(p2, l2);
          }
          return f3;
        }
        n(21, r3);
      }, this.produceWithPatches = function(n2, r3) {
        if ("function" == typeof n2)
          return function(r4) {
            for (var t3 = arguments.length, i4 = Array(t3 > 1 ? t3 - 1 : 0), o3 = 1; o3 < t3; o3++)
              i4[o3 - 1] = arguments[o3];
            return e2.produceWithPatches(r4, function(r5) {
              return n2.apply(void 0, [r5].concat(i4));
            });
          };
        var t2, i3, o2 = e2.produce(n2, r3, function(n3, r4) {
          t2 = n3, i3 = r4;
        });
        return "undefined" != typeof Promise && o2 instanceof Promise ? o2.then(function(n3) {
          return [n3, t2, i3];
        }) : [o2, t2, i3];
      }, "boolean" == typeof (null == r2 ? void 0 : r2.useProxies) && this.setUseProxies(r2.useProxies), "boolean" == typeof (null == r2 ? void 0 : r2.autoFreeze) && this.setAutoFreeze(r2.autoFreeze);
    }
    var i2 = e.prototype;
    return i2.createDraft = function(e2) {
      t(e2) || n(8), r(e2) && (e2 = D(e2));
      var i3 = w(this), o2 = R(this, e2, void 0);
      return o2[Q].C = true, g(i3), o2;
    }, i2.finishDraft = function(r2, t2) {
      var e2 = r2 && r2[Q];
      e2 && e2.C || n(9), e2.I && n(10);
      var i3 = e2.A;
      return j(i3, t2), P(void 0, i3);
    }, i2.setAutoFreeze = function(n2) {
      this.F = n2;
    }, i2.setUseProxies = function(r2) {
      r2 && !B && n(20), this.g = r2;
    }, i2.applyPatches = function(n2, t2) {
      var e2;
      for (e2 = t2.length - 1; e2 >= 0; e2--) {
        var i3 = t2[e2];
        if (0 === i3.path.length && "replace" === i3.op) {
          n2 = i3.value;
          break;
        }
      }
      e2 > -1 && (t2 = t2.slice(e2 + 1));
      var o2 = b("Patches").$;
      return r(n2) ? o2(n2, t2) : this.produce(n2, function(n3) {
        return o2(n3, t2);
      });
    }, e;
  }();
  var an = new un();
  var fn = an.produce;
  var cn = an.produceWithPatches.bind(an);
  var sn = an.setAutoFreeze.bind(an);
  var vn = an.setUseProxies.bind(an);
  var pn = an.applyPatches.bind(an);
  var ln = an.createDraft.bind(an);
  var dn = an.finishDraft.bind(an);

  // ../../packages/ui/utils/localforage.ts
  var import_localforage = __toESM(require_localforage());
  C();
  isClient && isClient(() => {
    import_localforage.default.config({
      driver: [import_localforage.default.INDEXEDDB, import_localforage.default.LOCALSTORAGE, import_localforage.default.WEBSQL],
      name: "jupiter-storage"
    });
  });
  var LocalforageDataType = /* @__PURE__ */ ((LocalforageDataType2) => {
    LocalforageDataType2["SyncTasks"] = "sync-tasks";
    return LocalforageDataType2;
  })(LocalforageDataType || {});
  function getSyncTask(id) {
    return __async(this, null, function* () {
      const syncTasks = yield getSyncTasks();
      return syncTasks ? syncTasks[id] : null;
    });
  }
  function addSyncTask(id, task) {
    return __async(this, null, function* () {
      const syncTasks = yield getSyncTasks();
      return setSyncTasks(__spreadProps(__spreadValues({}, syncTasks), { [id]: task }));
    });
  }
  function updateSyncTask(id, updates) {
    return __async(this, null, function* () {
      const syncTasks = yield getSyncTasks();
      const syncTask = syncTasks ? syncTasks[id] : null;
      const updatedSyncTask = syncTaskSchema.parse(__spreadValues(__spreadValues({}, syncTask), updates));
      yield setSyncTasks(__spreadProps(__spreadValues({}, syncTasks), { [id]: updatedSyncTask }));
      return updatedSyncTask;
    });
  }
  function removeSyncTask(id) {
    return __async(this, null, function* () {
      const syncTasks = yield getSyncTasks();
      if (syncTasks && syncTasks[id]) {
        const _a = syncTasks, { [id]: _2 } = _a, newSyncTasks = __objRest(_a, [__restKey(id)]);
        setSyncTasks(newSyncTasks);
        return true;
      } else {
        console.warn(`Could not find sync task with id ${id}`);
        return false;
      }
    });
  }
  function clearSyncTasks() {
    return __async(this, null, function* () {
      return import_localforage.default.removeItem("sync-tasks" /* SyncTasks */);
    });
  }
  var getSyncTasks = createGetter("sync-tasks" /* SyncTasks */, null);
  var setSyncTasks = createSetter("sync-tasks" /* SyncTasks */);
  function createGetter(key, defaultValue) {
    return isServer && isServer() ? () => __async(this, null, function* () {
    }) : () => __async(this, null, function* () {
      const value = yield import_localforage.default.getItem(key);
      return value === null ? defaultValue : deserialize(value);
    });
  }
  function createSetter(key) {
    return isServer && isServer() ? () => __async(this, null, function* () {
    }) : (value) => __async(this, null, function* () {
      return import_localforage.default.setItem(key, serialize(value));
    });
  }
  function serialize(object) {
    const isImmerable = getIsImmerable(object);
    const isArray = Array.isArray(object);
    const cannotSerialize = object instanceof FileSystemDirectoryHandle || object instanceof FileSystemFileHandle || object instanceof Date;
    if (cannotSerialize) {
      return object;
    } else if (!isImmerable && isArray) {
      return object.map(serialize);
    } else {
      return fn(object, (draft) => {
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key];
            if (value instanceof Set) {
              const set2 = value;
              draft[key] = { __isSet: true, value: [...set2] };
            } else if (typeof value === "object") {
              draft[key] = serialize(value);
            } else if (typeof value === "function") {
              delete draft[key];
            }
          }
        }
      });
    }
  }
  function deserialize(object) {
    const isImmerable = getIsImmerable(object);
    return !isImmerable ? object : fn(
      object,
      (draft) => {
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key];
            if (value == null ? void 0 : value.__isSet) {
              draft[key] = new Set(value.value);
            } else if (typeof value === "object") {
              draft[key] = deserialize(value);
            }
          }
        }
      }
    );
  }
  function getIsImmerable(object) {
    const isPlainObject = !!object && Object.getPrototypeOf(object) === Object.prototype;
    const isMap = object instanceof Map;
    const isSet = object instanceof Set;
    const isImmerable = !!object && object[L] === true;
    return isPlainObject || isMap || isSet || isImmerable;
  }
  var clear = () => import_localforage.default.clear();

  // ../../packages/data/web.ts
  var WEB = {
    API: {
      MEDIA_ITEMS: "/api/media-items",
      OAUTH2: "/api/oauth2"
    },
    DATABASE: {
      PATHS: {
        SYNC_TASKS: (userId) => `sync-tasks/${userId}`
      }
    },
    FIREBASE: {
      APP_NAME: "google-photos",
      apiKey: "AIzaSyCwCbnCcsSyqLdpMGygRFGp-xMfdZDVSEA",
      authDomain: "photos-tools-2022.firebaseapp.com",
      projectId: "photos-tools-2022",
      storageBucket: "photos-tools-2022.appspot.com",
      messagingSenderId: "550579950350",
      appId: "1:550579950350:web:d32a68a214c5c58a273d5f",
      measurementId: "G-5M5ME2ZH0R"
    },
    FIRESTORE: {
      COLLECTIONS: {
        LIBRARIES: (userId) => `users/${userId}/libraries'`,
        LIBRARY: (userId, libraryId) => `users/${userId}/libraries/${libraryId}`
      }
    },
    ROUTES: {
      ROOT: "/",
      PHOTOS: "/photos",
      SYNC: "/photos/sync"
    }
  };

  // src/sync-task.ts
  var BATCH_SIZE = 10;
  var ONE_HOUR_IN_MS = 36e5;
  async function startSyncTask({
    database: database2,
    taskId,
    userId
  }) {
    const syncTaskRefPath = getSyncTaskRefPath({ userId, taskId });
    const syncTaskRef = ref(database2, syncTaskRefPath);
    const task = await localforage_exports.getSyncTask(taskId);
    const queue = Queue({
      batchSize: BATCH_SIZE,
      callback: async () => {
        return new Promise((resolve) => {
          const random = Math.random();
          const timeout = random * 1e3 * 2;
          const success = random > 0.5;
          setTimeout(() => {
            resolve({ success, message: `r: ${Math.round(random * 1e3) / 1e3}` });
          }, timeout);
        });
      },
      ref: ref(database2, getDownloadQueueRefPath({ userId, syncTaskId: taskId }))
    });
    const unsubscribeMetadata = onValue(queue.metadataRef, (dataSnapshot) => {
      const value = dataSnapshot.val();
      const parsed = metadataSchema.safeParse(value);
      const hasNotStarted = !value;
      let shouldAddNextPage = hasNotStarted;
      if (parsed.success) {
        const { activeCount, waitingCount } = parsed.data;
        shouldAddNextPage = !activeCount && !waitingCount;
        console.log({ activeCount, waitingCount, shouldAddNextPage });
      }
      console.log({ shouldAddNextPage, value });
      shouldAddNextPage && task && addNextPage({ queue, syncTaskRef, task, taskId });
    });
    return {
      queue,
      unsubscribe: () => {
        unsubscribeMetadata();
        queue.stop();
      }
    };
  }
  async function addNextPage({
    queue,
    syncTaskRef,
    task,
    taskId
  }) {
    const isExpiredAccessToken = Date.now() - task.accessTokenCreated > ONE_HOUR_IN_MS;
    const accessTokenCreated = isExpiredAccessToken ? Date.now() : task.accessTokenCreated;
    const url = addParams(`${location.origin}${WEB.API.MEDIA_ITEMS}`, {
      pageSize: 100,
      pageToken: task.nextPageToken,
      accessToken: isExpiredAccessToken ? void 0 : task.accessToken,
      refreshToken: task.refreshToken
    });
    const response = await fetch(url);
    const data = await response.json();
    console.log({ data });
    debugger;
    const { mediaItems, accessToken, nextPageToken } = mediaItemsResponseSchema.parse(data);
    const count = mediaItems.length;
    const downloadTasks = mediaItems.map((mediaItem) => downloadSchema.parse({ ["mediaItem" /* mediaItem */]: mediaItem }));
    await queue.add(downloadTasks);
    await update(syncTaskRef, {
      ["accessToken" /* accessToken */]: accessToken,
      ["accessTokenCreated" /* accessTokenCreated */]: accessTokenCreated,
      ["fileCount" /* fileCount */]: increment(count),
      ["importedCount" /* importedCount */]: increment(count),
      ["previousPageToken" /* previousPageToken */]: task.nextPageToken,
      ["nextPageToken" /* nextPageToken */]: nextPageToken,
      ["stage" /* stage */]: "downloading" /* downloading */
    });
    await localforage_exports.updateSyncTask(taskId, {
      ["accessToken" /* accessToken */]: accessToken,
      ["accessTokenCreated" /* accessTokenCreated */]: accessTokenCreated,
      ["fileCount" /* fileCount */]: task.fileCount + count,
      ["importedCount" /* importedCount */]: task.importedCount + count,
      ["nextPageToken" /* nextPageToken */]: nextPageToken
    });
  }

  // ../../node_modules/tslib/modules/index.js
  var import_tslib = __toESM(require_tslib(), 1);
  var {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __metadata,
    __awaiter,
    __generator,
    __exportStar,
    __createBinding,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn
  } = import_tslib.default;

  // ../../node_modules/@firebase/auth/dist/esm2017/index-0bb4da3b.js
  function _prodErrorMap() {
    return {
      ["dependent-sdk-initialized-before-auth"]: "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
    };
  }
  var prodErrorMap = _prodErrorMap;
  var _DEFAULT_AUTH_ERROR_FACTORY = new ErrorFactory("auth", "Firebase", _prodErrorMap());
  var logClient2 = new Logger("@firebase/auth");
  function _logError(msg, ...args) {
    if (logClient2.logLevel <= LogLevel.ERROR) {
      logClient2.error(`Auth (${SDK_VERSION}): ${msg}`, ...args);
    }
  }
  function _fail(authOrCode, ...rest) {
    throw createErrorInternal(authOrCode, ...rest);
  }
  function _createError(authOrCode, ...rest) {
    return createErrorInternal(authOrCode, ...rest);
  }
  function _errorWithCustomMessage(auth, code, message) {
    const errorMap2 = Object.assign(Object.assign({}, prodErrorMap()), { [code]: message });
    const factory = new ErrorFactory("auth", "Firebase", errorMap2);
    return factory.create(code, {
      appName: auth.name
    });
  }
  function createErrorInternal(authOrCode, ...rest) {
    if (typeof authOrCode !== "string") {
      const code = rest[0];
      const fullParams = [...rest.slice(1)];
      if (fullParams[0]) {
        fullParams[0].appName = authOrCode.name;
      }
      return authOrCode._errorFactory.create(code, ...fullParams);
    }
    return _DEFAULT_AUTH_ERROR_FACTORY.create(authOrCode, ...rest);
  }
  function _assert(assertion, authOrCode, ...rest) {
    if (!assertion) {
      throw createErrorInternal(authOrCode, ...rest);
    }
  }
  function debugFail(failure) {
    const message = `INTERNAL ASSERTION FAILED: ` + failure;
    _logError(message);
    throw new Error(message);
  }
  function debugAssert(assertion, message) {
    if (!assertion) {
      debugFail(message);
    }
  }
  var instanceCache = /* @__PURE__ */ new Map();
  function _getInstance(cls) {
    debugAssert(cls instanceof Function, "Expected a class definition");
    let instance = instanceCache.get(cls);
    if (instance) {
      debugAssert(instance instanceof cls, "Instance stored in cache mismatched with class");
      return instance;
    }
    instance = new cls();
    instanceCache.set(cls, instance);
    return instance;
  }
  function initializeAuth(app2, deps) {
    const provider = _getProvider(app2, "auth");
    if (provider.isInitialized()) {
      const auth2 = provider.getImmediate();
      const initialOptions = provider.getOptions();
      if (deepEqual(initialOptions, deps !== null && deps !== void 0 ? deps : {})) {
        return auth2;
      } else {
        _fail(auth2, "already-initialized");
      }
    }
    const auth = provider.initialize({ options: deps });
    return auth;
  }
  function _initializeAuthInstance(auth, deps) {
    const persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
    const hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);
    if (deps === null || deps === void 0 ? void 0 : deps.errorMap) {
      auth._updateErrorMap(deps.errorMap);
    }
    auth._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
  }
  function _getCurrentUrl() {
    var _a;
    return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href) || "";
  }
  function _isHttpOrHttps() {
    return _getCurrentScheme() === "http:" || _getCurrentScheme() === "https:";
  }
  function _getCurrentScheme() {
    var _a;
    return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol) || null;
  }
  function _isOnline() {
    if (typeof navigator !== "undefined" && navigator && "onLine" in navigator && typeof navigator.onLine === "boolean" && (_isHttpOrHttps() || isBrowserExtension() || "connection" in navigator)) {
      return navigator.onLine;
    }
    return true;
  }
  function _getUserLanguage() {
    if (typeof navigator === "undefined") {
      return null;
    }
    const navigatorLanguage = navigator;
    return navigatorLanguage.languages && navigatorLanguage.languages[0] || navigatorLanguage.language || null;
  }
  var Delay = class {
    constructor(shortDelay, longDelay) {
      this.shortDelay = shortDelay;
      this.longDelay = longDelay;
      debugAssert(longDelay > shortDelay, "Short delay should be less than long delay!");
      this.isMobile = isMobileCordova() || isReactNative();
    }
    get() {
      if (!_isOnline()) {
        return Math.min(5e3, this.shortDelay);
      }
      return this.isMobile ? this.longDelay : this.shortDelay;
    }
  };
  function _emulatorUrl(config, path) {
    debugAssert(config.emulator, "Emulator should always be set here");
    const { url } = config.emulator;
    if (!path) {
      return url;
    }
    return `${url}${path.startsWith("/") ? path.slice(1) : path}`;
  }
  var FetchProvider = class {
    static initialize(fetchImpl, headersImpl, responseImpl) {
      this.fetchImpl = fetchImpl;
      if (headersImpl) {
        this.headersImpl = headersImpl;
      }
      if (responseImpl) {
        this.responseImpl = responseImpl;
      }
    }
    static fetch() {
      if (this.fetchImpl) {
        return this.fetchImpl;
      }
      if (typeof self !== "undefined" && "fetch" in self) {
        return self.fetch;
      }
      debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
    }
    static headers() {
      if (this.headersImpl) {
        return this.headersImpl;
      }
      if (typeof self !== "undefined" && "Headers" in self) {
        return self.Headers;
      }
      debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
    }
    static response() {
      if (this.responseImpl) {
        return this.responseImpl;
      }
      if (typeof self !== "undefined" && "Response" in self) {
        return self.Response;
      }
      debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
    }
  };
  var SERVER_ERROR_MAP = {
    ["CREDENTIAL_MISMATCH"]: "custom-token-mismatch",
    ["MISSING_CUSTOM_TOKEN"]: "internal-error",
    ["INVALID_IDENTIFIER"]: "invalid-email",
    ["MISSING_CONTINUE_URI"]: "internal-error",
    ["INVALID_PASSWORD"]: "wrong-password",
    ["MISSING_PASSWORD"]: "internal-error",
    ["EMAIL_EXISTS"]: "email-already-in-use",
    ["PASSWORD_LOGIN_DISABLED"]: "operation-not-allowed",
    ["INVALID_IDP_RESPONSE"]: "invalid-credential",
    ["INVALID_PENDING_TOKEN"]: "invalid-credential",
    ["FEDERATED_USER_ID_ALREADY_LINKED"]: "credential-already-in-use",
    ["MISSING_REQ_TYPE"]: "internal-error",
    ["EMAIL_NOT_FOUND"]: "user-not-found",
    ["RESET_PASSWORD_EXCEED_LIMIT"]: "too-many-requests",
    ["EXPIRED_OOB_CODE"]: "expired-action-code",
    ["INVALID_OOB_CODE"]: "invalid-action-code",
    ["MISSING_OOB_CODE"]: "internal-error",
    ["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]: "requires-recent-login",
    ["INVALID_ID_TOKEN"]: "invalid-user-token",
    ["TOKEN_EXPIRED"]: "user-token-expired",
    ["USER_NOT_FOUND"]: "user-token-expired",
    ["TOO_MANY_ATTEMPTS_TRY_LATER"]: "too-many-requests",
    ["INVALID_CODE"]: "invalid-verification-code",
    ["INVALID_SESSION_INFO"]: "invalid-verification-id",
    ["INVALID_TEMPORARY_PROOF"]: "invalid-credential",
    ["MISSING_SESSION_INFO"]: "missing-verification-id",
    ["SESSION_EXPIRED"]: "code-expired",
    ["MISSING_ANDROID_PACKAGE_NAME"]: "missing-android-pkg-name",
    ["UNAUTHORIZED_DOMAIN"]: "unauthorized-continue-uri",
    ["INVALID_OAUTH_CLIENT_ID"]: "invalid-oauth-client-id",
    ["ADMIN_ONLY_OPERATION"]: "admin-restricted-operation",
    ["INVALID_MFA_PENDING_CREDENTIAL"]: "invalid-multi-factor-session",
    ["MFA_ENROLLMENT_NOT_FOUND"]: "multi-factor-info-not-found",
    ["MISSING_MFA_ENROLLMENT_ID"]: "missing-multi-factor-info",
    ["MISSING_MFA_PENDING_CREDENTIAL"]: "missing-multi-factor-session",
    ["SECOND_FACTOR_EXISTS"]: "second-factor-already-in-use",
    ["SECOND_FACTOR_LIMIT_EXCEEDED"]: "maximum-second-factor-count-exceeded",
    ["BLOCKING_FUNCTION_ERROR_RESPONSE"]: "internal-error"
  };
  var DEFAULT_API_TIMEOUT_MS = new Delay(3e4, 6e4);
  function _addTidIfNecessary(auth, request) {
    if (auth.tenantId && !request.tenantId) {
      return Object.assign(Object.assign({}, request), { tenantId: auth.tenantId });
    }
    return request;
  }
  async function _performApiRequest(auth, method, path, request, customErrorMap = {}) {
    return _performFetchWithErrorHandling(auth, customErrorMap, async () => {
      let body = {};
      let params = {};
      if (request) {
        if (method === "GET") {
          params = request;
        } else {
          body = {
            body: JSON.stringify(request)
          };
        }
      }
      const query2 = querystring(Object.assign({ key: auth.config.apiKey }, params)).slice(1);
      const headers = await auth._getAdditionalHeaders();
      headers["Content-Type"] = "application/json";
      if (auth.languageCode) {
        headers["X-Firebase-Locale"] = auth.languageCode;
      }
      return FetchProvider.fetch()(_getFinalTarget(auth, auth.config.apiHost, path, query2), Object.assign({
        method,
        headers,
        referrerPolicy: "no-referrer"
      }, body));
    });
  }
  async function _performFetchWithErrorHandling(auth, customErrorMap, fetchFn) {
    auth._canInitEmulator = false;
    const errorMap2 = Object.assign(Object.assign({}, SERVER_ERROR_MAP), customErrorMap);
    try {
      const networkTimeout = new NetworkTimeout(auth);
      const response = await Promise.race([
        fetchFn(),
        networkTimeout.promise
      ]);
      networkTimeout.clearNetworkTimeout();
      const json = await response.json();
      if ("needConfirmation" in json) {
        throw _makeTaggedError(auth, "account-exists-with-different-credential", json);
      }
      if (response.ok && !("errorMessage" in json)) {
        return json;
      } else {
        const errorMessage = response.ok ? json.errorMessage : json.error.message;
        const [serverErrorCode, serverErrorMessage] = errorMessage.split(" : ");
        if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED") {
          throw _makeTaggedError(auth, "credential-already-in-use", json);
        } else if (serverErrorCode === "EMAIL_EXISTS") {
          throw _makeTaggedError(auth, "email-already-in-use", json);
        } else if (serverErrorCode === "USER_DISABLED") {
          throw _makeTaggedError(auth, "user-disabled", json);
        }
        const authError = errorMap2[serverErrorCode] || serverErrorCode.toLowerCase().replace(/[_\s]+/g, "-");
        if (serverErrorMessage) {
          throw _errorWithCustomMessage(auth, authError, serverErrorMessage);
        } else {
          _fail(auth, authError);
        }
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        throw e;
      }
      _fail(auth, "network-request-failed");
    }
  }
  async function _performSignInRequest(auth, method, path, request, customErrorMap = {}) {
    const serverResponse = await _performApiRequest(auth, method, path, request, customErrorMap);
    if ("mfaPendingCredential" in serverResponse) {
      _fail(auth, "multi-factor-auth-required", {
        _serverResponse: serverResponse
      });
    }
    return serverResponse;
  }
  function _getFinalTarget(auth, host, path, query2) {
    const base = `${host}${path}?${query2}`;
    if (!auth.config.emulator) {
      return `${auth.config.apiScheme}://${base}`;
    }
    return _emulatorUrl(auth.config, base);
  }
  var NetworkTimeout = class {
    constructor(auth) {
      this.auth = auth;
      this.timer = null;
      this.promise = new Promise((_2, reject) => {
        this.timer = setTimeout(() => {
          return reject(_createError(this.auth, "network-request-failed"));
        }, DEFAULT_API_TIMEOUT_MS.get());
      });
    }
    clearNetworkTimeout() {
      clearTimeout(this.timer);
    }
  };
  function _makeTaggedError(auth, code, response) {
    const errorParams = {
      appName: auth.name
    };
    if (response.email) {
      errorParams.email = response.email;
    }
    if (response.phoneNumber) {
      errorParams.phoneNumber = response.phoneNumber;
    }
    const error2 = _createError(auth, code, errorParams);
    error2.customData._tokenResponse = response;
    return error2;
  }
  async function deleteAccount(auth, request) {
    return _performApiRequest(auth, "POST", "/v1/accounts:delete", request);
  }
  async function getAccountInfo(auth, request) {
    return _performApiRequest(auth, "POST", "/v1/accounts:lookup", request);
  }
  function utcTimestampToDateString(utcTimestamp) {
    if (!utcTimestamp) {
      return void 0;
    }
    try {
      const date = new Date(Number(utcTimestamp));
      if (!isNaN(date.getTime())) {
        return date.toUTCString();
      }
    } catch (e) {
    }
    return void 0;
  }
  async function getIdTokenResult(user2, forceRefresh = false) {
    const userInternal = getModularInstance(user2);
    const token = await userInternal.getIdToken(forceRefresh);
    const claims = _parseToken(token);
    _assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error");
    const firebase = typeof claims.firebase === "object" ? claims.firebase : void 0;
    const signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_provider"];
    return {
      claims,
      token,
      authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
      issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
      expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
      signInProvider: signInProvider || null,
      signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_second_factor"]) || null
    };
  }
  function secondsStringToMilliseconds(seconds) {
    return Number(seconds) * 1e3;
  }
  function _parseToken(token) {
    var _a;
    const [algorithm, payload, signature] = token.split(".");
    if (algorithm === void 0 || payload === void 0 || signature === void 0) {
      _logError("JWT malformed, contained fewer than 3 sections");
      return null;
    }
    try {
      const decoded = base64Decode(payload);
      if (!decoded) {
        _logError("Failed to decode base64 JWT payload");
        return null;
      }
      return JSON.parse(decoded);
    } catch (e) {
      _logError("Caught error parsing JWT payload as JSON", (_a = e) === null || _a === void 0 ? void 0 : _a.toString());
      return null;
    }
  }
  function _tokenExpiresIn(token) {
    const parsedToken = _parseToken(token);
    _assert(parsedToken, "internal-error");
    _assert(typeof parsedToken.exp !== "undefined", "internal-error");
    _assert(typeof parsedToken.iat !== "undefined", "internal-error");
    return Number(parsedToken.exp) - Number(parsedToken.iat);
  }
  async function _logoutIfInvalidated(user2, promise, bypassAuthState = false) {
    if (bypassAuthState) {
      return promise;
    }
    try {
      return await promise;
    } catch (e) {
      if (e instanceof FirebaseError && isUserInvalidated(e)) {
        if (user2.auth.currentUser === user2) {
          await user2.auth.signOut();
        }
      }
      throw e;
    }
  }
  function isUserInvalidated({ code }) {
    return code === `auth/${"user-disabled"}` || code === `auth/${"user-token-expired"}`;
  }
  var ProactiveRefresh = class {
    constructor(user2) {
      this.user = user2;
      this.isRunning = false;
      this.timerId = null;
      this.errorBackoff = 3e4;
    }
    _start() {
      if (this.isRunning) {
        return;
      }
      this.isRunning = true;
      this.schedule();
    }
    _stop() {
      if (!this.isRunning) {
        return;
      }
      this.isRunning = false;
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
      }
    }
    getInterval(wasError) {
      var _a;
      if (wasError) {
        const interval = this.errorBackoff;
        this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4);
        return interval;
      } else {
        this.errorBackoff = 3e4;
        const expTime = (_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0;
        const interval = expTime - Date.now() - 3e5;
        return Math.max(0, interval);
      }
    }
    schedule(wasError = false) {
      if (!this.isRunning) {
        return;
      }
      const interval = this.getInterval(wasError);
      this.timerId = setTimeout(async () => {
        await this.iteration();
      }, interval);
    }
    async iteration() {
      var _a;
      try {
        await this.user.getIdToken(true);
      } catch (e) {
        if (((_a = e) === null || _a === void 0 ? void 0 : _a.code) === `auth/${"network-request-failed"}`) {
          this.schedule(true);
        }
        return;
      }
      this.schedule();
    }
  };
  var UserMetadata = class {
    constructor(createdAt, lastLoginAt) {
      this.createdAt = createdAt;
      this.lastLoginAt = lastLoginAt;
      this._initializeTime();
    }
    _initializeTime() {
      this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
      this.creationTime = utcTimestampToDateString(this.createdAt);
    }
    _copy(metadata) {
      this.createdAt = metadata.createdAt;
      this.lastLoginAt = metadata.lastLoginAt;
      this._initializeTime();
    }
    toJSON() {
      return {
        createdAt: this.createdAt,
        lastLoginAt: this.lastLoginAt
      };
    }
  };
  async function _reloadWithoutSaving(user2) {
    var _a;
    const auth = user2.auth;
    const idToken = await user2.getIdToken();
    const response = await _logoutIfInvalidated(user2, getAccountInfo(auth, { idToken }));
    _assert(response === null || response === void 0 ? void 0 : response.users.length, auth, "internal-error");
    const coreAccount = response.users[0];
    user2._notifyReloadListener(coreAccount);
    const newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length) ? extractProviderData(coreAccount.providerUserInfo) : [];
    const providerData = mergeProviderData(user2.providerData, newProviderData);
    const oldIsAnonymous = user2.isAnonymous;
    const newIsAnonymous = !(user2.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
    const isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
    const updates = {
      uid: coreAccount.localId,
      displayName: coreAccount.displayName || null,
      photoURL: coreAccount.photoUrl || null,
      email: coreAccount.email || null,
      emailVerified: coreAccount.emailVerified || false,
      phoneNumber: coreAccount.phoneNumber || null,
      tenantId: coreAccount.tenantId || null,
      providerData,
      metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
      isAnonymous
    };
    Object.assign(user2, updates);
  }
  async function reload(user2) {
    const userInternal = getModularInstance(user2);
    await _reloadWithoutSaving(userInternal);
    await userInternal.auth._persistUserIfCurrent(userInternal);
    userInternal.auth._notifyListenersIfCurrent(userInternal);
  }
  function mergeProviderData(original, newData) {
    const deduped = original.filter((o2) => !newData.some((n2) => n2.providerId === o2.providerId));
    return [...deduped, ...newData];
  }
  function extractProviderData(providers) {
    return providers.map((_a) => {
      var { providerId } = _a, provider = __rest(_a, ["providerId"]);
      return {
        providerId,
        uid: provider.rawId || "",
        displayName: provider.displayName || null,
        email: provider.email || null,
        phoneNumber: provider.phoneNumber || null,
        photoURL: provider.photoUrl || null
      };
    });
  }
  async function requestStsToken(auth, refreshToken) {
    const response = await _performFetchWithErrorHandling(auth, {}, async () => {
      const body = querystring({
        "grant_type": "refresh_token",
        "refresh_token": refreshToken
      }).slice(1);
      const { tokenApiHost, apiKey } = auth.config;
      const url = _getFinalTarget(auth, tokenApiHost, "/v1/token", `key=${apiKey}`);
      const headers = await auth._getAdditionalHeaders();
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      return FetchProvider.fetch()(url, {
        method: "POST",
        headers,
        body
      });
    });
    return {
      accessToken: response.access_token,
      expiresIn: response.expires_in,
      refreshToken: response.refresh_token
    };
  }
  var StsTokenManager = class {
    constructor() {
      this.refreshToken = null;
      this.accessToken = null;
      this.expirationTime = null;
    }
    get isExpired() {
      return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
    }
    updateFromServerResponse(response) {
      _assert(response.idToken, "internal-error");
      _assert(typeof response.idToken !== "undefined", "internal-error");
      _assert(typeof response.refreshToken !== "undefined", "internal-error");
      const expiresIn = "expiresIn" in response && typeof response.expiresIn !== "undefined" ? Number(response.expiresIn) : _tokenExpiresIn(response.idToken);
      this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
    }
    async getToken(auth, forceRefresh = false) {
      _assert(!this.accessToken || this.refreshToken, auth, "user-token-expired");
      if (!forceRefresh && this.accessToken && !this.isExpired) {
        return this.accessToken;
      }
      if (this.refreshToken) {
        await this.refresh(auth, this.refreshToken);
        return this.accessToken;
      }
      return null;
    }
    clearRefreshToken() {
      this.refreshToken = null;
    }
    async refresh(auth, oldToken) {
      const { accessToken, refreshToken, expiresIn } = await requestStsToken(auth, oldToken);
      this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
    }
    updateTokensAndExpiration(accessToken, refreshToken, expiresInSec) {
      this.refreshToken = refreshToken || null;
      this.accessToken = accessToken || null;
      this.expirationTime = Date.now() + expiresInSec * 1e3;
    }
    static fromJSON(appName, object) {
      const { refreshToken, accessToken, expirationTime } = object;
      const manager = new StsTokenManager();
      if (refreshToken) {
        _assert(typeof refreshToken === "string", "internal-error", {
          appName
        });
        manager.refreshToken = refreshToken;
      }
      if (accessToken) {
        _assert(typeof accessToken === "string", "internal-error", {
          appName
        });
        manager.accessToken = accessToken;
      }
      if (expirationTime) {
        _assert(typeof expirationTime === "number", "internal-error", {
          appName
        });
        manager.expirationTime = expirationTime;
      }
      return manager;
    }
    toJSON() {
      return {
        refreshToken: this.refreshToken,
        accessToken: this.accessToken,
        expirationTime: this.expirationTime
      };
    }
    _assign(stsTokenManager) {
      this.accessToken = stsTokenManager.accessToken;
      this.refreshToken = stsTokenManager.refreshToken;
      this.expirationTime = stsTokenManager.expirationTime;
    }
    _clone() {
      return Object.assign(new StsTokenManager(), this.toJSON());
    }
    _performRefresh() {
      return debugFail("not implemented");
    }
  };
  function assertStringOrUndefined(assertion, appName) {
    _assert(typeof assertion === "string" || typeof assertion === "undefined", "internal-error", { appName });
  }
  var UserImpl = class {
    constructor(_a) {
      var { uid, auth, stsTokenManager } = _a, opt = __rest(_a, ["uid", "auth", "stsTokenManager"]);
      this.providerId = "firebase";
      this.proactiveRefresh = new ProactiveRefresh(this);
      this.reloadUserInfo = null;
      this.reloadListener = null;
      this.uid = uid;
      this.auth = auth;
      this.stsTokenManager = stsTokenManager;
      this.accessToken = stsTokenManager.accessToken;
      this.displayName = opt.displayName || null;
      this.email = opt.email || null;
      this.emailVerified = opt.emailVerified || false;
      this.phoneNumber = opt.phoneNumber || null;
      this.photoURL = opt.photoURL || null;
      this.isAnonymous = opt.isAnonymous || false;
      this.tenantId = opt.tenantId || null;
      this.providerData = opt.providerData ? [...opt.providerData] : [];
      this.metadata = new UserMetadata(opt.createdAt || void 0, opt.lastLoginAt || void 0);
    }
    async getIdToken(forceRefresh) {
      const accessToken = await _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh));
      _assert(accessToken, this.auth, "internal-error");
      if (this.accessToken !== accessToken) {
        this.accessToken = accessToken;
        await this.auth._persistUserIfCurrent(this);
        this.auth._notifyListenersIfCurrent(this);
      }
      return accessToken;
    }
    getIdTokenResult(forceRefresh) {
      return getIdTokenResult(this, forceRefresh);
    }
    reload() {
      return reload(this);
    }
    _assign(user2) {
      if (this === user2) {
        return;
      }
      _assert(this.uid === user2.uid, this.auth, "internal-error");
      this.displayName = user2.displayName;
      this.photoURL = user2.photoURL;
      this.email = user2.email;
      this.emailVerified = user2.emailVerified;
      this.phoneNumber = user2.phoneNumber;
      this.isAnonymous = user2.isAnonymous;
      this.tenantId = user2.tenantId;
      this.providerData = user2.providerData.map((userInfo) => Object.assign({}, userInfo));
      this.metadata._copy(user2.metadata);
      this.stsTokenManager._assign(user2.stsTokenManager);
    }
    _clone(auth) {
      return new UserImpl(Object.assign(Object.assign({}, this), { auth, stsTokenManager: this.stsTokenManager._clone() }));
    }
    _onReload(callback) {
      _assert(!this.reloadListener, this.auth, "internal-error");
      this.reloadListener = callback;
      if (this.reloadUserInfo) {
        this._notifyReloadListener(this.reloadUserInfo);
        this.reloadUserInfo = null;
      }
    }
    _notifyReloadListener(userInfo) {
      if (this.reloadListener) {
        this.reloadListener(userInfo);
      } else {
        this.reloadUserInfo = userInfo;
      }
    }
    _startProactiveRefresh() {
      this.proactiveRefresh._start();
    }
    _stopProactiveRefresh() {
      this.proactiveRefresh._stop();
    }
    async _updateTokensIfNecessary(response, reload2 = false) {
      let tokensRefreshed = false;
      if (response.idToken && response.idToken !== this.stsTokenManager.accessToken) {
        this.stsTokenManager.updateFromServerResponse(response);
        tokensRefreshed = true;
      }
      if (reload2) {
        await _reloadWithoutSaving(this);
      }
      await this.auth._persistUserIfCurrent(this);
      if (tokensRefreshed) {
        this.auth._notifyListenersIfCurrent(this);
      }
    }
    async delete() {
      const idToken = await this.getIdToken();
      await _logoutIfInvalidated(this, deleteAccount(this.auth, { idToken }));
      this.stsTokenManager.clearRefreshToken();
      return this.auth.signOut();
    }
    toJSON() {
      return Object.assign(Object.assign({
        uid: this.uid,
        email: this.email || void 0,
        emailVerified: this.emailVerified,
        displayName: this.displayName || void 0,
        isAnonymous: this.isAnonymous,
        photoURL: this.photoURL || void 0,
        phoneNumber: this.phoneNumber || void 0,
        tenantId: this.tenantId || void 0,
        providerData: this.providerData.map((userInfo) => Object.assign({}, userInfo)),
        stsTokenManager: this.stsTokenManager.toJSON(),
        _redirectEventId: this._redirectEventId
      }, this.metadata.toJSON()), {
        apiKey: this.auth.config.apiKey,
        appName: this.auth.name
      });
    }
    get refreshToken() {
      return this.stsTokenManager.refreshToken || "";
    }
    static _fromJSON(auth, object) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : void 0;
      const email = (_b = object.email) !== null && _b !== void 0 ? _b : void 0;
      const phoneNumber = (_c = object.phoneNumber) !== null && _c !== void 0 ? _c : void 0;
      const photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : void 0;
      const tenantId = (_e = object.tenantId) !== null && _e !== void 0 ? _e : void 0;
      const _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : void 0;
      const createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : void 0;
      const lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : void 0;
      const { uid, emailVerified, isAnonymous, providerData, stsTokenManager: plainObjectTokenManager } = object;
      _assert(uid && plainObjectTokenManager, auth, "internal-error");
      const stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
      _assert(typeof uid === "string", auth, "internal-error");
      assertStringOrUndefined(displayName, auth.name);
      assertStringOrUndefined(email, auth.name);
      _assert(typeof emailVerified === "boolean", auth, "internal-error");
      _assert(typeof isAnonymous === "boolean", auth, "internal-error");
      assertStringOrUndefined(phoneNumber, auth.name);
      assertStringOrUndefined(photoURL, auth.name);
      assertStringOrUndefined(tenantId, auth.name);
      assertStringOrUndefined(_redirectEventId, auth.name);
      assertStringOrUndefined(createdAt, auth.name);
      assertStringOrUndefined(lastLoginAt, auth.name);
      const user2 = new UserImpl({
        uid,
        auth,
        email,
        emailVerified,
        displayName,
        isAnonymous,
        photoURL,
        phoneNumber,
        tenantId,
        stsTokenManager,
        createdAt,
        lastLoginAt
      });
      if (providerData && Array.isArray(providerData)) {
        user2.providerData = providerData.map((userInfo) => Object.assign({}, userInfo));
      }
      if (_redirectEventId) {
        user2._redirectEventId = _redirectEventId;
      }
      return user2;
    }
    static async _fromIdTokenResponse(auth, idTokenResponse, isAnonymous = false) {
      const stsTokenManager = new StsTokenManager();
      stsTokenManager.updateFromServerResponse(idTokenResponse);
      const user2 = new UserImpl({
        uid: idTokenResponse.localId,
        auth,
        stsTokenManager,
        isAnonymous
      });
      await _reloadWithoutSaving(user2);
      return user2;
    }
  };
  var InMemoryPersistence = class {
    constructor() {
      this.type = "NONE";
      this.storage = {};
    }
    async _isAvailable() {
      return true;
    }
    async _set(key, value) {
      this.storage[key] = value;
    }
    async _get(key) {
      const value = this.storage[key];
      return value === void 0 ? null : value;
    }
    async _remove(key) {
      delete this.storage[key];
    }
    _addListener(_key, _listener) {
      return;
    }
    _removeListener(_key, _listener) {
      return;
    }
  };
  InMemoryPersistence.type = "NONE";
  var inMemoryPersistence = InMemoryPersistence;
  function _persistenceKeyName(key, apiKey, appName) {
    return `${"firebase"}:${key}:${apiKey}:${appName}`;
  }
  var PersistenceUserManager = class {
    constructor(persistence, auth, userKey) {
      this.persistence = persistence;
      this.auth = auth;
      this.userKey = userKey;
      const { config, name: name5 } = this.auth;
      this.fullUserKey = _persistenceKeyName(this.userKey, config.apiKey, name5);
      this.fullPersistenceKey = _persistenceKeyName("persistence", config.apiKey, name5);
      this.boundEventHandler = auth._onStorageEvent.bind(auth);
      this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
    }
    setCurrentUser(user2) {
      return this.persistence._set(this.fullUserKey, user2.toJSON());
    }
    async getCurrentUser() {
      const blob = await this.persistence._get(this.fullUserKey);
      return blob ? UserImpl._fromJSON(this.auth, blob) : null;
    }
    removeCurrentUser() {
      return this.persistence._remove(this.fullUserKey);
    }
    savePersistenceForRedirect() {
      return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
    }
    async setPersistence(newPersistence) {
      if (this.persistence === newPersistence) {
        return;
      }
      const currentUser = await this.getCurrentUser();
      await this.removeCurrentUser();
      this.persistence = newPersistence;
      if (currentUser) {
        return this.setCurrentUser(currentUser);
      }
    }
    delete() {
      this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
    }
    static async create(auth, persistenceHierarchy, userKey = "authUser") {
      if (!persistenceHierarchy.length) {
        return new PersistenceUserManager(_getInstance(inMemoryPersistence), auth, userKey);
      }
      const availablePersistences = (await Promise.all(persistenceHierarchy.map(async (persistence) => {
        if (await persistence._isAvailable()) {
          return persistence;
        }
        return void 0;
      }))).filter((persistence) => persistence);
      let selectedPersistence = availablePersistences[0] || _getInstance(inMemoryPersistence);
      const key = _persistenceKeyName(userKey, auth.config.apiKey, auth.name);
      let userToMigrate = null;
      for (const persistence of persistenceHierarchy) {
        try {
          const blob = await persistence._get(key);
          if (blob) {
            const user2 = UserImpl._fromJSON(auth, blob);
            if (persistence !== selectedPersistence) {
              userToMigrate = user2;
            }
            selectedPersistence = persistence;
            break;
          }
        } catch (_a) {
        }
      }
      const migrationHierarchy = availablePersistences.filter((p2) => p2._shouldAllowMigration);
      if (!selectedPersistence._shouldAllowMigration || !migrationHierarchy.length) {
        return new PersistenceUserManager(selectedPersistence, auth, userKey);
      }
      selectedPersistence = migrationHierarchy[0];
      if (userToMigrate) {
        await selectedPersistence._set(key, userToMigrate.toJSON());
      }
      await Promise.all(persistenceHierarchy.map(async (persistence) => {
        if (persistence !== selectedPersistence) {
          try {
            await persistence._remove(key);
          } catch (_a) {
          }
        }
      }));
      return new PersistenceUserManager(selectedPersistence, auth, userKey);
    }
  };
  function _getBrowserName(userAgent) {
    const ua = userAgent.toLowerCase();
    if (ua.includes("opera/") || ua.includes("opr/") || ua.includes("opios/")) {
      return "Opera";
    } else if (_isIEMobile(ua)) {
      return "IEMobile";
    } else if (ua.includes("msie") || ua.includes("trident/")) {
      return "IE";
    } else if (ua.includes("edge/")) {
      return "Edge";
    } else if (_isFirefox(ua)) {
      return "Firefox";
    } else if (ua.includes("silk/")) {
      return "Silk";
    } else if (_isBlackBerry(ua)) {
      return "Blackberry";
    } else if (_isWebOS(ua)) {
      return "Webos";
    } else if (_isSafari(ua)) {
      return "Safari";
    } else if ((ua.includes("chrome/") || _isChromeIOS(ua)) && !ua.includes("edge/")) {
      return "Chrome";
    } else if (_isAndroid(ua)) {
      return "Android";
    } else {
      const re = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;
      const matches = userAgent.match(re);
      if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) {
        return matches[1];
      }
    }
    return "Other";
  }
  function _isFirefox(ua = getUA()) {
    return /firefox\//i.test(ua);
  }
  function _isSafari(userAgent = getUA()) {
    const ua = userAgent.toLowerCase();
    return ua.includes("safari/") && !ua.includes("chrome/") && !ua.includes("crios/") && !ua.includes("android");
  }
  function _isChromeIOS(ua = getUA()) {
    return /crios\//i.test(ua);
  }
  function _isIEMobile(ua = getUA()) {
    return /iemobile/i.test(ua);
  }
  function _isAndroid(ua = getUA()) {
    return /android/i.test(ua);
  }
  function _isBlackBerry(ua = getUA()) {
    return /blackberry/i.test(ua);
  }
  function _isWebOS(ua = getUA()) {
    return /webos/i.test(ua);
  }
  function _isIOS(ua = getUA()) {
    return /iphone|ipad|ipod/i.test(ua) || /macintosh/i.test(ua) && /mobile/i.test(ua);
  }
  function _isIOSStandalone(ua = getUA()) {
    var _a;
    return _isIOS(ua) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
  }
  function _isIE10() {
    return isIE() && document.documentMode === 10;
  }
  function _isMobileBrowser(ua = getUA()) {
    return _isIOS(ua) || _isAndroid(ua) || _isWebOS(ua) || _isBlackBerry(ua) || /windows phone/i.test(ua) || _isIEMobile(ua);
  }
  function _isIframe() {
    try {
      return !!(window && window !== window.top);
    } catch (e) {
      return false;
    }
  }
  function _getClientVersion(clientPlatform, frameworks = []) {
    let reportedPlatform;
    switch (clientPlatform) {
      case "Browser":
        reportedPlatform = _getBrowserName(getUA());
        break;
      case "Worker":
        reportedPlatform = `${_getBrowserName(getUA())}-${clientPlatform}`;
        break;
      default:
        reportedPlatform = clientPlatform;
    }
    const reportedFrameworks = frameworks.length ? frameworks.join(",") : "FirebaseCore-web";
    return `${reportedPlatform}/${"JsCore"}/${SDK_VERSION}/${reportedFrameworks}`;
  }
  var AuthMiddlewareQueue = class {
    constructor(auth) {
      this.auth = auth;
      this.queue = [];
    }
    pushCallback(callback, onAbort) {
      const wrappedCallback = (user2) => new Promise((resolve, reject) => {
        try {
          const result = callback(user2);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
      wrappedCallback.onAbort = onAbort;
      this.queue.push(wrappedCallback);
      const index = this.queue.length - 1;
      return () => {
        this.queue[index] = () => Promise.resolve();
      };
    }
    async runMiddleware(nextUser) {
      var _a;
      if (this.auth.currentUser === nextUser) {
        return;
      }
      const onAbortStack = [];
      try {
        for (const beforeStateCallback of this.queue) {
          await beforeStateCallback(nextUser);
          if (beforeStateCallback.onAbort) {
            onAbortStack.push(beforeStateCallback.onAbort);
          }
        }
      } catch (e) {
        onAbortStack.reverse();
        for (const onAbort of onAbortStack) {
          try {
            onAbort();
          } catch (_2) {
          }
        }
        throw this.auth._errorFactory.create("login-blocked", {
          originalMessage: (_a = e) === null || _a === void 0 ? void 0 : _a.message
        });
      }
    }
  };
  var AuthImpl = class {
    constructor(app2, heartbeatServiceProvider, config) {
      this.app = app2;
      this.heartbeatServiceProvider = heartbeatServiceProvider;
      this.config = config;
      this.currentUser = null;
      this.emulatorConfig = null;
      this.operations = Promise.resolve();
      this.authStateSubscription = new Subscription(this);
      this.idTokenSubscription = new Subscription(this);
      this.beforeStateQueue = new AuthMiddlewareQueue(this);
      this.redirectUser = null;
      this.isProactiveRefreshEnabled = false;
      this._canInitEmulator = true;
      this._isInitialized = false;
      this._deleted = false;
      this._initializationPromise = null;
      this._popupRedirectResolver = null;
      this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
      this.lastNotifiedUid = void 0;
      this.languageCode = null;
      this.tenantId = null;
      this.settings = { appVerificationDisabledForTesting: false };
      this.frameworks = [];
      this.name = app2.name;
      this.clientVersion = config.sdkClientVersion;
    }
    _initializeWithPersistence(persistenceHierarchy, popupRedirectResolver) {
      if (popupRedirectResolver) {
        this._popupRedirectResolver = _getInstance(popupRedirectResolver);
      }
      this._initializationPromise = this.queue(async () => {
        var _a, _b;
        if (this._deleted) {
          return;
        }
        this.persistenceManager = await PersistenceUserManager.create(this, persistenceHierarchy);
        if (this._deleted) {
          return;
        }
        if ((_a = this._popupRedirectResolver) === null || _a === void 0 ? void 0 : _a._shouldInitProactively) {
          try {
            await this._popupRedirectResolver._initialize(this);
          } catch (e) {
          }
        }
        await this.initializeCurrentUser(popupRedirectResolver);
        this.lastNotifiedUid = ((_b = this.currentUser) === null || _b === void 0 ? void 0 : _b.uid) || null;
        if (this._deleted) {
          return;
        }
        this._isInitialized = true;
      });
      return this._initializationPromise;
    }
    async _onStorageEvent() {
      if (this._deleted) {
        return;
      }
      const user2 = await this.assertedPersistence.getCurrentUser();
      if (!this.currentUser && !user2) {
        return;
      }
      if (this.currentUser && user2 && this.currentUser.uid === user2.uid) {
        this._currentUser._assign(user2);
        await this.currentUser.getIdToken();
        return;
      }
      await this._updateCurrentUser(user2, true);
    }
    async initializeCurrentUser(popupRedirectResolver) {
      var _a;
      const previouslyStoredUser = await this.assertedPersistence.getCurrentUser();
      let futureCurrentUser = previouslyStoredUser;
      let needsTocheckMiddleware = false;
      if (popupRedirectResolver && this.config.authDomain) {
        await this.getOrInitRedirectPersistenceManager();
        const redirectUserEventId = (_a = this.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
        const storedUserEventId = futureCurrentUser === null || futureCurrentUser === void 0 ? void 0 : futureCurrentUser._redirectEventId;
        const result = await this.tryRedirectSignIn(popupRedirectResolver);
        if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) && (result === null || result === void 0 ? void 0 : result.user)) {
          futureCurrentUser = result.user;
          needsTocheckMiddleware = true;
        }
      }
      if (!futureCurrentUser) {
        return this.directlySetCurrentUser(null);
      }
      if (!futureCurrentUser._redirectEventId) {
        if (needsTocheckMiddleware) {
          try {
            await this.beforeStateQueue.runMiddleware(futureCurrentUser);
          } catch (e) {
            futureCurrentUser = previouslyStoredUser;
            this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e));
          }
        }
        if (futureCurrentUser) {
          return this.reloadAndSetCurrentUserOrClear(futureCurrentUser);
        } else {
          return this.directlySetCurrentUser(null);
        }
      }
      _assert(this._popupRedirectResolver, this, "argument-error");
      await this.getOrInitRedirectPersistenceManager();
      if (this.redirectUser && this.redirectUser._redirectEventId === futureCurrentUser._redirectEventId) {
        return this.directlySetCurrentUser(futureCurrentUser);
      }
      return this.reloadAndSetCurrentUserOrClear(futureCurrentUser);
    }
    async tryRedirectSignIn(redirectResolver) {
      let result = null;
      try {
        result = await this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true);
      } catch (e) {
        await this._setRedirectUser(null);
      }
      return result;
    }
    async reloadAndSetCurrentUserOrClear(user2) {
      var _a;
      try {
        await _reloadWithoutSaving(user2);
      } catch (e) {
        if (((_a = e) === null || _a === void 0 ? void 0 : _a.code) !== `auth/${"network-request-failed"}`) {
          return this.directlySetCurrentUser(null);
        }
      }
      return this.directlySetCurrentUser(user2);
    }
    useDeviceLanguage() {
      this.languageCode = _getUserLanguage();
    }
    async _delete() {
      this._deleted = true;
    }
    async updateCurrentUser(userExtern) {
      const user2 = userExtern ? getModularInstance(userExtern) : null;
      if (user2) {
        _assert(user2.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token");
      }
      return this._updateCurrentUser(user2 && user2._clone(this));
    }
    async _updateCurrentUser(user2, skipBeforeStateCallbacks = false) {
      if (this._deleted) {
        return;
      }
      if (user2) {
        _assert(this.tenantId === user2.tenantId, this, "tenant-id-mismatch");
      }
      if (!skipBeforeStateCallbacks) {
        await this.beforeStateQueue.runMiddleware(user2);
      }
      return this.queue(async () => {
        await this.directlySetCurrentUser(user2);
        this.notifyAuthListeners();
      });
    }
    async signOut() {
      await this.beforeStateQueue.runMiddleware(null);
      if (this.redirectPersistenceManager || this._popupRedirectResolver) {
        await this._setRedirectUser(null);
      }
      return this._updateCurrentUser(null, true);
    }
    setPersistence(persistence) {
      return this.queue(async () => {
        await this.assertedPersistence.setPersistence(_getInstance(persistence));
      });
    }
    _getPersistence() {
      return this.assertedPersistence.persistence.type;
    }
    _updateErrorMap(errorMap2) {
      this._errorFactory = new ErrorFactory("auth", "Firebase", errorMap2());
    }
    onAuthStateChanged(nextOrObserver, error2, completed) {
      return this.registerStateListener(this.authStateSubscription, nextOrObserver, error2, completed);
    }
    beforeAuthStateChanged(callback, onAbort) {
      return this.beforeStateQueue.pushCallback(callback, onAbort);
    }
    onIdTokenChanged(nextOrObserver, error2, completed) {
      return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error2, completed);
    }
    toJSON() {
      var _a;
      return {
        apiKey: this.config.apiKey,
        authDomain: this.config.authDomain,
        appName: this.name,
        currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
      };
    }
    async _setRedirectUser(user2, popupRedirectResolver) {
      const redirectManager = await this.getOrInitRedirectPersistenceManager(popupRedirectResolver);
      return user2 === null ? redirectManager.removeCurrentUser() : redirectManager.setCurrentUser(user2);
    }
    async getOrInitRedirectPersistenceManager(popupRedirectResolver) {
      if (!this.redirectPersistenceManager) {
        const resolver = popupRedirectResolver && _getInstance(popupRedirectResolver) || this._popupRedirectResolver;
        _assert(resolver, this, "argument-error");
        this.redirectPersistenceManager = await PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser");
        this.redirectUser = await this.redirectPersistenceManager.getCurrentUser();
      }
      return this.redirectPersistenceManager;
    }
    async _redirectUserForId(id) {
      var _a, _b;
      if (this._isInitialized) {
        await this.queue(async () => {
        });
      }
      if (((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id) {
        return this._currentUser;
      }
      if (((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id) {
        return this.redirectUser;
      }
      return null;
    }
    async _persistUserIfCurrent(user2) {
      if (user2 === this.currentUser) {
        return this.queue(async () => this.directlySetCurrentUser(user2));
      }
    }
    _notifyListenersIfCurrent(user2) {
      if (user2 === this.currentUser) {
        this.notifyAuthListeners();
      }
    }
    _key() {
      return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
    }
    _startProactiveRefresh() {
      this.isProactiveRefreshEnabled = true;
      if (this.currentUser) {
        this._currentUser._startProactiveRefresh();
      }
    }
    _stopProactiveRefresh() {
      this.isProactiveRefreshEnabled = false;
      if (this.currentUser) {
        this._currentUser._stopProactiveRefresh();
      }
    }
    get _currentUser() {
      return this.currentUser;
    }
    notifyAuthListeners() {
      var _a, _b;
      if (!this._isInitialized) {
        return;
      }
      this.idTokenSubscription.next(this.currentUser);
      const currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;
      if (this.lastNotifiedUid !== currentUid) {
        this.lastNotifiedUid = currentUid;
        this.authStateSubscription.next(this.currentUser);
      }
    }
    registerStateListener(subscription, nextOrObserver, error2, completed) {
      if (this._deleted) {
        return () => {
        };
      }
      const cb = typeof nextOrObserver === "function" ? nextOrObserver : nextOrObserver.next.bind(nextOrObserver);
      const promise = this._isInitialized ? Promise.resolve() : this._initializationPromise;
      _assert(promise, this, "internal-error");
      promise.then(() => cb(this.currentUser));
      if (typeof nextOrObserver === "function") {
        return subscription.addObserver(nextOrObserver, error2, completed);
      } else {
        return subscription.addObserver(nextOrObserver);
      }
    }
    async directlySetCurrentUser(user2) {
      if (this.currentUser && this.currentUser !== user2) {
        this._currentUser._stopProactiveRefresh();
      }
      if (user2 && this.isProactiveRefreshEnabled) {
        user2._startProactiveRefresh();
      }
      this.currentUser = user2;
      if (user2) {
        await this.assertedPersistence.setCurrentUser(user2);
      } else {
        await this.assertedPersistence.removeCurrentUser();
      }
    }
    queue(action) {
      this.operations = this.operations.then(action, action);
      return this.operations;
    }
    get assertedPersistence() {
      _assert(this.persistenceManager, this, "internal-error");
      return this.persistenceManager;
    }
    _logFramework(framework) {
      if (!framework || this.frameworks.includes(framework)) {
        return;
      }
      this.frameworks.push(framework);
      this.frameworks.sort();
      this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
    }
    _getFrameworks() {
      return this.frameworks;
    }
    async _getAdditionalHeaders() {
      var _a;
      const headers = {
        ["X-Client-Version"]: this.clientVersion
      };
      if (this.app.options.appId) {
        headers["X-Firebase-gmpid"] = this.app.options.appId;
      }
      const heartbeatsHeader = await ((_a = this.heartbeatServiceProvider.getImmediate({
        optional: true
      })) === null || _a === void 0 ? void 0 : _a.getHeartbeatsHeader());
      if (heartbeatsHeader) {
        headers["X-Firebase-Client"] = heartbeatsHeader;
      }
      return headers;
    }
  };
  function _castAuth(auth) {
    return getModularInstance(auth);
  }
  var Subscription = class {
    constructor(auth) {
      this.auth = auth;
      this.observer = null;
      this.addObserver = createSubscribe((observer) => this.observer = observer);
    }
    get next() {
      _assert(this.observer, this.auth, "internal-error");
      return this.observer.next.bind(this.observer);
    }
  };
  function connectAuthEmulator(auth, url, options) {
    const authInternal = _castAuth(auth);
    _assert(authInternal._canInitEmulator, authInternal, "emulator-config-failed");
    _assert(/^https?:\/\//.test(url), authInternal, "invalid-emulator-scheme");
    const disableWarnings = !!(options === null || options === void 0 ? void 0 : options.disableWarnings);
    const protocol = extractProtocol(url);
    const { host, port } = extractHostAndPort(url);
    const portStr = port === null ? "" : `:${port}`;
    authInternal.config.emulator = { url: `${protocol}//${host}${portStr}/` };
    authInternal.settings.appVerificationDisabledForTesting = true;
    authInternal.emulatorConfig = Object.freeze({
      host,
      port,
      protocol: protocol.replace(":", ""),
      options: Object.freeze({ disableWarnings })
    });
    if (!disableWarnings) {
      emitEmulatorWarning();
    }
  }
  function extractProtocol(url) {
    const protocolEnd = url.indexOf(":");
    return protocolEnd < 0 ? "" : url.substr(0, protocolEnd + 1);
  }
  function extractHostAndPort(url) {
    const protocol = extractProtocol(url);
    const authority = /(\/\/)?([^?#/]+)/.exec(url.substr(protocol.length));
    if (!authority) {
      return { host: "", port: null };
    }
    const hostAndPort = authority[2].split("@").pop() || "";
    const bracketedIPv6 = /^(\[[^\]]+\])(:|$)/.exec(hostAndPort);
    if (bracketedIPv6) {
      const host = bracketedIPv6[1];
      return { host, port: parsePort(hostAndPort.substr(host.length + 1)) };
    } else {
      const [host, port] = hostAndPort.split(":");
      return { host, port: parsePort(port) };
    }
  }
  function parsePort(portStr) {
    if (!portStr) {
      return null;
    }
    const port = Number(portStr);
    if (isNaN(port)) {
      return null;
    }
    return port;
  }
  function emitEmulatorWarning() {
    function attachBanner() {
      const el = document.createElement("p");
      const sty = el.style;
      el.innerText = "Running in emulator mode. Do not use with production credentials.";
      sty.position = "fixed";
      sty.width = "100%";
      sty.backgroundColor = "#ffffff";
      sty.border = ".1em solid #000000";
      sty.color = "#b50000";
      sty.bottom = "0px";
      sty.left = "0px";
      sty.margin = "0px";
      sty.zIndex = "10000";
      sty.textAlign = "center";
      el.classList.add("firebase-emulator-warning");
      document.body.appendChild(el);
    }
    if (typeof console !== "undefined" && typeof console.info === "function") {
      console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");
    }
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", attachBanner);
      } else {
        attachBanner();
      }
    }
  }
  var AuthCredential = class {
    constructor(providerId, signInMethod) {
      this.providerId = providerId;
      this.signInMethod = signInMethod;
    }
    toJSON() {
      return debugFail("not implemented");
    }
    _getIdTokenResponse(_auth) {
      return debugFail("not implemented");
    }
    _linkToIdToken(_auth, _idToken) {
      return debugFail("not implemented");
    }
    _getReauthenticationResolver(_auth) {
      return debugFail("not implemented");
    }
  };
  async function updateEmailPassword(auth, request) {
    return _performApiRequest(auth, "POST", "/v1/accounts:update", request);
  }
  async function signInWithPassword(auth, request) {
    return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPassword", _addTidIfNecessary(auth, request));
  }
  async function signInWithEmailLink$1(auth, request) {
    return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth, request));
  }
  async function signInWithEmailLinkForLinking(auth, request) {
    return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth, request));
  }
  var EmailAuthCredential = class extends AuthCredential {
    constructor(_email, _password, signInMethod, _tenantId = null) {
      super("password", signInMethod);
      this._email = _email;
      this._password = _password;
      this._tenantId = _tenantId;
    }
    static _fromEmailAndPassword(email, password) {
      return new EmailAuthCredential(email, password, "password");
    }
    static _fromEmailAndCode(email, oobCode, tenantId = null) {
      return new EmailAuthCredential(email, oobCode, "emailLink", tenantId);
    }
    toJSON() {
      return {
        email: this._email,
        password: this._password,
        signInMethod: this.signInMethod,
        tenantId: this._tenantId
      };
    }
    static fromJSON(json) {
      const obj = typeof json === "string" ? JSON.parse(json) : json;
      if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
        if (obj.signInMethod === "password") {
          return this._fromEmailAndPassword(obj.email, obj.password);
        } else if (obj.signInMethod === "emailLink") {
          return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
        }
      }
      return null;
    }
    async _getIdTokenResponse(auth) {
      switch (this.signInMethod) {
        case "password":
          return signInWithPassword(auth, {
            returnSecureToken: true,
            email: this._email,
            password: this._password
          });
        case "emailLink":
          return signInWithEmailLink$1(auth, {
            email: this._email,
            oobCode: this._password
          });
        default:
          _fail(auth, "internal-error");
      }
    }
    async _linkToIdToken(auth, idToken) {
      switch (this.signInMethod) {
        case "password":
          return updateEmailPassword(auth, {
            idToken,
            returnSecureToken: true,
            email: this._email,
            password: this._password
          });
        case "emailLink":
          return signInWithEmailLinkForLinking(auth, {
            idToken,
            email: this._email,
            oobCode: this._password
          });
        default:
          _fail(auth, "internal-error");
      }
    }
    _getReauthenticationResolver(auth) {
      return this._getIdTokenResponse(auth);
    }
  };
  async function signInWithIdp(auth, request) {
    return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithIdp", _addTidIfNecessary(auth, request));
  }
  var IDP_REQUEST_URI$1 = "http://localhost";
  var OAuthCredential = class extends AuthCredential {
    constructor() {
      super(...arguments);
      this.pendingToken = null;
    }
    static _fromParams(params) {
      const cred = new OAuthCredential(params.providerId, params.signInMethod);
      if (params.idToken || params.accessToken) {
        if (params.idToken) {
          cred.idToken = params.idToken;
        }
        if (params.accessToken) {
          cred.accessToken = params.accessToken;
        }
        if (params.nonce && !params.pendingToken) {
          cred.nonce = params.nonce;
        }
        if (params.pendingToken) {
          cred.pendingToken = params.pendingToken;
        }
      } else if (params.oauthToken && params.oauthTokenSecret) {
        cred.accessToken = params.oauthToken;
        cred.secret = params.oauthTokenSecret;
      } else {
        _fail("argument-error");
      }
      return cred;
    }
    toJSON() {
      return {
        idToken: this.idToken,
        accessToken: this.accessToken,
        secret: this.secret,
        nonce: this.nonce,
        pendingToken: this.pendingToken,
        providerId: this.providerId,
        signInMethod: this.signInMethod
      };
    }
    static fromJSON(json) {
      const obj = typeof json === "string" ? JSON.parse(json) : json;
      const { providerId, signInMethod } = obj, rest = __rest(obj, ["providerId", "signInMethod"]);
      if (!providerId || !signInMethod) {
        return null;
      }
      const cred = new OAuthCredential(providerId, signInMethod);
      cred.idToken = rest.idToken || void 0;
      cred.accessToken = rest.accessToken || void 0;
      cred.secret = rest.secret;
      cred.nonce = rest.nonce;
      cred.pendingToken = rest.pendingToken || null;
      return cred;
    }
    _getIdTokenResponse(auth) {
      const request = this.buildRequest();
      return signInWithIdp(auth, request);
    }
    _linkToIdToken(auth, idToken) {
      const request = this.buildRequest();
      request.idToken = idToken;
      return signInWithIdp(auth, request);
    }
    _getReauthenticationResolver(auth) {
      const request = this.buildRequest();
      request.autoCreate = false;
      return signInWithIdp(auth, request);
    }
    buildRequest() {
      const request = {
        requestUri: IDP_REQUEST_URI$1,
        returnSecureToken: true
      };
      if (this.pendingToken) {
        request.pendingToken = this.pendingToken;
      } else {
        const postBody = {};
        if (this.idToken) {
          postBody["id_token"] = this.idToken;
        }
        if (this.accessToken) {
          postBody["access_token"] = this.accessToken;
        }
        if (this.secret) {
          postBody["oauth_token_secret"] = this.secret;
        }
        postBody["providerId"] = this.providerId;
        if (this.nonce && !this.pendingToken) {
          postBody["nonce"] = this.nonce;
        }
        request.postBody = querystring(postBody);
      }
      return request;
    }
  };
  async function sendPhoneVerificationCode(auth, request) {
    return _performApiRequest(auth, "POST", "/v1/accounts:sendVerificationCode", _addTidIfNecessary(auth, request));
  }
  async function signInWithPhoneNumber$1(auth, request) {
    return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, request));
  }
  async function linkWithPhoneNumber$1(auth, request) {
    const response = await _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, request));
    if (response.temporaryProof) {
      throw _makeTaggedError(auth, "account-exists-with-different-credential", response);
    }
    return response;
  }
  var VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_ = {
    ["USER_NOT_FOUND"]: "user-not-found"
  };
  async function verifyPhoneNumberForExisting(auth, request) {
    const apiRequest = Object.assign(Object.assign({}, request), { operation: "REAUTH" });
    return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, apiRequest), VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_);
  }
  var PhoneAuthCredential = class extends AuthCredential {
    constructor(params) {
      super("phone", "phone");
      this.params = params;
    }
    static _fromVerification(verificationId, verificationCode) {
      return new PhoneAuthCredential({ verificationId, verificationCode });
    }
    static _fromTokenResponse(phoneNumber, temporaryProof) {
      return new PhoneAuthCredential({ phoneNumber, temporaryProof });
    }
    _getIdTokenResponse(auth) {
      return signInWithPhoneNumber$1(auth, this._makeVerificationRequest());
    }
    _linkToIdToken(auth, idToken) {
      return linkWithPhoneNumber$1(auth, Object.assign({ idToken }, this._makeVerificationRequest()));
    }
    _getReauthenticationResolver(auth) {
      return verifyPhoneNumberForExisting(auth, this._makeVerificationRequest());
    }
    _makeVerificationRequest() {
      const { temporaryProof, phoneNumber, verificationId, verificationCode } = this.params;
      if (temporaryProof && phoneNumber) {
        return { temporaryProof, phoneNumber };
      }
      return {
        sessionInfo: verificationId,
        code: verificationCode
      };
    }
    toJSON() {
      const obj = {
        providerId: this.providerId
      };
      if (this.params.phoneNumber) {
        obj.phoneNumber = this.params.phoneNumber;
      }
      if (this.params.temporaryProof) {
        obj.temporaryProof = this.params.temporaryProof;
      }
      if (this.params.verificationCode) {
        obj.verificationCode = this.params.verificationCode;
      }
      if (this.params.verificationId) {
        obj.verificationId = this.params.verificationId;
      }
      return obj;
    }
    static fromJSON(json) {
      if (typeof json === "string") {
        json = JSON.parse(json);
      }
      const { verificationId, verificationCode, phoneNumber, temporaryProof } = json;
      if (!verificationCode && !verificationId && !phoneNumber && !temporaryProof) {
        return null;
      }
      return new PhoneAuthCredential({
        verificationId,
        verificationCode,
        phoneNumber,
        temporaryProof
      });
    }
  };
  function parseMode(mode) {
    switch (mode) {
      case "recoverEmail":
        return "RECOVER_EMAIL";
      case "resetPassword":
        return "PASSWORD_RESET";
      case "signIn":
        return "EMAIL_SIGNIN";
      case "verifyEmail":
        return "VERIFY_EMAIL";
      case "verifyAndChangeEmail":
        return "VERIFY_AND_CHANGE_EMAIL";
      case "revertSecondFactorAddition":
        return "REVERT_SECOND_FACTOR_ADDITION";
      default:
        return null;
    }
  }
  function parseDeepLink(url) {
    const link = querystringDecode(extractQuerystring(url))["link"];
    const doubleDeepLink = link ? querystringDecode(extractQuerystring(link))["deep_link_id"] : null;
    const iOSDeepLink = querystringDecode(extractQuerystring(url))["deep_link_id"];
    const iOSDoubleDeepLink = iOSDeepLink ? querystringDecode(extractQuerystring(iOSDeepLink))["link"] : null;
    return iOSDoubleDeepLink || iOSDeepLink || doubleDeepLink || link || url;
  }
  var ActionCodeURL = class {
    constructor(actionLink) {
      var _a, _b, _c, _d, _e, _f;
      const searchParams = querystringDecode(extractQuerystring(actionLink));
      const apiKey = (_a = searchParams["apiKey"]) !== null && _a !== void 0 ? _a : null;
      const code = (_b = searchParams["oobCode"]) !== null && _b !== void 0 ? _b : null;
      const operation = parseMode((_c = searchParams["mode"]) !== null && _c !== void 0 ? _c : null);
      _assert(apiKey && code && operation, "argument-error");
      this.apiKey = apiKey;
      this.operation = operation;
      this.code = code;
      this.continueUrl = (_d = searchParams["continueUrl"]) !== null && _d !== void 0 ? _d : null;
      this.languageCode = (_e = searchParams["languageCode"]) !== null && _e !== void 0 ? _e : null;
      this.tenantId = (_f = searchParams["tenantId"]) !== null && _f !== void 0 ? _f : null;
    }
    static parseLink(link) {
      const actionLink = parseDeepLink(link);
      try {
        return new ActionCodeURL(actionLink);
      } catch (_a) {
        return null;
      }
    }
  };
  var EmailAuthProvider = class {
    constructor() {
      this.providerId = EmailAuthProvider.PROVIDER_ID;
    }
    static credential(email, password) {
      return EmailAuthCredential._fromEmailAndPassword(email, password);
    }
    static credentialWithLink(email, emailLink) {
      const actionCodeUrl = ActionCodeURL.parseLink(emailLink);
      _assert(actionCodeUrl, "argument-error");
      return EmailAuthCredential._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
    }
  };
  EmailAuthProvider.PROVIDER_ID = "password";
  EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password";
  EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
  var FederatedAuthProvider = class {
    constructor(providerId) {
      this.providerId = providerId;
      this.defaultLanguageCode = null;
      this.customParameters = {};
    }
    setDefaultLanguage(languageCode) {
      this.defaultLanguageCode = languageCode;
    }
    setCustomParameters(customOAuthParameters) {
      this.customParameters = customOAuthParameters;
      return this;
    }
    getCustomParameters() {
      return this.customParameters;
    }
  };
  var BaseOAuthProvider = class extends FederatedAuthProvider {
    constructor() {
      super(...arguments);
      this.scopes = [];
    }
    addScope(scope) {
      if (!this.scopes.includes(scope)) {
        this.scopes.push(scope);
      }
      return this;
    }
    getScopes() {
      return [...this.scopes];
    }
  };
  var FacebookAuthProvider = class extends BaseOAuthProvider {
    constructor() {
      super("facebook.com");
    }
    static credential(accessToken) {
      return OAuthCredential._fromParams({
        providerId: FacebookAuthProvider.PROVIDER_ID,
        signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
        accessToken
      });
    }
    static credentialFromResult(userCredential) {
      return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
    }
    static credentialFromError(error2) {
      return FacebookAuthProvider.credentialFromTaggedObject(error2.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
      if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) {
        return null;
      }
      if (!tokenResponse.oauthAccessToken) {
        return null;
      }
      try {
        return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
      } catch (_a) {
        return null;
      }
    }
  };
  FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
  FacebookAuthProvider.PROVIDER_ID = "facebook.com";
  var GoogleAuthProvider = class extends BaseOAuthProvider {
    constructor() {
      super("google.com");
      this.addScope("profile");
    }
    static credential(idToken, accessToken) {
      return OAuthCredential._fromParams({
        providerId: GoogleAuthProvider.PROVIDER_ID,
        signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
        idToken,
        accessToken
      });
    }
    static credentialFromResult(userCredential) {
      return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
    }
    static credentialFromError(error2) {
      return GoogleAuthProvider.credentialFromTaggedObject(error2.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
      if (!tokenResponse) {
        return null;
      }
      const { oauthIdToken, oauthAccessToken } = tokenResponse;
      if (!oauthIdToken && !oauthAccessToken) {
        return null;
      }
      try {
        return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
      } catch (_a) {
        return null;
      }
    }
  };
  GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com";
  GoogleAuthProvider.PROVIDER_ID = "google.com";
  var GithubAuthProvider = class extends BaseOAuthProvider {
    constructor() {
      super("github.com");
    }
    static credential(accessToken) {
      return OAuthCredential._fromParams({
        providerId: GithubAuthProvider.PROVIDER_ID,
        signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
        accessToken
      });
    }
    static credentialFromResult(userCredential) {
      return GithubAuthProvider.credentialFromTaggedObject(userCredential);
    }
    static credentialFromError(error2) {
      return GithubAuthProvider.credentialFromTaggedObject(error2.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
      if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) {
        return null;
      }
      if (!tokenResponse.oauthAccessToken) {
        return null;
      }
      try {
        return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
      } catch (_a) {
        return null;
      }
    }
  };
  GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com";
  GithubAuthProvider.PROVIDER_ID = "github.com";
  var TwitterAuthProvider = class extends BaseOAuthProvider {
    constructor() {
      super("twitter.com");
    }
    static credential(token, secret) {
      return OAuthCredential._fromParams({
        providerId: TwitterAuthProvider.PROVIDER_ID,
        signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
        oauthToken: token,
        oauthTokenSecret: secret
      });
    }
    static credentialFromResult(userCredential) {
      return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
    }
    static credentialFromError(error2) {
      return TwitterAuthProvider.credentialFromTaggedObject(error2.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
      if (!tokenResponse) {
        return null;
      }
      const { oauthAccessToken, oauthTokenSecret } = tokenResponse;
      if (!oauthAccessToken || !oauthTokenSecret) {
        return null;
      }
      try {
        return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
      } catch (_a) {
        return null;
      }
    }
  };
  TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com";
  TwitterAuthProvider.PROVIDER_ID = "twitter.com";
  var UserCredentialImpl = class {
    constructor(params) {
      this.user = params.user;
      this.providerId = params.providerId;
      this._tokenResponse = params._tokenResponse;
      this.operationType = params.operationType;
    }
    static async _fromIdTokenResponse(auth, operationType, idTokenResponse, isAnonymous = false) {
      const user2 = await UserImpl._fromIdTokenResponse(auth, idTokenResponse, isAnonymous);
      const providerId = providerIdForResponse(idTokenResponse);
      const userCred = new UserCredentialImpl({
        user: user2,
        providerId,
        _tokenResponse: idTokenResponse,
        operationType
      });
      return userCred;
    }
    static async _forOperation(user2, operationType, response) {
      await user2._updateTokensIfNecessary(response, true);
      const providerId = providerIdForResponse(response);
      return new UserCredentialImpl({
        user: user2,
        providerId,
        _tokenResponse: response,
        operationType
      });
    }
  };
  function providerIdForResponse(response) {
    if (response.providerId) {
      return response.providerId;
    }
    if ("phoneNumber" in response) {
      return "phone";
    }
    return null;
  }
  var MultiFactorError = class extends FirebaseError {
    constructor(auth, error2, operationType, user2) {
      var _a;
      super(error2.code, error2.message);
      this.operationType = operationType;
      this.user = user2;
      Object.setPrototypeOf(this, MultiFactorError.prototype);
      this.customData = {
        appName: auth.name,
        tenantId: (_a = auth.tenantId) !== null && _a !== void 0 ? _a : void 0,
        _serverResponse: error2.customData._serverResponse,
        operationType
      };
    }
    static _fromErrorAndOperation(auth, error2, operationType, user2) {
      return new MultiFactorError(auth, error2, operationType, user2);
    }
  };
  function _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user2) {
    const idTokenProvider = operationType === "reauthenticate" ? credential._getReauthenticationResolver(auth) : credential._getIdTokenResponse(auth);
    return idTokenProvider.catch((error2) => {
      if (error2.code === `auth/${"multi-factor-auth-required"}`) {
        throw MultiFactorError._fromErrorAndOperation(auth, error2, operationType, user2);
      }
      throw error2;
    });
  }
  async function _link$1(user2, credential, bypassAuthState = false) {
    const response = await _logoutIfInvalidated(user2, credential._linkToIdToken(user2.auth, await user2.getIdToken()), bypassAuthState);
    return UserCredentialImpl._forOperation(user2, "link", response);
  }
  async function _reauthenticate(user2, credential, bypassAuthState = false) {
    var _a;
    const { auth } = user2;
    const operationType = "reauthenticate";
    try {
      const response = await _logoutIfInvalidated(user2, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user2), bypassAuthState);
      _assert(response.idToken, auth, "internal-error");
      const parsed = _parseToken(response.idToken);
      _assert(parsed, auth, "internal-error");
      const { sub: localId } = parsed;
      _assert(user2.uid === localId, auth, "user-mismatch");
      return UserCredentialImpl._forOperation(user2, operationType, response);
    } catch (e) {
      if (((_a = e) === null || _a === void 0 ? void 0 : _a.code) === `auth/${"user-not-found"}`) {
        _fail(auth, "user-mismatch");
      }
      throw e;
    }
  }
  async function _signInWithCredential(auth, credential, bypassAuthState = false) {
    const operationType = "signIn";
    const response = await _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential);
    const userCredential = await UserCredentialImpl._fromIdTokenResponse(auth, operationType, response);
    if (!bypassAuthState) {
      await auth._updateCurrentUser(userCredential.user);
    }
    return userCredential;
  }
  function onIdTokenChanged(auth, nextOrObserver, error2, completed) {
    return getModularInstance(auth).onIdTokenChanged(nextOrObserver, error2, completed);
  }
  function beforeAuthStateChanged(auth, callback, onAbort) {
    return getModularInstance(auth).beforeAuthStateChanged(callback, onAbort);
  }
  function onAuthStateChanged(auth, nextOrObserver, error2, completed) {
    return getModularInstance(auth).onAuthStateChanged(nextOrObserver, error2, completed);
  }
  function startEnrollPhoneMfa(auth, request) {
    return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:start", _addTidIfNecessary(auth, request));
  }
  function finalizeEnrollPhoneMfa(auth, request) {
    return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:finalize", _addTidIfNecessary(auth, request));
  }
  var STORAGE_AVAILABLE_KEY = "__sak";
  var BrowserPersistenceClass = class {
    constructor(storageRetriever, type) {
      this.storageRetriever = storageRetriever;
      this.type = type;
    }
    _isAvailable() {
      try {
        if (!this.storage) {
          return Promise.resolve(false);
        }
        this.storage.setItem(STORAGE_AVAILABLE_KEY, "1");
        this.storage.removeItem(STORAGE_AVAILABLE_KEY);
        return Promise.resolve(true);
      } catch (_a) {
        return Promise.resolve(false);
      }
    }
    _set(key, value) {
      this.storage.setItem(key, JSON.stringify(value));
      return Promise.resolve();
    }
    _get(key) {
      const json = this.storage.getItem(key);
      return Promise.resolve(json ? JSON.parse(json) : null);
    }
    _remove(key) {
      this.storage.removeItem(key);
      return Promise.resolve();
    }
    get storage() {
      return this.storageRetriever();
    }
  };
  function _iframeCannotSyncWebStorage() {
    const ua = getUA();
    return _isSafari(ua) || _isIOS(ua);
  }
  var _POLLING_INTERVAL_MS$1 = 1e3;
  var IE10_LOCAL_STORAGE_SYNC_DELAY = 10;
  var BrowserLocalPersistence = class extends BrowserPersistenceClass {
    constructor() {
      super(() => window.localStorage, "LOCAL");
      this.boundEventHandler = (event, poll) => this.onStorageEvent(event, poll);
      this.listeners = {};
      this.localCache = {};
      this.pollTimer = null;
      this.safariLocalStorageNotSynced = _iframeCannotSyncWebStorage() && _isIframe();
      this.fallbackToPolling = _isMobileBrowser();
      this._shouldAllowMigration = true;
    }
    forAllChangedKeys(cb) {
      for (const key of Object.keys(this.listeners)) {
        const newValue = this.storage.getItem(key);
        const oldValue = this.localCache[key];
        if (newValue !== oldValue) {
          cb(key, oldValue, newValue);
        }
      }
    }
    onStorageEvent(event, poll = false) {
      if (!event.key) {
        this.forAllChangedKeys((key2, _oldValue, newValue) => {
          this.notifyListeners(key2, newValue);
        });
        return;
      }
      const key = event.key;
      if (poll) {
        this.detachListener();
      } else {
        this.stopPolling();
      }
      if (this.safariLocalStorageNotSynced) {
        const storedValue2 = this.storage.getItem(key);
        if (event.newValue !== storedValue2) {
          if (event.newValue !== null) {
            this.storage.setItem(key, event.newValue);
          } else {
            this.storage.removeItem(key);
          }
        } else if (this.localCache[key] === event.newValue && !poll) {
          return;
        }
      }
      const triggerListeners = () => {
        const storedValue2 = this.storage.getItem(key);
        if (!poll && this.localCache[key] === storedValue2) {
          return;
        }
        this.notifyListeners(key, storedValue2);
      };
      const storedValue = this.storage.getItem(key);
      if (_isIE10() && storedValue !== event.newValue && event.newValue !== event.oldValue) {
        setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
      } else {
        triggerListeners();
      }
    }
    notifyListeners(key, value) {
      this.localCache[key] = value;
      const listeners = this.listeners[key];
      if (listeners) {
        for (const listener of Array.from(listeners)) {
          listener(value ? JSON.parse(value) : value);
        }
      }
    }
    startPolling() {
      this.stopPolling();
      this.pollTimer = setInterval(() => {
        this.forAllChangedKeys((key, oldValue, newValue) => {
          this.onStorageEvent(
            new StorageEvent("storage", {
              key,
              oldValue,
              newValue
            }),
            true
          );
        });
      }, _POLLING_INTERVAL_MS$1);
    }
    stopPolling() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
    }
    attachListener() {
      window.addEventListener("storage", this.boundEventHandler);
    }
    detachListener() {
      window.removeEventListener("storage", this.boundEventHandler);
    }
    _addListener(key, listener) {
      if (Object.keys(this.listeners).length === 0) {
        if (this.fallbackToPolling) {
          this.startPolling();
        } else {
          this.attachListener();
        }
      }
      if (!this.listeners[key]) {
        this.listeners[key] = /* @__PURE__ */ new Set();
        this.localCache[key] = this.storage.getItem(key);
      }
      this.listeners[key].add(listener);
    }
    _removeListener(key, listener) {
      if (this.listeners[key]) {
        this.listeners[key].delete(listener);
        if (this.listeners[key].size === 0) {
          delete this.listeners[key];
        }
      }
      if (Object.keys(this.listeners).length === 0) {
        this.detachListener();
        this.stopPolling();
      }
    }
    async _set(key, value) {
      await super._set(key, value);
      this.localCache[key] = JSON.stringify(value);
    }
    async _get(key) {
      const value = await super._get(key);
      this.localCache[key] = JSON.stringify(value);
      return value;
    }
    async _remove(key) {
      await super._remove(key);
      delete this.localCache[key];
    }
  };
  BrowserLocalPersistence.type = "LOCAL";
  var browserLocalPersistence = BrowserLocalPersistence;
  var BrowserSessionPersistence = class extends BrowserPersistenceClass {
    constructor() {
      super(() => window.sessionStorage, "SESSION");
    }
    _addListener(_key, _listener) {
      return;
    }
    _removeListener(_key, _listener) {
      return;
    }
  };
  BrowserSessionPersistence.type = "SESSION";
  var browserSessionPersistence = BrowserSessionPersistence;
  function _allSettled(promises) {
    return Promise.all(promises.map(async (promise) => {
      try {
        const value = await promise;
        return {
          fulfilled: true,
          value
        };
      } catch (reason) {
        return {
          fulfilled: false,
          reason
        };
      }
    }));
  }
  var Receiver = class {
    constructor(eventTarget) {
      this.eventTarget = eventTarget;
      this.handlersMap = {};
      this.boundEventHandler = this.handleEvent.bind(this);
    }
    static _getInstance(eventTarget) {
      const existingInstance = this.receivers.find((receiver) => receiver.isListeningto(eventTarget));
      if (existingInstance) {
        return existingInstance;
      }
      const newInstance = new Receiver(eventTarget);
      this.receivers.push(newInstance);
      return newInstance;
    }
    isListeningto(eventTarget) {
      return this.eventTarget === eventTarget;
    }
    async handleEvent(event) {
      const messageEvent = event;
      const { eventId, eventType, data } = messageEvent.data;
      const handlers = this.handlersMap[eventType];
      if (!(handlers === null || handlers === void 0 ? void 0 : handlers.size)) {
        return;
      }
      messageEvent.ports[0].postMessage({
        status: "ack",
        eventId,
        eventType
      });
      const promises = Array.from(handlers).map(async (handler) => handler(messageEvent.origin, data));
      const response = await _allSettled(promises);
      messageEvent.ports[0].postMessage({
        status: "done",
        eventId,
        eventType,
        response
      });
    }
    _subscribe(eventType, eventHandler) {
      if (Object.keys(this.handlersMap).length === 0) {
        this.eventTarget.addEventListener("message", this.boundEventHandler);
      }
      if (!this.handlersMap[eventType]) {
        this.handlersMap[eventType] = /* @__PURE__ */ new Set();
      }
      this.handlersMap[eventType].add(eventHandler);
    }
    _unsubscribe(eventType, eventHandler) {
      if (this.handlersMap[eventType] && eventHandler) {
        this.handlersMap[eventType].delete(eventHandler);
      }
      if (!eventHandler || this.handlersMap[eventType].size === 0) {
        delete this.handlersMap[eventType];
      }
      if (Object.keys(this.handlersMap).length === 0) {
        this.eventTarget.removeEventListener("message", this.boundEventHandler);
      }
    }
  };
  Receiver.receivers = [];
  function _generateEventId(prefix = "", digits = 10) {
    let random = "";
    for (let i2 = 0; i2 < digits; i2++) {
      random += Math.floor(Math.random() * 10);
    }
    return prefix + random;
  }
  var Sender = class {
    constructor(target) {
      this.target = target;
      this.handlers = /* @__PURE__ */ new Set();
    }
    removeMessageHandler(handler) {
      if (handler.messageChannel) {
        handler.messageChannel.port1.removeEventListener("message", handler.onMessage);
        handler.messageChannel.port1.close();
      }
      this.handlers.delete(handler);
    }
    async _send(eventType, data, timeout = 50) {
      const messageChannel = typeof MessageChannel !== "undefined" ? new MessageChannel() : null;
      if (!messageChannel) {
        throw new Error("connection_unavailable");
      }
      let completionTimer;
      let handler;
      return new Promise((resolve, reject) => {
        const eventId = _generateEventId("", 20);
        messageChannel.port1.start();
        const ackTimer = setTimeout(() => {
          reject(new Error("unsupported_event"));
        }, timeout);
        handler = {
          messageChannel,
          onMessage(event) {
            const messageEvent = event;
            if (messageEvent.data.eventId !== eventId) {
              return;
            }
            switch (messageEvent.data.status) {
              case "ack":
                clearTimeout(ackTimer);
                completionTimer = setTimeout(() => {
                  reject(new Error("timeout"));
                }, 3e3);
                break;
              case "done":
                clearTimeout(completionTimer);
                resolve(messageEvent.data.response);
                break;
              default:
                clearTimeout(ackTimer);
                clearTimeout(completionTimer);
                reject(new Error("invalid_response"));
                break;
            }
          }
        };
        this.handlers.add(handler);
        messageChannel.port1.addEventListener("message", handler.onMessage);
        this.target.postMessage({
          eventType,
          eventId,
          data
        }, [messageChannel.port2]);
      }).finally(() => {
        if (handler) {
          this.removeMessageHandler(handler);
        }
      });
    }
  };
  function _window() {
    return window;
  }
  function _setWindowLocation(url) {
    _window().location.href = url;
  }
  function _isWorker() {
    return typeof _window()["WorkerGlobalScope"] !== "undefined" && typeof _window()["importScripts"] === "function";
  }
  async function _getActiveServiceWorker() {
    if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) {
      return null;
    }
    try {
      const registration = await navigator.serviceWorker.ready;
      return registration.active;
    } catch (_a) {
      return null;
    }
  }
  function _getServiceWorkerController() {
    var _a;
    return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
  }
  function _getWorkerGlobalScope() {
    return _isWorker() ? self : null;
  }
  var DB_NAME2 = "firebaseLocalStorageDb";
  var DB_VERSION2 = 1;
  var DB_OBJECTSTORE_NAME = "firebaseLocalStorage";
  var DB_DATA_KEYPATH = "fbase_key";
  var DBPromise = class {
    constructor(request) {
      this.request = request;
    }
    toPromise() {
      return new Promise((resolve, reject) => {
        this.request.addEventListener("success", () => {
          resolve(this.request.result);
        });
        this.request.addEventListener("error", () => {
          reject(this.request.error);
        });
      });
    }
  };
  function getObjectStore(db, isReadWrite) {
    return db.transaction([DB_OBJECTSTORE_NAME], isReadWrite ? "readwrite" : "readonly").objectStore(DB_OBJECTSTORE_NAME);
  }
  function _deleteDatabase() {
    const request = indexedDB.deleteDatabase(DB_NAME2);
    return new DBPromise(request).toPromise();
  }
  function _openDatabase() {
    const request = indexedDB.open(DB_NAME2, DB_VERSION2);
    return new Promise((resolve, reject) => {
      request.addEventListener("error", () => {
        reject(request.error);
      });
      request.addEventListener("upgradeneeded", () => {
        const db = request.result;
        try {
          db.createObjectStore(DB_OBJECTSTORE_NAME, { keyPath: DB_DATA_KEYPATH });
        } catch (e) {
          reject(e);
        }
      });
      request.addEventListener("success", async () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) {
          db.close();
          await _deleteDatabase();
          resolve(await _openDatabase());
        } else {
          resolve(db);
        }
      });
    });
  }
  async function _putObject(db, key, value) {
    const request = getObjectStore(db, true).put({
      [DB_DATA_KEYPATH]: key,
      value
    });
    return new DBPromise(request).toPromise();
  }
  async function getObject(db, key) {
    const request = getObjectStore(db, false).get(key);
    const data = await new DBPromise(request).toPromise();
    return data === void 0 ? null : data.value;
  }
  function _deleteObject(db, key) {
    const request = getObjectStore(db, true).delete(key);
    return new DBPromise(request).toPromise();
  }
  var _POLLING_INTERVAL_MS = 800;
  var _TRANSACTION_RETRY_COUNT = 3;
  var IndexedDBLocalPersistence = class {
    constructor() {
      this.type = "LOCAL";
      this._shouldAllowMigration = true;
      this.listeners = {};
      this.localCache = {};
      this.pollTimer = null;
      this.pendingWrites = 0;
      this.receiver = null;
      this.sender = null;
      this.serviceWorkerReceiverAvailable = false;
      this.activeServiceWorker = null;
      this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {
      }, () => {
      });
    }
    async _openDb() {
      if (this.db) {
        return this.db;
      }
      this.db = await _openDatabase();
      return this.db;
    }
    async _withRetries(op) {
      let numAttempts = 0;
      while (true) {
        try {
          const db = await this._openDb();
          return await op(db);
        } catch (e) {
          if (numAttempts++ > _TRANSACTION_RETRY_COUNT) {
            throw e;
          }
          if (this.db) {
            this.db.close();
            this.db = void 0;
          }
        }
      }
    }
    async initializeServiceWorkerMessaging() {
      return _isWorker() ? this.initializeReceiver() : this.initializeSender();
    }
    async initializeReceiver() {
      this.receiver = Receiver._getInstance(_getWorkerGlobalScope());
      this.receiver._subscribe("keyChanged", async (_origin, data) => {
        const keys = await this._poll();
        return {
          keyProcessed: keys.includes(data.key)
        };
      });
      this.receiver._subscribe("ping", async (_origin, _data) => {
        return ["keyChanged"];
      });
    }
    async initializeSender() {
      var _a, _b;
      this.activeServiceWorker = await _getActiveServiceWorker();
      if (!this.activeServiceWorker) {
        return;
      }
      this.sender = new Sender(this.activeServiceWorker);
      const results = await this.sender._send("ping", {}, 800);
      if (!results) {
        return;
      }
      if (((_a = results[0]) === null || _a === void 0 ? void 0 : _a.fulfilled) && ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged"))) {
        this.serviceWorkerReceiverAvailable = true;
      }
    }
    async notifyServiceWorker(key) {
      if (!this.sender || !this.activeServiceWorker || _getServiceWorkerController() !== this.activeServiceWorker) {
        return;
      }
      try {
        await this.sender._send(
          "keyChanged",
          { key },
          this.serviceWorkerReceiverAvailable ? 800 : 50
        );
      } catch (_a) {
      }
    }
    async _isAvailable() {
      try {
        if (!indexedDB) {
          return false;
        }
        const db = await _openDatabase();
        await _putObject(db, STORAGE_AVAILABLE_KEY, "1");
        await _deleteObject(db, STORAGE_AVAILABLE_KEY);
        return true;
      } catch (_a) {
      }
      return false;
    }
    async _withPendingWrite(write) {
      this.pendingWrites++;
      try {
        await write();
      } finally {
        this.pendingWrites--;
      }
    }
    async _set(key, value) {
      return this._withPendingWrite(async () => {
        await this._withRetries((db) => _putObject(db, key, value));
        this.localCache[key] = value;
        return this.notifyServiceWorker(key);
      });
    }
    async _get(key) {
      const obj = await this._withRetries((db) => getObject(db, key));
      this.localCache[key] = obj;
      return obj;
    }
    async _remove(key) {
      return this._withPendingWrite(async () => {
        await this._withRetries((db) => _deleteObject(db, key));
        delete this.localCache[key];
        return this.notifyServiceWorker(key);
      });
    }
    async _poll() {
      const result = await this._withRetries((db) => {
        const getAllRequest = getObjectStore(db, false).getAll();
        return new DBPromise(getAllRequest).toPromise();
      });
      if (!result) {
        return [];
      }
      if (this.pendingWrites !== 0) {
        return [];
      }
      const keys = [];
      const keysInResult = /* @__PURE__ */ new Set();
      for (const { fbase_key: key, value } of result) {
        keysInResult.add(key);
        if (JSON.stringify(this.localCache[key]) !== JSON.stringify(value)) {
          this.notifyListeners(key, value);
          keys.push(key);
        }
      }
      for (const localKey of Object.keys(this.localCache)) {
        if (this.localCache[localKey] && !keysInResult.has(localKey)) {
          this.notifyListeners(localKey, null);
          keys.push(localKey);
        }
      }
      return keys;
    }
    notifyListeners(key, newValue) {
      this.localCache[key] = newValue;
      const listeners = this.listeners[key];
      if (listeners) {
        for (const listener of Array.from(listeners)) {
          listener(newValue);
        }
      }
    }
    startPolling() {
      this.stopPolling();
      this.pollTimer = setInterval(async () => this._poll(), _POLLING_INTERVAL_MS);
    }
    stopPolling() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
    }
    _addListener(key, listener) {
      if (Object.keys(this.listeners).length === 0) {
        this.startPolling();
      }
      if (!this.listeners[key]) {
        this.listeners[key] = /* @__PURE__ */ new Set();
        void this._get(key);
      }
      this.listeners[key].add(listener);
    }
    _removeListener(key, listener) {
      if (this.listeners[key]) {
        this.listeners[key].delete(listener);
        if (this.listeners[key].size === 0) {
          delete this.listeners[key];
        }
      }
      if (Object.keys(this.listeners).length === 0) {
        this.stopPolling();
      }
    }
  };
  IndexedDBLocalPersistence.type = "LOCAL";
  var indexedDBLocalPersistence = IndexedDBLocalPersistence;
  function startSignInPhoneMfa(auth, request) {
    return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:start", _addTidIfNecessary(auth, request));
  }
  function finalizeSignInPhoneMfa(auth, request) {
    return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:finalize", _addTidIfNecessary(auth, request));
  }
  function getScriptParentElement() {
    var _a, _b;
    return (_b = (_a = document.getElementsByTagName("head")) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
  }
  function _loadJS(url) {
    return new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.setAttribute("src", url);
      el.onload = resolve;
      el.onerror = (e) => {
        const error2 = _createError("internal-error");
        error2.customData = e;
        reject(error2);
      };
      el.type = "text/javascript";
      el.charset = "UTF-8";
      getScriptParentElement().appendChild(el);
    });
  }
  function _generateCallbackName(prefix) {
    return `__${prefix}${Math.floor(Math.random() * 1e6)}`;
  }
  var _JSLOAD_CALLBACK = _generateCallbackName("rcb");
  var NETWORK_TIMEOUT_DELAY = new Delay(3e4, 6e4);
  var RECAPTCHA_VERIFIER_TYPE = "recaptcha";
  async function _verifyPhoneNumber(auth, options, verifier) {
    var _a;
    const recaptchaToken = await verifier.verify();
    try {
      _assert(typeof recaptchaToken === "string", auth, "argument-error");
      _assert(verifier.type === RECAPTCHA_VERIFIER_TYPE, auth, "argument-error");
      let phoneInfoOptions;
      if (typeof options === "string") {
        phoneInfoOptions = {
          phoneNumber: options
        };
      } else {
        phoneInfoOptions = options;
      }
      if ("session" in phoneInfoOptions) {
        const session = phoneInfoOptions.session;
        if ("phoneNumber" in phoneInfoOptions) {
          _assert(session.type === "enroll", auth, "internal-error");
          const response = await startEnrollPhoneMfa(auth, {
            idToken: session.credential,
            phoneEnrollmentInfo: {
              phoneNumber: phoneInfoOptions.phoneNumber,
              recaptchaToken
            }
          });
          return response.phoneSessionInfo.sessionInfo;
        } else {
          _assert(session.type === "signin", auth, "internal-error");
          const mfaEnrollmentId = ((_a = phoneInfoOptions.multiFactorHint) === null || _a === void 0 ? void 0 : _a.uid) || phoneInfoOptions.multiFactorUid;
          _assert(mfaEnrollmentId, auth, "missing-multi-factor-info");
          const response = await startSignInPhoneMfa(auth, {
            mfaPendingCredential: session.credential,
            mfaEnrollmentId,
            phoneSignInInfo: {
              recaptchaToken
            }
          });
          return response.phoneResponseInfo.sessionInfo;
        }
      } else {
        const { sessionInfo } = await sendPhoneVerificationCode(auth, {
          phoneNumber: phoneInfoOptions.phoneNumber,
          recaptchaToken
        });
        return sessionInfo;
      }
    } finally {
      verifier._reset();
    }
  }
  var PhoneAuthProvider = class {
    constructor(auth) {
      this.providerId = PhoneAuthProvider.PROVIDER_ID;
      this.auth = _castAuth(auth);
    }
    verifyPhoneNumber(phoneOptions, applicationVerifier) {
      return _verifyPhoneNumber(this.auth, phoneOptions, getModularInstance(applicationVerifier));
    }
    static credential(verificationId, verificationCode) {
      return PhoneAuthCredential._fromVerification(verificationId, verificationCode);
    }
    static credentialFromResult(userCredential) {
      const credential = userCredential;
      return PhoneAuthProvider.credentialFromTaggedObject(credential);
    }
    static credentialFromError(error2) {
      return PhoneAuthProvider.credentialFromTaggedObject(error2.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
      if (!tokenResponse) {
        return null;
      }
      const { phoneNumber, temporaryProof } = tokenResponse;
      if (phoneNumber && temporaryProof) {
        return PhoneAuthCredential._fromTokenResponse(phoneNumber, temporaryProof);
      }
      return null;
    }
  };
  PhoneAuthProvider.PROVIDER_ID = "phone";
  PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone";
  function _withDefaultResolver(auth, resolverOverride) {
    if (resolverOverride) {
      return _getInstance(resolverOverride);
    }
    _assert(auth._popupRedirectResolver, auth, "argument-error");
    return auth._popupRedirectResolver;
  }
  var IdpCredential = class extends AuthCredential {
    constructor(params) {
      super("custom", "custom");
      this.params = params;
    }
    _getIdTokenResponse(auth) {
      return signInWithIdp(auth, this._buildIdpRequest());
    }
    _linkToIdToken(auth, idToken) {
      return signInWithIdp(auth, this._buildIdpRequest(idToken));
    }
    _getReauthenticationResolver(auth) {
      return signInWithIdp(auth, this._buildIdpRequest());
    }
    _buildIdpRequest(idToken) {
      const request = {
        requestUri: this.params.requestUri,
        sessionId: this.params.sessionId,
        postBody: this.params.postBody,
        tenantId: this.params.tenantId,
        pendingToken: this.params.pendingToken,
        returnSecureToken: true,
        returnIdpCredential: true
      };
      if (idToken) {
        request.idToken = idToken;
      }
      return request;
    }
  };
  function _signIn(params) {
    return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
  }
  function _reauth(params) {
    const { auth, user: user2 } = params;
    _assert(user2, auth, "internal-error");
    return _reauthenticate(user2, new IdpCredential(params), params.bypassAuthState);
  }
  async function _link(params) {
    const { auth, user: user2 } = params;
    _assert(user2, auth, "internal-error");
    return _link$1(user2, new IdpCredential(params), params.bypassAuthState);
  }
  var AbstractPopupRedirectOperation = class {
    constructor(auth, filter, resolver, user2, bypassAuthState = false) {
      this.auth = auth;
      this.resolver = resolver;
      this.user = user2;
      this.bypassAuthState = bypassAuthState;
      this.pendingPromise = null;
      this.eventManager = null;
      this.filter = Array.isArray(filter) ? filter : [filter];
    }
    execute() {
      return new Promise(async (resolve, reject) => {
        this.pendingPromise = { resolve, reject };
        try {
          this.eventManager = await this.resolver._initialize(this.auth);
          await this.onExecution();
          this.eventManager.registerConsumer(this);
        } catch (e) {
          this.reject(e);
        }
      });
    }
    async onAuthEvent(event) {
      const { urlResponse, sessionId, postBody, tenantId, error: error2, type } = event;
      if (error2) {
        this.reject(error2);
        return;
      }
      const params = {
        auth: this.auth,
        requestUri: urlResponse,
        sessionId,
        tenantId: tenantId || void 0,
        postBody: postBody || void 0,
        user: this.user,
        bypassAuthState: this.bypassAuthState
      };
      try {
        this.resolve(await this.getIdpTask(type)(params));
      } catch (e) {
        this.reject(e);
      }
    }
    onError(error2) {
      this.reject(error2);
    }
    getIdpTask(type) {
      switch (type) {
        case "signInViaPopup":
        case "signInViaRedirect":
          return _signIn;
        case "linkViaPopup":
        case "linkViaRedirect":
          return _link;
        case "reauthViaPopup":
        case "reauthViaRedirect":
          return _reauth;
        default:
          _fail(this.auth, "internal-error");
      }
    }
    resolve(cred) {
      debugAssert(this.pendingPromise, "Pending promise was never set");
      this.pendingPromise.resolve(cred);
      this.unregisterAndCleanUp();
    }
    reject(error2) {
      debugAssert(this.pendingPromise, "Pending promise was never set");
      this.pendingPromise.reject(error2);
      this.unregisterAndCleanUp();
    }
    unregisterAndCleanUp() {
      if (this.eventManager) {
        this.eventManager.unregisterConsumer(this);
      }
      this.pendingPromise = null;
      this.cleanUp();
    }
  };
  var _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2e3, 1e4);
  var PopupOperation = class extends AbstractPopupRedirectOperation {
    constructor(auth, filter, provider, resolver, user2) {
      super(auth, filter, resolver, user2);
      this.provider = provider;
      this.authWindow = null;
      this.pollId = null;
      if (PopupOperation.currentPopupAction) {
        PopupOperation.currentPopupAction.cancel();
      }
      PopupOperation.currentPopupAction = this;
    }
    async executeNotNull() {
      const result = await this.execute();
      _assert(result, this.auth, "internal-error");
      return result;
    }
    async onExecution() {
      debugAssert(this.filter.length === 1, "Popup operations only handle one event");
      const eventId = _generateEventId();
      this.authWindow = await this.resolver._openPopup(
        this.auth,
        this.provider,
        this.filter[0],
        eventId
      );
      this.authWindow.associatedEvent = eventId;
      this.resolver._originValidation(this.auth).catch((e) => {
        this.reject(e);
      });
      this.resolver._isIframeWebStorageSupported(this.auth, (isSupported) => {
        if (!isSupported) {
          this.reject(_createError(this.auth, "web-storage-unsupported"));
        }
      });
      this.pollUserCancellation();
    }
    get eventId() {
      var _a;
      return ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.associatedEvent) || null;
    }
    cancel() {
      this.reject(_createError(this.auth, "cancelled-popup-request"));
    }
    cleanUp() {
      if (this.authWindow) {
        this.authWindow.close();
      }
      if (this.pollId) {
        window.clearTimeout(this.pollId);
      }
      this.authWindow = null;
      this.pollId = null;
      PopupOperation.currentPopupAction = null;
    }
    pollUserCancellation() {
      const poll = () => {
        var _a, _b;
        if ((_b = (_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.closed) {
          this.pollId = window.setTimeout(() => {
            this.pollId = null;
            this.reject(_createError(this.auth, "popup-closed-by-user"));
          }, 2e3);
          return;
        }
        this.pollId = window.setTimeout(poll, _POLL_WINDOW_CLOSE_TIMEOUT.get());
      };
      poll();
    }
  };
  PopupOperation.currentPopupAction = null;
  var PENDING_REDIRECT_KEY = "pendingRedirect";
  var redirectOutcomeMap = /* @__PURE__ */ new Map();
  var RedirectAction = class extends AbstractPopupRedirectOperation {
    constructor(auth, resolver, bypassAuthState = false) {
      super(auth, [
        "signInViaRedirect",
        "linkViaRedirect",
        "reauthViaRedirect",
        "unknown"
      ], resolver, void 0, bypassAuthState);
      this.eventId = null;
    }
    async execute() {
      let readyOutcome = redirectOutcomeMap.get(this.auth._key());
      if (!readyOutcome) {
        try {
          const hasPendingRedirect = await _getAndClearPendingRedirectStatus(this.resolver, this.auth);
          const result = hasPendingRedirect ? await super.execute() : null;
          readyOutcome = () => Promise.resolve(result);
        } catch (e) {
          readyOutcome = () => Promise.reject(e);
        }
        redirectOutcomeMap.set(this.auth._key(), readyOutcome);
      }
      if (!this.bypassAuthState) {
        redirectOutcomeMap.set(this.auth._key(), () => Promise.resolve(null));
      }
      return readyOutcome();
    }
    async onAuthEvent(event) {
      if (event.type === "signInViaRedirect") {
        return super.onAuthEvent(event);
      } else if (event.type === "unknown") {
        this.resolve(null);
        return;
      }
      if (event.eventId) {
        const user2 = await this.auth._redirectUserForId(event.eventId);
        if (user2) {
          this.user = user2;
          return super.onAuthEvent(event);
        } else {
          this.resolve(null);
        }
      }
    }
    async onExecution() {
    }
    cleanUp() {
    }
  };
  async function _getAndClearPendingRedirectStatus(resolver, auth) {
    const key = pendingRedirectKey(auth);
    const persistence = resolverPersistence(resolver);
    if (!await persistence._isAvailable()) {
      return false;
    }
    const hasPendingRedirect = await persistence._get(key) === "true";
    await persistence._remove(key);
    return hasPendingRedirect;
  }
  function _overrideRedirectResult(auth, result) {
    redirectOutcomeMap.set(auth._key(), result);
  }
  function resolverPersistence(resolver) {
    return _getInstance(resolver._redirectPersistence);
  }
  function pendingRedirectKey(auth) {
    return _persistenceKeyName(PENDING_REDIRECT_KEY, auth.config.apiKey, auth.name);
  }
  async function _getRedirectResult(auth, resolverExtern, bypassAuthState = false) {
    const authInternal = _castAuth(auth);
    const resolver = _withDefaultResolver(authInternal, resolverExtern);
    const action = new RedirectAction(authInternal, resolver, bypassAuthState);
    const result = await action.execute();
    if (result && !bypassAuthState) {
      delete result.user._redirectEventId;
      await authInternal._persistUserIfCurrent(result.user);
      await authInternal._setRedirectUser(null, resolverExtern);
    }
    return result;
  }
  var EVENT_DUPLICATION_CACHE_DURATION_MS = 10 * 60 * 1e3;
  var AuthEventManager = class {
    constructor(auth) {
      this.auth = auth;
      this.cachedEventUids = /* @__PURE__ */ new Set();
      this.consumers = /* @__PURE__ */ new Set();
      this.queuedRedirectEvent = null;
      this.hasHandledPotentialRedirect = false;
      this.lastProcessedEventTime = Date.now();
    }
    registerConsumer(authEventConsumer) {
      this.consumers.add(authEventConsumer);
      if (this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
        this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
        this.saveEventToCache(this.queuedRedirectEvent);
        this.queuedRedirectEvent = null;
      }
    }
    unregisterConsumer(authEventConsumer) {
      this.consumers.delete(authEventConsumer);
    }
    onEvent(event) {
      if (this.hasEventBeenHandled(event)) {
        return false;
      }
      let handled = false;
      this.consumers.forEach((consumer) => {
        if (this.isEventForConsumer(event, consumer)) {
          handled = true;
          this.sendToConsumer(event, consumer);
          this.saveEventToCache(event);
        }
      });
      if (this.hasHandledPotentialRedirect || !isRedirectEvent(event)) {
        return handled;
      }
      this.hasHandledPotentialRedirect = true;
      if (!handled) {
        this.queuedRedirectEvent = event;
        handled = true;
      }
      return handled;
    }
    sendToConsumer(event, consumer) {
      var _a;
      if (event.error && !isNullRedirectEvent(event)) {
        const code = ((_a = event.error.code) === null || _a === void 0 ? void 0 : _a.split("auth/")[1]) || "internal-error";
        consumer.onError(_createError(this.auth, code));
      } else {
        consumer.onAuthEvent(event);
      }
    }
    isEventForConsumer(event, consumer) {
      const eventIdMatches = consumer.eventId === null || !!event.eventId && event.eventId === consumer.eventId;
      return consumer.filter.includes(event.type) && eventIdMatches;
    }
    hasEventBeenHandled(event) {
      if (Date.now() - this.lastProcessedEventTime >= EVENT_DUPLICATION_CACHE_DURATION_MS) {
        this.cachedEventUids.clear();
      }
      return this.cachedEventUids.has(eventUid(event));
    }
    saveEventToCache(event) {
      this.cachedEventUids.add(eventUid(event));
      this.lastProcessedEventTime = Date.now();
    }
  };
  function eventUid(e) {
    return [e.type, e.eventId, e.sessionId, e.tenantId].filter((v2) => v2).join("-");
  }
  function isNullRedirectEvent({ type, error: error2 }) {
    return type === "unknown" && (error2 === null || error2 === void 0 ? void 0 : error2.code) === `auth/${"no-auth-event"}`;
  }
  function isRedirectEvent(event) {
    switch (event.type) {
      case "signInViaRedirect":
      case "linkViaRedirect":
      case "reauthViaRedirect":
        return true;
      case "unknown":
        return isNullRedirectEvent(event);
      default:
        return false;
    }
  }
  async function _getProjectConfig(auth, request = {}) {
    return _performApiRequest(auth, "GET", "/v1/projects", request);
  }
  var IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  var HTTP_REGEX = /^https?/;
  async function _validateOrigin(auth) {
    if (auth.config.emulator) {
      return;
    }
    const { authorizedDomains } = await _getProjectConfig(auth);
    for (const domain of authorizedDomains) {
      try {
        if (matchDomain(domain)) {
          return;
        }
      } catch (_a) {
      }
    }
    _fail(auth, "unauthorized-domain");
  }
  function matchDomain(expected) {
    const currentUrl = _getCurrentUrl();
    const { protocol, hostname } = new URL(currentUrl);
    if (expected.startsWith("chrome-extension://")) {
      const ceUrl = new URL(expected);
      if (ceUrl.hostname === "" && hostname === "") {
        return protocol === "chrome-extension:" && expected.replace("chrome-extension://", "") === currentUrl.replace("chrome-extension://", "");
      }
      return protocol === "chrome-extension:" && ceUrl.hostname === hostname;
    }
    if (!HTTP_REGEX.test(protocol)) {
      return false;
    }
    if (IP_ADDRESS_REGEX.test(expected)) {
      return hostname === expected;
    }
    const escapedDomainPattern = expected.replace(/\./g, "\\.");
    const re = new RegExp("^(.+\\." + escapedDomainPattern + "|" + escapedDomainPattern + ")$", "i");
    return re.test(hostname);
  }
  var NETWORK_TIMEOUT = new Delay(3e4, 6e4);
  function resetUnloadedGapiModules() {
    const beacon = _window().___jsl;
    if (beacon === null || beacon === void 0 ? void 0 : beacon.H) {
      for (const hint of Object.keys(beacon.H)) {
        beacon.H[hint].r = beacon.H[hint].r || [];
        beacon.H[hint].L = beacon.H[hint].L || [];
        beacon.H[hint].r = [...beacon.H[hint].L];
        if (beacon.CP) {
          for (let i2 = 0; i2 < beacon.CP.length; i2++) {
            beacon.CP[i2] = null;
          }
        }
      }
    }
  }
  function loadGapi(auth) {
    return new Promise((resolve, reject) => {
      var _a, _b, _c;
      function loadGapiIframe() {
        resetUnloadedGapiModules();
        gapi.load("gapi.iframes", {
          callback: () => {
            resolve(gapi.iframes.getContext());
          },
          ontimeout: () => {
            resetUnloadedGapiModules();
            reject(_createError(auth, "network-request-failed"));
          },
          timeout: NETWORK_TIMEOUT.get()
        });
      }
      if ((_b = (_a = _window().gapi) === null || _a === void 0 ? void 0 : _a.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) {
        resolve(gapi.iframes.getContext());
      } else if (!!((_c = _window().gapi) === null || _c === void 0 ? void 0 : _c.load)) {
        loadGapiIframe();
      } else {
        const cbName = _generateCallbackName("iframefcb");
        _window()[cbName] = () => {
          if (!!gapi.load) {
            loadGapiIframe();
          } else {
            reject(_createError(auth, "network-request-failed"));
          }
        };
        return _loadJS(`https://apis.google.com/js/api.js?onload=${cbName}`).catch((e) => reject(e));
      }
    }).catch((error2) => {
      cachedGApiLoader = null;
      throw error2;
    });
  }
  var cachedGApiLoader = null;
  function _loadGapi(auth) {
    cachedGApiLoader = cachedGApiLoader || loadGapi(auth);
    return cachedGApiLoader;
  }
  var PING_TIMEOUT = new Delay(5e3, 15e3);
  var IFRAME_PATH = "__/auth/iframe";
  var EMULATED_IFRAME_PATH = "emulator/auth/iframe";
  var IFRAME_ATTRIBUTES = {
    style: {
      position: "absolute",
      top: "-100px",
      width: "1px",
      height: "1px"
    },
    "aria-hidden": "true",
    tabindex: "-1"
  };
  var EID_FROM_APIHOST = /* @__PURE__ */ new Map([
    ["identitytoolkit.googleapis.com", "p"],
    ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
    ["test-identitytoolkit.sandbox.googleapis.com", "t"]
  ]);
  function getIframeUrl(auth) {
    const config = auth.config;
    _assert(config.authDomain, auth, "auth-domain-config-required");
    const url = config.emulator ? _emulatorUrl(config, EMULATED_IFRAME_PATH) : `https://${auth.config.authDomain}/${IFRAME_PATH}`;
    const params = {
      apiKey: config.apiKey,
      appName: auth.name,
      v: SDK_VERSION
    };
    const eid = EID_FROM_APIHOST.get(auth.config.apiHost);
    if (eid) {
      params.eid = eid;
    }
    const frameworks = auth._getFrameworks();
    if (frameworks.length) {
      params.fw = frameworks.join(",");
    }
    return `${url}?${querystring(params).slice(1)}`;
  }
  async function _openIframe(auth) {
    const context = await _loadGapi(auth);
    const gapi2 = _window().gapi;
    _assert(gapi2, auth, "internal-error");
    return context.open({
      where: document.body,
      url: getIframeUrl(auth),
      messageHandlersFilter: gapi2.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
      attributes: IFRAME_ATTRIBUTES,
      dontclear: true
    }, (iframe) => new Promise(async (resolve, reject) => {
      await iframe.restyle({
        setHideOnLeave: false
      });
      const networkError = _createError(auth, "network-request-failed");
      const networkErrorTimer = _window().setTimeout(() => {
        reject(networkError);
      }, PING_TIMEOUT.get());
      function clearTimerAndResolve() {
        _window().clearTimeout(networkErrorTimer);
        resolve(iframe);
      }
      iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, () => {
        reject(networkError);
      });
    }));
  }
  var BASE_POPUP_OPTIONS = {
    location: "yes",
    resizable: "yes",
    statusbar: "yes",
    toolbar: "no"
  };
  var DEFAULT_WIDTH = 500;
  var DEFAULT_HEIGHT = 600;
  var TARGET_BLANK = "_blank";
  var FIREFOX_EMPTY_URL = "http://localhost";
  var AuthPopup = class {
    constructor(window2) {
      this.window = window2;
      this.associatedEvent = null;
    }
    close() {
      if (this.window) {
        try {
          this.window.close();
        } catch (e) {
        }
      }
    }
  };
  function _open(auth, url, name5, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
    const top = Math.max((window.screen.availHeight - height) / 2, 0).toString();
    const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
    let target = "";
    const options = Object.assign(Object.assign({}, BASE_POPUP_OPTIONS), {
      width: width.toString(),
      height: height.toString(),
      top,
      left
    });
    const ua = getUA().toLowerCase();
    if (name5) {
      target = _isChromeIOS(ua) ? TARGET_BLANK : name5;
    }
    if (_isFirefox(ua)) {
      url = url || FIREFOX_EMPTY_URL;
      options.scrollbars = "yes";
    }
    const optionsString = Object.entries(options).reduce((accum, [key, value]) => `${accum}${key}=${value},`, "");
    if (_isIOSStandalone(ua) && target !== "_self") {
      openAsNewWindowIOS(url || "", target);
      return new AuthPopup(null);
    }
    const newWin = window.open(url || "", target, optionsString);
    _assert(newWin, auth, "popup-blocked");
    try {
      newWin.focus();
    } catch (e) {
    }
    return new AuthPopup(newWin);
  }
  function openAsNewWindowIOS(url, target) {
    const el = document.createElement("a");
    el.href = url;
    el.target = target;
    const click = document.createEvent("MouseEvent");
    click.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
    el.dispatchEvent(click);
  }
  var WIDGET_PATH = "__/auth/handler";
  var EMULATOR_WIDGET_PATH = "emulator/auth/handler";
  function _getRedirectUrl(auth, provider, authType, redirectUrl, eventId, additionalParams) {
    _assert(auth.config.authDomain, auth, "auth-domain-config-required");
    _assert(auth.config.apiKey, auth, "invalid-api-key");
    const params = {
      apiKey: auth.config.apiKey,
      appName: auth.name,
      authType,
      redirectUrl,
      v: SDK_VERSION,
      eventId
    };
    if (provider instanceof FederatedAuthProvider) {
      provider.setDefaultLanguage(auth.languageCode);
      params.providerId = provider.providerId || "";
      if (!isEmpty(provider.getCustomParameters())) {
        params.customParameters = JSON.stringify(provider.getCustomParameters());
      }
      for (const [key, value] of Object.entries(additionalParams || {})) {
        params[key] = value;
      }
    }
    if (provider instanceof BaseOAuthProvider) {
      const scopes = provider.getScopes().filter((scope) => scope !== "");
      if (scopes.length > 0) {
        params.scopes = scopes.join(",");
      }
    }
    if (auth.tenantId) {
      params.tid = auth.tenantId;
    }
    const paramsDict = params;
    for (const key of Object.keys(paramsDict)) {
      if (paramsDict[key] === void 0) {
        delete paramsDict[key];
      }
    }
    return `${getHandlerBase(auth)}?${querystring(paramsDict).slice(1)}`;
  }
  function getHandlerBase({ config }) {
    if (!config.emulator) {
      return `https://${config.authDomain}/${WIDGET_PATH}`;
    }
    return _emulatorUrl(config, EMULATOR_WIDGET_PATH);
  }
  var WEB_STORAGE_SUPPORT_KEY = "webStorageSupport";
  var BrowserPopupRedirectResolver = class {
    constructor() {
      this.eventManagers = {};
      this.iframes = {};
      this.originValidationPromises = {};
      this._redirectPersistence = browserSessionPersistence;
      this._completeRedirectFn = _getRedirectResult;
      this._overrideRedirectResult = _overrideRedirectResult;
    }
    async _openPopup(auth, provider, authType, eventId) {
      var _a;
      debugAssert((_a = this.eventManagers[auth._key()]) === null || _a === void 0 ? void 0 : _a.manager, "_initialize() not called before _openPopup()");
      const url = _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId);
      return _open(auth, url, _generateEventId());
    }
    async _openRedirect(auth, provider, authType, eventId) {
      await this._originValidation(auth);
      _setWindowLocation(_getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId));
      return new Promise(() => {
      });
    }
    _initialize(auth) {
      const key = auth._key();
      if (this.eventManagers[key]) {
        const { manager, promise: promise2 } = this.eventManagers[key];
        if (manager) {
          return Promise.resolve(manager);
        } else {
          debugAssert(promise2, "If manager is not set, promise should be");
          return promise2;
        }
      }
      const promise = this.initAndGetManager(auth);
      this.eventManagers[key] = { promise };
      promise.catch(() => {
        delete this.eventManagers[key];
      });
      return promise;
    }
    async initAndGetManager(auth) {
      const iframe = await _openIframe(auth);
      const manager = new AuthEventManager(auth);
      iframe.register("authEvent", (iframeEvent) => {
        _assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth, "invalid-auth-event");
        const handled = manager.onEvent(iframeEvent.authEvent);
        return { status: handled ? "ACK" : "ERROR" };
      }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
      this.eventManagers[auth._key()] = { manager };
      this.iframes[auth._key()] = iframe;
      return manager;
    }
    _isIframeWebStorageSupported(auth, cb) {
      const iframe = this.iframes[auth._key()];
      iframe.send(WEB_STORAGE_SUPPORT_KEY, { type: WEB_STORAGE_SUPPORT_KEY }, (result) => {
        var _a;
        const isSupported = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a[WEB_STORAGE_SUPPORT_KEY];
        if (isSupported !== void 0) {
          cb(!!isSupported);
        }
        _fail(auth, "internal-error");
      }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
    }
    _originValidation(auth) {
      const key = auth._key();
      if (!this.originValidationPromises[key]) {
        this.originValidationPromises[key] = _validateOrigin(auth);
      }
      return this.originValidationPromises[key];
    }
    get _shouldInitProactively() {
      return _isMobileBrowser() || _isSafari() || _isIOS();
    }
  };
  var browserPopupRedirectResolver = BrowserPopupRedirectResolver;
  var MultiFactorAssertionImpl = class {
    constructor(factorId) {
      this.factorId = factorId;
    }
    _process(auth, session, displayName) {
      switch (session.type) {
        case "enroll":
          return this._finalizeEnroll(auth, session.credential, displayName);
        case "signin":
          return this._finalizeSignIn(auth, session.credential);
        default:
          return debugFail("unexpected MultiFactorSessionType");
      }
    }
  };
  var PhoneMultiFactorAssertionImpl = class extends MultiFactorAssertionImpl {
    constructor(credential) {
      super("phone");
      this.credential = credential;
    }
    static _fromCredential(credential) {
      return new PhoneMultiFactorAssertionImpl(credential);
    }
    _finalizeEnroll(auth, idToken, displayName) {
      return finalizeEnrollPhoneMfa(auth, {
        idToken,
        displayName,
        phoneVerificationInfo: this.credential._makeVerificationRequest()
      });
    }
    _finalizeSignIn(auth, mfaPendingCredential) {
      return finalizeSignInPhoneMfa(auth, {
        mfaPendingCredential,
        phoneVerificationInfo: this.credential._makeVerificationRequest()
      });
    }
  };
  var PhoneMultiFactorGenerator = class {
    constructor() {
    }
    static assertion(credential) {
      return PhoneMultiFactorAssertionImpl._fromCredential(credential);
    }
  };
  PhoneMultiFactorGenerator.FACTOR_ID = "phone";
  var name3 = "@firebase/auth";
  var version4 = "0.20.11";
  var AuthInterop = class {
    constructor(auth) {
      this.auth = auth;
      this.internalListeners = /* @__PURE__ */ new Map();
    }
    getUid() {
      var _a;
      this.assertAuthConfigured();
      return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
    }
    async getToken(forceRefresh) {
      this.assertAuthConfigured();
      await this.auth._initializationPromise;
      if (!this.auth.currentUser) {
        return null;
      }
      const accessToken = await this.auth.currentUser.getIdToken(forceRefresh);
      return { accessToken };
    }
    addAuthTokenListener(listener) {
      this.assertAuthConfigured();
      if (this.internalListeners.has(listener)) {
        return;
      }
      const unsubscribe = this.auth.onIdTokenChanged((user2) => {
        var _a;
        listener(((_a = user2) === null || _a === void 0 ? void 0 : _a.stsTokenManager.accessToken) || null);
      });
      this.internalListeners.set(listener, unsubscribe);
      this.updateProactiveRefresh();
    }
    removeAuthTokenListener(listener) {
      this.assertAuthConfigured();
      const unsubscribe = this.internalListeners.get(listener);
      if (!unsubscribe) {
        return;
      }
      this.internalListeners.delete(listener);
      unsubscribe();
      this.updateProactiveRefresh();
    }
    assertAuthConfigured() {
      _assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth");
    }
    updateProactiveRefresh() {
      if (this.internalListeners.size > 0) {
        this.auth._startProactiveRefresh();
      } else {
        this.auth._stopProactiveRefresh();
      }
    }
  };
  function getVersionForPlatform(clientPlatform) {
    switch (clientPlatform) {
      case "Node":
        return "node";
      case "ReactNative":
        return "rn";
      case "Worker":
        return "webworker";
      case "Cordova":
        return "cordova";
      default:
        return void 0;
    }
  }
  function registerAuth(clientPlatform) {
    _registerComponent(new Component("auth", (container, { options: deps }) => {
      const app2 = container.getProvider("app").getImmediate();
      const heartbeatServiceProvider = container.getProvider("heartbeat");
      const { apiKey, authDomain } = app2.options;
      return ((app3, heartbeatServiceProvider2) => {
        _assert(apiKey && !apiKey.includes(":"), "invalid-api-key", { appName: app3.name });
        _assert(!(authDomain === null || authDomain === void 0 ? void 0 : authDomain.includes(":")), "argument-error", {
          appName: app3.name
        });
        const config = {
          apiKey,
          authDomain,
          clientPlatform,
          apiHost: "identitytoolkit.googleapis.com",
          tokenApiHost: "securetoken.googleapis.com",
          apiScheme: "https",
          sdkClientVersion: _getClientVersion(clientPlatform)
        };
        const authInstance = new AuthImpl(app3, heartbeatServiceProvider2, config);
        _initializeAuthInstance(authInstance, deps);
        return authInstance;
      })(app2, heartbeatServiceProvider);
    }, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container, _instanceIdentifier, _instance) => {
      const authInternalProvider = container.getProvider("auth-internal");
      authInternalProvider.initialize();
    }));
    _registerComponent(new Component("auth-internal", (container) => {
      const auth = _castAuth(container.getProvider("auth").getImmediate());
      return ((auth2) => new AuthInterop(auth2))(auth);
    }, "PRIVATE").setInstantiationMode("EXPLICIT"));
    registerVersion(name3, version4, getVersionForPlatform(clientPlatform));
    registerVersion(name3, version4, "esm2017");
  }
  var DEFAULT_ID_TOKEN_MAX_AGE = 5 * 60;
  var authIdTokenMaxAge = getExperimentalSetting("authIdTokenMaxAge") || DEFAULT_ID_TOKEN_MAX_AGE;
  var lastPostedIdToken = null;
  var mintCookieFactory = (url) => async (user2) => {
    const idTokenResult = user2 && await user2.getIdTokenResult();
    const idTokenAge = idTokenResult && (new Date().getTime() - Date.parse(idTokenResult.issuedAtTime)) / 1e3;
    if (idTokenAge && idTokenAge > authIdTokenMaxAge) {
      return;
    }
    const idToken = idTokenResult === null || idTokenResult === void 0 ? void 0 : idTokenResult.token;
    if (lastPostedIdToken === idToken) {
      return;
    }
    lastPostedIdToken = idToken;
    await fetch(url, {
      method: idToken ? "POST" : "DELETE",
      headers: idToken ? {
        "Authorization": `Bearer ${idToken}`
      } : {}
    });
  };
  function getAuth(app2 = getApp()) {
    const provider = _getProvider(app2, "auth");
    if (provider.isInitialized()) {
      return provider.getImmediate();
    }
    const auth = initializeAuth(app2, {
      popupRedirectResolver: browserPopupRedirectResolver,
      persistence: [
        indexedDBLocalPersistence,
        browserLocalPersistence,
        browserSessionPersistence
      ]
    });
    const authTokenSyncUrl = getExperimentalSetting("authTokenSyncURL");
    if (authTokenSyncUrl) {
      const mintCookie = mintCookieFactory(authTokenSyncUrl);
      beforeAuthStateChanged(auth, mintCookie, () => mintCookie(auth.currentUser));
      onIdTokenChanged(auth, (user2) => mintCookie(user2));
    }
    const authEmulatorHost = getDefaultEmulatorHost("auth");
    if (authEmulatorHost) {
      connectAuthEmulator(auth, `http://${authEmulatorHost}`);
    }
    return auth;
  }
  registerAuth("Browser");

  // ../../node_modules/firebase/app/dist/index.esm.js
  var name4 = "firebase";
  var version5 = "9.14.0";
  registerVersion(name4, version5, "app");

  // src/service-worker.ts
  var app = initializeApp(WEB.FIREBASE, WEB.FIREBASE.APP_NAME);
  var database = getDatabase(app);
  var unsubscribers = [];
  var syncTasksMap = /* @__PURE__ */ new Map();
  var { sendMessageToClients } = initWorkerClient();
  var NATIVE_EVENT_TYPES2 = /* @__PURE__ */ new Set(["ping", "keyChanged"]);
  var user = null;
  onAuthStateChanged(getAuth(app), async (u2) => {
    user = u2;
  });
  self.addEventListener("install", function(event) {
    console.info("Service worker installing...", event);
  });
  self.addEventListener("message", async function(event) {
    if (NATIVE_EVENT_TYPES2.has(event.data.eventType)) {
      return;
    }
    const userId = user?.uid;
    console.log("event", event);
    const message = decodePostMessage(event.data);
    const uuid = message.uuid;
    switch (message.action) {
      case "syncGetRefs" /* syncGetRefs */: {
        const { syncTask } = getSyncTask2(message.data);
        return sendMessageToClients(
          encodePostMessage({
            action: "syncGetRefs" /* syncGetRefs */,
            data: {
              metadataRefPath: getPath(syncTask.queue.metadataRef),
              tasksRefPath: getPath(syncTask.queue.tasksRef)
            },
            uuid
          })
        );
      }
      case "syncStatus" /* syncStatus */: {
        const { taskId } = message.data;
        const syncTaskResult = syncTasksMap.get(taskId);
        return sendMessageToClients(
          encodePostMessage({
            action: "syncStatus" /* syncStatus */,
            data: { taskId, isActive: !!syncTaskResult },
            uuid
          })
        );
      }
      case "syncStart" /* syncStart */: {
        const { syncTask, taskId } = getSyncTask2(message.data);
        if (syncTask) {
          syncTask.queue.start();
        } else if (userId) {
          const result = await startSyncTask({ database, taskId, userId });
          unsubscribers.push(result.unsubscribe);
          syncTasksMap.set(taskId, result);
        }
        return ack(uuid);
      }
      case "syncStop" /* syncStop */: {
        const { syncTask } = getSyncTask2(message.data);
        await syncTask.queue.stop();
        return ack(uuid);
      }
      case "syncEmpty" /* syncEmpty */: {
        const { syncTask } = getSyncTask2(message.data);
        await syncTask.queue.empty();
        return ack(uuid);
      }
      case "syncRequeue" /* syncRequeue */: {
        const { syncTask } = getSyncTask2(message.data);
        await syncTask.queue.requeueByState("error" /* error */);
        return ack(uuid);
      }
      default:
        console.warn("Unhandled message", message);
        return;
    }
  });
  function getSyncTask2(syncTaskMessage) {
    const { taskId } = syncTaskMessageSchema.parse(syncTaskMessage);
    const syncTask = syncTasksMap.get(taskId);
    if (syncTask) {
      return { syncTask, taskId };
    } else {
      throw new Error("Sync task not started");
    }
  }
  function ack(uuid) {
    sendMessageToClients(encodePostMessage({ action: "syncStart" /* syncStart */, data: true, uuid }));
  }
})();
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//# sourceMappingURL=service-worker.js.map
