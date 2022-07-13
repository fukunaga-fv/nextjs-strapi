
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import Link from "next/link";
import {gql} from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const query = gql`
	{
		restaurants{
			id 
			name
			dsecription
			image {
				url
			}
		}
	}
`;

const RestaurantsList = () => {
	const { loading, error, data } = useQuery(query);
  // console.log(data.restaurants);
	if(data.restaurants && data.restaurants.length) {
		return ( 
			<Row>
				{/* レスポンシブの設定 */}
				<Col xs="6" sm="4">
					<Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
						<CardImg 
							src="http://localhost:1337/uploads/thumbnail_restaurant1_2fdb519cf1.jpg" 
							top={true} 
							style={{ height: 250 }} 
						/>
						<CardBody>
							<CardTitle>Italian restaurant</CardTitle>
							<CardTitle>イタリアンので</CardTitle>
						</CardBody>
						<div className="card-footer">
							<Link 
								href="/restaurants?id=62ce44360007bc7b97ba6d6c" 
								as="/restaurants/62ce44360007bc7b97ba6d6c"
							>
								<a className="btn btn-primary">もっと見る</a>
							</Link>
						</div>
					</Card>
				</Col>
	
				<style jsx>
					{`
						a{
							color: white;
						}
						a:link {
							text-decoration: none;
							color: white;
						}
						a:hover {
							color: white;
						}
						.card-colums {
							column-count: 3;
						}
					`}
				</style>
	
			</Row>
		);
	}else{
		return <h1>レストランが見つかりませんでした</h1>
	}

};

export default RestaurantsList;