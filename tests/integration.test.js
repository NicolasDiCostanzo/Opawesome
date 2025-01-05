import { mount } from '@vue/test-utils';
import {
  describe, it, expect, vi,
} from 'vitest';
import { fabric } from 'fabric';
import App from '../src/App.vue';

function getTypeOfObjectsFromCanvas(canvas, typeOfObject) {
  return canvas.getObjects().filter((obj) => obj instanceof typeOfObject);
}

describe('App.vue', () => {
  it('spawns a textbox on the CentralPage component when the "Add" button of the LeftPart component is clicked', async () => {
    const mockCanvas = new fabric.Canvas();
    mockCanvas.add = vi.fn(function add(obj) {
      this._objects.push(obj);
    });

    const wrapper = mount(App);
    wrapper.vm.updateCanvas(mockCanvas);
    await wrapper.vm.$nextTick();

    const leftPart = wrapper.findComponent({ name: 'LeftPart' });

    const addButton = leftPart.find('button');
    await addButton.trigger('click');

    const textboxes = getTypeOfObjectsFromCanvas(mockCanvas, fabric.Textbox);
    expect(textboxes.length).toBe(1);

    const foundTextBox = textboxes[0];
    expect(foundTextBox.fontFamily).toBe('Arial');
  });
});
