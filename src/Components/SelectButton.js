import { makeStyles  } from "@material-ui/core";


const useStyles = makeStyles(() => ({

}));



// Pass in children so that anything written inside of children will be written in the object in the component
const SelectButton = ({children}) => {
  
  const classes = useStyles()


  return(
    <span className={classes.selectbutton}>
      {children}
    </span>
  )
}

export default SelectButton