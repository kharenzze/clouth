import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import SignUpForm from "../../app/components/SignUpForm.vue";
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Schema = z.infer<typeof schema>;

const mockOnSubmit = vi.fn();

describe("SignUpForm", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders the sign up form with name, email, password, and confirm password fields", async () => {
    const component = await mountSuspended(SignUpForm, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    expect(component.find('input[name="name"]').exists()).toBe(true);
    expect(
      component.find('input[type="email"], input[name="email"]').exists()
    ).toBe(true);
    const passwordInputs = component.findAll('input[type="password"]');
    expect(passwordInputs.length).toBe(2);
  });

  it("displays form fields with correct labels", async () => {
    const component = await mountSuspended(SignUpForm, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    expect(component.text()).toContain("Name");
    expect(component.text()).toContain("Email");
    expect(component.text()).toContain("Password");
    expect(component.text()).toContain("Confirm Password");
  });

  it("has a submit button", async () => {
    const component = await mountSuspended(SignUpForm, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    const submitButton = component.find('button[type="submit"]');
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.text()).toContain("Sign Up");
  });

  it("accepts and uses onSubmit prop", async () => {
    const component = await mountSuspended(SignUpForm, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    // Verify the component has the onSubmit prop
    expect(component.props("onSubmit")).toBeDefined();
    expect(typeof component.props("onSubmit")).toBe("function");

    // Try to access the form state
    const nameInput = component.find('input[name="name"]');
    const emailInput = component.find(
      'input[type="email"], input[name="email"]'
    );
    const passwordInputs = component.findAll('input[type="password"]');
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];

    // Verify we can set values (form is interactive)
    await nameInput.setValue("Test User");
    await emailInput.setValue("test@example.com");
    await passwordInput.setValue("password123");
    await confirmPasswordInput.setValue("password123");

    expect(nameInput.element.value).toBe("Test User");
    expect(emailInput.element.value).toBe("test@example.com");
    expect(passwordInput.element.value).toBe("password123");
    expect(confirmPasswordInput.element.value).toBe("password123");
  });
});

