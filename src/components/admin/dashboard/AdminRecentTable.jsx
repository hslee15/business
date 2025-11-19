import React from 'react'
import StatusBadge from '../../common/StatusBadge'

const AdminRecentTable = ({ bookings = [], users = [], reviews = [] }) => {
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

  return (
    <div className="recent-tables">
      <div className="recent-table-grid">
        {/* 최근 예약 */}
        <div className="recent-table-card">
          <div className="table-header">
            <h3>최근 예약</h3>
            <span className="table-count">{bookings.length}</span>
          </div>
          {bookings.length > 0 ? (
            <div className="table-content">
              <table>
                <thead>
                  <tr>
                    <th>예약번호</th>
                    <th>호텔명</th>
                    <th>고객명</th>
                    <th>금액</th>
                    <th>상태</th>
                    <th>예약일</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>
                      <td>{booking.hotelName || '-'}</td>
                      <td>{booking.userName || '-'}</td>
                      <td>{formatCurrency(booking.amount)}</td>
                      <td>
                        <StatusBadge status={booking.status} type="booking" />
                      </td>
                      <td>{formatDate(booking.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="table-empty">최근 예약이 없습니다.</div>
          )}
        </div>

        {/* 최근 사용자 */}
        <div className="recent-table-card">
          <div className="table-header">
            <h3>최근 가입 사용자</h3>
            <span className="table-count">{users.length}</span>
          </div>
          {users.length > 0 ? (
            <div className="table-content">
              <table>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>가입일</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map((user) => (
                    <tr key={user.id}>
                      <td>{user.name || '-'}</td>
                      <td>{user.email || '-'}</td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td>
                        <StatusBadge status={user.status} type="user" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="table-empty">최근 가입 사용자가 없습니다.</div>
          )}
        </div>

        {/* 최근 리뷰 */}
        <div className="recent-table-card">
          <div className="table-header">
            <h3>최근 리뷰</h3>
            <span className="table-count">{reviews.length}</span>
          </div>
          {reviews.length > 0 ? (
            <div className="table-content">
              <table>
                <thead>
                  <tr>
                    <th>호텔명</th>
                    <th>작성자</th>
                    <th>평점</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.slice(0, 5).map((review) => (
                    <tr key={review.id}>
                      <td>{review.hotelName || '-'}</td>
                      <td>{review.userName || '-'}</td>
                      <td>
                        <span className="rating">
                          {'⭐'.repeat(review.rating || 0)}
                        </span>
                      </td>
                      <td>{formatDate(review.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="table-empty">최근 리뷰가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRecentTable