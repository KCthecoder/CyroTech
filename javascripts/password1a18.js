(function ($) {

/* $d("....")
 *
 *  Easy access to jQuery's per-element data cache.
 *
 *  Examples
 *
 *    $d("#foo").age = 12
 *    $d("#foo").age //=> 12
 *    $d("#foo").age = $d("#foo").age + 1
 *
 *  Slightly adapted from http://yehudakatz.com/2009/04/20/evented-programming-with-jquery/ by Yehuda Katz.
 */
if (typeof($d) != "function") {
  $d = function(param) {
    var node = jQuery(param)[0];
    var id   = jQuery.data(node);

    jQuery.cache[id] || (jQuery.cache[id] = {});
    jQuery.cache[id].node = node;

    return jQuery.cache[id];
  }
}

$.fn.password = function (method) {

    return this.each(function () {
        // get jQuery version of 'this'
        var $input = $(this);

        function calcStrength(password){
            if(password && typeof(zxcvbn) !== 'undefined' ) {
                var info = zxcvbn(password);
                $(".password-bar").css({"width": 20 * info.score + 20 + "%"}).html(Math.round(info.entropy) +' bit');
                $(".password-status").html("Estimated crack time: " + info.crack_time_display ); 
            } else {
                $(".password-bar").css({"width": "20%"}).html('0 bit');
                $(".password-status").html("Effective key length"); 
            }
        };

        if(method == 'reset') {
            calcStrength();
            return this;
        }

        // capture the rest of the variable to allow for reuse
        isPassword = $input.attr('type') == 'password';
        if(isPassword) {
            var $alt = $('<input type="text"></input>').attr({
                'class': $input.attr('class'),
                'name':  $input.attr('name'),
                'title': $input.attr('title'),
                'style': $input.attr('style')
            })
            .val($input.val())
            .insertBefore($input)
            .addClass("password-open")
            .hide()
            $switch = $input.next().find('.eye')
            $switch.addClass('icon-eye-close')
            $switch.click( function() { 
                var masked = $input.is(":visible");
                if(masked) {
                    $(this).addClass('icon-eye-open').removeClass('icon-eye-close')
                    $alt.val( $input.val() );
                    $input.hide();
                    $alt.show();
                } else {
                    $(this).addClass('icon-eye-close').removeClass('icon-eye-open')
                    $input.val( $alt.val() );
                    $input.show();
                    $alt.hide();
                }
            } );
            $alt.keyup( function() { 
                $input.val( $alt.val() );
                calcStrength( $input.val()); 
            });
            $input.keyup( function() {
                $alt.val( $input.val() );
                calcStrength( $input.val() );
            });
            calcStrength();
        }
    });
}

})(jQuery);
