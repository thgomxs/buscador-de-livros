<h1 align="center">buscador-de-livros</h1>

<p align="center">
   <img alt="MIT-LICENSE" src="https://img.shields.io/github/license/thgomxs/buscador-de-livros?color=%233880FF&logo=%1E65CF&logoColor=%1E65CF"/>
</p>

<p align="center">
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Começando</a> • 
 <a href="#features">Funcionalidades</a> • 
<a href="#contribution">Contribuindo</a>
</p>

<p align="center">
    Uma aplicação fruto de um desafio, consistindo em um buscador de livros feito em Angular que consome a API pública de livros Google Books API. Sendo possível adicionar notas a cada livro e realizar pesquisas nas mesmas através de tags.
</p>

<h2 id="tech">💻 Tecnologias</h2>

- Node
- Angular
- Jest (Testes unitários)
- json-server (Simulando API de maneira simples)
- Google Books API (API pública de livros)

<h2 id="started">🚀 Começando... </h2>

Passo a passo para inicar o projeto localmente!

<h3>Pré-requisitos</h3>

Será necessário:

- Node
- Angular
- Http-server (Testar a build localmente)

<h3>Clonando</h3>

```bash
git clone https://github.com/thgomxs/buscador-de-livros.git
```

<h3>Instalação</h3>

```bash
npm install
```

<h3>Configurar variáveis .env</h2>

Use o trecho abaixo como referência para configurar o arquivo `.environment.development.ts` com suas credenciais. Já configurado por padrão com localhost e a versão mais atual da Google Books API.

```yaml
apiURL: 'http://localhost:3000/favorites',
googleApiURL: 'https://www.googleapis.com/books/v1/volumes',
```

<h3>Iniciando</h3>

Como inicar seu projeto localmente em desenvolvimento. Iniciará o app localmente em modo de desenvolvimento e também inicia o json-server.

```bash
cd buscador-de-livros
npm run start
```

<h3>Fazendo build da aplicação e rodando localmente</h3>

Como fazer build da aplicação para produção, lembre-se de mudar as váriaveis de ambiente em `.environment.ts`. A build será feita em `/dist`.

```bash
cd buscador-de-livros
npm run build
```

Para iniciar a build localmente e testar, será necessário instalar o `http-server` globalmente em sua máquina e executar a build.

```bash
cd buscador-de-livros
npm install -g http-server
http-server ./dist/buscador-de-livros/browser
```

<h2 id="features">🎲 Funcionalidades </h2>

<h3>Pesquisas</h3>

É possível realizar pesquisas filtrando por título ou autor. São exibidas as informações de título, autor, descrição e capa do livro.

<img src="https://github.com/user-attachments/assets/f01a54ba-6c7a-4e5c-8fe8-acd780112861" width="850px">

<h3>Favoritos</h3>

É possível adicionar livros aos favoritos, dando a possibilidade de adicionar uma avaliação e criar notas.

<img src="https://github.com/user-attachments/assets/51494117-ecf4-40c0-b83f-e447a825a672" width="850px">

<h3>Tags</h3>

É possível filtrar as notas dos livros favoritos por tags

<img src="https://github.com/user-attachments/assets/671403e9-2344-46c5-915a-1c76f8dccaa7" width="850px">

<h2 id="contribution">📫 Contribuindo para o buscador-de-livros </h2>

Para contribuir com `buscador-de-livros`, siga estas etapas:

1. Clique no botão "Fork" no topo desta página para criar uma cópia do repositório no seu perfil GitHub. No seu terminal faça

```bash
git clone https://github.com/thgomxs/buscador-de-livros.git
```

2. Crie um branch: `git checkout -b minha-nova-feature`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`.
4. Envie para o branch original: `git push origin minha-nova-feature`.
5. Crie a solicitação de pull request.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação de pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

<h2 >🚀 Licença e Autoria </h2>

Feito por @thgomxs.

Este projeto possui uma licença do tipo MIT. Cheque o arquivo [LICENSE](https://github.com/thgomxs/buscador-de-livros/blob/main/LICENSE) para saber mais
