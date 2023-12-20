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

        const list = treeToList(
          listToTree(res.data.result.items),
          (item, level) => {
            return {
              name: item?.author?.profile?.name,
              dateCreate: item?.dateCreate,
              isDeleted: item?.isDeleted,
              _id: item?._id,
              text: item?.text,
              level,
            };
          }
        ).slice(1);
        const count = res.data.result.count;

        dispatch({
          type: "comments/load-success",
          payload: { count, list },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },
};
