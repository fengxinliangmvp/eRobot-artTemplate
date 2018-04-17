define(['jquery', 'commonWidgets'], function ($, cw) {
    function Ajax() {
        // 属性
    }
    Ajax.prototype = $.extend({},new cw.CommonWidgets, {
        // 自由问答的获取数据
        freeQuestion: function (sendTxt, showTxt, voiceQuestion, isPopup,callback) {
            this.sendQuestion();
            var that = this;
            // if (!isPopup) {
            //     var divId = sendQuestion(showTxt ? showTxt : sendTxt, null, undefined, voiceQuestion);
            //     scrollToBodyEnd();
            // }

            $.ajax({
                type: "get",
                url: "/robot/semantic/semantic-api-service/api/qa",
                data: {
                    question: sendTxt
                    // userId: userId,
                    // inputType: voiceQuestion ? '1' : '0',
                    // organization: appKey
                },
                dataType: "jsonp",
                timeout: 15000,
                jsonp: "callback",
                success: function (json) {
                    console.log(json);
                    // console.log(json);
                    // showRequest(json);

                    // that.classify(json);
                    callback(json);
                    // if (isPopup) {
                    //     setAnswer(json, isPopup);
                    // } else {
                    // $(".showLoading").hide();
                    // json.qId = divId;
                    // setAnswer(json);
                    // var cookieContent = {
                    //     txt: sendTxt,
                    //     json: json,
                    //     time: new Date().getTime()
                    // };
                    //将问题存入localStorage中
                    // cookieArray.push(cookieContent);
                    // if (cookieArray.length > 5) {
                    //     cookieArray.shift();
                    // }
                    // localStorage.cookieArray = JSON.stringify(cookieArray);
                    // }
                },
                error: function (event) {
                    // console.log(event)
                    $(".showLoading").hide();
                    // handleException(event);
                }
            });
        },
        /**
         * 行业推荐理由的获取数据
         */
        industryRecommendationReasons: function (subjectRawValue, attribute, success) {
            $.ajax({
                type: "get",
                url: "/robot/semantic/semantic-api-service/api/qa/fix",
                data: {
                    subjectRawValue: subjectRawValue,
                    predicateType: '行业推荐理由',
                    attribute: attribute,
                    attributeType: '时间'
                    // userId: userId,
                    // organization: appKey
                },
                timeout: 10000,
                success: success
            })
        }
    });
    return { Ajax: Ajax }
});