import Comment from '../../Comments/interface'
export default interface Post {
    title: string;
    contents: string;
    writerId?: string;
    writerName: string;
    reportingDate?: string;
    hits?: number;
    comments?: Comment
}