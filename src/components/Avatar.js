import { stringToHslColor } from "../utils";
import styled from "styled-components";
import PropTypes from "prop-types";

const AvatarCircle = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  line-height: 300%;
  font-weight: bold;
  color: #fff;
`;

const Avatar = ({ name }) => {
  const avatarColour = stringToHslColor(name, 30, 80);
  const namesArr = name.split(" ");
  const initials = namesArr.map((name) => name[0]);
  return <AvatarCircle color={avatarColour}>{initials}</AvatarCircle>;
};

Avatar.propTypes = {
  name: PropTypes.string,
};

export default Avatar;
