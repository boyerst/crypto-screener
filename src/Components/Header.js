import React from 'react';
import { AppBar, Container, Toolbar, Typography, Select, MenuItem  } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography>App Name</Typography>
          <Select 
            variant="outlined"
            style={{
              width: 100,
              height: 40, 
              marginLeft: 15
            }}
            >
            <MenuItem>USD</MenuItem>
            <MenuItem>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header