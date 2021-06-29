var OSName="unknown";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="mac";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="linux";

$(document).ready( function() {
    var plan = '';
    $('.ask').click( function() {
        if( OSName != 'windows' && OSName != 'linux')
            if(!confirm("Your OS is not supported.\nCurrently Windows and Linux only.\nContinue?"))
                return false;
        plan = $(this).attr("data-plan")
        var pm = $(".payment-method");
        if(plan == "free") pm.hide(); else pm.show();
        $('.order-dlg').modal();
        return false;
    });
    $('.order-button').click( function() {
        var email = $('#account-email');
        if(!/\S+@\S+\.\S+/.test(email.val())) {
            alert('Invalid E-mail');
        } else {
            var billing = $('input[type=radio]:checked').val();
            _gaq.push( ['_trackEvent', 'Checkout', plan, billing ] );
            document.location = "/payment/checkout?product=" + plan +
                "&email=" + encodeURIComponent( email.val() ) +
                "&billing=" + encodeURIComponent( billing );
        }
    });
    $('.track').click( function() {
        var title = $(this).attr('data-plan') || $(this).attr('title');
        _gaq.push( ['_trackEvent', 'Select', title ] );
        return true;
    });
});
