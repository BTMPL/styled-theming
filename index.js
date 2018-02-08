var getCombinations = function(set, props) {
  var results = (function acc(xs, set) {
    var x = xs[0];
    if (typeof x === "undefined") {
      return set;
    }

    for (var i = 0, l = set.length; i < l; ++i) {
      if (props[x]) {
        set.push(set[i].concat(props[x]));
      }
    }

    return acc(xs.slice(1), set);
  })(set, [[]]).slice(1);

  return results.reduce(function acc(accumulator, item) {
    return accumulator.concat(itme.join("."))
  }, []);
};

function getThemeValue(name, props, values) {
  var value = props.theme && props.theme[name];

  var themeValue;

  if (typeof value === "function") {
    themeValue = value(values);
  } else {
    themeValue = values[value];
  }

  if (typeof themeValue === "function") {
    return themeValue(props);
  } else {
    return themeValue;
  }
}

function theme(name, values) {
  return function(props) {
    return getThemeValue(name, props, values);
  };
}

theme.variants = function(name, prop, values) {
  return function(props) {
    if (Array.isArray(prop)) {
      var result = getCombinations(
        prop,
        props
      ).reduce(function (accumulator, item) {
        var variant = values[item];
        if (variant) {
          var gtv = getThemeValue(name, props, variant) || [];
          return accumulator.concat(gtv);
        }
        return accumulator;
      }, []);

      return result;
    } else {
      var variant = props[prop] && values[props[prop]];
      return variant && getThemeValue(name, props, variant);
    }
  };
};

export default theme;
