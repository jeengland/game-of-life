import React, { useState, useEffect } from 'react';
import RunningMap from './RunningMap';
import EditableMap from './EditableMap';
import styled from '@emotion/styled';

const Console = styled.div`
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-right: 4px dashed black;
    padding: 2%;
    height: 92.4vh;
    background-color: pink;
`

const Options = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin-top: 2%;
`

const StartButton = styled.button`
    margin-top: 2%;
    height: 40px;
    width: 100px;
    font-size: 1.5rem;
    background-color: blue;
    color: white;
    border: 1px solid;
    border-radius: 10px;
`

const Board = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Toggle = styled.button`
    margin: 2%;
    height: 40px;
    width: 100px;
    font-size: 1.05rem;
    background-color: blue;
    color: white;
    border: 1px solid;
    border-radius: 10px;
`

const Row = styled.div`
    margin: 2%;
    display: flex;
    align-items: center;
    label {
        margin-right: 1%;
    }
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 40%;
    font-size: 1.2rem;
    h2 {
        width: 100%;
        margin-top: 0;
    }
    ul {
        text-align: left;
    }
`

const Body = styled.body`
    display: flex;
    flex-direction: row;
`

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
    const [mapSize, setMapSize] = useState(25);
    const [cellMap, setCellMap] = useState(blankMap(mapSize));
    const [generation, setGeneration] = useState(0);
    const [speed, setSpeed] = useState(200)
    const [cellSize, setCellSize] = useState(10)

    useEffect(() => {
        if (running) {
            setGeneration(generation + 1)
        }
    }, [cellMap])

    useEffect(() => {
        let width = 600
        if (window.innerWidth < 600) {
            width = window.innerWidth
        } else if (window.innerHeight < 600) {
            width = window.innerHeight - 100
        }
        setCellSize((width / mapSize))
    }, [mapSize])

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
        <Body>
            <Console className='console'>
                <Board class='board'>
                    <h2 style={{marginTop: '0px'}}>Generation: {generation}</h2>
                    {running ? <RunningMap cellMap={cellMap} setCellMap={setCellMap} speed={speed} cellSize={cellSize}/>
                            : <EditableMap cellMap={cellMap} setCellMap={setCellMap} setGeneration={setGeneration} cellSize={cellSize}/>}
                    <StartButton onClick={() => setRunning(!running)}>
                        {running ? 'Stop'
                                : 'Start'    
                        }
                    </StartButton>
                </Board>
                {
                    running ? undefined
                            : <Options className='options'>
                                <h2>Options</h2>
                                <Toggle onClick={() => {randomizeMap(blankMap(mapSize))}}>Randomize</Toggle>
                                <Toggle onClick={() => {
                                                    setCellMap(blankMap(mapSize))
                                                    setGeneration(0)
                                                }}>
                                    Clear
                                </Toggle>
                                <Row>
                                    <label for='size'>Size:</label>
                                    <input id='size' type='number' className='size' min='10' max='100' defaultValue={mapSize} onSubmit={handleSizeChange}/>
                                    <button onClick={handleSizeChange}>Set</button>
                                </Row>
                                <Row>
                                    <label for='speed'>Speed:</label>
                                    <input id='speed' type='range' min='50' max='2000' defaultValue={speed} onChange={handleSpeedChange}/>
                                </Row>
                            </Options>
                }
            </Console>
            <Description>
                <h2>Game of Life</h2>
                <p>The Game of Life is a kind of game called a cellular automaton. Each generation of the
                game is generated following a set of rules determining whether a cell should live or die. The
                rules are as follows:
                </p>
                <ul>
                    <li>If a cell is alive has two or three neighbors, it lives on</li>
                    <li>Any dead cell that has three neighbors becomes alive</li>
                    <li>All other cells either die or stay dead</li>
                </ul>
                <p>Patterns can be simple or complex, with the more complex patterns possible of performing 
                amazing tasks like self-replication and even computation. The grid here is too small to do anything
                like that, but play around and see what you can accomplish!
                </p>

            </Description>
        </Body>
    )
}

export default GameConsole