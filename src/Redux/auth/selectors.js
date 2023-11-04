export const selectUserName = (state) => state.auth.userName;
export const selectAvatar = (state) => state.auth.userAvatar;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsError = (state) => state.auth.isError;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectID = (state) => state.auth.id;
export const selectSessionID = state => state.auth.token;
