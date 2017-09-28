var wxconfig = JSON.parse($('meta[name=share-conf]').attr('content'));
//wxconfig.debug = 'true';
wx.config(wxconfig);
var shareConfig = {
    title:$('meta[name=share-title]').attr('content') || document.title,
    desc:$('meta[name=share-desc]').attr('content'),
    cover:$('meta[name=share-cover]').attr('content'),
    url:'http://' + window.location.hostname + window.location.pathname
};
wx.ready(function () {
    wx.onMenuShareTimeline({
        title:shareConfig.title,
        link:shareConfig.url,
        imgUrl:shareConfig.cover
    });
    wx.onMenuShareAppMessage({
        title:shareConfig.title,
        link:shareConfig.url,
        imgUrl:shareConfig.cover,
        desc:shareConfig.desc,
        type:'link'
    });
    wx.onMenuShareQQ({
        title:shareConfig.title,
        link:shareConfig.url,
        imgUrl:shareConfig.cover,
        desc:shareConfig.desc
    });
});