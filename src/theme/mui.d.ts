import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    call: Palette['primary'];
    emergency: Palette['primary'];
  }

  interface PaletteOptions {
    call?: PaletteOptions['primary'];
    emergency?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    call: true;
    emergency: true;
  }
}
