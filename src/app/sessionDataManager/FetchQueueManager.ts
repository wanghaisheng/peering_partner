
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

  public async enqueue(request: () => Promise<any>, delayTime: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.queue = this.queue
        .then(request)
        .then(async (result) => {
          await delay((result.elapsedTime > delayTime)? 0 : Math.max(0, delayTime - result.elapsedTime));
          resolve(result.data);
        })
        .catch(reject);
    });
  }
}
