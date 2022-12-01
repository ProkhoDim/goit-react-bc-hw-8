/** @param {ReduxStore} state */
export const selectUserName = state => state.user.name;

/** @param {ReduxStore} state */
export const selectUserEmail = state => state.user.email;

/** @param {ReduxStore} state */
export const selectUserError = state => state.user.error;

/** @param {ReduxStore} state */
export const selectUserLoggedIn = state => state.user.loggedIn;

/** @param {ReduxStore} state */
export const selectUserRefreshing = state => state.user.loading;
