import React, { useState, useEffect } from 'react';
import RunningMap from './RunningMap';
import EditableMap from './EditableMap';

const GameConsole = () => {
    const blankMap = (size) => {
        const startMap = []
        for (let i = 0; i < size; i++) {
            startMap[i] = []
            for (let j = 0; j < size; j++) {
                startMap[i][j] = false;
            }
        }
        return startMap
    }

    const [running, setRunning] = useState(false);
    const [mapSize, setMapSize] = useState(60);
    const [cellMap, setCellMap] = useState(blankMap(mapSize));
    const [generation, setGeneration] = useState(0);
    const [speed, setSpeed] = useState(200)

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

    const handleSizeChange = () => {
        const sizeInput = document.querySelector('.size')
        if (sizeInput.value < 10) {
            setMapSize(10)
            sizeInput.value = 10
        } else if (sizeInput.value > 100) {
            setMapSize(100)
            sizeInput.value = 100
        } else {
            setMapSize(sizeInput.value)
        }
    }

    useEffect(() => {
        setCellMap(blankMap(mapSize))
    }, [mapSize])

    const handleSpeedChange = () => {
        setSpeed(event.target.value)
    }

    return (
        <div className='console'>
            {running ? <RunningMap cellMap={cellMap} setCellMap={setCellMap} speed={speed}/>
                     : <EditableMap cellMap={cellMap} setCellMap={setCellMap} setGeneration={setGeneration}/>}
            <button onClick={() => setRunning(!running)}>
                {running ? 'Stop'
                         : 'Start'    
                }
            </button>
            <span>Generation: {generation}</span>
            {
                running ? undefined
                        : <div className='options'>
                            <button onClick={() => {randomizeMap(blankMap(mapSize))}}>Randomize</button>
                            <button onClick={() => {
                                                setCellMap(blankMap(mapSize))
                                                setGeneration(0)
                                              }}>
                                Clear
                            </button>
                            <input type='number' className='size' min='10' max='100' defaultValue={mapSize} onSubmit={handleSizeChange}/>
                            <button onClick={handleSizeChange}>Set Size</button>
                            <input type='range' min='50' max='2000' defaultValue={speed} onChange={handleSpeedChange}/>
                          </div>
            }
        </div>
    )
}

export default GameConsole