/**
 * Created by pdeng on 15/12/30.
 */
require('./sass/app.scss');
var data = require('./mockData.js')().list;
$(document).ready(function () {
    var tpl = '';
    $.each(data, function (i, v) {
        tpl += ''
            + '<div id="data-card">'
            + '<div class="name">姓名:' + v.name + '</div>'
            + '<div class="avator">' + '<img src="' + v.avator + '"/>' + '</div>'
            + '<div class="nice">昵称:' + v.nick + '</div>'
            + '<div class="constellation">星座:' + v.constellation + '</div>'
            + '<div class="time">时间:' + v.time + '</div>'
            + '<div class="content">主题内容:' + v.content + '</div>'
            + '</div>'
    });
    $('#data').html(tpl);

    //var source = $("#card-data-template").html();
    //var template = Handlebars.compile(source);
    //var html = template(data);
    // console.log(html);
    //$('#cardWrap').append(html);



});