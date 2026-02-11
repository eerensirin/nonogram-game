/* ============================================
   PixelReveal — Static mini-grid showing the completed pixel art
   ============================================ */

interface Props {
  solution: boolean[][];
  cellSize?: number;
}

export default function PixelReveal({ solution, cellSize = 8 }: Props) {
  const size = solution.length;

  return (
    <div className="pixel-reveal">
      <div
        className="pixel-reveal-grid"
        style={{
          gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
          display: 'inline-grid',
          border: '1px solid #2C2C2C',
        }}
      >
        {solution.flatMap((row, ri) =>
          row.map((filled, ci) => (
            <div
              key={`${ri}-${ci}`}
              className={`pixel-reveal-cell ${filled ? 'filled' : 'empty'}`}
              style={{ width: cellSize, height: cellSize }}
            />
          ))
        )}
      </div>
    </div>
  );
}
