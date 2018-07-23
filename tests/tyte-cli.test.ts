import TyteCli from "../src/TyteCli";

const Application = new TyteCli();

test("It can set the application version", () => {
  Application.version = "10.0.1";
  expect(Application.version).toBe("10.0.1");
});

test("It can set the application description", () => {
  Application.description = "Some dummy description";
  expect(Application.description).toBe("Some dummy description");
});

test("It can set the application version command", () => {
  Application.versionCmd = "-v, --version";
  expect(Application.versionCmd).toBe("-v, --version");
});

test("It can set the application usage", () => {
  Application.usage = "[options] [arguments]";
  expect(Application.usage).toBe("[options] [arguments]");
});
