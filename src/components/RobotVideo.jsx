import React, { useEffect, useRef } from 'react';

const VIDEO_SOURCE = '/models/gemini_generated_video_2ab3b98a.mp4';

/**
 * Draws the generated robot footage to a transparent canvas.
 *
 * The source video has a dark space backdrop rather than an alpha channel. We
 * key the bright robot silhouette, then restore the enclosed face lights and
 * engine flame so the page receives a robot-only layer instead of a second
 * rectangular video background.
 */
export default function RobotVideo({ lowPower = false }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const output = canvasRef.current;
    if (!video || !output) return undefined;

    const outputContext = output.getContext('2d', { alpha: true });
    const source = document.createElement('canvas');
    const sourceContext = source.getContext('2d', { willReadFrequently: true });
    if (!outputContext || !sourceContext) return undefined;

    const compactViewport = window.matchMedia('(max-width: 900px)').matches;
    // Keep enough pixels for the enlarged mobile close-up while still staying
    // below the source video's native 1280px processing cost.
    const width = compactViewport
      ? Math.min(640, Math.max(480, Math.round(window.innerWidth * 1.4)))
      : lowPower ? 512 : 768;
    const height = Math.round(width * 9 / 16);
    const pixelCount = width * height;

    source.width = width;
    source.height = height;
    output.width = width;
    output.height = height;
    sourceContext.imageSmoothingEnabled = true;
    sourceContext.imageSmoothingQuality = 'high';
    outputContext.imageSmoothingEnabled = true;
    outputContext.imageSmoothingQuality = 'high';

    const seed = new Uint8Array(pixelCount);
    const dilationPass = new Uint8Array(pixelCount);
    const expanded = new Uint8Array(pixelCount);
    const labels = new Int32Array(pixelCount);
    const queue = new Int32Array(pixelCount);
    const outputImage = outputContext.createImageData(width, height);

    let frameRequest = 0;
    let videoFrameRequest = 0;
    let disposed = false;
    let active = !document.hidden;

    const dilate = (input, result, radius) => {
      dilationPass.fill(0);
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const minX = Math.max(0, x - radius);
          const maxX = Math.min(width - 1, x + radius);
          let found = false;
          for (let xx = minX; xx <= maxX; xx += 1) {
            if (input[y * width + xx]) {
              found = true;
              break;
            }
          }
          dilationPass[y * width + x] = found ? 1 : 0;
        }
      }
      for (let y = 0; y < height; y += 1) {
        const minY = Math.max(0, y - radius);
        const maxY = Math.min(height - 1, y + radius);
        for (let x = 0; x < width; x += 1) {
          let found = false;
          for (let yy = minY; yy <= maxY; yy += 1) {
            if (dilationPass[yy * width + x]) {
              found = true;
              break;
            }
          }
          result[y * width + x] = found ? 1 : 0;
        }
      }
    };

    const findLargestComponent = () => {
      labels.fill(0);
      let componentId = 0;
      let largestId = 0;
      let largestSize = 0;
      let largestBounds = { minX: width, minY: height, maxX: 0, maxY: 0 };

      for (let start = 0; start < pixelCount; start += 1) {
        if (!expanded[start] || labels[start]) continue;

        componentId += 1;
        let head = 0;
        let tail = 1;
        let size = 0;
        let minX = width;
        let minY = height;
        let maxX = 0;
        let maxY = 0;
        queue[0] = start;
        labels[start] = componentId;

        while (head < tail) {
          const index = queue[head];
          head += 1;
          const x = index % width;
          const y = Math.floor(index / width);
          size += 1;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);

          for (let dy = -1; dy <= 1; dy += 1) {
            const nextY = y + dy;
            if (nextY < 0 || nextY >= height) continue;
            for (let dx = -1; dx <= 1; dx += 1) {
              const nextX = x + dx;
              if (nextX < 0 || nextX >= width || (dx === 0 && dy === 0)) continue;
              const nextIndex = nextY * width + nextX;
              if (expanded[nextIndex] && !labels[nextIndex]) {
                labels[nextIndex] = componentId;
                queue[tail] = nextIndex;
                tail += 1;
              }
            }
          }
        }

        if (size > largestSize) {
          largestSize = size;
          largestId = componentId;
          largestBounds = { minX, minY, maxX, maxY };
        }
      }

      return { largestId, largestBounds };
    };

    const renderRobot = () => {
      if (disposed || !active || video.readyState < 2) return;

      sourceContext.drawImage(video, 0, 0, width, height);
      const frame = sourceContext.getImageData(0, 0, width, height);
      const pixels = frame.data;

      // High threshold avoids selecting the source video's stars and faint
      // blue grid. The robot's shell, eyes, heart, and exhaust are brighter.
      for (let i = 0, pixel = 0; i < pixelCount; i += 1, pixel += 4) {
        const r = pixels[pixel];
        const g = pixels[pixel + 1];
        const b = pixels[pixel + 2];
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const blueLight = b > 105 && b > r * 1.2 && g > r * 1.15;
        const y = Math.floor(i / width);
        const x = i - y * width;

        // The generated subject stays in the central corridor. This also
        // prevents isolated edge stars from ever becoming foreground pixels.
        seed[i] = y > height * 0.07 && x > width * 0.23 && x < width * 0.77
          && (luma > 105 || blueLight) ? 1 : 0;
      }

      dilate(seed, expanded, 2);
      const { largestId, largestBounds } = findLargestComponent();
      const { minX, minY, maxX, maxY } = largestBounds;
      const hasSubject = largestId > 0 && maxX > minX && maxY > minY;
      const faceCenterX = (minX + maxX) * 0.5;
      const faceCenterY = minY + (maxY - minY) * 0.22;
      const faceRadiusX = Math.max(1, (maxX - minX) * 0.3);
      const faceRadiusY = Math.max(1, (maxY - minY) * 0.13);

      for (let i = 0, pixel = 0; i < pixelCount; i += 1, pixel += 4) {
        const x = i % width;
        const y = Math.floor(i / width);
        const r = pixels[pixel];
        const g = pixels[pixel + 1];
        const b = pixels[pixel + 2];
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const blueLight = b > 105 && b > r * 1.2 && g > r * 1.15;
        const inFace = hasSubject
          && (((x - faceCenterX) / faceRadiusX) ** 2 + ((y - faceCenterY) / faceRadiusY) ** 2 <= 1);
        const inEngine = hasSubject
          && y > maxY - height * 0.16
          && Math.abs(x - faceCenterX) < width * 0.12;
        const isForeground = hasSubject
          && (labels[i] === largestId || (seed[i] && (inFace || inEngine)));

        // A soft luma edge removes the navy halo left by the source while
        // retaining the robot's luminous material and fine silhouette.
        let alpha = isForeground ? Math.max(0, Math.min(1, (luma - 28) / 58)) : 0;
        if (seed[i] && (inFace || inEngine || blueLight)) alpha = Math.max(alpha, 0.82);

        // Cool the generated footage very slightly to match the site's cyan
        // lighting. The restrained grade keeps the shell white while lifting
        // the blue emissive details instead of tinting the whole robot cyan.
        const grade = alpha > 0 ? 1 : 0;
        const gradedRed = Math.min(255, r * (1 - 0.045 * grade));
        const gradedGreen = Math.min(255, g * (1 + 0.012 * grade));
        const gradedBlue = Math.min(255, b * (1 + 0.075 * grade));

        outputImage.data[pixel] = Math.round(gradedRed);
        outputImage.data[pixel + 1] = Math.round(gradedGreen);
        outputImage.data[pixel + 2] = Math.round(gradedBlue);
        outputImage.data[pixel + 3] = Math.round(alpha * 255);
      }

      outputContext.putImageData(outputImage, 0, 0);
    };

    const scheduleFrame = () => {
      if (disposed || !active) return;
      renderRobot();
      if ('requestVideoFrameCallback' in video) {
        videoFrameRequest = video.requestVideoFrameCallback(scheduleFrame);
      } else {
        frameRequest = window.requestAnimationFrame(scheduleFrame);
      }
    };

    const startVideo = () => {
      if (active) {
        video.play().catch(() => {});
        scheduleFrame();
      }
    };

    const handleVisibility = () => {
      active = !document.hidden;
      if (!active) {
        video.pause();
        if (frameRequest) window.cancelAnimationFrame(frameRequest);
        if (videoFrameRequest && 'cancelVideoFrameCallback' in video) {
          video.cancelVideoFrameCallback(videoFrameRequest);
        }
        frameRequest = 0;
        videoFrameRequest = 0;
        return;
      }

      video.play().catch(() => {});
      scheduleFrame();
    };

    video.addEventListener('loadeddata', startVideo);
    document.addEventListener('visibilitychange', handleVisibility);
    if (video.readyState >= 2) startVideo();

    return () => {
      disposed = true;
      video.removeEventListener('loadeddata', startVideo);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (frameRequest) window.cancelAnimationFrame(frameRequest);
      if (videoFrameRequest && 'cancelVideoFrameCallback' in video) {
        video.cancelVideoFrameCallback(videoFrameRequest);
      }
      video.pause();
    };
  }, []);

  return (
    <div className="hero-robot-video" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-robot-video-canvas" />
      <video
        ref={videoRef}
        className="hero-robot-video-source"
        src={VIDEO_SOURCE}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
