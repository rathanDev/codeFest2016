var ANDROID_PREVIEW_MODE = "android";
var IOS_PREVIEW_MODE = "ios";
var ANDROID_SCREEN_PREFIX = "#android-screen-";
var IOS_SCREEN_PREFIX = "#ios-screen-";
var currentPreview = ANDROID_PREVIEW_MODE;
var currentScreen = "0";

var CURRENT_APP_CREATION_SCREEN = "business-info";

var appCreationScreens = {
    "nevadaIntegration": "nevada-integration",
    "businessInfo": "business-info",
    "brandingInfo": "branding-info",
    "features": "features"
};

initFields();
onAppCreateSubmit();

//Preview Element Changes
onPreviewToggleClick();
onPreviewSliderClick();

//On Branding Changes
onBusinessNameChange();
onThemeColorChange();
onStarterScreenChange();
onBrandLogoChange();
onAppIconChange();

function onPreviewToggleClick(){
    $("#android-preview-toggler").click(function(){
        currentPreview = ANDROID_PREVIEW_MODE;
        $("#android-preview-toggler").addClass("active");
        $("#ios-preview-toggler").removeClass("active");
        $("#android-preview").removeClass("hide");
        $("#ios-preview").addClass("hide");
    });

    $("#ios-preview-toggler").click(function(){
        currentPreview = IOS_PREVIEW_MODE;
        $("#ios-preview-toggler").addClass("active");
        $("#android-preview-toggler").removeClass("active");
        $("#ios-preview").removeClass("hide");
        $("#android-preview").addClass("hide");
    });
}

function onPreviewSliderClick(){
    $("#screen-left-slider").click(function(){
        var currentScreenNum = Number(currentScreen);
        if(currentScreenNum != 0) {
            var nextScreenNum = (Number(currentScreenNum)-1);
            $("#screen-name-" + currentScreenNum).addClass("hide");
            $("#screen-name-" + nextScreenNum).removeClass("hide");
            $(ANDROID_SCREEN_PREFIX + currentScreenNum).addClass("hide");
            $(ANDROID_SCREEN_PREFIX + nextScreenNum).removeClass("hide");
            $(IOS_SCREEN_PREFIX + currentScreenNum).addClass("hide");
            $(IOS_SCREEN_PREFIX + nextScreenNum).removeClass("hide");
            currentScreen = String(nextScreenNum);
        }

        if(currentScreen == "0") {
            $("#screen-left-slider-icon").addClass("hide");
            $("#screen-right-slider-icon").removeClass("hide");
        } else {
            $("#screen-right-slider-icon").removeClass("hide");
        }
    });

    $("#screen-right-slider").click(function(){
        var currentScreenNum = Number(currentScreen);
        if(currentScreenNum != 2) {
            var nextScreenNum = (Number(currentScreenNum)+1);
            $("#screen-name-" + currentScreenNum).addClass("hide");
            $("#screen-name-" + nextScreenNum).removeClass("hide");
            $(ANDROID_SCREEN_PREFIX + currentScreenNum).addClass("hide");
            $(ANDROID_SCREEN_PREFIX + nextScreenNum).removeClass("hide");
            $(IOS_SCREEN_PREFIX + currentScreenNum).addClass("hide");
            $(IOS_SCREEN_PREFIX + nextScreenNum).removeClass("hide");
            currentScreen = String(nextScreenNum);
        }

        if(currentScreen == "2") {
            $("#screen-right-slider-icon").addClass("hide");
            $("#screen-left-slider-icon").removeClass("hide");
        } else {
            $("#screen-left-slider-icon").removeClass("hide");
        }
    }); 
}


function onBrandingInfoLoad(previousScreen){
    if(isBasicInfoValid()){
        $("#app-create-field-set-business-info").addClass("hide");
        $("#app-create-field-set-features").addClass("hide");
        $("#app-create-field-set-branding").removeClass("hide");
        $("#app-create-form-group-header-business").addClass("hide");
        $("#app-create-form-group-header-features").addClass("hide");
        $("#app-create-form-group-header-branding").removeClass("hide");
        $("#app-create-page-number-business-info").removeClass("active");
        $("#app-create-page-number-features").removeClass("active");
        $("#app-create-page-number-branding").addClass("active");
    }
}

