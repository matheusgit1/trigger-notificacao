import { ClassSESProxy } from "../../proxy/ses/repository/ses.repository";
import { EventHandlerBase, EventHandlerBaseDto } from "../base.event-handler";
import { Logger } from "../../logger/logger";
import { EsqueciMinhaSenhaTo } from "../../../functions/sqs/dtos/handlers.dto";

export class EsqueciMinhaSenhaEventHandler
  implements EventHandlerBase<EsqueciMinhaSenhaTo>
{
  public name: string;

  constructor(
    private readonly sesProxy: ClassSESProxy,
    private readonly logger = new Logger(EsqueciMinhaSenhaEventHandler.name)
  ) {}

  public async handler(
    event: EventHandlerBaseDto<EsqueciMinhaSenhaTo>
  ): Promise<void> {
    try {
      this.logger.info(`Método sendo processado: `, JSON.stringify(event));

      await this.sesProxy.sendMailTemplate(
        "esqueci_minha_senha_mail_template",
        {
          nome: event.payload.nome,
          link: event.payload.link,
        },
        process.env.MAIL_SENDER_DEFAULT || "noreply@bigenterprise.com.br",
        event.payload.email
      );

      this.logger.log(`Método processado com exito`);
    } catch (error: any) {
      this.logger.error(
        `[${EsqueciMinhaSenhaEventHandler.name}.handler] - método processado com error: `,
        error
      );
    }
  }
}
