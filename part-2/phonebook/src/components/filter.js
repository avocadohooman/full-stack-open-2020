import React from 'react'


const Filter = ({text, filter, onChanges}) => {
    return (
        <>
            <form>
                <div>
                    {text}
                </div>
                <input
                    value={filter}
                    onChange={onChanges}
                />
            </form>
        </>
    )
}


export default Filter