import React from 'react';

const FilterPanel = ({ province, setProvince, type, setType, provinces }) => (
  <div className="filter-panel">
    <select value={province} onChange={e => setProvince(e.target.value)}>
      <option value="">Tỉnh/Thành</option>
      {provinces.map(p => (
        <option key={p} value={p}>{p}</option>
      ))}
    </select>
    <select value={type} onChange={e => setType(e.target.value)}>
      <option value="">Loại hình du lịch</option>
      <option value="biển">Biển</option>
      <option value="núi">Núi</option>
      <option value="di tích">Di tích</option>
      <option value="văn hóa">Văn hóa</option>
    </select>
  </div>
);

export default FilterPanel;
