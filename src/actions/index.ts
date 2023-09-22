export const incNumber = () => ({
  type: "INCREMENT",
});

export const decNumber = () => ({
  type: "DECREMENT",
});

export const setPage = (pageName: string) => ({
  type: "CHANGE_PAGE",
  payload: pageName,
});
