import ActionTypes from "./ActionTypes";
import config from "../../config";

const FeaturedItemsAction = {
  GetFeaturedItems: () => {
    return (dispatch) => {
      const url = config.REACT_NATIVE_APP_ENDPOINT + "/api/featuredItems";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((data) => {
          if (data.status === 200) {
            return data.json();
          }
          throw data;
        })
        .then((res) => {
          dispatch({
            type: ActionTypes.GET_FEATURED_ITEMS,
            payload: res
          });
        })
        .catch((error) => {
          console.log({ error });
        });
    };
  }
};

export default FeaturedItemsAction;
