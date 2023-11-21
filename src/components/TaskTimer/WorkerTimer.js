const WorkerTimer = () => {
  let isActive = false;
  let endTime;
  let requestId;

  const tick = (min, sec) => {
    const currentTime = Date.now();
    endTime = currentTime + min * 60 * 1000 + sec * 1000;

    const updateTimer = () => {
      if (!isActive) {
        cancelAnimationFrame(requestId);
        return;
      }
      const remainingTime = Math.max(endTime - Date.now(), 0);
      const minutes = Math.floor(remainingTime / (60 * 1000));
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
      console.log('tick');
      self.postMessage({ min: minutes, sec: seconds });

      if (isActive && remainingTime > 0) {
        requestId = requestAnimationFrame(updateTimer);
      }
    };

    updateTimer();
  };

  self.onmessage = function ({ data: { turn, min, sec } }) {
    if (turn === 'on') {
      isActive = true;
      tick(min, sec);
    } else if (turn === 'off') {
      isActive = false;
      cancelAnimationFrame(requestId);
    }
  };
};

let code = WorkerTimer.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
