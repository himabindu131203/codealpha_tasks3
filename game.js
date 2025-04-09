document.addEventListener('DOMContentLoaded', () => {
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let timeLeft = 30;
    let timerInterval;

    // Fetch shuffled cards from backend
    fetch('/get_cards')
        .then(response => response.json())
        .then(data => {
            cards = data;
            renderCards();
            startTimer();
        });

    // Render the cards
    function renderCards() {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';

        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.setAttribute('data-id', card.id);
            cardElement.setAttribute('data-value', card.value);
            cardElement.addEventListener('click', handleCardClick);
            container.appendChild(cardElement);
        });
    }

    // Handle card flip
    function handleCardClick(event) {
        const card = event.target;

        if (card.classList.contains('flipped') || flippedCards.length === 2) {
            return;
        }

        card.classList.add('flipped');
        card.innerText = card.getAttribute('data-value');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    // Check if two flipped cards match
    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === 8) {
                showStatus('You Win!');
                clearInterval(timerInterval);
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    // Start the countdown timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('time').innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showStatus('Game Over!');
            }
        }, 1000);
    }

    // Show game status
    function showStatus(message) {
        const statusElement = document.getElementById('status');
        statusElement.innerText = message;
    }
});
