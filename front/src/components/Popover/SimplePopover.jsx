import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Navigation } from "@material-ui/icons";
import NavBar from "../NavBar";
import MUIDataTable from "mui-datatables";
import { IconButton, Box } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import Filter from "../Filters";

export default function SimplePopover() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      name: "productId",
      label: "Product ID",
      options: {
        filter: true,
      },
    },
    {
      name: "productName",
      label: "Name",
      options: {
        filter: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
      },
    },
    {
      name: "cost",
      label: "Cost",
      options: {
        filter: true,
      },
    },
    {
      name: "productDetails.size",
      label: "Size",
      options: {
        filter: true,
      },
    },
    {
      name: "quantityInStock",
      label: "Quantity In Stock",
      options: {
        filter: true,
      },
    },
    {
      name: "ratings",
      label: "Ratings",
      empty: true,
    },
  ];
  let data = [
    {
      _id: "5f41e74ea21fb8798d114d1d",
      productId: "1001",
      productName: "T-Shirt",
      description: "Blue t-shirt",
      cost: 235.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e759a21fb8798d114d1f",
      productId: "1002",
      productName: "T-Shirt",
      description: "Yellow t-shirt",
      cost: 236.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e74ea21fb8798d114d1d",
      productId: "1003",
      productName: "T-Shirt",
      description: "Blue t-shirt",
      cost: 237.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e759a21fb8798d114d1f",
      productId: "1004",
      productName: "T-Shirt",
      description: "Yellow t-shirt",
      cost: 236.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e74ea21fb8798d114d1d",
      productId: "1005",
      productName: "T-Shirt",
      description: "Blue t-shirt",
      cost: 234.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e759a21fb8798d114d1f",
      productId: "1006",
      productName: "T-Shirt",
      description: "Yellow t-shirt",
      cost: 234.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e74ea21fb8798d114d1d",
      productId: "1007",
      productName: "T-Shirt",
      description: "Blue t-shirt",
      cost: 234.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e759a21fb8798d114d1f",
      productId: "1008",
      productName: "T-Shirt",
      description: "Yellow t-shirt",
      cost: 234.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e74ea21fb8798d114d1d",
      productId: "1009",
      productName: "T-Shirt",
      description: "Blue t-shirt",
      cost: 234.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e759a21fb8798d114d1f",
      productId: "10010",
      productName: "T-Shirt",
      description: "Yellow t-shirt",
      cost: 234.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e74ea21fb8798d114d1d",
      productId: "10011",
      productName: "T-Shirt",
      description: "Blue t-shirt",
      cost: 234.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e759a21fb8798d114d1f",
      productId: "10012",
      productName: "T-Shirt",
      description: "Yellow t-shirt",
      cost: 234.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e74ea21fb8798d114d1d",
      productId: "10013",
      productName: "T-Shirt",
      description: "Blue t-shirt",
      cost: 234.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
    {
      _id: "5f41e759a21fb8798d114d1f",
      productId: "10014",
      productName: "T-Shirt",
      description: "Yellow t-shirt",
      cost: 234.0,
      productDetails: {
        size: "M",
      },
      quantityInStock: 780,
      ratings: null,
    },
  ];

  return (
    <div>
      <IconButton onClick={handleClickOpen} aria-label="filter list">
        <FilterListIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Filter</DialogTitle>

        {/* <MUIDataTable title={"Employee List"} data={data} columns={columns} /> */}

        <Box m={2}>
          <Filter />
        </Box>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
