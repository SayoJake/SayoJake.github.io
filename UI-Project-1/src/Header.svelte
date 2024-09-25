<!-- src/Header.svelte -->
<script>
  export let title = "Tracker App";
  import { theme } from './stores/entries.js';
  import { onDestroy } from 'svelte';

  let themeChoice = 'dark'; // default theme

  // Subscribe to theme store
  const unsubscribeTheme = theme.subscribe((value) => {
    themeChoice = value;
  });

  // Cleanup subscription on destroy
  onDestroy(() => {
    unsubscribeTheme();
  });

  // Function to change theme
  function changeTheme() {
    theme.set(themeChoice);
  }
</script>

<style>
  header {
    background-color: var(--component-bg);
    padding: 20px 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px var(--shadow-color);
    color: var(--component-text);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  h1 {
    margin: 0;
    font-size: 2.5rem;
    color: var(--accent-color);
  }

  .theme-selector {
    display: flex;
    align-items: center;
  }

  select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid var(--accent-color);
    background-color: var(--input-bg);
    color: var(--input-text);
    font-size: 1rem;
  }

  select:focus {
    outline: none;
    border-color: var(--button-hover-bg);
  }
</style>

<header>
  <h1>{title}</h1>
  <div class="theme-selector">
    <select bind:value={themeChoice} on:change={changeTheme}>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="solarized">Solarized</option>
    </select>
  </div>
</header>
