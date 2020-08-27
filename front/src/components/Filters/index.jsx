import { Button, DialogActions, IconButton } from '@material-ui/core'
import React, { Component, Fragment } from 'react'

import FilterList from './FilterList'
import FilterListIcon from '@material-ui/icons/FilterList'
import FilterProperties from './FilterProperties'
import SimplePopover from '../Popover/SimplePopover'
import { Switch } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { changeFilterOption } from '../../store/actions/filterAction'
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
            options: [],
        }
    }

    componentDidMount() {
        const { filterOptions } = this.props
        let options = filterOptions.map((option, index) => option.selected)
        this.setState({ options })
    }

    toggleCheckBox = (index, option) => {
        let { options } = this.state
        const array = options[index]
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

    handleFilterOpen = () => {
        this.props.togglePopover(true)
    }

    handleFilterClose = () => {
        this.props.togglePopover(false)
    }

    changeDate = (index, fromOrTo, newDate) => {
        let { options } = this.state
        options[index][fromOrTo] = newDate
        this.setState({ options })
    }

    render() {
        const {
            classes,
            filterOptions,
            selectedFilterIndex,
            changeFilterOption,
            togglePopover,
            isPopoverOpen,
        } = this.props
        const { options } = this.state
        console.log(options)
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
                    popupTitle="Filters"
                    togglePopover={togglePopover}
                    handleFilterCancel={this.handleFilterClose}
                    handleFilterSubmit={this.handleFilterClose}
                    renderComponent={
                        <Fragment>
                            <div className={classes.root}>
                                <FilterList
                                    filterOptions={filterOptions}
                                    selectedIndex={selectedFilterIndex}
                                    onChangeOption={changeFilterOption}
                                />
                                <main className={classes.content}>
                                    <div className={classes.toolbar} />
                                    <FilterProperties
                                        selectedIndex={selectedFilterIndex}
                                        filterOption={
                                            filterOptions[selectedFilterIndex]
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

const mapStateToProps = (state) => ({
    selectedFilterIndex: state.filter.selectedFilterIndex,
    isPopoverOpen: state.popover.isPopoverOpen,
})

export default connect(mapStateToProps, { changeFilterOption, togglePopover })(
    withStyles(useStyles, { withTheme: true })(Filters)
)
