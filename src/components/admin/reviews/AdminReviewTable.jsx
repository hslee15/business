import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminReviewTable = ({ reviews = [], onDelete }) => {
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

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '-';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (reviews.length === 0) {
    return (
      <div className="table-empty-state">
        <p>등록된 리뷰가 없습니다.</p>
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
            <th>작성자</th>
            <th>평점</th>
            <th>내용</th>
            <th>신고</th>
            <th>작성일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>#{review.id}</td>
              <td>
                <button
                  className="link-button"
                  onClick={() => navigate(`/admin/hotels/${review.hotelId}`)}
                >
                  {review.hotelName || '-'}
                </button>
              </td>
              <td>{review.userName || review.userEmail || '-'}</td>
              <td>
                <span className="rating">
                  {'⭐'.repeat(review.rating || 0)}
                  {review.rating ? ` (${review.rating})` : '-'}
                </span>
              </td>
              <td title={review.content || '-'}>
                {truncateText(review.content)}
              </td>
              <td>
                {review.reported ? (
                  <span className="badge badge-danger">신고됨</span>
                ) : (
                  <span className="badge badge-secondary">-</span>
                )}
              </td>
              <td>{formatDate(review.createdAt)}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => navigate(`/admin/reviews/${review.id}`)}
                    title="상세보기"
                  >
                    상세
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(review.id)}
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

export default AdminReviewTable