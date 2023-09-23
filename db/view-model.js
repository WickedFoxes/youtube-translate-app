const mysql_odbc = require('../db/db_conn');

async function get_video_title(videoid){
    let sql = 'select title from video_info WHERE videoid ="'+videoid+'"';
    // console.log(sql);

    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
        return row[0][0];
    } catch(e){
        console.error(e);
        return null;
    }
}
async function get_video_tags(videoid){
    let sql = 'select tag from video_tag WHERE videoid ="'+videoid+'"';
    // console.log(sql);

    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
        return row[0];
    } catch(e){
        console.error(e);
        return null;
    }
}

async function get_video_translate(videoid){
    let sql = 'SELECT * FROM translate WHERE videoid = "'+videoid+'" ORDER BY timeline ASC';
    // console.log(sql);
    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
        // console.log(row[0]);
        return row[0];
    } catch(e){
        console.error(e);
        return null;
    }
}


module.exports = {
    get_video_title, get_video_tags, get_video_translate
};