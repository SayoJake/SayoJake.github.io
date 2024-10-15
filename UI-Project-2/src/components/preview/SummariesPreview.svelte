<script>
  export let summaryCount = 2; // Sample data for preview
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
  .summary-line {
    background-color: #e6f3ff;
    margin-bottom: 5px;
    padding: 3px;
    border-radius: 3px;
  }
</style>

<div class="preview-container">
  <div>Summaries ({summaryCount})</div>
  <div class="summary-line"></div>
  <div class="summary-line"></div>
</div>

