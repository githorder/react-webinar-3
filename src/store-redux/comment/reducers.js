export const initialState = {
  data: {},
  waiting: false,
  waitToCreate: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: action.payload, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload, waiting: false };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false };

    case "comments/create-start":
      return { ...state, waitToCreate: true };

    case "comments/creat-success":
      return { ...state, waitToCreate: false };

    case "comments/create-error":
      return { ...state, waitToCreate: false };

    default:
      return state;
  }
}

export default reducer;
