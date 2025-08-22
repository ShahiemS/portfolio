<script setup lang="ts">
const { id, title } = defineProps(["id", "title"])
</script>

<template>
    <section :id="id" className="scroll-mt-24 my-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{{ title }}</h2>
        <div className="mt-6">
            <slot />
        </div>
    </section>
</template>
