'use strict'

let _ = require('lodash')

module.exports.filterProps = function (collection, properties) {
  console.log(JSON.stringify(collection));
  return _.reduce(collection, (result, value, key) => {
    console.log(properties, key);
    if (_.includes(properties, key)) result[key] = value
    return result;
  }, {})
}
