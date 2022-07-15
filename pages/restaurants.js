import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import Cart from "../components/Cart";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

const Restaurants = () => {
  console.log("hoef");
  const appContext = useContext(AppContext);
  //リレーション先のデータを回収
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });
  //RestaurantsList/index, href属性 => variables router.query.id => gql $id
  console.log(data);

  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return "レストランの読み込みに失敗しました";
  }

  if (data.restaurant) {
    const { restaurant } = data;
    return (
      <>
        <h1>{restaurant.name}</h1>
        <Row>
          {restaurant.dishes.map((dish) => (
            <Col xs="6" sm="4" key={dish.id} style={{ padding: 0 }}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  src={`${process.env.NEXT_PUBLIC_API_URL}${dish.image.url}`}
                  top={true}
                  style={{ height: 250 }}
                />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardTitle>{dish.dsecription}</CardTitle>
                </CardBody>
                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(dish)}
                  >
                    + カートに入れる
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
          <style jsx>
            {`
              a {
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
          <Col xs="3" style={{ padding: 0 }}>
            <div>
              {/* カートに遷移 */}
              <Cart />
            </div>
          </Col>
        </Row>
      </>
    );
  }
};

export default Restaurants;
