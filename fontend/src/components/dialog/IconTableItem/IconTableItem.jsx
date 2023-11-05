import './IconTableItem.scss'
function IconTableItem({icon}) {
    console.log(icon)
    return ( 
        <div className='IconTableItem'>
            {icon}
        </div>
     );
}

export default IconTableItem;