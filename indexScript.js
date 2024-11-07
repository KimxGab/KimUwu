// Game variables
const draggableItems = document.querySelectorAll('.item');
const droppableBins = document.querySelectorAll('.bin');
let score = 0;

// DRAG START
draggableItems.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('itemId', e.target.id);
    });
});

// DROP EVENT
droppableBins.forEach(bin => {
    bin.addEventListener('drop', (e) => {
        e.preventDefault();

        const itemId = e.dataTransfer.getData('itemId');
        const binId = e.target.getAttribute('data-draggable-id');
        const draggedItem = document.getElementById(itemId);

        if (itemId === binId) {
            // Correct bin
            score += 10;
            document.getElementById('remarks').innerText = "Correct!";
            document.getElementById('score').innerText = score;
        } else {
            // Incorrect bin
            score -= 5;
            document.getElementById('remarks').innerText = "Incorrect!";
            document.getElementById('score').innerText = score;
        }

        // Optionally move item back to the original container (to simulate incorrect items falling back)
        draggedItem.style.transform = "translate(0px, 0px)";
    });

    bin.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
});

// RESET GAME
document.getElementById('resetBtn').addEventListener('click', () => {
    score = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('remarks').innerText = "";

    // Optionally reset positions of items here
    draggableItems.forEach(item => {
        item.style.transform = "translate(0px, 0px)";
    });
});
