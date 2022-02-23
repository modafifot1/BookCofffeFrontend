import React from "react";
import { Dropdown, Button, Menu, Avatar } from "antd";
import { ArrowDropDown } from "@material-ui/icons";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
// import { setToken, setUserDetail } from "redux/actions/common";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getRoleName } from "../../utils/convertUtils";
import { logout } from "../../redux/slices/authSlice";

export default function AvatarMenu({ openModalProfile }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const handleMenuClick = (e) => {
    if (Number(e.key) === 1) {
      Cookies.remove("token");
      Cookies.remove("profile");
      dispatch(logout());
      history.push("/login");
    } else {
      openModalProfile();
    }
  };
  console.log(user);
  return (
    <Dropdown
      overlay={() => (
        <Menu onClick={handleMenuClick} className="menu-header-admin">
          {[
            {
              name: "Hồ sơ cá nhân",
              icon: <AccountBoxIcon color="action" />,
            },
            {
              name: "Đăng xuất",
              icon: <PowerSettingsNewIcon color="action" />,
            },
          ].map((o, index) => (
            <Menu.Item key={index} className="flex">
              {o.icon}
              {o.name}
            </Menu.Item>
          ))}
        </Menu>
      )}
      className="btn-avatar-menu"
    >
      <Button className="flex">
        <Avatar
          alt={user?.fullName}
          src={
            user?.imageUrl ||
            "https://res.cloudinary.com/duc/image/upload/v1642704006/avatardefault_ux3ryj.png"
          }
        />
        <div className="flex flex-col align-flex-start block-infor-user">
          <span className="block-infor-user--name">
            {user?.fullName || "Unknown"}
          </span>
          <span className="block-infor-user--role">
            {getRoleName(user?.roleId) || "Unknown"}
          </span>
        </div>
        <ArrowDropDown color="action" />
      </Button>
    </Dropdown>
  );
}
