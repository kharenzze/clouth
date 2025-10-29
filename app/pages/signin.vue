<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.infer<typeof schema>;

const toast = useToast();
const authClient = useAuthClient();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await authClient.signIn.email(toValue(event.data));
  if (response.error) {
    toast.add({
      title: "Error",
      description: response.error.message,
      color: "error",
    });
  } else {
    navigateTo("/");
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <UCard class="w-96">
      <template #header>
        <h1 class="text-2xl font-bold text-center">Sign In</h1>
      </template>

      <SignInForm :on-submit="onSubmit" />

      <template #footer>
        <p class="text-sm text-center">
          Don't have an account?
          <ULink to="/signup" class="text-primary">Sign Up</ULink>
        </p>
      </template>
    </UCard>
  </div>
</template>
