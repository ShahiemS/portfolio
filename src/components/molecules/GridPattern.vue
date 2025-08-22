<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{ subtle?: boolean }>();

const dot = computed(() =>
  props.subtle ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.12)'
);
const line = computed(() =>
  props.subtle ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.10)'
);

const host = ref<HTMLElement | null>(null);

// target = where we want to be; pos = where we are (for smoothing)
const target = ref({ x: 0, y: 0 });
const pos = ref({ x: 0, y: 0 });

const strength = 20; // max px shift of the grid
const easing = 0.08; // 0..1 (higher = snappier)
let rafId: number | null = null;

function onMove(e: MouseEvent) {
  const el = host.value;
  if (!el) return;

  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;

  // Normalize mouse position to [-1, 1] in both axes
  const nx = (e.clientX - cx) / (r.width / 2);
  const ny = (e.clientY - cy) / (r.height / 2);

  target.value.x = nx * strength;
  target.value.y = ny * strength;
}

function tick() {
  pos.value.x += (target.value.x - pos.value.x) * easing;
  pos.value.y += (target.value.y - pos.value.y) * easing;
  rafId = requestAnimationFrame(tick);
}

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true });
  rafId = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove);
  if (rafId) cancelAnimationFrame(rafId);
});

const styleObj = computed(() => {
  const offsetX = `${pos.value.x}px`;
  const offsetY = `${pos.value.y}px`;

  return {
    backgroundImage: `radial-gradient(circle at 1px 1px, ${dot.value} 1px, transparent 1px),
                      linear-gradient(0deg, ${line.value} 1px, transparent 1px),
                      linear-gradient(90deg, ${line.value} 1px, transparent 1px)`,
    backgroundSize: '20px 20px, 40px 40px, 40px 40px',
    backgroundPosition: `${offsetX} ${offsetY}, ${offsetX} ${offsetY}, ${offsetX} ${offsetY}`,
    willChange: 'background-position'
  } as const;
});
</script>

<template>
  <div ref="host" aria-hidden="true"
    class="pointer-events-none absolute inset-0 opacity-80 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]"
    :style="styleObj" />
</template>
