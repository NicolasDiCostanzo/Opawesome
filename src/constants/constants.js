import useMobileState from '../composables/useMobileState';

export const IMAGES_SIZE = 125;
const CENTER_IMAGE_MAX_SIZE = 500;
const CENTER_IMAGE_MIN_SIZE = 300;
const CENTER_IMAGE_MAX_SIZE_MOBILE = 300;
const CENTER_IMAGE_MIN_SIZE_MOBILE = 150;

const { isMobile } = useMobileState();
/**
 * @returns Minimum size of the canvas depending on the device
 */
export const canvasMinSize = () => (isMobile.value ? CENTER_IMAGE_MIN_SIZE_MOBILE : CENTER_IMAGE_MIN_SIZE);

/**
 * @returns Maximum size of the canvas depending on the device
 */
export const canvasMaxSize = () => (isMobile.value ? CENTER_IMAGE_MAX_SIZE_MOBILE : CENTER_IMAGE_MAX_SIZE);

/**
 * @returns Default font size for textboxes in the canvas depending on the device
 */
export const defaultFontSize = () => (isMobile.value ? 25 : 35);
