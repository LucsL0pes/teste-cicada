# Teste Cicada

Este projeto é um exemplo simples de site de enigmas inspirado no estilo Cicada 3301. São cinco enigmas sequenciais que só podem ser acessados após a resolução do anterior.

## Como executar localmente

1. Instale as dependências (é necessário ter o Node.js instalado):
   ```bash
   npm install
   ```
2. Inicie o servidor:
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
