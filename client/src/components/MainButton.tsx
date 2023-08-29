import { Button } from "@mui/material";
import { props } from "../typescript/types";

const MainButton: React.FC<props> = ({
  text,
  variant,
  color,
  onClick,
  fullWidth,
  disable = false
}) => {
  return (
    <Button
      disabled={disable}
      color={color}
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}>
      {text}
    </Button>
  );
};

export default MainButton;
