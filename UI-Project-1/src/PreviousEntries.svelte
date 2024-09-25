<!-- src/PreviousEntries.svelte -->
<script>
  import { entries, selectedActivities } from './stores/entries.js';
  import { onDestroy } from 'svelte';

  let allEntries = [];
  let currentSelectedActivities = [];

  // Subscribe to entries and selectedActivities
  const unsubscribeEntries = entries.subscribe((value) => {
    allEntries = value;
  });
  const unsubscribeSelected = selectedActivities.subscribe((value) => {
    currentSelectedActivities = value;
  });
  onDestroy(() => {
    unsubscribeEntries();
    unsubscribeSelected();
  });

  // State to track which entry is being edited
  let editState = null;
  let editIndex = -1;

  // Function to initiate edit mode for an entry
  function editEntry(entry, index) {
    editState = JSON.parse(JSON.stringify(entry)); // Deep copy to prevent mutations
    editIndex = index;

    if (!editState.activities.exercises) {
      editState.activities.exercises = [];
    }
    if (!editState.activities.cardio) {
      editState.activities.cardio = { speed: '', time: '' };
    }
  }

  // Function to cancel edit mode
  function cancelEdit() {
    editState = null;
    editIndex = -1;
  }

  // Function to save edited entry
  function saveEdit() {
    if (!editState.date) return;
    entries.update((currentEntries) => {
      const index = currentEntries.findIndex((e) => e.date === editState.date);
      if (index !== -1) {
        currentEntries[index] = JSON.parse(JSON.stringify(editState)); // Deep copy to avoid reactive issues
      }
      return currentEntries;
    });
    alert('Entry updated successfully!');
    cancelEdit();
  }

  // Function to add a set to an exercise
  function addSet(exerciseIndex) {
    editState.activities.exercises[exerciseIndex].sets = [
      ...editState.activities.exercises[exerciseIndex].sets,
      { weight: '', reps: '' },
    ];
  }

  // Function to remove a set from an exercise
  function removeSet(exerciseIndex, setIndex) {
    editState.activities.exercises[exerciseIndex].sets = editState.activities.exercises[
      exerciseIndex
    ].sets.filter((_, i) => i !== setIndex);
  }

  // Function to add a new exercise
  function addExercise() {
    editState.activities.exercises = [
      ...editState.activities.exercises,
      {
        name: '',
        sets: [{ weight: '', reps: '' }],
      },
    ];
  }

  // Function to remove an exercise
  function removeExercise(exerciseIndex) {
    editState.activities.exercises = editState.activities.exercises.filter((_, i) => i !== exerciseIndex);
  }
</script>

