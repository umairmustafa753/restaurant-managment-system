import ActionTypes from "./ActionTypes";
import config from "../../config";

const MenuAction = {
  GetMenuItems: () => {
    return (dispatch) => {
      const url = config.SERVER_ENDPOINT + "/api/menuList";
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
            type: ActionTypes.GET_MENU,
            payload: res
          });
        })
        .catch((error) => {
          console.log({ error });
        });
    };
  }
};

export default MenuAction;
