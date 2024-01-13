import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface Palette {
        muted: Palette['primary'];
        almond: Palette['primary'];
        olive: Palette['primary'];
        mint: Palette['primary'];
        salmon: Palette['primary'];
        orange: Palette['primary'];
        gold: Palette['primary'];
        peach: Palette['primary'];
    }
    interface PaletteOptions {
        muted?: PaletteOptions['primary'];
        almond?: PaletteOptions['primary'];
        olive?: PaletteOptions['primary'];
        mint?: PaletteOptions['primary'];
        salmon?: PaletteOptions['primary'];
        orange?: PaletteOptions['primary'];
        gold?: PaletteOptions['primary'];
        peach?: PaletteOptions['primary'];
    }
}

const parsleyTheme = createTheme({
    palette: {
        primary: {
            main:'#CF3E23'
        },
        secondary: {
            main: '#F4C251'
        },
        info:{
            main: '#E09A66'
        },
        muted:{
            light:'#F9EFE0',
            main:'#E2CEAB',
            dark:'#DAB9AA',
        },
        almond:{
            light:'#FFFFFF',
            main:'#E2CEAB',
            dark:'#F9EFE0',
        },
        olive:{
            light:'#C9B96E',
            main:'#FFFAF3',
            dark:'#A28124',
        },
        mint:{
            light:'#C6CCBE',
            main:'#ABB2A2',
            dark:'#819E80',
        },
        salmon:{
            light:'#FF6B5F',
            main:'#FF6B5F',
            dark:'#D04A3C',
        },
        orange:{
            light:'#FE9635',
            main:'#FF5E05',
            dark:'#D86306',
        },
        gold:{
            light:'#FFC654',
            main:'#FFAA01',
            dark:'#FB963C',
        },
        peach:{
            light:'#F9B577',
            main:'#F9864F',
            dark:'#D86306',
        },
    }
})

export default parsleyTheme;