var ANDROID_PREVIEW_MODE = "android";
var IOS_PREVIEW_MODE = "ios";
var ANDROID_SCREEN_PREFIX = "#android-screen-";
var IOS_SCREEN_PREFIX = "#ios-screen-";
var currentPreview = ANDROID_PREVIEW_MODE;
var currentScreen = "0";

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

$("#screen-left-slider").click(function(){
    var currentScreenNum = Number(currentScreen);
    if(currentScreenNum != 0) {
        var nextScreenNum = (Number(currentScreenNum)-1);
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

$(window).load(function(){
    // executes when complete page is fully loaded, including all frames, objects and images
    console.log("Came Here");
    setTimeout(function(){
        $("#main-container").fadeIn()
    }, 200);
});