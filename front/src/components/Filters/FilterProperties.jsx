import 'date-fns'

import {
    Checkbox,
    Drawer,
    FormControlLabel,
    Typography,
} from '@material-ui/core'
import {
    DatePicker,
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import React, { Component, Fragment } from 'react'

import DateRangePicker from '../DateRangePicker'
import Divider from '@material-ui/core/Divider'
import DraftsIcon from '@material-ui/icons/Drafts'
import Grid from '@material-ui/core/Grid'
import InboxIcon from '@material-ui/icons/Inbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Slider from '@material-ui/core/Slider'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
})
const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'
const IOSSlider = withStyles({
    root: {
        color: '#3880ff',
        height: 2,
        padding: '15px 0',
    },
    thumb: {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        marginTop: -14,
        marginLeft: -14,
        '&:focus, &:hover, &$active': {
            boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 12px)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    track: {
        height: 2,
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
})(Slider)

class FilterProperties extends Component {
    state = {
        calendarOpen: true,
        dateRange: {},
    }
    getRenderType = () => {
        const { filterCategory } = this.props
        const dataType = filterCategory.options.dataType
        const isContinuous = filterCategory.options.isContinuous

        if (dataType === 'string') return 'checkbox'
        if (dataType === 'number' && isContinuous) return 'slider'
        if (dataType === 'number' && !isContinuous) return 'checkbox'
        if (dataType === 'date') return 'datePicker'
    }

    isOptionSelected = (selectedArray, option) => {
        return selectedArray.includes(option)
    }

    onOptionClick = (index, option) => {
        this.props.toggleCheckBox(index, option)
    }

    handleSliderChange = (event, newValueRange) => {
        const { selectedIndex } = this.props
        this.props.changeSliderRange(selectedIndex, newValueRange)
    }

    renderCheckbox = (category, selectedItems, index) => {
        const {
            options: { optionList },
        } = category
        return (
            <List>
                {optionList.map((option, ind) => (
                    <ListItem key={ind}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.isOptionSelected(
                                        selectedItems,
                                        option
                                    )}
                                    onChange={() =>
                                        this.onOptionClick(index, option)
                                    }
                                    inputProps={{
                                        'aria-label': 'primary checkbox',
                                    }}
                                />
                            }
                            label={option}
                        />
                    </ListItem>
                ))}
            </List>
        )
    }

    renderSlider = (valueRange) => {
        console.log(valueRange)
        return (
            <IOSSlider
                value={valueRange}
                onChange={this.handleSliderChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
            />
        )
    }
    handleFromDateChange = (event, newDate) => {
        const { selectedIndex } = this.props
        this.props.handleDateChange(selectedIndex, 0, newDate)
    }
    handleToDateChange = (event, newDate) => {
        const { selectedIndex } = this.props
        this.props.handleDateChange(selectedIndex, 1, newDate)
    }

    renderDateRangePicker = (selectedDate) => {
        return (
            <DateRangePicker
                paperElevation={0}
                open={this.state.calendarOpen}
                onChange={(range) => this.setState({ dateRange: range })}
            />
            // <MuiPickersUtilsProvider utils={DateFnsUtils}>
            //     <Grid container justify="space-around">
            //         <KeyboardDatePicker
            //             variant="inline"
            //             format="MM/dd/yyyy"
            //             margin="normal"
            //             label="From Date"
            //             value={selectedDate[0] || new Date()}
            //             onChange={this.handleFromDateChange}
            //             KeyboardButtonProps={{
            //                 'aria-label': 'change from date',
            //             }}
            //         />
            //         <KeyboardDatePicker
            //             variant="inline"
            //             format="MM/dd/yyyy"
            //             margin="normal"
            //             label="To Date"
            //             value={selectedDate[1] || new Date()}
            //             onChange={this.handleToDateChange}
            //             KeyboardButtonProps={{
            //                 'aria-label': 'change to date',
            //             }}
            //         />
            //     </Grid>
            // </MuiPickersUtilsProvider>
        )
    }

    render() {
        const { selectedIndex, filterCategory, selectedOptions } = this.props

        return (
            <Typography>
                {this.getRenderType() === 'checkbox'
                    ? this.renderCheckbox(
                          filterCategory,
                          selectedOptions,
                          selectedIndex
                      )
                    : null}
                {this.getRenderType() === 'slider'
                    ? this.renderSlider(selectedOptions)
                    : null}
                {this.getRenderType() === 'datePicker'
                    ? this.renderDateRangePicker(selectedOptions)
                    : null}
            </Typography>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(FilterProperties)
