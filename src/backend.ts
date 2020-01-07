import * as splyt from "./splyt";
import { Either, mapLeft } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

const apiBase = process.env.REACT_APP_API_BASE;

const parseSplyt = (raw: Record<string, any>): splyt.Splyt =>
  ({
    ...raw,
    name: raw.name || "Untitled",
    isPublic: Boolean(raw.isPublic) || false
  } as splyt.Splyt);

export const fetchSplyts = (): Promise<splyt.Splyt[]> =>
  fetch(`${apiBase}/splyts`)
    .then(res => res.json())
    .then(res => res.Items.map(parseSplyt));

export const fetchSplyt = (
  treeId: string
): Promise<Either<string, splyt.Splyt>> =>
  fetch(`${apiBase}/splyts/${treeId}`)
    .then(res => res.json())
    .then(res =>
      pipe(
        splyt.SplytCodec.decode(res.Item),
        mapLeft(() => "Something went wrong")
      )
    );

export const createSplyt = (splyt: splyt.Splyt): Promise<splyt.Splyt> =>
  fetch(`${apiBase}/splyts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(splyt, null, 0)
  }).then(res => res.json());
