// @flow
import { keyframes } from '@emotion/core'
import { BASE_FONT_SIZE } from '../constants/fonts'

import CharlieStdEOT from '../fonts/CharlieStd/CharlieStd-SemiBold.eot'
import CharlieStdWOFF from '../fonts/CharlieStd/CharlieStd-SemiBold.woff'
import CharlieStdWOFF2 from '../fonts/CharlieStd/CharlieStd-SemiBold.woff2'
import CharlieStdTTF from '../fonts/CharlieStd/CharlieStd-SemiBold.ttf'
import CharlieStdSVG from '../fonts/CharlieStd/CharlieStd-SemiBold.svg'

export const CharlieStdFont = {
    eot: CharlieStdEOT,
    woff: CharlieStdWOFF,
    woff2: CharlieStdWOFF2,
    ttf: CharlieStdTTF,
    svg: CharlieStdSVG,
}

export const fontFamily = {
    sourceSans: `ans-serif`,
    arial: `Arial, serif`,
}

export const MAX_WIDTH = 1200

export const deviceBreakpoints = {
    xs: 320,
    sm: 550,
    md: 768,
    lg: 1024,
    xl: 1200,
}

export const mediaQueries = {
    xs: `@media only screen and (min-width: ${deviceBreakpoints.xs}px)`,
    sm: `@media only screen and (min-width: ${deviceBreakpoints.sm}px)`,
    md: `@media only screen and (min-width: ${deviceBreakpoints.md}px)`,
    lg: `@media only screen and (min-width: ${deviceBreakpoints.lg}px)`,
    xl: `@media only screen and (min-width: ${deviceBreakpoints.xl}px)`,
}

export const iconWidth = {
    sm: 16,
    lg: 32,
}

export const animations = {
    bounce: keyframes({
        'from, 20%, 53%, 80%, to': {
            transform: 'translate3d(0,0,0)',
        },
        '40%, 43%': {
            transform: 'translate3d(0, -30px, 0)',
        },
        '70%': {
            transform: 'translate3d(0, -15px, 0)',
        },
        '90%': {
            transform: 'translate3d(0,-4px,0)',
        },
    }),
    slidein: keyframes({
        from: {
            transform: 'translate3d(-100%, 0, 0)',
        },
        to: {
            transform: 'translate3d(0, 0, 0)',
        },
    }),
    slideOut: keyframes({
        from: {
            transform: 'translate3d(0, 0, 0)',
        },
        to: {
            transform: 'translate3d(-100%, 0, 0)',
        },
    }),
    fadeIn: keyframes({
        from: {
            opacity: 0.7,
            transform: 'translate(-50%, -50%) scale(0.8)',
        },
        to: {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
        },
    }),
    fadeOut: keyframes({
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0,
        },
    }),
}

export const shadows = {
    low: '0px 3px 5px rgba(0, 0, 0, .05)',
    mid: '0px 5px 10px rgba(0, 0, 0, .15)',
    high: '0px 10px 15px rgba(0, 0, 0, .1)',
}

export const pxToRem = (pixelValue: number): string =>
    `${pixelValue / BASE_FONT_SIZE}rem`

export const fontSize = {
    xl: pxToRem(48),
    lg: pxToRem(32),
    md: pxToRem(24),
    sm: pxToRem(20),
    xs: pxToRem(16),
    xxs: pxToRem(12),
}

export const fontWeights = {
    light: '400',
    normal: '500',
    semiBold: '600',
    bold: '700',
}

