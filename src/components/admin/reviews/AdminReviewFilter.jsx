import React, { useState } from 'react'

const AdminReviewFilter = ({ filters = {}, onFilterChange, onSearch }) => {
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    rating: filters.rating || '',
    reported: filters.reported || '',
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
    const resetFilters = { search: '', rating: '', reported: '' };
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
          placeholder="호텔명, 작성자명으로 검색..."
          value={localFilters.search}
          onChange={(e) => handleInputChange('search', e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="rating">평점</label>
        <select
          id="rating"
          value={localFilters.rating}
          onChange={(e) => handleInputChange('rating', e.target.value)}
        >
          <option value="">전체</option>
          <option value="5">5점</option>
          <option value="4">4점</option>
          <option value="3">3점</option>
          <option value="2">2점</option>
          <option value="1">1점</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="reported">신고 여부</label>
        <select
          id="reported"
          value={localFilters.reported}
          onChange={(e) => handleInputChange('reported', e.target.value)}
        >
          <option value="">전체</option>
          <option value="true">신고됨</option>
          <option value="false">신고 안됨</option>
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

export default AdminReviewFilter