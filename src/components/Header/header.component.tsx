import React, { FunctionComponent, useState } from "react";

//libs
import { Icon } from "@iconify/react";

//styled
import { CustomLink, HeaderContainer, HeaderOptions } from "./header.styles";
import { Slide, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { headerOptions } from "./header.data";

interface Props {}

const Header: FunctionComponent<Props> = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <HeaderContainer>
      {/* {showOptions ? ( */}
      <Slide in={showOptions} direction="left">
        <HeaderOptions>
          {headerOptions.map((option) => (
            <Tooltip title={option.name} arrow >
              <CustomLink to={option.link}>
                <Icon
                  icon={option.icon}
                  width="30px"
                  height="30px"
                  style={{ cursor: "pointer" }}
                />
              </CustomLink>
            </Tooltip>
          ))}
        </HeaderOptions>
      </Slide>
      {/* ) : ( */}
      <Icon
        icon="material-symbols:keyboard-double-arrow-left"
        width="40px"
        height="40px"
        style={{
          cursor: "pointer",
          transform: showOptions ? "rotateZ(180deg)" : "rotateZ(0deg)",
          transition: "all 0.2s ease-in-out",
        }}
        onClick={toggleOptions}
      />
      {/* )} */}
    </HeaderContainer>
  );
};

export default Header;
