import { Button, DialogActions, IconButton } from '@material-ui/core'
import React, { Component, Fragment } from 'react'

import FilterList from './FilterList'
import FilterListIcon from '@material-ui/icons/FilterList'
import FilterProperties from './FilterProperties'
import SimplePopover from '../Popover/SimplePopover'
import { Switch } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { togglePopover } from '../../store/actions/popoverAction'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
})

class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterCategories: [],
            isPopoverOpen: false,
            selectedFilterIndex: 0,
            options: [],
        }
    }

    changeFilterCategory = (index) => {
        this.setState({ selectedFilterIndex: index })
    }

    toggleCheckBox = (index, option) => {
        let { options } = this.state
        let array = options[index]
        const position = array.indexOf(option)
        if (position === -1) {
            array.push(option)
        } else {
            array.splice(position, 1)
        }
        options[index] = array
        this.setState({ options })
    }

    changeSliderRange = (index, valueRange) => {
        let { options } = this.state
        options[index] = valueRange
        this.setState({ options })
    }

    changeDate = (index, dateRange) => {
        let { options } = this.state
        options[index] = dateRange
        this.setState({ options })
    }

    handleFilterOpen = () => {
        const { filterCategories } = this.props
        const categories = JSON.parse(JSON.stringify(filterCategories))
        this.setState(
            {
                filterCategories: categories,
                selectedFilterIndex: 0,
            },
            () => {
                const options = this.state.filterCategories.map(
                    (option, index) => option.selected
                )
                this.setState({ options }, this.togglePopover(true))
            }
        )
    }

    handleFilterCancel = () => {
        this.togglePopover(false)
    }

    handleFilterSubmit = () => {
        let { filterCategories, options } = this.state
        filterCategories.forEach(
            (category, index) => (category.selected = options[index])
        )

        console.log(filterCategories)
        this.props.onFilterSubmit(filterCategories)
        this.togglePopover(false)
    }

    togglePopover = (isPopoverOpen) => {
        this.setState({ isPopoverOpen })
    }

    render() {
        const { classes, popupTitle } = this.props
        const {
            isPopoverOpen,
            options,
            selectedFilterIndex,
            filterCategories,
        } = this.state
        return (
            <Fragment>
                <IconButton
                    onClick={this.handleFilterOpen}
                    aria-label="filter list"
                >
                    <FilterListIcon />
                </IconButton>

                <SimplePopover
                    isPopoverOpen={isPopoverOpen}
                    popupTitle={popupTitle}
                    handleCancel={this.handleFilterCancel}
                    handleSubmit={this.handleFilterSubmit}
                    renderComponent={
                        <Fragment>
                            <div className={classes.root}>
                                <FilterList
                                    filterCategories={filterCategories}
                                    selectedIndex={selectedFilterIndex}
                                    onCategoryChange={this.changeFilterCategory}
                                />
                                <main className={classes.content}>
                                    <div className={classes.toolbar} />
                                    <FilterProperties
                                        selectedIndex={selectedFilterIndex}
                                        filterCategory={
                                            filterCategories[
                                                selectedFilterIndex
                                            ]
                                        }
                                        selectedOptions={
                                            options[selectedFilterIndex]
                                        }
                                        toggleCheckBox={this.toggleCheckBox}
                                        changeSliderRange={
                                            this.changeSliderRange
                                        }
                                        handleDateChange={this.changeDate}
                                    />
                                </main>
                            </div>
                        </Fragment>
                    }
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({})

export default connect(
    mapStateToProps,
    {}
)(withStyles(useStyles, { withTheme: true })(Filters))
