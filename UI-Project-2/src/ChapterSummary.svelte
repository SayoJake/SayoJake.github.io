<script>

    export let chapterSummaries = [];
    export let currentChapter = 1;
</script>

<div>
    <h2>Chapter Summary</h2>
    <p>Chapter: {currentChapter}</p>
    <p>Summary: {chapterSummaries[currentChapter - 1]}</p>
</div>