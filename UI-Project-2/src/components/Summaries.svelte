<script>
    import { currentChapter, currentPage } from '../store.js';

    export let chapterSummaries = [
      { chapter: 1, summary: 'Summary of Chapter 1...' },
      { chapter: 2, summary: 'Summary of Chapter 2...' },
      // Add more summaries
    ];
</script>

<style>
    .summary-item {
        margin-bottom: 15px;
    }
</style>

<div class="main">
    <h2>Chapter Summaries</h2>
    <p class="positionMarking">Current Chapter: {$currentChapter}, Current Page: {$currentPage}</p>
    {#each chapterSummaries as summary}
        <div class="summary-item">
            <h4>Chapter {summary.chapter}</h4>
            <p>{summary.summary}</p>
        </div>
    {/each}
</div>
