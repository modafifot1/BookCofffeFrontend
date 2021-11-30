import React, { useEffect, useState } from "react";
import {
  BoxContainer,
  FormContainer,
  Container,
  TopContainer,
  BackDrop,
  HeaderContainer,
  HeaderText,
  InnerContainer,
  SmallText,
  backdropVariants,
} from "../components/common/CommonContainer";
import { Input } from "../components/common/CommonInput";
import { SubmitButton } from "../components/common/CommonButton";
import { MutedLink, BoldLink } from "../components/common/CommonLink";
import { login } from "../redux/slices/authSlice";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { SpinLoading } from "../components/common/SpinLoading";

export const LoginPage = () => {
  const { error, user, loading } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState({});
  // const [validated, setValidated] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (Cookies.get("token")) {
      console.log("Token: ", Cookies.get("token"));
      history.push("/product-management");
    }
  }, [history, user]);
  const onChangeValue = (event) => {
    const value = event.target.value.trim();
    let prop = {};
    prop[event.target.name] = value;
    let newError = {};
    if (value !== "") {
      newError[event.target.name] = undefined;
    } else {
      // setValidated(false);
      newError[event.target.name] = `${event.target.placeholder} is required`;
    }
    setLocalError({
      ...localError,
      ...newError,
    });
    setData({
      ...data,
      ...prop,
    });
  };
  const onValidate = () => {
    if (
      validator.isEmpty(data.password) ||
      !validator.matches(
        data.password,
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      )
    ) {
      setLocalError({
        ...localError,
        password: "Mật khẩu ít nhất 6 kí tự gồm [a-zA-Z], !, @, $....",
      });
      return false;
    }
    if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
      setLocalError({
        ...localError,
        email: "Vui lòng nhập đúng định dạng email!",
      });
      return false;
    }
    return true;
  };
  const onFocus = (name) => {
    setLocalError({
      ...localError,
      [name]: "",
    });
  };
  const onSubmit = () => {
    if (onValidate()) {
      console.log("Data: ", data);
      dispatch(login(data));
    }
  };
  return (
    <Container>
      {loading && <SpinLoading></SpinLoading>}
      <TopContainer>
        <BackDrop
          initial={false}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={backdropVariants}
        />

        <HeaderContainer>
          <HeaderText>{"Wecome back"}</HeaderText>
          <SmallText>{"Please sign-in to continue!"}</SmallText>
        </HeaderContainer>
      </TopContainer>
      <InnerContainer>
        <BoxContainer>
          <FormContainer>
            <Input
              name="email"
              label="Email"
              locked={false}
              active={false}
              type="text"
              value={data.email}
              onChangeValue={onChangeValue}
              error={localError.email}
              onFocus={onFocus}
            />
            <Input
              name="password"
              label="Password"
              locked={false}
              active={false}
              type="password"
              value={data.password}
              onChangeValue={onChangeValue}
              error={localError.password}
              onFocus={onFocus}
            />
            <div className={"error-msg"}>
              {error?.msg?.includes("Password")
                ? "Mật khẩu sai"
                : error?.msg?.includes("Email")
                ? "Tài khoản email không hợp lệ"
                : ""}
            </div>
            <MutedLink href={"#"}>Forgot your password?</MutedLink>
            <SubmitButton onclick={onSubmit}>Login</SubmitButton>
            <MutedLink href="#">
              Don't have an accoun? <BoldLink href="#">Signup</BoldLink>
            </MutedLink>
          </FormContainer>
        </BoxContainer>
      </InnerContainer>
    </Container>
  );
};
