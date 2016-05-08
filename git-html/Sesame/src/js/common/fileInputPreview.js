/**
 * 上传图片预览功能
 */


define(function() {

    /**
     * 读取图片
     * @param  {Object} input       jQuery对象
     * @param  {Object} previewArea jQuery对象
     * @return {[type]}             [description]
     */
    var _readURL = function(input, previewArea) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                // previewArea.attr('src', e.target.result);
                previewArea.css('background-image', 'url(' + e.target.result + ')');
            };

            reader.readAsDataURL(input.files[0]);
            
            $(input).next('span').hide();//将默认文字隐藏

        }
    };

    /**
     * 图片上传前预览
     * @return {[type]} [description]
     */
    var imgPreview = function(input, previewArea) {
        input.change(function() {
            _readURL(this, previewArea);
        });
    };

    return {
        imgPreview: imgPreview // 图片预览
    };

});

// <input type='file' id="imgInp" />
// <img id="blah" src="#" alt="your image" />