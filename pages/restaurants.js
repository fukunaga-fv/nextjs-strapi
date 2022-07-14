import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

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

const Restaurants = (props) => {
  //リレーション先のデータを回収
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });
  //RestaurantsList/index, href属性 => variables router.query.id => gql $id
  console.log(data);

  if (loading === true) {
    return <span>Loading...</span>;
  }
  if (error) {
    return "レストランの読み込みに失敗しました";
  }

  const { restaurant } = data;
  return (
    <>
      <h1>{restaurant.name}</h1>
      <Row>
        {restaurant.dishes.map((res) => (
          <Col xs="6" sm="4" key={res.id} style={{ padding: 0 }}>
            <Card style={{ margin: "0 10px" }}>
              <CardImg
                src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                top={true}
                style={{ height: 250 }}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardTitle>{res.dsecription}</CardTitle>
              </CardBody>
              <div className="card-footer">
                <Button outline color="primary">
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
      </Row>
    </>
  );
};

export default Restaurants;
