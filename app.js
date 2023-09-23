const mysql_odbc = require('./db/db_conn');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const board = require('./controller/board-controller');
const view = require('./controller/view-controller');
const write = require('./controller/write-controller');


async function launchServer(){
  const app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('layout', 'layout/layout');

  app.get('/', board.board);
  app.get('/board', board.board);
  app.get('/board/create-video-info', board.create_info_page);
  app.get('/board/create-video-info/create', board.create_info);

  app.get('/view/:videoid', view.view);
  
  app.get('/write/:videoid', write.write);
  app.post('/write/ajax', write.upload_translate);
  app.put('/write/ajax', write.upload_video_tag);
  app.delete('/write/ajax', write.delete_translate_and_tag);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
  })
}

launchServer();