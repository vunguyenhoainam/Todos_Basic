import React, { useRef, useState } from "react";

const ItemRender = (props) => {
  const [changeType, setChangeType] = useState(false);

  const handleCompleted = () => {
    props.complete(props.item.id);
  };

  const handleUpdate = (e) => {
    const dataNew = e.target.value;
    props.update(dataNew, props.item.id, props.item.completed);
  };

  const inputNew = useRef();
  const editItem = () => {
    setChangeType(true);
  };

  const delItem = () => {
    const newData = props.data.filter((data) => data.id !== props.item.id);
    props.setData(newData);
    localStorage.setItem("keyTodos", JSON.stringify(newData));
  };

  const resetPropertis = () => {
    setChangeType(false);
    inputNew.current.blur();
  };

  const clickEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      resetPropertis();
    }
  };

  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={handleCompleted}
          key={props.item.completed}
          defaultChecked={props.item.completed}
        />
      </div>

      {changeType ? (
        <input
          autoFocus
          ref={inputNew}
          onDoubleClick={handleCompleted}
          onChange={handleUpdate}
          onKeyDown={clickEnter}
          className="Item"
          type="input"
          defaultValue={props.item.title}
          onBlur={resetPropertis}
          autoComplete="off"
          spellCheck="false"
        />
      ) : (
        <button
          onDoubleClick={handleCompleted}
          ref={inputNew}
          className={`${props.item.completed ? "completed" : ""}`}
        >
          {props.item.title}
        </button>
      )}
      <div className="btn-icon-list">
        <i
          className="fas fa-edit btn-icon-edit"
          onClick={editItem}
        />
        <i className="fas fa-trash btn-icon-remove" onClick={delItem} />
      </div>
    </>
  );
};

export default ItemRender;
