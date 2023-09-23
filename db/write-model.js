const mysql_odbc = require('../db/db_conn');

async function set_video_translate(videoid, timeline, original, translate, pronunce){
    let sql = 'INSERT INTO translate (videoid, timeline, original, translate, pronunce) '
       + 'VALUES ("'+videoid+'", "'+timeline+'", "'+original+'", "'+translate+'", "'+pronunce+'")';
    // console.log(sql);
    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
    } catch(e){
        console.error(e);
        return null;
    }
}

async function set_video_tag(videoid, tag){
    let sql = 'INSERT INTO video_tag (videoid, tag) '
       + 'VALUES ("'+videoid+'", "'+tag+'")';
    // console.log(sql);
    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
    } catch(e){
        console.error(e);
        return null;
    }
}

async function delete_video_translate(videoid){
    let sql = 'DELETE FROM translate WHERE videoid="'+videoid+'"';
    // console.log(sql);
    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
    } catch(e){
        console.error(e);
        return null;
    }
}
async function delete_video_tag(videoid){
    let sql = 'DELETE FROM video_tag WHERE videoid="'+videoid+'"';
    // console.log(sql);
    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
    } catch(e){
        console.error(e);
        return null;
    }
}

module.exports = {
    set_video_translate, delete_video_translate, delete_video_tag, set_video_tag
};