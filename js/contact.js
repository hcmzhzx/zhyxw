$('body').on('click','.contactme',function (){
    var way = $(this).attr('data-way'),contact = $(this).attr('data-val');
    var isvip = (contact.indexOf('*') > -1 || contact.indexOf('limit.jpg') > -1) ? 0 : 1;
    if(isvip == 0){
        showAlert('温馨提示','该商家暂未开通此功能，您的联系请求已通知商家',[{t:'知道了'}]);
        return;
    }
    var isPublic = contact == '未公开此联系方式' ? 0 : 1;
    if(isPublic == 0){
        showAlert('温馨提示','该商家' + contact,[{t:'知道了'}]);
        return;
    }
    var isEmpty = contact == '' ? 1 : 0;
    if(isEmpty == 1){
        showAlert('温馨提示','该商家未完善此联系方式',[{t:'知道了'}]);
        return;
    }
    switch(way){
        case 'phone':
            var btn = isNaN(contact) ? [{t:'知道了'}] : [{t:'知道了'},{t:'拨打号码'}];
            showAlert('查看手机号码',contact,btn);
            if(btn.length > 1) $('#alert .button a').eq(1).attr('href','tel:' + contact);
            break;
        case 'wechat':
            var src = $(this).attr('data-src');
            var btn = [{t:'知道了'},{t:'复制微信'}];
            if(!src){
                showAlert('查看微信',contact,btn);
            }else{
                showAlert('查看微信','<div class="flex center qrbox"><span>二维码加载中</span></div><p style="padding:0 5px;">微信号：' + contact + '</p><p>微信中长按二维码可识别添加好友</p>',btn);
                var img = new Image();
                img.onload = function (){
                    $('#alert .qrbox').html(img);
                }
                img.src = src;
            }
            $('#alert .button a').eq(1).addClass('clipboard');
            var cliper = new Clipboard('.clipboard', {
                text: function(trigger){return contact;}
            });
            cliper.on('success', function(e){
                showMsg('复制成功',1);
                cliper.destroy();
            });
            break;
        case 'qq':
            showAlert('查看QQ',contact,[{t:'知道了'},{t:'复制号码'}]);
            $('#alert .button a').eq(1).addClass('clipboard');
            var cliper = new Clipboard('.clipboard', {
                text: function(trigger){return contact;}
            });
            cliper.on('success', function(e){
                showMsg('复制成功',1);
                cliper.destroy();
            });
            break;
        case 'web':
            showAlert('查看二维码','<div class="flex center qrbox"><span>二维码加载中</span></div><p>扫描二维码进入我的事业</p>',[{t:'知道了'}]);
            var img = new Image();
            img.onload = function (){
                img.className = 'flex fitimg';
                $('#alert .qrbox').html(img);
            }
            img.src = contact + window.location.href;
            break;
    }
});