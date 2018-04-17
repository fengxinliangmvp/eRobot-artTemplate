define(['widget', 'jquery', 'text!/templates/inputBox.html', 'template', 'ajax', 'answerClassify'], function (widget, $, header, template, ajax, answerClassify) {
    function InputBox() {
        this.cfg = {};
        this.list = {};
    }
    InputBox.prototype = $.extend({}, new widget.Widget(), new ajax.Ajax(), new answerClassify.AnswerClassify(), {
        doSend: function () {
            var txtInput = $('#txtInput');
            var that = this;
            if (txtInput.val()) {
                txtInput.blur();
                if (txtInput.val().indexOf('@小e') !== -1) {
                    feedback();
                }
                else {
                    this.freeQuestion(txtInput.val(), null, null, null, function (data) {
                        that.classify(data);
                    });
                }
            }
        },
        renderUI: function () {
            var render = template.compile(header);
            var html = render(this);
            this.boundingBox = $(html);
            this.boundingBox.appendTo(document.body);
        },
        bindUI: function () {
        },
        syncUI: function () {
        },
        destructor: function () {
        },
        showInput: function (cfg) {
            $.extend(this.cfg, cfg);
            this.render();
            return this;
        }
    });
    return {
        InputBox: InputBox
    }
});
