<script setup lang="ts">
const auth = await useServersideAuth();
const authClient = useAuthClient();

if (!auth) {
  //await navigateTo("/signin");
}

const signOut = async () => {
  await authClient.signOut();
  await navigateTo("/signin");
};
const email = auth.value?.user?.email;
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <UCard class="w-96">
      <template #header>
        <h1 class="text-2xl font-bold text-center">Hello</h1>
      </template>

      <div class="space-y-2 text-center">
        <p>You're are logged in as</p>
        <p>
          <b>{{ email }}</b>
        </p>
      </div>
      <div class="flex justify-center mt-4">
        <UButton @click="signOut">Sign Out</UButton>
      </div>
    </UCard>
  </div>
</template>
