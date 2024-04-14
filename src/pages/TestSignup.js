import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { DevTool } from '@hookform/devtools'
import _ from 'lodash';

function TestSignup() {

const { 
    register
  , watch
  , handleSubmit
  , reset
  , setValue
  , getValues
  , setError
  , setFocus 
  , clearErrors
  , control
  , formState: { errors, isSubmitting, isDirty, dirtyFields, } 
} = useForm({
    mode: 'onBlur' , 
    defaultValues: {
        userId: ''
      , userPwd: ''
      , userPwdChk: ''
      , termsYn: false
    } ,
  });

const userPwd = watch("userPwd");
const currentPwd = useRef();


const onSubmit = (data) => {
  console.log("data: ", data)
}

const onError = (error) => {
  console.log("error: ", error);
}


  return (
    <>
    <h2>Test</h2>
    <Container>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <InputItem>
          <label htmlFor='userId'>아이디</label>
          <input
            type="text"
            name="userId"
            placeholder="아이디"
            {...register("userId", {
              required: {
                value: true, 
                message: "아이디 입력은 필수입니다."
              },
              pattern: {
                value: /^[A-za-z0-9]{5,8}$/ ,
                message: '영문+숫자 최대 5~8자' 
              }
              })
            }
          ></input>
        </InputItem>
        <Err>{errors.userId && <p>{errors.userId.message}</p>}</Err>

        <InputItem>
          <label htmlFor='userPwd'>비밀번호</label>
          <input
            type="text"
            name="userPwd"
            placeholder="비밀번호"
            ref={currentPwd}
            {...register("userPwd", {
              required: {
                value: true, 
                message: "비밀번호를 입력해주세요"
              },
              pattern: {
                value: /^[A-za-z0-9]{5,8}$/ ,
                message: '영문+숫자 최대 5~8자' 
              }
              })
            }
          ></input>
        </InputItem>
        <Err>{errors.userPwd && <p>{errors.userPwd.message}</p>}</Err>

        <InputItem>
          <label htmlFor='userPwdChk'>비밀번호 확인</label>
          <input
            type="text"
            name="userPwdChk"
            placeholder="비밀번호 확인"
            {...register("userPwdChk", {
              required: {
                value: true, 
                message: "비밀번호를 한번더 입력해주세요"
              },
              validate: {
                matchPwd: (value) => 
                  value === userPwd || "일치하지 않습니다."
              }
              })
            }
          ></input>
        </InputItem>
        <Err>{errors.userPwdChk && <p>{errors.userPwdChk.message}</p>}</Err>

        <InputItem>
          <label htmlFor='termsYn'>동의</label>
          <input
            type="checkbox"
            className="checkbox"
            value="false"
            >
          </input>
        </InputItem> 
        <button type="submit">제출</button>
      </form>
      <DevTool control={control} />
    </Container>
    </>
  );
}

export default TestSignup;

const Container = styled.div`
  width: 800px;
  height: 800px;
  background-color: beige;
  align-item: center;
`;

const InputItem = styled.div`
  width: 300px;
  display: flex;
  margin: 10px;
  padding: 10px;

  & label {
    width: 130px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    margin: 10px;
  }

  & input {
    width: 100%;
    height: 25px;
    border: lightgray solid 1px;
    border-radius: 10px;
    margin: 10px;
    padding: 5px;
  }
`
const Err = styled.div`
    width: 50%;
    font-size: 10px;
    text-align: center;
    color: red;
`