<script>
    export let annotations = [];
    export let currentPage; // Receive currentPage as a prop
    let newAnnotation = '';
  
    function addAnnotation() {
      if (newAnnotation.trim() !== '') {
        annotations.push({ page: currentPage, text: newAnnotation });
        newAnnotation = '';
      }
    }
  </script>
  
  <div>
    <h2>Annotations</h2>
    <ul>
      {#each annotations.filter(a => a.page === currentPage) as annotation}
        <li>{annotation.text}</li>
      {/each}
    </ul>
    <input type="text" bind:value={newAnnotation} placeholder="Add a comment" />
    <button on:click={addAnnotation}>Add</button>
  </div>
  