import React from 'react'

const AdminStatsCards = ({ stats }) => {
  if (!stats) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const statCards = [
    {
      title: '오늘 예약',
      value: stats.todayBookings || 0,
      icon: '📅',
      color: '#2563eb',
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: '총 매출',
      value: formatCurrency(stats.totalRevenue || 0),
      icon: '💰',
      color: '#10b981',
      change: '+8.5%',
      changeType: 'positive',
    },
    {
      title: '활성 호텔',
      value: stats.activeHotels || 0,
      icon: '🏨',
      color: '#f59e0b',
      change: '+3',
      changeType: 'positive',
    },
    {
      title: '신규 사용자',
      value: stats.newUsers || 0,
      icon: '👥',
      color: '#06b6d4',
      change: '+5',
      changeType: 'positive',
    },
  ];

  return (
    <div className="stats-cards">
      {statCards.map((card, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <span className="stat-title">{card.title}</span>
            <div
              className="stat-icon"
              style={{
                background: `${card.color}15`,
                color: card.color,
              }}
            >
              {card.icon}
            </div>
          </div>
          <div className="stat-value">{card.value}</div>
          <div className={`stat-change ${card.changeType}`}>
            <span>{card.change}</span>
            <span>전월 대비</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards