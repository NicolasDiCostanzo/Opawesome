import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(false);
const maxMobileWidth = 800; // 800px is considered as the mobile breakpoint

export default function useMobileState() {
  const updateIsMobile = () => {
    const width = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    );
    
    const userAgent = navigator.userAgent.toLowerCase();
    const isActualMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
    if (isActualMobileDevice && hasTouch) {
      isMobile.value = true;
    } else {
      isMobile.value = width <= maxMobileWidth;
    }
  };

  onMounted(() => {
    window.addEventListener('resize', updateIsMobile);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateIsMobile, 100);
    });
    updateIsMobile();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile);
    window.removeEventListener('orientationchange', updateIsMobile);
  });

  return {
    isMobile,
  };
}
