jQuery(document).ready(function ($) {
    function toggle_fields() {
        var show_fields = $('#show-fields').is(":checked");

        if (show_fields) {
            $('#email, #cc, #bcc').show();
        } else {
            $('#email, #cc, #bcc').hide();
        }
    }

    function toggle_category(val) {
        var show_category = $('#show-category').is(":checked");

        if (val) {
            $('#toggle-category').show();

            var selected_notification = $('#notification').find(':selected').text();

            $(".option-category > option").each(function() {

                selected_notification.search(this.text);
            });
        }
        else {
            $('#toggle-category').hide();
            show_category = false;
        }

        if (show_category) {
            $('#category').show();
        } else {
            $('#category').hide();
        }
    }

    function toggle_users() {
        if ($('#only-post-author').is(':checked')) {
            $('#users, #current-user').hide();
        } else {
            $('#users, #current-user').show();
        }
    }

    function false_category() {
        $('#toggle-category').hide();
    }

    function init() {
        $(".select2").select2();
        toggle_fields();

        false_category();
        toggle_category(false);
        if ('user-password' === $('#notification').val() || 'new-user' === $('#notification').val() || 'welcome-email' === $('#notification').val() || 'reply-comment' === $('#notification').val()) {
            $('#toggle-fields, #email, #cc, #bcc, #users, #email-formatting, #current-user, #post-author').hide();
            $('#user-password-msg').show();
        } else if ('new-comment' === $('#notification').val() || 'new-trackback' === $('#notification').val() || 'new-pingback' === $('#notification').val() || 'admin-password' === $('#notification').val() || 'admin-user' === $('#notification').val()) {
            $('#toggle-fields, #users, #email-formatting, #current-user').show();
            $('#only-post-author').prop('checked', false);
            $('#post-author').hide();
            toggle_fields();
            $('#user-password-msg').hide();
        } else {
            $('#toggle-fields, #users, #email-formatting, #current-user, #post-author').show();
            toggle_fields();
            toggle_users();
            $('#user-password-msg').hide();
            toggle_category(true);
        }
    }

    init();
    $('#notification').on('change', function () {
        var $this = $(this);
        toggle_category(false);
        if ('user-password' === $this.val() || 'new-user' === $this.val() || 'welcome-email' === $this.val() || 'reply-comment' === $this.val()) {
            $('#toggle-fields, #email, #cc, #bcc, #users, #email-formatting, #current-user, #post-author').hide();
            $('#user-password-msg').show();
        } else if ('new-comment' === $('#notification').val() || 'new-trackback' === $('#notification').val() || 'new-pingback' === $('#notification').val() || 'admin-password' === $('#notification').val() || 'admin-user' === $('#notification').val()) {
            $('#post-author').hide();
            $('#toggle-fields, #users, #email-formatting, #current-user').show();
            $('#user-password-msg').hide();
            toggle_fields();
        } else {
            $('#toggle-fields, #users, #email-formatting, #current-user, #post-author').show();
            $('#user-password-msg').hide();
            toggle_fields();
            toggle_category(true);
        }
    });

    $('#show-fields').change(function () {
        toggle_fields();
    });

    $('#show-category').change(function () {
        toggle_category(true);
    });

    $('#only-post-author').change(function () {
        toggle_users();
    });

    // send test email
    $('#test-email').click(function () {
        $('#send-test-email').val('true');
    });

    $('#shortcode-help').on('click', function () {
        var notification = $('#notification').val(),
            notification_slug = '',
            splited;

        switch (notification) {
            case 'new-comment':
            case 'new-trackback':
            case 'new-pingback':
            case 'reply-comment':
            case 'user-password':
            case 'admin-password':
            case 'new-user':
            case 'welcome-email':
            case 'admin-user':
            case 'new-post':
            case 'update-post':
            case 'pending-post':
            case 'future-post':
            case 'newterm-category':
            case 'newterm-post_tag':
                notification_slug = notification;
                break;

            default:
                splited = notification.split('-');
                switch (splited[0]) {
                    case 'new':
                    case 'update':
                    case 'pending':
                    case 'future':
                    case 'comment':
                        notification_slug = splited[0] + '-post';
                        break;
                    case 'newterm':
                        notification_slug = 'newterm-category';
                        break;
                }

                break;
        }

        $(this).attr('href', 'http://www.voltronik.co.uk/wordpress-plugins/better-notifications-for-wordpress-shortcodes/?notification=' + notification_slug);
    });
});
