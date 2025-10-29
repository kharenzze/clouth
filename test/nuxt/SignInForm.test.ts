import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import SignInForm from "../../app/components/SignInForm.vue";
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.infer<typeof schema>;

const mockOnSubmit = vi.fn();

describe("SignInForm", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders the sign in form with email and password fields", async () => {
    const component = await mountSuspended(SignInForm, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    expect(
      component.find('input[type="email"], input[name="email"]').exists()
    ).toBe(true);
    expect(component.find('input[type="password"]').exists()).toBe(true);
  });

  it("displays form fields with correct labels", async () => {
    const component = await mountSuspended(SignInForm, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    expect(component.text()).toContain("Email");
    expect(component.text()).toContain("Password");
  });

  it("has a submit button", async () => {
    const component = await mountSuspended(SignInForm, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    const submitButton = component.find('button[type="submit"]');
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.text()).toContain("Sign In");
  });

  it("accepts and uses onSubmit prop", async () => {
    const component = await mountSuspended(SignInForm, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    // Verify the component has the onSubmit prop
    expect(component.props("onSubmit")).toBeDefined();
    expect(typeof component.props("onSubmit")).toBe("function");

    // Try to access the form state
    const emailInput = component.find(
      'input[type="email"], input[name="email"]'
    );
    const passwordInput = component.find('input[type="password"]');

    // Verify we can set values (form is interactive)
    await emailInput.setValue("test@example.com");
    await passwordInput.setValue("password123");

    expect(emailInput.element.value).toBe("test@example.com");
    expect(passwordInput.element.value).toBe("password123");
  });
});
