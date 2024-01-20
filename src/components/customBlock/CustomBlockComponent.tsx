import AlmondCanvas from "./AlmondCanvas";

const CustomBlockComponent = ({ value: { id } }: { value: { id: string } }) => {
  switch (id) {
    case "almond": {
      return <AlmondCanvas />;
    }
    default: {
      return null;
    }
  }
};

export default CustomBlockComponent;
