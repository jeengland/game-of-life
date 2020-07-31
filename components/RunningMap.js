import React, { useEffect } from 'react';

const RunningMap = ({cellMap, cellSize, setCellMap, speed}) => {
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
                        if (liveNeighbors == 2) {
                            return true
                        } else if (liveNeighbors == 3) {
                            return true
                        } else {
                            return false
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
        }, speed);
        return () => clearTimeout(interval)
    }, [cellMap])
    return (
        <div className='map' style={{ backgroundColor: 'white' }}>
            {cellMap.map((cellRow, i) => {
                return <div key={i} className='row' style={{ display: 'flex', flexDirection: 'row'}}>
                        {
                            cellRow.map((cell, j) => {
                                return(
                                    cell ? <div className='cell'  
                                                key={`${i}, ${j}`}
                                                style={{ width: `${cellSize}px`, 
                                                         height: `${cellSize}px`, 
                                                         border: '1px solid grey',
                                                         boxSizing: 'border-box',
                                                         backgroundColor: 'black'
                                                }}>
                                           </div>
                                         : <div className='cell'
                                                key={`${i}, ${j}`}
                                                style={{ width: `${cellSize}px`, 
                                                         height: `${cellSize}px`,
                                                         boxSizing: 'border-box', 
                                                         border: '1px solid grey',
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