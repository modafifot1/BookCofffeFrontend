import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
export const SpinLoading = () => {
  return (
    <>
      <SpinLoadingContainer className="spin_loading_container align__center">
        <div className="modal__inner">
          <CircularProgress color="success" />
        </div>
      </SpinLoadingContainer>
    </>
  );
};

const SpinLoadingContainer = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  background: #00000043 0% 0% no-repeat padding-box;
  opacity: 1;
  backdrop-filter: blur(2px);
  .modal__inner {
    margin: auto;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .ant-spin-spinning > span {
      font-size: 50px !important;
      font-weight: bold;
    }
  }
`;
