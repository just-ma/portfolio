import { MENU_OPTIONS } from "./constants";
import { OptionDefinition } from "./types";

const MenuItem = ({
  option: { label, path },
}: {
  option: OptionDefinition;
}) => {
  return <div>{label}</div>;
};

const HomeMenu = () => {
  return (
    <div>
      {MENU_OPTIONS.map((option) => (
        <MenuItem option={option} key={option.path} />
      ))}
    </div>
  );
};

export default HomeMenu;
