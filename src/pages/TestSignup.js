import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { DevTool } from '@hookform/devtools'
import _ from 'lodash';
import { getValue } from "@testing-library/user-event/dist/utils";

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
  , trigger
  , control
  , formState: { errors, isSubmitting, isDirty, dirtyFields, } 
} = useForm({
    mode: 'onBlur' , 
    defaultValues: {
        userId: ''
      , userPwd: ''
      , userPwdChk: ''
      , allYn: false
      , termsYn: false
      , optionYn: false
    } ,
  });

const userId = watch("userId");
const userPwd = watch("userPwd");
const allYn = watch("allYn");



useEffect(() => {
  setValue("termsYn", allYn? true : false);
  setValue("optionYn", allYn? true : false);
},[allYn])


// id중복확인 검사.
const checkId = async (e, id) => {

  e.preventDefault();
  const isValidId = await trigger("userId");

  if(!isValidId){
    console.log("유효성검사 실시")
    return;
  }

  //서버로 보내중복을 확인하는 로직
  console.log(getValues("userId"))
  console.log("서버에서 중복확인")

}

const onSubmit = (data) => {
  // isValidId
  if(getValues("allYn") || getValues("termsYn")){

    console.log("data: ", data)
    console.log("제출")
  }
  
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
        <button onClick={(e) => 
          checkId(e, getValues("userId"))}>확인</button>
        <InputItem>
          <label htmlFor='userPwd'>비밀번호</label>
          <input
            type="text"
            name="userPwd"
            placeholder="비밀번호"
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
                  value === getValue("userPwd") || "일치하지 않습니다."
              }
              })
            }
          ></input>
        </InputItem>
        <Err>{errors.userPwdChk && <p>{errors.userPwdChk.message}</p>}</Err>

        <TermsItem>
          <label htmlFor='allYn'>
          <input
            type="checkbox"
            name="allYn"
            id="allYn"
            {...register("allYn", {
              required: {
                valueAsBoolean: true
              }
              })
            }
            >
          </input>
          전체동의</label>
        </TermsItem>
        <TermsItem>
        <label htmlFor='termsYn'>
          <input
            type="checkbox"
            name="termsYn"
            id="termsYn"
            {...register("termsYn", {
              required: {
                valueAsBoolean: true
              }
              })
            }
            >
          </input>
          필수동의</label>
        </TermsItem>
        <TermsItem>
        <label htmlFor='optionYn'>
          <input
            type="checkbox"
            name="optionYn"
            id="optionYn"
            {...register("optionYn", {
              required: {
                valueAsBoolean: false
              }
              })
            }
            >
          </input>
          선택동의</label>
        </TermsItem> 
        <Err>{errors.termsYn && <p>{errors.termsYn.message}</p>}</Err>

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
const TermsItem = styled.div`
  width: 300px;
  display: flex;
  margin: 10px;
  padding: 10px;

`

const Err = styled.div`
    width: 50%;
    font-size: 10px;
    text-align: center;
    color: red;
`