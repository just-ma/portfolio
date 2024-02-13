import { OPTION_TYPES } from "../../constants";
import { APPLE_MURDERER_ROOT_PATH } from "../appleMurderer/constants";
import AppleModel from "./models/AppleModel";
import CanvasBaseObject from "./CanvasBaseObject";

const APPLE_ITEM_DISTANCE = 0.6;
const APPLE_ITEM_ANGLE = 0.2;

const CanvasAppleObject = () => {
  return (
    <CanvasBaseObject
      angle={APPLE_ITEM_ANGLE}
      distance={APPLE_ITEM_DISTANCE}
      delayIndex={OPTION_TYPES.length}
      ObjectComponent={AppleModel}
      rootPath={APPLE_MURDERER_ROOT_PATH}
    />
  );
};

export default CanvasAppleObject;
