import Typography from "@material-ui/core/Typography";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getAllProducts } from "../../../store/actions/productAction";
import Table from "../../Table/Table";

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

  render() {
    const { order, orderBy } = this.state;
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
        <Table
          tableHeaderColor="primary"
          tableHead={["Name", "Country", "City", "Salary"]}
          tableData={[
            ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
            ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
            ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
            ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
            ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
            ["Mason Porter", "Chile", "Gloucester", "$78,615"],
          ]}
          order={order}
          orderBy={orderBy}
          onRequestSort={this.handleRequestSort}
        />
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
