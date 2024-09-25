<!-- src/PerformanceOverview.svelte -->
<script>
  import { entries, goals, selectedActivities, theme } from './stores/entries.js';
  import { onDestroy } from 'svelte';
  import { Bar, Line } from 'svelte-chartjs';
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  let allEntries = [];
  let selected = [];
  let currentGoals = {};
  const unsubscribeEntries = entries.subscribe((value) => {
    allEntries = value;
  });
  const unsubscribeSelected = selectedActivities.subscribe((value) => {
    selected = value;
  });
  const unsubscribeGoals = goals.subscribe((value) => {
    currentGoals = value;
  });
  let currentTheme = '';
  const unsubscribeTheme = theme.subscribe((value) => {
    currentTheme = value;
  });
  onDestroy(() => {
    unsubscribeEntries();
    unsubscribeSelected();
    unsubscribeGoals();
    unsubscribeTheme();
  });
  $: currentTheme;
  function getChartColors() {
    const computedStyles = getComputedStyle(document.documentElement);
    return {
      textColor: computedStyles.getPropertyValue('--text-color').trim() || '#000',
      gridColor: computedStyles.getPropertyValue('--grid-line-color').trim() || '#ccc',
      backgroundColor: computedStyles.getPropertyValue('--component-bg').trim() || '#fff',
    };
  }
  $: chartColors = getChartColors();
  $: chartOptions = {
    plugins: {
      title: {
        display: true,
        text: '',
        color: chartColors.textColor,
        font: {
          size: 18,
        },
      },
      legend: {
        labels: {
          color: chartColors.textColor,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        titleColor: chartColors.textColor,
        bodyColor: chartColors.textColor,
        backgroundColor: chartColors.backgroundColor,
        borderColor: chartColors.textColor,
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '',
          color: chartColors.textColor,
          font: {
            size: 14,
          },
        },
        ticks: {
          color: chartColors.textColor,
        },
        grid: {
          color: chartColors.gridColor,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          color: chartColors.textColor,
          font: {
            size: 14,
          },
        },
        ticks: {
          color: chartColors.textColor,
        },
        grid: {
          color: chartColors.gridColor,
        },
      },
    },
  };
  function getActivityData(activity) {
    const dates = allEntries.map((entry) => entry.date);
    const key = activity.toLowerCase().replace(/\s+/g, '');
    const activityData = allEntries.map((entry) => entry.activities[key] || 0);
    const goalValue = currentGoals[key] || 0;
    const goalData = allEntries.map(() => goalValue);
    return {
      labels: dates,
      datasets: [
        {
          label: activity,
          data: activityData,
          backgroundColor: '#e53e3e',
          borderColor: '#e53e3e',
          borderWidth: 1,
        },
        {
          label: 'Goal',
          data: goalData,
          type: 'line',
          borderColor: '#3182ce',
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: '#3182ce',
          pointBorderColor: '#3182ce',
        },
      ],
    };
  }
  function getExerciseData(exerciseName) {
    const dates = allEntries.map((entry) => entry.date);
    const exerciseData = allEntries.map((entry) => {
      const exercise = entry.activities.exercises
        ? entry.activities.exercises.find((ex) => ex.name === exerciseName)
        : null;
      if (exercise) {
        return exercise.sets.reduce((total, set) => total + set.weight * set.reps, 0);
      } else {
        return 0;
      }
    });
    const goalData = allEntries.map(() => {
      const goal = currentGoals.exercises[exerciseName];
      if (goal) {
        return goal.weight * goal.reps;
      } else {
        return 0;
      }
    });
    return {
      labels: dates,
      datasets: [
        {
          label: `${exerciseName} Volume`,
          data: exerciseData,
          backgroundColor: '#4299e1',
          borderColor: '#4299e1',
          borderWidth: 1,
        },
        {
          label: 'Goal Volume',
          data: goalData,
          type: 'line',
          borderColor: '#3182ce',
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: '#3182ce',
          pointBorderColor: '#3182ce',
        },
      ],
    };
  }
  let isCollapsed = true;
  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }
</script>
<style>
  .performance {
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
  .chart-container {
    margin-bottom: 30px;
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
<div class="performance">
  <div class="header">
    <h3>Performance Overview</h3>
    <button class="collapse-button" on:click={toggleCollapse}>
      {#if isCollapsed}▼{/if}
      {#if !isCollapsed}▲{/if}
    </button>
  </div>
  {#if !isCollapsed}
    {#each selected as activity}
      {#if activity !== 'Exercise' && activity !== 'Cardio'}
        <div class="chart-container">
          {#key currentTheme}
            <Bar
              data={getActivityData(activity)}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: `${activity} Over Time`,
                  },
                },
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    title: {
                      ...chartOptions.scales.y.title,
                      text: activity,
                    },
                  },
                },
              }}
            />
          {/key}
        </div>
      {/if}
      {#if activity === 'Cardio'}
        <!-- Cardio Speed Chart -->
        <div class="chart-container">
          {#key currentTheme}
            <Bar
              data={getActivityData('Cardio Speed')}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: 'Cardio Speed Over Time',
                  },
                },
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    title: {
                      ...chartOptions.scales.y.title,
                      text: 'Speed (mph)',
                    },
                  },
                },
              }}
            />
          {/key}
        </div>
        <!-- Cardio Time Chart -->
        <div class="chart-container">
          {#key currentTheme}
            <Line
              data={getActivityData('Cardio Time')}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: 'Cardio Time Over Time',
                  },
                },
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    title: {
                      ...chartOptions.scales.y.title,
                      text: 'Time (minutes)',
                    },
                  },
                },
              }}
            />
          {/key}
        </div>
      {/if}
    {/each}
    <!-- Exercise Charts -->
    {#if selected.includes('Exercise') && Object.keys(currentGoals.exercises || {}).length > 0}
      {#each Object.keys(currentGoals.exercises) as exercise}
        <div class="chart-container">
          {#key currentTheme}
            <Bar
              data={getExerciseData(exercise)}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: `${exercise} Total Volume Over Time`,
                  },
                },
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    title: {
                      ...chartOptions.scales.y.title,
                      text: 'Total Volume (lbs)',
                    },
                  },
                },
              }}
            />
          {/key}
        </div>
      {/each}
    {/if}
  {/if}
</div>
