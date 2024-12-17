import AlmondCanvas from "./custom/AlmondCanvas";
import PortfolioGarfield from "./custom/PortfolioGarfield";

const CustomBlockComponent = ({ value: { id } }: { value: { id: string } }) => {
  switch (id) {
    case "almond": {
      return <AlmondCanvas />;
    }
    case "garfield": {
      return <PortfolioGarfield />;
    }
    default: {
      return null;
    }
  }
};

export default CustomBlockComponent;
