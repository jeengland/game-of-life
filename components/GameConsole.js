import React, { useState } from 'react';
import RunningMap from './RunningMap';
import EditableMap from './EditableMap';

const startMap = []
for (let i = 0; i < 10; i++) {
    startMap[i] = []
    for (let j = 0; j < 10; j++) {
        startMap[i][j] = false;
    }
}

const GameConsole = () => {
    const [running, setRunning] = useState(false);
    const [cellMap, setCellMap] = useState(startMap)
    return (
        <div className='console'>
            {running ? <RunningMap cellMap={cellMap} setCellMap={setCellMap} />
                     : <EditableMap cellMap={cellMap} setCellMap={setCellMap} />}
            <button type='button' onClick={() => setRunning(!running)}>
                {running ? 'Stop'
                         : 'Start'    
                }
            </button>
        </div>
    )
}

export default GameConsole