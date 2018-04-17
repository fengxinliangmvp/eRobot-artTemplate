define(['jquery','commonWidgets','industryRecommend'],function($,commonWidgets,industryRecommend){
    function AnswerClassify(){
    }
    AnswerClassify.prototype = {
        classify:function(responseData){
            var questionType = responseData.answerResultType;
            switch (questionType) {
                case '调侃问好':
                    var cW = new commonWidgets.CommonWidgets();
                    cW.sendPreAnswerContent(responseData.data.answers[0]);
                    window.cW = cW;
                    break;
                case '行业推荐':
                    var iR = new industryRecommend.IndustryRecommend();
                    iR.showIndustryRecommend(responseData);
                    window.iR = iR;
                    break;

                default:
                    break;
            }
        }
    }
    return {AnswerClassify:AnswerClassify}
});