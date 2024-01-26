import { Logger } from "../../../infrastructure/logger/logger";
import { ClassSESProxy } from "./repository/ses.repository";
import * as AWS from "aws-sdk";

export class SESProxy implements ClassSESProxy {
  public ses: AWS.SES;
  // private logger = new Logger(SESProxy.name);
  constructor(private readonly logger: Logger = new Logger(SESProxy.name)) {
    this.ses = new AWS.SES({ httpOptions: { timeout: 30 * 1000 } });
  }
  public async sendMailTemplate(
    templateName: string,
    templateParameters: any,
    sender: string,
    recipient: string
  ): Promise<string> {
    try {
      this.logger.info(
        "[sendMailTemplate] metodo iniciado com parametros",
        JSON.stringify({
          templateName,
          templateParameters,
          sender,
          recipient,
        })
      );

      const emailParams: AWS.SES.SendTemplatedEmailRequest = {
        Source: sender,
        Template: templateName,
        Destination: {
          ToAddresses: [recipient],
        },
        TemplateData: JSON.stringify(templateParameters),
      };

      const response = await this.ses.sendTemplatedEmail(emailParams).promise();
      this.logger.info(`[sendMailTemplate] email enviado para ${recipient}`);
      this.logger.info(`[sendMailTemplate] reposta`, JSON.stringify(response));
      return response.MessageId;
    } catch (err) {
      this.logger.error(`[sendMailTemplate] falha ao enviar email-templated`);
      throw err;
    }
  }
}
