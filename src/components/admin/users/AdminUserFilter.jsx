import React, { useState } from 'react'

const AdminUserFilter = ({ filters = {}, onFilterChange, onSearch }) => {
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    status: filters.status || '',
    role: filters.role || '',
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
    const resetFilters = { search: '', status: '', role: '' };
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
          placeholder="이름, 이메일로 검색..."
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
          <option value="active">활성</option>
          <option value="inactive">비활성</option>
          <option value="suspended">정지</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="role">역할</label>
        <select
          id="role"
          value={localFilters.role}
          onChange={(e) => handleInputChange('role', e.target.value)}
        >
          <option value="">전체</option>
          <option value="user">일반 사용자</option>
          <option value="business">사업자</option>
          <option value="admin">관리자</option>
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

export default AdminUserFilter