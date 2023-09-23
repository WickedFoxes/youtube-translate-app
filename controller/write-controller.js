const viewModel = require('../db/view-model');
const writeModel = require('../db/write-model');

async function write(req, res){
    var videoid = req.params.videoid;
    var title = await viewModel.get_video_title(videoid);
    var tags = await viewModel.get_video_tags(videoid) || [];
    var translate = await viewModel.get_video_translate(videoid);

    res.render('write', {
        'videoid' : videoid,
        'title' : title,
        'tags' : tags,
        'translate' : translate,
        'makeTranslateElement': makeTranslateElement,
    });
}
async function upload_translate(req, res){
    writeModel.set_video_translate(req.body.videoid, req.body.timeline, req.body.original, req.body.translate, req.body.pronunce);
    res.send(req.body);
}

async function upload_video_tag(req, res){
    writeModel.set_video_tag(req.body.videoid, req.body.tag);
    res.send(req.body);
}

async function delete_translate_and_tag(req, res){
    writeModel.delete_video_translate(req.body.videoid);
    writeModel.delete_video_tag(req.body.videoid);
    res.send(req.body);
}

function makeTranslateElement(timeline, original, translate, pronunce){
    return '\
    <div class="list-group-item">\
        <div class="row">\
            <div class="time_load_button_block col-auto">\
                <button type="button" class="timeline_button btn no-padding">▶️</button>\
            </div>\
            <div class="time_save_button_block col-auto">\
                <button type="button" class="time_save_button btn btn-default no-padding">💾</button>\
            </div>\
            <div class="timelne_textarea_block col-2">\
                <textarea type="text" class="timelne_textarea no-padding text-center">'+timeline+'</textarea>\
            </div>\
            <div class="original_textarea_block col" >\
                <textarea class="original_textarea no-padding">'+original+'</textarea>\
            </div>\
            <div class="translate_textarea_block col" style="display:none;">\
                <textarea style="white-space:pre-line;" class="translate_textarea no-padding">'+translate+'</textarea>\
            </div>\
            <div class="pronunce_textarea_block col" style="display:none;">\
                <textarea style="white-space:pre-line;" class="pronunce_textarea no-padding">'+pronunce+'</textarea>\
            </div>\
            <div class="add_block col-1">\
                <button type="button" class="add_button btn btn-default no-padding">+</button>\
            </div>\
            <div class="del_block col-1">\
                <button type="button" class="del_button btn btn-default no-padding">-</button>\
            </div>\
        </div>\
    </div>\
    ';
}

module.exports = {
    write, upload_translate, delete_translate_and_tag, upload_video_tag
};