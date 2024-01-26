export declare class ClassSESProxy {
  constructor(...args: any[]);
  
  sendMailTemplate(
    templateName: string,
    templateParameters: any,
    sender: string,
    recipient: string
  ): Promise<string>;
}