function onBusinessInfoLoad(currentScreen){
    if(currentScreen == appCreationScreens.nevadaIntegration) {
        if(isNevadaIntegrationValid()) {
            $("#app-create-fields-nevada-integration").addClass("hide");
            $("#app-create-form-group-header-nevada").addClass("hide");
            $("#app-create-page-number-nevada").removeClass("active");
            loadView();
        }
    } else {
        loadView();
    }
    
    function loadView(){
        $("#app-create-field-set-branding").addClass("hide");
        $("#app-create-field-set-features").addClass("hide");
        $("#app-create-field-set-business-info").removeClass("hide");
        $("#app-create-form-group-header-branding").addClass("hide");
        $("#app-create-form-group-header-features").addClass("hide");
        $("#app-create-form-group-header-business").removeClass("hide");
        $("#app-create-page-number-branding").removeClass("active");
        $("#app-create-page-number-features").removeClass("active");
        $("#app-create-page-number-business-info").addClass("active");
    }
}

function onFeatureInfoLoad(){
    if(isBasicInfoValid() && isBrandingInfoValid()){
        $("#app-create-field-set-business-info").addClass("hide");
        $("#app-create-field-set-branding").addClass("hide");
        $("#app-create-field-set-features").removeClass("hide");
        $("#app-create-form-group-header-business").addClass("hide");
        $("#app-create-form-group-header-branding").addClass("hide");
        $("#app-create-form-group-header-features").removeClass("hide");
        $("#app-create-page-number-business-info").removeClass("active");
        $("#app-create-page-number-branding").removeClass("active");
        $("#app-create-page-number-features").addClass("active");
    }
}

function isBasicInfoValid(){
    var fields = ["#business-name", "#business-address", "#business-msisdn"];
    var invalidFields = [];
    for (i = 0; i < fields.length; i++) {

        if($(fields[i]).val().trim() == ""){
            invalidFields.push(fields[i]);
            $(fields[i] + "-input-status .fa").removeClass("hide");
            $("#business-info-form-error").removeClass("hide");
            $("#business-info-section-id").removeClass("hide");
            $("#business-info-section-check").addClass("hide");
        } else {
            $(fields[i] + "-input-status .fa").addClass("hide");
            $("#business-info-form-error").addClass("hide");
            $("#business-info-section-id").addClass("hide");
            $("#business-info-section-check").removeClass("hide");
        }
    }
    
    return invalidFields.length == 0;
}

function isNevadaIntegrationValid(){
    var fields = ["#nevada-api-url", "#nevada-api-username", "#nevada-api-key"];

    var invalidFields = [];
    for (i = 0; i < fields.length; i++) {

        if($(fields[i]).val().trim() == ""){
            invalidFields.push(fields[i]);
            $(fields[i] + "-input-status .fa").removeClass("hide");
            $("#nevada-integration-form-error").removeClass("hide");
            $("#nevada-integration-section-id").removeClass("hide");
            $("#nevada-integration-section-check").addClass("hide");
        } else {
            $(fields[i] + "-input-status .fa").addClass("hide");
            $("#nevada-integration-form-error").addClass("hide");
            $("#nevada-integration-section-id").addClass("hide");
            $("#nevada-integration-section-check").removeClass("hide");
        }
    }

    return invalidFields.length == 0;
    
}

function isBrandingInfoValid(){
    var fields = ["#app-starter-screen-image", "#app-brand-logo", "#app-icon"];

    var invalidFields = [];
    for (i = 0; i < fields.length; i++) {
        if($(fields[i]).val() == ""){
            invalidFields.push(fields[i]);
            $(fields[i] + "-input-status .fa").removeClass("hide");
            $("#branding-info-form-error").removeClass("hide");
            $("#branding-info-section-id").removeClass("hide");
            $("#branding-info-section-check").addClass("hide");
        }else {
            $(fields[i] + "-input-status .fa").addClass("hide");
            $("#branding-info-form-error").addClass("hide");
            $("#branding-info-section-id").addClass("hide");
            $("#branding-info-section-check").removeClass("hide");
        }
    }

    return invalidFields.length == 0;
}

