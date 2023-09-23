const viewModel = require('../db/view-model');

async function view(req, res){
    var videoid = req.params.videoid;
    var title = await viewModel.get_video_title(videoid);
    var tags = await viewModel.get_video_tags(videoid) || [];
    var translate = await viewModel.get_video_translate(videoid);

    res.render('view', {
        'videoid' : videoid,
        'title' : title,
        'tags' : tags,
        'translate' : translate,
    });
}

module.exports = {
    view
};