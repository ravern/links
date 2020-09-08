import unfetch from "isomorphic-unfetch";

export default async function fetch(path, { body, ...options } = {}) {
  const res = await unfetch(`${process.env.BASE_URL}/api${path}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { data, error } = await res.json();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
