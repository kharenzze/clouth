<script setup lang="ts">
import { reactive } from "vue";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.infer<typeof schema>;

const state = reactive({
  email: "",
  password: "",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "primary",
  });
  console.log(event.data);
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <UCard class="w-96">
      <template #header>
        <h1 class="text-2xl font-bold text-center">Sign In</h1>
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

        <UButton type="submit" block> Sign In </UButton>
      </UForm>

      <template #footer>
        <p class="text-sm text-center">
          Don't have an account?
          <ULink to="/signup" class="text-primary">Sign Up</ULink>
        </p>
      </template>
    </UCard>
  </div>
</template>
