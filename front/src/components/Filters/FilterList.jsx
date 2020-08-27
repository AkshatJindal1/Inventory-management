import React, { Component } from 'react'

import Divider from '@material-ui/core/Divider'
import DraftsIcon from '@material-ui/icons/Drafts'
import { Drawer } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 175,
        backgroundColor: theme.palette.background.paper,
    },
})

class FilterList extends Component {
    handleListItemClick = (event, index) => {
        const { onChangeOption } = this.props
        onChangeOption(index)
        // this.setState({ selectedIndex: index })
    }

    render() {
        const { classes, filterOptions, selectedIndex } = this.props

        return (
            <div className={classes.root}>
                <List component="nav" aria-label="secondary mailbox folder">
                    {filterOptions.map((option, index) => (
                        <ListItem
                            key={index}
                            button
                            selected={selectedIndex === index}
                            onClick={(event) =>
                                this.handleListItemClick(event, index)
                            }
                        >
                            <ListItemText primary={option.label} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(FilterList)
