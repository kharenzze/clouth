<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

const authClient = useAuthClient();

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

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await authClient.signUp.email({
    name: toValue(event.data.name),
    email: toValue(event.data.email),
    password: toValue(event.data.password),
  });
  if (response.error) {
    toast.add({
      title: "Error",
      description: response.error.message,
      color: "error",
    });
    return;
  }
  navigateTo("/");
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <UCard class="w-96">
      <template #header>
        <h1 class="text-2xl font-bold text-center">Sign Up</h1>
      </template>

      <SignUpForm @submit="onSubmit" />

      <template #footer>
        <p class="text-sm text-center">
          Already have an account?
          <ULink to="/signin" class="text-primary">Sign In</ULink>
        </p>
      </template>
    </UCard>
  </div>
</template>
