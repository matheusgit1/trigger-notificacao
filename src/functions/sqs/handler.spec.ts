import { ListennerFromSQS } from "./handler.sqs";
import { mockEvenstDictionary } from "../../util/class.mock";
import { genEventVerificacaoConta, genSqsEvents } from "../../util/testes.util";
import { EventReceived } from "./dtos/handlers.dto";
import * as dotenv from "dotenv";
import { FakeLogger } from "../../infrastructure/logger/fake-logger";
dotenv.config();

dotenv.configDotenv({
  processEnv: {
    NODE_ENV: "TEST",
  },
});

const fakelogger = new FakeLogger(ListennerFromSQS.name);
const listennerFromSQS = new ListennerFromSQS(mockEvenstDictionary, fakelogger);

jest.useRealTimers();

describe("executando testes do ouvinte sqs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("executando casos de sucesso", () => {
    const spy_listennerFromSQS_validateStrategy = jest.spyOn(
      listennerFromSQS,
      "validateStrategy"
    );
    it("deve executar evento de verificacao de conta corretamente para 1 unico evento", async () => {
      const event_ativacao_1 = genEventVerificacaoConta();
      const res = await listennerFromSQS.handler(
        genSqsEvents(event_ativacao_1, 1)
      );
      const spy_mockEvenstDictionary = jest.spyOn(
        mockEvenstDictionary[event_ativacao_1.topico],
        "handler"
      );
      expect(res).toBeUndefined();
      expect(spy_listennerFromSQS_validateStrategy).toHaveBeenCalledTimes(1);
      expect(spy_listennerFromSQS_validateStrategy).toHaveBeenLastCalledWith(
        event_ativacao_1.topico
      );
      expect(spy_mockEvenstDictionary).toHaveBeenCalledTimes(1);
    });

    it("deve executar evento de verificacao de conta corretamente para varios eventos", async () => {
      const num_events = 10;
      const event_ativacao_1 = genEventVerificacaoConta();
      const res = await listennerFromSQS.handler(
        genSqsEvents(event_ativacao_1, num_events)
      );
      const spy_mockEvenstDictionary = jest.spyOn(
        mockEvenstDictionary[event_ativacao_1.topico],
        "handler"
      );
      expect(res).toBeUndefined();
      expect(spy_listennerFromSQS_validateStrategy).toHaveBeenCalledTimes(
        num_events
      );
      expect(spy_listennerFromSQS_validateStrategy).toHaveBeenLastCalledWith(
        event_ativacao_1.topico
      );
      expect(spy_mockEvenstDictionary).toHaveBeenCalledTimes(num_events);
    });
  });
  describe("executando casos de erros", () => {
    const spy_listennerFromSQS_validateStrategy = jest.spyOn(
      listennerFromSQS,
      "validateStrategy"
    );
    it("deve ignorar evento caso tópico não esteja elencado nas estratégias", async () => {
      const event: EventReceived<any> = {
        topico: "topico-invalido" as any,
        versao: 1,
        payload: {
          key: "wrongkey",
        },
      };
      const res = await listennerFromSQS.handler(genSqsEvents(event, 1));
      expect(res).toBeUndefined();
      expect(spy_listennerFromSQS_validateStrategy).toHaveBeenCalledTimes(1);
      expect(spy_listennerFromSQS_validateStrategy).toHaveBeenLastCalledWith(
        event.topico
      );
      expect(spy_listennerFromSQS_validateStrategy).toHaveReturnedWith(false);
    });
  });
});
