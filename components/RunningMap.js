import React, { useEffect } from 'react';

const RunningMap = ({cellMap, setCellMap}) => {
    useEffect(() => {
        const interval = setInterval(() => {
            const newCellMap = cellMap.map((row, i) => {
                return row.map((cell, j) => {
                    const neighbors = [[i, j + 1],
                                 [i, j - 1],
                                 [i + 1, j + 1],
                                 [i + 1, j - 1],
                                 [i + 1, j],
                                 [i - 1, j + 1],
                                 [i - 1, j - 1],
                                 [i - 1, j]];
                    let liveNeighbors = 0;
                    neighbors.forEach((n) => {
                        if(n[0] >= 0 && n[0] <= cellMap.length - 1 && n[1] >= 0 && n[1] <= row.length) {
                            if (cellMap[n[0]][n[1]]) {
                                liveNeighbors++
                            }
                        }
                    })
                    if (cell) {
                        if (liveNeighbors < 2) {
                            return false
                        } else if (liveNeighbors > 3) {
                            return false
                        } else {
                            return true
                        }
                    } else {
                        if (liveNeighbors == 3) {
                            return true
                        } else {
                            return false
                        }
                    }
                })
            })
            setCellMap(newCellMap)
        }, 1000);
        return () => clearInterval(interval)
    }, [cellMap])
    return (
        <div className='map'>
            {cellMap.map((cellRow, i) => {
                return <div key={i} className='row' style={{ display: 'flex', flexDirection: 'row'}}>
                        {
                            cellRow.map((cell, j) => {
                                return(
                                    cell ? <div className='cell'  
                                                key={`${i}, ${j}`}
                                                style={{ width: '20px', 
                                                         height: '20px', 
                                                         border: '1px solid black',
                                                         backgroundColor: 'black'
                                                }}>
                                           </div>
                                         : <div className='cell'
                                                key={`${i}, ${j}`}
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

export default RunningMap