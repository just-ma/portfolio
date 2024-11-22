import { OPTION_TYPES } from "../../constants";
import { APPLE_MURDERER_ROOT_PATH } from "../../pages/appleMurderer/constants";
import AppleModel from "./models/AppleModel";
import CanvasBaseObject from "./CanvasBaseObject";
import useAppContext from "../../hooks/useAppContext";

const APPLE_ITEM_DISTANCE = 0.6;
const APPLE_ITEM_ANGLE = 0.2;

const CanvasAppleObject = () => {
  const { titleAnimating, onHoveredItemChange } = useAppContext();

  const handleMouseEnter = () => {
    onHoveredItemChange({
      label: "apple",
      link: APPLE_MURDERER_ROOT_PATH,
    });
  };

  const handleMouseLeave = () => {
    onHoveredItemChange(null);
  };

  return (
    <CanvasBaseObject
      angle={APPLE_ITEM_ANGLE}
      distance={APPLE_ITEM_DISTANCE}
      delayIndex={OPTION_TYPES.length}
      ObjectComponent={AppleModel}
      rootPath={APPLE_MURDERER_ROOT_PATH}
      titleAnimating={titleAnimating}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default CanvasAppleObject;
