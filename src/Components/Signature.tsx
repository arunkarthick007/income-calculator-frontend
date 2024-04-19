import React, { useEffect, useRef, useState } from "react";

interface Props {
  setSign: React.Dispatch<React.SetStateAction<string>>;
}

const Signature: React.FC<Props> = ({ setSign }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sigTextRef = useRef<HTMLTextAreaElement>(null);
  const sigImageRef = useRef<HTMLImageElement>(null);

  const [sigImage, setSigImage]: any = useState();
  useEffect(() => {
    (function () {
      window.requestAnimationFrame = (callback: FrameRequestCallback) => {
        return (
          window.requestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        )(callback);
      };

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 4;

      let drawing = false;
      let mousePos = { x: 0, y: 0 };
      let lastPos = mousePos;

      const getMousePos = (
        canvasDom: HTMLCanvasElement,
        mouseEvent: MouseEvent
      ) => {
        const rect = canvasDom.getBoundingClientRect();
        return {
          x: mouseEvent.clientX - rect.left,
          y: mouseEvent.clientY - rect.top,
        };
      };

      const renderCanvas = () => {
        if (drawing && lastPos.x != 0 && lastPos.y != 0) {
          ctx.beginPath();
          ctx.moveTo(lastPos.x, lastPos.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
          ctx.closePath();
        }
        lastPos = mousePos;
      };

      canvas.addEventListener(
        "mousedown",
        function (e) {
          drawing = true;
          lastPos = getMousePos(canvas, e);
        },
        false
      );

      canvas.addEventListener(
        "mouseup",
        function () {
          drawing = false;
        },
        false
      );

      canvas.addEventListener(
        "mousemove",
        function (e) {
          mousePos = getMousePos(canvas, e);
          renderCanvas();
        },
        false
      );

      canvas.addEventListener(
        "touchmove",
        function (e) {
          if (e.target === canvas) {
            e.preventDefault();
            drawing = true;
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent("mousemove", {
              // clientX: touch.clientX,
              // clientY: touch.clientY,
              clientX: e.touches[0].clientX,
              clientY: e.touches[0].clientY,
            });
            canvas.dispatchEvent(mouseEvent);
          }
        },
        false
      );

      canvas.addEventListener(
        "touchstart",
        function (e) {
          if (e.target === canvas) {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent("mousemove", {
              clientX: e.touches[0].clientX,
              clientY: e.touches[0].clientY,
            });
            canvas.dispatchEvent(mouseEvent);
          }
        },
        false
      );

      canvas.addEventListener(
        "touchend",
        function (e) {
          if (e.target === canvas) {
            e.preventDefault();
            drawing = false;
            lastPos.x = 0;
            lastPos.y = 0;
          }
        },
        false
      );

      const clearCanvas = () => {
        if (!canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };

      const sigText = sigTextRef.current;
      const sigImage = sigImageRef.current;
      const clearBtn = document.getElementById(
        "sig-clearBtn"
      ) as HTMLButtonElement;
      const submitBtn = document.getElementById(
        "sig-submitBtn"
      ) as HTMLButtonElement;

      if (clearBtn && submitBtn) {
        clearBtn.addEventListener("click", () => {
          clearCanvas();
          setSigImage(null);
          setSign("");
        });

        submitBtn.addEventListener("click", () => {
          if (!canvas) return;
          const dataUrl = canvas.toDataURL();
          setSigImage(dataUrl);
          setSign(dataUrl);
        });
      }
    })();
  }, []);

  return (
    <div className="container w-full">
      <div className="row w-full">
        <div className="w-full">
          <canvas
            className="bg-white w-full rounded-lg"
            id="sig-canvas"
            width={`calc(100vw - 1px)`}
            height={`calc(100vh - 1px)`}
            ref={canvasRef}
          >
            Get a better browser, bro.
          </canvas>
        </div>
      </div>
      <div className="row mt-8">
        <div className="flex justify-between col-md-12">
          <button className="btn btn-primary" id="sig-submitBtn">
            Submit Signature
          </button>
          <button className="btn btn-default" id="sig-clearBtn">
            Clear Signature
          </button>
        </div>
      </div>
      <br />
      {sigImage && (
        <div className="row">
          <div className="col-md-12 bg-white">
            <img
              id="sig-image"
              src={sigImage}
              alt="Your signature will go here!"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Signature;
