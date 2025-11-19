import React, { useState, useEffect } from 'react'

const AdminHotelForm = ({ hotel = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    phone: '',
    email: '',
    rating: '',
    price: '',
    status: 'pending',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // hotel이 변경될 때 formData 업데이트
  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || '',
        address: hotel.address || '',
        description: hotel.description || '',
        phone: hotel.phone || '',
        email: hotel.email || '',
        rating: hotel.rating || '',
        price: hotel.price || '',
        status: hotel.status || 'pending',
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 에러 초기화
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '호텔명을 입력해주세요.';
    }

    if (!formData.address.trim()) {
      newErrors.address = '주소를 입력해주세요.';
    }

    if (formData.rating && (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 5)) {
      newErrors.rating = '평점은 0~5 사이의 숫자여야 합니다.';
    }

    if (!formData.price || isNaN(formData.price) || formData.price < 0) {
      newErrors.price = '올바른 가격을 입력해주세요.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !onSubmit) return;

    try {
      setLoading(true);
      const submitData = {
        ...formData,
        rating: formData.rating ? parseFloat(formData.rating) : null,
        price: parseInt(formData.price),
      };
      await onSubmit(submitData);
    } catch (err) {
      console.error('호텔 저장 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-section">
          <h3 className="form-section-title">기본 정보</h3>

          <div className="form-group">
            <label htmlFor="name">호텔명 *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="호텔명을 입력하세요"
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">주소 *</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="주소를 입력하세요"
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">설명</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="호텔에 대한 설명을 입력하세요"
              rows={4}
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">연락처 정보</h3>

          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hotel@example.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">가격 및 등급</h3>

          <div className="form-group">
            <label htmlFor="price">1박 가격 (원) *</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="150000"
              min="0"
              required
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="rating">평점 (0~5)</label>
            <input
              id="rating"
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
              min="0"
              max="5"
              step="0.1"
            />
            {errors.rating && <span className="error">{errors.rating}</span>}
            <p className="form-help-text">평점은 0부터 5까지 입력할 수 있습니다.</p>
          </div>
        </div>

        {hotel && (
          <div className="form-section">
            <h3 className="form-section-title">상태</h3>

            <div className="form-group">
              <label htmlFor="status">상태</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">승인대기</option>
                <option value="approved">승인</option>
                <option value="rejected">거부</option>
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
              </select>
            </div>
          </div>
        )}

        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              취소
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '저장 중...' : hotel ? '수정하기' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHotelForm