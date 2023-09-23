# youtube-translate-app
유튜브 영상을 보며 공부를 하기 위해 만들어본 웹사이트

## 환경
DB : Mariadb

Web : nodeJS(express)


## youtube-translate-app 데이터베이스
db/create_db.sql 이용하여 DB 생성

    mariadb -uroot -p
    source create_db.sql

### MariaDB 연동
db/db_info.js를 수정하여 youtube-translate-app 데이터베이스와 연동

        real : {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'password',
            database: 'youtube-translate-app'
        },
        local : {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'password',
            database: 'youtube-translate-app'
        },

## Web 서버 실행
### npm init 실행
npm init 실행 후 모두 y 입력

    npm init

### dependencies 설치
package.json의 dependencies 설치

    npm install

### 서버 실행
app.js 실행한 후 <http://localhost:3000> 접속하여 서버 정상 실행 확인

    npm start

![image](https://github.com/WickedFoxes/youtube-translate-app/assets/48846088/c57ed294-2810-48af-a92f-b9f511afc014)

