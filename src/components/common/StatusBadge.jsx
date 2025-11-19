const StatusBadge = ({ status, type = "booking" }) => {
  const getStatusConfig = () => {
    if (type === "booking") {
      const statusMap = {
        pending: { label: "대기", className: "badge-warning" },
        confirmed: { label: "확정", className: "badge-success" },
        cancelled: { label: "취소", className: "badge-danger" },
        completed: { label: "완료", className: "badge-info" },
      };
      return (
        statusMap[status] || { label: status, className: "badge-secondary" }
      );
    }

    if (type === "hotel") {
      const statusMap = {
        pending: { label: "승인대기", className: "badge-warning" },
        approved: { label: "승인", className: "badge-success" },
        rejected: { label: "거부", className: "badge-danger" },
        active: { label: "활성", className: "badge-info" },
        inactive: { label: "비활성", className: "badge-secondary" },
      };
      return (
        statusMap[status] || { label: status, className: "badge-secondary" }
      );
    }

    if (type === "user") {
      const statusMap = {
        active: { label: "활성", className: "badge-success" },
        inactive: { label: "비활성", className: "badge-secondary" },
        suspended: { label: "정지", className: "badge-danger" },
      };
      return (
        statusMap[status] || { label: status, className: "badge-secondary" }
      );
    }

    return { label: status, className: "badge-secondary" };
  };

  const config = getStatusConfig();

  return <span className={`badge ${config.className}`}>{config.label}</span>;
};

export default StatusBadge;
