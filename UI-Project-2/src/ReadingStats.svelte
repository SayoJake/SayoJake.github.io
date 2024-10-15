<script>
    export let totalTimeRead = 0;
    export let timeSpentPerChapter = [];
    export let currentChapter = 1;
</script>

<div>
    <h2>Reading Statistics</h2>
    <p>Total Time Read: {totalTimeRead} minutes</p>
    <p>Time Spent on Chapter {currentChapter}: {timeSpentPerChapter[currentChapter - 1] || 0} minutes</p>
</div>
