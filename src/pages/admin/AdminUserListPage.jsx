import { useState, useEffect } from "react";
import AdminUserFilter from "../../components/admin/users/AdminUserFilter";
import AdminUserTable from "../../components/admin/users/AdminUserTable";
import Pagination from "../../components/common/Pagination";
import { adminUserApi } from "../../api/adminUserApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminUserApi.getUsers({
        ...filters,
        page: currentPage,
      });
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || "데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    // filters가 업데이트되면 useEffect가 자동으로 fetchUsers를 호출함
  };

  const handleStatusChange = async (userId, status) => {
    try {
      await adminUserApi.updateUserStatus(userId, status);
      fetchUsers();
    } catch (err) {
      alert(err.message || "상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await adminUserApi.deleteUser(userId);
      fetchUsers();
    } catch (err) {
      alert(err.message || "삭제에 실패했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchUsers} />;

  return (
    <div className="admin-user-list-page">
      <div className="page-header">
        <h1>회원 관리</h1>
      </div>

      <AdminUserFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <AdminUserTable
        users={users}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminUserListPage;
