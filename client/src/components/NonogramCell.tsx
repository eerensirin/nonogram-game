/* ============================================
   NonogramCell — div-based cell for the nonogram grid
   No hover, no focus ring, crosshair cursor.
   ============================================ */

import { memo } from 'react';
import type { CellState } from '../utils/types';

interface Props {
  state: CellState;
  size: number;
  disabled: boolean;
  borderRightThick: boolean;
  borderBottomThick: boolean;
  borderLeftThick: boolean;
  borderTopThick: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
}

function NonogramCell({
  state,
  size,
  disabled,
  borderRightThick,
  borderBottomThick,
  borderLeftThick,
  borderTopThick,
  onLeftClick,
  onRightClick,
}: Props) {
  const cellSize = size <= 10 ? 32 : size <= 15 ? 24 : 18;

  const classNames = [
    'nono-cell',
    state === 'filled' ? 'filled' : '',
    state === 'marked' ? 'marked-x' : '',
    disabled ? 'disabled' : '',
    borderRightThick ? 'border-right-thick' : '',
    borderBottomThick ? 'border-bottom-thick' : '',
    borderLeftThick ? 'border-left-thick' : '',
    borderTopThick ? 'border-top-thick' : '',
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    onLeftClick();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    onRightClick();
  };

  return (
    <div
      className={classNames}
      style={{ width: cellSize, height: cellSize }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    />
  );
}

export default memo(NonogramCell);
