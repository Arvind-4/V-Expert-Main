import React from "react";

const Filters = (props) => {
  const onChangeHandler = (event) => {
    props.filter(event.target.value);
  };
  return (
    <div className="bg-gray-400 text-white rounded py-1 px-2">
      <label htmlFor="status">{props.label}&nbsp;-</label>
      <select
        id="status"
        onChange={onChangeHandler}
        className="bg-transparent text-black focus:outline-none"
      >
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filters;
