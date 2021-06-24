export const postRequest = (path, urlData = {}) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(urlData),
  };
  
  return fetch(path, requestOptions);
};

export const getRequest = (path, opts = {}) => {
  const methodGET = { method: "GET" };
  const headers = { ...opts.headers };
  return fetch(path, { ...methodGET, ...opts, headers });
};
