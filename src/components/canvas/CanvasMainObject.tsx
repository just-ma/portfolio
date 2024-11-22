import {
  OPTION_TYPES,
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../../constants";
import LaptopModel from "./models/LaptopModel";
import HeadphonesModel from "./models/HeadphonesModel";
import HeadModel from "./models/HeadModel";
import CamcorderModel from "./models/CamcorderModel";
import DiaryModel from "./models/DiaryModel";
import { OptionType } from "../../sanity";
import CanvasBaseObject, { ModelProps } from "./CanvasBaseObject";
import useAppContext from "../../hooks/useAppContext";

const MAIN_ITEM_ANGLE = (2 * Math.PI) / OPTION_TYPES.length;
const MAIN_ITEM_DEFAULT_DISTANCE = 1.4;

const OPTION_TYPE_TO_COMPONENT: Record<
  OptionType,
  (props: ModelProps) => JSX.Element
> = {
  website: LaptopModel,
  blog: DiaryModel,
  film: CamcorderModel,
  dj: HeadphonesModel,
  about: HeadModel,
};

const OPTION_TYPE_TO_DISTANCE: Record<OptionType, number> = {
  website: 1.1,
  blog: MAIN_ITEM_DEFAULT_DISTANCE,
  film: MAIN_ITEM_DEFAULT_DISTANCE,
  dj: MAIN_ITEM_DEFAULT_DISTANCE,
  about: MAIN_ITEM_DEFAULT_DISTANCE,
};

const CanvasMainObject = ({
  index,
  type,
}: {
  index: number;
  type: OptionType;
}) => {
  const angle = (index - 1.3) * MAIN_ITEM_ANGLE;
  const rootPath = OPTION_TYPE_TO_ROOT_PATH[type];
  const distance = OPTION_TYPE_TO_DISTANCE[type];
  const ObjectComponent = OPTION_TYPE_TO_COMPONENT[type];

  const { hoveredItem, onHoveredItemChange, titleAnimating } = useAppContext();

  const handleMouseEnter = () => {
    onHoveredItemChange({
      type,
      label: OPTION_TYPE_TO_LABEL[type],
      link: rootPath,
    });
  };

  const handleMouseLeave = () => {
    onHoveredItemChange(null);
  };

  return (
    <CanvasBaseObject
      hovering={hoveredItem?.type === type}
      allHovering={false}
      angle={angle}
      distance={distance}
      delayIndex={index}
      ObjectComponent={ObjectComponent}
      rootPath={rootPath}
      titleAnimating={titleAnimating}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default CanvasMainObject;
