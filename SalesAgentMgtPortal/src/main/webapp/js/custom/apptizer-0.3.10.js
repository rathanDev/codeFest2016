$(document).ready(function(){
    initNavBar();
    //initWow();
    industryOnClick();
    showIndustryText();
    initToolTips();
    getSpNotifications();
    onToggleSwitchClick();
   // initShareOpts(); //my-apps
   // hideShareOpts(); //my-apps
    changePurchaseOrderHref();
});

var currentQuestionId = 0;
var totalQuestions = 0;
var industry = "";
/*var elemIds = {
    "totalQuestionValGetter" : "#totalQRetriever",
    "totalQuestionCounter" : "#totalQuestions",
    "questionCounterArea": "#qNumberTracker",
    "currentQuestionCounter": "#currentQuestionNumber",
    "questionNavDots": "#qNavDots"
};*/

var config = {
    "urls": {
        "appView": "view-app.htm?bizId=",
        "salesView": "purchase-orders.htm?bizId="

    },
    "storageKeys": {
        "notificationIdsKey": "APT_NTF_IDS",
        "appIdKey": "APT_APP",
        "poTxId": "APT_TX",
        "categoryIdKey":"APT_CTGR",
        "itemIdKey": "APT_PRD",
        "mockItems": "APT_MOCK"
    },
    "values": {
        "productVariantBaseName": "[base]",
        "defaultSmartphoneThemeColor": "#2980b9", /*deprecated*/
        "maxNestedQuestions": 4, /*deprecated*/
        "maxAppContentItems": 6 /*deprecated*/
    }
};

function initNavBar(){
    if(document.getElementById( 'gmenu-trigger' ) != undefined) {
        new gnMenu( document.getElementById( 'gn-menu' ) );
    }
}

function initWow(){
    new WOW().init();
}

function industryOnClick(){
    $( ".industry-link" ).click(function() {
        var industry = $(this).attr('data-industry');
        $('.industry-features').addClass('hide');
        $("#" + industry + "-intro-area").removeClass("hide");
        $("#" + industry + "-intro-area").scrollView(30);
    });
}

function showIndustryText() {
    $( ".industry-link" ).hover(
        function() {
            var bgColor = $(this).attr("data-color");
            var rowNum = $(this).attr("data-industry-row");
            var industryText = $(this).attr("data-text");
            var areaId = "#" + "industryTextArea" + rowNum;
            var paraTemplate = '<p class="industry-desc-text">' + industryText + "</p>";
            var newTemplate = $(paraTemplate).addClass("industry-text-" + bgColor + " flipInX animated");

            if ( $(areaId).is( ":hidden" ) ) {
                $(areaId).slideDown( "fast" );
                $(areaId).removeClass( "flipOutX" );
                $(areaId).html(newTemplate[0].outerHTML);
            }
        }, function() {
            var rowNum = $(this).attr("data-industry-row");
            var areaId = "#" + "industryTextArea" + rowNum;
            if ( $(areaId).is( ":hidden" ) ) {
            } else {
                $(areaId).addClass( "flipOutX animated" );
                $(areaId).slideUp( "slow" );
            }
        }
    );
}

function initToolTips() {
    $('[data-tooltip="tooltip"]').tooltip({
        animation: false,
        trigger: 'hover'
    });
    $('.dropdown-toggle').dropdown();
}

function initShareOpts() {
    $( ".view-share-opts" ).click(function(e) {
        e.preventDefault();
        var appId = $(this).attr('data-appid');
        $('#infographicDetails-'+ appId).addClass('animated flipOutX');
        setTimeout(function () {
                $('#infographicDetails-'+ appId).addClass('hide');
                $('#appShareOptions-'+appId).removeClass('hide flipOutX');
                $('#appShareOptions-'+appId).addClass('animated flipInX');
            }, 450
        );
    });
}

function hideShareOpts() {
    $( ".close-share-opts" ).click(function(e) {
        e.preventDefault();
        var appId = $(this).attr('data-appid');
        $('#appShareOptions-'+ appId).addClass('animated flipOutX');
        setTimeout(function () {
                $('#appShareOptions-'+ appId).addClass('hide');
                $('#infographicDetails-'+appId).removeClass('hide flipOutX');
                $('#infographicDetails-'+appId).addClass('animated flipInX');
            }, 450
        );
    });
}

function onToggleSwitchClick(){
    $('div [data-toggle=toggle]').click(function(){
        var checkboxId = $(this).attr("data-target");
        if($(this).hasClass("on")) {
            $(checkboxId).prop( "checked", false );
            $(this).removeClass("on");
            $(this).addClass("off");
        } else {
            $(checkboxId).prop( "checked", true );
            $(this).removeClass("off");
            $(this).addClass("on");
        }
    });
}

