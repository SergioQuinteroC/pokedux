import { StarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";

const PokemonCard = ({ name, image, types }) => {
  const typesP = types.map((type) => type.type.name).join(", ");
  return (
    <Card
      title={name}
      cover={<img src={image} alt={name} />}
      extra={<StarOutlined />}
    >
      <Meta description={typesP} />
    </Card>
  );
};

export default PokemonCard;
