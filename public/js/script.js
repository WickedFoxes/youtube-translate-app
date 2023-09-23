function change_table_mode_to_none(){
    for(block of document.querySelectorAll('.original_textarea_block')){
        block.style.display = 'none';
    }
    for(block of document.querySelectorAll('.translate_textarea_block')){
        block.style.display = 'none';
    }
    for(block of document.querySelectorAll('.pronunce_textarea_block')){
        block.style.display = 'none';
    }
    document.querySelector('#original_btn').className = 'btn btn-primary';
    document.querySelector('#translate_btn').className = 'btn btn-primary';
    document.querySelector('#pronunce_btn').className = 'btn btn-primary';
}
function change_table_mode_to_original(){
    change_table_mode_to_none();
    document.querySelector('#original_btn').className = 'btn btn-success';
    for(block of document.querySelectorAll('.original_textarea_block')){
        block.style.display = 'block';
    }
}
function change_table_mode_to_pronunce(){
    change_table_mode_to_none();
    document.querySelector('#pronunce_btn').className = 'btn btn-success';
    for(block of document.querySelectorAll('.pronunce_textarea_block')){
        block.style.display = 'block';
    }
}
function change_table_mode_to_translate(){
    change_table_mode_to_none();
    document.querySelector('#translate_btn').className = 'btn btn-success';
    for(block of document.querySelectorAll('.translate_textarea_block')){
        block.style.display = 'block';
    }
}
// 타임 얻기
function get_time(timeline) {
    var secArray = timeline.split(':');
    if (secArray.length == 2) {
        return 60 * parseInt(secArray[0]) + parseInt(secArray[1]);
    }
    if(secArray.length == 3) {
        return 60 * 60 * parseInt(secArray[0]) + 60 * parseInt(secArray[1]) + parseInt(secArray[2]);
    }
}
// 타임라인 얻기
function get_timeline(time){
    var sec = "" + parseInt(time%60);
    var min = "" + parseInt((time - parseInt(time/3600)*3600)/60);
    var hour = "" + parseInt(time/3600);
    sec = ('00' + sec).slice(-2);
    if (time < 60) {
        return "00:" + sec;
    }
    else if(time < 60*60) {
        return "" + min + ":" + sec;
    }
    else{
        min = ('00' + min).slice(-2);
        return "" + hour + ":" + min + ":" + sec;
    }
}