onDocumentReady();
onAddProductNameChange();

function onAddProductNameChange() {
    $('#name').on('input',function(e){
        if($("#name").val().trim() == ""){
            $("#submit").attr("disabled", true);
        } else {
            $("#submit").attr("disabled", false);
        }
    });
}

function onProductImageUpload(){
    var elemId = "#product-image-upload";
    $(document).on("change", "", function (evt) {
        var ValidImageTypes = ["image/jpeg", "image/png"];
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;
        var fileType = files[0]["type"];

        if ($.inArray(fileType, ValidImageTypes) < 0) {
            // Invalid File Type
            $(elemId + "-failure").removeClass("hide");
            $(elemId + "-success").addClass("hide");
        } else {
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    $(elemId + "-success").removeClass("hide");
                    $("#app-brand-logo-input-status .fa").addClass("hide");
                    $(elemId + "-failure").addClass("hide");
                    $(elemId + "-success .file-input-success-img").attr("src", fr.result);
                };
                fr.readAsDataURL(files[0]);
            }
        }
    });
}

function initEditProductModal(appId, itemId) {
    var modalId = "edit-product-modal";
    //$("#editItemImageFile").val("");
    $("#edit-product-content-loader-message").removeClass("hide");
    $("#edit-product-content").addClass("hide");
    
    //Setting Basic Tab as the Active Tab
    $("#edit-product-basic-info-tab-link").addClass("active");
    $("#edit-product-images-tab-link").removeClass("active");
    $("#edit-product-advanced-settings-tab-link").removeClass("active");
    $("#edit-product-basic-info").addClass("active in");
    $("#edit-product-advanced-settings").removeClass("active in");
    $("#edit-product-images").removeClass("active in");
    
    //Removing Image Src
    var imageIdx;
    for(imageIdx=0; imageIdx < 4; imageIdx++) {
        $("#edit-product-img-" + imageIdx).css({"background-image": "url('none')"});
        $("#edit-product-img-" + imageIdx + " .content").removeClass("hide");
    }
    
    //Removing Variant Type Rows
    $("#edit-product-variant-rows").remove();
    
    //Brings Up the Modal
    $("#" + modalId).modal("show");

    function onProductLoadSuccess(data){
        if(data["productId"] != null) {
            $("#edit-product-id").val(data["productId"]);
            $("#edit-product-name").val(data["name"]);
            
            $('#edit-product-description').summernote('reset');
            $('#edit-product-description').summernote('code', data["description"]);
            
            var availableImgIdx;
            for(availableImgIdx=0; availableImgIdx < data["images"].length; availableImgIdx++) {
                $("#edit-product-img-" + availableImgIdx).css({"background-image": "url(" + data["images"][availableImgIdx] + ")"});
                $("#edit-product-img-" + availableImgIdx + " .content").addClass("hide");
            }

            if(data["variants"]["name"] == config.values.productVariantBaseName){
                $("#edit-product-basic-price").val(Number(data["variants"]["types"][0]["price"]["amount"]).toFixed(2));
                $("#edit-product-variant-info-intro-screen").addClass("collapse in");
                $("#edit-product-variant-info-content-screen").addClass("collapse");
                $("#edit-product-variant-info-content-screen").removeClass("in");
            } else {
                $("#edit-product-basic-price").val("");
                $("#edit-product-variant-info-content-screen").addClass("collapse in");
                $("#edit-product-variant-info-intro-screen").removeClass("in");
                $("#edit-product-variant-name").val(data["variants"]["name"]);
            }
            getEditVariantTypeRows(data["variants"]["types"].length - 1, data["variants"]["types"]);

            $("#edit-product-current-categories").val(data["categories"]);
            $("#edit-product-current-categories").trigger("chosen:updated");
            
            /*$("#editItemDescription").val(data["description"]);
            $("#editItemPrice").val(Number(data["variants"]["types"][0]["price"]["amount"]).toFixed(2));
            $("#editItemCategory").val(data["categories"]);
            $("#editItemCategory").trigger("chosen:updated");
            $("#editItemImage").attr("src", data["images"][0]);*/
            
            $("#edit-product-content-loader-message").addClass("hide");
            $("#edit-product-content").removeClass("hide");
        } else {
            showNotification(getCommonStrings()["productManagementView"]["productNotExist"], "error");
            $("#" + modalId).modal("hide");
        }
    }

    function onProductLoadError(){
        showNotification(getCommonStrings()["productManagementView"]["requestProcessingError"], "error");
        $("#" + modalId).modal("hide");
    }

    loadProductDetails(appId, itemId, onProductLoadSuccess, onProductLoadError);

    /*$(document).on("change", "#editItemImageFile", function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById("editItemImage").src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }
    });*/
}

