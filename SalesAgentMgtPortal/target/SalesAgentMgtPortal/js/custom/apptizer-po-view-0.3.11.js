$(document).ready(function() {
    markAsRejectedModalNotifyCustomerCheckboxChanged();
});

function initModal(modalType, appId, txId) {
    $('#' + modalType + '-tx-id-label').text(txId)
    $('#' + modalType).modal("show")

    sessionStorage.setItem(config.storageKeys.appIdKey, appId)
    sessionStorage.setItem(config.storageKeys.poTxId, txId)
}

function markAsRejectedModalNotifyCustomerCheckboxChanged() {
    $('#mark-as-rejected-modal-notify-customer-checkbox').change(function(){
        if($("#mark-as-rejected-modal-notify-customer-checkbox").is(':checked')) {
            $('#reason-for-rejection-textarea').removeClass('hide')
        } else {
            $('#reason-for-rejection-textarea').addClass('hide')
        }
    });
}

function updateOrderStatus (newStatus) {

    var modalType = "mark-as-" + newStatus + "-modal";

    var reason;
    if( newStatus == "rejected") {
        reason = $('#reason-for-rejection-textarea').val().trim()
    }

    sendUpdateRequest(modalType, newStatus, reason)

    function sendUpdateRequest(modalType, newStatus, reason) {

        var notifyCustomer = false
        if($("#" + modalType + "-notify-customer-checkbox").is(':checked')) {
            notifyCustomer = true
        }

        $("#" + modalType + "-footer-buttons").addClass("hide");
        $("#" + modalType + "-spinner-message").removeClass("hide");

        var appId = sessionStorage.getItem(config.storageKeys.appIdKey);
        var txId = sessionStorage.getItem(config.storageKeys.poTxId);

        var orderUpdate = {
            appId : appId,
            txId : txId,
            newStatus : newStatus,
            notifyCustomer : notifyCustomer,
            reason : reason
        };

        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: 'purchase-orders/update-order-status.json',
            data: JSON.stringify(orderUpdate),
            dataType: 'json',
            success: function(response) {
                console.log("This: " + JSON.stringify(response));
                console.log("This Type: " + response["messageType"]);
                if(response["messageType"] == "SUCCESS") {
                    updateOrderStatusSuccessFunction(modalType, txId, response);
                } else {
                    showNotification(getCommonStrings()["salesOrderManagementView"]["requestProcessingError"], "error");
                    $("#" + modalType).modal("hide");
                }
            },
            error: function(e) {
                showNotification(getCommonStrings()["salesOrderManagementView"]["requestProcessingError"], "error");
                $("#" + modalType).modal("hide");
            }
        });
    }

    var updateOrderStatusSuccessFunction = function(modalType, txId, response) {
        $("#" + modalType + "-footer-buttons").removeClass("hide");
        $("#" + modalType + "-spinner-message").addClass("hide");
        $("#" + modalType).modal("hide");

        var rowId = "row-"+txId;
        fadeOutTheRow(rowId);
        showNotification(getCommonStrings()["salesOrderManagementView"]["orderUpdateSuccessMessage"], "notice");
    };

    function fadeOutTheRow(rowId) {
        $('tr#'+rowId).fadeOut(1000,
            function(){
                $(this).parents('tr:first').remove();
            });

        setTimeout(function() {
            $('#'+rowId).remove()
        }, 1000);

        return false;
    }
}

function initViewPoModal(appId, txId) {
    initView();

    $.ajax({
        url: 'purchase-orders/view.json?bizId=' + appId + "&txId=" + txId + '&tz=' + new Date().getTimezoneOffset(),
        success: function (data) {
            $("#view-po-content").removeClass("hide");
            $("#view-po-loader-message").addClass("hide");
            setData(data);
        }
    });
    //data = purchaseOrderBean
    function setData(data){
        $("#po-modal-receipt-id").text(data["transactionId"]);

        $("#po-collector-name-span").text(data["collectorName"]);

        if(data["collectionMethod"] == "PICK_UP") {
            $('#pickup-time-label').removeClass("hide")
            $('#delivery-time-label').addClass("hide")
        } else {
            $('#delivery-time-label').removeClass("hide")
            $('#pickup-time-label').addClass("hide")
        }
        $('#po-ready-time-span').text(data["orderReadyTime"])

        if(data["collectionMethod"] == "DELIVER") {
            $("#po-delivery-details").removeClass("hide");
            $("#po-delivery-area").text(data["deliveryArea"]);
            $("#po-delivery-address").html(data["deliveryAddress"].replace(/\n/g, "<br/>"));
        }

        if( (data["additionalComments"] != null) && (data["additionalComments"] != "") ) {
            $('#po-additional-comments').removeClass("hide");
            $('#po-additional-comments-span').text(data["additionalComments"]);
        } else {
            $('#po-additional-comments').addClass("hide");
        }

        var htmlTemplate =
            '<div>' +
                '<div class="col-md-5 paddingless-col">' +
                    '{ITEM_NAME} {VARIANT_NAME} <br/>' +
                        '{ADD_ONS}' +
                '</div>' +
                '<div class="col-md-4 text-right paddingless-col">{ITEM_QTY} x {UNIT_PRICE}</div>' +
                '<div class="col-md-3 text-right paddingless-col">{TOTAL_PRICE}</div>' +
            '</div>';

        var newHtmlTemplate = '';

        //List<OrderItemBean> -> data["items"]
        for(var itemIndex in data["items"]){
            var item = data["items"][itemIndex];

            var variantName = item["variantName"]

            var addOnTemplatesCombined = "";
            var addOnList = item["addOnList"]

            if(addOnList != null) {
                addOnList.forEach(function(addOn){
                    var addOnTemplate = '<span> &nbsp;&nbsp;&nbsp;' + addOn + '</span> <br/>'
                    addOnTemplatesCombined = addOnTemplatesCombined + addOnTemplate
                });
            }

            newHtmlTemplate += '<div class="row item-row">' +
                htmlTemplate.replace("{ITEM_NAME}", item["itemName"]).
                    replace("{VARIANT_NAME}", variantName).
                    replace("{ADD_ONS}", addOnTemplatesCombined).
                    replace("{ITEM_QTY}", item["itemQuantity"]).
                    replace("{UNIT_PRICE}", item["unitPrice"]).
                    replace("{TOTAL_PRICE}", item["totalPrice"])
                + '</div>'
        }

        $("#po-items-list").html(newHtmlTemplate);

        $("#po-sub-total-amount").text(data["subTotalPrice"]);

        $("#po-tax-percentage-span").text(data["taxPercentage"]);
        $("#po-tax-amount").text(data["taxAmount"]);

        $('#po-service-charge-percentage-span').text(data["serviceChargePercentage"])
        $("#po-service-charge").text(data["serviceCharge"]);

        if( data["collectionMethod"] == "DELIVER" ) {
            $('#po-delivery-charge-div').removeClass("hide");
            $("#po-delivery-charge-span").text(data["deliveryCharge"]);
        }

        if(Number(data["totalProductDiscountAmount"]) > 0) {
            $("#po-discount-amount-span").text(data["discountAmount"]);
        } else {
            $('#po-discount-percentage-span').text("(" + data["discountPercentage"] + "%)");
            $("#po-discount-amount-span").text(data["discountAmount"]);
        }

        $("#po-grand-total-amount").text(data["grandTotalPrice"]);
    }

    function initView(){
        $("#view-po-content").addClass("hide");
        $("#po-delivery-details").addClass("hide");
        $("#view-po-loader-message").removeClass("hide");
        $("#view-po-modal").modal("show");
    }
}