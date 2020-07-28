import React, { useEffect } from 'react';

const RunningMap = ({cellMap, setCellMap}) => {
    useEffect(() => {
        const interval = setTimeout(() => {
            const maxI = cellMap.length - 1
            const maxJ = cellMap[0].length - 1
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
                        // if(n[0] >= 0 && n[0] <= maxI - 1 && n[1] >= 0 && n[1] <= maxJ - 1) {
                        //     if (cellMap[n[0]][n[1]]) {
                        //         liveNeighbors++
                        //     }
                        // }
                        if (n[0] < 0) {
                            n[0] = maxI
                        } else if (n[0] > maxI) {
                            n[0] = 0
                        }
                        if (n[1] < 0) {
                            n[1] = maxJ
                        } else if (n[1] > maxJ) {
                            n[1] = 0
                        }
                        if (cellMap[n[0]][n[1]]) {
                            liveNeighbors++
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
        }, 100);
        return () => clearTimeout(interval)
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
                                                style={{ width: '10px', 
                                                         height: '10px', 
                                                         border: '1px solid black',
                                                         backgroundColor: 'black'
                                                }}>
                                           </div>
                                         : <div className='cell'
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

export default RunningMap