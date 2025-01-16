import { DomainEvent } from '@fiap-x/tactical-design/core';

export class PaymentCreated extends DomainEvent {
  constructor(
    public readonly conciliationId: string,
    public readonly content: string,
  ) {
    super();
  }
}
