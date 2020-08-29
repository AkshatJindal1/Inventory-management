import {
    Divider,
    Grid,
    Paper,
    Theme,
    Typography,
    createStyles,
    withStyles,
} from '@material-ui/core'
import React, { Component } from 'react'
import { differenceInCalendarMonths, format } from 'date-fns'

import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt'
import DefinedRanges from './DefinedRanges'
import { MARKERS } from '..'
import Month from './Month'

const useStyles = (theme) =>
    createStyles({
        header: {
            padding: '20px 70px',
        },
        headerItem: {
            flex: 1,
            textAlign: 'center',
        },
        divider: {
            borderLeft: `1px solid ${theme.palette.action.hover}`,
            marginBottom: 20,
        },
    })

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            classes,
            ranges,
            dateRange,
            minDate,
            maxDate,
            firstMonth,
            setFirstMonth,
            secondMonth,
            setSecondMonth,
            setDateRange,
            inHoverRange,
            onDayClick,
            onDayHover,
            onMonthNavigate,

            paperElevation,
        } = this.props
        const { startDate, endDate } = dateRange
        const canNavigateCloser =
            differenceInCalendarMonths(secondMonth, firstMonth) >= 2
        const commonProps = {
            dateRange,
            minDate,
            maxDate,
            inHoverRange,
            onDayClick,
            onDayHover,
            onMonthNavigate,
        }

        return (
            <Paper elevation={paperElevation} square>
                <Grid container direction="row" wrap="nowrap">
                    <Grid>
                        <Grid
                            container
                            className={classes.header}
                            alignItems="center"
                        >
                            <Grid item className={classes.headerItem}>
                                <Typography variant="subtitle1">
                                    {startDate
                                        ? format(startDate, 'MMMM DD, YYYY')
                                        : 'Start Date'}
                                </Typography>
                            </Grid>
                            <Grid item className={classes.headerItem}>
                                <ArrowRightAlt color="action" />
                            </Grid>
                            <Grid item className={classes.headerItem}>
                                <Typography variant="subtitle1">
                                    {endDate
                                        ? format(endDate, 'MMMM DD, YYYY')
                                        : 'End Date'}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            wrap="nowrap"
                        >
                            <Month
                                {...commonProps}
                                value={firstMonth}
                                setValue={setFirstMonth}
                                navState={[true, canNavigateCloser]}
                                marker={MARKERS.FIRST_MONTH}
                            />
                            <div className={classes.divider} />
                            <Month
                                {...commonProps}
                                value={secondMonth}
                                setValue={setSecondMonth}
                                navState={[canNavigateCloser, true]}
                                marker={MARKERS.SECOND_MONTH}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.divider} />
                    <Grid>
                        <DefinedRanges
                            selectedRange={dateRange}
                            ranges={ranges}
                            setRange={setDateRange}
                        />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(Menu)
