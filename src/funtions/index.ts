export function getCurrentRound(currentDate?: string): number {
    const theDate = new Date('2020-02-01:11:45');
    const today = currentDate && new Date(currentDate) || new Date();
    const between = Number(today) - Number(theDate);
    const plusDate = Math.floor(between / 24 / 3600 / 1000 / 7);
    return 896 + plusDate;
}