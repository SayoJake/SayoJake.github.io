<script>
    import { currentPage, currentChapter, simulateChapterReadingTime, simulatePageReadingTime, totalPages, pagesPerChapter, totalReadingTime, timeSpentPerChapter } from './store.js';
    import { get } from 'svelte/store';
    
    let showInfo = false;

    // Function to navigate to the next page
    function nextPage() {
        currentPage.update(n => {
            const newPage = n + 1;
            if (newPage > get(totalPages)) {
                return get(totalPages); // Prevent exceeding total pages
            }
            simulatePageReadingTime(); // Simulate reading time for this page
            return newPage;
        });
        
        // Move to the next chapter only if we're at the last page of the current chapter
        currentPage.update(n => {
            const isLastPageOfChapter = n % pagesPerChapter === 0;
            const isNotAtLastPage = n < get(totalPages);
            
            if (isLastPageOfChapter && isNotAtLastPage) {
                currentChapter.update(n => {
                    const newChapter = n < 30 ? n + 1 : n;
                    simulatePageReadingTime(); // Simulate reading time for the chapter
                    return newChapter;
                });
            }
            return n;
        });
    }

    // Function to navigate to the previous page
    function prevPage() {
        currentPage.update(n => {
            if (n === 1) {
                return 1; // If on the first page, prevent decrementing further
            }
            const newPage = n - 1;
            
            // If moving back to the previous chapter
            const isMovingBackToPreviousChapter = (newPage + 1) % pagesPerChapter === 0 && newPage >= 1;
            
            if (isMovingBackToPreviousChapter) {
                prevChapter();
            } else {
                simulatePageReadingTime(); // Simulate reading time for the current page
            }
            return newPage;
        });
    }

    // Function to navigate to the next chapter
    function nextChapter() {
        currentChapter.update(n => {
            const newChapter = n < 30 ? n + 1 : n;
            simulateChapterReadingTime(); // Simulate reading time for the chapter
            return newChapter;
        });
        currentPage.update(n => (get(currentChapter) - 1) * pagesPerChapter + 1); // Move to the first page of the new chapter
    }

    // Function to navigate to the previous chapter
    function prevChapter() {
        currentChapter.update(n => {
            const newChapter = n > 1 ? n - 1 : n;
            simulateChapterReadingTime(); // Simulate reading time for the chapter
            return newChapter;
        });
        currentPage.update(n => (get(currentChapter) - 1) * pagesPerChapter + 1); // Move to the first page of the previous chapter
    }
</script>

<style>
    .testing-ui {
      padding: 10px;
      background-color: #fafafa;
      border-top: 1px solid #ddd;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  
    .button-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  
    .button-row {
      display: flex;
      gap: 10px;
    }
  
    button {
      padding: 5px 10px;
      border: none;
      background-color: #4caf50;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    button:hover {
      background-color: #45a049;
    }
  
    .info-box {
      background-color: #e7f3fe;
      padding: 10px;
      border-left: 6px solid #2196F3;
      border-radius: 5px;
      color: #333;
    }
  
    .project-info {
      text-align: center;
    }
  
    .project-info a {
      color: #2196F3;
      text-decoration: none;
    }
  
    .project-info a:hover {
      text-decoration: underline;
    }
  
    .info-toggle {
      display: flex;
      justify-content: center;
      align-items: center;
    }
</style>

<div class="testing-ui">
    <div>
        <h3>Testing Controls</h3>
        <div class="button-group">
            <!-- Page Controls Row -->
            <div class="button-row">
                <button on:click={prevPage}>Previous Page</button>
                <button on:click={nextPage}>Next Page</button>
            </div>
            <div class="button-row">
                <button on:click={prevChapter}>Previous Chapter</button>
                <button on:click={nextChapter}>Next Chapter</button>
            </div>
        </div>
    </div>

    <div class="project-info">
        <h3>Project Information</h3>
        <p><strong>Title:</strong> Smart Book UI Project</p>
        <p><strong>Developer:</strong> Jacob Sayatovic, Ayush Verma</p>
        <a href="https://github.com/Crazykrai/Smart-Book-User-Interface">Github repo</a>
    </div>

    <div class="info-toggle">
        <button on:click={() => showInfo = !showInfo}>Info</button>
        {#if showInfo}
            <div class="info-box">
                <p>Use the controls above to simulate reading actions.</p>
            </div>
        {/if}
    </div>
</div>
