import { List, ListItem, ListItemText } from '@material-ui/core'

import { Component } from 'react'
import React from 'react'
import { isSameDay } from 'date-fns'

const isSameRange = (first, second) => {
    const { startDate: fStart, endDate: fEnd } = first
    const { startDate: sStart, endDate: sEnd } = second
    if (fStart && sStart && fEnd && sEnd) {
        return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd)
    }
    return false
}

class DefinedRanges extends Component {
    render() {
        return (
            <List>
                {this.props.ranges.map((range, idx) => (
                    <ListItem
                        button
                        key={idx}
                        onClick={() => this.props.setRange(range)}
                    >
                        <ListItemText
                            primaryTypographyProps={{
                                variant: 'body2',
                                style: {
                                    fontWeight: isSameRange(
                                        range,
                                        this.props.selectedRange
                                    )
                                        ? 'bold'
                                        : 'normal',
                                },
                            }}
                        >
                            {range.label}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        )
    }
}

export default DefinedRanges
