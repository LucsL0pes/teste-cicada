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
  {
    question: '29/03/2001 - 13/11/354',
    answer: 'agostinho',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStZZK8ZVKH1MJ8YtcSgBj_l6NtcOM9RUYc_g&s',
  },
  {
    question: 'EX23 no final',
    answer: 'nilo',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/7/73/Egypt.Osiris.statuette.01.jpg',
  },
  {
    question: 'Enigma 1: Michel Moretti',
    answer: 'ajaccio',
    image:
      'https://www.politize.com.br/wp-content/uploads/2024/07/napoleao-retrato.jpg',
  },
  {
    question: 'Morte de Mozart e Beethoven',
    answer: 'floridsdorf',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mozart_-_Piano_Concerto_No._21_-_Opening_Page_of_the_Autograph_Manuscript.jpg/500px-Mozart_-_Piano_Concerto_No._21_-_Opening_Page_of_the_Autograph_Manuscript.jpg',
  },
  {
    question: 'RHDV',
    answer: ':(){:|:&};:',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAx6camOf_G96Zcs2Zj34Yjmy0ysPd-p0oJQ&s',
  },
  {
    question: '38.897957° N, 77.036560° W. - U-235 Pu-239',
    answer: 'harry s. truman',
    image:
      'https://upload.wikimedia.org/wikipedia/pt/8/85/TheTrumanShow.jpg',
  },
  {
    question: 'Costurou rosas rubras e alvas, o pai, para sossegar a ilha. O filho empilhou seis alianças, duas cabeças sob o machado. Entre eles, o trono reluz em ouro com culpa entrelaçada. Nos claustros, ecoam votos quebrados e preces sem rainhas.',
    answer: 'henrique vii',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/500px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
  },
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
  req.session.level = 1;
  res.render('index');
});

puzzles.forEach((puzzle, index) => {
  const level = index + 1;
  app.get(`/puzzle${level}`, ensureLevel(level), (req, res) => {
    res.render('puzzle', { question: puzzle.question, level, image: puzzle.image });
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
      res.render('puzzle', {
        question: puzzle.question,
        level,
        error: 'Resposta incorreta.',
        image: puzzle.image,
      });
    }
  });
});

app.get('/completed', ensureLevel(puzzles.length + 1), (req, res) => {
  res.render('completed');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