function getSpNotifications(){
    doAjax();

    setInterval(doAjax, 60000)

    function doAjax(){
        if(!$("#nav-notification-dropdown").hasClass("open")){
            $.ajax({
                url : 'notifications-list.htm',
                type: 'GET',
                dataType: 'json',
                success : function(data) {
                    var notifications = JSON.parse(JSON.stringify(data));
                    onSuccess(notifications);
                }
            });
        }
    }

    function onSuccess(merchantNotifications) {
        updateNotificationsSections(merchantNotifications)
        updatePurchaseOrderTable(merchantNotifications);
    }
}

var updateNotificationsSections = function(merchantNotifications) {
    var unseenNotificationCount = merchantNotifications.unseenNotificationCount;
    var notifications = merchantNotifications.notifications;

    if(notifications.length == 0) {
        $("#nav-notifications-empty").removeClass("hidden");
        $("#nav-notifications-list-empty").removeClass("hidden");
        $("#nav-notifications-full").addClass("hidden");
        $('#nav-notifications').addClass("hidden");
        return;
    }

    var htmlList = "";
    var notificationIds = [];
    for(var index in notifications) {
        var html = '<li class="notify-msg"><a href="{APP_LINK}"><b>{APP_NAME}</b><br/>{NOTIFICATION}<br/><span class="notify-timestamp">{TIME}</span></a></li>'
        var appLink = "";
        if(notifications[index]["type"] == 'APP_BUILD_SUCCESS'){
            appLink = (config.urls.appView + notifications[index]["businessId"]);
        } else {
            appLink = (config.urls.salesView + notifications[index]["businessId"]+'&purchaseStatus=pending' + '&tz=' + new Date().getTimezoneOffset() );
            //appLink = (config.urls.salesView + notifications[index]["businessId"]+'&purchaseStatus=new');
        }
        html = html.
        replace("{APP_NAME}", notifications[index]["businessName"]).
        replace("{APP_LINK}", appLink).
        replace("{NOTIFICATION}", notifications[index]["message"]).
        replace("{TIME}", notifications[index]["receivedDate"]);
        htmlList = htmlList + html;
        notificationIds = notificationIds.concat(notifications[index]["notificationId"]);
    }
    $('#nav-notifications').html(htmlList);

    if(unseenNotificationCount == 0) {
        $("#nav-notifications-full").addClass("hidden");
        $('#nav-notifications').removeClass("hidden");
        $("#nav-notifications-empty").removeClass("hidden");
        $("#nav-notifications-list-empty").addClass("hidden");
    } else {
        $("#nav-notifications-full").removeClass("hidden");
        $('#nav-notifications').removeClass("hidden");
        $("#nav-notifications-empty").addClass("hidden");
        $("#nav-notifications-list-empty").addClass("hidden");
        $("#nav-notifications-value").text(unseenNotificationCount);
        sessionStorage.setItem(config.storageKeys.notificationIdsKey, JSON.stringify(notificationIds));
    }
}

function markNotificationsAsSeen(){

    $('#nav-notifications-full').addClass('hidden')
    $('#nav-notifications-empty').removeClass('hidden')

    var notificationIds = JSON.parse(sessionStorage.getItem(config.storageKeys.notificationIdsKey));
    if(notificationIds != null && notificationIds.length != 0){
        $.ajax({
            url: 'notifications-mark-as-seen.htm',
            data: JSON.stringify(notificationIds),
            type: "POST",
            dataType: 'json',
            contentType: "application/json",
            success: function(response) {
            }
        });
    }
}

function showNotification(msg, notifyType){
    var iconHtml = '';
    switch(notifyType) {
        case 'notice': {
            iconHtml = '<span class="fa fa-check-circle-o fa-2x"></span>&nbsp;&nbsp;';
            break;
        }
        case 'error': {
            iconHtml = '<span class="fa fa-times-circle-o fa-2x"></span>&nbsp;&nbsp;';
            break;
        }
    }
    var notifyTemplate = '<span>' + iconHtml + msg + '</span>';

    var notification = new NotificationFx({
        message : notifyTemplate,
        layout : 'attached',
        effect : 'bouncyflip',
        type: notifyType
    });
    notification.show();
}

function retrieveUrlParameter(urlParameter) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === urlParameter) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

var correlationIdOfNotificationWhichUpdatedTheTable = "";

