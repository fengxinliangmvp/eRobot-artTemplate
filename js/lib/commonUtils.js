define(['jquery'], function ($) {
    function CommonUtils() {

    }
    CommonUtils.prototype = {
        generateRandomClassName: function (classNamePrefix) {
            var randomTime = new Date().getTime();
            return classNamePrefix + randomTime + (Math.random() * 10000).toFixed(0);
        }
    }
    return { CommonUtils: CommonUtils }
});