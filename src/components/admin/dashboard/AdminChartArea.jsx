import React from 'react'

const AdminChartArea = ({ data }) => {
  if (!data || !data.labels || !data.revenue || !data.bookings) {
    return (
      <div className="chart-area">
        <div className="chart-card">
          <div className="chart-header">
            <h3>매출 및 예약 추이</h3>
          </div>
          <div className="chart-empty">데이터가 없습니다.</div>
        </div>
      </div>
    );
  }

  const { labels, revenue, bookings } = data;
  const maxRevenue = Math.max(...revenue);
  const maxBookings = Math.max(...bookings);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      notation: 'compact',
    }).format(amount);
  };

  return (
    <div className="chart-area">
      <div className="chart-card">
        <div className="chart-header">
          <h3>매출 및 예약 추이</h3>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#2563eb' }}></span>
              <span>매출</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#10b981' }}></span>
              <span>예약 수</span>
            </div>
          </div>
        </div>
        <div className="chart-content">
          <div className="chart-bars">
            {labels.map((label, index) => {
              const revenueHeight = (revenue[index] / maxRevenue) * 100;
              const bookingsHeight = (bookings[index] / maxBookings) * 100;

              return (
                <div key={index} className="chart-bar-group">
                  <div className="bar-container">
                    <div
                      className="bar revenue-bar"
                      style={{
                        height: `${revenueHeight}%`,
                        background: '#2563eb',
                      }}
                      title={formatCurrency(revenue[index])}
                    ></div>
                    <div
                      className="bar bookings-bar"
                      style={{
                        height: `${bookingsHeight}%`,
                        background: '#10b981',
                      }}
                      title={`${bookings[index]}건`}
                    ></div>
                  </div>
                  <div className="bar-label">{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChartArea