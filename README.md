# React-TextGenerator
## webackとbabelの設定 ~npm install~
- 好きなフォルダを作成してそこで`npm init`
- とりあえず表示にしたがってエンターを推していけば`package.json`が作成される
- `npm install webpack babel-core babel-loader babel-preset-es2015 babel-preset-react react react-dom --save`
- 実行するとnode_modulesとpackage.jsonにインストールされている

## webpack.config.jsを作成してビルドできるように設定
- プロジェクトフォルダ内に新規ファイル作成`webpack.config.js`を作成する
```js

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: babel-loader,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
}
//この状態だとwebpackのバージョンよってエラーになる、下記にすると無事起動
module.exports = {
  entry: './src/index.js',
  output: {
    //ここが追加
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
}


```

## src/index.jsを作成
- 次に先ほど設定した`webpack.config.js`のentry部分を作成する
- src/index.jsを作成
```js
import React from 'react';
import ReactDOM from 'react-dom';



import App from './Components/App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


```

## src/Components/App.jsを作成
- Reactのコンポーネントフォルダを作成する
```js
import React, { Component } from 'react';

class App extends Component {
  componentDidMount() {
    console.log('React Runinng...');
  }
  render(){
    return(
      <div>MyApp</div>
    )
  }
}

export default App;


```

## bundl.jsの設定
- プロジェクト直下にindex.htmlを作成しbabelのスクリプトを読み込む
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React Generator</title>
</head>
<body>
  <div id="root"></div>

  <script src="./dist/bundle.js"></script>
</body>
</html>

```
- ここまでで無事起動していると,プロジェクト配下にdist/bundle.jsが作成されてコンパイルされる
- プロジェクト内のindex.htmlをドラッグ＆ドロップでブラウザで開き、リロードするとApp.jsの「MyApp」が表示されていればOK
- `webpack`コマンドは`webpack -w`にすると自動で常に動いてくれる


## ローカルサーバーを立ててビルド
- `npm install -g live-server`をグローバルにインストール（プロジェクトだけじゃなくて全体に）
- インストール完了後、`live-server --port=8080`(番号のところは好きな数字でOK)
- 自動でリロードされて起動される(更新にはwebpackを起動する必要があるのであくまでサーバーの起動)
