define(['require', 'jquery', 'commonWidgets', 'text!/templates/industryRecommend.html', 'ajax'], function (require, $, commonWidgets, header, ajax) {
    function IndustryRecommend() {
        this.cfg = {
            random: Math.floor(Math.random() * 1000000000)
        }
    }
    IndustryRecommend.prototype = $.extend({},
        new commonWidgets.CommonWidgets(),
        new ajax.Ajax(), {
            /**
             * 页面加载到Body的方法
             */
            showIndustryRecommend: function (data) {
                var data = $.extend(data, this)
                $('.showLoading').remove();
                this.sendPreAnswerContent(data.preAnswerContent);
                this.commonRender(header, data);
                this.appendCommonWidgets(this.cfg.random,data);
            },
            /**
             * 标题下面展开/收起的操作
             */
            stretchAnswer:function(liCls){
                var targetDom = $("." + liCls);
                if (targetDom.find("a").hasClass("icon-arrow_open")) {
                    targetDom.find("a").attr("class", "icon-arrow_closed2");
                    targetDom.siblings().find("a").attr("class", "icon-arrow_open")
                } else {
                    targetDom.find("a").attr("class", "icon-arrow_open");
                }
                targetDom.siblings().find("h5").slideUp();
                targetDom.find("h5").slideToggle();
            },
            /**
             * 从后台获取推荐理由
             */
            showAnswer: function (liCls, subjectRawValue, attribute) {
                this.stretchAnswer(liCls);
                // 是否重复请求的判断
                var ifRequest = $("." + liCls).find("h5")[0].innerHTML != '' ? true : false;
                if (!ifRequest) {
                    // 获取数据的方法
                    this.industryRecommendationReasons(subjectRawValue, attribute, function (result) {
                        console.log(result);
                        if (result.answerResultType == '行业推荐理由') {
                            var content = "";
                            if (result.data.list.length > 0) {
                                var data = result.data.list[0];
                                if (attribute == "短期") {
                                    var contentS = data.analyseResults['sh000001短期行业推荐'] || data.analyseResults['sh000001短期日策略行业推荐'] || data.analyseResults['sh000001日策略行业推荐'] || data.analyseResults['sh000001短期日策略大盘行情展望'] || data.analyseResults['sh000001日策略创业板分析'] || data.analyseResults['sh000001行业推荐'] || data.analyseResults['行业分析'] || data.analyseResults['sh000001大盘行情展望'] || data.analyseResults['sh000001短期大盘行情展望'];
                                    // content += data.analyseResults['sh000001短期行业推荐'] || data.analyseResults['sh000001短期日策略行业推荐'] || data.analyseResults['sh000001日策略行业推荐'] || data.analyseResults['sh000001短期日策略大盘行情展望'] || data.analyseResults['sh000001日策略创业板分析'] || data.analyseResults['sh000001行业推荐'] || data.analyseResults['行业分析'] || data.analyseResults['sh000001大盘行情展望'] || data.analyseResults['sh000001短期大盘行情展望'];
                                    content+=contentS;
                                    if (contentS == data.analyseResults['sh000001短期行业推荐'] && data.analyseResults['sh000001短期日策略行业推荐']) {
                                        content += "<br><p style='height:10px;'></p>" + data.analyseResults['sh000001短期日策略行业推荐'];
                                    }
                                } else {
                                    var keyPoints = data.analyseFlags;
                                    keyPoints.forEach(function (item) {
                                        content += '<br/>' + data.analyseResults['sh000001' + item];
                                    });
                                    var contentS = data.analyseResults['sh000001中长期行业推荐'] || data.analyseResults['sh000001中长期日策略行业推荐'] || data.analyseResults['sh000001日策略行业推荐'] || data.analyseResults['sh000001中长期日策略大盘行情展望'] || data.analyseResults['sh000001日策略创业板分析'] || data.analyseResults['sh000001行业推荐'] || data.analyseResults['行业分析'] || data.analyseResults['sh000001大盘行情展望'] || data.analyseResults['sh000001中长期大盘行情展望'];
                                    if (contentS == data.analyseResults['sh000001中长期行业推荐'] && data.analyseResults['sh000001中长期日策略行业推荐']) {
                                        content += "<br><p style='height:10px;'></p>" + data.analyseResults['sh000001中长期日策略行业推荐'];
                                    }
                                }
                                content = "<p style='font-size:0.875rem;padding:3px 0;font-weight:bold;'>" + data.title + "</p>" + content;
                            } else {
                                content += "暂无";
                            }
                            var redT = "<s class='t_red'>" + subjectRawValue + "</s>";
                            if (content.indexOf(subjectRawValue) != -1) {
                                var regT = "/" + subjectRawValue + "/g";
                                content = content.replace(eval(regT), redT);
                            }
                            $("." + liCls).find("> h5").html(content);
                            $(".box_show_tl .on>h5").show();
                        }
                    });
                }
            }

        });
    return { IndustryRecommend: IndustryRecommend }
});