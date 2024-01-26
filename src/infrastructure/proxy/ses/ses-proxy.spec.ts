import { FakeLogger } from "../../../infrastructure/logger/fake-logger";
import { SESProxy } from "./ses.proxy";

const fakeLogger = new FakeLogger(SESProxy.name);
describe("executando teste de proxy ses", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("casos de sucesso", () => {
    it("deve validar a existencia da proxy corretamente", async () => {
      const sesProxy = new SESProxy(fakeLogger);
      expect(sesProxy).toBeDefined();
    });
  });
});
