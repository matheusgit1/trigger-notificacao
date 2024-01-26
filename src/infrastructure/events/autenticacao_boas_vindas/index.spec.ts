import { FakeLogger } from "./../../logger/fake-logger";
import { MockSESProxy } from "../../../util/class.mock";
import { BoasVindasEventHandler } from ".";
import { genEventBoasVindas } from "../../../util/testes.util";
// import * as dotenv from "dotenv";
// dotenv.config();

jest.useRealTimers();

const mockSESProxy = new MockSESProxy();
const fakeLogger = new FakeLogger(BoasVindasEventHandler.name);
const boasvindasEventHandler = new BoasVindasEventHandler(
  mockSESProxy,
  fakeLogger
);
describe("executando testes para evento de boas vindas", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("vaidacao de existencia", () => {
    it("deve validar existencia do servico", async () => {
      expect(boasvindasEventHandler).toBeDefined();
    });
  });

  describe("casos de sucesso ", () => {
    const spy_sesProxy_sendMailTemplate = jest.spyOn(
      mockSESProxy,
      "sendMailTemplate"
    );
    it("deve validar os métodos corretamentes", async () => {
      const event = genEventBoasVindas();
      const res = await boasvindasEventHandler.handler(event);
      expect(res).toBeUndefined();
      expect(boasvindasEventHandler).toBeDefined();
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledTimes(1);
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledWith(
        "boas_vinda_mail_template",
        { nome: event.payload.nome },
        process.env.MAIL_SENDER_DEFAULT || "noreply@bigenterprise.com.br",
        event.payload.email
      );
    });
  });

  describe("casos de erros ", () => {
    const spy_sesProxy_sendMailTemplate = jest.spyOn(
      mockSESProxy,
      "sendMailTemplate"
    );
    it("deve lançar exeção", async () => {
      const event = genEventBoasVindas();
      const message = "error mock";
      mockSESProxy.sendMailTemplate.mockRejectedValueOnce(new Error(message));
      try {
        await boasvindasEventHandler.handler(event);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe(message);
      }

      expect(boasvindasEventHandler).toBeDefined();
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledTimes(1);
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledWith(
        "boas_vinda_mail_template",
        { nome: event.payload.nome },
        process.env.MAIL_SENDER_DEFAULT || "noreply@bigenterprise.com.br",
        event.payload.email
      );
    });
  });
});
