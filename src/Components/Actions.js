const Action = ({handlePlusCount, handleMinusCount}) => {
    return (
        <div>
           <button className="btn increment_btn" onClick={handlePlusCount}>Increment</button>
            <button className="btn decrement_btn" onClick={handleMinusCount}>Decrement</button>
        </div>
    )
}

export default Action;