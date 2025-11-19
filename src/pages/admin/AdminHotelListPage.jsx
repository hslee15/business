import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHotelFilter from "../../components/admin/hotels/AdminHotelFilter";
import AdminHotelTable from "../../components/admin/hotels/AdminHotelTable";
import Pagination from "../../components/common/Pagination";
import { adminHotelApi } from "../../api/adminHotelApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const AdminHotelListPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHotels();
  }, [currentPage, filters]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const data = await adminHotelApi.getHotels({
        ...filters,
        page: currentPage,
      });
      setHotels(data.hotels || []);
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
    // filters가 업데이트되면 useEffect가 자동으로 fetchHotels를 호출함
  };

  const handleApprove = async (hotelId) => {
    try {
      await adminHotelApi.approveHotel(hotelId);
      fetchHotels();
    } catch (err) {
      alert(err.message || "승인에 실패했습니다.");
    }
  };

  const handleReject = async (hotelId) => {
    const reason = prompt("거부 사유를 입력하세요:");
    if (!reason) return;

    try {
      await adminHotelApi.rejectHotel(hotelId, reason);
      fetchHotels();
    } catch (err) {
      alert(err.message || "거부에 실패했습니다.");
    }
  };

  const handleDelete = async (hotelId) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await adminHotelApi.deleteHotel(hotelId);
      fetchHotels();
    } catch (err) {
      alert(err.message || "삭제에 실패했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchHotels} />;

  return (
    <div className="admin-hotel-list-page">
      <div className="page-header">
        <h1>호텔 관리</h1>
      </div>

      <AdminHotelFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <AdminHotelTable
        hotels={hotels}
        onApprove={handleApprove}
        onReject={handleReject}
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

export default AdminHotelListPage;
