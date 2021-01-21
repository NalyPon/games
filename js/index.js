// Quiz clickEvent
document.getElementById('quiz')
    .addEventListener('click', () => {
        window.location.replace('./quiz.html');
    });

// Explosion clickEvent
document.getElementById('bomb')
    .addEventListener('click', () => {
        window.location.replace('./bomb.html');
    });

// Don't push!!!! cliclkEvent
document.getElementById('dammy')
    .addEventListener('click', () => {
        if (confirm('Really?')) {
            if (confirm('You should stop!')) {
                if (confirm('Final warning')) {
                    window.location.replace('./dammy.html');
                }
            }
        }
    });