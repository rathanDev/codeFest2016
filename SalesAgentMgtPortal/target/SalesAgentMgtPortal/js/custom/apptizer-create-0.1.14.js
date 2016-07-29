$(document).ready(function(){
    initNextQViaRadioBtn();
    initQuestionNumCounter();
    initThemeColorPicker();
    initAppContentGroup();
});

function continueButtonOnClick(){
    var questionId = "q" + currentQuestionId;
    var questionMap = {};

    var subIndex;
    for(subIndex=0; subIndex<config.values.maxNestedQuestions; subIndex++){
        validateTypeQs(subIndex, "answer");
        validateTypeQs(subIndex, "file");
    }

    function validateTypeQs(subId, qType){
        var elemName = getQElemName(currentQuestionId, subId, qType);
        var elem = document.getElementsByName(elemName);
        if(elem.length > 0){
            var elemType = elem[0].getAttribute("type");
            questionMap[elem[0].getAttribute("name")] = true;
            switch (elemType) {
                case "text": {
                    if(elem[0].value == "") {
                        questionMap[elem[0].getAttribute("name")] = false;
                    }
                    break;
                }
                case "checkbox": {
                    var checboxName = ("input[name='"+ elemName + "']");
                    questionMap[elem[0].getAttribute("name")] = $(checboxName).is(':checked');
                    break;
                }
                case "radio": {
                    var radioName = ("input[name='"+ elemName + "']");
                    questionMap[elem[0].getAttribute("name")] = $(radioName).is(':checked');
                    break;
                }
                case "file": {
                    if(elem[0].value == "") {
                        questionMap[elem[0].getAttribute("name")] = false;
                    }
                    break;
                }
            }
        }
    }

    function getQElemName(majId, minId, appender){
        var questionNameFormat = "questions[{ID}][{SUB-ID}]." + appender;
        var questionName = (questionNameFormat.replace("{ID}", "" + majId)).replace("{SUB-ID}", "" + minId);

        return questionName;
    }
    
    function canContinue(){
        var check = true;
        for(var key in questionMap) {
            if(!questionMap[key]) { check = false };
        };
        return check;
    }

    if(canContinue()) {
        var isFinalButton = $(("#"+ questionId + "-continue-btn")).attr("data-final-button");
        if(isFinalButton == "true"){
            $("#submit-btn-area").removeClass("hide");
            $(("#"+ questionId + "-continue-btn-area")).addClass("hide");
            showNotification(getCommonStrings()["qList"]["validFieldsMessage"], "notice");
        } else {
            onSuccess();
        }
    } else {
        showNotification(getCommonStrings()["qList"]["invalidFieldsMessage"], "error");
    }

    function onSuccess(){
        var nextQuestionId = "q" + (currentQuestionId+1);

        $("#" + questionId).addClass('fadeOutUp animated');
        $(("#" + questionId + "dot")).removeClass('current');
        $(("#" + nextQuestionId + "dot")).addClass('current');
        $(elemIds.currentQuestionCounter).removeClass('flipInX animated');

        setTimeout(function () {
                $("#" + questionId).addClass('hide');
                $("#" + nextQuestionId).removeClass('hide');
                $("#" + nextQuestionId).addClass('fadeInUp animated');
                window.scrollTo(0, 0);
            }, 400
        );

        currentQuestionId = currentQuestionId + 1;
        incrQuestionNumCounter();
    }
}

function initQuestionNumCounter(){
    totalQuestions = $(elemIds.totalQuestionValGetter).attr("data-val");
    initNavDots();
    $(elemIds.totalQuestionCounter).text(totalQuestions);
}

function incrQuestionNumCounter(){
    $(elemIds.currentQuestionCounter).addClass('flipInX animated');
    $(elemIds.currentQuestionCounter).text(currentQuestionId+1);
}

