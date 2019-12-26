const apiBase = process.env.REACT_APP_API_BASE;

export const fetchSplyts = () =>
  fetch(`${apiBase}/splyts`).then(res => res.json());
