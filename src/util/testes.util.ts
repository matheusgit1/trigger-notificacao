import {
  BoasVindasTo,
  CodigoVerificacaoDeContaDto,
  EsqueciMinhaSenhaTo,
  EventReceived,
} from "@functions/sqs/dtos/handlers.dto";
import { Context, SQSEvent } from "aws-lambda";
import { Logger } from "../infrastructure/logger/logger";
import { v4 } from "uuid";
import { faker } from "@faker-js/faker";

export const genSqsHandlerContext = (functionName: string): Context => {
  const logger = new Logger(genSqsHandlerContext.name);
  const currentmillis = new Date().getTime();
  return {
    callbackWaitsForEmptyEventLoop: false,
    functionName: functionName,
    functionVersion: "v1",
    invokedFunctionArn: "SQS::ARN",
    memoryLimitInMB: "1024MB",
    awsRequestId: v4(),
    logGroupName: "log-group-mock",
    logStreamName: "log-stream-mock",
    getRemainingTimeInMillis() {
      return new Date().getTime() - currentmillis;
    },
    done(_error?: Error, _result?: any) {
      if (_error) {
        logger.error(String(_error));
      }
      logger.info(String(_result));
    },
    fail(_error: Error | string) {
      logger.error(String(_error));
    },
    succeed(_messageOrObject: any) {
      logger.error(String(_messageOrObject));
    },
  };
};

export const genRecordBodyEvent = (event: any) => {
  return JSON.stringify({
    Type: "Notification",
    MessageId: "MessageId",
    TopicArn: "TopicArn",
    Message: JSON.stringify(event),
    Timestamp: new Date().toString(),
    SignatureVersion: "1",
    Signature: "Signature",
    SigningCertURL: "SigningCertURL",
    UnsubscribeURL: "UnsubscribeURL",
  });
};

export const genEventVerificacaoConta = (
  dto?: Partial<EventReceived<CodigoVerificacaoDeContaDto>>
): EventReceived<CodigoVerificacaoDeContaDto> => {
  return {
    topico: "autenticacao_verificacao_de_conta",
    versao: 1,
    payload: {
      email: dto?.payload.email || faker.internet.email(),
      codigo:
        dto?.payload.codigo ||
        String(faker.number.int({ min: 100000, max: 999999 })),
      nome: dto?.payload.nome || faker.internet.userName(),
      urlSolicitarNovoCodigoVerificacao:
        dto?.payload.urlSolicitarNovoCodigoVerificacao || faker.internet.url(),
    },
  };
};

export const genEventEsqueciMinhaSenha = (
  dto?: Partial<EventReceived<EsqueciMinhaSenhaTo>>
): EventReceived<EsqueciMinhaSenhaTo> => {
  return {
    topico: "autenticacao_esqueci_minha_senha",
    versao: 1,
    payload: {
      nome: dto?.payload.nome || faker.internet.userName(),
      email: dto?.payload.email || faker.internet.email(),
      link: dto?.payload.link || faker.internet.url(),
    },
  };
};

export const genEventBoasVindas = (
  dto?: Partial<EventReceived<BoasVindasTo>>
): EventReceived<BoasVindasTo> => {
  return {
    topico: "autenticacao_boas_vindas",
    versao: 1,
    payload: {
      email: dto?.payload.email || faker.internet.email(),
      nome: dto?.payload.nome || faker.internet.userName(),
    },
  };
};

export const genSqsEvents = (event: any, size: number = 1): SQSEvent => {
  return {
    Records: Array(size).fill({
      messageId: v4(),
      receiptHandle: "MessageReceiptHandle",
      body: genRecordBodyEvent(event),
      attributes: {
        ApproximateReceiveCount: "1",
        SentTimestamp: new Date().getTime().toString(),
        SenderId: "123456789012",
        ApproximateFirstReceiveTimestamp: "1523232000001",
      },
      messageAttributes: {},
      md5OfBody: "{{{md5_of_body}}}",
      eventSource: "aws:sqs",
      eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
      awsRegion: "us-east-1",
    }),
  };
};
