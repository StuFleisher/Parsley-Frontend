import "@mui/material/styles";

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
      brightWhite: Palette['primary'];
      charcoal: Palette['primary'];
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
      brightWhite?: PaletteOptions['primary'];
      charcoal?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    muted: true;
    almond: true;
    olive: true;
    mint: true;
    salmon: true;
    orange: true;
    gold: true;
    charcoal: true;
    brightWhite: true;
    peach: true;  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    muted: true;
    almond: true;
    olive: true;
    mint: true;
    salmon: true;
    orange: true;
    gold: true;
    charcoal: true;
    brightWhite: true;
    peach: true;  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    muted: true;
    almond: true;
    olive: true;
    mint: true;
    salmon: true;
    orange: true;
    gold: true;
    charcoal: true;
    brightWhite: true;
    peach: true;  }
}
declare module '@mui/material/Card' {
  interface CardPropsColorOverrides {
    muted: true;
    almond: true;
    olive: true;
    mint: true;
    salmon: true;
    orange: true;
    gold: true;
    charcoal: true;
    brightWhite: true;
    peach: true;  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    muted: true;
    almond: true;
    olive: true;
    mint: true;
    salmon: true;
    orange: true;
    gold: true;
    charcoal: true;
    brightWhite: true;
    peach: true;  }
}


