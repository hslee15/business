import React from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../../common/StatusBadge'

const AdminBookingTable = ({ bookings = [], onCancel, onProcess, onEdit }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatCurrency = (amount) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  if (bookings.length === 0) {
    return (
      <div className="table-empty-state">
        <p>등록된 예약이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>예약번호</th>
            <th>호텔명</th>
            <th>고객명</th>
            <th>체크인</th>
            <th>체크아웃</th>
            <th>인원</th>
            <th>금액</th>
            <th>상태</th>
            <th>예약일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <button
                  className="link-button"
                  onClick={() => navigate(`/admin/bookings/${booking.id}`)}
                >
                  #{booking.id}
                </button>
              </td>
              <td>{booking.hotelName || '-'}</td>
              <td>{booking.userName || booking.userEmail || '-'}</td>
              <td>{formatDate(booking.checkIn)}</td>
              <td>{formatDate(booking.checkOut)}</td>
              <td>
                {booking.guests
                  ? `성인 ${booking.guests.adults || 0}명, 아동 ${
                      booking.guests.children || 0
                    }명`
                  : '-'}
              </td>
              <td>{formatCurrency(booking.amount)}</td>
              <td>
                <StatusBadge status={booking.status} type="booking" />
              </td>
              <td>{formatDate(booking.createdAt)}</td>
              <td>
                <div className="table-actions">
                  {booking.status === 'pending' && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => onProcess && onProcess(booking.id, 'confirmed')}
                      title="확정 처리"
                    >
                      처리
                    </button>
                  )}
                  {booking.status === 'confirmed' && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => onProcess && onProcess(booking.id, 'completed')}
                      title="완료 처리"
                    >
                      처리
                    </button>
                  )}
                  {booking.status !== 'cancelled' &&
                    booking.status !== 'completed' && (
                      <>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => onEdit && onEdit(booking.id)}
                          title="수정"
                        >
                          수정
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => onCancel && onCancel(booking.id)}
                          title="취소"
                        >
                          취소
                        </button>
                      </>
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

export default AdminBookingTable