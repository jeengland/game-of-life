import React, { useState, useEffect } from 'react';
import RunningMap from './RunningMap';
import EditableMap from './EditableMap';

const GameConsole = () => {
    const blankMap = () => {
        const startMap = []
        for (let i = 0; i < 50; i++) {
            startMap[i] = []
            for (let j = 0; j < 50; j++) {
                startMap[i][j] = false;
            }
        }
        return startMap
    }

    const [running, setRunning] = useState(false);
    const [cellMap, setCellMap] = useState(blankMap());
    const [generation, setGeneration] = useState(0);

    useEffect(() => {
        if (running) {
            setGeneration(generation + 1)
        }
    }, [cellMap])

    const randomizeMap = (map) => {
        let newCellMap = map.map((row) => {
            return row.map((cell) => {
                const coin = (Math.floor(Math.random() * 2) == 0);
                if (coin) {
                    return true
                } else {
                    return false
                }
            })
        })
        setCellMap(newCellMap)
        setGeneration(0)
    }
    return (
        <div className='console'>
            {running ? <RunningMap cellMap={cellMap} setCellMap={setCellMap}/>
                     : <EditableMap cellMap={cellMap} setCellMap={setCellMap} setGeneration={setGeneration}/>}
            <button onClick={() => setRunning(!running)}>
                {running ? 'Stop'
                         : 'Start'    
                }
            </button>
            {running ? undefined
                     : <button onClick={() => {randomizeMap(blankMap())}}>Randomize</button> 
            }
            {running ? undefined
                     : <button onClick={() => {
                                                setCellMap(blankMap())
                                                setGeneration(0)
                                              }}>
                        Clear
                      </button>
            }
            <span>Generation: {generation}</span>
        </div>
    )
}

export default GameConsole