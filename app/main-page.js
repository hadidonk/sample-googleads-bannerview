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
        bannerView.strongDelegateRef = bannerView.delegate = GADBannerViewDelegateImpl.new().initWithOwner(this);
        bannerView.rootViewController = page.ios;
        var request = GADRequest.request();
        request.testDevices = [kGADSimulatorID];
        bannerView.loadRequest(request);
    }
}

function creatingView(args) {
    if(platformModule.device.os == "iOS") {
        bannerView = GADBannerView.alloc().initWithAdSize(kGADAdSizeSmartBannerPortrait);
        args.view = bannerView;
    }
}

var GADBannerViewDelegateImpl = (function (_super) {
    __extends(GADBannerViewDelegateImpl, _super);
    function GADBannerViewDelegateImpl() {
        _super.apply(this, arguments);
    }
    GADBannerViewDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    GADBannerViewDelegateImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    GADBannerViewDelegateImpl.prototype.adViewWillLeaveApplication = function (bannerView) {
    	// do sth as the user is leaving the app, because of a clicked ad
        console.log("Leaving the app, bye bye!");
    };
    GADBannerViewDelegateImpl.ObjCProtocols = [GADBannerViewDelegate];
    return GADBannerViewDelegateImpl;
})(NSObject);

exports.pageLoaded = pageLoaded;
exports.creatingView = creatingView;