function initNavDots() {
    var i = 0;
    for (; i < totalQuestions; ) {
        var htmlElemClass;
        if(i==0) { htmlElemClass = "dots bounceIn animated current"}
        else {htmlElemClass = "dots bounceIn animated"}
        var htmlElemId = "q" + i + "dot";

        var navHtml =  $("<li></li>").html("<a class='inactive-link'>&nbsp;</a>").addClass(htmlElemClass).attr("id", htmlElemId);
        $(elemIds.questionNavDots).append(navHtml);
        i++;
    }

    [].slice.call( document.querySelectorAll( '.dotstyle > ul' ) ).forEach( function( nav ) {
        new DotNav( nav, {
            callback : function( idx ) {
                //console.log( idx )
            }
        } );
    } );
}

function initNextQViaRadioBtn(){
    $("input[type=radio]").change(function(){
        var isChildAvailable = Number($(this).attr('data-next-q-size')) > 0;
        if(isChildAvailable){
            if($(this).attr("value") == getCommonStrings()["qList"]["valueToBeMatched"]) {
                var childQuestionId = $(this).attr('data-next-q-id');
                $("#" + childQuestionId).removeClass("hide");
                $("#" + childQuestionId).scrollView(70);
            } else {
                var childQuestionId = $(this).attr('data-next-q-id');
                $("#" + childQuestionId).addClass("hide");
            }
        }
    });
}

function initAppContentGroup(){
    addItem();
    removeItem();

    function addItem(){
        $( ".app-content-add-item" ).click(function(e) {
            e.preventDefault();
            var questionId = $(this).attr("data-question-id");
            var contentGroupId = $(this).attr("data-content-grp-id");

            var isNameValid = $("#" + questionId + "-itemName-" + (contentGroupId)).val() != "";
            var isDescValid = $("#" + questionId + "-ItemDescription-" + (contentGroupId)).val() != "";
            var isPriceValid = $("#" + questionId + "-ItemPrice-" + (contentGroupId)).val() != "";
            var isImgValid = $("#" + questionId + "-ItemImage-" + (contentGroupId)).val() != "";

            if(isNameValid && isDescValid && isPriceValid && isImgValid){
                $("#content-text-group-inner-" + (Number(contentGroupId) + 1)).removeClass("hide");
                $("#collapse" + contentGroupId).collapse('hide');
                $("#collapse" + (Number(contentGroupId) + 1)).collapse('show');
                $("#app-content-add-" + contentGroupId).addClass("hide");
                $("#app-content-remove-" + contentGroupId).addClass("hide");

                if((Number(contentGroupId)+1) == (config.values.maxAppContentItems-1)) {
                    showNotification(getCommonStrings()["qList"]["maximumItemsMessage"], "notice");
                    $("#app-content-add-" + (Number(contentGroupId) + 1)).addClass("hide")
                }
            } else {
                showNotification(getCommonStrings()["qList"]["incompleteDetailsMessage"], "error");
            }
        });
    }

    function removeItem(){
        $( ".app-content-remove-item" ).click(function(e) {
            e.preventDefault();
            var questionId = $(this).attr("data-question-id");
            var contentGroupId = $(this).attr("data-content-grp-id");

            $("#content-text-group-inner-" + contentGroupId).addClass("hide");
            $("#collapse" + contentGroupId).collapse('hide');
            $("#collapse" + (Number(contentGroupId)-1)).collapse('show');
            $("#app-content-add-" + (Number(contentGroupId)-1)).removeClass("hide");
            $("#app-content-remove-" + (Number(contentGroupId)-1)).removeClass("hide");

            $("#" + questionId + "-itemName-" + (contentGroupId)).val("");
            $("#" + questionId + "-ItemDescription-" + (contentGroupId)).val("");
            $("#" + questionId + "-ItemPrice-" + (contentGroupId)).val("");
            $("#" + questionId + "-ItemImage-" + (contentGroupId)).val("");
        });
    }
}

function initThemeColorPicker() {
    var elem = $('input[data-qcase=COLOR_THEME]');
    if(elem.length) {
        var newElem = elem.attr("value", config.values.defaultSmartphoneThemeColor);
        var template = '<div class="input-group theme-color-picker">' + newElem[0].outerHTML + '<span class="input-group-addon"><i></i></span></div>';
        elem.replaceWith(template);
        $('.theme-color-picker').colorpicker();
    }
}

function onAppCreateSubmit(){
    $("#app-create-submit-btn").addClass("hide");
    $("#app-create-loading-spinner").removeClass("hide");
}
