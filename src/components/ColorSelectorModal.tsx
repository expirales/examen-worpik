import { cssClassNames } from "../utils/cssClassNames";
import "./ColorSelectorModal.scss";

type ColorSelectorModalProps = {
  onRequestClose: (isShow: boolean) => void;
  onHandleSelectedColor: (color: string) => void;
  position: { x: number; y: number };
  isModalVisible: boolean;
};

const BUTTONS_COLORS = ["red", "green", "yellow", "blue", "violet"];
export default function ColorSelectorModal({
  onRequestClose,
  onHandleSelectedColor,
  isModalVisible,
  position,
}: ColorSelectorModalProps) {
  const handleCloseModal = (e: React.MouseEvent, color: string) => {
    e.stopPropagation();
    e.preventDefault();
    onHandleSelectedColor(color);
    onRequestClose(false);
  };
  return (
    <div
      className={cssClassNames("cnt-modal ", {
        "fade-out": !isModalVisible,
      })}
      style={{ top: position.y, left: position.x }}
      onMouseLeave={() => onRequestClose(false)}
    >
      {BUTTONS_COLORS.map((color) => (
        <button
          key={color}
          className={`btn ${color}`}
          onClick={(e) => handleCloseModal(e, color)}
        />
      ))}
      {/* <button className="btn red" onClick={(e) => handleCloseModal(e, "red")} />
      <button
        className="btn green"
        onClick={(e) => handleCloseModal(e, "green")}
      />
      <button
        className="btn yellow"
        onClick={(e) => handleCloseModal(e, "yellow")}
      />
      <button
        className="btn blue"
        onClick={(e) => handleCloseModal(e, "blue")}
      />
      <button
        className="btn violet"
        onClick={(e) => handleCloseModal(e, "violet")}
      /> */}
    </div>
  );
}
