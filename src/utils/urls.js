export const baseUrl = process.env.REACT_APP_BASE_URL;

// Auth
export const loginUrl = baseUrl + "api/user/auth/login";

// Common
// Role
export const rolesUrl = baseUrl + "api/role/";
export const getAllRoleUrl = rolesUrl + "?is_all=true";

// User
export const userUrl = baseUrl + "api/user/";
export const createUserUrl = userUrl + "create-user";
export const editUserUrl = userUrl;
export const getSingleUserUrl = userUrl;
export const changeStatusOfUserUrl = userUrl + "active-deactive/";
export const getUserProfileUrl = userUrl + "user-profile";
export const userRefreshUrl = userUrl + "auth/refresh";
