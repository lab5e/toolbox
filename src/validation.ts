export type ValidationInput = string | number | null | undefined;
export type ValidationOutput = string | boolean;
export type ValidationFunction = (value: ValidationInput) => boolean | string;

const VALIDATION_MESSAGES = {
  NUMBER: "The value must be a number",
  REQUIRED: "You need to provide a value",
};

/**
 * Validate a value
 *
 * @param value Value to validate
 * @param validationFunctions Validation functions to run through
 * @returns  True if it validates or else a validation message
 */
export const validate = (
  value: ValidationInput,
  validationFunctions: ValidationFunction[],
): ValidationOutput => {
  for (let i = 0; i < validationFunctions.length; i += 1) {
    let res = validationFunctions[i](value);

    if (res !== true) {
      return res;
    }
  }

  return true;
};

/**
 * A `required` rule for ValidationInput
 *
 * @param value ValidationInput
 * @param validationMessage Validation message to return if the validation fails
 * @returns True if it validates or else the validation message given
 */
export const required = (
  value: ValidationInput,
  validationMessage: string = VALIDATION_MESSAGES.REQUIRED,
): ValidationOutput => {
  if (value === undefined || value === null) {
    return validationMessage;
  }

  return (
    (typeof value === "string" && value.length > 0) ||
    (typeof value === "number" && !Number.isNaN(value)) ||
    validationMessage
  );
};

/**
 * A `number` rule for ValidationInput
 *
 * @param value ValidationInput
 * @param validationMessage Validation message to return if the validation fails
 * @returns True if it validates or else the validation message given
 */
export const number = (
  value: ValidationInput,
  validationMessage: string = VALIDATION_MESSAGES.NUMBER,
): ValidationOutput => {
  const isRequired = required(value);
  if (isRequired !== true) {
    return isRequired;
  }

  return !Number.isNaN(parseFloat((value as string | number).toString())) || validationMessage;
};

/**
 * A `between` rule for ValidationInput
 *
 * @param value ValidationInput
 * @param min Minimum value, inclusive
 * @param max Maximum value, inclusive
 * @returns True if it validates or else validation message
 */
export const between = (value: ValidationInput, min: number, max: number): ValidationOutput => {
  const numberValidated = number(value);

  if (numberValidated !== true) {
    return numberValidated;
  }

  const valueAsNumber = parseFloat((value as number | string).toString());
  return (
    (min <= valueAsNumber && valueAsNumber <= max) || `Number has to be between ${min} and ${max}`
  );
};

/**
 * A `minimum` rule for ValidationInput
 *
 * @param value ValidationInput
 * @param min Minimum value, inclusive
 * @returns True if it validates or else validation message
 */
export const minimum = (value: ValidationInput, min: number): ValidationOutput => {
  const numberValidated = number(value);

  if (numberValidated !== true) {
    return numberValidated;
  }

  const valueAsNumber = parseFloat((value as number | string) as string);
  return min <= valueAsNumber || `Number has to be minimum ${min}`;
};

/**
 * A `maximum` rule for ValidationInput
 *
 * @param value ValidationInput
 * @param max Minimum value, inclusive
 * @returns True if it validates or else validation message
 */
export const maximum = (value: ValidationInput, max: number): ValidationOutput => {
  const numberValidated = number(value);

  if (numberValidated !== true) {
    return numberValidated;
  }

  const valueAsNumber = parseFloat((value as number | string).toString() as string);
  return max >= valueAsNumber || `Number has to be maximum ${max}`;
};

/**
 * Initiates a new Validation object upon call
 *
 * @returns Validation object ready to be set
 */
export const initValidation = (): Validation => {
  return new Validation();
};

/**
 * Validation is a utility class for creating a chain of validation rules.
 */
export class Validation {
  private rules: ValidationFunction[] = [];

  /**
   * Get all rules created so far
   *
   * @returns All the created rules as an array
   */
  get(): ValidationFunction[] {
    return this.rules;
  }

  /**
   * Add required rule for validation chain
   *
   * @param validationMessage Optional specific validation message for the UI
   * @returns Returns true if the value is set
   */
  required(validationMessage = VALIDATION_MESSAGES.REQUIRED): Validation {
    this.rules.push((value: ValidationInput) => {
      return required(value, validationMessage);
    });
    return this;
  }

  /**
   * Add rule that the value must be a number
   *
   * @param validationMessage Optional specific validation message for the UI
   * @returns Returns true if the value is a number
   */
  number(validationMessage = VALIDATION_MESSAGES.NUMBER): Validation {
    this.rules.push((value: ValidationInput) => {
      return number(value, validationMessage);
    });
    return this;
  }

  /**
   * Add rule that the value must be a number between min and max (inclusive)
   *
   * @param min Minimum inclusive value
   * @param max Maximum inclusive value
   * @returns Returns true if the value is a number between given min and max
   */
  between(min: number, max: number): Validation {
    this.rules.push((value: ValidationInput) => {
      return between(value, min, max);
    });
    return this;
  }

  /**
   * Add rule that the value must be a number and minimum min (inclusive)
   *
   * @param min Minimum inclusive value
   * @returns Returns true if the value is a number and minimum given min
   */
  min(min: number): Validation {
    this.rules.push((value: ValidationInput) => {
      return minimum(value, min);
    });
    return this;
  }

  /**
   * Add rule that the value must be a number and maximum max (inclusive)
   *
   * @param max Maximum inclusive value
   * @returns Returns true if the value is a number and maximum given max
   */
  max(max: number): Validation {
    this.rules.push((value: ValidationInput) => {
      return maximum(value, max);
    });
    return this;
  }

  /**
   * Validate a value based on added rules
   *
   * @param value Value to validate
   * @returns True if it validates or else validation message
   */
  validate(value: ValidationInput): ValidationOutput {
    return validate(value, this.rules);
  }
}
