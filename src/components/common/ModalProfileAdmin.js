import React from "react";
import { Modal } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Paper, Tab, Tabs } from "@material-ui/core";
import UploadImage from "../common/UploadImage";
import NoImage from "../../assets/images/notImage.png";
import { useState } from "react";
import FormBox from "../common/FormBox";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isMobilePhone } from "validator";
import moment from "moment";
import { useSelector } from "react-redux";
import { SpinLoading } from "./SpinLoading";

// import {
//   changePassword,
//   getUserDetail,
//   updateAvatar,
//   updateProfile,
// } from "redux/actions/common";

import {
  getProfile,
  updateAvatar,
  updateProfile,
  changePassword,
} from "../../redux/slices/profileSlice";

const ModalProfileAdmin = ({ isModalVisible, close }) => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const [formInfo, setFormInfo] = useState({
    fullName: "",
    email: "",
    dateOfBirth: Date.now(),
    phoneNumber: "",
    address: "",
  });
  const [formPassword, setFormPassword] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [imageAvatar, setImageAVatar] = useState("");

  const [errorInfo, setErrorInfo] = useState({});
  const [errorPassword, setErrorPassword] = useState({});
  const { profile } = useSelector((store) => store.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    setFormInfo(profile.data);
    console.log(profile.data);
    setImageAVatar(profile.data?.imageUrl);
  }, [profile]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeImage = (e) => {
    const temp = URL.createObjectURL(e.target.files[0]);
    setImageAVatar(temp);

    dispatch(updateAvatar(e.target.files[0]));
  };

  const handleFocusInfo = (event) => {
    setErrorInfo({
      ...errorInfo,
      [event.target.name]: "",
    });
  };
  const handleFocusPass = (event) => {
    setErrorPassword({
      ...errorPassword,
      [event.target.name]: "",
    });
  };

  const handleChangeInfo = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };

  const handleChangePass = (event) => {
    setFormPassword({
      ...formPassword,
      [event.target.name]: event.target.value,
    });
  };

  const validateInfo = () => {
    const errorState = {};
    // check validate
    if (isEmpty(formInfo.fullName)) {
      errorState.fullName = "Kh??ng ???????c ????? tr???ng!";
    }
    if (!isMobilePhone(formInfo.phoneNumber)) {
      errorState.phoneNumber = "Kh??ng h???p l???!!";
    }
    return errorState;
  };

  const validatePass = () => {
    const errorState = {};
    // check validate
    if (isEmpty(formPassword.password)) {
      errorState.password = "Vui l??ng nh???p v??o, kh??ng ???????c ????? tr???ng!";
    }
    if (isEmpty(formPassword.newPassword)) {
      errorState.newPassword = "Vui l??ng nh???p v??o, kh??ng ???????c ????? tr???ng!";
    }
    if (isEmpty(formPassword.confirmNewPassword)) {
      errorState.confirmNewPassword = "Vui l??ng nh???p v??o, kh??ng ???????c ????? tr???ng!";
    } else {
      if (formPassword.newPassword !== formPassword.confirmNewPassword) {
        errorState.confirmNewPassword = "M???t kh???u x??c nh???n kh??ng kh???p!";
      }
    }
    return errorState;
  };

  return (
    <Modal
      className="modal-container modal-container-profile-admin"
      title="C???p nh???t th??ng tin"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    >
      <div className="my-profile-container">
        <div className="my-profile-container__inner">
          <Paper className="my-profile-container__inner-left">
            <img src={imageAvatar || NoImage} alt="" />
            <UploadImage onChangeImage={handleChangeImage} />
          </Paper>
          <div className="my-profile-container__inner-right flex flex-col">
            <Paper square className="my-profile-container__inner-right--tabs">
              <Tabs
                value={value}
                indicatorColor="secondary"
                // textColor="primary"
                onChange={handleChangeTab}
                aria-label="disabled tabs example"
              >
                <Tab label="Th??ng tin c?? nh??n" />
                <Tab label="C???p nh???t password" />
              </Tabs>
            </Paper>
            <Paper className="my-profile-container__inner-right--content">
              <div className="my-profile-container__inner-right--content__inner">
                {!value ? (
                  <ReForm style={{ height: 290 }}>
                    <div
                      className="flex items-center"
                      style={{ marginBottom: 12 }}
                    >
                      <label style={{ marginRight: 12 }}>H??? v?? t??n</label>
                      <FormBox
                        propsInput={{
                          name: "fullName",
                          placeholder: "H??? v?? t??n",
                          onChange: handleChangeInfo,
                          onFocus: handleFocusInfo,
                          value: formInfo.fullName,
                          disabled: false,
                        }}
                        error={errorInfo.fullName}
                      />
                    </div>
                    <div
                      className="flex items-center"
                      style={{ marginBottom: 12 }}
                    >
                      <label style={{ marginRight: 12 }}>Ng??y sinh</label>
                      <FormBox
                        propsInput={{
                          name: "dateOfBirth",
                          type: "date",
                          placeholder: "Ng??y sinh",
                          onChange: handleChangeInfo,
                          onFocus: handleFocusInfo,
                          max: moment(new Date()).format("YYYY-MM-DD"),
                          value: moment(formInfo.dateOfBirth).format(
                            "YYYY-MM-DD"
                          ),
                          disabled: false,
                        }}
                        error={errorInfo.dateOfBirth}
                      />
                    </div>
                    <div
                      className="flex items-center"
                      style={{ marginBottom: 12 }}
                    >
                      <label style={{ marginRight: 12 }}>S??? ??i???n tho???i</label>
                      <FormBox
                        propsInput={{
                          name: "phoneNumber",
                          placeholder: "S??? ??i???n tho???i",
                          onChange: handleChangeInfo,
                          onFocus: handleFocusInfo,
                          value: formInfo.phoneNumber,
                          disabled: false,
                        }}
                        error={errorInfo.phoneNumber}
                      />
                    </div>
                    <div
                      className="flex items-center"
                      style={{ marginBottom: 12 }}
                    >
                      <label style={{ marginRight: 12 }}>Email</label>
                      <FormBox
                        propsInput={{
                          name: "email",
                          placeholder: "Email",
                          onChange: handleChangeInfo,
                          onFocus: handleFocusInfo,
                          value: formInfo.email,
                          disabled: true,
                        }}
                        error={errorInfo.email}
                      />
                    </div>
                    <div
                      className="flex items-center"
                      style={{ marginBottom: 12 }}
                    >
                      <label style={{ marginRight: 12 }}>?????a ch???</label>
                      <FormBox
                        propsInput={{
                          name: "address",
                          placeholder: "?????a ch???",
                          onChange: handleChangeInfo,
                          onFocus: handleFocusInfo,
                          value: formInfo.address,
                          disabled: false,
                        }}
                        error={errorInfo.address}
                      />
                    </div>
                  </ReForm>
                ) : (
                  <ReForm style={{ height: 290 }}>
                    <div
                      className="flex items-center"
                      style={{ marginBottom: 12 }}
                    >
                      <label style={{ width: 220 }}>Password c??</label>
                      <FormBox
                        propsInput={{
                          name: "password",
                          type: "password",
                          placeholder: "Password c??",
                          onChange: handleChangePass,
                          onFocus: handleFocusPass,
                          value: formPassword.password,
                          disabled: false,
                        }}
                        error={errorPassword.password}
                      />
                    </div>
                    <div
                      className="flex items-center"
                      style={{ marginBottom: 12 }}
                    >
                      <label style={{ width: 220 }}>Password m???i</label>
                      <FormBox
                        propsInput={{
                          name: "newPassword",
                          type: "password",
                          placeholder: "Password m???i",
                          onChange: handleChangePass,
                          onFocus: handleFocusPass,
                          value: formPassword.newPassword,
                          disabled: false,
                        }}
                        error={errorPassword.newPassword}
                      />
                    </div>
                    <div
                      className="flex items-center"
                      style={{ marginBottom: 12 }}
                    >
                      <label style={{ width: 220 }}>
                        X??c nh???n password m???i
                      </label>
                      <FormBox
                        propsInput={{
                          name: "confirmNewPassword",
                          type: "password",
                          placeholder: "X??c nh???n password m???i",
                          onChange: handleChangePass,
                          onFocus: handleFocusPass,
                          value: formPassword.confirmNewPassword,
                          disabled: false,
                        }}
                        error={errorPassword.confirmNewPassword}
                      />
                    </div>
                  </ReForm>
                )}
                <div className="center full-width">
                  <button
                    className="btn btn-client btn--save"
                    onClick={(event) => {
                      console.log("On update");
                      if (!value) {
                        console.log("vo update profile");
                        event.preventDefault();
                        const errorState = validateInfo();
                        if (Object.keys(errorState).length > 0) {
                          return setErrorInfo(errorState);
                        }
                        // callAPI update info
                        dispatch(
                          updateProfile({
                            ...formInfo,
                            dateOfBirth: new Date(formInfo?.dateOfBirth),
                          })
                        );
                      } else {
                        event.preventDefault();
                        const errorState = validatePass();
                        if (Object.keys(errorState).length > 0) {
                          return setErrorPassword(errorState);
                        }
                        console.log("ChangePass");
                        dispatch(
                          changePassword({
                            oldPassword: formPassword?.password,
                            newPassword: formPassword?.newPassword,
                            confirmPassword: formPassword?.confirmNewPassword,
                          })
                        );
                      }
                    }}
                  >
                    C???p nh???t
                  </button>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      {profile?.loading && <SpinLoading />}
    </Modal>
  );
};

export default ModalProfileAdmin;
