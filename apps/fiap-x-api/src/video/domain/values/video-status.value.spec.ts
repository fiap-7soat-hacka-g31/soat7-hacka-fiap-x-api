import { StatusTransitionException } from '../errors/status-transition.exception';
import {
  EVideoStatus,
  VideoStatus,
  VideoStatusValues,
} from './video-status.value';

const AllStatusValues: VideoStatusValues[] = [
  EVideoStatus.Pending,
  EVideoStatus.Processing,
  EVideoStatus.Processed,
  EVideoStatus.Failed,
];

describe('VideoStatus', () => {
  describe.each(AllStatusValues)('Static create', (value) => {
    it(`should create an instance of ${value} VideoStatus`, () => {
      const actual = VideoStatus.create(value);
      expect(actual.value).toBe(value);
    });
  });

  describe('Instantiation', () => {
    it('should instantiate as Pending', () => {
      const actual = VideoStatus.new();
      expect(actual.value).toBe(EVideoStatus.Pending);
    });

    it('shoult throw if an unknown status is provided', () => {
      const value = 'UNKNOWN' as any;
      expect(() => VideoStatus.create(value)).toThrow(
        `Invalid Status Value: ${value}`,
      );
    });

    it('should allow transitioning from "Pending" to "Processing"', () => {
      const initial = VideoStatus.create(EVideoStatus.Pending);
      const actual = initial.processing();
      expect(initial.value).toBe(EVideoStatus.Pending);
      expect(actual.value).toBe(EVideoStatus.Processing);
    });

    it('should allow transitioning from "Processing" to "Failed"', () => {
      const initial = VideoStatus.create(EVideoStatus.Processing);
      const actual = initial.failed();
      expect(initial.value).toBe(EVideoStatus.Processing);
      expect(actual.value).toBe(EVideoStatus.Failed);
    });

    it('should allow transitioning from "Processing" to "Processed"', () => {
      const initial = VideoStatus.create(EVideoStatus.Processing);
      const actual = initial.processed();
      expect(initial.value).toBe(EVideoStatus.Processing);
      expect(actual.value).toBe(EVideoStatus.Processed);
    });

    it('should not allow transitioning from "Pending" to "Pending"', () => {
      const initial = VideoStatus.create(EVideoStatus.Pending);
      expect(() => initial.pending()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Pending" to "Processed"', () => {
      const initial = VideoStatus.create(EVideoStatus.Pending);
      expect(() => initial.processed()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Pending" to "Failed"', () => {
      const initial = VideoStatus.create(EVideoStatus.Pending);
      expect(() => initial.failed()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Processing" to "Pending"', () => {
      const initial = VideoStatus.create(EVideoStatus.Processing);
      expect(() => initial.pending()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Processing" to "Processing"', () => {
      const initial = VideoStatus.create(EVideoStatus.Processing);
      expect(() => initial.processing()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Processed" to "Pending"', () => {
      const initial = VideoStatus.create(EVideoStatus.Processed);
      expect(() => initial.pending()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Processed" to "Processing"', () => {
      const initial = VideoStatus.create(EVideoStatus.Processed);
      expect(() => initial.processing()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Processed" to "Failed"', () => {
      const initial = VideoStatus.create(EVideoStatus.Processed);
      expect(() => initial.failed()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Processed" to "Processed"', () => {
      const initial = VideoStatus.create(EVideoStatus.Processed);
      expect(() => initial.processed()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Failed" to "Pending"', () => {
      const initial = VideoStatus.create(EVideoStatus.Failed);
      expect(() => initial.pending()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Failed" to "Processing"', () => {
      const initial = VideoStatus.create(EVideoStatus.Failed);
      expect(() => initial.processing()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Failed" to "Failed"', () => {
      const initial = VideoStatus.create(EVideoStatus.Failed);
      expect(() => initial.failed()).toThrow(StatusTransitionException);
    });

    it('should not allow transitioning from "Failed" to "Failed"', () => {
      const initial = VideoStatus.create(EVideoStatus.Failed);
      expect(() => initial.failed()).toThrow(StatusTransitionException);
    });
  });
});
