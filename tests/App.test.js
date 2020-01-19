window.test = function () {
    return "works";
  }
  
  function augment(withFn) {
    var name, fn;
    for (name in window) {
        fn = window[name];
        if (typeof fn === 'function') {
            window[name] = (function(name, fn) {
                var args = arguments;
                return function() {
                    withFn.apply(this, args);
                    return fn.apply(this, arguments);
                }
            })(name, fn);
        }
    }
  }
  
  augment(function(name, fn) {
    console.log("calling " + name);
  });
  
  alert(test());
  
  