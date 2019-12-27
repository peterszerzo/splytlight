import { Splyt } from "./splyt";

const apiBase = process.env.REACT_APP_API_BASE;

export const fetchSplyts = (): Promise<Splyt[]> =>
  fetch(`${apiBase}/splyts`)
    .then(res => res.json())
    .then(res => res.body.Items);

export const fetchSplyt = (treeId: string): Promise<Splyt> =>
  fetch(`${apiBase}/splyts`)
    .then(res => res.json())
    .then(res => res.body.Items)
    .then(res => res.filter((splyt: Splyt) => splyt.treeId === treeId)[0]);

export const createSplyt = (splyt: Splyt): Promise<Splyt> =>
  fetch(`${apiBase}/splyts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(splyt, null, 0)
  }).then(res => res.json());
