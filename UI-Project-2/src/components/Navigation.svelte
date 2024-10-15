<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let menuOpen = false;

  // Import preview components
  import HomePreview from './preview/HomePreview.svelte';
  import SummariesPreview from './preview/SummariesPreview.svelte';
  import NotesPreview from './preview/NotesPreview.svelte';
  import BookmarksPreview from './preview/BookmarksPreview.svelte';
  import ReviewsPreview from './preview/ReviewsPreview.svelte';

  function toggleMenu() {
    console.log("Hamburger clicked"); // Debugging line
    menuOpen = !menuOpen;
  }

  function navigate(page) {
    dispatch('navigate', page);
    menuOpen = false;
  }
</script>

<style>
  .navigation {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1002;
  }

  .hamburger {
    cursor: pointer;
    width: 35px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: transparent;
    border: none;
    z-index: 1001;
  }

  .hamburger div {
    height: 4px;
    width: 30px;
    background-color: #ffffff;
    border-radius: 2px;
  }

  .menu {
    position: absolute;
    top: 30px; /* Positioned below the hamburger */
    right: 0;
    background-color: #ffffff;
    border: 1px solid #000000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
  }

  .menu-item {
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 150px; /* Fixed width for consistency */
    background: none;
    border: none;
    text-align: left;
  }

  .menu-item:hover {
    background-color: #d8d8d8;
  }

  .preview {
    width: 60px;
    height: 60px;
    margin-left: 10px;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>

<div class="navigation">
  <button type="button" class="hamburger" on:click={toggleMenu}>
    <div></div>
    <div></div>
    <div></div>
  </button>
  {#if menuOpen}
    <div class="menu">
      <button type="button" class="menu-item" on:click={() => navigate('Home')}>
        Home
        <div class="preview"><HomePreview progress={50} /></div>
      </button>
      <button type="button" class="menu-item" on:click={() => navigate('Summaries')}>
        Summaries
        <div class="preview"><SummariesPreview summaryCount={2} /></div>
      </button>
      <button type="button" class="menu-item" on:click={() => navigate('Notes')}>
        Notes
        <div class="preview"><NotesPreview noteCount={3} /></div>
      </button>
      <button type="button" class="menu-item" on:click={() => navigate('Bookmarks')}>
        Bookmarks
        <div class="preview"><BookmarksPreview bookmarkCount={4} /></div>
      </button>
      <button type="button" class="menu-item" on:click={() => navigate('Reviews')}>
        Reviews
        <div class="preview"><ReviewsPreview reviewCount={2} /></div>
      </button>
    </div>
  {/if}
</div>