const preload = ["js", "css", "font"];
const handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    preload: ({ type }) => preload.includes(type)
  });
  return response;
};
export {
  handle
};
