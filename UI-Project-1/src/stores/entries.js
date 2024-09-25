// src/stores/entries.js
import { writable } from 'svelte/store';

// Add dummy entries
const dummyEntries = [
  {
    date: '2023-09-28',
    activities: {
      water: 60,
      cardio: { speed: 5.0, time: 30 },
      stretching: 15,
      currentWeight: 180,
      exercises: [
        {
          name: 'Bench Press',
          sets: [
            { weight: 135, reps: 10 },
            { weight: 145, reps: 8 },
          ],
        },
      ],
    },
  },
  {
    date: '2023-09-29',
    activities: {
      water: 70,
      cardio: { speed: 5.5, time: 35 },
      stretching: 10,
      currentWeight: 179,
      exercises: [
        {
          name: 'Squat',
          sets: [
            { weight: 185, reps: 10 },
            { weight: 205, reps: 8 },
          ],
        },
      ],
    },
  },
  {
    date: '2023-09-30',
    activities: {
      water: 80,
      cardio: { speed: 6.0, time: 40 },
      stretching: 20,
      currentWeight: 178,
      exercises: [
        {
          name: 'Deadlift',
          sets: [
            { weight: 225, reps: 10 },
            { weight: 245, reps: 8 },
          ],
        },
      ],
    },
  },
  // Add more entries as desired
];

const initialSelectedActivities = ['Exercise', 'Water Intake', 'Cardio', 'Stretching', 'Current Weight'];
const allActivities = ['Exercise', 'Water Intake', 'Cardio', 'Stretching', 'Current Weight', 'Sleep', 'Meditation', 'Diet', 'Yoga', 'Running', 'Cycling', 'Swimming', 'Walking'];

export const entries = writable(dummyEntries);
export const selectedActivities = writable(initialSelectedActivities);
export const availableActivities = writable(allActivities.filter(activity => !initialSelectedActivities.includes(activity)));
export const theme = writable('dark');

// Initialize goals for all possible activities
const initialGoals = {
  exercises: {
    'Bench Press': { weight: 150, reps: 10 },
    'Squat': { weight: 200, reps: 10 },
    'Deadlift': { weight: 240, reps: 10 },
  },
};

// Add default goals for initialSelectedActivities
initialSelectedActivities.forEach(activity => {
  if (activity !== 'Exercise') {
    initialGoals[activity.toLowerCase().replace(/\s+/g, '')] = 0;
  }
});

export const goals = writable(initialGoals);
