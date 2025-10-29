<script setup lang="ts">
import { reactive } from "vue";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

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

const props = defineProps<{
  onSubmit: (event: FormSubmitEvent<Schema>) => void | Promise<void>;
}>();

const state = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="props.onSubmit"
  >
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" class="w-full" />
    </UFormField>

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
</template>

