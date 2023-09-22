const initialState = "Home";

const changePage = (state = initialState, action: any) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return action.payload;
    default:
      return state;
  }
};
export default changePage;
