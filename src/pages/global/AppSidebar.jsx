import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";

const list = [
  {
    component: "Dashboard",
    path: "/dashboard",
    children: "",
    icon: <DashboardIcon />,
  },
  {
    component: "Manage Entries",
    path: "/",
    children: "",
    icon: <RuleFolderIcon />,
  },
  {
    component: "Settings",
    path: "",
    children: [
      {
        component: "Profile",
        path: "/profile",
        children: "",
        icon: <PersonOutlinedIcon />,
      },
    ],
    icon: <SettingsIcon />,
  },
];

const AppSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collapseSidebar, collapsed } = useProSidebar();
  return (
    <Sidebar
      className="pro-sidebar"
      width="185px"
      collapsedWidth="70px"
      backgroundColor={colors.primary[400]}
      rootStyles={{ border: "none"}}
    >
      <Menu
        menuItemStyles={{
          button: ({ active, disabled }) => {
            return {
              backgroundColor: active
                ? colors.primary[300]
                : colors.primary[400],
              "&:hover": {
                backgroundColor: colors.primary[300],
              },
            };
          },
        }}
      >
        <MenuItem
          rootStyles={{
            fontWeight: "bolder",
            fontSize: "larger",
          }}
          key="logo-png"
        >
          <br />
          <Box sx={{ textAlign: "center" }}>
            <IconButton
              onClick={() => {
                collapseSidebar();
              }}
            >
              {collapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
            </IconButton>
          </Box>
          <br />
        </MenuItem>
        {list.map((item) => {
          return (
            <>
              {item.children !== "" ? (
                <SubMenu
                  icon={item.icon}
                  label={item.component}
                  key={item.component}
                >
                  {item.children.map((child) => (
                    <MenuItem icon={child.icon} key={child.component} component={<Link to={child.path} />}>
                      {child.component}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                  icon={item.icon}
                  key={item.component}
                  component={<Link to={item.path} />}
                  
                >
                 {item.component}
                </MenuItem>
              )}
            </>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default AppSidebar;
