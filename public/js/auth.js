(function($) {
    $(document).ready(function () {
        $('#registration .registration-submit').on('click', function () {
            var data = {
                'email': $('#registration #email').val(),
                'firstName': $('#registration #firstName').val(),
                'lastName': $('#registration #lastName').val(),
                'password': $('#registration #password').val(),
                'repeatPassword': $('#registration #repeat-password').val()
            };

            if (data.password !== data.repeatPassword) return;

            $.post('/registration', data).done(function (resp) {
                $('#registration').modal('hide');
                $('#login').modal('show');
            }).fail(function (err) {
                alert('error ' + err.statusText);
            }).always(function () {
                
            });
        });
        $('#login .login-submit').on('click', function () {
            var data = {
                'email': $('#login #user-email').val(),
                'password': $('#login #user-password').val()
            };

            $.post('/login', data).done(function (resp) {
                sessionStorage.setItem('user', JSON.stringify(resp));
                window.location.replace('/board');
            }).fail(function (err) {
                alert('error ' + err.statusText);
            }).always(function () {
                
            });
        });
    });
})(jQuery);