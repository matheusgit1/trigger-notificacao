# handler-notificação

Este projeto é uma parte de um projeto maior. Este serviço visa ouvir mensagens de filas sqs na infraestrutura da AWS e processar essas mensagens.

Este serviço é focado em emitir notificação como email de verificação de contas, email de boas vindas, email para recuperação de senhas e outros a serem implementados

#### handlers de notificações implementados:

- verificacao de conta
- autenticacao boas vindas
- autenticacao esqueci minha senha

#### handlers de notificações a serem implementados:

- login em um novo dispositivo
- troca de email
- outras a depender de sua aplicação

## Preparação

**O envio de email é feito usando o SES (Simple Email Service)**, será necessário que você configure esse serviço em sua infraestutura

Os email templates são baseados nos **templates do semplates**, uma ferramente que permite integrar templates de emails customizado com a aws, o que facilita a criação de mail markenting personalizados, **mas não é obrigatório**

para configurar o semplates io acesse o link abaixo, crie uma conta e **ajuste o nome dos templates que deseja usar na aplicação, bem como suas variaveias de templates**

- https://semplates.io

Além disso, **configure as variaveis de ambientes** e **configure o arquivo serverless.yml para que atenda suas necessidades de sua aplicação**

## Stack utilizada

Node, Typescript, Javascript, AWS, IAC, Serverless, SamplateIO, jest, Webpack

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu **.env** seguindo o arquivo **.env.example**

`PORT`

`CREATE_AUDIT`

`AMBIENT`

`GEN_SALT`

`NODE_ENV`

`DB_HOST`

`DB_PORT`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

`DB_MAX_CONNECTION`

`DB_TIMEOUT`

`DB_MAX_CONNECTION_TIMEOUT`

`DB_SSL`

`URL_SOLICITAR_NOVO_CODIGO_VERIFICACAO`

## Testes unitário

Este serviço foi implementado de forma a ser possivel criar testes unitarios e de integração.

para a execução dos testes use `npm run test:coverage`

## Sobre o Autor

Eu sou uma pessoa desenvolvedora full-stack, técnico em administração, engenheiro de automação em formação, e cientista de dados em formação. Sempre busco por excelência e entregar o máximo com a maior qualidade, sem claro, deixar de lado boas práticas.

Atualmente sou desenvolvedor full stack júnior da área de desenvolvimento de softwares, mirando senioridades cada vez mais altas.

Tenho habilidades com as stacks mais modernas, como :nodeJS, typeScript, css, html, nestJs, NextJs, aws-cloud, bancos de dados não relacionais como mongodb e redis, bancos de dados relacionais como MySql, postgres, docker, testes unitários e de integração. Atuando também em diferentes setores, como educação e telecomunicação.

## Quer entrar em contato com o desenvolvedor?

🪜 Instagram (sempre respondo): @ap_matheus

📱 Telefone e whatsapp: 55 27 997822665

📫 Email: pereira.matheusalves@gmail.com

🔗 Linkedin: https://www.linkedin.com/in/matheus-alves-pereira-4b3781222/

### Testes

```json
{
  "Records": [
    {
      "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
      "receiptHandle": "MessageReceiptHandle",
      "body": "{\"topico\":\"boas_vindas\",\"versao\":1,\"payload\":{\"nome\":\"Matheus Alves Pereira\",\"email\":\"pereira.matheusalves@gmail.com\"}}",
      "attributes": {
        "ApproximateReceiveCount": "1",
        "SentTimestamp": "1523232000000",
        "SenderId": "123456789012",
        "ApproximateFirstReceiveTimestamp": "1523232000001"
      },
      "messageAttributes": {},
      "md5OfBody": "{{{md5_of_body}}}",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:us-east-1:123456789012:MyQueue",
      "awsRegion": "us-east-1"
    }
  ]
}
```

substitua o campos `body` do json pelo seu objeto de ventos no format `string`
