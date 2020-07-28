import React from 'react';

const EditableMap = ({cellMap, setCellMap, setGeneration}) => {

    const handleClick = (e) => {
        const column = event.target.getAttribute('data-column')
        const row = event.target.getAttribute('data-row')
        let newCellMap = [...cellMap]
        newCellMap[column][row] = !newCellMap[column][row]
        setCellMap(newCellMap)
        setGeneration(0)
    }
    return (
        <div className='map'>
            {cellMap.map((cellRow, i) => {
                return <div key={i} className='row' style={{ display: 'flex', flexDirection: 'row'}}>
                        {
                            cellRow.map((cell, j) => {
                                return(
                                    cell ? <div className='cell'
                                                data-row={j}
                                                data-column={i} 
                                                onClick={handleClick}
                                                key={`${i}, ${j}`} 
                                                style={{ width: '10px', 
                                                         height: '10px', 
                                                         border: '1px solid black',
                                                         backgroundColor: 'black'
                                                }}>
                                           </div>
                                         : <div className='cell'
                                                data-row={j}
                                                data-column={i}
                                                onClick={handleClick}
                                                key={`${i}, ${j}`} 
                                                style={{ width: '10px', 
                                                         height: '10px', 
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