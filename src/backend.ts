import { Splyt } from "./splyt";

const apiBase = process.env.REACT_APP_API_BASE;

const parseSplyt = (raw: Record<string, any>): Splyt =>
  ({
    ...raw,
    name: raw.name || "Untitled",
    isPublic: Boolean(raw.isPublic) || false
  } as Splyt);

export const fetchSplyts = (): Promise<Splyt[]> =>
  fetch(`${apiBase}/splyts`)
    .then(res => res.json())
    .then(res => res.Items.map(parseSplyt));

export const fetchSplyt = (treeId: string): Promise<Splyt> =>
  fetch(`${apiBase}/splyts/${treeId}`)
    .then(res => res.json())
    .then(res => parseSplyt(res.Item));

export const createSplyt = (splyt: Splyt): Promise<Splyt> =>
  fetch(`${apiBase}/splyts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(splyt, null, 0)
  })
    .then(res => res.json())
    .then(res => res.body);
