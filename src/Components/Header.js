import React from 'react';
import { makeStyles, AppBar, Container, Toolbar, Typography, Select, MenuItem  } from "@material-ui/core";



const useStyles = makeStyles(() => ({
  title: {
    // Spread to it's full width
    flex: 1, 
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
  }
}))



const Header = () => {

  const classes = useStyles()

  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography className={classes.title}>App Name</Typography>
          <Select 
            variant="outlined"
            style={{
              width: 100,
              height: 40, 
              marginLeft: 15
            }}
            >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header