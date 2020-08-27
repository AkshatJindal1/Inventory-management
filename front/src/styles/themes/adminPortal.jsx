import { colours, fontFamily } from '..'

const theme = {
    'admin-portal': {
        button: {
            text: colours.white,
            bg: colours.mediumGreen,
            hover: {
                bg: colours.darkGreen,
            },
            active: {
                bg: colours.darkestGrey,
            },
            action: {
                text: colours.mediumGreen,
                bg: colours.lightestGreen,
                hover: {
                    text: colours.darkGreen,
                    bg: colours.lightGreen,
                },
                active: {
                    text: colours.white,
                    bg: colours.mediumGreen,
                },
            },
        },
        icon: {
            color: colours.mediumGreen,
        },
        form: {
            bg: colours.white,
            border: colours.lightGrey,
            text: colours.darkGrey,
            placeholder: colours.mediumGrey,
            hover: {
                border: colours.lightGreen,
            },
            active: {
                border: colours.darkestGrey,
                text: colours.darkestGrey,
            },
        },
        notification: {
            bg: colours.darkGreen,
            text: colours.white,
        },
        caption: {
            text: colours.darkGrey,
            link: colours.lightGreen,
        },
        banner: {
            bg: colours.darkGreen,
            text: colours.white,
        },
        sidebar: {
            bg: colours.darkGreen,
            text: colours.white,
            border: colours.darkestGrey,
            hover: {
                bg: colours.darkestGreen,
            },
            active: {
                bg: colours.darkestGreen,
            },
        },
        toggle: {
            hover: {
                border: colours.lightGreen,
            },
            active: {
                border: colours.darkestGrey,
            },
            selected: {
                text: colours.white,
                border: colours.darkGreen,
                bg: colours.lightGreen,
            },
        },
        navigation: {
            fontFamily: fontFamily.charlie,
        },
        tabBar: {
            bg: colours.mediumGreen,
            text: colours.white,
            hover: {
                bg: colours.lightGreen,
            },
            active: {
                bg: colours.darkGreen,
            },
            selected: {
                bg: colours.white,
                text: colours.mediumGreen,
            },
        },
    },
}

export default theme
