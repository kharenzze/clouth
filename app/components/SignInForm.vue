<script setup lang="ts">
import { reactive } from "vue";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.infer<typeof schema>;

const props = defineProps<{
  onSubmit: (event: FormSubmitEvent<Schema>) => void | Promise<void>;
}>();

const state = reactive({
  email: "",
  password: "",
});
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="props.onSubmit"
  >
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" class="w-full" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" class="w-full" />
    </UFormField>

    <UButton type="submit" block> Sign In </UButton>
  </UForm>
</template>
