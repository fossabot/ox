"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ox = _interopRequireDefault(require("../ox"));

var _AutoAssignConfigPlugin = _interopRequireDefault(require("../plugins/buildIns/AutoAssignConfigPlugin"));

var _BabelCliPlugin = _interopRequireDefault(require("../plugins/buildIns/BabelCliPlugin"));

const ox = new _ox.default([new _AutoAssignConfigPlugin.default(), new _BabelCliPlugin.default()]);
ox.run();