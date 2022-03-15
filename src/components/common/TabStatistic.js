import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { COURSES_DATA, FOODS_DATA, RECIPES_DATA } from "../../utils/dummyData";
import DevelopIcon from "../../assets/icons/develop.png";
import { Rating } from "@material-ui/lab";
import GroupIcon from "@material-ui/icons/Group";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "auto",
  },
}));

export default function TabsStatistic() {
  const { revenuesInfo, generalInfo } = useSelector((state) => state.statistic);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Mặt hàng phổ biến" {...a11yProps(0)} />
          <Tab label="Sách yêu thích" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        className="body-tabs-statistic"
        style={{ maxHeight: 600 }}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {generalInfo.popularFoods.map((food, index) => {
            if (food)
              return (
                <div key={index} className="item-favorite-block">
                  <img
                    style={{ width: 80, height: 80, borderRadius: 12 }}
                    src={food.imageUrl}
                    alt=""
                  />
                  <span style={{ width: 120, fontSize: 16 }}>{food.name}</span>
                  <span>
                    Lượt mua: {food.amountOfBuy}
                    <img
                      style={{
                        marginLeft: 4,
                        marginBottom: 8,
                        width: 44,
                        height: 44,
                      }}
                      src={DevelopIcon}
                      alt=""
                    />
                  </span>
                </div>
              );
          })}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {generalInfo.popularBorrowedBooks.map((r, index) => (
            <div key={index} className="item-favorite-block">
              <img
                style={{ width: 80, height: 80, borderRadius: 12 }}
                src={r.imageUrl}
                alt=""
              />
              <span style={{ width: 100, fontSize: 16 }}>{r.title}</span>
              <span
                style={{ display: "flex", alignItems: "center", fontSize: 16 }}
              >
                Lượt đánh giá:{" "}
                <Rating style={{ marginLeft: 4 }} value={r.rating} />
              </span>
            </div>
          ))}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
