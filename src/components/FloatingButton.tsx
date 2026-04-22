import styled from "styled-components";
import { useState } from "react";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #4f46e5;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background: #4338ca;
    transform: scale(1.1);
  }
`;

const PanelOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

const Panel = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 1001;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(100%)"};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #111827;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #6b7280;
  padding: 4px 8px;
  line-height: 1;

  &:hover {
    color: #111827;
  }
`;

const PanelContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

interface FullScreenPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export function FullScreenPanel({
  isOpen,
  onClose,
  children,
}: FullScreenPanelProps) {
  return (
    <>
      <PanelOverlay $isOpen={isOpen} onClick={onClose} />
      <Panel $isOpen={isOpen}>
        <PanelHeader>
          <PanelTitle>Panel</PanelTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </PanelHeader>
        <PanelContent>{children}</PanelContent>
      </Panel>
    </>
  );
}

export function FloatingButtonWithPanel() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FloatingButton onClick={() => setIsOpen(true)}>+</FloatingButton>
      <FullScreenPanel isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>Panel content goes here...</p>
        <button onClick={() => GM_setValue("closePanel", true)}>Set</button>
        <button onClick={() => alert(GM_getValue("closePanel"))}>Open</button>
      </FullScreenPanel>
    </>
  );
}
