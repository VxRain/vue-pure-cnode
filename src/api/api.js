import { get } from "./helper";
const baseUrl = "https://cnodejs.org/api/v1/";

const getTopics = get(baseUrl + "topics");
const getAuthor = function(authorName) {
  let url = baseUrl + "user/" + authorName;
  return get(url)();
};

export { getTopics, getAuthor };
