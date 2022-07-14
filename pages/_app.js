import React from "react";
import App from "next/app"; //継承用
import Head from "next/head"; //メタ情報コンポ
import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";
import Cookies from "js-cookie";

class MyApp extends App {
  // クラスコンポはuseStateが使えないらしいk
  // setStateはstateが更新されると再レンダーする
  state = {
    user: null,
  };

  setUser = (user) => {
    this.setState({ user });
  };

  //既にユーザー情報が残っているかを確認する。
  componentDidMount() {
    const token = Cookies.get("token"); //tokenの中にはjwtが入っている

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

  render() {
    //OR
    const { Component, pageProps } = this.props;
    return (
      //user: は条件分岐
      <AppContext.Provider
        value={{ user: this.state.user, setUser: this.setUser }}
      >
        <>
          {/* タイトル属性を決めたりリンクを決めたりメタ情報を含む */}
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
