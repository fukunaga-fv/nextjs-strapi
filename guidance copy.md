# components

### Cart/

**_index.js_**

- AppContext から分割代入したい時
- グローバルコンテキストから取ってきた関数を使いたい時
- ボタンコンポを使って onClick イベントを発火させたい時(発火元\_app.js)
- 三項演算子を使って処理を分岐させたいとき

### Checkout/

**_CardSection.js_**

- props で受け取った関数を実行したい時
- ライブラリから受け取った CardElement コンポを使いたい時(stripe)

**_CheckOutForm.js_**

- input された要素に対して onChange と一つの関数で動的に data に格納したい場合
- Cookie トークンを取得してブラウザのデータを取り出したい場合
- API に対して POST メソッドを実行したい場合
- fetch の使い方を知りたい場合
- マウントするコンポに対して複数の値を渡したい場合

### RestaurantsList/index.js

- qraphql からデータを get したい時
- useQuery の使用方法を確認したいとき
- 配列から特定の値を除外または抽出したい時
- map を使ってオブジェクトを展開したい時
- リンク先を動的に指定したいとき
- リンク先にリロード無しに遷移したい時

# context/AppContext.js : グロバルコンテキスト

- \_\_app.js からグローバルコンテキストをコンポーネントに渡したい場合

-

# lib : 外部へアクセスファイル

### apollo.js

- appolo から graphql を叩きたい時
- withData などでラッピングしたデータを export したい時

### auth.js

- axios の使い方を知りたいとき
- cookie の使い方を知りたいとき
- Promise - .then -.catch の使い方を知りたい時
- Cookie に jwt トークンを格納したい時

# pages/

### \_app.js

- ブラウザと cookie 情報を使って加減算処理をしたい
- Object.assingn のような特殊なロジックを参照したいとき
- グローバルな関数や変数を設定したい時、AppContext.Provider
- デフォルトで送るクラスを withData でラッピングしたい時

### checkout.js

- 外部 API との通信で key をパッケージの機能で渡したい時
- パッケージが用意したコンポを使用して key を渡したいとき
- 外部 API との通信で安全に POST したい時

関連ファイル：
component/Checkout/CheckOutForm.js
component/Cart/index.js

### index.js

- useState の使い方が知りたい
- 検索機能の実装方法が知りたい
- onChange の使い方が知りたい

関連ファイル：
components/RestaurantList/index.js
pages/restaurants.js

### login.js

- useState の使い方を知りたい時
- lib/auth から関数を受け取りたい時
- ログインの制御を確認したい時
- onChange + setData で Input 項目によって動的に値を格納したい時
- スプレッド構文の応用的な使い方を知りたい時

関連ファイル：
lib/auth.js
context/AppContext.js
\_\_app.js

### register.js

- 新規登録の制御を行いたいとき
- lib/auth から受け取った Promise 関数の動きを知りたい時
- スプレッド構文を使用して、オブジェクトに値を更新、格納したいとき

関連ファイル：
lib/auth.js
context/AppContext.js
\_\_app.js

### restaurants.js

- useRouter の使い方を知りたい時
- useQuery の使い方を知りたい時
- グロバルコンテキストの関数を発火させたい時
- 分割代入の使い方を知りたい時
- 複雑なクエリを graphql に叩きたい時
- map 関数の使い方を知りたい時

関連ファイル：
components/Cart.js
context/AppContext.js
\_\_app.js
