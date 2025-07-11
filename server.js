const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'cicada-secret',
  resave: false,
  saveUninitialized: true
}));

const puzzles = [
  { question: 'Enigma 1: Qual a palavra secreta?', answer: 'cicada' },
  { question: 'Enigma 2: 2 + 2 = ?', answer: '4' },
  { question: 'Enigma 3: Primeiro nome do criador do Linux?', answer: 'linus' },
  { question: 'Enigma 4: Que linguagem executa no navegador?', answer: 'javascript' },
  { question: 'Enigma 5: Complete: Hello ____!', answer: 'world' }
];

function ensureLevel(level) {
  return function(req, res, next) {
    if ((req.session.level || 0) >= level) {
      next();
    } else {
      res.redirect(`/puzzle${req.session.level || 1}`);
    }
  };
}

app.get('/', (req, res) => {
  req.session.level = req.session.level || 1;
  res.redirect(`/puzzle${req.session.level}`);
});

puzzles.forEach((puzzle, index) => {
  const level = index + 1;
  app.get(`/puzzle${level}`, ensureLevel(level), (req, res) => {
    res.render('puzzle', { question: puzzle.question, level });
  });

  app.post(`/puzzle${level}`, ensureLevel(level), (req, res) => {
    const answer = (req.body.answer || '').trim().toLowerCase();
    if (answer === puzzle.answer) {
      req.session.level = level + 1;
      if (level === puzzles.length) {
        res.redirect('/completed');
      } else {
        res.redirect(`/puzzle${level + 1}`);
      }
    } else {
      res.render('puzzle', { question: puzzle.question, level, error: 'Resposta incorreta.' });
    }
  });
});

app.get('/completed', ensureLevel(puzzles.length + 1), (req, res) => {
  res.send('<h1>Parabéns! Você completou todos os enigmas.</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
