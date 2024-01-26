import { ClassSESProxy } from "../../proxy/ses/repository/ses.repository";
import { EventHandlerBase, EventHandlerBaseDto } from "../base.event-handler";
import { Logger } from "../../logger/logger";
import { BoasVindasTo } from "../../../functions/sqs/dtos/handlers.dto";

export class BoasVindasEventHandler implements EventHandlerBase<BoasVindasTo> {
  public name: string;

  constructor(
    private readonly sesProxy: ClassSESProxy,
    private readonly logger = new Logger(BoasVindasEventHandler.name)
  ) {}

  public async handler(
    event: EventHandlerBaseDto<BoasVindasTo>
  ): Promise<void> {
    try {
      this.logger.info(
        `[handler] Método sendo processado: `,
        JSON.stringify(event)
      );

      await this.sesProxy.sendMailTemplate(
        "AUTENTICACAO_VERIFICACAO_DE_CONTA",
        { nome: event.payload.nome },
        "noreply@bigenterprise.com.br",
        event.payload.email
      );

      this.logger.log(`[handler] Método processado com exito`);
    } catch (error: any) {
      this.logger.error(
        `[${BoasVindasEventHandler.name}.handler] - método processado com error: `,
        error
      );
    }
  }
}
