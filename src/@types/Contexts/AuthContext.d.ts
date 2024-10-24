/* eslint-disable @typescript-eslint/no-unused-vars */

namespace Contexts {
  interface AuthContext {
    signIn: (data: AuthContext.LoginValues) => Promise<AuthContext.LoginResult>;
    token?: string;
    logout: () => Promise<void>;
  }

  namespace AuthContext {
    interface LoginValues {
      username: string;
      password: string;
    }

    interface LoginResult {
      success: boolean;
      token?: string;
      message?: string;
    }
  }
}
