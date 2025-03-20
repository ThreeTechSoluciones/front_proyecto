import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const customTheme = createTheme({
palette: {
    primary: {
    main: '#c99af3',
    },
},
});

const StyledAvatar = styled(Avatar)`
${({ theme }) => `
cursor: pointer;
background-color: ${theme.palette.primary.main};
transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
})};
&:hover {
    background-color: ${theme.palette.secondary.main};
    transform: scale(1.3);
}
`}
`;

export default function ZoomBoton() {
return (
    <ThemeProvider theme={customTheme}>
    <StyledAvatar>x</StyledAvatar>
    </ThemeProvider>
);
}
