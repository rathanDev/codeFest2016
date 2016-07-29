$(document).ready(function(){
    sendUserNotifications();
});

function sendUserNotifications(){
    $('#pushNotificationForm').submit(function(event) {
        $("#notification-footer-buttons").addClass("hide");
        $("#notification-loader-message").removeClass("hide");
        var appId = $("#notification-app-id").val();
        var message = $("#notification-message").val();
        var json = { "appId":appId, "message" : message, "collapseKey": ""};

        $.ajax({
            url: $("#pushNotificationForm").attr( "action"),
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json',
            contentType: "application/json",
            mimeType: "application/json",

            success: function (result) {
                var response = JSON.parse(JSON.stringify(result));
                if(response["messageType"] == "SUCCESS"){
                    revertElements();
                    $("#notification-message").val("");
                    showNotification("Your message was successfully sent.", "notice");
                } else {
                    revertElements();
                    showNotification(getCommonStrings()["appView"]["messageSent"], "error");
                }
            },
            error: function (result) {
                revertElements();
                showNotification(getCommonStrings()["appView"]["requestProcessingError"], "error");
            }
        });

        event.preventDefault();
    });

    function revertElements(){
        $('#notification-modal').modal('hide');
        $("#notification-footer-buttons").removeClass("hide");
        $("#notification-loader-message").addClass("hide");
    }
}

function removeDeliveryArea(elemId) {
    $("#delivery-area-row-" + elemId).remove();
}