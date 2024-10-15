<script>
  export let bookmarkCount = 4; // Sample data for preview
</script>

<style>
  .preview-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
    padding: 10px;
    font-size: 12px;
  }
  .bookmark-icon {
    display: inline-block;
    width: 10px;
    height: 15px;
    background-color: #007bff;
    margin-right: 5px;
  }
</style>

<div class="preview-container">
  <div>Bookmarks ({bookmarkCount})</div>
  {#each Array(4) as _}
    <div><span class="bookmark-icon"></span></div>
  {/each}
</div>