var updatePurchaseOrderTable = function (merchantNotifications) {

    updateTotalPurchasesCount();

    var receiptIdOfFirstRowBeforeUpdatingTable;

    var unseenNotificationCount = merchantNotifications.unseenNotificationCount
    //console.log('merchantNotifications.unseenNotificationCount: ' + merchantNotifications.unseenNotificationCount)
    if (merchantNotifications.unseenNotificationCount == 0) {
        console.log('merchantNotifications.unseenNotificationCount==0')
        return;
    }

    var notificationList = merchantNotifications.notifications

    //console.log('retrieveUrlParameter("purchaseStatus"): ' + retrieveUrlParameter('purchaseStatus'))
    if (retrieveUrlParameter('purchaseStatus') != 'pending') {
    //if (retrieveUrlParameter('purchaseStatus') != 'new') {
        console.log(retrieveUrlParameter('purchaseStatus') != 'pending')
        //console.log(retrieveUrlParameter('purchaseStatus') != 'new')
        return;
    }

    var bizIdOfCurrentPage = retrieveUrlParameter("bizId");
    //console.log('bizIdOfCurrentPage: ' + bizIdOfCurrentPage)

    receiptIdOfFirstRowBeforeUpdatingTable = ($('#poTable tr:first-child td:first').text()).trim()

    var currentNotificationIndex;
    for (currentNotificationIndex = 0; currentNotificationIndex < unseenNotificationCount; currentNotificationIndex++) {

        //console.log("bizIdOfCurrentPage: " + bizIdOfCurrentPage)
        //console.log("notificationList[currentNotificationIndex]['businessId'] : " + notificationList[currentNotificationIndex]["businessId"])
        if(bizIdOfCurrentPage != notificationList[currentNotificationIndex]["businessId"]) {
            //console.log(' bizIdOfCurrentPage != notificationList[currentNotificationIndex]["businessId"]')
            if(AreAllUnseenNotificationsChecked())
                return;
            continue
        }

        if(notificationList[currentNotificationIndex]['type'] != 'PURCHASE') {
            //console.log("notificationList[currentNotificationIndex]['type'] != 'PURCHASE'")
            if(AreAllUnseenNotificationsChecked())
                return;
            continue
        }

        if(bizIdOfCurrentPage != notificationList[currentNotificationIndex]["businessId"]) {
            //console.log(' bizIdOfCurrentPage != notificationList[currentNotificationIndex]["businessId"] ')
            if(AreAllUnseenNotificationsChecked())
                return;
            continue
        }

        if(bizIdOfCurrentPage != notificationList[currentNotificationIndex]["businessId"]) {
            //console.log(' bizIdOfCurrentPage != notificationList[currentNotificationIndex]["businessId"] ')
            if(AreAllUnseenNotificationsChecked())
                return;
            continue
        }

        if (notificationList[currentNotificationIndex]["correlationId"] == receiptIdOfFirstRowBeforeUpdatingTable) {
            //console.log('receiptIdOfFirstRowBeforeUpdatingTable: ' + receiptIdOfFirstRowBeforeUpdatingTable)
            //console.log('correlationId equals 1stRowReceiptId - ' + notificationList[currentNotificationIndex]["correlationId"])
            return;
        }

        if(correlationIdOfNotificationWhichUpdatedTheTable == notificationList[currentNotificationIndex]["correlationId"]) {
            //console.log('correlationIdOfNotificationWhichUpdatedTheTable == notificationList[currentNotificationIndex]["correlationId"]')
            return;
        } else {
            correlationIdOfNotificationWhichUpdatedTheTable = notificationList[currentNotificationIndex]["correlationId"];
            break;
        }

        function AreAllUnseenNotificationsChecked() {
            //console.log("currentNotificationIndex: " + currentNotificationIndex)
            //console.log("unseenNotificationCount: "+ unseenNotificationCount)
            if (currentNotificationIndex == unseenNotificationCount - 1) {
                console.log("checked all unseen notifications. no need to update")
                return true;
            }
        }
    }

    //updatePurchaseOrdersTable(notificationList[currentNotificationIndex]["businessId"]);
    reloadPurchaseOrdersTable(notificationList[currentNotificationIndex]["businessId"]);

    //function updatePurchaseOrdersTable(bizId) {
    function reloadPurchaseOrdersTable(bizId) {
        //todo- make it ajax GET
        //console.log("reloadPurchaseOrdersTable")
        var poTable;
        $.ajax({
            url: 'purchase-orders/update-po-table-with-new-purchase-orders.json?bizId=' + bizId +
            '&purchaseStatus=pending' + '&tz=' + new Date().getTimezoneOffset(),
            //url: 'purchase-orders/update-po-table-with-new-purchase-orders.json?bizId=' + bizId + '&purchaseStatus=new' + '&tz=' + new Date().getTimezoneOffset(),
            data: poTable,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (poTable) {
                //updatePurchaseOrdersTableSuccessFunction(poTable);
                reloadPurchaseOrdersTableSuccessFunction(poTable);
            }
        });

        //function updatePurchaseOrdersTableSuccessFunction(poTable) {
        function reloadPurchaseOrdersTableSuccessFunction(poTable) {
            $('#po-table-div').empty();
            $('#po-table-div').html(poTable);

            $('#purchase-order-table-updated-noise')[0].play();

            markRecentlyAddedRows();

            console.log("purchaseOrdersTable reloaded")
        }

        //updateTotalPurchasesCount(); //gives incorrect Result
    }

    function updateTotalPurchasesCount() {
        var totalPurchases = $('#poTable tbody tr').length;
        //console.log("totalPurchases: " + totalPurchases)
        $('#total-purchases-count-span').text(totalPurchases)
    }

    function markRecentlyAddedRows() {
        $('#poTable tbody tr').each( function() {
            var thisRow = $(this)
            var receiptId = thisRow.find('td:first').text().trim()

            if(receiptId==receiptIdOfFirstRowBeforeUpdatingTable)
                return false;

            thisRow.addClass('latest-po-table-row')
        });
    }
}

