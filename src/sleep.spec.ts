import { sleep } from "./sleep";

describe("Sleep", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return a type of promise", () => {
    // Best way to ensure it's a promise is to check whether it has a then function
    expect(typeof sleep(600).then).toBe("function");
  });

  it("should sleep the given amount of ms", (done) => {
    const thenFunc = jest.fn();
    const catchFunc = jest.fn();
    sleep(20000)
      .then(() => {
        thenFunc();
        done();
      })
      .catch(catchFunc);

    expect(catchFunc).not.toHaveBeenCalled();
    expect(thenFunc).not.toBeCalled();

    jest.advanceTimersByTime(20000);
  });
});
