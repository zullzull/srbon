class FailEater {
  static errorUri = "/problems";

  static ralph(e, errorUri) {
    FailEater.diggest(e);
    if (typeof window != "undefined") {
      let redirect = errorUri ?? FailEater.errorUri;
      const message = e.message ?? e;
      window.location.href = `${redirect}?r=${FailEater.btoaImplementation(
        message
      )}`;
    }
  }

  static diggest(e, key = null) {
    const message = e.message ?? e;
    const prefix = key == null ? `${key} : ` : "";
    // console.error(prefix + FailEater.btoaImplementation(message))
  }

  static btoaImplementation = (str) => {
    try {
      return btoa(str);
    } catch (err) {
      return Buffer.from(str).toString("base64");
    }
  };
}

export default FailEater;
