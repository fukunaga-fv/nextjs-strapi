import React from "react";
import App from "next/app"; //継承用
import Head from "next/head"; //メタ情報コンポ
import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";

class MyApp extends App {
  // クラスコンポはuseStateが使えないらしいk
  // setStateはstateが更新されると再レンダーする
  state = {
    user: null,
  };

  setUser = (user) => {
    this.setState({ user });
  };

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
