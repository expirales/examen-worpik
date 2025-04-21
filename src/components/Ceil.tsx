// src/components/Ceil.tsx
import { memo } from "react";
import { cssClassNames } from "../utils/cssClassNames";

type CeilProps = {
  index: number;
  ceilNumber: number;
  color: string;
  isSelected: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseEnter: (index: number) => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  onClick: (index: number) => void;
};

function Ceil({
  index,
  ceilNumber,
  color,
  isSelected,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onContextMenu,
  onClick,
}: CeilProps) {
  return (
    <button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={() => onMouseEnter(index)}
      onContextMenu={(e) => onContextMenu(e, index)}
      onClick={() => onClick(index)}
      className={cssClassNames("ceil", {
        [color]: isSelected,
      })}
    >
      {ceilNumber}
    </button>
  );
}

export default memo(Ceil);
