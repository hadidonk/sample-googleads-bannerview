var vmModule = require("./main-view-model");
var platformModule = require("platform");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;

    var placeholder = page.getViewById("bannerView");
    var bannerView;

    if(platformModule.device.os == "iOS") {
        bannerView = placeholder.ios;
        bannerView.adUnitID = "ca-app-pub-3940256099942544/2934735716";
        bannerView.rootViewController = page.ios;
        var request = GADRequest.request();
        request.testDevices = [kGADSimulatorID];
        bannerView.loadRequest(request);
    }
}

function creatingView(args) {
    if(platformModule.device.os == "iOS") {
        bannerView = GADBannerView.alloc().init();
        args.view = bannerView;
    }
}

exports.pageLoaded = pageLoaded;
exports.creatingView = creatingView;