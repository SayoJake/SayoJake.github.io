<script>
    import { notes, currentPage, currentChapter } from '../store.js';
  
    let newNote = '';
  
    // Function to add a new note
    function addNote() {
        if (newNote.trim() !== '') {
            notes.update(n => [...n, { page: $currentPage, text: newNote }]);
            newNote = '';
        }
    }
  
    // Function to remove a note by its index
    function removeNote(index) {
        notes.update(n => n.filter((_, i) => i !== index));
    }
</script>
  
<style>
    .note-item {
      margin-bottom: 10px;
    }
  
    .add-note {
      display: flex;
      margin-top: 20px;
    }
  
    .add-note input {
      flex: 1;
      padding: 8px;
      border-radius: 5px;
      border: none;
    }
  
    .add-note button {
      padding: 8px 12px;
      border-radius: 5px;
      background-color: #ffdd57;
      color: #000;
      border: none;
      cursor: pointer;
    }
</style>
  
<div class="main">
    <h2>Your Notes</h2>
    <p class="positionMarking">Current Chapter: {$currentChapter}, Current Page: {$currentPage}</p>
    {#if $notes.length === 0}
      <p>No notes yet. Add some!</p>
    {/if}
    <ul>
      {#each $notes as note, index}
        <li class="note-item">
            <strong>Page {note.page}:</strong> {note.text}
            <button on:click={() => removeNote(index)}>Remove</button>
        </li>
      {/each}
    </ul>
    <div class="add-note">
      <input type="text" bind:value={newNote} placeholder="Write a note..." />
      <button on:click={addNote}>Add</button>
    </div>
</div>
