<script>
  export let reviewCount = 2; // Sample data for preview
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
  .star {
    color: gold;
  }
</style>

<div class="preview-container">
  <div>Reviews ({reviewCount})</div>
  <div>
    <span class="star">★★★★</span>☆
  </div>
  <div>
    <span class="star">★★★</span>☆☆
  </div>
</div>

