<script lang="ts">
  let { active = false }: { active?: boolean } = $props();
</script>

<div role="status" aria-live="polite" class="sr-only">
  {active ? 'Loading page…' : ''}
</div>
{#if active}
  <div class="fixed inset-x-0 top-0 h-1 bg-neutral-700" aria-hidden="true"></div>
{/if}
