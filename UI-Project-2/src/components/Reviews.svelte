<script>
    import { currentChapter, currentPage } from '../store.js';
    let averageRating = 4.5;
    let totalReviews = 120;
    let reviews = [
      { rating: 5, text: 'An amazing read!' },
      { rating: 4, text: 'Really enjoyed it.' },
      // Add more reviews
    ];
</script>

<style>
    .review-item {
        margin-bottom: 15px;
    }

    .rating {
        color: #ffdd57;
    }

    h2, h3 {
        margin-bottom: 10px;
    }
</style>

<div class="main">
    <h2>Book Reviews</h2>
    <p class="positionMarking">Current Chapter: {$currentChapter}, Current Page: {$currentPage}</p>
    <h4>
        Average Rating: <span class="rating">{averageRating} / 5</span> ({totalReviews} reviews)
    </h4>
    {#each reviews as review}
        <div class="review-item">
            <div class="rating">Rating: {review.rating} / 5</div>
            <p>{review.text}</p>
        </div>
    {/each}
</div>
