import { EventHandlerDictionary } from "@functions/sqs/dtos/handlers.dto";
import { ListennerFromSQS } from "./functions/sqs/handler.sqs";
import { CodigoVerificationEventHandler } from "./infrastructure/events/autenticacao_verificacao_conta";
import { SESProxy } from "./infrastructure/proxy/ses/ses.proxy";
import { BoasVindasEventHandler } from "./infrastructure/events/autenticacao_boas_vindas";
import { EsqueciMinhaSenhaEventHandler } from "./infrastructure/events/autenticacao_esqueci_minha_senha";

const sesProxy = new SESProxy();
const evenstDictionary: EventHandlerDictionary = {
  autenticacao_verificacao_de_conta: new CodigoVerificationEventHandler(
    sesProxy
  ),
  autenticacao_boas_vindas: new BoasVindasEventHandler(sesProxy),
  autenticacao_esqueci_minha_senha: new EsqueciMinhaSenhaEventHandler(sesProxy),
};
const eventListenner = new ListennerFromSQS(evenstDictionary);
const _eventListenner = eventListenner.handler.bind(eventListenner);

export { _eventListenner };
