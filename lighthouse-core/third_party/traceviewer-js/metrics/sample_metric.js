/**
Copyright 2016 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("../base/range.js");
require("./metric_registry.js");
require("../value/numeric.js");
require("../value/value.js");

'use strict';

global.tr.exportTo('tr.metrics', function() {
  var sizeInBytes_smallerIsBetter =
      tr.v.Unit.byName.sizeInBytes_smallerIsBetter;

  var SIZE_NUMERIC_BUILDER = tr.v.NumericBuilder.createLinear(
      sizeInBytes_smallerIsBetter, tr.b.Range.fromExplicitRange(1, 100), 100);

  function sampleMetric(valueList, model) {
    var n1 = new tr.v.ScalarNumeric(sizeInBytes_smallerIsBetter, 1);
    var n2 = new tr.v.ScalarNumeric(sizeInBytes_smallerIsBetter, 2);
    var n3 = SIZE_NUMERIC_BUILDER.build();
    n3.add(1);
    valueList.addValue(new tr.v.NumericValue(model.canonicalUrl, 'foo', n1));
    valueList.addValue(new tr.v.NumericValue(model.canonicalUrl, 'bar', n2));
    valueList.addValue(new tr.v.NumericValue(model.canonicalUrl, 'baz', n3));
  }

  sampleMetric.prototype = {
    __proto__: Function.prototype
  };

  tr.metrics.MetricRegistry.register(sampleMetric);

  return {
    sampleMetric: sampleMetric
  };
});
