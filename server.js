const app = require('./src/app');
const port = 3000;


app.listen(port, function() {
    console.log(`Meu app está rodando na porta ${port}`);
});