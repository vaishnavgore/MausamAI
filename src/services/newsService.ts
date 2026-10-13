import { DEMO_NEWS_SIGNALS } from '@/data/demoNews';
import { NewsSignal } from '@/types/news';

class NewsService {
  private newsList: NewsSignal[] = [...DEMO_NEWS_SIGNALS];

  public getNewsSignals(): NewsSignal[] {
    return [...this.newsList];
  }

  public addSimulatedNews(headline: string, source: string, location: string): NewsSignal {
    const newItem: NewsSignal = {
      id: `news-${Date.now().toString(36)}`,
      headline,
      sourceName: source,
      sourceUrl: '#',
      time: 'Just now',
      location,
      crossSignalStatus: {
        weatherSignal: true,
        communitySignal: true,
        radarSignal: true,
        statusText: 'Verified across local Doppler radar & active citizen reports.',
        trustRating: 'high',
      },
    };
    this.newsList = [newItem, ...this.newsList];
    return newItem;
  }
}

export const newsService = new NewsService();