function onBusinessNameChange(){
    $('#business-name').on('input',function(e){
        $("#android-screen-0-business-name").text($( this ).val())
        $("#ios-screen-0-business-name").text($( this ).val())
    });
}

function onStarterScreenChange(){
    $(document).on("change", "#app-starter-screen-image", function (evt) {
        brandingImagesOnChange(evt, "app-starter-screen-image", 1572864, successFunc);

        function successFunc(fr) {
            $(".starter-screen").css({"background-image": "url(" + fr.result + ")"});
        };
    });
}

function onBrandLogoChange(){
    $(document).on("change", "#app-brand-logo", function (evt) {
        brandingImagesOnChange(evt, "app-brand-logo", 512000, successFunc);
        
        function successFunc(fr) {
            $(".app-brand-logo").attr("src", fr.result);
        };
    });
}

function onAppIconChange(){
    $(document).on("change", "#app-icon", function (evt) {
        brandingImagesOnChange(evt, "app-icon", 204800);
    });
}

function brandingImagesOnChange(evt, elementId, maxFileSize, successFunc) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            var fileSize = files[0].size; // in bytes
            if(fileSize > maxFileSize){
                $("#" + elementId).val("");
                errorFunc("Invalid File Size");
            }else{
                if(successFunc != undefined) {
                    successFunc(fr);
                }
                $("#" + elementId + "-success").removeClass("hide");
                $("#" + elementId + "-input-status").addClass("hide");
                $("#" + elementId + "-success .file-input-success-img").attr("src", fr.result);
            }
        };
        fr.readAsDataURL(files[0]);
    } else {
        errorFunc("File Not Selected");
    }
    
    function errorFunc(message){
        $("#" + elementId + "-success").addClass("hide");
        $("#" + elementId + "-input-status").removeClass("hide");
        $("#" + elementId + "-input-status-message").text(message)
    }
}

function onThemeColorChange(){
    $('.theme-color-picker').colorpicker().on('changeColor.colorpicker', function(event){
        var themeColor = event.color.toHex();
        $(".register-button").css({"background": themeColor});
        $(".guest-button").css({"color": themeColor, "border-color": themeColor});
        $(".app-nav-bar").css({"background": themeColor});
        $(".product-stats .fa").css({"color": themeColor});
        $(".product-stats .price").css({"background": themeColor});
    });
}

function initFields(){
    $('.theme-color-picker').colorpicker();
    $('[data-input-status=included]').focus(function() {
        var inputId = $(this).attr("id");
        $("#" + inputId + "-input-status .fa").addClass("hide");
    });
}

function onAppCreateSubmit(){
    $("#app-create-submit-btn").click(function(){
        $("#feature-button-group").addClass("hide");
        $("#create-app-submit-message").removeClass("hide");
    });
}

$(document).ready(function() {
    $(window).keydown(function(event){
        if( (event.keyCode == 13) && (!isBasicInfoValid() || !isBrandingInfoValid()) ) {
            event.preventDefault();
            return false;
        }
    });
});

/*$("#android-guest-login").click(function(){
 currentPreview = ANDROID_PREVIEW_MODE;
 currentScreen = "1";
 $("#screen-left-slider-icon").removeClass("hide");
 $("#screen-right-slider-icon").addClass("hide"); //check this later when more screens appear
 $("#android-screen-0").addClass("hide");
 $("#android-screen-1").removeClass("hide");
 });

 $("#ios-guest-login").click(function(){
 currentPreview = IOS_PREVIEW_MODE;
 currentScreen = "1";
 $("#screen-left-slider-icon").removeClass("hide");
 $("#screen-right-slider-icon").addClass("hide"); //check this later when more screens appear
 $("#ios-screen-0").addClass("hide");
 $("#ios-screen-1").removeClass("hide");
 });*/