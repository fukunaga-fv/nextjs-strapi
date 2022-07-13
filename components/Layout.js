import React from "react";
import App, { Container } from "next/app";//継承用
import Head from "next/head";//メタ情報コンポ
import { Nav, NavItem } from "reactstrap";
import Link from "next/link";

const Layout = (props) => {
	return (
		<div>
			<Head>
				<title>フードデリバリーサービス</title>
				<link 
						rel="stylesheet" 
						href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" 
					/>
			</Head>
			<header>
				<style jsx>
					{`
						a {
							color: white;
						}
					`}
				</style>
				<Nav className="navbar navbar-dark bg-dark">
					<NavItem>
						<Link href="/">
							<a className="navbar-brand">Home</a>
						</Link>
					</NavItem>
					<NavItem className="ml-auto">
						<Link href="/login">
							<a className="nav-link">サインイン</a>
						</Link>
					</NavItem>
					<NavItem className="ml-auto">
						<Link href="/register">
							<a className="nav-link">サインアップ</a>
						</Link>
					</NavItem>
					
				</Nav>
			</header>
			<Container>{props.children}</Container>{/* appで全てのページに渡される */}
		</div>
	);
}

export default Layout;