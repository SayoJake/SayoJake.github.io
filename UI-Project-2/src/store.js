import { writable, get} from 'svelte/store';

// Utility function to create a writable store with localStorage persistence
function createPersistedStore(key, initial) {
    const stored = localStorage.getItem(key);
    const data = stored ? JSON.parse(stored) : initial;
    const store = writable(data);
    store.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
    });
    return store;
}

// Reading Progress Stores
export const totalChapters = writable(20);
export const currentChapter = writable(1);
export const totalReadingTime = writable(0);
export const timeSpentPerChapter = writable(Array(20).fill(0));
export const currentPage = writable(1);
export const totalPages = writable(500);

// Stores for book info
export const pagesPerChapter = 20; // Each chapter spans 20 pages
export const readingTimePerPage = 5; // It takes 5 minutes to read one page
export const readingTimePerChapter = 100; // It takes 100 minutes to read one full chapter

// User Input Stores with Persistence
export const bookmarks = createPersistedStore('bookmarks', []);
export const notes = createPersistedStore('notes', []);

// Idle State Management
export const isIdle = writable(false);
export let idleTimer;

// Function to reset the idle timer
export function resetIdleTimer() {
    clearTimeout(idleTimer);
    isIdle.set(false);
    idleTimer = setTimeout(() => {
        isIdle.set(true);
    }, 20000); // 20 seconds
}

// Function to handle user interactions and reset the idle timer
export function handleInteraction() {
    resetIdleTimer();
}

// Function to simulate reading time per page
export function simulatePageReadingTime() {
    const page = get(currentPage);
    const chapter = get(currentChapter);

    // Only simulate page reading if it's not the last page of the chapter
    if (page % pagesPerChapter !== 0) {
        totalReadingTime.update(n => n + readingTimePerPage); // Increment total reading time by 5 minutes
        
        timeSpentPerChapter.update(times => {
            const updated = [...times];
            updated[chapter - 1] += readingTimePerPage; // Increment time for the current chapter by 5 minutes
            return updated;
        });
    }
}

// Function to simulate reading time per chapter
export function simulateChapterReadingTime() {
    const chapter = get(currentChapter);
    const page = get(currentPage);
    
    // Only simulate the remaining time for the chapter if the current page is at the end
    if (page % pagesPerChapter === 0) {
        const remainingPagesInChapter = pagesPerChapter - (page % pagesPerChapter); // Remaining pages to complete the chapter
        const remainingTime = remainingPagesInChapter * readingTimePerPage;

        totalReadingTime.update(n => n + remainingTime); // Increment total reading time by the remaining chapter time
        
        timeSpentPerChapter.update(times => {
            const updated = [...times];
            updated[chapter - 1] += remainingTime; // Increment the remaining time for the current chapter
            return updated;
        });
    }
}