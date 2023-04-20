import React from "react";
import styled, { useTheme } from "styled-components/native";

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginButtom",
};
const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

const getVariant = (position, size, theme) => {
  const sizeIndex = sizeVariant[size];
  const positionIndex = positionVariant[position];
  const space = theme.space[sizeIndex];
  
  return `${positionVariant[position]}:${space}`;
};

const SpaceView = styled.View`
  ${({ variant }) => variant}
`;

export const Spacer = ({ position, size, children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);

  return <SpaceView variant={variant}>{children}</SpaceView>;
};
