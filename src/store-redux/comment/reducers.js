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
      return {
        ...state,
        data: {
          ...action.payload,
          list: action.payload.list,
        },
        waiting: false,
      };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false };

    case "comments/create-start":
      return { ...state, waitToCreate: true };

    case "comments/create-success":
      return {
        ...state,
        data: {
          count: state.data.count + 1,
          list: [
            ...state.data.list,
            { ...action.payload.comment, name: action.payload.user },
          ],
        },
        waitToCreate: false,
      };

    case "comments/create-error":
      return { ...state, waitToCreate: false };

    default:
      return state;
  }
}

export default reducer;
