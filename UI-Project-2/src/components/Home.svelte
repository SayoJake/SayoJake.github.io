<script>
  import CircleProgress from '../CircleChart.svelte';
  import {
    totalChapters,
    currentChapter,
    totalReadingTime,
    timeSpentPerChapter,
    currentPage,
    totalPages
  } from '../store.js';
  import { derived } from 'svelte/store';

  // Calculate progress based on currentChapter and totalChapters
  const progress = derived(
    [currentPage, totalPages],
    ([$currentPage, $totalPages]) => Number((($currentPage / $totalPages) * 100).toFixed(1)) // round to one decimal place
  );

  // Sample chapter summaries
  let chapterSummaries = [
    'Summary of Chapter 1...',
    'Summary of Chapter 2...',
    // Add summaries up to chapter 20
  ];
</script>

<style>
    /* Existing styles remain unchanged */
</style>

<div class="main">
  <h2>Eragon Book One: The Inheritance Title</h2>
  <div class="circle-progress-container">
    <CircleProgress progress={$progress} />
  </div>
  <div class="stats">
    <div class="stat-item">Chapter {$currentChapter} of {$totalChapters}</div>
    <div class="stat-item">Total Reading Time: {$totalReadingTime} minutes</div>
    <div class="stat-item">Current Chapter Time: {$timeSpentPerChapter[$currentChapter - 1] || 0} minutes</div>
    <div class="stat-item">Page {$currentPage} of {$totalPages}</div>
  </div>
</div>