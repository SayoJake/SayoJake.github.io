<!-- src/Goals.svelte -->
<script>
  import { goals, selectedActivities } from './stores/entries.js';
  import { onDestroy } from 'svelte';
  let currentGoals = {};
  let selected = [];
  let isCollapsed = true;
  // Subscribe to goals and selectedActivities
  const unsubscribeGoals = goals.subscribe((value) => {
    currentGoals = value;
  });
  const unsubscribeSelected = selectedActivities.subscribe((value) => {
    selected = value;
  });
  onDestroy(() => {
    unsubscribeGoals();
    unsubscribeSelected();
  });
  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }
  function updateGoal(activity) {
    let key = activity.toLowerCase().replace(/\s+/g, '');
    if (activity === 'Cardio') {
      goals.update((g) => {
        g.cardioSpeed = parseFloat(currentGoals.cardioSpeed) || 0;
        g.cardioTime = parseInt(currentGoals.cardioTime) || 0;
        return g;
      });
      alert('Cardio goals updated!');
    } else {
      goals.update((g) => {
        g[key] = parseFloat(currentGoals[key]) || 0;
        return g;
      });
      alert(`${activity} goal updated!`);
    }
  }
  function updateExerciseGoal(exercise) {
    goals.update((g) => {
      g.exercises[exercise].weight = parseInt(currentGoals.exercises[exercise].weight) || 0;
      g.exercises[exercise].reps = parseInt(currentGoals.exercises[exercise].reps) || 0;
      return g;
    });
    alert(`${exercise} goals updated!`);
  }
</script>
<style>
  .goals {
    background-color: var(--component-bg);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px var(--shadow-color);
    color: var(--component-text);
    margin-bottom: 30px;
    max-width: 800px;
    margin: 0 auto;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  }
  h3 {
    color: var(--accent-color);
    margin-bottom: 25px;
    text-align: center;
    font-size: 1.8rem;
  }
  .goal-section {
    margin-bottom: 30px;
  }
  .goal-section h4 {
    margin-bottom: 15px;
    color: var(--component-text);
    font-size: 1.2rem;
    font-weight: bold;
  }
  .goal-section input {
    margin-bottom: 15px;
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid var(--accent-color);
    background-color: var(--input-bg);
    color: var(--input-text);
    font-size: 1rem;
  }
  .goal-section button {
    margin-top: 10px;
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    background-color: var(--button-bg);
    color: var(--button-text);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
  .goal-section button:hover {
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
<div class="goals">
  <div class="header">
    <h3>Set Your Goals</h3>
    <button class="collapse-button" on:click={toggleCollapse}>
      {#if isCollapsed}▼{/if}
      {#if !isCollapsed}▲{/if}
    </button>
  </div>
  {#if !isCollapsed}
    {#each selected as activity}
      {#if activity !== 'Exercise' && activity !== 'Cardio'}
        <div class="goal-section">
          <h4>{activity} Goal</h4>
          <input
            type="number"
            bind:value={currentGoals[activity.toLowerCase().replace(/\s+/g, '')]}
            placeholder="Enter {activity} goal"
            min="0"
            step="0.1"
          />
          <button on:click={() => updateGoal(activity)}>Update {activity} Goal</button>
        </div>
      {/if}
      {#if activity === 'Cardio'}
        <div class="goal-section">
          <h4>Cardio Goals</h4>
          <input
            type="number"
            bind:value={currentGoals.cardioSpeed}
            placeholder="Enter cardio speed goal (mph)"
            min="0"
            step="0.1"
          />
          <input
            type="number"
            bind:value={currentGoals.cardioTime}
            placeholder="Enter cardio time goal (minutes)"
            min="0"
          />
          <button on:click={() => updateGoal('Cardio')}>Update Cardio Goals</button>
        </div>
      {/if}
    {/each}
    <!-- Exercise Goals -->
    {#if selected.includes('Exercise')}
      <div class="goal-section">
        <h4>Exercise Goals</h4>
        {#each Object.keys(currentGoals.exercises || {}) as exercise}
          <div>
            <h5>{exercise}</h5>
            <input
              type="number"
              bind:value={currentGoals.exercises[exercise].weight}
              placeholder="Enter weight goal (lbs)"
              min="0"
            />
            <input
              type="number"
              bind:value={currentGoals.exercises[exercise].reps}
              placeholder="Enter reps goal"
              min="0"
            />
            <button on:click={() => updateExerciseGoal(exercise)}>Update {exercise} Goals</button>
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>
