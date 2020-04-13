import styled from "styled-components";

export const Container = styled.div`
  width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  svg {
    margin-right: 10px;
  }
`;

export const MainText = styled.div`
  display: inline;
  font-size: 24px;
  color: #7159c1;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

export const NextPlayer = styled.div`
  display: inline;
  font-size: 24px;
  background: #${props => (props.value === "X" ? "59c171" : "c17159")};
  border: 1px solid #999;
  font-weight: bold;
  line-height: 34px;
  margin-left: 10px;
  padding: 5px 8px;
  text-align: center;
`;

export const Button = styled.button`
  background: #7159c1;
  border: 0;
  padding: 5px 15px;
  border-radius: 4px;
  margin-top: 10px;

  color: ${props => (props.current === 1 ? "#fff" : "#ddd")};
  font-weight: ${props => (props.current === 1 ? "bold" : "none")};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Cells = styled.button`
  height: 100px;
  width: 100px;
  font-size: 50px;
  background: #${props => (props.value === "X" ? "863E8C" : props.value === "O" ? "876192" : "FFF")};
  border: 1px solid #999;
  float: left;
  font-weight: bold;
  line-height: 50px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;

  &:hover {
    background: #${props => (props.value === "X" ? "84d196" : props.value === "O" ? "d19684" : "CCC")};
    cursor: pointer;
  }
`;
