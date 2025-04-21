import { useRef, useState } from "react";
import "./App.scss";
import ColorSelectorModal from "./components/ColorSelectorModal";
import Ceil from "./components/Ceil";

const ceils = Array.from({ length: 4000 }, (_, i) => i + 1);

type Ceil = {
  index: number;
  color: string;
};
function App() {
  const [selectedCeils, setSelectedCeils] = useState<Ceil[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedCeil, setSelectedCeil] = useState<number | null>(null);
  const defaultColor = useRef<string>("red");
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isPainting, setIsPainting] = useState(false);

  const handleMouseDown = () => setIsPainting(true);
  const handleMouseUp = () => setIsPainting(false);

  const handleMouseEnter = (index: number) => {
    if (isPainting && !isCeilClicked(index)) {
      handleChangeColor(index, defaultColor.current);
    }
  };
  const isCeilClicked = (index: number) => {
    return selectedCeils.some((ceil) => ceil.index === index);
  };
  const handleChangeColor = (
    index: number,
    color: string = defaultColor.current
  ) => {
    if (isCeilClicked(index)) {
      setSelectedCeils((prev) => prev.filter((ceil) => ceil.index !== index));
      return;
    }
    const newCeil = {
      index,
      color,
    };
    setSelectedCeils((prev) => [...prev, newCeil]);
  };
  const handleSelectCeilColor = (color: string) => {
    if (selectedCeil) {
      const newCeil = {
        index: selectedCeil,
        color,
      };
      setSelectedCeils((prev) =>
        prev.map((ceil) => (ceil.index === selectedCeil ? newCeil : ceil))
      );
    }
    defaultColor.current = color;
  };

  const handleCeilRightClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    e.preventDefault();
    setIsPainting(false);
    setModalPosition({ x: e.clientX, y: e.clientY });
    setIsShowModal(true);
    setSelectedCeil(index);
  };

  const getCeilColor = (index: number) => {
    return selectedCeils.find((ceil) => ceil.index === index)?.color || "";
  };
  return (
    <div className="cnt-grid">
      {ceils.map((ceil, index) => (
        <Ceil
          key={index}
          index={index}
          ceilNumber={ceil}
          color={getCeilColor(index)}
          isSelected={isCeilClicked(index)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onContextMenu={handleCeilRightClick}
          onClick={handleChangeColor}
        />
      ))}
      {isShowModal && (
        <ColorSelectorModal
          isModalVisible={isShowModal}
          position={modalPosition}
          onRequestClose={setIsShowModal}
          onSelectedColor={handleSelectCeilColor}
        />
      )}
    </div>
  );
}

export default App;
