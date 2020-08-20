import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import clsx from "clsx";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { toggleDrawer } from "../../store/actions/appAction";

const drawerWidth = 240;

const useStyles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
});

class MiniDrawer extends Component {
  handleDrawerClose = () => {
    this.props.toggleDrawer();
  };

  responsiveDrawer = () => {
    const { width } = this.props;

    const isSmallScreen = /xs/.test(width);
    var drawerProps = {
      variant: isSmallScreen ? "tempporary" : "permanent",
    };
    if (isSmallScreen)
      drawerProps = {
        open: this.props.isDrawerOpen,
        onClose: this.handleDrawerClose,
        ...drawerProps,
      };
    return drawerProps;
  };

  render() {
    const { classes, isDrawerOpen } = this.props;
    return (
      <Fragment>
        <Drawer
          {...this.responsiveDrawer()}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isDrawerOpen,
            [classes.drawerClose]: !isDrawerOpen,
          })}
          classes={{
            paper: clsx(classes.drawer, {
              [classes.drawerOpen]: isDrawerOpen,
              [classes.drawerClose]: !isDrawerOpen,
            }),
          }}
        >
          <List>
            {["MY APP"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isDrawerOpen: state.app.isDrawerOpen,
});

export default connect(mapStateToProps, { toggleDrawer })(
  withWidth()(withStyles(useStyles, { withTheme: true })(MiniDrawer))
);
