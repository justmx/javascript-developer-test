const { httpGet } = require("./mock-http-interface");

const getHttpResult = async (url) => {
  const res = await httpGet(url);
  // Optional chaining in higher version node
  // const message = JSON.parse(res?.body ?? "{}").message;
  const message = JSON.parse((res && res.body) || "{}").message;
  const key = res.status === 200 ? "Arnie Quote" : "FAILURE";
  const result = { [key]: message };
  return Promise.resolve(result);
};

const getArnieQuotes = async (urls) => {
  if (!urls || urls.length === 0) return [];
  const results = await Promise.all(urls.map(getHttpResult));
  return results;
};

module.exports = {
  getArnieQuotes,
};
