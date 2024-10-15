<script>
  export let progress = 0; // Progress percentage (0 to 100)

  // Ensure progress stays within bounds
  $: progress = Math.min(Math.max(progress, 0), 100);

  // Adjusted radius to prevent clipping
  const radius = 14;
  const circumference = 2 * Math.PI * radius;

  // Calculate dash array and offset for the progress circle
  $: dashArray = circumference;
  $: dashOffset = circumference - (progress / 100) * circumference;
</script>

<style>
.pie-chart-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.pie-chart-container svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #e0e0e0;
}
</style>

<div class="pie-chart-container">
<svg viewBox="0 0 32 32">
  <!-- Background Circle -->
  <circle
    r={radius}
    cx="16"
    cy="16"
    fill="none"
    stroke="#e0e0e0"
    stroke-width="4"
  ></circle>
  <!-- Progress Circle -->
  <circle
    r={radius}
    cx="16"
    cy="16"
    fill="none"
    stroke="#4caf50"
    stroke-width="4"
    stroke-dasharray={dashArray}
    stroke-dashoffset={dashOffset}
    stroke-linecap="round"
  ></circle>
</svg>
<div class="center-text">{progress}%</div>
</div>
