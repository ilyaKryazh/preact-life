
import { useEffect, useState } from 'preact/hooks'
import './app.css'

export function App() {

  const [grid, setGrid] = useState<number[][]>(() => Array.from({length: 30}, () => Array.from({length: 30}, () => 0)))
  const [start, setStart] = useState<boolean>(false)

  function changeCell(x: number, y: number) {
      let newGrid: number[][] = grid.map(x => [...x]);
      (newGrid[y][x]) ? newGrid[y][x] = 0 : newGrid[y][x] = 1
      setGrid(newGrid)
  }

  function updateGrid() {
    let localGrid: number[][] = grid.map(x => [...x])

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {


          const l = (j - 1 < 0) ? 0 : grid[i][j - 1]
          const r = (j + 1 > grid[i].length - 1) ? 0 : grid[i][j + 1]
          const t = (i - 1 < 0) ? 0 : grid[i - 1][j]
          const b = (i + 1 > grid.length - 1) ? 0 : grid[i + 1][j]

          const tl = (i - 1 < 0 || j - 1 < 0) ? 0 : grid[i - 1][j - 1]
          const tr = (i - 1 < 0 || j + 1 > grid[i].length - 1) ? 0 : grid[i - 1][j + 1]
          const bl = (i + 1 > grid.length - 1 || j - 1 < 0) ? 0 : grid[i + 1][j - 1]
          const br = (i + 1 > grid.length - 1 || j + 1 > grid[i].length - 1) ? 0 : grid[i + 1][j + 1]
          
          const countSides = l + r + t + b + tl + tr + bl + br
      
          console.log(countSides)
          if(grid[i][j] === 1) {
            if (countSides < 2 || countSides > 3) {
              localGrid[i][j] = 0
            }
            if (countSides === 2 || countSides === 3) {
              localGrid[i][j] = 1
            }
          }else {
            if (countSides === 3) {
              localGrid[i][j] = 1
            }
          }

      }
    }

    setGrid(localGrid)
    
  }

  useEffect(() => {
    if(start){
      setTimeout(() => {
        updateGrid()
      }, 500)
      
    }
  }, [grid, start])

  return (
    <>
    <div>
    {grid.map((row, i) => (
        <div style={{display: 'flex'}} key={i}>{row.map((d, j) => <div onClick={() => changeCell(j, i)} style={{ background: d ? 'black' : 'white', border: '1px solid black', width: '20px', height: '20px'}} key={j}>{}</div>)}</div>
      ))}
    </div>
      <div>
        <button onClick={() => setStart(!start)}>{start ? 'Stop' : 'Start'}{}</button>
      </div>
    </>
  )
}
