import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
treeToList;

export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-start", payload: {} });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        dispatch({
          type: "comments/load-success",
          payload: {
            count: res.data.result.count,
            list: res.data.result.items,
          },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  create({ id, text, type, token, user }) {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/create-start" });

      try {
        const comment = await services.api.request({
          url: "/api/v1/comments",
          method: "POST",
          headers: { "X-Token": token },
          body: JSON.stringify({
            text,
            parent: { _id: id, _type: type },
          }),
        });

        dispatch({
          type: "comments/create-success",
          payload: { comment: comment.data.result, user },
        });
      } catch (e) {
        dispatch({
          type: "comments/create-error",
        });
      }
    };
  },
};
