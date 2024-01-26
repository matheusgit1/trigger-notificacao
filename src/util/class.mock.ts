import {
  EventHandlerBase,
  EventHandlerBaseDto,
} from "../infrastructure/events/base.event-handler";
import { ClassSESProxy } from "../infrastructure/proxy/ses/repository/ses.repository";
import {
  BoasVindasTo,
  CodigoVerificacaoDeContaDto,
  EsqueciMinhaSenhaTo,
  EventHandlerDictionary,
} from "@functions/sqs/dtos/handlers.dto";

export class MockSESProxy implements ClassSESProxy {
  sendMailTemplate = jest.fn(
    async (
      _templateName: string,
      _templateParameters: any,
      _sender: string,
      _recipient: string
    ): Promise<string> => {
      return "MessageId";
    }
  );
}

export class MockCodigoVerificationEventHandler
  implements EventHandlerBase<CodigoVerificacaoDeContaDto>
{
  handler = jest.fn(
    async (
      _event: EventHandlerBaseDto<CodigoVerificacaoDeContaDto>
    ): Promise<void> => {}
  );
}

export class MockBoasVindasEventHandler
  implements EventHandlerBase<BoasVindasTo>
{
  handler = jest.fn(
    async (_event: EventHandlerBaseDto<BoasVindasTo>): Promise<void> => {}
  );
}
export class MockEsqueciMinhaSenhaEventHandler
  implements EventHandlerBase<EsqueciMinhaSenhaTo>
{
  handler = jest.fn(
    async (_event: EventHandlerBaseDto<BoasVindasTo>): Promise<void> => {}
  );
}
//deve ser o ultimo item exportado
export const mockEvenstDictionary: EventHandlerDictionary = {
  autenticacao_boas_vindas: new MockCodigoVerificationEventHandler(),
  autenticacao_esqueci_minha_senha: new MockEsqueciMinhaSenhaEventHandler(),
  autenticacao_verificacao_de_conta: new MockCodigoVerificationEventHandler(),
};
