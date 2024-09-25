<!-- src/ActivityForm.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { entries, selectedActivities } from './stores/entries.js';
  import { get } from 'svelte/store';

  let currentSelectedActivities = [];
  const unsubscribe = selectedActivities.subscribe((value) => {
    currentSelectedActivities = value;
  });
  onDestroy(() => {
    unsubscribe();
  });

  // ------------------- General Activity Logging -------------------
  let activityData = {};

  // Initialize activityData based on selectedActivities
  function initializeActivityData() {
    currentSelectedActivities.forEach((activity) => {
      if (activity !== 'Exercise' && activity !== 'Cardio') {
        activityData[activity] = '';
      }
    });
  }

  // Suggest previous values
  function suggestActivity(activity) {
    const allEntries = get(entries);
    const lastEntry = allEntries.find((entry) => entry.activities[activity.toLowerCase().replace(/\s+/g, '')]);
    if (lastEntry) {
      activityData[activity] = lastEntry.activities[activity.toLowerCase().replace(/\s+/g, '')];
    }
  }

  // Log activity
  function logActivity(activity) {
    if (activityData[activity]) {
      entries.update((currentEntries) => {
        const today = new Date().toISOString().split('T')[0];
        let todayEntry = currentEntries.find((entry) => entry.date === today);
        if (!todayEntry) {
          todayEntry = { date: today, activities: {} };
          currentEntries.unshift(todayEntry);
        }
        todayEntry.activities[activity.toLowerCase().replace(/\s+/g, '')] = parseFloat(activityData[activity]);
        return currentEntries;
      });
      activityData[activity] = '';
      alert(`${activity} logged successfully!`);
    } else {
      alert(`Please enter a value for ${activity}.`);
    }
  }

  // ------------------- Cardio Logging -------------------
  let cardioSpeed = '';
  let cardioTime = '';
  function suggestCardio() {
    const allEntries = get(entries);
    const lastCardioLog = allEntries.find((log) => log.activities.cardio);
    if (lastCardioLog) {
      cardioSpeed = lastCardioLog.activities.cardio.speed;
      cardioTime = lastCardioLog.activities.cardio.time + 5;
    }
  }
  function logCardio() {
    if (cardioSpeed && cardioTime) {
      entries.update((currentEntries) => {
        const today = new Date().toISOString().split('T')[0];
        let todayEntry = currentEntries.find((entry) => entry.date === today);
        if (!todayEntry) {
          todayEntry = { date: today, activities: {} };
          currentEntries.unshift(todayEntry);
        }
        todayEntry.activities.cardio = {
          speed: parseFloat(cardioSpeed),
          time: parseInt(cardioTime),
        };
        return currentEntries;
      });
      cardioSpeed = '';
      cardioTime = '';
      alert('Cardio activity logged successfully!');
    } else {
      alert('Please fill out all cardio fields.');
    }
  }

  // ------------------- Exercise Logging -------------------
  let exercises = [
    'Bench Press',
    'Squat',
    'Deadlift',
    'Overhead Press',
    'Barbell Row',
    'Yoga',
    // Add more exercises as needed
  ];
  let exercisesToLog = [
    {
      searchQuery: '',
      selectedExercise: '',
      filteredExercises: [],
      sets: [{ weight: '', reps: '' }],
    },
  ];
  function updateFilteredExercises(index) {
    let exerciseEntry = exercisesToLog[index];
    exerciseEntry.filteredExercises = exercises.filter((exercise) =>
      exercise.toLowerCase().includes(exerciseEntry.searchQuery.toLowerCase())
    );
    exercisesToLog = [...exercisesToLog];
  }
  function suggestNextSet(index) {
    let exerciseEntry = exercisesToLog[index];
    const allEntries = get(entries);
    for (let i = 0; i < allEntries.length; i++) {
      const log = allEntries[i];
      if (
        log.activities.exercises &&
        log.activities.exercises.some((ex) => ex.name === exerciseEntry.selectedExercise)
      ) {
        const lastLog = log.activities.exercises.find(
          (ex) => ex.name === exerciseEntry.selectedExercise
        );
        if (lastLog && lastLog.sets.length > 0) {
          exerciseEntry.sets = lastLog.sets.map((set) => ({
            weight: set.weight,
            reps: set.reps + 1,
          }));
          exercisesToLog = [...exercisesToLog];
          return;
        }
      }
    }
    exerciseEntry.sets = [{ weight: '', reps: '' }];
    exercisesToLog = [...exercisesToLog];
  }
  function logExercise(index) {
    let exerciseEntry = exercisesToLog[index];
    if (
      exerciseEntry.selectedExercise &&
      exerciseEntry.sets.every((set) => set.weight && set.reps)
    ) {
      entries.update((currentEntries) => {
        const today = new Date().toISOString().split('T')[0];
        let todayEntry = currentEntries.find((entry) => entry.date === today);
        if (!todayEntry) {
          todayEntry = { date: today, activities: { exercises: [] } };
          currentEntries.unshift(todayEntry);
        }
        const exercise = {
          name: exerciseEntry.selectedExercise,
          sets: exerciseEntry.sets.map((set) => ({
            weight: parseInt(set.weight),
            reps: parseInt(set.reps),
          })),
        };
        todayEntry.activities.exercises = todayEntry.activities.exercises || [];
        todayEntry.activities.exercises.push(exercise);
        return currentEntries;
      });
      // Reset the exercise entry
      exercisesToLog[index].sets = [{ weight: '', reps: '' }];
      exercisesToLog[index].searchQuery = '';
      exercisesToLog[index].selectedExercise = '';
      exercisesToLog[index].filteredExercises = [];
      exercisesToLog = [...exercisesToLog];
      alert('Exercise logged successfully!');
    } else {
      alert('Please fill out all exercise fields.');
    }
  }
  function addSet(index) {
    let exerciseEntry = exercisesToLog[index];
    exerciseEntry.sets = [...exerciseEntry.sets, { weight: '', reps: '' }];
    exercisesToLog = [...exercisesToLog];
  }
  function removeSet(index) {
    let exerciseEntry = exercisesToLog[index];
    if (exerciseEntry.sets.length > 1) {
      exerciseEntry.sets = exerciseEntry.sets.slice(0, -1);
      exercisesToLog = [...exercisesToLog];
    }
  }
  function addAnotherExercise() {
    exercisesToLog = [
      ...exercisesToLog,
      {
        searchQuery: '',
        selectedExercise: '',
        filteredExercises: [],
        sets: [{ weight: '', reps: '' }],
      },
    ];
  }

  onMount(() => {
    initializeActivityData();
  });
