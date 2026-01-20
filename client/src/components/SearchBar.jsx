import React from 'react';

const SearchBar = ({ value, onChange, onSearch }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Tìm kiếm địa điểm..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <button onClick={onSearch}>Tìm kiếm</button>
  </div>
);

export default SearchBar;
