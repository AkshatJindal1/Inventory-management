import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import { Send, CloudUpload, Delete, Save, Add } from '@material-ui/icons';

const CustomButton = withStyles((theme) => ({
  // root: {
  //   backgroundColor: "#262626",
  //   '&:hover': {
  //     backgroundColor: "#404040",
  //   },
  // },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedButtons(props) {
  const classes = useStyles();

  const {
    id,
    buttonType,
    handleSubmit,
    children
  } = props;

  const buttonIcon = (buttonType) => {
    if (buttonType === 'upload') return <CloudUpload />
    else if (buttonType === 'delete') return <Delete />
    else if (buttonType === 'save') return <Save />
    else if (buttonType === 'send') return <Send />
    else if (buttonType === 'add') return <Add />
    return null;
  }

  return (
    <CustomButton variant="contained" color="primary" onClick={handleSubmit} id={id} className={classes.margin} startIcon={buttonIcon(buttonType)}>
      {children}
    </CustomButton>
  );
}
