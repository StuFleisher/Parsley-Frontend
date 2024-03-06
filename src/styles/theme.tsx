import { createTheme, responsiveFontSizes } from "@mui/material";


const theme = createTheme({
    typography:{
        fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
        button:{textTransform:'none'},
        h1:{
            fontFamily:`'Shrikhand', Georgia`,
            fontSize:`1.5rem`,
            '@media (min-width:600px)':{fontSize:'2rem'},
            '@media (min-width:900px)':{fontSize:'2.5rem'},
            '@media (min-width:1200px)':{fontSize:'3rem'},
        },
        h2:{fontFamily:`'Shrikhand', Georgia`,
        fontSize:`1rem`,
        '@media (min-width:600px)':{fontSize:'2rem'},
        '@media (min-width:900px)':{fontSize:'2.5rem'},
        '@media (min-width:1200px)':{fontSize:'3.5rem'},
        },
        h3:{
            fontFamily:`'Shrikhand', Georgia`,
            fontSize:'1rem',
            '@media (min-width:600px)': {
                fontSize: '2rem',
              },
        },
        subtitle1:{fontWeight:300, fontStyle:'italic' },
        body1:{
            fontSize:'.75rem',
            '@media (min-width:600px)': {
                fontSize: '1rem',
              },
        },
        body2:{
            fontSize:'.75rem',
            '@media (min-width:600px)': {fontSize: '1rem'},
            '@media (min-width:900px)': {fontSize: '1.4rem'},
        }
    },
    components:{
        MuiMenu:{
            defaultProps:{elevation:0},
        }
    },
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
        brightWhite:{
            main:'#FFFAF3',
        },
        charcoal:{
            main:'#4F4F51',
        },
    }
})

// const parsleyTheme = responsiveFontSizes(theme)


export default theme;