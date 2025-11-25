<script setup lang="ts">
import { useApi } from "@/app/composable/useApi";

const api = useApi();

const exampleData = await api.example.test();
</script>

<template>
  <Card>
    <p>{{ exampleData.message }}</p>
  </Card>
</template>

<style module>

</style>