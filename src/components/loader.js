import styled from "styled-components";

const GlobalLoader = styled.div`
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.6);

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;

  & > * {
    color: #fff;
  }
`;

const Loader = ({ loading, children }) => {
  return loading && <GlobalLoader>{children}</GlobalLoader>;
};

export default Loader;
