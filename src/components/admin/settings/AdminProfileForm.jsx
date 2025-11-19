import React, { useState, useEffect } from 'react'

const AdminProfileForm = ({ profile = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // profile이 변경될 때 formData 업데이트
  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        name: profile.name || '',
        email: profile.email || '',
      }));
    }
  }, [profile]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPasswordSection, setShowPasswordSection] = useState(false);

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
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (showPasswordSection) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
      }

      if (!formData.newPassword) {
        newErrors.newPassword = '새 비밀번호를 입력해주세요.';
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = '비밀번호는 8자 이상이어야 합니다.';
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      }
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
        name: formData.name,
        email: formData.email,
      };

      if (showPasswordSection) {
        submitData.currentPassword = formData.currentPassword;
        submitData.newPassword = formData.newPassword;
      }

      await onSubmit(submitData);
      
      // 비밀번호 변경 후 폼 초기화
      if (showPasswordSection) {
        setFormData((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
        setShowPasswordSection(false);
      }
    } catch (err) {
      console.error('프로필 수정 실패:', err);
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
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {profile?.role && (
            <div className="form-group">
              <label>역할</label>
              <input
                type="text"
                value={profile.role === 'admin' ? '관리자' : profile.role}
                disabled
                style={{ background: '#f8fafc', cursor: 'not-allowed' }}
              />
              <p className="form-help-text">역할은 변경할 수 없습니다.</p>
            </div>
          )}
        </div>

        <div className="form-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="form-section-title" style={{ marginBottom: 0 }}>
              비밀번호 변경
            </h3>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowPasswordSection(!showPasswordSection);
                if (showPasswordSection) {
                  setFormData((prev) => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  }));
                  setErrors((prev) => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  }));
                }
              }}
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              {showPasswordSection ? '취소' : '비밀번호 변경'}
            </button>
          </div>

          {showPasswordSection && (
            <>
              <div className="form-group">
                <label htmlFor="currentPassword">현재 비밀번호</label>
                <input
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="현재 비밀번호를 입력하세요"
                />
                {errors.currentPassword && (
                  <span className="error">{errors.currentPassword}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">새 비밀번호</label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="새 비밀번호를 입력하세요 (8자 이상)"
                />
                {errors.newPassword && (
                  <span className="error">{errors.newPassword}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">새 비밀번호 확인</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="새 비밀번호를 다시 입력하세요"
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </div>
            </>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '저장 중...' : '정보 저장'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfileForm