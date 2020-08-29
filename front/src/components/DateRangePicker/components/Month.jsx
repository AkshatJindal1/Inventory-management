import {
    Grid,
    Paper,
    Typography,
    createStyles,
    withStyles,
} from '@material-ui/core'
import React, { Component } from 'react'
import {
    chunks,
    getDaysInMonth,
    inDateRange,
    isEndOfRange,
    isRangeSameDay,
    isStartOfRange,
} from '../utils'
import { format, getDate, isSameMonth, isToday, isWithinRange } from 'date-fns'

import Day from './Day'
import Header from './Header'

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const styles = (theme) =>
    createStyles({
        root: {
            width: 290,
        },
        weekDaysContainer: {
            marginTop: 10,
            paddingLeft: 30,
            paddingRight: 30,
        },
        daysContainer: {
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 15,
            marginBottom: 20,
        },
    })

class Month extends Component {
    render() {
        const {
            classes,
            inHoverRange,
            onDayClick,
            onDayHover,
            onMonthNavigate,
            value: date,
            dateRange,
            marker,
            setValue: setDate,
            minDate,
            maxDate,
        } = this.props

        const [back, forward] = this.props.navState
        return (
            <Paper square elevation={0} className={classes.root}>
                <Grid container>
                    <Header
                        date={date}
                        setDate={setDate}
                        nextDisabled={!forward}
                        prevDisabled={!back}
                        onClickPrevious={() => onMonthNavigate(marker, -1)}
                        onClickNext={() => onMonthNavigate(marker, 1)}
                    />

                    <Grid
                        item
                        container
                        direction="row"
                        justify="space-between"
                        className={classes.weekDaysContainer}
                    >
                        {WEEK_DAYS.map((day) => (
                            <Typography
                                color="textSecondary"
                                key={day}
                                variant="caption"
                            >
                                {day}
                            </Typography>
                        ))}
                    </Grid>

                    <Grid
                        item
                        container
                        direction="column"
                        justify="space-between"
                        className={classes.daysContainer}
                    >
                        {chunks(getDaysInMonth(date), 7).map((week, idx) => (
                            <Grid
                                key={idx}
                                container
                                direction="row"
                                justify="center"
                            >
                                {week.map((day) => {
                                    const isStart = isStartOfRange(
                                        dateRange,
                                        day
                                    )
                                    const isEnd = isEndOfRange(dateRange, day)
                                    const isRangeOneDay = isRangeSameDay(
                                        dateRange
                                    )
                                    const highlighted =
                                        inDateRange(dateRange, day) ||
                                        inHoverRange(day)
                                    return (
                                        <Day
                                            key={format(day, 'MM-DD-YYYY')}
                                            filled={isStart || isEnd}
                                            outlined={isToday(day)}
                                            highlighted={
                                                highlighted && !isRangeOneDay
                                            }
                                            disabled={
                                                !isSameMonth(date, day) ||
                                                !isWithinRange(
                                                    day,
                                                    minDate,
                                                    maxDate
                                                )
                                            }
                                            startOfRange={
                                                isStart && !isRangeOneDay
                                            }
                                            endOfRange={isEnd && !isRangeOneDay}
                                            onClick={() => onDayClick(day)}
                                            onHover={() => onDayHover(day)}
                                            value={getDate(day)}
                                        />
                                    )
                                })}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(Month)
