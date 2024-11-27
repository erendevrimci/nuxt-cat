export interface AuthState {
  user: { username: string } | null;
  isAuthenticated: boolean;
  authError: string | null;
  isSignUpMode: boolean;
  signUpMessage: string;
  showDemoCredentials: boolean;
  hasShownMessage: boolean;
  messageState: 'initial' | 'first' | 'second';
  copiedCredentials: { username: string; password: string };
}

export interface AuthActions {
  toggleAuthMode(): { username: string; password: string } | null;
  login(username: string, password: string): Promise<boolean>;
  signup(username: string, password: string): Promise<{ username: string; password: string; preventRedirect?: boolean } | false>;
  logout(): void;
}
