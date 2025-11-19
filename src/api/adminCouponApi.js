import axiosClient from "./axiosClient";
import { mockCouponApi } from "./mockApi";

const USE_MOCK = true;

export const adminCouponApi = {
  // 쿠폰 목록 조회
  getCoupons: (params) => {
    if (USE_MOCK) return mockCouponApi.getCoupons(params);
    return axiosClient.get("/admin/coupons", { params });
  },

  // 쿠폰 상세 조회
  getCouponById: (couponId) => {
    if (USE_MOCK) return mockCouponApi.getCouponById(couponId);
    return axiosClient.get(`/admin/coupons/${couponId}`);
  },

  // 쿠폰 생성
  createCoupon: (data) => {
    if (USE_MOCK) return mockCouponApi.createCoupon(data);
    return axiosClient.post("/admin/coupons", data);
  },

  // 쿠폰 수정
  updateCoupon: (couponId, data) => {
    if (USE_MOCK) return mockCouponApi.updateCoupon(couponId, data);
    return axiosClient.put(`/admin/coupons/${couponId}`, data);
  },

  // 쿠폰 삭제
  deleteCoupon: (couponId) => {
    if (USE_MOCK) return mockCouponApi.deleteCoupon(couponId);
    return axiosClient.delete(`/admin/coupons/${couponId}`);
  },
};

export default adminCouponApi;

