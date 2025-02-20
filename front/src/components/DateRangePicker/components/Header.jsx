import {
    Grid,
    IconButton,
    MenuItem,
    Select,
    WithStyles,
    createStyles,
    withStyles,
} from '@material-ui/core'
import React, { Component } from 'react'
import { getMonth, getYear, setMonth, setYear } from 'date-fns'

import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'

const styles = createStyles({
    iconContainer: {
        padding: 5,
    },
    icon: {
        padding: 10,
        '&:hover': {
            background: 'none',
        },
    },
})

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
]

const generateYears = (relativeTo, count) => {
    const half = Math.floor(count / 2)
    return Array(count)
        .fill(0)
        .map((y, i) => relativeTo.getFullYear() - half + i) // TODO: make part of the state
}

class Header extends Component {
    handleMonthChange = (event) => {
        const { date } = this.props
        this.props.setDate(setMonth(date, parseInt(event.target.value)))
    }

    handleYearChange = (event) => {
        const { date } = this.props
        this.props.setDate(setYear(date, parseInt(event.target.value)))
    }

    render() {
        const {
            date,
            classes,
            setDate,
            nextDisabled,
            prevDisabled,
            onClickNext,
            onClickPrevious,
        } = this.props

        return (
            <Grid container justify="space-between" alignItems="center">
                <Grid item className={classes.iconContainer}>
                    <IconButton
                        className={classes.icon}
                        disabled={prevDisabled}
                        onClick={onClickPrevious}
                    >
                        <ChevronLeft
                            color={prevDisabled ? 'disabled' : 'action'}
                        />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Select
                        value={getMonth(date)}
                        onChange={this.handleMonthChange}
                        MenuProps={{ disablePortal: true }}
                    >
                        {MONTHS.map((month, idx) => (
                            <MenuItem key={month} value={idx}>
                                {month}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item>
                    <Select
                        value={getYear(date)}
                        onChange={this.handleYearChange}
                        MenuProps={{ disablePortal: true }}
                    >
                        {generateYears(date, 30).map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
                </Grid>
                <Grid item className={classes.iconContainer}>
                    <IconButton
                        className={classes.icon}
                        disabled={nextDisabled}
                        onClick={onClickNext}
                    >
                        <ChevronRight
                            color={nextDisabled ? 'disabled' : 'action'}
                        />
                    </IconButton>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Header)
