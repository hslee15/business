import {
  mockAdminUser,
  mockDashboardStats,
  mockHotels,
  mockBookings,
  mockUsers,
  mockReviews,
  mockCoupons,
} from "./mockData";

// API 지연 시뮬레이션
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API 응답 생성
const createResponse = (data) => {
  return Promise.resolve(data);
};

// Mock 인증 API
export const mockAuthApi = {
  login: async (credentials) => {
    await delay();

    if (
      credentials.email === "admin@hotel.com" &&
      credentials.password === "admin1234"
    ) {
      return createResponse({
        token: "mock-jwt-token-" + Date.now(),
        admin: mockAdminUser,
      });
    }

    throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
  },

  logout: async () => {
    await delay(200);
    return createResponse({ message: "Logged out successfully" });
  },

  getMyInfo: async () => {
    await delay();
    return createResponse(mockAdminUser);
  },

  changePassword: async (data) => {
    await delay();
    return createResponse({ message: "Password changed successfully" });
  },

  forgotPassword: async (email) => {
    await delay();
    return createResponse({ message: "Reset email sent" });
  },
};

// Mock 호텔 API
export const mockHotelApi = {
  getHotels: async (params = {}) => {
    await delay();
    let filteredHotels = [...mockHotels];

    // 검색 필터
    if (params.search) {
      const search = params.search.toLowerCase();
      filteredHotels = filteredHotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(search) ||
          hotel.address.toLowerCase().includes(search)
      );
    }

    // 상태 필터
    if (params.status) {
      filteredHotels = filteredHotels.filter(
        (hotel) => hotel.status === params.status
      );
    }

    const page = params.page || 1;
    const perPage = 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const totalPages = Math.ceil(filteredHotels.length / perPage);

    return createResponse({
      hotels: filteredHotels.slice(start, end),
      totalPages,
      currentPage: page,
    });
  },
  getHotelById: async (hotelId) => {
    await delay();
    const hotel = mockHotels.find((h) => h.id === parseInt(hotelId));
    return createResponse(hotel || {});
  },
  createHotel: async (data) => {
    await delay();
    const newHotel = {
      id: mockHotels.length > 0 ? Math.max(...mockHotels.map(h => h.id)) + 1 : 1,
      ...data,
      createdAt: new Date().toISOString(),
    };
    mockHotels.push(newHotel);
    return createResponse({ message: "Hotel created", hotel: newHotel });
  },
  updateHotel: async (hotelId, data) => {
    await delay();
    const index = mockHotels.findIndex(h => h.id === parseInt(hotelId));
    if (index !== -1) {
      mockHotels[index] = { ...mockHotels[index], ...data };
      return createResponse({ message: "Hotel updated", hotel: mockHotels[index] });
    }
    throw new Error("Hotel not found");
  },
  deleteHotel: async (hotelId) => {
    await delay();
    const index = mockHotels.findIndex(h => h.id === parseInt(hotelId));
    if (index !== -1) {
      mockHotels.splice(index, 1);
      return createResponse({ message: "Hotel deleted" });
    }
    throw new Error("Hotel not found");
  },
  approveHotel: async (hotelId) => {
    await delay();
    const hotel = mockHotels.find(h => h.id === parseInt(hotelId));
    if (hotel) {
      hotel.status = "approved";
      return createResponse({ message: "Hotel approved", hotel });
    }
    throw new Error("Hotel not found");
  },
  rejectHotel: async (hotelId, reason) => {
    await delay();
    const hotel = mockHotels.find(h => h.id === parseInt(hotelId));
    if (hotel) {
      hotel.status = "rejected";
      return createResponse({ message: "Hotel rejected", hotel });
    }
    throw new Error("Hotel not found");
  },
};

// Mock 예약 API
export const mockBookingApi = {
  getBookings: async (params = {}) => {
    await delay();
    let filteredBookings = [...mockBookings];

    // 검색 필터
    if (params.search) {
      const search = params.search.toLowerCase();
      filteredBookings = filteredBookings.filter(
        (booking) =>
          booking.hotelName.toLowerCase().includes(search) ||
          booking.userName.toLowerCase().includes(search) ||
          booking.userEmail.toLowerCase().includes(search) ||
          booking.id.toString().includes(search)
      );
    }

    // 상태 필터
    if (params.status) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.status === params.status
      );
    }

    // 날짜 필터
    if (params.dateFrom) {
      const fromDate = new Date(params.dateFrom);
      filteredBookings = filteredBookings.filter(
        (booking) => new Date(booking.createdAt) >= fromDate
      );
    }
    if (params.dateTo) {
      const toDate = new Date(params.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filteredBookings = filteredBookings.filter(
        (booking) => new Date(booking.createdAt) <= toDate
      );
    }

    const page = params.page || 1;
    const perPage = 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const totalPages = Math.ceil(filteredBookings.length / perPage);

    return createResponse({
      bookings: filteredBookings.slice(start, end),
      totalPages,
      currentPage: page,
    });
  },
  getBookingById: async (bookingId) => {
    await delay();
    const booking = mockBookings.find((b) => b.id === parseInt(bookingId));
    return createResponse(booking || {});
  },
  updateBookingStatus: async (bookingId, status) => {
    await delay();
    return createResponse({ message: "Status updated" });
  },
  cancelBooking: async (bookingId, reason) => {
    await delay();
    return createResponse({ message: "Booking cancelled" });
  },
  deleteBooking: async (bookingId) => {
    await delay();
    return createResponse({ message: "Booking deleted" });
  },
};

