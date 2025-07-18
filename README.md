# Teste Cicada

Este projeto é um exemplo simples de site de enigmas inspirado no estilo Cicada 3301. São cinco enigmas sequenciais que só podem ser acessados após a resolução do anterior. Ao abrir o endereço inicial (`/`) você verá uma tela introdutória com instruções e um botão **Iniciar** para avançar para o primeiro desafio.

## Como executar localmente

1. Instale as dependências (é necessário ter o Node.js instalado):
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` definindo ao menos a chave `SESSION_SECRET` e o
   `REDIS_URL` se desejar apontar para outro servidor Redis:
   ```bash
   SESSION_SECRET=minha_senha_super_secreta
   REDIS_URL=redis://localhost:6379
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
   O aplicativo ficará disponível em `http://localhost:3000`.

## Utilizando Docker

É possível executar o projeto em um container Docker:

```bash
# Construir a imagem
docker build -t cicada-web .

# Executar o container
docker run -p 3000:3000 cicada-web
```

## Implantação no Kubernetes

Um manifesto de exemplo está disponível em `k8s/deployment.yaml`.
Para implantar no cluster:

```bash
kubectl apply -f k8s/deployment.yaml
```

Isso criará um Deployment e um Service expondo o aplicativo internamente na porta 80.

## Hospedagem

Para publicar o projeto na internet de maneira simples você pode utilizar o serviço gratuito [Render](https://render.com/):

1. Faça login ou crie uma conta no site.
2. Crie um novo **Web Service** a partir deste repositório.
3. Mantenha o ambiente Node e defina o comando de inicialização `npm start`.
4. Defina as variáveis `SESSION_SECRET` e `REDIS_URL` nas configurações do serviço.
5. Aguarde a conclusão do build e do deploy.
6. O aplicativo ficará acessível no endereço fornecido pela plataforma.
