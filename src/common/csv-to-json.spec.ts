import { describe, expect, test } from "vitest";
import csvToJson from "./csv-to-json";

describe("csv-to-json", () => {
  test("should convert csv to json", () => {
    const input = "name,age\nJoe Bloggs,25";

    const output = csvToJson(input);

    expect(output).deep.equal([
      {
        name: "Joe Bloggs",
        age: "25",
      },
    ]);
  });

  test("should return an empty array when only headers are provided", () => {
    const input = "name,age";

    const output = csvToJson(input);

    expect(output).toHaveLength(0);
  });

  test("should use the provided separator", () => {
    const input = "name|age\nJoe Bloggs|25";

    const output = csvToJson(input, "|");

    expect(output).deep.equal([
      {
        name: "Joe Bloggs",
        age: "25",
      },
    ]);
  });

  test("should trim the values", () => {
    const input = "name,age\nJoe Bloggs , 25";

    const output = csvToJson(input);

    expect(output).deep.equal([
      {
        name: "Joe Bloggs",
        age: "25",
      },
    ]);
  });
});
