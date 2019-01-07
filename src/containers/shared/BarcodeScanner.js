import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Quagga from 'quagga';
import scanActions from "./scanActions";
import appActions from "../../actions/appActions";

class BarcodeScanner extends Component {
  constructor() {
    super();
    this.state = {
      quaggas: null,
      lastResult: "",
      lastScanType: "",
      cameraFound: true,
      maxCountToLookForCamera: 10,
      countToLookForCamera: 0,
      scannerIsRunning: false
    };
  }

  componentDidMount() {
    setTimeout(() => { this.initBarcodeScanner(); }, 1000);
  }

  checkCapabilities = () => {
    const track = this.state.quaggas.CameraAccess.getActiveTrack();
    let capabilities = {};
    if (typeof track.getCapabilities === "function") {
      capabilities = track.getCapabilities();
    }
    this.applySettingsVisibility("zoom", capabilities.zoom);
    this.applySettingsVisibility("torch", capabilities.torch);
  }

  onBarcodeDetected(result) {
    const data = (result && result.codeResult && result.codeResult.code) ?
      result.codeResult.code.replace(/\+/g, " ") : null;

    if ((data && data !== this.state.lastResult) || (this.props.scanOption !== this.state.lastScanType && data === this.state.lastResult)) {
      this.state.lastResult = data;
      this.state.lastScanType = this.props.scanOption;
      this.state.scannerIsRunning = false;
      this.state.quaggas.pause();
      setTimeout(() => { this.props.scanDelivery({ scanDeliveryNumber: data, scanDeliveryType: this.props.scanOption }); }, 1000);
    }
  }

  initScanner = device => {
    this.setState({ ...this.state, quaggas: Quagga });
    const quaggaInit = this.state.quaggas;
    quaggaInit.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#interactive"),
        constraints: {
          // facingMode: "environment",
          width: 165,
          height: 125,
          aspectRatio: { min: 1, max: 100 },
          deviceId: device.deviceId
        }
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: 2,
      frequency: 3,
      decoder: {
        readers: [{
          format: "code_128_reader",
          config: {}
        }]
      },
      locate: true
    }, err => {
      if (err) {
        this.onCameraError(err);
        return false;
      }
      console.log("Initialization finished. Ready to start");
      const track = quaggaInit.CameraAccess.getActiveTrack();

      let capabilities = {};
      if (typeof track.getCapabilities === "function") {
        capabilities = track.getCapabilities();
      }
      this.setState({ ...this.state, scannerIsRunning: true });
      quaggaInit.start();
    });

    quaggaInit.onDetected(result => this.onBarcodeDetected(result));
    quaggaInit.onProcessed(result => this.onProcessed(result));
  }

  initBarcodeScanner = () => {
    this.setState({ ...this.state, countToLookForCamera: ++this.state.countToLookForCamera });
    if (this.props.active && document.querySelector("#interactive") && !this.state.quaggas && (this.state.countToLookForCamera < this.state.maxCountToLookForCamera)) {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          let camera = devices.filter(device => device.kind === "videoinput" && device.label.indexOf("back") !== -1);
          if (camera.length === 0) {
            camera = devices.filter(device => device.kind === "videoinput");
            if (camera[0]) {
              this.initScanner(camera[0]);
            } else {
              this.setState({ ...this.state, cameraFound: false });
              return false;
            }
          }
          if (camera.length < 1) {
            this.setState({ ...this.state, cameraFound: false });
            return false;
          }
          this.initScanner(camera[0]);
          return camera[0];
        });
    }
  }

  componentWillUnmount() {
    if (this.state.quaggas) {
      this.state.quaggas.stop();
    }
  }

  onCameraError = err => {
    this.setState({ ...this.state, cameraFound: false });
  }

  onProcessed(result) {
    if (!this.state.quaggas) {
      this.initBarcodeScanner();
    } else {
      let drawingCtx = this.state.quaggas.canvas.ctx.overlay,
        drawingCanvas = this.state.quaggas.canvas.dom.overlay;
      const quagga = this.state.quaggas;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(box => box !== result.box).forEach(box => {
            quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
          });
        }

        if (result.box) {
          quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, { color: "red", lineWidth: 3 });
        }
      }
    }
  }

  render() {

    const noDeviceFoundMessage = !this.state.cameraFound ?
      (<div className="noCameraFound">No supported barcode camera found!</div>) : null;

    return (
      <div className="barcodeReader">
        {noDeviceFoundMessage}
        <div className="barCodeView">
          <div id="interactive" className="viewport" />
        </div>
      </div>
    );
  }
}

export default BarcodeScanner;
