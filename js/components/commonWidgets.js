define(['jquery', 'template', 'commonUtils'], function ($, template, commonUtils) {
    function CommonWidgets() {
        this.headImg = 'images/avatar-min.png';
        this.boundingBox = null;
    }
    CommonWidgets.prototype = $.extend({}, new commonUtils.CommonUtils, {
        // UI输出的公共方法
        commonRender: function (elements, newAttribute) {
            var render = template.compile(elements);
            var sendObj = $.extend(this, newAttribute);
            var html = render(sendObj);
            this.boundingBox = $(html);
            $("#mainContent").append(this.boundingBox);
        },
        appendCommonWidgets: function (parentClassName, result) {
            $('.getRatingLabel_' + parentClassName).html(this.getRatingLabel(result));
        },
        // 前置语的输出
        sendPreAnswerContent: function (preAnswerContent, morningPushId) {
            $('.showLoading').remove();
            var elements =
                '<div class="md_left_v2">' +
                '<div class="hd">' +
                '<div class="mb_avatar">' +
                '<img src={{headImg}}>' +
                '</div>' +
                '<h4>{{preAnswerContent}}</h4>' +
                '</div>' +
                '</div>';
            this.commonRender(elements, { preAnswerContent: preAnswerContent });
        },
        // 问题的输出
        sendQuestion: function () {
            var inputTxt = $("#txtInput").val();
            $("#txtInput").val('');
            var elements =
                '<div class="md_right_v2">' +
                '<p>{{inputTxt}}</p>' +
                '<i class="icon-horn_dialog-box"></i>' +
                '</div>';
            this.commonRender(elements, { inputTxt: inputTxt });
            this.showLoading();
        },
        // 过渡效果
        showLoading: function () {
            var elements =
                '<div class="md_left_v2 showLoading">' +
                '<div class="hd">' +
                '<div class="mb_avatar">' +
                '<img src={{headImg}}>' +
                '</div>' +
                '<div class="spinner">' +
                '<div class="bounce1"></div>' +
                '<div class="bounce2"></div>' +
                '<div class="bounce3"></div>' +
                '</div>' +
                '</div>' +
                '</div>';
            this.commonRender(elements);
        },
        // 点赞区
        getRatingLabel: function (result) {
            var upId = this.generateRandomClassName('up');
            var downId = this.generateRandomClassName('down');
            var temp =
                '<a><i id="' + upId + '" class="icon-good" onclick=cW.ratingAnswer("' + result.spanId + '","' + 2 + '","' + upId + '")></i><span></span></a>' +
                '<a><i id="' + downId + '" class="icon-bad" onclick=cW.ratingAnswer("' + result.spanId + '","' + 1 + '","' + downId + '")></i><span></span></a>';
            return temp;
        },
        /**
         * 点赞
         */
        ratingAnswer:function(spanid){
            alert(spanid);
        }
    });
    template.defaults.imports.dateFormat = function (value) {
        return '666666666'
    }
    return { CommonWidgets: CommonWidgets }
});