export const colours = {
    orange: 'rgb(201, 81, 9)', // #C95109
    lightOrange: 'rgb(251,167,13)', // #FBA70D
    lighterOrange: 'rgb(251, 167, 15)', // #FBA70F
    lighterOrangeOpacity: 'rgba(251, 167, 15, 0.25)',
    lightestGreen: 'rgb(235, 245, 245)',
    lighterGreen: 'rgb(2, 205, 134)', // #02CD86
    lightGreen: 'rgb(0, 176, 185)', // #00B0B9
    mediumGreen: 'rgb(1, 131, 140)', // #01838C
    darkGreen: 'rgb(0, 61, 71)', // #003D47
    darkestGreen: 'rgb(16, 51, 57)', // #103339
    limeGreenShade: 'rgb(24, 196, 125)', // #18c47d
    lighterGreenOpacity: 'rgb(2, 205, 134, 0.25)',

    lightBlue: 'rgb(235, 245, 245)', // #EBF5F5

    white: 'rgb(255, 255, 255)',
    black: 'rgb(0, 0, 0)',

    offWhite: 'rgb(247, 248, 248)', // #F7F8F8
    whiteGrey: 'rgb(229,229,229)', // #E5E5E5
    offWhiteGrey: 'rgb(245, 245, 245)', // #F5F5F5

    lightestGrey: 'rgb(225, 224, 224)', // #E1E0E0
    lightGrey: 'rgb(196, 195, 195)', // #C4C3C3
    mediumGrey: 'rgb(138, 132, 132)', // #8A8484
    darkGrey: 'rgb(88, 83, 83)', // #585353
    mediumDarkGrey: 'rgb(44, 42, 41)', // #2C2A29
    darkestGrey: 'rgb(39, 37, 37)', // #272525
    lightRed: 'rgb(255, 187, 191)', // #FFBBBF
    pink: 'rgb(206, 0, 88)', // #CE0058
    red: 'rgb(241, 52, 40)', // #F13428
    merlin: 'rgb(71, 63, 58)', // #473F3A
    vividPink: 'rgb(228, 5, 113)', // #E40571
    lightBlack: 'rgb(71, 63, 58)', // #473F3A
    lighterBlack: 'rgb(26, 26, 26)', // #1A1A1A
}

export const coloursWithOpacity = (color, opacity) => {
    const splitedColor = color.split(')')
    return `${splitedColor[0]}, ${opacity})`
}

// Pading
export const buttonPadding = {
    xs: {
        vertical: 10,
        horizontal: 12,
    },
    sm: {
        vertical: 12,
        horizontal: 24,
    },
    lg: {
        vertical: 16,
        horizontal: 33,
    },
}

export const inputPadding = {
    sm: {
        vertical: 12,
        horizontal: 8,
    },
}

// Stacking traceability
// e.g. anything higher than -- mainNavigation + 1
export const zIndex = {
    mainNavigation: 3,
}

export const SPACING_MULTIPLIER: number = 8
export const space = (
    num: number = 1,
    suffix: boolean = false
): number | string =>
    suffix ? `${num * SPACING_MULTIPLIER}px` : num * SPACING_MULTIPLIER

export const containerUtils = {
    pageWrapper: { maxWidth: MAX_WIDTH, margin: '0 auto' },
    innerPaddingHorizontal: {
        padding: `0 ${space(3, true)}`,
        [mediaQueries.lg]: {
            padding: `0 ${space(3, true)}`,
        },
    },
    innerPaddingVertical: { padding: `${space(3, true)} 0` },
}

export const makeColumn = (column: number = 1, gutter: number = 0) => ({
    flex: `0 1 calc(${100 / column}% - ${gutter}px)`,
    width: `calc(${100 / column}% - ${gutter}px)`,
})

const GUTTERS = {
    none: 0,
    sm: space(2) / 2,
    lg: space(3) / 2,
    xl: space(4) / 2,
}

const columnWrapper = {
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'wrap',
}

export const setColumns = (columns: '' | Array, gutterSize = 'sm') => {
    const gutter = GUTTERS[gutterSize]
    let columnsStyle = {
        ...columnWrapper,
        '& > *': makeColumn(columns, gutter),
    }

    if (Array.isArray(columns)) {
        const widths = {}
        columns.forEach((column, i) => {
            widths[`& > *:nth-child(${i + 1})`] = makeColumn(column, gutter)
        })
        columnsStyle = {
            ...columnWrapper,
            ...widths,
        }
    }

    return columnsStyle
}

export const fullColumn = {
    flex: '0 1 100%',
    width: '100%',
    '&&': {
        flex: '0 1 100%',
        width: '100%',
    },
}

// default width for sidebar.
export const SIDEBAR_DEFAULT_WIDTH = 400

export const QUOTE_SUMMARY_POLICY_CARD_DEFAULT_WIDTH = space(115, true)

export const QUOTE_LEFT_SIDEBAR_WIDTH = space(50, true)
