export default function csvToJson<T>(
  content: string,
  separator = ","
): Array<T> {
  const [headers, ...rows] = content
    .split("\n")
    .map((row) => row.split(separator));

  return rows.map((row) => {
    return headers.reduce(
      (acc, header, index) => ({
        ...acc,
        [header]: row[index]?.trim(),
      }),
      {}
    ) as T;
  });
}
