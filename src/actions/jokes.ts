import axios from "axios";
import { Dispatch } from "redux";
import {
  TRIGGER_LOADER,
  ERRORS,
  TOGGLE_JOKE,
  GET_JOKES_BY_CATEGORY,
  GET_SINGLE_JOKE,
} from "../types";
import toast from "react-hot-toast";

type Jokes = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

type CallBackFunction = (id: string) => string;
export const getJokesByCategories =
  (url: string, category: string, cb: CallBackFunction) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: TRIGGER_LOADER,
    });
    try {
      const res = await axios.get(url);
      const newArray: Jokes[] = res.data.result.filter(
        (item: Jokes) => item.categories[0] === category
      );

      if (newArray.length > 1) {
        dispatch({
          type: GET_JOKES_BY_CATEGORY,
          payload: newArray,
        });
        cb("");
      } else if (newArray.length === 0) {
        dispatch({
          type: GET_JOKES_BY_CATEGORY,
          payload: newArray,
        });
        cb("");
      } else {
        dispatch({
          type: GET_SINGLE_JOKE,
          payload: newArray[0],
        });
        cb(newArray[0].id);
      }
    } catch (err: any) {
      cb("");
      console.log(err.message);
      console.log(err.response.data);
      if (err.response.data) {
        toast.error(
          `${err.response.data.statusCode} ${err.response.data.message}`
        );
      }
      dispatch({
        type: ERRORS,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const getData =
  (url: string, type: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: TRIGGER_LOADER,
    });
    try {
      const res = await axios.get(url);
      dispatch({
        type,
        payload: res.data,
      });
    } catch (err: any) {
      console.log(err.message);
      console.log(err.response.data);
      if (err.response.data) {
        toast.error(
          `${err.response.data.statusCode} ${err.response.data.message}`
        );
      }
      dispatch({
        type: ERRORS,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

export const getAllJokes =
  (url: string, type: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: TRIGGER_LOADER,
    });
    try {
      const res = await axios.get(url);
      dispatch({
        type,
        payload: res.data,
      });
    } catch (err: any) {
      console.log(err.message);
      if (err.response.data) {
        toast.error(
          `${err.response.data.statusCode} ${err.response.data.message}`
        );
      }
      dispatch({
        type: ERRORS,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

export const getSuggestions =
  (url: string, type: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: TRIGGER_LOADER,
    });
    try {
      const res = await axios.get(url);
      dispatch({
        type,
        payload: res.data,
      });
    } catch (err: any) {
      console.log(err.message);
      if (err.response.data) {
        toast.error(
          `${err.response.data.statusCode} ${err.response.data.message}`
        );
      }
      dispatch({
        type: ERRORS,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

export const toggleJoke =
  (index: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: TRIGGER_LOADER,
    });
    dispatch({
      type: TOGGLE_JOKE,
      payload: index,
    });
  };
