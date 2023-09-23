const boardModel = require('../db/board-model');
const viewModel = require('../db/view-model');

async function board(req, res){
    let mode = req.query.mode || "read";
    let page = req.query.page || 1;
    let search = req.query.search || '';
    let tags = search ? search.split(' ') : [];
    let video_info = search ? await boardModel.get_video_info_by_search(page, search) : await boardModel.get_video_info(page);
    let video_tag = await make_video_tag(video_info);
    res.render('board', {
        'page': page,
        'search': search,
        'tags' : tags,
        'makeTagElement' : makeTagElement,
        'makeVideoElement' : makeVideoElement,
        'makeWriteElement' : makeWriteElement,
        'makeViewModeSearchForm' : makeViewModeSearchForm,
        'makeWriteModeSearchForm' : makeWriteModeSearchForm,
        'video_info' : video_info,
        'video_tag' : video_tag,
        'mode' : mode,
    });
}
async function make_video_tag(video_info){
    let video_tag = [];
    for(info of video_info){
        video_tag[info.videoid] = '';
        for(tag of await viewModel.get_video_tags(info.videoid)){
            video_tag[info.videoid] += makeVideoTagElement(tag.tag);
        }
    }
    return video_tag;
}
async function create_info_page(req, res){
    res.render('create-video-info');
}

async function create_info(req, res){
    let title = req.query.title;
    let videoid = req.query.videoid;
    let tags_list = req.query.tags ? req.query.tags.split(" ") : [];

    await boardModel.set_video_info(videoid, title);
    for(tag of tags_list){
        await boardModel.set_video_tag(videoid, tag);
    }
    res.redirect('/board?mode=write');
}

function makeVideoElement(videoid, title, video_tag){
    return '\
    <div class="col-6 col-md-3">\
        <a href="view/'+videoid+'">\
            <div class="container" style="width:100%;">\
                <div class="row">\
                    <div class="col-12">\
                        <img src="https://img.youtube.com/vi/'+videoid+'/mqdefault.jpg" alt="'+title+' 이미지" width="100%">\
                    </div>\
                    <div class="col-12">\
                        <div class="tittle">'+title+'</div>\
                    </div>\
                    <div class="col-12">'
                    +
                    video_tag
                    +
                    '</div>\
                </div>\
            </div>\
        </a>\
    </div>\
    ';
}
function makeWriteElement(videoid, title, video_tag){
    return '\
    <div class="col-6 col-md-3">\
        <a href="write/'+videoid+'">\
            <div class="container" style="width:100%;">\
                <div class="row">\
                    <div class="col-12">\
                        <img src="https://img.youtube.com/vi/'+videoid+'/mqdefault.jpg" alt="'+title+' 이미지" width="100%">\
                    </div>\
                    <div class="col-12">\
                        <div class="tittle">'+title+'</div>\
                    </div>\
                    <div class="col-12">'
                    +
                    video_tag
                    +
                    '</div>\
                </div>\
            </div>\
        </a>\
    </div>\
    ';
}

function makeViewModeSearchForm(search){
    return '\
    <input type="text" name="search" value="'+search+'">\
    <input type="submit" class="btn btn-primary" value="+">\
    <input type="button" class="btn btn-primary" onclick="location.href=\'/board?mode=write\'" value="view">\
    <input type="hidden" name="mode" value="view">\
    ';
}

function makeWriteModeSearchForm(search){
    return '\
    <input type="text" name="search" value="'+search+'">\
    <input type="submit" class="btn btn-success" value="+">\
    <input type="button" class="btn btn-success" onclick="location.href=\'/board?mode=view\'" value="write">\
    <input type="button" class="btn btn-dark" onclick="location.href=\'/board/create-video-info\'" value="create">\
    <input type="hidden" name="mode" value="write">\
    ';
}

function makeTagElement(tag){
    return'<div class="badge bg-primary text-wrap">'+tag+'</div>';
}
function makeVideoTagElement(tag){
    return'<div class="badge bg-secondary text-wrap">'+tag+'</div>';
}

module.exports = {
    board, create_info_page, create_info
};