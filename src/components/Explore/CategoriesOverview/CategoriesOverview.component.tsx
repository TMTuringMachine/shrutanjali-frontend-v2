import { Box } from "@mui/material";
import { FunctionComponent } from "react";

import { OverlayedText, CategoryCard } from "./CategoriesOverview.styles";
import { useNavigate } from "react-router-dom";

interface Prop {
  imgSrc: string;
  title: string;
  link?: string;
}

const CategoriesOverview: FunctionComponent<Prop> = ({
  imgSrc,
  title,
  link,
}) => {
  const navigate = useNavigate();

  return (
    <CategoryCard onClick={() => navigate(link!)}>
      <img
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          objectFit: "cover",
          backgroundSize: "cover",
          borderRadius: "10px",
        }}
        src={imgSrc}
        alt=""
      />
      <OverlayedText>{title}</OverlayedText>
    </CategoryCard>
  );
};
export default CategoriesOverview;
