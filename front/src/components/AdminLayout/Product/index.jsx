import Typography from "@material-ui/core/Typography";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getAllProducts } from "../../../store/actions/productAction";
import Table from "../../Table/Table";
import MUIDataTable from "mui-datatables";
import { Card, Button } from "@material-ui/core";

const RenderRow = (props) => {
  return props.keys.map((key, index) => {
    return <td key={props.data[key]}>{props.data[key]}</td>;
  });
};

export class ProductLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "0",
    };
  }
  componentWillMount() {
    this.props.getAllProducts();
  }

  getKeys = () => {
    return Object.keys(this.props.products[0]);
  };

  getHeader = () => {
    const keys = this.getKeys();
    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th>;
    });
  };

  getRowsData = () => {
    const items = this.props.products;
    const keys = this.getKeys();
    return items.map((row, index) => {
      return (
        <tr key={index}>
          <RenderRow key={index} data={row} keys={keys} />
        </tr>
      );
    });
  };

  renderTable = () => {
    return (
      <Component>
        <table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>{this.getRowsData()}</tbody>
        </table>
      </Component>
    );
  };

  setOrder = (isAscending) => {
    isAscending
      ? this.setState({ order: "desc" })
      : this.setState({ order: "asc" });
  };

  setOrderBy = (property) => {
    this.setState({ orderBy: property });
  };

  handleRequestSort = (event, property) => {
    const { order, orderBy } = this.state;
    const isAsc = orderBy === property && order === "asc";
    this.setOrder(isAsc);
    this.setOrderBy(property);
  };

  handlePageChange = () => {};

  handleFilterSubmit = (applyFilters) => {
    applyFilters();

    // this.setState({ isLoading: true });

    // // fake async request
    // this.xhrRequest(`/myApiServer?filters=${filterList}`, filterList).then(
    //   (res) => {
    //     this.setState({ isLoading: false, data: res.data });
    //   }
    // );
  };

  render() {
    const { order, orderBy } = this.state;
    const columns = [
      {
        name: "Name",
        options: {
          filter: true,
          display: "excluded",
        },
      },
      {
        label: "Modified Title Label",
        name: "Title",
        options: {
          filter: true,
        },
      },
      {
        name: "Location",
        options: {
          filter: false,
        },
      },
      {
        name: "Age",
        options: {
          filter: true,
        },
      },
      {
        name: "Salary",
        options: {
          filter: true,
          sort: false,
        },
      },
    ];

    const data = [
      ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
      ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
      ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
      ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
      ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
      [
        "Blake Duncan",
        "Business Management Analyst",
        "San Diego",
        65,
        "$94,000",
      ],
      ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
      ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
      ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
      ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
      ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
      ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
      ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
      ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
      ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
      [
        "Addison Navarro",
        "Business Management Analyst",
        "New York",
        50,
        "$295,000",
      ],
      ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
      ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
      ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
      ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
      ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
      ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
      ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
      ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
      ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
      ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
      ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
      ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
      [
        "Gabby Strickland",
        "Business Process Consultant",
        "Scottsdale",
        26,
        "$45,000",
      ],
      ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"],
    ];

    const options = {
      // https://github.com/gregnb/mui-datatables
      filterType: "checkbox",
      caseSensitive: false,
      download: true,
      downloadOptions: {
        filename: "Product.csv",
        seperator: ",",
        filterOptions: {
          useDisplayedColumnsOnly: false,
          useDisplayedRowsOnly: false,
        },
      },
      elevation: 0,
      enableNestedDataAccess: ".",
      filter: true,
      fixedHeader: true,
      jumpToPage: true,
      confirmFilters: true,

      // Calling the applyNewFilters parameter applies the selected filters to the table
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              onClick={() => this.handleFilterSubmit(applyNewFilters)}
            >
              Apply Filters
            </Button>
          </div>
        );
      },
      onChangePage: this.handlePageChange,
      onChangeRowsPerPage: this.handlePageChange,
      onColumnSortChange: this.handlePageChange,
      onDownload: this.handlePageChange,
      onFilterChange: this.handlePageChange,
      onFilterConfirm: this.handleFilterSubmit,
      onRowClick: this.handlePageChange,
      onRowsDelete: this.handlePageChange,
      pagination: true,
      print: true,
      responsive: "vertical", // stacked, vertica, simple
      rowHover: true,
      rowsPerPage: 5,
      rowsPerPageOptions: [2, 5, 10],
      search: true,
      searchPlaceholder: "Enter the searcg text",
      searchOpen: false,
      selectableRows: "multiple", //multiple, single, none
      selectToolbarPlacement: "replace", //replace, above, none
      sort: true,
      viewColumns: true,
    };
    return (
      <Fragment>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        {/* <Table
          tableHeaderColor="primary"
          tableHead={["Id", "Name", "Country", "City", "Salary"]}
          tableData={[
            ["1", "Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
            ["2", "Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
            ["3", "Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
            ["4", "Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
            [
              "5",
              "Doris Greene",
              "Malawi",
              "Feldkirchen in Kärnten",
              "$63,542",
            ],
            ["6", "Mason Porter", "Chile", "Gloucester", "$78,615"],
          ]}
          order={order}
          orderBy={orderBy}
          onRequestSort={this.handleRequestSort}
          heading="Products"
        /> */}
        <Card variant="outlined">
          <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
          />
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.allProducts,
});

export default connect(mapStateToProps, {
  getAllProducts,
})(ProductLanding);
