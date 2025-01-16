import { DomainEvent } from '@fiap-x/tactical-design/core';

export class PaymentApproved extends DomainEvent {
  public readonly approvedAt = new Date();
}
