import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

export const initialState = {
  data: {},
  waiting: false,
  waitToCreate: false,
};

function transformCommentList(list) {
  let lev = 1;
  return treeToList(listToTree(list), (item, level) => {
    return {
      name: item?.author?.profile?.name || item?.name,
      dateCreate: item?.dateCreate,
      isDeleted: item?.isDeleted,
      _id: item?._id,
      text: item?.text,
      level,
      parentId: item?.parent?._id,
    };
  }).filter((item) => {
    if (item.dateCreate) {
      lev = (item.level - 1) * 30 < 1024 - 550 ? item.level - 1 : 0;

      const data = { ...item, level: lev };

      return data;
    }
  });
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: action.payload, waiting: true };

    case "comments/load-success":
      return {
        ...state,
        data: {
          ...action.payload,
          list: transformCommentList(action.payload.list),
        },
        waiting: false,
      };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false };

    case "comments/create-start":
      return { ...state, waitToCreate: true };

    case "comments/create-success":
      console.log(state.data.list);
      return {
        ...state,
        data: {
          count: state.data.count + 1,
          list: transformCommentList([
            ...state.data.list,
            { ...action.payload.comment, name: action.payload.user },
          ]),
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
