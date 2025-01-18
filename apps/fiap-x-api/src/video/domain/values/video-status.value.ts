import { StatusTransitionException } from '../errors/status-transition.exception';

export enum EVideoStatus {
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Processed = 'PROCESSED',
  Failed = 'FAILED',
}

export type VideoStatusValues = `${EVideoStatus}`;

export abstract class VideoStatus {
  protected abstract readonly _value: VideoStatusValues;

  static new() {
    return new PendingVideoStatus();
  }

  static create(value: VideoStatusValues) {
    const StatusMap: Record<VideoStatusValues, new () => VideoStatus> = {
      [EVideoStatus.Pending]: PendingVideoStatus,
      [EVideoStatus.Processing]: ProcessingVideoStatus,
      [EVideoStatus.Processed]: ProcessedVideoStatus,
      [EVideoStatus.Failed]: FailedVideoStatus,
    };
    const Status = StatusMap[value];
    if (!Status) {
      throw new Error(`Invalid Status Value: ${value}`);
    }
    return new Status();
  }

  get value() {
    return this._value;
  }

  pending() {
    throw new StatusTransitionException(this._value, EVideoStatus.Pending);
  }
  processing() {
    throw new StatusTransitionException(this._value, EVideoStatus.Processing);
  }
  processed() {
    throw new StatusTransitionException(this._value, EVideoStatus.Processed);
  }
  failed() {
    throw new StatusTransitionException(this._value, EVideoStatus.Failed);
  }
}

class PendingVideoStatus extends VideoStatus {
  protected readonly _value = EVideoStatus.Pending;

  processing() {
    return new ProcessingVideoStatus();
  }
}
class ProcessingVideoStatus extends VideoStatus {
  protected readonly _value = EVideoStatus.Processing;

  processed() {
    return new ProcessingVideoStatus();
  }

  failed() {
    return new ProcessingVideoStatus();
  }
}

class ProcessedVideoStatus extends VideoStatus {
  protected readonly _value = EVideoStatus.Processed;
}

class FailedVideoStatus extends VideoStatus {
  protected readonly _value = EVideoStatus.Failed;
}
