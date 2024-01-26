import { EventHandlerBase } from "../../../infrastructure/events/base.event-handler";

export type AvailableEvents =
  | "autenticacao_verificacao_de_conta"
  | "autenticacao_boas_vindas"
  | "autenticacao_esqueci_minha_senha";

export type EventHandlerDictionary = {
  [key in AvailableEvents]: EventHandlerBase<any>;
};

export interface EventReceived<T> {
  topico: AvailableEvents;
  versao: number;
  payload: T;
}

export interface BaseEvent {
  email: string;
}

export interface BoasVindasTo extends BaseEvent {
  nome: string;
}

export interface CodigoVerificacaoDeContaDto extends BaseEvent {
  nome: string;
  codigo: string;
  urlSolicitarNovoCodigoVerificacao: string;
}

export interface EsqueciMinhaSenhaTo extends BaseEvent {
  nome: string;
  link: string;
}
