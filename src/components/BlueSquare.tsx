import React, {useEffect, useState} from 'react';
import Grid from '../ts/Grid.ts';
import throttle from "../ts/throttle.ts";
import './BlueSquare.css';


interface GridComponentProps {
  nx: number;
  ny: number;
}

const BlueSquare: React.FC<GridComponentProps> = ({nx, ny}) => {
  const grid = new Grid(nx, ny);
  const cellSize: number = 30; // cell (28) + border (1 + 1)
  const threshold: number = cellSize / 2;

  const [selectedCell, setSelectedCell] = useState<{ x: number, y: number }>(grid.getRandomIdx());
  const [count, setCount] = useState<number>(0);

  const handleMouseMove = (event: MouseEvent) => {
    const gridElement = document.querySelector('.grid');
    if (!gridElement) {
      console.log('grid not present')
      return;
    }

    const rect = gridElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const selectedXCenter = selectedCell.x * cellSize + (cellSize / 2) + 1;
    const selectedYCenter = selectedCell.y * cellSize + (cellSize / 2) + 1;

    const inCellX = Math.abs(mouseX - selectedXCenter) < threshold;
    const inCellY = Math.abs(mouseY - selectedYCenter) < threshold;

    if (inCellX && inCellY) {
      setSelectedCell(grid.getRandomIdx())
      setCount(count + 1)
    }
    console.log('here')
  }

  useEffect(
    () => {
      const throttledMouseHandler = throttle(handleMouseMove, 16)
      document.addEventListener('mousemove', throttledMouseHandler);
      return () => {
        document.removeEventListener('mousemove', throttledMouseHandler);
      };
    }, [grid]);

  const getClassNameForCell = (x: number, y: number, grid: Grid, selectedCell: {x: numer, y: number}) => {
    let className = 'cell';

    if (selectedCell.x === x && selectedCell.y === y) {
      className += ' selected';
    }

    if (y === 0) {
      className += ' top';
    }

    if (y === grid.ny - 1) {
      className += ' bottom';
    }

    if (x === 0) {
      className += ' left';
    }

    if (x === grid.nx - 1) {
      className += ' right';
    }

    return className;
  };

  const renderGrid = () => {
    const rows = [];
    for (let y = 0; y < grid.ny; y++) {
      const cells = [];
      for (let x = 0; x < grid.nx; x++) {
        const className = getClassNameForCell(x, y, grid, selectedCell)
        cells.push(
          <div
            key={`${x}-${y}`}
            className={className}
          ></div>
        );
      }
      rows.push(<div key={y} className="row">{cells}</div>);
    }
    return rows;
  };

  return (
    <div className="grid-container">
      <div className="grid">
        {renderGrid()}
        <h4>{count}</h4>
      </div>
    </div>
  );
};

export default BlueSquare;