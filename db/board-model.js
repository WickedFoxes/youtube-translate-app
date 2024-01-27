const mysql_odbc = require('../db/db_conn');

async function set_video_info(videoid, title){
    let sql = 'INSERT INTO video_info (videoid, title, upload_time) '
       + 'VALUES ("'+videoid+'", "'+title+'", NOW())';
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

async function get_video_info(page){
    let sql = 'select * '
       + 'from video_info '
       + 'ORDER BY upload_time DESC '
       + (page ? 'LIMIT '+(page-1)*12+', 12;' : 'LIMIT 0, 12;');
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

async function get_video_info_by_search(page, search){
    let search_list = '\"'+search.replace(/ /g, '","')+'\"';
    let sql = 'select * '
        + 'from video_info '
        + 'where videoid in '
        + '(select videoid from video_tag where tag in ('+search_list+')) '
        + 'ORDER BY upload_time DESC '
        + (page ? 'LIMIT '+(page-1)*12+', 12;' : 'LIMIT 0, 12;');
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

module.exports = {
    set_video_info, set_video_tag, get_video_info, get_video_info_by_search
};