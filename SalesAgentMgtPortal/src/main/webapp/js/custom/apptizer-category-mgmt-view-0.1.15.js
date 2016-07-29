/**
 * Created by ismail on 1/21/16.
 */

onAddCategoryNameChange();

function onAddCategoryNameChange() {
    $('#categoryName').on('input',function(e){
        if($("#categoryName").val().trim() == ""){
            $("#submit").attr("disabled", true);
        } else {
            $("#submit").attr("disabled", false);
        }
    });
}

function initEditCategoryModal(bizId, categoryId) {
    var modalId = "editCategoryModal"
    $("#edit-category-content-loader-message").removeClass("hide");
    $("#edit-category-content").addClass("hide");
    $("#" + modalId).modal("show");

    function onCategoryLoadSuccess(data) {
        if (data["categoryId"] != null) {
            $("#editCategoryId").val(data["categoryId"]);
            $("#editCategoryName").val(data["categoryName"]);
            $("#edit-category-content-loader-message").addClass("hide");
            $("#edit-category-content").removeClass("hide");
        } else {
            showNotification(getCommonStrings()["categoryManagementView"]["categoryNotExist"], "error");
            $("#" + modalId).modal("hide");
        }
    }

    function onCategoryLoadError() {
        showNotification(getCommonStrings()["categoryManagementView"]["requestProcessingError"], "error");
        $("#" + modalId).modal("hide");
    }

    loadCategoryDetails(bizId, categoryId, onCategoryLoadSuccess, onCategoryLoadError);

}
function initRemoveCategoryModal(appId, categoryId) {
    sessionStorage.setItem(config.storageKeys.appIdKey, appId);
    sessionStorage.setItem(config.storageKeys.categoryIdKey, categoryId);

    var modalId = "removeCategoryModal";
    $("#remove-category-content-loader-message").removeClass("hide");
    $("#remove-category-content").addClass("hide");
    $("#" + modalId).modal("show");

    loadCategoryDetails(appId, categoryId, onCategoryLoadSuccess, onCategoryLoadError);

    function onCategoryLoadSuccess(data){
        if(data["categoryId"] != null) {
            $("#remove-category-name-label").text("'" + data["categoryName"] + "'");
            $("#remove-category-content-loader-message").addClass("hide");
            $("#remove-category-content").removeClass("hide");
        } else {
            showNotification(getCommonStrings()["categoryManagementView"]["categoryNotExist"], "error");
            $("#" + modalId).modal("hide");
        }
    }

    function onCategoryLoadError(){
        showNotification(getCommonStrings()["categoryManagementView"]["requestProcessingError"], "error");
        $("#" + modalId).modal("hide");
    }
}

function removeCategory(){
    var modalId = "removeCategoryModal";
    var bizId = sessionStorage.getItem(config.storageKeys.appIdKey);
    var categoryId = sessionStorage.getItem(config.storageKeys.categoryIdKey);
    var noOfCategory = Number($("#categoryCount").text());

    $("#remove-category-loader-message").removeClass("hide");
    $("#remove-category-footer-buttons").addClass("hide");

    $.ajax({
        url: 'remove-category.json?bizId=' + bizId + "&categoryId=" + categoryId,
        success: function (data) {
            if(data["messageType"] == "SUCCESS") {
                $("#categoryCount").text(noOfCategory - 1);
                if(noOfCategory > 1) {
                    $("#category-" + categoryId).addClass("hide");
                } else {
                    $("#categoryTable").addClass("hide");
                    $("#contentEmptyMsg").removeClass("hide");
                }
                showNotification(data["message"], "notice");
            } else {
                showNotification(data["message"], "error");
            }

            $("#remove-category-footer-buttons").removeClass("hide");
            $("#remove-category-loader-message").addClass("hide");
            $("#" + modalId).modal("hide");
        }
    });
}
function loadCategoryDetails(bizId, categoryId, successFunc, errorFunc) {
    $.ajax({
        url: 'view-category.json?bizId=' + bizId + "&categoryId=" + categoryId,
        success: function (data) {
            console.log(JSON.stringify(data));
            successFunc(data);
        },
        error: function (result) {
            errorFunc();
        }
    });

}

