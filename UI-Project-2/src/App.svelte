<script>
  import Navigation from './components/Navigation.svelte';
  import Home from './components/Home.svelte';
  import Summaries from './components/Summaries.svelte';
  import Notes from './components/Notes.svelte';
  import Bookmarks from './components/Bookmarks.svelte';
  import Reviews from './components/Reviews.svelte';
  import TestingUI from './TestingUI.svelte';
  import { onMount } from 'svelte';
  import {
    isIdle,
    idleTimer,
    resetIdleTimer,
    handleInteraction,
    currentPage,
    currentChapter,
    totalReadingTime,
    timeSpentPerChapter,
    simulateChapterReadingTime,
    simulatePageReadingTime // Import from store
  } from './store.js';
  import { get } from 'svelte/store';
  import { writable } from 'svelte/store';

  // Rename currentPage to displayedPage
  const displayedPage = writable('Home'); // Initialize with default page

  // Function to handle navigation
  function navigateTo(event) {
    displayedPage.set(event.detail); // Update to use displayedPage
    resetIdleTimer();
  }

  onMount(() => {
    resetIdleTimer();
    return () => clearTimeout(idleTimer);
  });
</script>

<style>
  .book-container {
    width: 600px;
    height: 900px;
    margin: 20px auto;
    border: 1px solid #ccc;
    position: relative;
    background-color: #fff;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border-radius: 5px;
    transition: background-image 0.5s ease;
    z-index: 1000;
  }

  .book-container.idle {
    background-image: url('./images/cover.jpg');
    background-size: cover;
    background-position: center;
  }

  .cover-image {
    width: 100%;
    height: 100%;
    background-image: url('./images/cover.jpg');
    background-size: cover;
    background-position: center;
    animation: fadeIn 0.5s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .testing-ui-container {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1001; /* Above navigation */
  }

  @media (max-width: 640px) {
    .book-container {
      width: 100%;
      height: 100vh;
      border: none;
      box-shadow: none;
      border-radius: 0;
    }

    .testing-ui-container {
      top: 5px;
      right: 5px;
    }
  }
</style>

<!-- Handle global user interactions to reset idle timer -->
<svelte:window on:mousemove={handleInteraction} on:click={handleInteraction} on:keydown={handleInteraction} />

<!-- Testing UI for controlling navigation and reading simulation -->
<div class="testing-ui-container">
  <TestingUI> simulateReadingTime={simulatePageReadingTime} </TestingUI>
</div>

<!-- Main Book Container -->
<div class="book-container" class:idle={$isIdle}>
  {#if !$isIdle}
    <Navigation on:navigate={navigateTo} />
    {#if $displayedPage === 'Home'}
      <Home />
    {:else if $displayedPage === 'Summaries'}
      <Summaries />
    {:else if $displayedPage === 'Notes'}
      <Notes />
    {:else if $displayedPage === 'Bookmarks'}
      <Bookmarks />
    {:else if $displayedPage === 'Reviews'}
      <Reviews />
    {/if}
  {:else}
    <div class="cover-image"></div>
  {/if}
</div>
