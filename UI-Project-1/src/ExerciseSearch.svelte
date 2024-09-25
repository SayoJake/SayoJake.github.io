<script>
    let exercises = ['Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Barbell Row'];
    let searchQuery = '';
    let selectedExercise = '';
  
    function handleSearch() {
      if (exercises.includes(searchQuery)) {
        selectedExercise = searchQuery;
      } else {
        selectedExercise = '';
      }
    }
  </script>
  
  <style>
    .exercise-search {
      background-color: #20232a;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      color: #f1f1f1;
      text-align: center;
      margin-bottom: 30px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
  
    input {
      width: 100%;
      padding: 15px;
      margin-top: 15px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      background-color: #2d3748;
      color: white;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }
  
    input:focus {
      border-color: #e53e3e;
      outline: none;
    }
  
    button {
      background-color: #e53e3e;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 20px;
      width: 100%;
      transition: background-color 0.3s ease;
    }
  
    button:hover {
      background-color: #c53030;
    }
  
    p {
      margin-top: 15px;
      color: #e2e8f0;
      font-size: 1.1rem;
    }
  </style>
  
