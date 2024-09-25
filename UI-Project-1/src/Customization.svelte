<!-- src/Customization.svelte -->
<script>
  import { goals, selectedActivities, availableActivities } from './stores/entries.js';
  import { onDestroy } from 'svelte';
  let localSelectedActivities = [];
  let localAvailableActivities = [];
  let newActivity = '';
  let isCollapsed = true;
  // Subscribe to selectedActivities and availableActivities
  const unsubscribeSelected = selectedActivities.subscribe((value) => {
    localSelectedActivities = value;
  });
  const unsubscribeAvailable = availableActivities.subscribe((value) => {
    localAvailableActivities = value;
  });
  // Cleanup subscriptions on component destroy
  onDestroy(() => {
    unsubscribeSelected();
    unsubscribeAvailable();
  });
  // Function to add a new activity
  function addActivity() {
    const activity = newActivity.trim();
    if (
      activity &&
      !localSelectedActivities.includes(activity) &&
      localAvailableActivities.includes(activity)
    ) {
      selectedActivities.update((current) => [...current, activity]);
      availableActivities.update((current) => current.filter((a) => a !== activity));
      // Initialize goals for the new activity if it's not 'Exercise'
      if (activity !== 'Exercise') {
        goals.update((g) => {
          g[activity.toLowerCase().replace(/\s+/g, '')] = 0;
          return g;
        });
      }
      newActivity = '';
      alert(`${activity} has been added to your activities!`);
    } else {
      alert('Please enter a valid activity from the available list.');
    }
  }
  // Function to remove an activity
  function removeActivity(activity) {
    if (activity === 'Exercise') {
      alert('Cannot remove Exercise activity.');
      return;
    }
    if (confirm(`Are you sure you want to remove ${activity} from your activities?`)) {
      selectedActivities.update((current) => current.filter((a) => a !== activity));
      availableActivities.update((current) => [...current, activity]);
      // Remove goals associated with the activity if it's not 'Exercise'
      if (activity !== 'Exercise') {
        goals.update((g) => {
          delete g[activity.toLowerCase().replace(/\s+/g, '')];
          return g;
        });
      }
      alert(`${activity} has been removed from your activities.`);
    }
  }
  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }
</script>
<style>
  .customization {
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: var(--component-bg);
    color: var(--component-text);
    box-shadow: 0 4px 6px var(--shadow-color);
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  }
  h3 {
    color: var(--accent-color);
    margin-bottom: 25px;
    text-align: center;
    font-size: 1.8rem;
  }
  .activity-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 25px;
    justify-content: center;
  }
  .activity-item {
    background-color: var(--input-bg);
    padding: 10px 15px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--accent-color);
  }
  .activity-item button {
    background-color: var(--button-bg);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    color: var(--button-text);
    border: none;
    cursor: pointer;
  }
  .activity-item button:hover {
    background-color: var(--button-hover-bg);
  }
  .add-activity {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .add-activity input {
    flex: 1;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid var(--accent-color);
    background-color: var(--input-bg);
    color: var(--input-text);
    font-size: 1rem;
  }
  .add-activity button.add {
    flex: 0 0 120px;
    padding: 15px;
    border-radius: 8px;
    background-color: var(--button-bg);
    color: var(--button-text);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    border: none;
  }
  .add-activity button.add:hover {
    background-color: var(--button-hover-bg);
  }
  .collapse-button {
    background-color: transparent;
    border: none;
    color: var(--accent-color);
    font-size: 1.5rem;
    cursor: pointer;
    margin-bottom: 15px;
  }
  .collapse-button:focus {
    outline: none;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
<div class="customization">
  <div class="header">
    <h3>Customize Your Activities</h3>
    <button class="collapse-button" on:click={toggleCollapse}>
      {#if isCollapsed}▼{/if}
      {#if !isCollapsed}▲{/if}
    </button>
  </div>
  {#if !isCollapsed}
    <!-- Display Selected Activities -->
    <div class="activity-list">
      {#each localSelectedActivities as activity}
        <div class="activity-item">
          <span>{activity}</span>
          <button on:click={() => removeActivity(activity)}>Remove</button>
        </div>
      {/each}
    </div>
    <!-- Add New Activity -->
    <div class="add-activity">
      <input
        type="text"
        bind:value={newActivity}
        placeholder="Add a new activity from the list..."
        list="available-activities"
        aria-label="Add a new activity"
      />
      <datalist id="available-activities">
        {#each localAvailableActivities as activity}
          <option value={activity}></option>
        {/each}
      </datalist>
      <button class="add" on:click={addActivity}>Add</button>
    </div>
  {/if}
</div>
