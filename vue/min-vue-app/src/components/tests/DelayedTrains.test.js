import { test, expect } from "vitest";
import { mount } from '@vue/test-utils';
import DelayedTrains from "../DelayedTrains.vue";
import OneDelayed from "../OneDelayed.vue";

test("Testing view contains map and delayedtrains", async () => {
    const wrapper = await mount(DelayedTrains);
    // Testing second component
    const one = wrapper.findComponent(OneDelayed);
    expect(one.exists()).toBe(true);
    const delayedTrainsByName = wrapper.findComponent({ name: 'OneDelayed' });
})

