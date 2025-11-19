import React, { useState } from 'react'

const AdminHotelFilter = ({ filters = {}, onFilterChange, onSearch }) => {
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    status: filters.status || '',
  });

  const handleInputChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    onFilterChange(localFilters);
    if (onSearch) {
      onSearch();
    }
  };

  const handleReset = () => {
    const resetFilters = { search: '', status: '' };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
    if (onSearch) {
      onSearch();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="search">검색</label>
        <input
          id="search"
          type="text"
          placeholder="호텔명, 주소로 검색..."
          value={localFilters.search}
          onChange={(e) => handleInputChange('search', e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="status">상태</label>
        <select
          id="status"
          value={localFilters.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
        >
          <option value="">전체</option>
          <option value="pending">승인대기</option>
          <option value="approved">승인</option>
          <option value="rejected">거부</option>
          <option value="active">활성</option>
          <option value="inactive">비활성</option>
        </select>
      </div>

      <div className="filter-actions">
        <button className="btn btn-primary" onClick={handleSearch}>
          검색
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          초기화
        </button>
      </div>
    </div>
  );
};

export default AdminHotelFilter