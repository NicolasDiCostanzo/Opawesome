import { describe, it, expect } from 'vitest';
// eslint-disable-next-line camelcase
import { _test_textboxDistanceFromCanvasTopLeft } from '../src/helpers/canvas-helper';

describe('Canvas Helper', () => {
  it('should correctly reposition textboxes on the canvas when the canvas size changes', () => {
    const lastCanvasDimensions = { width: 500, height: 323.75 };
    const newCanvasDimensions = { width: 300, height: 300 };
    const textBoxes = [{
      type: 'textbox',
      left: 10,
      top: 10,
      width: 10,
      height: 10,
      canvas: newCanvasDimensions,
    }, {
      type: 'textbox',
      left: 490,
      top: 10,
      width: 10,
      height: 10,
      canvas: newCanvasDimensions,
    }, {
      type: 'textbox',
      left: 10,
      top: 490,
      width: 10,
      height: 10,
      canvas: newCanvasDimensions,
    }, {
      type: 'textbox',
      left: 490,
      top: 490,
      width: 10,
      height: 10,
      canvas: newCanvasDimensions,
    }];

    let { left, top } = _test_textboxDistanceFromCanvasTopLeft(lastCanvasDimensions, textBoxes[0]);

    expect(left).toBe(6);
    expect(top).toBeCloseTo(9.26, 1);

    ({ left, top } = _test_textboxDistanceFromCanvasTopLeft(lastCanvasDimensions, textBoxes[1]));

    expect(left).toBe(290);
    expect(top).toBeCloseTo(9.26, 1);

    ({ left, top } = _test_textboxDistanceFromCanvasTopLeft(lastCanvasDimensions, textBoxes[2]));
    expect(left).toBe(6);
    expect(top).toBe(290);

    ({ left, top } = _test_textboxDistanceFromCanvasTopLeft(lastCanvasDimensions, textBoxes[3]));
    expect(left).toBe(290);
    expect(top).toBe(290);
  });
});
