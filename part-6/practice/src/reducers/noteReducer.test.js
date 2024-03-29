import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'
import { ACTIONS } from '../index';

describe('noteReducer', () => {
    test('returns a new state with action NEW_NOTE', () => {
        const state = [];
        const action = {
            type: ACTIONS.NEW_NOTE,
            data: {
                content: 'the app state is in redux store',
                important: true,
                id: 1
            }
        }

        deepFreeze(state);
        const newState = noteReducer(state, action);
        expect(newState).toHaveLength(1);
        expect(newState).toContainEqual(action.data);
    })
})