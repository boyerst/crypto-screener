import { makeStyles  } from "@material-ui/core";



const useStyles = makeStyles(({selected}) => ({
  selectbutton: {
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    margin: 5,
  },
}));


// Pass in children so that anything written inside of children will be written in the object in the component
// Pass in selected to change styles when button is selected
const SelectButton = ({children, onClick, selected}) => {



  const classes = useStyles({selected})


  return(
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  )
}

export default SelectButton