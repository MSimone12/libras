import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.p`
  font-size: ${(props) => props.fontSize}px;
  color: #fff;
  letter-spacing: ${(props) => props.fontSize - props.fontSize / 3}px;
  line-height: ${(props) => props.fontSize - props.fontSize / 3}px;
  background: #c78902;
  margin: 0 0 16px 0;
`;

const Logo = ({ fontSize = 40 }) => {
  return (
    <Container>
      <Title fontSize={fontSize}>{"OUÇA"}</Title>
      <Title fontSize={fontSize}>{"COM"}</Title>
      <Title fontSize={fontSize}>{"AS"}</Title>
      <Title fontSize={fontSize}>{"MÃOS"}</Title>
    </Container>
  );
};

export default Logo;
