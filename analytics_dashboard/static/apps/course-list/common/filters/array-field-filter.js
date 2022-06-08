/**
 * Returns results that have the value in the field array.
 */

define(() => {
  'use strict';

  const _ = require('underscore');

  const ArrayFieldFilter = function (field, value) {
    this.field = field;
    this.value = value;
  };

  ArrayFieldFilter.prototype.filter = function (collection) {
    return collection.filter(_.bind(function (item) {
      return _.contains(item.get(this.field), this.value);
    }, this));
  };

  return ArrayFieldFilter;
});
