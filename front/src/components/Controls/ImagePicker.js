import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { Typography } from '@material-ui/core'
import GridContainer from '../Grid/GridContainer'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: '10px',
        margin: '10px 0 0 0',
        position: 'relative',
        verticalAlign: 'unset',
    },
    input: {
        display: 'none',
    },
}))

export default function UploadButtons() {
    const classes = useStyles()

    const onChange = (e) => {
        setFilePath(e.target.files[0].name)
        //  TODO Call an API Here to get the path after storing in cloud storage
        console.log(
            'API to Cloud Functions storing and reducing size of image and returing back the url to store o mongo'
        )
    }

    const [filePath, setFilePath] = React.useState('No Image Selected')

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={onChange}
            />
            <GridContainer>
                <label htmlFor="icon-button-file">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                    >
                        <PhotoCamera />
                    </IconButton>
                </label>
                <Typography className={classes.root} gutterBottom>
                    {filePath}
                </Typography>
            </GridContainer>
        </div>
    )
}
