import * as React from "react";
import { useEffect, useRef } from "react";

let cloudinary;

const CloudinaryUploadWidget = ({ children, onUpload }) => {
  const widget = useRef();
  useEffect(() => {
    // Store the Cloudinary window instance to a ref when the page renders

    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }

    // To help improve load time of the widget on first instance, use requestIdleCallback
    // to trigger widget creation. If requestIdleCallback isn't supported, fall back to
    // setTimeout: https://caniuse.com/requestidlecallback

    function onIdle() {
      if (!widget.current) {
        widget.current = createWidget();
      }
    }

    "requestIdleCallback" in window
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1);

    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    };
    // eslint-disable-next-line
  }, []);

  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */

  function createWidget() {
    // Providing only a Cloud Name along with an Upload Preset allows you to use the
    // widget without requiring an API Key or Secret. This however allows for
    // "unsigned" uploads which may allow for more usage than intended. Read more
    // about unsigned uploads at: https://cloudinary.com/documentation/upload_images#unsigned_upload

    const cloudName = "dorg7gesr";
    const uploadPreset = "event_genesis";

    if (!cloudName || !uploadPreset) {
      console.warn(`Kindly ensure you have the cloudName and UploadPreset 
      setup in your .env file at the root of your project.`);
    }
    const options = {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      cropping: true, //add a cropping step
      // multiple: true,
      showUploadMoreButton: false,
      maxFiles: 5,
      croppingAspectRatio: 1,
      // showAdvancedOptions: true,  //add advanced options (public_id and tag)
      // sources: [ "local", "url"], // restrict the upload sources to URL and local files
      multiple: false, //restrict upload to a single file
      // folder: "user_images", //upload files to the specified folder
      // tags: ["users", "profile"], //add the given tags to the uploaded files
      // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
      // clientAllowedFormats: ["images"], //restrict uploading to image files only
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      maxImageWidth: 750, //Scales the image before uploading
      minImageWidth: 500,
      maxImageHeight: 1000,
      minImageHeight: 750,
    };

    return cloudinary?.createUploadWidget(options, function (error, result) {
      // The callback is a bit more chatty than failed or success so
      // only trigger when one of those are the case. You can additionally
      // create a separate handler such as onEvent and trigger it on
      // ever occurrence
      if (
        (error || result.event === "success") &&
        typeof onUpload === "function"
      ) {
        onUpload(error, result, widget);
      }
    });
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  return <>{children({ cloudinary, widget, open })}</>;
};

export default CloudinaryUploadWidget;
