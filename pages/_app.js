import React from "react";
import App from "next/app";//継承用
import Head from "next/head";//メタ情報コンポ
import Layout from "../components/Layout";
import withData from "../lib/apollo";

class MyApp extends App {
	render() {//OR
		const { Component, pageProps } = this.props;
		return (
			<>
			{/* タイトル属性を決めたりリンクを決めたりメタ情報を含む */}
				<Head>
					<link 
						rel="stylesheet" 
						href="http://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" 
					/>
				</Head>
				<Layout>
					<Component {...pageProps} />{/* 全てのコンポを指す */}
				</Layout>
			</>
		)
	}
}

export default withData(MyApp);
//デフォルトで送るクラスをwithDataでラッピング、全てのファイルでapolloが適用される

// 全てのファイルの根幹となるファイル