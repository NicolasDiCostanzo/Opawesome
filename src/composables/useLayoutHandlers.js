export default function useLayoutHandlers(emit) {
  function handleCanvasUpdate(newCanvas) {
    emit('update:canvas', newCanvas);
  }

  function handleFontUpdate(newFont) {
    emit('update:font', newFont);
  }

  function handleImageSelection(imageUrl) {
    emit('update:selectNewImage', imageUrl);
  }

  return {
    handleCanvasUpdate,
    handleFontUpdate,
    handleImageSelection,
  };
}
