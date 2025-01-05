import { mount } from '@vue/test-utils';
import {
  describe, it, expect, vi,
} from 'vitest';
import { fabric } from 'fabric';
import App from '../src/App.vue';

describe('App.vue', () => {
  it('spawns a textbox on the CentralPage component when the "Add" button of the LeftPart component is clicked', async () => {
    // Create a mock canvas object
    const mockCanvas = new fabric.Canvas();
    mockCanvas.add = vi.fn(function add(obj) {
      this._objects.push(obj);
    });
    mockCanvas.setActiveObject = vi.fn();
    mockCanvas.renderAll = vi.fn();

    // Mount the App component
    const wrapper = mount(App);

    // Trigger the updateCanvas method to set the canvas
    wrapper.vm.updateCanvas(mockCanvas);
    await wrapper.vm.$nextTick();

    // Find the LeftPart component
    const leftPart = wrapper.findComponent({ name: 'LeftPart' });

    // Find the "Add" button and click it
    const addButton = leftPart.find('button');
    await addButton.trigger('click');

    // Check the objects on the canvas
    const objects = mockCanvas.getObjects();
    const textboxes = objects.filter((obj) => obj instanceof fabric.Textbox);
    expect(textboxes.length).toBe(1);
    const foundTextBox = textboxes[0];
    expect(foundTextBox.text).toBe('this font');
    expect(foundTextBox.fontFamily).toBe('Arial');
  });
});
