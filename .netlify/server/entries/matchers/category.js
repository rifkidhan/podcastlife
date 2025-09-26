import { C as CATEGORIES } from "../../chunks/constants.js";
const match = (param) => {
  return CATEGORIES.some((v) => v.id === param);
};
export {
  match
};
