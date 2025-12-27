import { useState } from "react";

export const Select = ({ options = [], value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
