
// Pass in children so that anything written inside of children will be written in the object in the component
const SelectButton = ({children}) => {
  
  return(
    <span>
      {children}
    </span>
  )
}

export default SelectButton