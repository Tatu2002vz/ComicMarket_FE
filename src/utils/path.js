const path = {
  HOME: "/",
  COMIC: "/comic/:slug/:id",
  COMIC_SLUG: "/comic/:slug",
  ALL_COMIC: "/comic",
  CHAPTER: "/comic/chapter/:slug/:id",
  RESET_PASSWORD: "/user/reset-password/:tokenPassword",
  ADMIN: "/admin",
  DASHBOARD: "/admin/dashboard",
  MANAGER_USER: "/admin/manage-user",
  MANAGER_COMIC: "/admin/manage-comic",
  MANAGER_CHAPTER: "/admin/manage-chapter",
  UPDATE_USER: "/admin/manage-user/:id",
  UPDATE_COMIC: "/admin/manage-comic/:id",
  UPDATE_CHAPTER: "/admin/manage-chapter/:slug/:id",
  PROFILE: "/profile",
  MANAGE_INCOME: '/admin/manage-income',
  PAYMENT: '/payment',
  PAYMENT_SUCCESS: '/payment/success'
};
export default path;
