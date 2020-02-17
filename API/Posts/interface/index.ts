export default interface Post {
    title: string;
    contents: string;
    writerId?: string;
    writerName: string;
    date?: string;
    hits?: number;
}