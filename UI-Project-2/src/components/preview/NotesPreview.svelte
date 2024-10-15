<script>
  export let noteCount = 3; // Sample data for preview
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
  .note-line {
    background-color: #f0f0f0;
    margin-bottom: 5px;
    padding: 3px;
    border-radius: 3px;
  }
</style>

<div class="preview-container">
  <div>Notes ({noteCount})</div>
  <div class="note-line"></div>
  <div class="note-line"></div>
  <div class="note-line"></div>
</div>

