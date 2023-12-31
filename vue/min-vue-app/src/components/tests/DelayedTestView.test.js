import { test, expect } from "vitest";
import { flushPromises } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import DelayedTrainView from "../../views/DelayedTrainView.vue";
import Map from "../Map.vue";
import DelayedTrains from "../DelayedTrains.vue";

test("Testing view contains map and delayedtrains", async () => {
    const wrapper = await mount(DelayedTrainView);
    const map = wrapper.findComponent(Map);
    expect(map.exists()).toBe(true);
    const mapByName = wrapper.findComponent({ name: 'Map' });
    // Testing second component
    const delayedtrains = wrapper.findComponent(DelayedTrains);
    expect(delayedtrains.exists()).toBe(true);
    const delayedTrainsByName = wrapper.findComponent({ name: 'DelayedTrains' });
})

