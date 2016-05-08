define(['../common/jquery-2.1.4.min.js', 'html!../../html/common/header.html', 'html!../../html/common/footer.html'], function ($, header, footer) {
    $(function () {
        $('body').prepend(header).append(footer);
    });
});