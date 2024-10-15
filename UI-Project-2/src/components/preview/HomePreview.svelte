<script>
    export let progress = 50; // Sample data for preview
  </script>
  
  <style>
    .preview-container {
      width: 100%;
      height: 100%;
      background-color: #fff;
      position: relative;
    }
  </style>
  
  <div class="preview-container">
    <!-- Simplified content -->
    <div style="font-size: 12px; text-align: center;">{progress}% Complete</div>
  </div>
  