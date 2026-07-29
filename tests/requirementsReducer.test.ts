import test from 'node:test';
import assert from 'node:assert/strict';

import requirementsReducer, { initialState } from '../src/reducers/requirementsReducer.ts';

const createItems = (count: number) => Array.from({ length: count }, (_, index) => ({ id: `item-${index}`, value: `value-${index}` }));

test('reorders peticiones by moving the dragged item to the target position', () => {
    const state = {
        ...initialState,
        peticiones: createItems(3),
    };

    const nextState = requirementsReducer(state, {
        type: 'REORDER_PETICIONES',
        payload: { activeId: 'item-1', overId: 'item-0' },
    });

    assert.deepEqual(nextState.peticiones.map((item) => item.id), ['item-1', 'item-0', 'item-2']);
});

test('reorders hechos by moving the dragged item to the target position', () => {
    const state = {
        ...initialState,
        hechos: createItems(3),
    };

    const nextState = requirementsReducer(state, {
        type: 'REORDER_HECHOS',
        payload: { activeId: 'item-2', overId: 'item-1' },
    });

    assert.deepEqual(nextState.hechos.map((item) => item.id), ['item-0', 'item-2', 'item-1']);
});

test('clears peticion text when removing the only item', () => {
    const state = {
        ...initialState,
        peticiones: [{ id: 'only', value: 'contenido' }],
    };

    const nextState = requirementsReducer(state, {
        type: 'REMOVE_PETICION',
        payload: 'only',
    });

    assert.equal(nextState.peticiones.length, 1);
    assert.equal(nextState.peticiones[0].id, 'only');
    assert.equal(nextState.peticiones[0].value, '');
});

test('clears hecho text when removing the only item', () => {
    const state = {
        ...initialState,
        hechos: [{ id: 'only', value: 'contenido' }],
    };

    const nextState = requirementsReducer(state, {
        type: 'REMOVE_HECHO',
        payload: 'only',
    });

    assert.equal(nextState.hechos.length, 1);
    assert.equal(nextState.hechos[0].id, 'only');
    assert.equal(nextState.hechos[0].value, '');
});
