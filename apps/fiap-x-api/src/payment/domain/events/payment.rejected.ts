import { DomainEvent } from '@fiap-x/tactical-design/core';

export class PaymentRejected extends DomainEvent {
  public readonly rejectedAt = new Date();
}