function initRemoveProductModal(appId, itemId) {
    sessionStorage.setItem(config.storageKeys.appIdKey, appId);
    sessionStorage.setItem(config.storageKeys.itemIdKey, itemId);

    var modalId = "removeProductModal";
    $("#remove-product-content-loader-message").removeClass("hide");
    $("#remove-product-content").addClass("hide");
    $("#" + modalId).modal("show");

    loadProductDetails(appId, itemId, onProductLoadSuccess, onProductLoadError);

    function onProductLoadSuccess(data){
        if(data["productId"] != null) {
            $("#remove-product-name-label").text("'" + data["name"] + "'");
            $("#remove-product-content-loader-message").addClass("hide");
            $("#remove-product-content").removeClass("hide");
        } else {
            showNotification(getCommonStrings()["productManagementView"]["productNotExist"], "error");
            $("#" + modalId).modal("hide");
        }
    }

    function onProductLoadError(){
        showNotification(getCommonStrings()["productManagementView"]["requestProcessingError"], "error");
        $("#" + modalId).modal("hide");
    }
}

function removeProduct(){
    var modalId = "removeProductModal";
    var appId = sessionStorage.getItem(config.storageKeys.appIdKey);
    var itemId = sessionStorage.getItem(config.storageKeys.itemIdKey);
    var noOfProduct = Number($("#productCount").text());

    $("#remove-product-loader-message").removeClass("hide");
    $("#remove-product-footer-buttons").addClass("hide");

    $.ajax({
        url: 'remove-product.json?bizId=' + appId + "&itemId=" + itemId,
        success: function (data) {
            if(data["messageType"] == "SUCCESS") {
                $("#productCount").text(noOfProduct - 1);
                if(noOfProduct > 1) {
                    $("#prd-item-" + itemId).addClass("hide");
                } else {
                    $("#prdTable").addClass("hide");
                    $("#contentEmptyMsg").removeClass("hide");
                }
                showNotification(data["message"], "notice");
            } else {
                showNotification(data["message"], "error");
            }

            $("#remove-product-footer-buttons").removeClass("hide");
            $("#remove-product-loader-message").addClass("hide");
            $("#" + modalId).modal("hide");
        }
    });
}

function loadProductDetails(appId, itemId, successFunc, errorFunc){
    $.ajax({
        url: 'view-product.json?bizId=' + appId + "&itemId=" + itemId,
        success: function (data) {
            successFunc(data);
        },
        error: function (result) {
            errorFunc();
        }
    });

}

function addNewCategoryForProduct() {
    var selectedValues = [];//selectedValuesBeforeAppend=[];
    var categoryName = ($('#add-new-category-input-text').val());
    var categoryNameWithNewPrefix = "new-" + categoryName;

    $(".product-category-chosen").append("<option value='" + categoryNameWithNewPrefix + "' >" + categoryName + "</option>");
    selectedValues = $('.product-category-chosen').val();

    if(selectedValues != null) {
        selectedValues.push(categoryNameWithNewPrefix);
        $('.product-category-chosen').val(selectedValues);
        $('.product-category-chosen').trigger("chosen:updated")
        $('#add-new-category-input-text').val("");
    }
    else {
        selectedValues = [categoryNameWithNewPrefix];
        $('.product-category-chosen').val(selectedValues);
        $('.product-category-chosen').trigger("chosen:updated")
        $('#add-new-category-input-text').val("");
    }
}
function toggleVariantInfoScreen(mgmtMode){
    $("#" + mgmtMode + "product-variant-name").val("");
    $("#" + mgmtMode + "product-variant-type-name-0").val("");
    $("#" + mgmtMode + "product-variant-type-price-0").val("");
    $(".product-variant-type-row").remove();
    $("#" + mgmtMode + "product-variant-info-intro-screen").collapse('toggle');
    $("#" + mgmtMode + "product-variant-info-content-screen").collapse('toggle');
}

function toggleAddOnInfoScreen(){
    $("#product-addon-intro-screen").collapse('toggle');
    $("#product-addon-content-screen").collapse('toggle');
    onAddNewAddOnClick();
}

function removeVariantType(elemId) {
    $(elemId).remove();
}

function removeAddOn(elemId) {
    $("#product-addon-" + elemId).remove();
    if($("#product-addon-content-screen").has(".new-product-addon-area").length == 0) {
        $("#product-addon-content-screen").collapse('toggle');
        $("#product-addon-intro-screen").collapse('toggle');
    }
}

function removeAddOnType(elemId){
    $(elemId).remove();
}

