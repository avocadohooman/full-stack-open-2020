import diaryData from '../data/diaries';
import { DiaryEntry } from '../types';

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry
}