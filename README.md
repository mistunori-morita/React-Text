# React-TextGenerator
## webackとbabelの設定
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


## APIからデータ取得
- `webpack -w`と`live-server --port=8080`の両方を起動しておく
- `npm install --save axios`をインストール
```js
import React, { Component } from 'react';

//1　axiosをインポート
import axios from 'axios';

class App extends Component {
  //2 コンストラクタでstateを設定する
  constructor(props) {
    super(props);
    this.state = {
      paras: 4,
      html: false,
      text: ''
    }
  }

  //4 componentDidMountを使って読み込み時に関数を実行
  componentDidMount(){
    this.getText();
  }

  //3 axiosを用いてapiにアクセスをしてdataを取得する
  getText(){
    axios.get('http://hipsterjesus.com/api/?paras='+this.state.paras+'&html='+this.state.html)
    .then((response) => {
      this.setState({text: response.data.text});
      console.log(this.state);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render(){
    return(
      <div>MyApp</div>
    )
  }
}

export default App;

//この段階でエラーがでていて「'Access-Control-Allow-Origin' header is present on the requested resource. 」のようなものが出たらwebpack.config.jsを修正

//webpack.config.jsを修正
module.exports = {
  entry: './src/index.js',
  output: {
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
  },
  //ここを追記
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};
// クロームの拡張機能を追加
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
これを追加することでconsole.log(this.state);がみれるようになる

```

## src/Components/Output.jsを作成
- App.jsをコピーして不要なところを削除して雛形を作成
```js

import React, { Component } from 'react';

class Output extends Component {
  constructor(props) {
    super(props);

  }

  render(){
    return(
      <div>OUtput</div>
    )
  }
}

export default Output;


```
- App.jsにimportする
```js
import Output from './Output';


//省略
return(
  <div>
    <h1>React Text Generator</h1>
    <Output value={this.state.text}/>
  </div>
)

```
- output.jsをのstate部分を変更
```js
class Output extends Component {
  //親からpropsが渡ってきて子のconstructorに状態をsetしている
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }

  }

  render(){
    return(
      //それを表示させている
      <div className="output">
        {this.props.value}
      </div>
    )
  }
}
```

## cssフォルダを作成し、スタイリング
- プロジェクト直下にcssフォルダを作って、style.cssを作成
```css

body{
  font-family: Arial;
  line-height: 1.5em;
}


.container{
  width: 500px;
  margin: 20px auto;
  border: 4px solid #333;
}


.output{
  height: 500px;
  overflow: scroll;
  padding: 5px;
}


form div{
  margin: 10px 0;
}


```

- 作成したcssをindex.htmlに<link>で読み込む
```js
return(
  //ここで読み込む
  <div className="container">
    <h1>React Text Generator</h1>
    <Output value={this.state.text}/>
  </div>
```

## src/component/Controlsフォルダを作成※ベースはoutputをコピーして変更する
- Text.js
```js
import React, { Component } from 'react';

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }

  }

  render(){
    return(
      <div>
        <input type="text" />
      </div>
    )
  }
}

export default Text;


```
- Select.js
```js
import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }

  }

  render(){
    return(
      <div>
        <select>
            <option value="0">Select</option>
        </select>
      </div>
    )
  }
}

export default Select;

```
- App.jsにインポートする

```js
//この２つをインポート
import Text from './Controls/Text';
import Select from './Controls/Select';


  render(){
    return(
      <div className="container">
        <h1>React Text Generator</h1>
        <Output value={this.state.text}/>
        <h3>Real Time Options</h3>
        <form>
          <div>
          //コンポーネントの読み込み
            <label>Paragraphs: </label>
              <Text value={this.state.paras} />
          </div>
          <div>
          //コンポーネントの読み込み
            <label>Include HTML: </label>
              <Select value={this.state.html} />
          </div>
        </form>
      </div>
    )
  }
}

export default App;

```

## コンポーネントの制御
- Text.js,Select.jsを作り込む
```js
import React, { Component } from 'react';

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }
  }

  onChange(e){
    this.setState({value: e.target.value},function(){
      this.props.onChange(this.state.value);
    });
  }

  render(){
    return(
      <div>
        <input type="number" value={this.state.value} onChange={this.onChange.bind(this)}/>
      </div>
    )
  }
}

export default Text;
```

- App.jsにイベントを設定
```js

//changeParas関数を設定
changeParas(number){
  console.log(number);
}



//省略
<Text value={this.state.paras} onChange={this.changeParas.bind(this)}/>

//これで問題なく動作していると、コンソールに番号が表示される

//動いていることが確認できたら変更
changeParas(number){
  this.setState({paras: number}, this.getText);
}


```
ー Select.jsにイベントを設定
```js
import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }

  }

//2イベントにsetStateで状態をセット
  onChange(e){
    this.setState({value: e.target.value}, function(){
      this.props.onChange(this.state.value);
    });
  }

  render(){
    return(
      <div>
      //1イベントの設定
        <select onChange={this.onChange.bind(this)}>
          <option value="true">yes</option>
          <option value="false">no</option>
        </select>
      </div>
    )
  }
}

export default Select;

```

- App.jsを書き換え
```js

//2showHtml関数を作成
showHtml(x){
  this.setState({html:x}, this.getText);
}


//省略
<div>
  <label>Include HTML: </label>
  //1showHtml関数を定義
    <Select value={this.state.html} onChange={this.showHtml.bind(this)} />
</div>
```
