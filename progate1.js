const express = require(`express`);

const mysql = require('mysql');

const app = express();

// CSSや画像ファイルを置くフォルダを指定するコード
app.use(express.static('public'));

// フォームから送信された値を受け取れる
app.use(express.urlencoded({ extended: false }));

// mysql 定数connectionを定義して接続情報の記述
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'progate',
  password: '',
  database: 'list_app'
});

// app.get('/', (req, res) => {
//   res.render('hello.ejs');
// });

app.get('/', (req, res) => { 
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    // まずクエリの実行
    "select * from items",
    // クエリ実行後の処理
    (error, results) => {
      console.log(results);
      // renderメソッドの第2引数に{プロパティ : 値}と書くことで、EJS側に値を渡すことができます。
      res.render('index.ejs', { items: results });
    }
  ); 
});

app.get('/new', (req, res) => {
  res.render('new.ejs')
});

app.post('/create', (req, res) => {
  connection.query(
    // フォームからの値をクエリに使うときは、VALUESに**「?」**を含めます。
    "insert into items (name) values(?)",
    // 「connection.query() 」の第2引数に渡したい配列を指定します。この配列の要素が「?」の部分に入り、実行されます。
    [req.body.itemName],
      (error, results) => {
        // クエリの実行後の処理
        // connection.query(
        //   'SELECT * FROM items',
        //   (error, results) => {
        //     res.render('index.ejs', { items: results });
        //   }
        // );
    res.redirect("/index");
       }
     );
  // console.log(req.body.itemName);
  // connection.query(
  //   "select * from items",
  //   (error, results) => {
  //     console.log(results);
  //     res.render('index.ejs', { items: results });
  //   }
  // ); 
});
// delete method 作成
app.post('/delete/:id', (req, res) => {
  connection.query(
    "delete from items where id = ?",
    [req.params.id],
    (error, results) => {
      res.redirect("/index")
    }
  );
});

// 編集画面を表示するルーティングを作成
app.get('/edit/:id', (req, res) => {
  connection.query(
    "select * from items where id = ?",
    [req.params.id],
    (error, results) => {
      res.render("edit.ejs",{item: results[0]});
    }
  );
});
// update method
app.post('/update/:id', (req, res) => {
  // 選択されたメモを更新する処理を書いてください
  connection.query(
    "update items set name = ? where id = ?",
    [req.body.itemName, req.params.id],
    (error, results) => {
      res.redirect("/index");
    }
  );
});
// サーバーを起動するコードを貼り付けてください
app.listen(3000);