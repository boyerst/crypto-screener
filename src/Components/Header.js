import React from 'react';
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography>
            App Name
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header