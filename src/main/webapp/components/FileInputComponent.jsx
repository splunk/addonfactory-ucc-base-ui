import React, { Component, useState } from 'react';
import File from "@splunk/react-ui/File";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FileWrapper = styled(File)`
    width: 320px !important;
`;

function FileInputComponent(props) {
  const {
    field,
    disabled,
    error,
    controlOptions,
    handleChange
} = props;

  const fileReader = new FileReader();

  const [fileName, setFileName] = useState("");

  const handleAddFiles = (files) => {
    if (files.length) {
      const file = files[0];

      if (fileReader.readyState === 1) {
        fileReader.abort();
      };

      fileReader.readAsBinaryString(file);

      fileReader.onload = () => {
        setFileName(file.name);
        handleChange(field, fileReader.result);
      };
    };
  };

  const handleRemoveFile = () => {
      if (fileReader.readyState === 1) {
        fileReader.abort();
      };
      setFileName(null);
      handleChange(field, null);
  };

  return(
    <FileWrapper
      key={field}
      onRequestAdd={handleAddFiles}
      onRequestRemove={handleRemoveFile}
      supportsMessage={
        <> {controlOptions?.supportsMessage} </>
      }
      disabled={disabled}
    >
      {fileName && <File.Item error={error}  name={fileName} />}
    </FileWrapper>
  );
}

FileInputComponent.propTypes = {
    field: PropTypes.string,
    error: PropTypes.bool,
    controlOptions: PropTypes.object,
    disabled: PropTypes.bool,
};

export default FileInputComponent;
