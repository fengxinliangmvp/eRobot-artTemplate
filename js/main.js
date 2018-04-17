require.config({
    paths: {
        'jquery': 'lib/jquery1.11.3.min',
        'template': 'lib/template-web',
        'text': 'lib/text',
        'widget': 'components/widget',
        'inputBox': 'components/inputBox',
        'answerClassify':'components/answerClassify',
        'commonWidgets':'components/commonWidgets',
        'industryRecommend':'components/industryRecommend',
        'ajax':'components/ajax',
        'commonUtils':'lib/commonUtils'
    }
})
require(['jquery', 'inputBox','ajax','commonWidgets'], function ($, i,ajax,cw) {
    var inputBox = new i.InputBox();
    inputBox.showInput();
    window.inputBox = inputBox;
    window.cW = new cw.CommonWidgets();
});