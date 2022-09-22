export const addQueriesToUrl = (
  baseUrl: string,
  queries: Record<string, any> = {}
): string => {
  const q: string[] = [];
  if (!queries) {
    return baseUrl;
  }
  Object.keys(queries).forEach((key) => {
    if (Array.isArray(queries[key])) {
      (queries[key] as Array<string>).forEach((val, i) => {
        q.push(`${key}[${i}]=${val}`);
      });
    } else {
      if (queries[key] !== undefined && queries[key] !== null) {
        q.push(`${key}=${queries[key]}`);
      }
    }
  });
  return baseUrl + '?' + q.join('&');
};
