
// Pass in children so that anything written inside of children will be written in the object in the component
const SelectButton = ({children}) => {
  
  return(
    <div>
      {children}
    </div>
  )
}

export default SelectButton