import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

const Carousel = () => {

  const classes = useStyles()

  return (
    <div className={classes.carousel}>
      Carousel
    </div>
  )

}



export default Carousel