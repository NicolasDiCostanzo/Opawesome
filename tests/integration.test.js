import { mount } from '@vue/test-utils';
import {
  describe, it, expect, vi,
} from 'vitest';
import { fabric } from 'fabric';
import App from '../src/App.vue';

async function mountAppWithMockedCanvas() {
  const mockCanvas = new fabric.Canvas();
  mockCanvas.add = vi.fn(function add(obj) {
    this._objects.push(obj);
  });
  mockCanvas.setActiveObject = vi.fn((obj) => {
    mockCanvas._activeObject = obj;
  });
  mockCanvas.on = vi.fn((event, handler) => {
    mockCanvas[event] = handler;
  });

  const wrapper = mount(App);
  wrapper.vm.updateCanvas(mockCanvas);
  await wrapper.vm.$nextTick();
  return { wrapper, mockCanvas };
}

async function addTextboxToCanvas(wrapper) {
  const leftPart = wrapper.findComponent({ name: 'LeftPart' });
  const addButton = leftPart.find('button');
  await addButton.trigger('click');
}

function getTypeOfObjectsFromCanvas(canvas, typeOfObject) {
  return canvas.getObjects().filter((obj) => obj instanceof typeOfObject);
}

describe('App.vue', () => {
  describe('adding text', () => {
    it('spawns a textbox on the CentralPage component when the "Add" button of the LeftPart component is clicked', async () => {
      const { wrapper, mockCanvas } = await mountAppWithMockedCanvas();
      await addTextboxToCanvas(wrapper);

      const textboxes = getTypeOfObjectsFromCanvas(mockCanvas, fabric.Textbox);
      expect(textboxes.length).toBe(1);

      const foundTextBox = textboxes[0];
      expect(foundTextBox.fontFamily).toBe('Arial');
    });

    it('spawns a textbox with the selected font family from the <select> element on the LeftPart component', async () => {
      const { wrapper, mockCanvas } = await mountAppWithMockedCanvas();

      const leftPart = wrapper.findComponent({ name: 'LeftPart' });
      const select = leftPart.find('select');
      await select.setValue('Impact');

      await addTextboxToCanvas(wrapper);
      const textbox = getTypeOfObjectsFromCanvas(mockCanvas, fabric.Textbox)[0];
      expect(textbox.fontFamily).toBe('Impact');
    });
  });

  describe('textbox selection and font modification', () => {
    it("updates the select element's value when a textbox is selected", async () => {});

    it('updates the font family of the selected textbox when the select value is modified', async () => {});
  });

  describe('image selection', () => {
    it('updates the image displayed in the canvas when a new image is selected', async () => {});
  });

  describe('image downloading', () => {
    it('downloads the canvas as an image', async () => {});
  });
});
