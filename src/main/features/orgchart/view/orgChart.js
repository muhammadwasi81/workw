import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import userDefault from '../../content/user_default.jpg';
import $ from 'jquery';

// import organization from "./org.json";

import {
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { API } from "../../utils/services";
import { BlockedPage, getUserDataFromStorage, RightsVerification, STRINGS } from "../../utils/base";
import Spinner from "../spinner/spinner";
import { UploadXLSX } from "./uploadXLSX";


const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    display: "inline-block",
    borderRadius: 16,
  },
  expand: {
    transform: "rotate(0deg)",
    marginTop: -10,
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#ECECF4",
  },
}));

function Organization({ org, onCollapse, collapsed }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [isOpenCollapsed, setIsOpenCollapsed] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let backgroundColor = "white";

  return (
    <div>
      <CardHeader
        style={{ display: "block", marginRight: '0px', padding: "0px" }}
        avatar={
          <Badge
          >
            <Avatar className={classes.avatar} style={{ marginBottom: '10px' }}>
              <img src={org.profile_picture ? org.profile_picture : userDefault} alt="s" width="100%" />
            </Avatar>
          </Badge>
        }
        title={
          <div className="PersonBox">
            <span>{org.name}</span> <br />
            <span>{org.designation}</span>
          </div>}

      />

      {
        org.childrens.length !== 0 && <IconButton
          style={{ outline: "none" }}
          size="small"
          onClick={onCollapse}
          className={clsx(classes.expand, {
            [classes.expandOpen]: !collapsed,
          })}
        >
          <ExpandMoreIcon />
        </IconButton>
      }

    </div>
  );
}
let isOpenCollapsed = false;
function Node({ o, parent }) {
  console.log(o)
  console.log(parent, "Testing");
  const [collapsed, setCollapsed] = React.useState(isOpenCollapsed);
  if (!isOpenCollapsed){
    isOpenCollapsed = true;
  }
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  React.useEffect(() => {
    o.collapsed = collapsed;
  });
  const T = parent
    ? TreeNode
    : (props) => (
      <Tree
        {...props}
        lineWidth={"2px"}
        lineColor={"#bbc"}
        lineBorderRadius={"12px"}
      >
        {props.children}
      </Tree>
    );
  return collapsed ? (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    />
  ) : (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    >
      {
        o.childrens && o.childrens.map((item) => (
          <Node o={item} parent={o} />
        ))
      }

    </T>
  );
}
const theme = createMuiTheme({
  palette: {
    background: "#ECECF4",
  },
  fontFamily: "Roboto, sans-serif",
});

export function OrgChart(props) {

  let defaultState = {
    profile_picture: getUserDataFromStorage("businessLogo"),
    name: getUserDataFromStorage("businessName"),
    designation: "",
    childrens: []
  }
  // const [isOpenCollapsed, setIsOpenCollapsed] = useState(true)
  const [chartData, setChartData] = useState(defaultState)
  const [isAccessVerify, setIsAccessVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getChartData = () => {
    API.COMPANIES.getOrgChart({}).then((res) => {
      let { status, error, data } = res
      if (status) {
        setChartData({ ...chartData, childrens: data })
      }
      else {
        alert(error)
      }
    })
      .catch((err) => alert(err))
  }
  const accessVerify = async () => {
    let result = await RightsVerification(0)
    let { status, data, error } = result
    if (status) {
      setIsAccessVerify(data)
      setIsLoading(false)
    }
    else {
      setIsLoading(false)
      alert(error)
    }
  }
  useEffect(() => {
    accessVerify()
    getChartData();
    $('.section').css('overflow', 'auto');
    return () =>{
      isOpenCollapsed = false
    }
  }, [])

  console.log(getUserDataFromStorage("businessName"))
  return (
    <>
      {isAccessVerify ?
        <Box bgcolor="background" padding={4} height="80vh">
          {/* <UploadXLSX /> */}
          <Node o={chartData} />
        </Box>
        :
        isLoading ? <Spinner /> : <BlockedPage />
      }
    </>
  );
}
