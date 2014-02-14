(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=487042181351167";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

jQuery(document).ready(function ($) {

    $("#name").focus(function (e) {
        $('.name-tooltip').show();
    });

    $("#name").focusout(function (e) {
        $('.name-tooltip').hide();
    });

    $("#id").focus(function (e) {
        $('.id-tooltip').show();
    });

    $("#id").focusout(function (e) {
        $('.id-tooltip').hide();
    });

    $('#reg-label').click(function (e) {
        $('.birthday-tooltip').show();

    });

    $('input:text[name=email]').keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
            event.preventDefault();
            $('#participant').attr('checked', 'checked');
        }
    });


    var options = {
        success: function (response, statusText, xhr, form) {

            var respObj = JSON.parse(response);
            if (respObj.status === "success") {
                $('form').hide();
                $('.reg-success').show();
            }
            console.log(respObj.status);
            console.log(response);
        },
        error: function (e) {

            console.log(e);
        },

        beforeSubmit: function (arr, $form, options) {
            console.log("im called");
            var status = true;
            for (i in arr) {
                console.log("im called inside");
                var current = arr[i];
                $('.' + current.name).removeClass("warning");
                if (!current.value && (current.name === "name" || current.name === "id" || current.name === "email" || current.name === "cv")) {
                    console.log("im called false");
                    $('.' + arr[i].name).addClass("warning");
                    console.log(jQuery(arr[i].name));
                    status = false;
                }

            }
            // The array of form data takes the following form:
            // [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]

            return status;


            // return false to cancel submit
        }
    };

    $('#register').ajaxForm(options);

    for (i = new Date().getFullYear(); i > 1900; i--) {
        $('#years').append($('<option />').val(i).html(i));
    }

    for (i = 1; i < 13; i++) {
        $('#months').append($('<option />').val(i).html(i));
    }
    updateNumberOfDays();

    $('#years, #months').change(function () {
        updateNumberOfDays();
    });

    function updateNumberOfDays() {
        $('#days').html('');
        month = $('#months').val();
        year = $('#years').val();
        days = daysInMonth(month, year);

        for (i = 1; i < days + 1; i++) {
            $('#days').append($('<option />').val(i).html(i));
        }

    }

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
});

jQuery(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-47865017-1', 'unihack.ge');
ga('send', 'pageview');


