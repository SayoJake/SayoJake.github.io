<script>
    import { bookmarks, currentChapter, currentPage } from '../store.js';
  
    // Function to add a new bookmark
    function addBookmark() {
        bookmarks.update(bm => [...bm, { chapter: $currentChapter, page: $currentPage }]);
    }
  
    // Function to remove a bookmark by its index
    function removeBookmark(index) {
        bookmarks.update(bm => bm.filter((_, i) => i !== index));
    }
</script>
  
<style>
    .bookmark-item {
      margin-bottom: 10px;
    }
  
    .add-bookmark button {
      padding: 8px 12px;
      border-radius: 5px;
      background-color: #ffdd57;
      color: #000;
      border: none;
      cursor: pointer;
    }
</style>
  
<div class="main">
    <h2>Your Bookmarks</h2>
    <p class="positionMarking">Current Chapter: {$currentChapter}, Current Page: {$currentPage}</p>
    {#if $bookmarks.length === 0}
      <p>No bookmarks yet. Add one!</p>
    {/if}
    <ul>
      {#each $bookmarks as bookmark, index}
        <li class="bookmark-item">
            Chapter {bookmark.chapter}, Page {bookmark.page}
            <button on:click={() => removeBookmark(index)}>Remove</button>
        </li>
      {/each}
    </ul>
    <div class="add-bookmark">
      <button on:click={addBookmark}>Add Bookmark</button>
    </div>
</div>
