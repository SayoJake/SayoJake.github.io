<!-- src/App.svelte -->
<script>
  import './global.css'; // Import global CSS for themes
  import Header from './Header.svelte';
  import UserInfo from './UserInfo.svelte';
  import Customization from './Customization.svelte';
  import Goals from './Goals.svelte';
  import PerformanceOverview from './PerformanceOverview.svelte';
  import ActivityForm from './ActivityForm.svelte';
  import PreviousEntries from './PreviousEntries.svelte';
  import { theme } from './stores/entries.js';
  import { onMount, onDestroy } from 'svelte';

  let currentTheme = 'dark'; // Set default theme to 'dark'

  // Subscribe to the theme store to reactively update the theme
  const unsubscribeTheme = theme.subscribe((value) => {
    currentTheme = value;
    document.body.className = ''; // Remove existing theme classes
    document.body.classList.add(`theme-${currentTheme}`); // Add the new theme class
  });

  onMount(() => {
    // Initialize theme on load
    document.body.classList.add(`theme-${currentTheme}`);
  });

  onDestroy(() => {
    // Clean up the subscription when the component is destroyed
    unsubscribeTheme();
  });
</script>

<style>
  main {
    padding: 20px;
    min-height: 100vh;
    transition: background-color 0.3s, color 0.3s;
  }
</style>

<main>
  <Header title="Weight Lifting Tracker" />
  <UserInfo />
  <Customization />
  <Goals />
  <PerformanceOverview />
  <ActivityForm />
  <PreviousEntries />
</main>
