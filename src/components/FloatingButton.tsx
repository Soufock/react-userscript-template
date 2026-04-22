import styled from "styled-components";
import { useState } from "react";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
`;

const PanelOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

const Panel = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)"};
  width: 420px;
  max-width: 90vw;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
`;

const LoginContainer = styled.div`
  padding: 40px;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const LoginIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
`;

const LoginTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 24px;
  color: #1a1a2e;
  font-weight: 600;
`;

const LoginSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const PasswordInput = styled(Input)`
  font-family: inherit;
`;

const RememberRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #667eea;
    cursor: pointer;
  }
`;

const ForgotLink = styled.a`
  font-size: 14px;
  color: #667eea;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #9ca3af;
  font-size: 13px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }

  span {
    padding: 0 12px;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialButton = styled.button<{ $color: string }>`
  flex: 1;
  padding: 10px;
  border: 2px solid ${({ $color }) => $color};
  border-radius: 8px;
  background: white;
  color: ${({ $color }) => $color};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $color }) => $color};
    color: white;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    color: #111827;
  }
`;

const Message = styled.div<{ $type: "success" | "error" }>`
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  background: ${({ $type }) => ($type === "success" ? "#d1fae5" : "#fee2e2")};
  color: ${({ $type }) => ($type === "success" ? "#065f46" : "#991b1b")};
  margin-bottom: 16px;
`;

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

export function LoginPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    remember: false,
  });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    // Simulate login request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (formData.username && formData.password) {
      if (formData.remember) {
        GM_setValue("rememberUser", true);
        GM_setValue("username", formData.username);
      }
      setMessage({ type: "success", text: "登录成功！" });
      setTimeout(() => setIsOpen(false), 1500);
    } else {
      setMessage({ type: "error", text: "请输入用户名和密码" });
    }

    setLoading(false);
  };

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
      </FloatingButton>

      <PanelOverlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <Panel $isOpen={isOpen}>
        <CloseButton onClick={() => setIsOpen(false)}>&times;</CloseButton>

        <LoginContainer>
          <LoginHeader>
            <LoginIcon>🔐</LoginIcon>
            <LoginTitle>欢迎回来</LoginTitle>
            <LoginSubtitle>请登录您的账号以继续</LoginSubtitle>
          </LoginHeader>

          {message && <Message $type={message.type}>{message.text}</Message>}

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                type="text"
                placeholder="请输入用户名"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password">密码</Label>
              <PasswordInput
                id="password"
                type="password"
                placeholder="请输入密码"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </InputGroup>

            <RememberRow>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                />
                记住我
              </CheckboxLabel>
              <ForgotLink>忘记密码？</ForgotLink>
            </RememberRow>

            <LoginButton type="submit" disabled={loading}>
              {loading ? "登录中..." : "登 录"}
            </LoginButton>
          </Form>

          <Divider>
            <span>或使用以下方式登录</span>
          </Divider>

          <SocialButtons>
            <SocialButton $color="#4285f4">Google</SocialButton>
            <SocialButton $color="#1877f2">GitHub</SocialButton>
            <SocialButton $color="#07c160">微信</SocialButton>
          </SocialButtons>
        </LoginContainer>
      </Panel>
    </>
  );
}

export function FloatingButtonWithPanel() {
  return <LoginPanel />;
}
