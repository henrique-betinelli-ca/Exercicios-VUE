import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ScoreResult from './ScoreResult.vue';

describe('ScoreResult', () => {
    const mountComponent =  propsData =>
        shallowMount(ScoreResult, {
            propsData,
        });
    it('should render score and time from props', () => {
        const fakeResults = {
            score: 45,
            time: 40,
        };
        const wrapper = mountComponent({totalResults: fakeResults});
        const [scoreResult, timeResult] = wrapper.findAll('h3');

        expect(scoreResult.text()).toEqual('Score: 45 points');
        expect(timeResult.text()).toEqual('Time: 40 s');
    });
});