import React, { useState } from 'react'

const AdminBookingFilter = ({ filters = {}, onFilterChange, onSearch }) => {
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    status: filters.status || '',
    dateFrom: filters.dateFrom || '',
    dateTo: filters.dateTo || '',
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
    const resetFilters = { search: '', status: '', dateFrom: '', dateTo: '' };
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
          placeholder="예약번호, 고객명, 호텔명으로 검색..."
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
          <option value="pending">대기</option>
          <option value="confirmed">확정</option>
          <option value="cancelled">취소</option>
          <option value="completed">완료</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="dateFrom">시작일</label>
        <input
          id="dateFrom"
          type="date"
          value={localFilters.dateFrom}
          onChange={(e) => handleInputChange('dateFrom', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="dateTo">종료일</label>
        <input
          id="dateTo"
          type="date"
          value={localFilters.dateTo}
          onChange={(e) => handleInputChange('dateTo', e.target.value)}
        />
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

export default AdminBookingFilter