<style>
  .entries {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
  }
  .entry {
    background-color: var(--component-bg);
    color: var(--component-text);
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 800px;
    position: relative;
    box-shadow: 0 4px 8px var(--shadow-color);
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  }
  .entry h4 {
    margin-top: 15px;
    color: var(--accent-color);
    font-size: 1.5rem;
  }
  .entry p {
    margin-bottom: 10px;
    font-size: 1rem;
  }
  .activities-section {
    margin-top: 15px;
  }
  .activity {
    margin-bottom: 15px;
  }
  .activity-title {
    font-weight: bold;
    color: var(--accent-color);
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  .edit-button {
    background-color: var(--button-bg);
    color: var(--button-text);
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 15px;
    transition: background-color 0.3s ease;
  }
  .edit-button:hover {
    background-color: var(--button-hover-bg);
  }
  /* Styles for edit overlay */
  .edit-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .edit-form {
    background-color: var(--component-bg);
    color: var(--component-text);
    padding: 30px;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    position: relative;
    box-shadow: 0 4px 8px var(--shadow-color);
  }
  .edit-form h3 {
    margin-bottom: 20px;
    text-align: center;
    color: var(--accent-color);
  }
  .edit-form input {
    width: 100%;
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid var(--accent-color);
    background-color: var(--input-bg);
    color: var(--input-text);
    font-size: 1rem;
  }
  .edit-form button {
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
  .edit-form button:hover {
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
  .exercise-group {
    margin-bottom: 20px;
  }
  .exercise-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
</style>

<div class="entries">
  <h2>Previous Entries</h2>
  {#if allEntries.length > 0}
    {#each allEntries as entry, index (entry.date)}
      <div class="entry">
        <p><strong>Date:</strong> {entry.date}</p>
        <!-- Activities -->
        {#each currentSelectedActivities as activity}
          {#if activity === 'Exercise' && entry.activities.exercises && entry.activities.exercises.length > 0}
            <!-- Exercises -->
            <div class="activities-section">
              <p class="activity-title">Exercises:</p>
              {#each entry.activities.exercises as exercise}
                <div class="activity">
                  <p><strong>{exercise.name}</strong></p>
                  {#each exercise.sets as set, setIndex}
                    <p>Weight: {set.weight} lbs | Reps: {set.reps}</p>
                  {/each}
                </div>
              {/each}
            </div>
          {:else if activity === 'Cardio' && entry.activities.cardio}
            <!-- Cardio Activity -->
            <div class="activities-section">
              <p class="activity-title">Cardio:</p>
              <p>Speed: {entry.activities.cardio.speed} mph</p>
              <p>Time: {entry.activities.cardio.time} minutes</p>
            </div>
          {:else if entry.activities[activity.toLowerCase().replace(/\s+/g, '')]}
            <!-- Other Activities -->
            <div class="activities-section">
              <p class="activity-title">{activity}:</p>
              <p>{entry.activities[activity.toLowerCase().replace(/\s+/g, '')]}</p>
            </div>
          {/if}
        {/each}
        <!-- Edit Button -->
        <button class="edit-button" on:click={() => editEntry(entry, index)}>Edit Entry</button>

        <!-- Edit Entry Modal -->
        {#if editState && editIndex === index}
          <div class="edit-overlay">
            <div class="edit-form">
              <h3>Edit Entry for {editState.date}</h3>
              <!-- Activities -->
              {#each currentSelectedActivities as activity}
                {#if activity === 'Exercise'}
                  <!-- Exercises Section -->
                  <h4>Exercises</h4>
                  {#each editState.activities.exercises as exercise, exerciseIndex}
                    <div class="exercise-group">
                      <input
                        type="text"
                        bind:value={editState.activities.exercises[exerciseIndex].name}
                        placeholder="Exercise Name"
                      />
                      {#each exercise.sets as set, setIndex}
                        <div class="set-group">
                          <input
                            type="number"
                            bind:value={editState.activities.exercises[exerciseIndex].sets[setIndex].weight}
                            placeholder="Weight (lbs)"
                            min="0"
                          />
                          <input
                            type="number"
                            bind:value={editState.activities.exercises[exerciseIndex].sets[setIndex].reps}
                            placeholder="Reps"
                            min="0"
                          />
                          <button on:click={() => removeSet(exerciseIndex, setIndex)}>Remove Set</button>
                        </div>
                      {/each}
                      <button on:click={() => addSet(exerciseIndex)}>Add Set</button>
                      <div class="exercise-actions">
                        <button on:click={() => removeExercise(exerciseIndex)}>Remove Exercise</button>
                      </div>
                    </div>
                  {/each}
                  <button on:click={addExercise}>Add Another Exercise</button>
                {:else if activity === 'Cardio'}
                  <!-- Cardio Section -->
                  <div>
                    <h4>Cardio</h4>
                    <input
                      type="number"
                      bind:value={editState.activities.cardio.speed}
                      placeholder="Speed (mph)"
                      min="0"
                      step="0.1"
                    />
                    <input
                      type="number"
                      bind:value={editState.activities.cardio.time}
                      placeholder="Time (minutes)"
                      min="0"
                    />
                  </div>
                {:else}
                  <!-- Other Activities -->
                  <div>
                    <h4>{activity}</h4>
                    <input
                      type="number"
                      bind:value={editState.activities[activity.toLowerCase().replace(/\s+/g, '')]}
                      placeholder="Enter {activity}"
                      min="0"
                      step="0.1"
                    />
                  </div>
                {/if}
              {/each}
              <!-- Save and Cancel Buttons -->
              <button class="save" on:click={saveEdit}>Save Changes</button>
              <button class="cancel" on:click={cancelEdit}>Cancel</button>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  {:else}
    <p>No entries found.</p>
  {/if}
</div>
