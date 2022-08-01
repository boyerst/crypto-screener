import { makeStyles  } from "@material-ui/core";


const useStyles = makeStyles(() => ({

}));



// Pass in children so that anything written inside of children will be written in the object in the component
// Pass in selected to change styles when button is selected
const SelectButton = ({children, selected, onClick}) => {
  
  const classes = useStyles()


  return(
    <span onclick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  )
}

export default SelectButton