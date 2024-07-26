
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class FetchQueueManager {
  private static instance: FetchQueueManager;
  private queue: Promise<void> = Promise.resolve();

  private constructor() {}

  public static getInstance(): FetchQueueManager {
    if (!FetchQueueManager.instance) {
      FetchQueueManager.instance = new FetchQueueManager();
    }
    return FetchQueueManager.instance;
  }

  public async enqueue<T>(request: () => Promise<T>, delayTime: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue = this.queue
        .then(request)
        .then(async (result) => {
          await delay(delayTime);
          resolve(result);
        })
        .catch(reject);
    });
  }
}