function setProductDescriptionWyswig(){
    var boldButton = function (context) {
        var ui = $.summernote.ui;
        var button = ui.button({
            contents: '<i class="fa fa-bold"/>',
            tooltip: 'Bold',
            click: function () { context.invoke('editor.bold') }
        });

        return button.render();
    };

    var italicButton = function (context) {
        var ui = $.summernote.ui;
        var button = ui.button({
            contents: '<i class="fa fa-italic"/>',
            tooltip: 'Italic',
            click: function () { context.invoke('editor.italic') }
        });

        return button.render();
    };

    var underlineButton = function (context) {
        var ui = $.summernote.ui;
        var button = ui.button({
            contents: '<i class="fa fa-underline"/>',
            tooltip: 'Underline',
            click: function () { context.invoke('editor.underline') }
        });

        return button.render();
    };

    var bulletListButton = function (context) {
        var ui = $.summernote.ui;
        var button = ui.button({
            contents: '<i class="fa fa-list-ul"/>',
            tooltip: 'Unordered List',
            click: function () { context.invoke('editor.insertUnorderedList') }
        });

        return button.render();
    };

    var numberListButton = function (context) {
        var ui = $.summernote.ui;
        var button = ui.button({
            contents: '<i class="fa fa-list-ol"/>',
            tooltip: 'Ordered List',
            click: function () { context.invoke('editor.insertOrderedList') }
        });

        return button.render();
    };

    $('.summernote-wyswig-textarea').summernote({
        toolbar: [
            ['styleButtons', ['customBold', 'customItalic', 'customUnderline']],
            ['listButtons', ['bulletList', 'numberList']]
        ],

        buttons: {
            customBold: boldButton,
            customItalic: italicButton,
            customUnderline: underlineButton,
            bulletList: bulletListButton,
            numberList: numberListButton
        }
    });

}

function onDocumentReady() {
    $(document).ready(function() {
        setProductDescriptionWyswig();
        onCsvFileSelection();
    });
}

function onCsvFileSelection() {
    $("#csv-file-input-button").change(function () {
        var selectedFile = $(this).val();
        var fileExtension = selectedFile.substring(selectedFile.lastIndexOf(".") + 1);
        
        if (fileExtension == "csv") {
            $("#csv-file-upload-failure").addClass("hide");
            $("#csv-file-upload-success").removeClass("hide");
            $("#csv-preview-button").attr("disabled", false);
        } else {
            $("#csv-file-upload-success").addClass("hide");
            $("#csv-file-upload-failure").removeClass("hide");
            $("#csv-preview-button").attr("disabled", true);
        }
    });
}

$("#csv-preview-button").click(function(){
    $("#upload-csv-div, #csv-file-upload-success, #upload-csv-footer-buttons").addClass("hide");

    $("#upload-csv-spinner").removeClass("hide");

    var data;
    data = new FormData();
    data.append('file', $('#csv-file-input-button')[0].files[0]);
    $.ajax({
        url: 'generate-result-csv-div-content.json',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (data) {
            csvPreviewSuccessFunction(data)
        }
    });
    event.preventDefault();
});

function csvPreviewSuccessFunction(csvReaderResult) {
    $("#result-csv-div").empty();
    $("#result-csv-div").html(csvReaderResult);
    $("#upload-csv-spinner").addClass("hide");
    $("#result-csv-div, #submit-csv-footer-buttons").removeClass("hide");
}

$("#upload-csv-cancel-button").click(function(){
    $("#csv-file-input-button").val("");
    $("#csv-file-upload-success, #csv-file-upload-failure").addClass("hide");
});

$("#submit-csv-cancel-button").click(function(){
    $("#result-csv-div, #submit-csv-footer-buttons").addClass("hide");
    $("#csv-file-upload-success, #csv-file-upload-failure").addClass("hide");
    $("#csv-preview-button").attr("disabled", true); $("#csv-file-input-button").val("");
    $("#upload-csv-div, #upload-csv-footer-buttons").removeClass("hide");
});

$('#image-add-notifier').click(function (e) {
    e.preventDefault();
    $('#add-product-tab-view a[href="#product-images"]').tab('show')
});

$("#csv-submit-button").click(function(){
    $("#submit-csv-footer-buttons").addClass("hide");
    $("#submit-csv-spinner").removeClass("hide");
});

Dropzone.autoDiscover = false;
$(function () {
    var dropzoneList = $(".dropzone");
    Dropzone.prototype.defaultOptions.thumbnailHeight = 640;
    Dropzone.prototype.defaultOptions.thumbnailWidth = 425;

    for (i = 0; i < dropzoneList.length; i++) {

        var myDropzone = new Dropzone(dropzoneList[i]);

        myDropzone.on("thumbnail", function (file, dataUrl) {
            $(".dz-started").parent().css('background-image', 'url(' + dataUrl + ')')
            $('.dz-image').css('visibility', 'hidden')
            $(".dz-started").removeClass("dz-started")
        });

        myDropzone.on("success", function (file) {
            $(".dz-success").remove()
        })
    }
})