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
        if (confirm('本当によろしいですか？')) {
            if (confirm('やめといたほうがいいですよ？')) {
                if (confirm('最終警告です。')) {
                    window.location.replace('./dammy.html');
                }
            }
        }
    });