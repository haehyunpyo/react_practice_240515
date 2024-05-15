import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

function TestListRef() {
  const prevList = useRef(null);

  const handleClick = (e) => {
    const clickedList = e.target;
    const clickedInput = e.target.firstElementChild;

    if (prevList.current != null) {
      prevList.current.classList.remove("active");
    }

    clickedList.classList.add("active");
    prevList.current = clickedList;
  };
  return (
    <>
      <h3>Test</h3>
      <Container>
        <ListBox>
          <li onClick={handleClick}>
            <input type="text" readOnly defaultValue={"리스트1"}></input>
          </li>
          <li onClick={handleClick}>
            <input type="text" readOnly defaultValue={"리스트2"}></input>
          </li>
          <li onClick={handleClick}>
            <input type="text" readOnly defaultValue={"리스트3"}></input>
          </li>
          <li onClick={handleClick}>
            <input type="text" readOnly defaultValue={"리스트4"}></input>
          </li>
        </ListBox>
      </Container>
    </>
  );
}

export default TestListRef;

const Container = styled.div`
  width: 300px;
  height: 500px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
`;

const ListBox = styled.ul`
  width: inherit;
  margin: auto;
  padding: 0;
  list-style: none;

  & li {
    width: inherit;
    height: 50px;
    padding: 0;
    margin: 30px auto;
    border: 1px solid black;
    text-align: center;
    cursor: pointer;
    &.active {
      background-color: gray;

      & input {
        background-color: gray;
        color: white;
      }
    }
  }

  & li input {
    width: 40%;
    height: 100%;
    padding: 0;
    white-space: nowrap;
    border: none;
    text-align: center;
  }
`;