function saveSpSuggestion(){
    $('#spSuggestionForm').submit(function(event) {
        var business = $("#sp-suggestion-business").val();
        var features = $("#sp-suggestion-features").val();
        
        if(business != "" && features != "") {
            $("#sp-suggestion-submit-btn").addClass("hide");
            $("#sp-suggestion-loader-area").removeClass("hide");
            var json = { "business":business, "featuresRequested" : features, "spUsername": ""};

            $.ajax({
                url: $("#spSuggestionForm").attr( "action"),
                data: JSON.stringify(json),
                type: "POST",
                dataType: 'json',
                contentType: "application/json",
                mimeType: "application/json",

                success: function (result) {
                    var response = JSON.parse(JSON.stringify(result));
                    if(response["messageType"] == "SUCCESS"){
                        $("#sp-suggestion-loader-area").addClass("hide");
                        $("#sp-suggestion-success").removeClass("hide");
                    } else {
                        $("#sp-suggestion-loader-area").addClass("hide");
                        $("#sp-suggestion-submit-btn").removeClass("hide");
                    }
                },
                error: function (result) {
                    $("#sp-suggestion-loader-area").addClass("hide");
                    $("#sp-suggestion-submit-btn").removeClass("hide");
                }
            });
        }

        event.preventDefault();
    });

}

//Function to scroll to specific element
$.fn.scrollView = function (margin) {
    var marginTop = margin || 20;
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top - marginTop
        }, 1000);
    });
};
$(document).on("click", "[data-autoscroll]", function() {
    var scrollId = $(this).attr('data-autoscroll');
    var marginTop = $(this).attr('data-autoscroll-margin');
    if($('#' + scrollId).hasClass("hide")) {
        $('#' + scrollId).removeClass("hide")
    }
    $('#' + scrollId).scrollView(marginTop);
});

$(document).on("click", "[data-toggle-collapse]", function() {
    var isTogglable = $(this).attr('data-toggle');
    if(isTogglable == 'toggle') {
        var collapseElemId = $(this).attr('data-toggle-collapse');
        $(collapseElemId).collapse('toggle');
    }
});

//hide and show elements on click
$(document).on("click", "[data-onclick-show]", function() {
    var showElemId = $(this).attr('data-onclick-show');
    var hideElemId = $(this).attr('data-onclick-hide');

    $("#" + hideElemId).removeClass("phone-on-top");
    $("#" + showElemId).removeClass("phone-on-bottom");
    $("#" + hideElemId).addClass("phone-on-bottom");
    $("#" + showElemId).addClass("phone-on-top");

});

//validates input field for a price
$(document).on("keydown", "[data-currency]", function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensures that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

//validates input field for a number
$(document).on("keydown", "[data-number]", function (e) {
    // Allow: backspace, delete, tab, escape, enter
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensures that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

//sets modal submission loader icon
$(document).on("click", "[modal-submit]", function (e) {
    var modalId = $(this).attr('modal-submit');
    $("#" + modalId + "-loader-message").removeClass("hide");
    $("#" + modalId + "-footer-buttons").addClass("hide");
});

$(document).on("click", "[data-process-msg-target]", function (e) {
    var modalId = $(this).attr('data-process-msg-target');
    $(modalId).removeClass("hide");
    $(this).addClass("hide");
});

function changePurchaseOrderHref() {
    var clientTimezoneOffset = new Date().getTimezoneOffset();
    $('[data-dynamic-url]').attr('href', function() {
        return this.href + '&tz=' + clientTimezoneOffset;
    });
}

$('[data-regex]').on('input',function(e){
    var regex = $(this).attr('data-regex');
    var inputVal = $(this).val();
    if(!new RegExp(regex).test(inputVal)) {
        $(this).val(inputVal.slice(0, inputVal.length - 1));
    }
});

function isDefined(value) {
    if (value != "" && value != null && value != undefined) {
        return true
    } else false;
}
