<script setup lang="ts">
import { reactive } from "vue";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const authClient = useAuthClient();

const schema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Schema = z.infer<typeof schema>;

const state = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await authClient.signUp.email({
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

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" class="w-full" />
        </UFormField>

        <UFormField label="Confirm Password" name="confirmPassword">
          <UInput
            v-model="state.confirmPassword"
            type="password"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" block> Sign Up </UButton>
      </UForm>

      <template #footer>
        <p class="text-sm text-center">
          Already have an account?
          <ULink to="/signin" class="text-primary">Sign In</ULink>
        </p>
      </template>
    </UCard>
  </div>
</template>
