import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const query = gql`
  {
    restaurants {
      id
      name
      dsecription
      image {
        url
      }
    }
  }
`;

const RestaurantsList = (props) => {
  const { loading, error, data } = useQuery(query);

  if (loading === true) {
    //loadingを待たないとdataが格納される前に処理が始まる場合がある
    return <span>Loading...</span>;
  }
  if (error) {
    return "レストランの読み込みに失敗しました";
  }

  const searchQuery = data.restaurants.filter(
    (restaurant) => restaurant.name.toLowerCase().includes(props.search) //propsで受け取ったsearchの値を.includeで含まれているか
  );
  return (
    <Row>
      {searchQuery.map((res) => (
        <Col xs="6" sm="4" key={res.id}>
          <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
            <CardImg
              src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
              top={true}
              style={{ height: 250 }}
            />
            <CardBody>
              <CardTitle>{res.name}</CardTitle>
              <CardTitle>{res.dsecription}</CardTitle>
            </CardBody>
            <div className="card-footer">
              <Link
                as={`/restaurants/${res.id}`}
                href={`/restaurants?id=${res.id}`}
              >
                <a className="btn btn-primary">もっと見る</a>
              </Link>
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
  );
};

export default RestaurantsList;
