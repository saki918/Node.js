const express = require(`express`);
const app = express();

// app.get('/', (req, res) => {
//   res.render('hello.ejs');
// });

app.get('/', (req, res) => { 
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  res.render('index.ejs');
});

// CSSや画像ファイルを置くフォルダを指定するコード
app.use(express.static('public'));

// サーバーを起動するコードを貼り付けてください
app.listen(3000);