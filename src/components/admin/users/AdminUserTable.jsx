import React from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../../common/StatusBadge'

const AdminUserTable = ({ users = [], onStatusChange, onDelete }) => {
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

  const getStatusOptions = (currentStatus) => {
    const allStatuses = ['active', 'inactive', 'suspended'];
    return allStatuses.filter((status) => status !== currentStatus);
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      active: '활성',
      inactive: '비활성',
      suspended: '정지',
    };
    return statusMap[status] || status;
  };

  if (users.length === 0) {
    return (
      <div className="table-empty-state">
        <p>등록된 사용자가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>역할</th>
            <th>상태</th>
            <th>가입일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const availableStatuses = getStatusOptions(user.status);
            return (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>
                  <button
                    className="link-button"
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    {user.name || '-'}
                  </button>
                </td>
                <td>{user.email || '-'}</td>
                <td>{user.phone || '-'}</td>
                <td>
                  {user.role === 'admin' && '관리자'}
                  {user.role === 'business' && '사업자'}
                  {user.role === 'user' && '일반 사용자'}
                  {!user.role && '-'}
                </td>
                <td>
                  <StatusBadge status={user.status} type="user" />
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <div className="table-actions">
                    {availableStatuses.length > 0 && (
                      <select
                        className="btn btn-sm"
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            onStatusChange(user.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        style={{
                          padding: '4px 8px',
                          fontSize: '12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                        }}
                      >
                        <option value="">상태 변경</option>
                        {availableStatuses.map((status) => (
                          <option key={status} value={status}>
                            {getStatusLabel(status)}
                          </option>
                        ))}
                      </select>
                    )}
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      title="상세보기"
                    >
                      상세
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(user.id)}
                      title="삭제"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable