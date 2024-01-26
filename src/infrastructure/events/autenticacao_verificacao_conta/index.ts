import { ClassSESProxy } from "../../proxy/ses/repository/ses.repository";
import { EventHandlerBase, EventHandlerBaseDto } from "../base.event-handler";
import { Logger } from "../../logger/logger";
import { CodigoVerificacaoDeContaDto } from "../../../functions/sqs/dtos/handlers.dto";

export class CodigoVerificationEventHandler
  implements EventHandlerBase<CodigoVerificacaoDeContaDto>
{
  public name: string;

  constructor(
    private readonly sesProxy: ClassSESProxy,
    private readonly logger = new Logger(CodigoVerificationEventHandler.name)
  ) {}

  public async handler(
    event: EventHandlerBaseDto<CodigoVerificacaoDeContaDto>
  ): Promise<void> {
    try {
      this.logger.info(
        `[handler]Método sendo processado: `,
        JSON.stringify(event)
      );

      await this.sesProxy.sendMailTemplate(
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

      this.logger.log(`[handler]Método processado com exito`);
    } catch (error: any) {
      this.logger.error(`[handler]método processado com error: `, error);
    }
  }
}
