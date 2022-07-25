export const getIdParam = (req, key = 'id') => {
  const id = req.params[key];

  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }

  throw new TypeError(`Invalid ':${key}' param: "${id}"`);
};
