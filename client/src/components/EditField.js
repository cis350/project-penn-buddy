import React, { useState, useRef, useEffect } from 'react';

function EditField({ field, value, onValueChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onValueChange(field, inputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current.blur();
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span onClick={handleEdit}>{inputValue}</span>
      )}
      {!isEditing && (
        <button onClick={handleEdit} type="button">
          Edit
        </button>
      )}
    </>
  );
}

export default EditField;
