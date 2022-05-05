import React from "react";
import PropTypes from "prop-types";

function UploaderMessage({ uploadMsg }) {
  return (
    <div className="alert alert-info fade show" role="alert">
      {uploadMsg}
    </div>
  );
}

UploaderMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default UploaderMessage;
