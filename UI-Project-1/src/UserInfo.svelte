<!-- src/UserInfo.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { entries } from './stores/entries.js';
  let user = {
    name: 'Jacob Sayatovic',
    startDate: new Date('2024-09-01'),
  };
  let currentDateTime = '';
  let daysSinceStart = 0;
  let totalActiveDays = 0;
  // Subscribe to entries store to calculate active days
  const unsubscribe = entries.subscribe((value) => {
    totalActiveDays = value.length;
  });
  // Cleanup subscription on component destroy
  onDestroy(() => {
    unsubscribe();
  });
  function updateDateTime() {
    currentDateTime = new Date().toLocaleString();
  }
  function updateDaysSinceStart() {
    const today = new Date();
    const diffTime = Math.abs(today - user.startDate);
    daysSinceStart = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }
  onMount(() => {
    updateDateTime();
    updateDaysSinceStart();
    // Update currentDateTime every minute
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  });
</script>
<style>
  .user-info {
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 30px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    background-color: var(--component-bg);
    box-shadow: 0 4px 8px var(--shadow-color);
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  }
  h2 {
    font-size: 2.5rem;
    margin-bottom: 25px;
    color: var(--accent-color);
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .user-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  .stat-card {
    background-color: var(--input-bg);
    color: var(--component-text);
    padding: 20px;
    border-radius: 8px;
    min-width: 150px;
    box-shadow: 0 2px 4px var(--shadow-color);
  }
  .stat-card h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: var(--accent-color);
  }
  .stat-card p {
    font-size: 1rem;
    margin: 0;
  }
  strong {
    color: var(--accent-color);
  }
</style>
<div class="user-info">
  <h2>User Info</h2>
  <div class="user-stats">
    <div class="stat-card">
      <h3>Name</h3>
      <p>{user.name}</p>
    </div>
    <div class="stat-card">
      <h3>Current Date/Time</h3>
      <p>{currentDateTime}</p>
    </div>
    <div class="stat-card">
      <h3>Days Since Start</h3>
      <p>{daysSinceStart} days</p>
    </div>
    <div class="stat-card">
      <h3>Active Days</h3>
      <p>{totalActiveDays}</p>
    </div>
  </div>
</div>
