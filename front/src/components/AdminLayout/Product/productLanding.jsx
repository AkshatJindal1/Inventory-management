import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import MUIDataTable from 'mui-datatables'
import Loader from '../../Loader'
import IconButton from '@material-ui/core/IconButton'
import { Delete, Add, Edit, Visibility } from '@material-ui/icons'
import GridContainer from '../../Grid/GridContainer'
import GridItem from '../../Grid/GridItem'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Controls from '../../Controls/Controls'

import { getTable, deleteForms } from '../../../store/actions/formAction'

const useStyles = (theme) => ({
    margins: {
        paddingBottom: '00px',
        margin: '20px 0 0 0',
        position: 'relative',
        verticalAlign: 'unset',
    },
    marginTop: {
        marginTop: '10px',
    },
})

export class ProductLanding extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allProductForms: [],
            allOptionForms: [],
            loading: true,
            error: true,
            redirectTo: null,
        }
    }

    onSuccess = (response) => {
        this.setState({
            allProductForms: response.first,
            allOptionForms: response.second,
            loading: false,
            error: false,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    removeFromForms = (data) => {
        const invalidUids = data.map((form) => form.uid)
        const allOptionForms = this.state.allOptionForms.filter((form) => {
            return !invalidUids.includes(form.uid)
        })
        const allProductForms = this.state.allProductForms.filter((form) => {
            return !invalidUids.includes(form.uid)
        })
        this.setState({ allOptionForms, allProductForms })
    }

    deleteForms = (data) => {
        this.props.deleteForms(
            (data) => this.removeFromForms(data),
            () => {
                alert('An Error Occured, Please try again in some time')
            },
            data
        )
    }

    componentWillMount() {
        this.props.getTable(this.onSuccess, this.onError)
    }

    getProductData = (options) => {
        let formShort
        if (options === 'options') formShort = this.state.allOptionForms
        else formShort = this.state.allProductForms

        return formShort.map((form, index) => {
            const editUrl = `/structure/${options}/${form.url}`
            const addUrl = `/form/${options}/${form.url}`
            return [
                form.name,
                <>
                    <IconButton aria-label="delete">
                        <Delete onClick={() => this.deleteForms([form.uid])} />
                    </IconButton>
                    <Link to={addUrl}>
                        <IconButton aria-label="add">
                            <Add />
                        </IconButton>
                    </Link>
                    <Link to={editUrl}>
                        <IconButton aria-label="edit">
                            <Edit />
                        </IconButton>
                    </Link>
                    <Link to={editUrl}>
                        <IconButton aria-label="edit">
                            <Visibility />
                        </IconButton>
                    </Link>
                </>,
            ]
        })
    }

    changeLocation = (data, rowMeta) => {
        console.log(data, rowMeta)
        // TODO Assuming Option Name and Product name are also unique

        // let options =
        //     this.state.allOptionForms[rowMeta.rowIndex].name == data[0]
        //         ? 'options'
        //         : 'products'

        // console.log(options)

        // this.setState({ allOptionForms, allProductForms })
    }

    render() {
        const { classes } = this.props

        if (this.state.loading) return <Loader />
        else if (this.state.error)
            return <span>{'An Error Occured, or page not found'}</span>
        else {
            const columns = ['Name', 'Actions']
            const options = {
                download: false,
                filter: false,
                print: false,
                viewColumns: false,
                onRowsDelete: (rowsDeleted) => {
                    for (var key in rowsDeleted.data) {
                        console.log(key)
                        // this.removeItem(
                        //     this.state.item_id[rowsDeleted.data[key].dataIndex]
                        // ).then((res) => {
                        //     if (res != true) {
                        //         // ???
                        //     }
                        // })
                    }
                    console.log(rowsDeleted, 'were deleted!')
                },
            }

            const addFormUrl = (options) => `/structure/${options}/`

            return (
                <GridContainer spacing={3}>
                    <GridItem xs={12} sm={12} md={6} spacing={3}>
                        <MUIDataTable
                            className={classes.margins}
                            title={'Product Forms'}
                            data={this.getProductData('products')}
                            columns={columns}
                            options={options}
                        />
                        <Link to={addFormUrl('products')}>
                            <Controls.Button
                                text="Add Another Form"
                                className={classes.marginTop}
                            />
                        </Link>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} spacing={3}>
                        <MUIDataTable
                            className={classes.margins}
                            title={'Option Forms'}
                            data={this.getProductData('options')}
                            columns={columns}
                            options={options}
                        />
                        <Link to={addFormUrl('options')}>
                            <Controls.Button
                                text="Add Another Form"
                                className={classes.marginTop}
                            />
                        </Link>
                    </GridItem>
                    {this.state.redirectTo}
                </GridContainer>
            )
        }
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, { getTable, deleteForms })(
    withStyles(useStyles, { withTheme: true })(ProductLanding)
)
