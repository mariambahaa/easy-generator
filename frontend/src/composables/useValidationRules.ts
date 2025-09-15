export function useValidationRules() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  const rules = {
    required: (v: string) =>
      (!!v && v.toString().trim().length > 0) || "This field is required",
    email: (v: string) => emailRegex.test(v) || "Invalid email",
    minName: (v: string) => v?.trim()?.length >= 3 || "Minimum 3 characters",
    password: (v: string) =>
      passwordRegex.test(v) ||
      "8+ chars with at least a letter, number & special character",
  };

  return { rules, emailRegex, passwordRegex };
}
    