import { makeStyles, Container, Typography  } from "@material-ui/core";
import Carousel from './Carousel.js';



const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.jpeg)",
  },
  bannerContent: {
    height: 400, 
    display: "flex",
    flexDirection: "column",
    paddingTop: 25, 
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  }
}));


const Banner = () => {

  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15, 
              fontFamily: "Montserrat",
            }}
          >
            Crypto Screener
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Find Info For All Your Favorite Cryptos
          </Typography>
          <Carousel />
        </div>
      </Container>
    </div>
  )

}



export default Banner