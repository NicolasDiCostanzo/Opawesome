import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(false);
const maxMobileWidth = 800; // 800px is considered as the mobile breakpoint

export default function useMobileState() {
  const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= maxMobileWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateIsMobile);
    updateIsMobile();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile);
  });

  return {
    isMobile,
  };
}