// Mock 사용자 API
export const mockUserApi = {
  getUsers: async (params = {}) => {
    await delay();
    let filteredUsers = [...mockUsers];

    // 검색 필터
    if (params.search) {
      const search = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
      );
    }

    // 상태 필터
    if (params.status) {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === params.status
      );
    }

    // 역할 필터
    if (params.role) {
      filteredUsers = filteredUsers.filter(
        (user) => user.role === params.role
      );
    }

    const page = params.page || 1;
    const perPage = 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const totalPages = Math.ceil(filteredUsers.length / perPage);

    return createResponse({
      users: filteredUsers.slice(start, end),
      totalPages,
      currentPage: page,
    });
  },
  getUserById: async (userId) => {
    await delay();
    const user = mockUsers.find((u) => u.id === parseInt(userId));
    return createResponse(user || {});
  },
  updateUser: async (userId, data) => {
    await delay();
    return createResponse({ message: "User updated" });
  },
  deleteUser: async (userId) => {
    await delay();
    return createResponse({ message: "User deleted" });
  },
  updateUserStatus: async (userId, status) => {
    await delay();
    return createResponse({ message: "Status updated" });
  },
  getBusinessUsers: async (params = {}) => {
    await delay();
    const businessUsers = mockUsers.filter((u) => u.role === "business");
    return createResponse({
      users: businessUsers,
      totalPages: 1,
      currentPage: 1,
    });
  },
};

// Mock 리뷰 API
export const mockReviewApi = {
  getReviews: async (params = {}) => {
    await delay();
    let filteredReviews = [...mockReviews];

    // 검색 필터
    if (params.search) {
      const search = params.search.toLowerCase();
      filteredReviews = filteredReviews.filter(
        (review) =>
          review.hotelName.toLowerCase().includes(search) ||
          review.userName.toLowerCase().includes(search) ||
          review.userEmail.toLowerCase().includes(search)
      );
    }

    // 평점 필터
    if (params.rating) {
      filteredReviews = filteredReviews.filter(
        (review) => review.rating === parseInt(params.rating)
      );
    }

    // 신고 필터
    if (params.reported !== undefined && params.reported !== "") {
      const isReported = params.reported === "true";
      filteredReviews = filteredReviews.filter(
        (review) => review.reported === isReported
      );
    }

    const page = params.page || 1;
    const perPage = 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const totalPages = Math.ceil(filteredReviews.length / perPage);

    return createResponse({
      reviews: filteredReviews.slice(start, end),
      totalPages,
      currentPage: page,
    });
  },
  getReviewById: async (reviewId) => {
    await delay();
    const review = mockReviews.find((r) => r.id === parseInt(reviewId));
    return createResponse(review || {});
  },
  deleteReview: async (reviewId) => {
    await delay();
    return createResponse({ message: "Review deleted" });
  },
  getReportedReviews: async (params = {}) => {
    await delay();
    const reportedReviews = mockReviews.filter((r) => r.reported);
    return createResponse({
      reviews: reportedReviews,
      totalPages: 1,
      currentPage: 1,
    });
  },
  handleReport: async (reviewId, action) => {
    await delay();
    return createResponse({ message: "Report handled" });
  },
};

// Mock 통계 API
export const mockStatsApi = {
  getDashboardStats: async () => {
    await delay();
    return createResponse(mockDashboardStats);
  },
  getRevenueStats: async (params = {}) => {
    await delay();
    return createResponse({ total: 0, monthly: [] });
  },
  getBookingStats: async (params = {}) => {
    await delay();
    return createResponse({ total: 0, monthly: [] });
  },
  getUserStats: async (params = {}) => {
    await delay();
    return createResponse({ total: 0, new: 0, active: 0 });
  },
  getHotelStats: async (params = {}) => {
    await delay();
    return createResponse({ total: 0, active: 0, pending: 0 });
  },
};

// Mock 쿠폰 API
export const mockCouponApi = {
  getCoupons: async (params = {}) => {
    await delay();
    let filteredCoupons = [...mockCoupons];

    // 검색 필터
    if (params.search) {
      const search = params.search.toLowerCase();
      filteredCoupons = filteredCoupons.filter(
        (coupon) =>
          coupon.name.toLowerCase().includes(search) ||
          coupon.code.toLowerCase().includes(search)
      );
    }

    const page = params.page || 1;
    const perPage = 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const totalPages = Math.ceil(filteredCoupons.length / perPage);

    return createResponse({
      coupons: filteredCoupons.slice(start, end),
      totalPages,
      currentPage: page,
    });
  },
  getCouponById: async (couponId) => {
    await delay();
    const coupon = mockCoupons.find((c) => c.id === parseInt(couponId));
    return createResponse(coupon || {});
  },
  createCoupon: async (data) => {
    await delay();
    return createResponse({ message: "Coupon created" });
  },
  updateCoupon: async (couponId, data) => {
    await delay();
    return createResponse({ message: "Coupon updated" });
  },
  deleteCoupon: async (couponId) => {
    await delay();
    return createResponse({ message: "Coupon deleted" });
  },
};
