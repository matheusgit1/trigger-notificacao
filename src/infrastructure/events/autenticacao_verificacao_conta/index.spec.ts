import { MockSESProxy } from "../../../util/class.mock";
import { CodigoVerificationEventHandler } from ".";
import { genEventVerificacaoConta } from "../../../util/testes.util";
import { FakeLogger } from "../../../infrastructure/logger/fake-logger";
// import * as dotenv from "dotenv";
// dotenv.config();

jest.useRealTimers();

const mockSESProxy = new MockSESProxy();
const fakeLogger = new FakeLogger(CodigoVerificationEventHandler.name);
const codigoVerificationEventHandler = new CodigoVerificationEventHandler(
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
      expect(codigoVerificationEventHandler).toBeDefined();
    });
  });

  describe("casos de sucesso ", () => {
    const spy_sesProxy_sendMailTemplate = jest.spyOn(
      mockSESProxy,
      "sendMailTemplate"
    );
    it("deve validar os métodos corretamentes", async () => {
      const event = genEventVerificacaoConta();
      const res = await codigoVerificationEventHandler.handler(event);
      expect(res).toBeUndefined();
      expect(codigoVerificationEventHandler).toBeDefined();
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledTimes(1);
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledWith(
        "AUTENTICACAO_VERIFICACAO_DE_CONTA",
        {
          nome: event.payload.nome,
          codigo: event.payload.codigo,
          urlSolicitarNovoCodigoVerificacao:
            process.env.URL_SOLICITAR_NOVO_CODIGO_VERIFICACAO,
          email: event.payload.email,
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
      const event = genEventVerificacaoConta();
      const message = "error mock";
      mockSESProxy.sendMailTemplate.mockRejectedValueOnce(new Error(message));
      try {
        await codigoVerificationEventHandler.handler(event);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe(message);
      }

      expect(codigoVerificationEventHandler).toBeDefined();
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledTimes(1);
      expect(spy_sesProxy_sendMailTemplate).toHaveBeenCalledWith(
        "AUTENTICACAO_VERIFICACAO_DE_CONTA",
        {
          nome: event.payload.nome,
          codigo: event.payload.codigo,
          urlSolicitarNovoCodigoVerificacao:
            process.env.URL_SOLICITAR_NOVO_CODIGO_VERIFICACAO,
          email: event.payload.email,
        },
        process.env.MAIL_SENDER_DEFAULT || "noreply@bigenterprise.com.br",
        event.payload.email
      );
    });
  });
});
