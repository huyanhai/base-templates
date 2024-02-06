import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export function setupNProgress() {
  NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false }); // 进度条配置
  return NProgress;
}

export function useNProgress() {
  const NProgressStart = () => {
    NProgress.start();
  };
  const NProgressDone = () => {
    NProgress.done();
  };
  return {
    NProgressStart,
    NProgressDone
  };
}
