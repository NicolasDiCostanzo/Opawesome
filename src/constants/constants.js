import useMobileState from '../composables/useMobileState';

export const IMAGES_SIZE = 125;
const CENTER_IMAGE_MAX_SIZE = 500;
const CENTER_IMAGE_MIN_SIZE = 300;
const CENTER_IMAGE_MAX_SIZE_MOBILE = 300;
const CENTER_IMAGE_MIN_SIZE_MOBILE = 150;

const { isMobile } = useMobileState();
export const canvasMinSize = () => (isMobile.value ? CENTER_IMAGE_MIN_SIZE_MOBILE : CENTER_IMAGE_MIN_SIZE);
export const canvasMaxSize = () => (isMobile.value ? CENTER_IMAGE_MAX_SIZE_MOBILE : CENTER_IMAGE_MAX_SIZE);
