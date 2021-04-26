import diaryData from '../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id,
        date,
        weather,
        visibility
    }))
}

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveDiaryEntries
}