</script>

<style>
  .quick-log {
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 20px;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    background-color: var(--component-bg);
    color: var(--component-text);
    box-shadow: 0 4px 6px var(--shadow-color);
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  }
  h2 {
    margin-bottom: 25px;
    text-align: center;
    color: var(--accent-color);
    font-size: 2rem;
  }
  h3 {
    color: var(--accent-color);
    margin-bottom: 15px;
    text-align: center;
  }
  h4 {
    margin-top: 20px;
    margin-bottom: 15px;
    color: var(--component-text);
    font-weight: bold;
  }
  input,
  select,
  textarea {
    width: 100%;
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid var(--accent-color);
    background-color: var(--input-bg);
    color: var(--input-text);
    font-size: 1rem;
  }
  input::placeholder {
    color: var(--input-text);
    opacity: 0.7;
  }
  input:focus {
    border-color: var(--button-hover-bg);
    outline: none;
  }
  button {
    width: 100%;
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 8px;
    background-color: var(--button-bg);
    color: var(--button-text);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
  button:hover {
    background-color: var(--button-hover-bg);
  }
  .set-group {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  .set-group input {
    flex: 1;
  }
  .set-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  .set-buttons button {
    flex: 1;
  }
  .suggestion {
    margin-top: -10px;
    margin-bottom: 15px;
    font-weight: bold;
    color: var(--accent-color);
  }
  .autocomplete-list {
    background-color: var(--input-bg);
    border-radius: 8px;
    position: absolute;
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
    z-index: 100;
    top: 100%;
    left: 0;
    box-shadow: 0 4px 6px var(--shadow-color);
  }
  .autocomplete-item {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid var(--shadow-color);
    color: var(--input-text);
  }
  .autocomplete-item:hover {
    background-color: var(--button-bg);
    color: var(--button-text);
  }
</style>

<div class="container">
  <div class="quick-log">
    <h2>Log Your Activities</h2>
    <!-- Dynamically Render Sections Based on Selected Activities -->
    {#if currentSelectedActivities.includes('Exercise')}
      <!-- Exercise Logging Section -->
      <h3>Log Exercise</h3>
      {#each exercisesToLog as exerciseEntry, index}
        <div style="position: relative;">
          <!-- Autocomplete search input for exercises -->
          <input
            type="text"
            placeholder="Search for an exercise..."
            bind:value={exerciseEntry.searchQuery}
            on:input={() => updateFilteredExercises(index)}
          />
          {#if exerciseEntry.filteredExercises.length > 0}
            <div class="autocomplete-list">
              {#each exerciseEntry.filteredExercises as exercise}
                <div
                  class="autocomplete-item"
                  on:click={() => {
                    exercisesToLog[index].selectedExercise = exercise;
                    exercisesToLog[index].searchQuery = exercise;
                    exercisesToLog[index].filteredExercises = [];
                    suggestNextSet(index);
                  }}
                >
                  {exercise}
                </div>
              {/each}
            </div>
          {/if}
        </div>
        <!-- Weight and Reps for each set -->
        {#if exerciseEntry.selectedExercise}
          <h4>{exerciseEntry.selectedExercise}</h4>
          {#each exerciseEntry.sets as set, setIndex}
            <div class="set-group">
              <input
                type="number"
                bind:value={set.weight}
                placeholder="Weight (lbs)"
                min="0"
              />
              <input
                type="number"
                bind:value={set.reps}
                placeholder="Reps"
                min="0"
              />
            </div>
          {/each}
          <!-- Add/Remove sets -->
          <div class="set-buttons">
            <button on:click={() => addSet(index)}>Add Another Set</button>
            {#if exerciseEntry.sets.length > 1}
              <button on:click={() => removeSet(index)}>Remove Last Set</button>
            {/if}
          </div>
          <button on:click={() => logExercise(index)}>Log Exercise</button>
        {/if}
        {#if index !== exercisesToLog.length - 1}
          <hr />
        {/if}
      {/each}
      <button on:click={addAnotherExercise}>Add Another Exercise</button>
      <hr />
    {/if}

    {#if currentSelectedActivities.includes('Cardio')}
      <!-- Cardio Section -->
      <h3>Log Cardio</h3>
      <input
        type="number"
        bind:value={cardioSpeed}
        placeholder="Speed (mph)"
        on:focus={suggestCardio}
        min="0"
        step="0.1"
      />
      <input
        type="number"
        bind:value={cardioTime}
        placeholder="Time (minutes)"
        min="0"
      />
      <button on:click={logCardio}>Log Cardio</button>
      <hr />
    {/if}

    {#each currentSelectedActivities as activity}
      {#if activity !== 'Exercise' && activity !== 'Cardio'}
        <h3>Log {activity}</h3>
        <input
          type="number"
          bind:value={activityData[activity]}
          placeholder="Enter {activity}"
          on:focus={() => suggestActivity(activity)}
          min="0"
          step="0.1"
        />
        <button on:click={() => logActivity(activity)}>Log {activity}</button>
        <hr />
      {/if}
    {/each}
  </div>
</div>
