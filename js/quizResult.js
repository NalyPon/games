// const quizLength = quiz.length;
// const score = quiz.score;

document.getElementById('js-result').innerHTML
    = 'あなたの正解数は' + score + ' / ' + quiz.length + 'です！';

// Retry click Event
document.getElementById('Retry')
    .addEventListener('click', () => {
        window.location.replace('./quiz.html');
    });

// Menu click Event
document.getElementById('Menu')
    .addEventListener('click', () => {
        window.location.replace('./index.html');
    });