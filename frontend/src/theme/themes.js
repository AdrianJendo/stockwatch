export const lightTheme = {
    palette: {
        primary: {
            main: "#3d5afe",
            dark: "#3d5afe",
        },
        secondary: {
            main: "#9c27b0",
        },
        background: {
            default: "#EFEFEF",
            paper: "#bbdefb",
        },
        error: {
            main: "#f44336",
        },
        text: {
            primary: "#000000",
        },
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    color: "#000000",
                },
            },
        },
    },
};

export const darkTheme = {
    palette: {
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#512da8",
        },
        error: {
            main: "#f44336",
        },
        background: {
            default: "#202124",
            paper: "#323639",
        },
        text: {
            primary: "#fff",
            secondary: "#fff",
        },
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    color: "#fff",
                },
            },
        },
    },
    typography: {
        body1: {
            color: "#fff",
        },
    },
};
