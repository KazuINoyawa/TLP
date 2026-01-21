import React from 'react';

const FilterPanel = ({ province, setProvince, type, setType, provinces }) => (
  <div className="filter-panel">
    <select value={province} onChange={e => setProvince(e.target.value)}>
      <option value="">Tất cả tỉnh/thành</option>
      {provinces.map(p => (
        <option key={p} value={p}>{p}</option>
      ))}
    </select>
    <select value={type} onChange={e => setType(e.target.value)}>
      <option value="">Tất cả loại hình</option>
      <option value="biển">Biển</option>
      <option value="núi">Núi</option>
      <option value="di tích">Di tích</option>
      <option value="văn hóa">Văn hóa</option>
      <option value="sinh thái">Sinh thái</option>
      <option value="giải trí">Giải trí</option>
      <option value="tâm linh">Tâm linh</option>
      <option value="bản làng">Bản làng</option>
      <option value="hang động">Hang động</option>
      <option value="sông nước">Sông nước</option>
      <option value="check-in">Check-in</option>
      <option value="thành phố">Thành phố</option>
      <option value="làng nghề">Làng nghề</option>
      <option value="mạo hiểm">Mạo hiểm</option>
    </select>
  </div>
);

export default FilterPanel;
