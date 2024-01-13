import { createTheme } from "@mui/material";


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