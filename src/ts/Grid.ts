class Grid {
  // Properties with types
  nx: number;
  ny: number;

  // Constructor to initialize the properties
  constructor(nx: number, ny: number) {
    this.nx = nx;
    this.ny = ny;
  }

  getRandomIdx(): { x: number; y: number } {
    const idx_x = Math.floor(Math.random() * this.nx);
    const idx_y = Math.floor(Math.random() * this.ny);
    return {x: idx_x, y: idx_y}
  }
}


export default Grid;