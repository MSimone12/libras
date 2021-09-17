import styled from "styled-components";

const Base = styled.button`
  border: none;
  cursor: pointer;
  position: relative;
`;

const Label = styled.p`
  font-size: 24px;
  text-transform: uppercase;
  padding: 8px 32px;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 16px;
  }
`;

const Primary = styled(Base)`
  color: #c78902;
  border: 5px solid #fff;
  position: relative;
  transition: 0.5s;
  background: transparent;
  display: flex;
  flex-direction: row-reverse;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    background: #fff;
    transition: 0.5s;
  }

  &::before {
    width: 100%;
    height: 100%;
  }
  &:hover::before {
    width: 0;
  }
`;

const Secondary = styled(Base)`
  background-color: transparent;
  border: 5px solid white;
  color: white;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    background: #050505;
    transition: 0.5s;
  }

  &:hover {
    background: #050505;
  }

  &::before {
    width: 80%;
    height: calc(100% + 10px);
  }
  &::after {
    height: 80%;
    width: calc(100% + 10px);
  }
  &:hover::before {
    width: 0;
  }
  &:hover::after {
    height: 0;
  }
`;

const Button = ({ secondary = false, label, onClick }) => {
  return !secondary ? (
    <Primary onClick={onClick}>
      <Label>{label}</Label>
    </Primary>
  ) : (
    <Secondary onClick={onClick}>
      <Label>{label}</Label>
    </Secondary>
  );
};

export default Button;
