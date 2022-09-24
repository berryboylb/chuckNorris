import {
  GET_ALL_JOKES,
  GET_SINGLE_JOKE,
  GET_JOKES_BY_CATEGORY,
  ERRORS,
  GET_CATEGORIES,
  TRIGGER_LOADER,
  TOGGLE_JOKE,
  GET_SUGESSTIONS,
} from "../types";
const colors = [
  "#ff5b5b",
  "#57e690",
  "#57dbe6",
  "#ffbe5b",
  "#ffbf5b",
  "#ff915b",
  "#8f6360",
];
type State = {
  jokes: any[];
  singleJoke: any;
  categories: any[];
  loading: boolean;
  suggestions: any[];
  error: { msg: string; status: number } | {};
};

const initialState: State = {
  jokes: [],
  singleJoke: {},
  categories: [],
  suggestions: [],
  loading: true,
  error: {},
};


export default function store(
  state: State = initialState,
  action: { type: string; payload: any }
) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_JOKES:
      return {
        ...state,
        jokes: payload.result,
        loading: false,
      };
    case GET_SINGLE_JOKE:
      return {
        ...state,
        singleJoke: payload,
        loading: false,
      };
    case GET_JOKES_BY_CATEGORY:
      return {
        ...state,
        jokes: payload ? payload : [],
        loading: false,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload.map((item: any) => ({
          category: item,
          color: colors[Math.floor(Math.random() * colors.length)],
        })),
      };
    case TOGGLE_JOKE:
      return {
        ...state,
        singleJoke: state.jokes.length > 0 ? state.jokes[payload] : [],
        loading: false,
      };
    case GET_SUGESSTIONS:
      return {
        ...state,
        suggestions: payload.result,
        loading: false,
      };
    case ERRORS:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case TRIGGER_LOADER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
