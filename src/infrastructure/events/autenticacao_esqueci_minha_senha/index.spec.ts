import { MockSESProxy } from "../../../util/class.mock";
import { EsqueciMinhaSenhaEventHandler } from ".";
import { genEventEsqueciMinhaSenha } from "../../../util/testes.util";
import { FakeLogger } from "../../../infrastructure/logger/fake-logger";
// import * as dotenv from "dotenv";
// dotenv.config();

jest.useRealTimers();

const mockSESProxy = new MockSESProxy();
const fakeLogger = new FakeLogger(EsqueciMinhaSenhaEventHandler.name);
const esqueciMinhaSenhaEventHandler = new EsqueciMinhaSenhaEventHandler(
  mockSESProxy,
  fakeLogger
);
describe("executando testes para evento de verificacao de conta", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("vaidacao de existencia", () => {
    it("deve validar existencia do servico", async () => {
      expect(esqueciMinhaSenhaEventHandler).toBeDefined();
    });
  });

  describe("casos de sucesso ", () => {
    const spy_sesProxy_sendMailTemplate = jest.spyOn(
      mockSESProxy,
      "sendMailTemplate"
    );
    it("deve validar os métodos corretamentes", async () => {
      const event = genEventEsqueciMinhaSenha();
      const res = await esqueciMinhaSenhaEventHandler.handler(event);
      expect(res).toBeUndefined();
      expect(esqueciMinhaSenhaEventHandler).toBeDefined();
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledTimes(1);
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledWith(
        "esqueci_minha_senha_mail_template",
        {
          nome: event.payload.nome,
          link: event.payload.link,
        },
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
      const event = genEventEsqueciMinhaSenha();
      const message = "error mock";
      mockSESProxy.sendMailTemplate.mockRejectedValueOnce(new Error(message));
      try {
        await esqueciMinhaSenhaEventHandler.handler(event);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe(message);
      }

      expect(esqueciMinhaSenhaEventHandler).toBeDefined();
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledTimes(1);
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledWith(
        "esqueci_minha_senha_mail_template",
        {
          nome: event.payload.nome,
          link: event.payload.link,
        },
        process.env.MAIL_SENDER_DEFAULT || "noreply@bigenterprise.com.br",
        event.payload.email
      );
    });
  });
});
