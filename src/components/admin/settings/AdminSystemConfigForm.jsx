import React, { useState } from 'react'

const AdminSystemConfigForm = ({ config = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    siteName: config.siteName || '',
    siteEmail: config.siteEmail || '',
    maintenanceMode: config.maintenanceMode || false,
    bookingEnabled: config.bookingEnabled !== undefined ? config.bookingEnabled : true,
    reviewEnabled: config.reviewEnabled !== undefined ? config.reviewEnabled : true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onSubmit) return;

    try {
      setLoading(true);
      await onSubmit(formData);
    } catch (err) {
      console.error('설정 저장 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-section">
          <h3 className="form-section-title">기본 설정</h3>

          <div className="form-group">
            <label htmlFor="siteName">사이트명</label>
            <input
              id="siteName"
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              placeholder="사이트 이름을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="siteEmail">관리자 이메일</label>
            <input
              id="siteEmail"
              type="email"
              name="siteEmail"
              value={formData.siteEmail}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">서비스 설정</h3>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={formData.maintenanceMode}
                onChange={handleChange}
              />
              <div className="checkbox-content">
                <span>유지보수 모드</span>
                <p className="form-help-text">
                  유지보수 모드가 활성화되면 일반 사용자는 사이트에 접근할 수 없습니다.
                </p>
              </div>
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="bookingEnabled"
                checked={formData.bookingEnabled}
                onChange={handleChange}
              />
              <div className="checkbox-content">
                <span>예약 기능 활성화</span>
                <p className="form-help-text">
                  예약 기능을 활성화하면 사용자가 호텔을 예약할 수 있습니다.
                </p>
              </div>
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="reviewEnabled"
                checked={formData.reviewEnabled}
                onChange={handleChange}
              />
              <div className="checkbox-content">
                <span>리뷰 기능 활성화</span>
                <p className="form-help-text">
                  리뷰 기능을 활성화하면 사용자가 호텔에 대한 리뷰를 작성할 수 있습니다.
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '저장 중...' : '설정 저장'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSystemConfigForm