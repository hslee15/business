import React from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../../common/StatusBadge'

const AdminHotelTable = ({ hotels = [], onApprove, onReject, onDelete }) => {
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

  if (hotels.length === 0) {
    return (
      <div className="table-empty-state">
        <p>등록된 호텔이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>호텔명</th>
            <th>주소</th>
            <th>등급</th>
            <th>가격</th>
            <th>상태</th>
            <th>등록일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>#{hotel.id}</td>
              <td>
                <button
                  className="link-button"
                  onClick={() => navigate(`/admin/hotels/${hotel.id}`)}
                >
                  {hotel.name || '-'}
                </button>
              </td>
              <td>{hotel.address || '-'}</td>
              <td>
                {hotel.rating
                  ? '⭐'.repeat(Math.floor(hotel.rating))
                  : '-'}
              </td>
              <td>{formatCurrency(hotel.price)}</td>
              <td>
                <StatusBadge status={hotel.status} type="hotel" />
              </td>
              <td>{formatDate(hotel.createdAt)}</td>
              <td>
                <div className="table-actions">
                  {hotel.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => onApprove(hotel.id)}
                        title="승인"
                      >
                        승인
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onReject(hotel.id)}
                        title="거부"
                      >
                        거부
                      </button>
                    </>
                  )}
                  {(hotel.status === 'approved' || hotel.status === 'active' || hotel.status === 'inactive') && (
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => navigate(`/admin/hotels/${hotel.id}/edit`)}
                      title="수정"
                    >
                      수정
                    </button>
                  )}
                  {hotel.status !== 'pending' && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(hotel.id)}
                      title="삭제"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHotelTable