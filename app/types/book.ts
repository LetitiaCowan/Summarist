export interface Book {
    id: string;
    author: string;
    title: string;
    subTitle: string;
    imageLink: string;
    audioLink: string;
    totalRatings: number;
    averageRating: number;
    keyIdeas: number;
    type: string;
    status: string;
    subscriptionRequred: boolean;
    summary: string;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
}