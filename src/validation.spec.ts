import {
  between,
  initValidation,
  maximum,
  minimum,
  number,
  required,
  Validation,
} from "./validation";

describe("Validation", () => {
  describe("Required validator", () => {
    it("should return true if the value is present", () => {
      expect(required("value", "The value is required")).toBe(true);
    });

    it("should return the error message if the value is not present", () => {
      expect(required("", "The value is required")).toBe("The value is required");
    });

    it("should validate the number 0", () => {
      expect(required(0, "The value is required")).toBe(true);
    });

    it("should not validate NaN", () => {
      expect(required(NaN, "The value is required")).toBe("The value is required");
    });

    it("should not validate null", () => {
      expect(required(null, "The value is required")).toBe("The value is required");
    });

    it("should not validate undefined", () => {
      expect(required(undefined, "The value is required")).toBe("The value is required");
    });
  });

  describe("Number validator", () => {
    it("should validate a normal number", () => {
      expect(number(123, "The value must be a number")).toBe(true);
    });

    it("should validate a string number", () => {
      expect(number("123", "The value must be a number")).toBe(true);
    });

    it("should validate a negative number", () => {
      expect(number(-1, "The value must be a number")).toBe(true);
    });

    it("should not validate a string that's not a number", () => {
      expect(number("clearly not a number", "The value must be a number")).toBe(
        "The value must be a number",
      );
    });

    it("should not validate undefined", () => {
      expect(number(undefined, "The value must be a number")).toBe("You need to provide a value");
    });

    it("should not validate null", () => {
      expect(number(null, "The value must be a number")).toBe("You need to provide a value");
    });
  });

  describe("Between validator", () => {
    it("should validate a number between min and max", () => {
      expect(between(5, 0, 10)).toBe(true);
    });

    it("should validate a number that's exactly min", () => {
      expect(between(0, 0, 10)).toBe(true);
    });

    it("should validate a number that's exactly max", () => {
      expect(between(10, 0, 10)).toBe(true);
    });

    it("should validate a number that's exactly max", () => {
      expect(between(10, 0, 10)).toBe(true);
    });

    it("should validate a string that's between min and max", () => {
      expect(between("5", 0, 10)).toBe(true);
    });

    it("should not validate a number lower than min", () => {
      expect(between(-1, 0, 10)).toBe("Number has to be between 0 and 10");
    });

    it("should not validate a number lower than min", () => {
      expect(between(11, 0, 10)).toBe("Number has to be between 0 and 10");
    });

    it("should not validate undefined", () => {
      expect(between(undefined, 0, 10)).toBe("You need to provide a value");
    });

    it("should not validate null", () => {
      expect(between(null, 0, 10)).toBe("You need to provide a value");
    });
  });

  describe("Minimum validator", () => {
    it("should validate a number above min", () => {
      expect(minimum(5, 0)).toBe(true);
    });

    it("should validate a number that's exactly min", () => {
      expect(minimum(0, 0)).toBe(true);
    });

    it("should validate a string that's above min", () => {
      expect(minimum("5", 0)).toBe(true);
    });

    it("should not validate undefined", () => {
      expect(minimum(undefined, 0)).toBe("You need to provide a value");
    });

    it("should not validate null", () => {
      expect(minimum(null, 0)).toBe("You need to provide a value");
    });
  });

  describe("Maximum validator", () => {
    it("should validate a number below max", () => {
      expect(maximum(5, 10)).toBe(true);
    });

    it("should validate a number that's exactly max", () => {
      expect(maximum(10, 10)).toBe(true);
    });

    it("should validate a string that's above max", () => {
      expect(maximum("5", 10)).toBe(true);
    });

    it("should not validate undefined", () => {
      expect(maximum(undefined, 0)).toBe("You need to provide a value");
    });

    it("should not validate null", () => {
      expect(maximum(null, 0)).toBe("You need to provide a value");
    });
  });

  describe("Validation class", () => {
    it("initValdiation should return a fresh Validation object", () => {
      expect(initValidation() instanceof Validation).toBe(true);
    });

    it("should be possible to curry several validators on a Validation class", () => {
      expect(
        initValidation()
          .required()
          .min(0)
          .max(10)
          .get().length,
      ).toBe(3);
    });

    it("should validate a value based on a single validator", () => {
      const requiredValidator = initValidation().required();

      expect(requiredValidator.validate(0)).toBe(true);
      expect(requiredValidator.validate("value")).toBe(true);
      expect(requiredValidator.validate("")).toBe("You need to provide a value");
      expect(requiredValidator.validate(null)).toBe("You need to provide a value");
      expect(requiredValidator.validate(undefined)).toBe("You need to provide a value");

      const numberValidator = initValidation().number();
      expect(numberValidator.validate(0)).toBe(true);
      expect(numberValidator.validate(-15)).toBe(true);
      expect(numberValidator.validate(15)).toBe(true);
      expect(numberValidator.validate("0")).toBe(true);
      expect(numberValidator.validate("not a number")).toBe("The value must be a number");

      const betweenValidator = initValidation().between(0, 10);
      expect(betweenValidator.validate(0)).toBe(true);
      expect(betweenValidator.validate(5)).toBe(true);
      expect(betweenValidator.validate(10)).toBe(true);
      expect(betweenValidator.validate("5")).toBe(true);
      expect(betweenValidator.validate(-1)).toBe("Number has to be between 0 and 10");
      expect(betweenValidator.validate(11)).toBe("Number has to be between 0 and 10");
      expect(betweenValidator.validate("not a number")).toBe("The value must be a number");
    });

    it("should validate a value based on multiple validators", () => {
      const validator = initValidation()
        .min(1)
        .max(10);
      expect(validator.validate(5)).toBe(true);
      expect(validator.validate("5")).toBe(true);
      expect(validator.validate(undefined)).toBe("You need to provide a value");
      expect(validator.validate(15)).toBe("Number has to be maximum 10");
      expect(validator.validate(0)).toBe("Number has to be minimum 1");
    });
  });
});
