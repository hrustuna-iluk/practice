(function($) {
    $(document).ready(function () {
        $('#registration .registration-submit').on('click', function () {
            var data = {
                'name': $('#registration #name').val(),
                'password': $('#registration #password').val(),
                'repeatPassword': $('#registration #repeat-password').val()
            };

            if (data.password !== data.repeatPassword) return;

            $.post('/registration', data).done(function (resp) {
                alert('success')
            }).fail(function (err) {
                alert('error ' + err)
            }).always(function () {
                
            });
        });
        $('#login .login-submit').on('click', function () {
            var data = {
                'name': $('#login #group-name').val(),
                'password': $('#login #group-password').val()
            };

            $.post('/login', data).done(function (resp) {
                sessionStorage.setItem('group', resp);
                window.location.replace('/board');
            }).fail(function (err) {
                
            }).always(function () {
                
            });
        });
    });
})(jQuery);