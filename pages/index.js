import { useState } from "react";
import { Col, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import RestaurantsList from "../components/RestaurantsList";

const index = () => {
  const [query, setQuery] = useState(""); //関数コンポーネントでstateを管理

  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupText>探す</InputGroupText>
              <Input
                placeholder="レストラン名を入力してください"
                onChange={(huga) =>
                  setQuery(huga.target.value.toLocaleLowerCase())
                }
              />
            </InputGroup>
          </div>

          {/* コンポ：レストランリスト */}
          <RestaurantsList search={query} />
        </Col>
      </Row>
      <style jsx>
        {`
				.search {
					margin: 20px;
					width: 500px;
				},
			`}
      </style>
    </div>
  );
};

export default index;

/**
 * onChange 入力があるとトリガーになる
 * 右記関数の引数に値を代入する
 * .targetでHTML要素
 * .valueで値
 */
