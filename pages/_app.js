import React from "react";
import App from "next/app"; //継承用
import Head from "next/head"; //メタ情報コンポ
import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";
import Cookies from "js-cookie";

// クラスコンポはreact Hookが使えない
class MyApp extends App {
  // setState->state が更新されると、コンポーネントはそれに再レンダーで応じます。
  state = {
    user: null,
    cart: { items: [], total: 0 },
  };

  setUser = (user) => {
    this.setState({ user });
  };

  //既にユーザー情報が残っているかを確認する。
  componentDidMount() {
    const token = Cookies.get("token"); //tokenの中にはjwtが入っている
    const cart = Cookies.get("cart");

    // console.log(cart);

    if (cart !== "undefined" && typeof cart === "string") {
      //cartがstring型
      JSON.parse(cart).forEach((item) => {
        this.setState({
          cart: {
            items: JSON.parse(cart),
            total: (this.state.cart.total += item.price * item.quantity),
          },
        });
      });
    }

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          //resは帰ってくるがokでは無い場合、期限切れなどで
          Cookies.remove("token"); //古いクッキー削除
          this.setState({ user: null }); //ユーザーセットをnull
          return null;
        }
        const user = await res.json(); //okな場合resをJSONに変換
        this.setUser(user); //ログイン
      });
    }
  }

  //現在のカートに商品を追加したい時
  addItem = (item) => {
    let { items } = this.state.cart;
    const newItem = items.find((i) => i.id === item.id);
    // console.log(newItem);
    if (!newItem) {
      item.quantity = 1;
      //cartに追加する
      this.setState(
        {
          cart: {
            items: [...items, item], //今まで入っていたアイテムに対してitemを追加する
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
    //既に同じ商品がカートに入っている時
    else {
      this.setState(
        {
          //Object.assign:既存の配列などに新しいフィールドを追加したい時など
          cart: {
            //quantityフィールド　← item.quantityに1プラスした値を代入して、itemに格納
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  //カートから商品を削除
  removeItem = (item) => {
    let { items } = this.state.cart;
    const newItem = items.find((i) => i.id === item.id);
    if (newItem.quantity > 1) {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity - 1 })
                : item
            ),
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
    //カートに入っているその商品が一つの場合
    else {
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id); //インデックス；配列の添字番号を返す

      items.splice(index, 1); //指定した添字番号を削除する、、引数が三つの場合追加する

      this.setState(
        {
          cart: {
            items: items,
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  render() {
    //OR
    const { Component, pageProps } = this.props;
    return (
      //user: は条件分岐
      <AppContext.Provider
        value={{
          user: this.state.user,
          cart: this.state.cart,
          setUser: this.setUser,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        <>
          <Head>
            <link
              rel="stylesheet"
              href="http://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            />
          </Head>

          <Layout>
            <Component {...pageProps} />
            {/* 全てのコンポを指す */}
          </Layout>
        </>
      </AppContext.Provider>
    );
  }
}

export default withData(MyApp);
//デフォルトで送るクラスをwithDataでラッピング、全てのファイルでapolloが適用される

// 全てのファイルの根幹となるファイル
