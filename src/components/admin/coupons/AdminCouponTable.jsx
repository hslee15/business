import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminCouponTable = ({ coupons = [], onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  const formatCurrency = (amount) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const getDiscountText = (coupon) => {
    if (!coupon.discountType) return '-';
    
    if (coupon.discountType === 'fixed') {
      return formatCurrency(coupon.discountValue);
    } else if (coupon.discountType === 'percentage') {
      return `${coupon.discountValue || 0}%`;
    }
    return '-';
  };

  const getStatusBadge = (coupon) => {
    const now = new Date();
    const startDate = coupon.startDate ? new Date(coupon.startDate) : null;
    const endDate = coupon.endDate ? new Date(coupon.endDate) : null;

    // 만료됨
    if (endDate && now > endDate) {
      return <span className="badge badge-secondary">만료</span>;
    }

    // 아직 시작 안됨
    if (startDate && now < startDate) {
      return <span className="badge badge-info">대기</span>;
    }

    // 사용 횟수 제한 확인
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return <span className="badge badge-warning">소진</span>;
    }

    // 활성 상태
    if (coupon.isActive) {
      return <span className="badge badge-success">활성</span>;
    }

    return <span className="badge badge-secondary">비활성</span>;
  };

  if (coupons.length === 0) {
    return (
      <div className="table-empty-state">
        <p>등록된 쿠폰이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>쿠폰 코드</th>
            <th>쿠폰명</th>
            <th>할인</th>
            <th>사용 기간</th>
            <th>사용 횟수</th>
            <th>상태</th>
            <th>생성일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>#{coupon.id}</td>
              <td>
                <code
                  style={{
                    background: '#f1f5f9',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  {coupon.code || '-'}
                </code>
              </td>
              <td>
                <button
                  className="link-button"
                  onClick={() => navigate(`/admin/coupons/${coupon.id}/edit`)}
                >
                  {coupon.name || '-'}
                </button>
              </td>
              <td>{getDiscountText(coupon)}</td>
              <td>
                {coupon.startDate && coupon.endDate
                  ? `${formatDate(coupon.startDate)} ~ ${formatDate(coupon.endDate)}`
                  : '-'}
              </td>
              <td>
                {coupon.usageLimit
                  ? `${coupon.usedCount || 0} / ${coupon.usageLimit}`
                  : coupon.usedCount || 0}
              </td>
              <td>{getStatusBadge(coupon)}</td>
              <td>{formatDate(coupon.createdAt)}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => navigate(`/admin/coupons/${coupon.id}/edit`)}
                    title="수정"
                  >
                    수정
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(coupon.id)}
                    title="삭제"
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCouponTable