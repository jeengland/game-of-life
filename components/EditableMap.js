import React, { useState, useEffect } from 'react';

const startMap = []
for (let i = 0; i < 10; i++) {
    startMap[i] = []
    for (let j = 0; j < 10; j++) {
        startMap[i][j] = false;
    }
}

const EditableMap = (props) => {
    const [cellMap, setCellMap] = useState(startMap)

    const handleClick = (e) => {
        const column = event.target.getAttribute('data-column')
        const row = event.target.getAttribute('data-row')
        let newCellMap = cellMap
        newCellMap[column][row] = !newCellMap[column][row]
        setCellMap([...newCellMap])
        console.log(cellMap)
    }
    return (
        <div className='map'>
            {cellMap.map((cellRow, i) => {
                return <div className='row' style={{ display: 'flex', flexDirection: 'row'}}>
                        {
                            cellRow.map((cell, j) => {
                                return(
                                    cell ? <div className='cell'
                                                data-row={j}
                                                data-column={i} 
                                                onClick={handleClick} 
                                                style={{ width: '20px', 
                                                         height: '20px', 
                                                         border: '1px solid black',
                                                         backgroundColor: 'black'
                                                }}>
                                           </div>
                                         : <div className='cell'
                                                data-row={j}
                                                data-column={i}
                                                onClick={handleClick} 
                                                style={{ width: '20px', 
                                                         height: '20px', 
                                                         border: '1px solid black',
                                                }}>
                                           </div>
                                )
                            })
                        }
                    </div>
            })}
        </div>
    )
}

export default EditableMap;