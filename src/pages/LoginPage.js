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
        password: "M???t kh???u ??t nh???t 6 k?? t??? g???m [a-zA-Z], !, @, $....",
      });
      return false;
    }
    if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
      setLocalError({
        ...localError,
        email: "Vui l??ng nh???p ????ng ?????nh d???ng email!",
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
          <HeaderText>{"Bcoffee"}</HeaderText>

          <HeaderText>{"Ch??o m???ng b???n"}</HeaderText>
          <SmallText>{"Vui l??ng ????ng nh???p ????? ti???p t???c!"}</SmallText>
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
              label="M???t kh???u"
              locked={false}
              active={false}
              type="password"
              value={data.password}
              onChangeValue={onChangeValue}
              error={localError.password}
              onFocus={onFocus}
            />
            <div className={"error-msg"}>
              {error?.msg?.includes("M???t kh???u")
                ? "M???t kh???u sai"
                : error?.msg?.includes("email")
                ? "T??i kho???n email kh??ng h???p l???"
                : ""}
            </div>
            <MutedLink href={"#"}>Qu??n m???t kh???u?</MutedLink>
            <SubmitButton onclick={onSubmit}>????ng nh???p</SubmitButton>
            {/* <MutedLink href="#">
              B???n ch??a c?? t??i kho???n? <BoldLink href="#">????ng k??</BoldLink>
            </MutedLink> */}
          </FormContainer>
        </BoxContainer>
      </InnerContainer>
    </Container>
  );
};
