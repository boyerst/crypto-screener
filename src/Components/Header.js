import React from 'react';
import { makeStyles, createTheme, ThemeProvider, AppBar, Container, Toolbar, Typography, Select, MenuItem  } from "@material-ui/core";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(() => ({
  title: {
    // Spread to it's full width
    flex: 1, 
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
  }
}));



const Header = () => {

  const classes = useStyles();

  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography 
              onClick={() => history.push("/")}
              className={classes.title}
              variant="h6"
            >
              App Name
            </Typography>
            <Select 
              variant="outlined"
              style={{
                width: 100,
                height: 40, 
                marginRight: 15
              }}
              >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header