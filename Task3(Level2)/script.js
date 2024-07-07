
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const images = document.querySelectorAll('.image-container img');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            images.forEach(image => {
                if (filter === 'all' || image.getAttribute('data-tags').includes(filter)) {
                    image.style.display = 'inline-block';
                } else {
                    image.style.display = 'none';
                }
            });
        });
    });
});
