import * as React from 'react'

import {
    addMonths,
    addYears,
    isAfter,
    isBefore,
    isSameDay,
    isSameMonth,
    isWithinRange,
    max,
    min,
} from 'date-fns'

import { Card } from '@material-ui/core'
import { Component } from 'react'
import Menu from './components/Menu'
import { defaultRanges } from './defaults'
import { parseOptionalDate } from './utils'

export const MARKERS = {
    FIRST_MONTH: Symbol('firstMonth'),
    SECOND_MONTH: Symbol('secondMonth'),
}

const getValidatedMonths = (range, minDate, maxDate) => {
    let { startDate, endDate } = range
    if (startDate && endDate) {
        const newStart = max(startDate, minDate)
        const newEnd = min(endDate, maxDate)

        return [
            newStart,
            isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
        ]
    } else {
        return [startDate, endDate]
    }
}

class DateRangePicker extends Component {
    constructor(props) {
        super(props)
        const {
            initialDateRange,
            minDate,
            maxDate,
            definedRanges = defaultRanges,
            paperElevation,
        } = this.props

        const [initialFirstMonth, initialSecondMonth] = getValidatedMonths(
            initialDateRange || {},
            parseOptionalDate(minDate, addYears(new Date(), -20)),
            parseOptionalDate(maxDate, addYears(new Date(), 20))
        )
        const dateRange = { ...initialDateRange }
        this.state = {
            hoverDay: null,
            today: new Date(),
            minDateValid: parseOptionalDate(minDate, addYears(new Date(), -20)),
            maxDateValid: parseOptionalDate(maxDate, addYears(new Date(), 20)),
            firstMonth: initialFirstMonth || new Date(),
            secondMonth:
                initialSecondMonth ||
                addMonths(initialFirstMonth || new Date(), 1),
            dateRange: dateRange,
            startDate: dateRange.startDate || new Date(),
            endDate: dateRange.endDate || new Date(),
            paperElevation: paperElevation,
        }
    }

    setFirstMonth = (firstMonth) => {
        this.setState({ firstMonth })
    }

    setSecondMonth = (secondMonth) => {
        this.setState({ secondMonth })
    }
    setFirstMonthValidated = (date) => {
        const { secondMonth } = this.state
        if (isBefore(date, secondMonth)) {
            this.setFirstMonth(date)
        }
    }

    setSecondMonthValidated = (date) => {
        const { firstMonth } = this.state
        if (isAfter(date, firstMonth)) {
            this.setSecondMonth(date)
        }
    }

    setDateRange = (range) => {
        this.setState({
            dateRange: range,
            startDate: range.startDate,
            endDate: range.endDate,
        })
    }

    setHoverDay = (day) => {
        this.setState({ hoverDay: day })
    }

    setDateRangeValidated = (range) => {
        let { startDate: newStart, endDate: newEnd } = range
        const { minDateValid, maxDateValid } = this.state
        if (newStart && newEnd) {
            range.startDate = newStart = max(newStart, minDateValid)
            range.endDate = newEnd = min(newEnd, maxDateValid)
            this.setDateRange(range)
            this.props.onChange(range)
            this.setFirstMonth(newStart)
            this.setSecondMonth(
                isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
            )
        }
    }

    onDayClick = (day) => {
        const { startDate, endDate } = this.state
        if (startDate && !endDate && !isBefore(day, startDate)) {
            const newRange = { startDate, endDate: day }
            this.props.onChange(newRange)
            this.setDateRange(newRange)
        } else {
            this.setDateRange({ startDate: day, endDate: undefined })
        }
        this.setHoverDay(day)
    }

    onMonthNavigate = (marker, action) => {
        const { firstMonth, secondMonth } = this.state
        if (marker == MARKERS.FIRST_MONTH) {
            const firstNew = addMonths(firstMonth, action)
            if (isBefore(firstNew, secondMonth)) this.setFirstMonth(firstNew)
        } else {
            const secondNew = addMonths(secondMonth, action)
            if (isBefore(firstMonth, secondNew)) this.setSecondMonth(secondNew)
        }
    }

    onDayHover = (date) => {
        const { startDate, endDate, hoverDay } = this.state
        if (startDate && !endDate) {
            if (!hoverDay || !isSameDay(date, hoverDay)) {
                this.setHoverDay(date)
            }
        }
    }

    inHoverRange = (day) => {
        const { startDate, endDate, hoverDay } = this.state

        return (
            !!startDate &&
            !endDate &&
            !!hoverDay &&
            !!isAfter(hoverDay, startDate) &&
            !!isWithinRange(day, startDate, hoverDay)
        )
    }

    render() {
        const {
            dateRange,
            minDateValid,
            maxDateValid,
            firstMonth,
            secondMonth,
            paperElevation,
            definedRanges = defaultRanges,
        } = this.state
        return this.props.open ? (
            <Card variant="outlined">
                <Menu
                    paperElevation={paperElevation}
                    dateRange={dateRange}
                    minDate={minDateValid}
                    maxDate={maxDateValid}
                    ranges={definedRanges}
                    firstMonth={firstMonth}
                    secondMonth={secondMonth}
                    setFirstMonth={this.setFirstMonthValidated}
                    setSecondMonth={this.setSecondMonthValidated}
                    setDateRange={this.setDateRangeValidated}
                    inHoverRange={this.inHoverRange}
                    onDayClick={this.onDayClick}
                    onDayHover={this.onDayHover}
                    onMonthNavigate={this.onMonthNavigate}
                />
            </Card>
        ) : null
    }
}

export default DateRangePicker
